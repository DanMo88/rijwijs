#!/usr/bin/env python3
"""Narrates every theory card that has no (or outdated) audio with Gemini TTS, voice Sulafat.
Key from env GEMINI_API_KEY (never stored). Paces ~8 requests/min, sleeps on 429, stops on a daily cap.
Each clip is checked with Whisper (faster-whisper large-v3-turbo); a clip that does not match is redone once.
Writes audio/<aid>.mp3, js/data/audio-index.js, tools/audio-manifest.json and tools/audio-missing.txt."""
import json, os, re, subprocess, sys, time, hashlib, difflib, tempfile
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)
MAN = 'tools/audio-manifest.json'; man = json.load(open(MAN)) if os.path.exists(MAN) else {}
VER = int(sys.argv[1]) if len(sys.argv) > 1 else 6
LIMIT = int(sys.argv[2]) if len(sys.argv) > 2 else 10**6
_m = None
def whisper():
    global _m
    if _m is None:
        from faster_whisper import WhisperModel
        _m = WhisperModel("large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=4)
    return _m
def load(f):
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"], capture_output=True).stdout
    return np.frombuffer(b, np.int16).astype(np.float32) / 32768
def norm(s): return re.sub(r'[^\u0600-\u06FF]', '', s.replace('ي', 'ی').replace('ك', 'ک').replace('\u200c', ''))
def score(f, text):
    segs, _ = whisper().transcribe(load(f), language="fa", beam_size=3)
    hyp = " ".join(s.text for s in segs)
    return difflib.SequenceMatcher(None, norm(text), norm(hyp)).ratio(), hyp
def tts(text, out, batch=0):
    tf = tempfile.NamedTemporaryFile('w', delete=False, suffix='.txt'); tf.write(text); tf.close()
    if batch: os.environ['RW_TTS_BATCH'] = str(batch)
    else: os.environ.pop('RW_TTS_BATCH', None)
    for attempt in range(6):
        p = subprocess.run([sys.executable, 'tools/gemini_tts.py', tf.name, out], capture_output=True, text=True)
        if p.returncode == 0: os.unlink(tf.name); return 'ok'
        msg = (p.stdout + p.stderr)[-600:]
        if p.returncode == 2:
            if re.search(r'per.?day|PerDay|daily', msg, re.I): os.unlink(tf.name); return 'daily'
            print('  429, sleeping 65s', flush=True); time.sleep(65); continue
        print('  error', msg[-300:], flush=True); time.sleep(20)
    os.unlink(tf.name); return 'fail'
def write_index():
    idx = {k: v['v'] for k, v in sorted(man.items()) if os.path.exists('audio/%s.mp3' % k)}
    open('js/data/audio-index.js', 'w').write('/* cards with narration (Gemini TTS, voice Sulafat); value = cache version */\nwindow.RW_AUDIO = ' + json.dumps(idx, separators=(',', ':')) + ';\n')
    json.dump(man, open(MAN, 'w'), ensure_ascii=False, indent=0)
def silences(f):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "silencedetect=n=-42dB:d=0.6", "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    return [(a, b) for a, b in zip(st, en)]
def split(f, n, outs):
    gaps = sorted(silences(f), key=lambda g: g[1] - g[0], reverse=True)[:n - 1]
    if len(gaps) < n - 1: return False
    cuts = [0.0] + [(a + b) / 2 for a, b in sorted(gaps)] + [None]
    af = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
    for i, o in enumerate(outs):
        args = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", f, "-ss", str(cuts[i])] + (["-to", str(cuts[i + 1])] if cuts[i + 1] else []) + ["-af", af, "-ac", "1", "-ar", "24000", "-c:a", "libmp3lame", "-b:a", "48k", o]
        subprocess.run(args, check=True)
    return True
BATCH = int(os.environ.get('RW_BATCH', '5'))
cards = json.loads(subprocess.run(['node', 'tools/dump_cards.js'], capture_output=True, text=True, check=True).stdout)
todo = [c for c in cards if man.get(c['aid'], {}).get('h') != hashlib.md5(c['text'].encode()).hexdigest() or not os.path.exists('audio/%s.mp3' % c['aid'])]
print(len(cards), 'cards,', len(todo), 'to narrate', flush=True)
done = 0; stop = None; last = 0
def accept(c, f, sc):
    global done
    os.replace(f, 'audio/%s.mp3' % c['aid'])
    man[c['aid']] = {'h': hashlib.md5(c['text'].encode()).hexdigest(), 'v': VER, 'sim': round(sc, 2)}
    done += 1; write_index()
if BATCH > 1:
    i = 0; redo = []
    while i < len(todo) and done < LIMIT and not stop:
        grp = []; chars = 0
        while i < len(todo) and len(grp) < BATCH and chars + len(todo[i]['text']) < 3200: grp.append(todo[i]); chars += len(todo[i]['text']); i += 1
        if len(grp) == 1: redo += grp; continue
        wait = 7.5 - (time.time() - last)
        if wait > 0: time.sleep(wait)
        last = time.time(); big = 'audio/_batch.mp3'
        text = '\n\n'.join('%d) %s' % (k + 1, g['text']) for k, g in enumerate(grp))
        r = tts(text, big, batch=len(grp))
        if r != 'ok': stop = r; i -= len(grp); break
        outs = ['audio/_seg%d.mp3' % k for k in range(len(grp))]
        if not split(big, len(grp), outs): print('split failed', [g['aid'] for g in grp], flush=True); redo += grp; continue
        for g, o in zip(grp, outs):
            sc, hyp = score(o, re.sub(r'^\d+\)\s*', '', g['text']))
            print('%s batch sim=%.2f' % (g['aid'], sc), flush=True)
            if sc >= 0.62: accept(g, o, sc)
            else: redo.append(g); os.remove(o)
        os.path.exists(big) and os.remove(big)
    todo = redo + todo[i:] if not stop else todo[i:]
    print('batch phase done', done, 'left', len(todo), flush=True)
for c in todo:
    if done >= LIMIT: break
    out = 'audio/%s.mp3' % c['aid']; best = None
    for tri in range(2):
        wait = 7.5 - (time.time() - last)
        if wait > 0: time.sleep(wait)
        last = time.time(); tmp = out + '.new.mp3'
        r = tts(c['text'], tmp)
        if r != 'ok': stop = r; break
        sc, hyp = score(tmp, c['text'])
        print('%s try%d sim=%.2f' % (c['aid'], tri + 1, sc), flush=True)
        if best is None or sc > best[0]:
            if best: os.remove(best[1])
            fn = out + '.b%d.mp3' % tri; os.rename(tmp, fn); best = (sc, fn, hyp)
        else: os.remove(tmp)
        if sc >= 0.72: break
    if best:
        os.replace(best[1], out)
        man[c['aid']] = {'h': hashlib.md5(c['text'].encode()).hexdigest(), 'v': VER, 'sim': round(best[0], 2)}
        done += 1; write_index()
    if stop: print('STOP:', stop, flush=True); break
write_index()
miss = [c['aid'] for c in cards if not os.path.exists('audio/%s.mp3' % c['aid']) or c['aid'] not in man]
low = [k for k, v in man.items() if v.get('sim', 1) < 0.72]
open('tools/audio-missing.txt', 'w').write('# cards without narration (text + timer fallback in the app)\n' + '\n'.join(miss) + '\n# low Whisper match (kept, check by ear)\n' + '\n'.join(low) + '\n')
print('done', done, 'missing', len(miss), 'low', len(low), 'stop', stop, flush=True)
