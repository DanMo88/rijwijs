/* Rijwijs narration — Web Audio playback of pre-generated, silence-trimmed MP3s.
   The context is unlocked by the first user tap (e.g. «درس» on the lesson screen). */
(function () {
  let ctx = null, src = null; const buf = {};
  function ac() { if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) ctx = new C(); } return ctx; }
  function unlock() { const c = ac(); if (c && c.state === 'suspended') c.resume().catch(() => {}); }
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(e => document.addEventListener(e, unlock, { capture: true, passive: true }));
  async function load(name) {
    if (buf[name]) return buf[name];
    const c = ac(); if (!c) throw new Error('no webaudio');
    let r; for (let k = 0; k < 3; k++) { try { r = await fetch('audio/' + name + '.mp3?v=4'); if (r.ok) break; } catch (e) {} await new Promise(ok => setTimeout(ok, 400)); }
    if (!r || !r.ok) throw new Error('fetch ' + name);
    const ab = await r.arrayBuffer();
    buf[name] = await new Promise((ok, no) => c.decodeAudioData(ab, ok, no));
    return buf[name];
  }
  function stop() { if (src) { try { src.onended = null; src.stop(); } catch (e) {} src = null; } if (ctx && ctx.state === 'suspended' && paused) { paused = false; ctx.resume().catch(() => {}); } }
  let paused = false;
  /* play(name) → resolves {ok:true, dur} once started, then calls onEnd when finished; rejects if audio cannot play */
  async function play(name, onEnd) {
    stop();
    const c = ac(); if (!c) throw new Error('no webaudio');
    const b = await load(name);
    if (c.state !== 'running') { try { await Promise.race([c.resume(), new Promise((_, no) => setTimeout(() => no(new Error('locked')), 600))]); } catch (e) {} }
    if (c.state !== 'running') throw new Error('locked');
    const s = c.createBufferSource(); s.buffer = b; s.connect(c.destination);
    s.onended = () => { if (src === s) { src = null; onEnd && onEnd(); } };
    src = s; s.start(); return b.duration;
  }
  function pause(on) { const c = ctx; if (!c) return; paused = on; if (on) c.suspend().catch(() => {}); else c.resume().catch(() => {}); }
  window.RA = { play, stop, pause, load, unlock };
})();
