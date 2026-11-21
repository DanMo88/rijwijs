import os, sys, json, base64, subprocess, urllib.request, urllib.error
# usage: gen.py <textfile> <out.mp3>
text = open(sys.argv[1]).read().strip(); out = sys.argv[2]
nb = int(os.environ.get("RW_TTS_BATCH", "0") or 0)
if nb: text = "Read these " + str(nb) + " numbered Persian paragraphs one after another. Do not read the numbers. After each paragraph, stay completely silent for two full seconds before the next one.\n\n" + text
prompt = "Read the following Persian (Farsi) text aloud in natural, warm, soft and calm Persian, like a professional Iranian audiobook narrator with a standard Tehrani accent. Speak clearly at a relaxed pace. Pronounce any Dutch words written in Latin letters the Dutch way:\n\n" + text
body = {"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"],
  "speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Sulafat"}}}}}
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent",
  data=json.dumps(body).encode(), headers={"Content-Type":"application/json","x-goog-api-key":os.environ["GEMINI_API_KEY"]})
# exit codes: 0 ok · 1 other error · 2 rate limit per minute (prints RETRY <seconds>) · 3 daily quota used up (stop for today)
try: r = json.load(urllib.request.urlopen(req, timeout=240))
except urllib.error.HTTPError as e:
    raw = e.read().decode(errors="replace")
    try: err = json.loads(raw)["error"]
    except Exception: err = {"message": raw[:600]}
    blob = json.dumps(err)
    print("HTTP", e.code, err.get("message", "")[:600])
    if e.code == 429:
        import re
        if re.search(r"per.?day|PerDay|_day\b|daily", blob, re.I): print("DAILY_QUOTA"); sys.exit(3)
        m = re.search(r'"retryDelay":\s*"(\d+)', blob); print("RETRY", m.group(1) if m else 65); sys.exit(2)
    sys.exit(1)
except Exception as e:
    print("NETWORK", repr(e)[:300]); sys.exit(1)
try: part = next(p["inlineData"] for p in r["candidates"][0]["content"]["parts"] if "inlineData" in p)
except Exception:
    print("NO_AUDIO", json.dumps(r)[:600]); sys.exit(1)
open(out+".raw","wb").write(base64.b64decode(part["data"]))
fmt = [] if "wav" in part.get("mimeType","") else ["-f","s16le","-ar","24000","-ac","1"]
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*fmt,"-i",out+".raw","-af",
 "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse",
 "-ac","1","-ar","24000","-c:a","libmp3lame","-b:a","48k",out],check=True); os.remove(out+".raw"); print("ok",out)
