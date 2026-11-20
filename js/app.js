/* Rijwijs app — hash router, one-screen layouts, automatic transitions. */
(function () {
  const D = window.RW, $app = document.getElementById('app'), KEY = 'rijwijs-v1';
  const fd = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  let S; try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.qs = S.qs || {}; S.th = S.th || 0; S.exams = S.exams || [];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  let tok = 0, timers = [];
  const later = (f, ms) => { const t = tok, h = setTimeout(() => { if (t === tok) f(); }, ms); timers.push(h); return h; };
  function reset() { tok++; timers.forEach(clearTimeout); timers = []; }
  function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2200); }
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  const rule = '<div class="rule"><i></i><i></i><i></i><i></i></div>';
  const flags = '<div class="flags"><img class="flag" src="images/nl.svg" alt="Nederland" /><img class="flag" src="images/shir-o-khorshid.svg" alt="ایران" /></div>';
  const header = (title, o = {}) => `<header class="page-h"><div class="row">${o.back ? `<button class="back" data-go="${o.back}" aria-label="بازگشت">→</button>` : ''}<h1>${title}</h1>${o.right || ''}</div>${rule}${o.sub ? `<p class="subt">${o.sub}</p>` : ''}</header>`;
  const prog = (i, n, extra = '') => `<div class="prog"><span>${fd(i + 1)} از ${fd(n)}</span><span class="bar"><i style="width:${Math.round((i + 1) / n * 100)}%"></i></span>${extra}</div>`;
  const bindGo = () => $app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  const FMT = { mc: ['چندگزینه‌ای', 'Meerkeuze'], yn: ['بله / خیر', 'Ja / Nee'], num: ['عدد بنویس', 'Invulvraag'], hot: ['روی تصویر بزن', 'Hotspot'], order: ['ترتیب', 'Sleepvraag'], multi: ['چند جواب درست', 'Multiple response'], anim: ['فیلم کوتاه', 'Animatievraag'] };
  const mistakes = () => D.questions.filter(q => S.qs[q.id] && S.qs[q.id].box === 0);
  const readMs = html => Math.min(13000, Math.max(5000, 2600 + html.replace(/<[^>]+>/g, '').length * 55));
  function autoBar(el, ms, done) { // tap-to-pause progress bar that fires done() once
    el.classList.remove('run', 'paused'); el.innerHTML = '<i></i>'; void el.offsetWidth;
    el.style.setProperty('--t', ms + 'ms'); el.classList.add('run');
    const t = tok, i = el.querySelector('i'); let paused = false;
    i.addEventListener('animationend', () => { if (t === tok) done(); }, { once: true });
    return () => { if (t !== tok) return; paused = !paused; el.classList.toggle('paused', paused); toast(paused ? '⏸ مکث شد؛ برای ادامه دوباره بزن' : '▶ ادامه'); };
  }

  /* ---------- home (lesson list scrolls) ---------- */
  function home() {
    const ch = D.chapters.map(c => {
      const ls = (c.lessons || []).map(l => {
        const done = l.id === 'vk' ? Object.keys(S.qs).length : 0;
        return `<button class="card chap sub-l c${c.n % 6 + 1} ${l.soon ? 'soon' : 'open'}" ${l.soon ? '' : `data-go="#/l/${l.id}"`}><span class="t"><b>${l.fa}</b><span class="d">${l.nl}</span></span><span class="st">${l.soon ? 'به‌زودی' : done ? fd(done) + ' از ' + fd(D.questions.length) : 'شروع'}</span></button>`;
      }).join('');
      return `<div class="card chap c${c.n % 6 + 1} ${c.soon ? 'soon' : ''}"><span class="num">${fd(c.n)}</span><span class="t"><b>${c.fa}</b><span class="d">${c.nl}</span></span>${c.soon ? '<span class="st">به‌زودی</span>' : ''}</div>${ls}`;
    }).join('');
    $app.innerHTML = header('<span class="brand en">Rijwijs</span>', { right: flags, sub: 'آمادگی آزمون تئوری رانندگی هلند · CBR · B' }) +
      `<main class="body scroll">
        <div class="card ex-facts">
          <div class="c1"><b>${fd(50)}</b><span>سؤال (+${fd(2)} آزمایشی)</span></div>
          <div class="c4"><b>${fd(30)}</b><span>دقیقه</span></div>
          <div class="c3"><b>${fd(44)}</b><span>جواب درست برای قبولی</span></div>
          <div class="c5"><b>NL · EN</b><span>زبان آزمون</span></div>
        </div>
        <p class="sec">۸ فصل آزمون CBR</p>
        ${ch}
        <button class="btn btn-line btn-block" data-install>📲 نصب اپ</button>
        <p class="credit">ساخته شده توسط <b class="en">Daniel Mozafari</b></p>
      </main>`;
    bindGo();
  }

  /* ---------- lesson menu ---------- */
  function lesson() {
    const m = mistakes().length, best = S.exams.length ? Math.max(...S.exams.map(e => e.s)) : null;
    const hero = Scene.render(D.questions[0].s);
    $app.innerHTML = header('حق تقدم در تقاطع‌ها', { back: '#/', right: flags, sub: 'فصل ۲ · درس ۱' }) +
      `<main class="body">
        <div class="card lesson-hero">${hero}<div><b>Voorrang op kruispunten</b><div class="nl">Priority at intersections</div><div class="muted">${fd(D.theory.length)} کارت درس · ${fd(D.questions.length)} سؤال · ${fd(6)} نوع سؤال CBR</div></div></div>
        <div class="modes">
          <button class="mode c1" data-go="#/t/0"><span class="ic">📖</span><b>درس</b><span class="nl">Theorie</span><span class="m">${fd(D.theory.length)} کارت تصویری</span></button>
          <button class="mode c4" data-go="#/q/practice/0"><span class="ic">✍️</span><b>تمرین</b><span class="nl">Oefenen</span><span class="m">${fd(D.questions.length)} سؤال با توضیح</span></button>
          <button class="mode c3" data-go="#/q/exam/0"><span class="ic">⏱️</span><b>آزمون کوچک</b><span class="nl">Mini-examen</span><span class="m">${fd(10)} سؤال · ${fd(6)} دقیقه${best != null ? ' · بهترین: ' + fd(best) : ''}</span></button>
          <button class="mode c6" ${m ? 'data-go="#/q/mistakes/0"' : 'disabled'}><span class="ic">🔁</span><b>مرور اشتباه‌ها</b><span class="nl">Foutenreview</span><span class="m">${m ? fd(m) + ' سؤال' : 'فعلاً اشتباهی نداری'}</span></button>
        </div>
      </main>`;
    bindGo();
  }

  /* ---------- theory cards (auto-advance) ---------- */
  function theory(i) {
    const T = D.theory, c = T[i]; if (!c) return go('#/l/vk');
    S.th = Math.max(S.th, i + 1); save();
    $app.innerHTML = header('درس · حق تقدم', { back: '#/l/vk', right: flags }) +
      `<main class="body">${prog(i, T.length)}
        <div class="card qcard fadein">
          <div class="qtop"><span class="fmt">کارت ${fd(i + 1)}</span><span class="ref">${c.ref}</span></div>
          <div class="stage">${Scene.render(c.s)}</div>
          <div class="qtext"><div class="fa">${c.t}</div></div>
          <div class="tchips"><span class="tchip">NL · ${c.nl}</span><span class="tchip e">EN · ${c.en}</span></div>
          <p class="ttext">${c.x}</p>
        </div>
        <div class="auto" id="ab"><i></i></div>
        <div class="navrow"><button class="btn btn-line sm" id="prev" aria-label="قبلی">→</button><button class="btn btn-coral" id="next">${i + 1 < T.length ? 'بعدی' : 'برو سراغ تمرین'} ←</button><button class="btn btn-line sm" id="pause" aria-label="مکث">⏸</button></div>
      </main>`;
    bindGo();
    const nextF = () => i + 1 < T.length ? go('#/t/' + (i + 1)) : (toast('حالا تمرین! ✍️'), go('#/q/practice/0'));
    const toggle = autoBar(document.getElementById('ab'), readMs(c.x + c.t) + 1500, nextF);
    document.getElementById('next').onclick = nextF;
    document.getElementById('prev').onclick = () => go(i ? '#/t/' + (i - 1) : '#/l/vk');
    document.getElementById('pause').onclick = toggle;
    $app.querySelector('.qcard').onclick = toggle;
    swipe($app.querySelector('.qcard'), () => nextF(), () => go(i ? '#/t/' + (i - 1) : '#/l/vk'));
  }
  function swipe(el, left, right) { let x0 = null; el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true }); el.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 60) (dx > 0 ? left : right)(); }); }

  /* ---------- question runner ---------- */
  let RUN = null;
  function startRun(mode) {
    let list = D.questions.slice();
    if (mode === 'mistakes') list = mistakes();
    if (mode === 'exam') { list.sort(() => Math.random() - .5); list = list.slice(0, 10); }
    RUN = { mode, ids: list.map(q => q.id), res: {}, t0: Date.now(), limit: mode === 'exam' ? 6 * 60 : 0 };
  }
  function question(mode, i) {
    if (!RUN || RUN.mode !== mode || (i === 0 && !RUN.started)) { startRun(mode); }
    RUN.started = true;
    if (!RUN.ids.length) return go('#/l/vk');
    if (i >= RUN.ids.length) return result();
    const q = D.questions.find(x => x.id === RUN.ids[i]), exam = mode === 'exam', n = RUN.ids.length;
    const title = exam ? 'آزمون کوچک' : mode === 'mistakes' ? 'مرور اشتباه‌ها' : 'تمرین · حق تقدم';
    const tm = exam ? '<span class="tmr" id="tmr"></span>' : '';
    const f = FMT[q.type];
    $app.innerHTML = header(title, { back: '#/l/vk', right: flags }) +
      `<main class="body">${prog(i, n, tm)}
        <div class="card qcard fadein">
          <div class="qtop"><span class="fmt">${f[0]} · <span class="en">${f[1]}</span></span>${exam ? '' : `<span class="ref">سؤال ${fd(q.id)}</span>`}</div>
          <div class="stage" id="stage">${Scene.render(q.s)}</div>
          <div class="qtext" id="qt"><div class="fa">${q.q}</div><div class="nlq">${q.nl}</div></div>
          <div id="ans"></div>
        </div>
        <div class="auto" id="ab" hidden><i></i></div>
      </main>`;
    bindGo();
    if (exam) examClock();
    const ans = document.getElementById('ans'), stage = document.getElementById('stage');
    let locked = false;
    const finish = ok => {
      if (locked) return; locked = true;
      RUN.res[q.id] = ok;
      const st = S.qs[q.id] || { box: 0, r: 0, w: 0 };
      if (ok) { st.r++; st.box = Math.min(4, st.box + 1); } else { st.w++; st.box = 0; }
      S.qs[q.id] = st; save();
      const next = () => go('#/q/' + mode + '/' + (i + 1));
      if (exam) return later(next, 650);
      ans.innerHTML = `<div class="expl ${ok ? 'good' : 'badx'} fadein"><h3>${ok ? '✓ درسته!' : '✗ اشتباه شد'}<span class="ref">${q.ref}</span></h3>${ok ? '' : `<div class="right">جواب درست: <b>${rightAns(q)}</b></div>`}<div>${q.e}</div></div>`;
      document.getElementById('qt').style.display = 'none';
      const ab = document.getElementById('ab'); ab.hidden = false;
      const toggle = autoBar(ab, readMs(q.e) + (ok ? 0 : 1500), next);
      setTimeout(() => { ans.onclick = toggle; }, 0);
      $app.querySelector('.navrow') || $app.querySelector('main').insertAdjacentHTML('beforeend', `<div class="navrow"><button class="btn btn-line sm" id="pause" aria-label="مکث">⏸</button><button class="btn btn-coral" id="next">${i + 1 < n ? 'سؤال بعدی' : 'نتیجه'} ←</button></div>`);
      document.getElementById('next').onclick = next; document.getElementById('pause').onclick = toggle;
    };
    const optHtml = (o, k) => `<button class="opt" data-k="${k}"><span class="k">${'ABCD'[k]}</span><span class="l"><b>${o.fa}</b><small>${o.nl}</small></span></button>`;
    const markOpts = (pick, good) => ans.querySelectorAll('.opt').forEach(b => { const k = +b.dataset.k; if (good.includes(k)) b.classList.add('ok'); else if (pick.includes(k)) b.classList.add('bad'); b.disabled = true; });

    if (q.type === 'mc' || q.type === 'yn' || q.type === 'anim') {
      const opts = q.type === 'yn' ? [{ fa: 'بله', nl: 'Ja' }, { fa: 'نه', nl: 'Nee' }] : q.o;
      const draw = () => {
        ans.innerHTML = `<div class="answers ${opts.length === 2 && q.type !== 'mc' ? 'two' : ''}">${opts.map(optHtml).join('')}</div>`;
        ans.querySelectorAll('.opt').forEach(b => b.onclick = () => { const k = +b.dataset.k; if (!exam) markOpts([k], [q.a]); else b.classList.add('on'); finish(k === q.a); });
      };
      if (q.type === 'anim') { // silent animation plays once, then an ordinary question
        const qt = document.getElementById('qt');
        qt.innerHTML = '<div class="fa">🎬 فیلم را نگاه کن…</div><div class="nlq">Kijk naar de animatie…</div>';
        later(() => {
          stage.querySelectorAll('[style*="display:none"]').forEach(g => g.style.display = '');
          qt.innerHTML = `<div class="fa">${q.q}</div><div class="nlq">${q.nl}</div>` + (q.terms ? `<div class="tchips"><span class="tchip">NL · ${q.terms.nl}</span><span class="tchip e">EN · ${q.terms.en}</span></div>` : '');
          draw();
        }, 3700);
      } else draw();
    }
    if (q.type === 'multi') {
      ans.innerHTML = `<div class="answers">${q.o.map(optHtml).join('')}<button class="btn btn-coral btn-block" id="ok">تأیید</button></div>`;
      const pick = new Set();
      ans.querySelectorAll('.opt').forEach(b => b.onclick = () => { const k = +b.dataset.k; pick.has(k) ? pick.delete(k) : pick.add(k); b.classList.toggle('on'); });
      document.getElementById('ok').onclick = () => { const p = [...pick].sort(), ok = p.join() === q.a.slice().sort().join(); if (!exam) markOpts(p, q.a); finish(ok); };
    }
    if (q.type === 'num') {
      let v = '';
      ans.innerHTML = `<div class="answers"><div class="numrow"><div class="numbox" id="nb">_</div><button class="btn btn-coral" id="ok" style="min-width:96px">تأیید</button></div><div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(d => `<button data-d="${d}">${d}</button>`).join('')}</div></div>`;
      ans.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { v = (v + b.dataset.d).slice(-3).replace(/^0+(?=\d)/, ''); document.getElementById('nb').textContent = v; });
      document.getElementById('ok').onclick = () => { if (v === '') return toast('اول یک عدد بزن'); finish(+v === q.a); };
    }
    if (q.type === 'hot') {
      ans.innerHTML = '<p class="hint">☝️ روی تصویر بزن</p>';
      stage.querySelectorAll('.hot').forEach(h => h.addEventListener('click', () => {
        if (locked) return; const ok = h.dataset.hot === q.a;
        if (!exam) { h.classList.add(ok ? 'good' : 'wrong'); const g = stage.querySelector(`[data-hot="${q.a}"]`); g && g.classList.add('good'); } else h.classList.add('sel');
        finish(ok);
      }));
    }
    if (q.type === 'order') {
      const seq = [];
      ans.innerHTML = '<p class="hint">☝️ به ترتیب روی دایره‌ها بزن: اول، دوم، سوم</p>';
      stage.querySelectorAll('.hot').forEach(h => h.addEventListener('click', () => {
        if (locked || seq.includes(h.dataset.hot)) return;
        seq.push(h.dataset.hot); h.classList.add('sel');
        const c = h.querySelector('circle'), t = h.querySelector('text'); c.setAttribute('fill', '#E8734A'); t.setAttribute('fill', '#fff'); t.textContent = fd(seq.length);
        if (seq.length === q.a.length) {
          const ok = seq.join() === q.a.join();
          if (!exam) q.a.forEach((id, k) => { const g = stage.querySelector(`[data-hot="${id}"]`); g.classList.add(seq[k] === id ? 'good' : 'wrong'); });
          later(() => finish(ok), exam ? 0 : 300);
        }
      }));
    }
  }
  function rightAns(q) {
    const lab = id => { const u = (q.s.units || []).find(x => x.hot === id || x.id === id); return id === 'you' ? 'تو' : (u && u.label) || id; };
    if (q.type === 'yn') return q.a === 0 ? 'بله (Ja)' : 'نه (Nee)';
    if (q.type === 'mc' || q.type === 'anim') return 'ABCD'[q.a] + ' · ' + q.o[q.a].fa + ' (' + q.o[q.a].nl + ')';
    if (q.type === 'multi') return q.a.map(k => 'ABCD'[k]).join(' و ');
    if (q.type === 'num') return fd(q.a);
    if (q.type === 'order') return q.a.map(lab).join(' ← ');
    if (q.type === 'hot') return (q.s.type === 'signs' ? 'تابلوی ' : '') + lab(q.a);
    return '';
  }
  function examClock() {
    const el = document.getElementById('tmr'), t = tok;
    const tick = () => {
      if (t !== tok) return;
      const left = RUN.limit - Math.floor((Date.now() - RUN.t0) / 1000);
      if (left <= 0) { toast('⏰ وقت تمام شد'); return result(); }
      el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
      later(tick, 1000);
    };
    tick();
  }
  function result() {
    reset();
    const n = RUN.ids.length, ok = RUN.ids.filter(id => RUN.res[id]).length, exam = RUN.mode === 'exam';
    const need = exam ? 9 : Math.ceil(n * 0.88), pass = ok >= need;
    const wrong = RUN.ids.filter(id => !RUN.res[id]);
    if (exam) { S.exams.push({ s: ok, n, d: Date.now() }); save(); }
    $app.innerHTML = header(exam ? 'نتیجه آزمون کوچک' : 'نتیجه تمرین', { back: '#/l/vk', right: flags }) +
      `<main class="body"><div class="card result fadein">
        <div class="big">${ok} / ${n}</div>
        <div class="v ${pass ? 'ok' : 'no'}">${pass ? '🎉 قبول! (Geslaagd)' : 'هنوز نه (Gezakt)؛ دوباره تمرین کن'}</div>
        <p class="muted">معیار قبولی مثل آزمون واقعی CBR: ${fd(44)} از ${fd(50)} یعنی حدود ٪${fd(88)}؛ اینجا یعنی ${fd(need)} از ${fd(n)}.</p>
        ${wrong.length ? `<p class="muted">سؤال‌هایی که اشتباه زدی:</p><div class="wchips">${wrong.map(id => `<span>${fd(id)}</span>`).join('')}</div>` : '<p class="muted">هیچ اشتباهی نداشتی 👏</p>'}
        <div class="btnrow" style="width:100%">${wrong.length ? '<button class="btn btn-gold" data-go="#/q/mistakes/0">🔁 مرور اشتباه‌ها</button>' : ''}<button class="btn btn-coral" data-go="#/q/exam/0">⏱️ آزمون دوباره</button></div>
        <button class="btn btn-line btn-block" data-go="#/l/vk">بازگشت به درس</button>
      </div></main>`;
    RUN = null; bindGo();
  }

  function route() {
    reset();
    const h = (location.hash || '#/').slice(1).split('/').filter(Boolean);
    if (h[0] === 'l') return lesson();
    if (h[0] === 't') return theory(+h[1] || 0);
    if (h[0] === 'q') { if (+h[2] === 0) RUN = null; return question(h[1], +h[2] || 0); }
    home();
  }
  window.__run = () => RUN;
  window.addEventListener('hashchange', route);
  route();
})();
