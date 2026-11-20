/* CBR Daniel — hash router, one-screen layouts, automatic transitions. */
(function () {
  const D = window.RW, $app = document.getElementById('app'), KEY = 'cbrdaniel-v1';
  const fd = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  let S; try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.qs = S.qs || {}; S.cards = S.cards || {}; S.exams = S.exams || []; S.pp = S.pp || {}; S.minis = S.minis || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const ALLQ = [], QBY = {};
  D.chapters.forEach(c => c.lessons.forEach(lid => { const l = D.lessons[lid]; if (l) l.qs.forEach(q => { ALLQ.push(q); QBY[q.id] = q; }); }));
  const LES = lid => D.lessons[lid];
  const CH = n => D.chapters.find(c => c.n === n);
  let tok = 0, timers = [];
  const later = (f, ms) => { const t = tok, h = setTimeout(() => { if (t === tok) f(); }, ms); timers.push(h); return h; };
  function reset() { tok++; timers.forEach(clearTimeout); timers = []; if (window.RA) RA.stop(); }
  function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2200); }
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  const rule = '<div class="rule"><i></i><i></i><i></i><i></i></div>';
  const flags = '<div class="flags"><img class="flag" src="images/nl.svg" alt="Nederland" /><img class="flag" src="images/shir-o-khorshid.svg" alt="ایران" /></div>';
  const header = (title, o = {}) => `<header class="page-h"><div class="row">${o.back ? `<button class="back" data-go="${o.back}" aria-label="بازگشت">→</button>` : ''}<h1>${title}</h1>${o.right || ''}</div>${rule}${o.sub ? `<p class="subt">${o.sub}</p>` : ''}</header>`;
  const prog = (i, n, extra = '') => `<div class="prog"><span>${fd(i + 1)} از ${fd(n)}</span><span class="bar"><i style="width:${Math.round((i + 1) / n * 100)}%"></i></span>${extra}</div>`;
  const bindGo = () => $app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  const FMT = { mc: ['چندگزینه‌ای', 'Meerkeuze'], yn: ['بله / خیر', 'Ja / Nee'], num: ['عدد بنویس', 'Invulvraag'], hot: ['روی تصویر بزن', 'Hotspot'], order: ['ترتیب', 'Sleepvraag'], multi: ['چند جواب درست', 'Multiple response'], anim: ['فیلم کوتاه', 'Animatievraag'] };
  const readMs = html => Math.min(14000, Math.max(5000, 2600 + html.replace(/<[^>]+>/g, '').length * 55));
  const DAY = 864e5, IV = [0, 1, 3, 7, 14, 30];
  const due = () => ALLQ.filter(q => { const s = S.qs[q.id]; return s && s.w > 0 && (s.box === 0 || (s.due || 0) <= Date.now()); });
  function autoBar(el, ms, done) {
    el.classList.remove('run', 'paused'); el.innerHTML = '<i></i>'; void el.offsetWidth;
    el.style.setProperty('--t', ms + 'ms'); el.classList.add('run');
    const t = tok, i = el.querySelector('i'); let paused = false;
    i.addEventListener('animationend', () => { if (t === tok) done(); }, { once: true });
    return () => { if (t !== tok) return; paused = !paused; el.classList.toggle('paused', paused); toast(paused ? '⏸ مکث شد؛ برای ادامه دوباره بزن' : '▶ ادامه'); };
  }
  function lstat(lid) {
    const l = LES(lid); if (!l) return { pct: 0, done: false, ok: 0, n: 0, seen: 0 };
    const ok = l.qs.filter(q => S.qs[q.id] && S.qs[q.id].last === 1).length, n = l.qs.length, seen = Math.min(S.cards[lid] || 0, l.cards.length);
    return { ok, n, seen, pct: Math.round(ok / Math.max(1, n) * 100), done: seen >= l.cards.length && ok >= Math.ceil(n * .8) };
  }

  /* ---------- home ---------- */
  function home() {
    const nd = due().length, best = S.exams.length ? Math.max(...S.exams.map(e => e.s)) : null;
    const ch = D.chapters.map(c => {
      const ls = c.lessons.map(lid => {
        const l = LES(lid); if (!l) return `<div class="card chap sub-l c${c.n % 6 + 1} soon"><span class="t"><b>…</b></span><span class="st">به‌زودی</span></div>`;
        const st = lstat(lid);
        return `<button class="card chap sub-l c${c.n % 6 + 1} open" data-go="#/l/${lid}"><span class="t"><b>${l.fa}</b><span class="d">${l.nl}</span><span class="pbar"><i style="width:${st.pct}%"></i></span></span><span class="st">${st.done ? '<span class="done">✓</span>' : st.ok ? '٪' + fd(st.pct) : 'شروع'}</span></button>`;
      }).join('');
      return `<div class="card chap c${c.n % 6 + 1}"><span class="num">${fd(c.n)}</span><span class="t"><b>${c.fa}</b><span class="d">${c.nl}</span></span></div>${ls}`;
    }).join('');
    $app.innerHTML = header('<span class="brand en">CBR Daniel</span>', { right: flags, sub: 'آمادگی کامل آزمون تئوری رانندگی هلند · CBR · B' }) +
      `<main class="body scroll">
        <div class="card ex-facts">
          <div class="c1"><b>${fd(50)}</b><span>سؤال (+${fd(2)} آزمایشی)</span></div>
          <div class="c4"><b>${fd(30)}</b><span>دقیقه</span></div>
          <div class="c3"><b>${fd(44)}</b><span>جواب درست برای قبولی</span></div>
          <div class="c5"><b>NL · EN</b><span>زبان آزمون</span></div>
        </div>
        <div class="homebtns">
          <button class="hb big c1" data-go="#/x"><span class="ic">⏱️</span><span><b>آزمون کامل مثل CBR</b><small>${fd(2)} تمرینی + ${fd(52)} سؤال · ${fd(30)} دقیقه${best != null ? ' · بهترین: ' + fd(best) + ' از ' + fd(50) : ''}</small></span></button>
          <button class="hb c6" data-go="#/q/r/_/0"><span class="ic">🔁</span><span><b>مرور اشتباه‌ها</b><small>${nd ? fd(nd) + ' سؤال برای امروز' : 'فعلاً چیزی نیست'}</small></span></button>
          <button class="hb c4" data-go="#/s"><span class="ic">🚸</span><span><b>فرهنگ تابلوها</b><small>${fd((window.RW_SIGNS || []).length)} تابلو</small></span></button>
          <button class="hb c3" data-go="#/g"><span class="ic">📘</span><span><b>واژه‌نامه</b><small>هلندی · انگلیسی · فارسی</small></span></button>
          <button class="hb c2" data-install><span class="ic">📲</span><span><b>نصب اپ</b><small>روی صفحه گوشی</small></span></button>
        </div>
        <p class="sec">${fd(8)} فصل آزمون CBR · ${fd(Object.keys(D.lessons).length)} درس · ${fd(ALLQ.length)} سؤال</p>
        ${ch}
        <p class="credit">ساخته شده توسط <b class="en">Daniel Mozafari</b></p>
        <p class="credit" style="font-size:.7rem">همه سؤال‌ها و متن‌ها را خودمان از روی متن قانون (RVV 1990) نوشته‌ایم. مرجع نهایی همیشه سایت رسمی cbr.nl است.</p>
      </main>`;
    bindGo(); if (window.PWAInstall && PWAInstall.bind) PWAInstall.bind();
    if (S.homeY) $app.querySelector('main').scrollTop = S.homeY;
    $app.querySelector('main').addEventListener('scroll', e => { S.homeY = e.target.scrollTop; }, { passive: true });
  }

  /* ---------- lesson menu ---------- */
  function lesson(lid) {
    const l = LES(lid); if (!l) return go('#/');
    const c = CH(l.ch), st = lstat(lid), mi = S.minis[lid];
    const hero = Scene.render(l.hero || l.cards[0].s), pp = S.pp[lid] || 0;
    $app.innerHTML = header(l.fa, { back: '#/', right: flags, sub: 'فصل ' + fd(c.n) + ' · ' + c.fa }) +
      `<main class="body">
        <div class="card lesson-hero">${hero}<div><b class="en" style="text-align:right">${l.nl}</b><div class="nl">${l.en}</div><div class="lstats"><span>${fd(l.cards.length)} کارت</span><span>${fd(l.qs.length)} سؤال</span><span class="${st.done ? 'ok' : ''}">${st.done ? '✓ تمام شد' : 'درست: ٪' + fd(st.pct)}</span></div></div></div>
        <div class="modes">
          <button class="mode c1" data-go="#/t/${lid}/0"><span class="ic">📖</span><b>درس</b><span class="nl">Theorie</span><span class="m">${fd(l.cards.length)} کارت تصویری با صدا${st.seen ? ' · ' + fd(st.seen) + ' دیده شد' : ''}</span></button>
          <button class="mode c4" data-go="#/q/p/${lid}/${pp < l.qs.length ? pp : 0}"><span class="ic">✍️</span><b>تمرین</b><span class="nl">Oefenen</span><span class="m">${pp && pp < l.qs.length ? 'ادامه از سؤال ' + fd(pp + 1) : fd(l.qs.length) + ' سؤال با توضیح'}</span></button>
          <button class="mode c3" data-go="#/q/m/${lid}/0"><span class="ic">⏱️</span><b>آزمون کوچک</b><span class="nl">Mini-examen</span><span class="m">${fd(10)} سؤال · ${fd(6)} دقیقه${mi != null ? ' · بهترین: ' + fd(mi) : ''}</span></button>
          <button class="mode c6" data-go="#/q/r/${lid}/0"><span class="ic">🔁</span><b>مرور اشتباه‌ها</b><span class="nl">Herhalen</span><span class="m">${fd(due().filter(q => q.lid === lid).length)} سؤال</span></button>
        </div>
      </main>`;
    bindGo();
  }

  /* ---------- theory cards (auto-advance, narrated) ---------- */
  function theory(lid, i) {
    const l = LES(lid); if (!l) return go('#/'); const T = l.cards, c = T[i]; if (!c) return go('#/l/' + lid);
    S.cards[lid] = Math.max(S.cards[lid] || 0, i + 1); save();
    $app.innerHTML = header('درس · ' + l.fa, { back: '#/l/' + lid, right: flags }) +
      `<main class="body">${prog(i, T.length)}
        <div class="card qcard fadein">
          <div class="qtop"><span class="fmt">کارت ${fd(i + 1)}</span><span class="ref">${c.ref}</span></div>
          <div class="stage">${Scene.render(c.s)}</div>
          <div class="qtext"><div class="fa">${c.t}</div></div>
          ${c.nl ? `<div class="tchips"><span class="tchip">NL · ${c.nl}</span>${c.en ? `<span class="tchip e">EN · ${c.en}</span>` : ''}</div>` : ''}
          <p class="ttext">${c.x}</p>
        </div>
        <div class="auto" id="ab"><i></i></div>
        <div class="navrow"><button class="btn btn-line sm" id="prev" aria-label="قبلی">→</button><button class="btn btn-coral" id="next">${i + 1 < T.length ? 'بعدی' : 'برو سراغ تمرین'} ←</button><button class="btn btn-line sm" id="pause" aria-label="مکث">⏸</button></div>
      </main>`;
    bindGo();
    const nextF = () => i + 1 < T.length ? go('#/t/' + lid + '/' + (i + 1)) : (toast('حالا تمرین! ✍️'), go('#/q/p/' + lid + '/0'));
    const prevF = () => go(i ? '#/t/' + lid + '/' + (i - 1) : '#/l/' + lid);
    const ab = document.getElementById('ab'), t0 = tok;
    let toggle = () => {};
    const fallback = () => { if (t0 === tok) toggle = autoBar(ab, readMs(c.x + c.t) + 1500, nextF); };
    const hasA = window.RA && window.RW_AUDIO && RW_AUDIO[c.aid];
    if (hasA) {
      let paused = false, gap = null, gapLeft = 0, gapAt = 0, ended = false;
      const armGap = ms => { gapAt = Date.now(); gapLeft = ms; gap = later(() => { if (!paused) nextF(); }, ms); };
      RA.play(c.aid, () => { if (t0 !== tok) return; ended = true; if (!paused) armGap(2000); })
        .then(dur => {
          if (t0 !== tok) return RA.stop();
          const nx = T[i + 1]; if (nx && RW_AUDIO[nx.aid]) RA.load(nx.aid).catch(() => {});
          ab.style.setProperty('--t', (dur * 1000 + 2000) + 'ms'); ab.classList.add('run'); ab.classList.add('voice');
          toggle = () => {
            if (t0 !== tok) return; paused = !paused; ab.classList.toggle('paused', paused); RA.pause(paused);
            if (ended) { if (paused) { clearTimeout(gap); gapLeft = Math.max(0, gapLeft - (Date.now() - gapAt)); } else armGap(Math.max(300, gapLeft)); }
            toast(paused ? '⏸ مکث شد؛ برای ادامه دوباره بزن' : '▶ ادامه');
          };
        })
        .catch(fallback);
    } else fallback();
    document.getElementById('next').onclick = nextF;
    document.getElementById('prev').onclick = prevF;
    document.getElementById('pause').onclick = () => toggle();
    $app.querySelector('.qcard').onclick = () => toggle();
    swipe($app.querySelector('.qcard'), nextF, prevF);
  }
  function swipe(el, left, right) { let x0 = null; el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true }); el.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 60) (dx > 0 ? left : right)(); }); }

  /* ---------- runs: p = lesson practice, m = lesson mini exam, r = spaced review, x = full CBR mock exam, w = review of exam mistakes ---------- */
  let RUN = null;
  const pick = (arr, n) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
  function startRun(mode, lid) {
    const l = LES(lid); let ids = [], R = { mode, lid, res: {}, t0: Date.now(), limit: 0, warm: 0, test: [] };
    if (mode === 'p') ids = l.qs.map(q => q.id);
    if (mode === 'm') { ids = pick(l.qs, 10).map(q => q.id); R.limit = 6 * 60; }
    if (mode === 'r') { let d = due(); if (l) d = d.filter(q => q.lid === lid); d.sort((a, b) => (S.qs[a.id].box - S.qs[b.id].box) || ((S.qs[a.id].due || 0) - (S.qs[b.id].due || 0))); ids = d.slice(0, 30).map(q => q.id); }
    if (mode === 'x') {
      let sel = [];
      D.chapters.forEach(c => { const pool = ALLQ.filter(q => q.ch === c.n); sel = sel.concat(pick(pool, c.ex)); });
      if (sel.length < D.exam.q) sel = sel.concat(pick(ALLQ.filter(q => !sel.includes(q)), D.exam.q - sel.length)); /* while some chapters are still being written */
      const an = sel.filter(q => q.type === 'anim').length, anims = pick(ALLQ.filter(q => q.type === 'anim' && !sel.includes(q)), Math.max(0, 3 - an));
      anims.forEach(a => { const k = sel.findIndex(q => q.ch === a.ch && q.type !== 'anim'); if (k >= 0) sel[k] = a; });
      sel = pick(sel, sel.length);
      const rest = ALLQ.filter(q => !sel.includes(q));
      const warm = pick(rest.filter(q => q.type === 'yn' || q.type === 'mc'), 2), test = pick(rest.filter(q => !warm.includes(q)), 2);
      const body = sel.slice(); test.forEach(t => body.splice(Math.floor(Math.random() * (body.length + 1)), 0, t));
      ids = warm.concat(body).map(q => q.id); R.warm = 2; R.test = test.map(q => q.id); R.limit = 30 * 60; R.t0 = null;
    }
    if (mode === 'w') ids = (RUN && RUN.wrong) || [];
    R.ids = ids; RUN = R; return R;
  }
  const exMode = m => m === 'm' || m === 'x';
  function question(mode, lid, i) {
    if (!RUN || RUN.mode !== mode || (RUN.lid || '_') !== (lid || '_') || (i === 0 && !RUN.fresh && mode !== 'w')) { if (mode === 'x' && i > 0) return go('#/x'); startRun(mode, lid); }
    RUN.fresh = false;
    if (!RUN.ids.length) { toast(mode === 'r' ? 'فعلاً سؤالی برای مرور نیست 👏' : 'سؤالی نیست'); return go(lid && lid !== '_' ? '#/l/' + lid : '#/'); }
    if (i >= RUN.ids.length) return result();
    const q = QBY[RUN.ids[i]], exam = exMode(mode), n = RUN.ids.length, l = LES(q.lid);
    if (mode === 'p') { S.pp[lid] = i; save(); }
    const isWarm = mode === 'x' && i < RUN.warm;
    if (mode === 'x' && !isWarm && !RUN.t0) RUN.t0 = Date.now();
    const title = mode === 'x' ? 'آزمون کامل CBR' : mode === 'm' ? 'آزمون کوچک' : mode === 'r' ? 'مرور اشتباه‌ها' : mode === 'w' ? 'مرور جواب‌های آزمون' : 'تمرین · ' + l.fa;
    const tm = exam && !isWarm ? '<span class="tmr" id="tmr"></span>' : isWarm ? '<span class="warm">سؤال تمرینی · oefenvraag</span>' : '';
    const pi = mode === 'x' ? (isWarm ? i : i - RUN.warm) : i, pn = mode === 'x' ? (isWarm ? RUN.warm : n - RUN.warm) : n;
    const f = FMT[q.type], back = lid && lid !== '_' ? '#/l/' + lid : '#/';
    $app.innerHTML = header(title, { back: mode === 'x' ? '#/x' : back, right: flags }) +
      `<main class="body">${prog(pi, pn, tm)}
        <div class="card qcard fadein">
          <div class="qtop"><span class="fmt">${f[0]} · <span class="en">${f[1]}</span></span>${exam ? '' : `<span class="ref">${l.fa}</span>`}</div>
          <div class="stage" id="stage">${Scene.render(q.s)}</div>
          <div class="qtext" id="qt"><div class="fa">${q.q}</div><div class="nlq">${q.nl || ''}</div></div>
          <div id="ans"></div>
        </div>
        <div class="auto" id="ab" hidden><i></i></div>
      </main>`;
    bindGo();
    if (exam && !isWarm) examClock();
    const ans = document.getElementById('ans'), stage = document.getElementById('stage');
    let locked = false;
    const finish = ok => {
      if (locked) return; locked = true;
      RUN.res[q.id] = ok;
      if (!isWarm && !(RUN.test || []).includes(q.id)) {
        const st = S.qs[q.id] || { box: 0, r: 0, w: 0 };
        if (ok) { st.r++; st.box = Math.min(5, (st.box || 0) + 1); st.due = Date.now() + IV[st.box] * DAY; st.last = 1; } else { st.w++; st.box = 0; st.due = Date.now(); st.last = 0; }
        S.qs[q.id] = st; save();
      }
      const next = () => go('#/q/' + mode + '/' + (lid || '_') + '/' + (i + 1));
      if (exam) return later(next, 600);
      const k = q.k || (l.cards[0] && { nl: l.nl, en: l.en });
      ans.innerHTML = `<div class="expl ${ok ? 'good' : 'badx'} fadein"><h3>${ok ? '✓ درسته!' : '✗ اشتباه شد'}<span class="ref">${q.ref}</span></h3>${ok ? '' : `<div class="right">جواب درست: <b>${rightAns(q)}</b></div>`}<div>${q.e}</div>${k ? `<div class="tchips" style="margin-top:4px"><span class="tchip">NL · ${k.nl}</span>${k.en ? `<span class="tchip e">EN · ${k.en}</span>` : ''}</div>` : ''}</div>`;
      document.getElementById('qt').style.display = 'none';
      const ab = document.getElementById('ab'); ab.hidden = false;
      const toggle = autoBar(ab, readMs(q.e) + (ok ? 0 : 1800), next);
      setTimeout(() => { ans.onclick = toggle; }, 0);
      $app.querySelector('.navrow') || $app.querySelector('main').insertAdjacentHTML('beforeend', `<div class="navrow"><button class="btn btn-line sm" id="pause" aria-label="مکث">⏸</button><button class="btn btn-coral" id="next">${i + 1 < n ? 'سؤال بعدی' : 'نتیجه'} ←</button></div>`);
      document.getElementById('next').onclick = next; document.getElementById('pause').onclick = toggle;
    };
    const optHtml = (o, k) => `<button class="opt" data-k="${k}"><span class="k">${'ABCD'[k]}</span><span class="l"><b>${o.fa}</b>${o.nl ? `<small>${o.nl}</small>` : ''}</span></button>`;
    const markOpts = (pick, good) => ans.querySelectorAll('.opt').forEach(b => { const k = +b.dataset.k; if (good.includes(k)) b.classList.add('ok'); else if (pick.includes(k)) b.classList.add('bad'); b.disabled = true; });
    if (q.type === 'mc' || q.type === 'yn' || q.type === 'anim') {
      const opts = q.type === 'yn' ? [{ fa: 'بله', nl: 'Ja' }, { fa: 'نه', nl: 'Nee' }] : q.o;
      const draw = () => {
        ans.innerHTML = `<div class="answers ${opts.length === 2 && q.type !== 'mc' ? 'two' : ''}">${opts.map(optHtml).join('')}</div>`;
        ans.querySelectorAll('.opt').forEach(b => b.onclick = () => { if (locked) return; const k = +b.dataset.k; if (!exam) markOpts([k], [q.a]); else b.classList.add('on'); finish(k === q.a); });
      };
      if (q.type === 'anim') {
        const qt = document.getElementById('qt');
        qt.innerHTML = '<div class="fa">🎬 فیلم را نگاه کن…</div><div class="nlq">Kijk naar de animatie…</div>';
        later(() => {
          stage.querySelectorAll('[style*="display:none"]').forEach(g => g.style.display = '');
          qt.innerHTML = `<div class="fa">${q.q}</div><div class="nlq">${q.nl || ''}</div>`;
          draw();
        }, (q.s && q.s.dur) || 3700);
      } else draw();
    }
    if (q.type === 'multi') {
      ans.innerHTML = `<div class="answers">${q.o.map(optHtml).join('')}<button class="btn btn-coral btn-block" id="ok">تأیید</button></div>`;
      const pk = new Set();
      ans.querySelectorAll('.opt').forEach(b => b.onclick = () => { const k = +b.dataset.k; pk.has(k) ? pk.delete(k) : pk.add(k); b.classList.toggle('on'); });
      document.getElementById('ok').onclick = () => { if (locked) return; const p = [...pk].sort(), ok = p.join() === q.a.slice().sort().join(); if (!exam) markOpts(p, q.a); finish(ok); };
    }
    if (q.type === 'num') {
      let v = '';
      ans.innerHTML = `<div class="answers"><div class="numrow"><div class="numbox" id="nb">_</div><button class="btn btn-line sm" id="del" aria-label="پاک کردن">⌫</button><button class="btn btn-coral" id="ok" style="min-width:88px">تأیید</button></div><div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(d => `<button data-d="${d}">${d}</button>`).join('')}</div></div>`;
      const show = () => { document.getElementById('nb').textContent = v || '_'; };
      ans.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { v = (v + b.dataset.d).slice(0, 4).replace(/^0+(?=\d)/, ''); show(); });
      document.getElementById('del').onclick = () => { v = v.slice(0, -1); show(); };
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
      ans.innerHTML = '<p class="hint">☝️ به ترتیب روی آن‌ها بزن: اول، دوم، سوم…</p>';
      stage.querySelectorAll('.hot').forEach(h => h.addEventListener('click', () => {
        if (locked || seq.includes(h.dataset.hot)) return;
        seq.push(h.dataset.hot); h.classList.add('sel');
        const c = h.querySelector('circle'), t = h.querySelector('text:not(.ord)'), o = h.querySelector('.ord');
        if (c && t && !h.querySelector('image')) { c.setAttribute('fill', '#E8734A'); t.setAttribute('fill', '#fff'); t.textContent = fd(seq.length); }
        else if (o) { o.setAttribute('fill', '#E8734A'); o.setAttribute('font-size', '22'); o.textContent = fd(seq.length); }
        if (seq.length === q.a.length) {
          const ok = seq.join() === q.a.join();
          if (!exam) q.a.forEach((id, k) => { const g = stage.querySelector(`[data-hot="${id}"]`); g && g.classList.add(seq[k] === id ? 'good' : 'wrong'); });
          later(() => finish(ok), exam ? 0 : 300);
        }
      }));
    }
  }
  function labelOf(q, id) {
    if (id === 'you') return 'تو';
    const s = q.s || {};
    const u = (s.units || []).find(x => x.hot === id || x.id === id); if (u && u.label) return u.label;
    const t = (s.t || []).find(x => x.hot === id); if (t) return t.c || t.s || id;
    const h = (s.hots || []).find(x => x[0] === id); if (h) return h[3] || h[0];
    if (s.type === 'signs') return 'تابلوی ' + id;
    return id;
  }
  function rightAns(q) {
    if (q.type === 'yn') return q.a === 0 ? 'بله (Ja)' : 'نه (Nee)';
    if (q.type === 'mc' || q.type === 'anim') return 'ABCD'[q.a] + ' · ' + q.o[q.a].fa + (q.o[q.a].nl ? ' (' + q.o[q.a].nl + ')' : '');
    if (q.type === 'multi') return q.a.map(k => 'ABCD'[k]).join(' و ');
    if (q.type === 'num') return fd(q.a);
    if (q.type === 'order') return q.a.map(id => labelOf(q, id)).join(' ← ');
    if (q.type === 'hot') return labelOf(q, q.a);
    return '';
  }
  function examClock() {
    const el = document.getElementById('tmr'), t = tok;
    const tick = () => {
      if (t !== tok || !RUN) return;
      const left = RUN.limit - Math.floor((Date.now() - RUN.t0) / 1000);
      if (left <= 0) { toast('⏰ وقت تمام شد'); return result(); }
      el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
      later(tick, 1000);
    };
    tick();
  }
  function result() {
    reset();
    if (!RUN) return go('#/');
    const mode = RUN.mode, lid = RUN.lid;
    if (mode === 'x') return examResult();
    const n = RUN.ids.length, ok = RUN.ids.filter(id => RUN.res[id]).length, need = Math.ceil(n * 0.88), pass = ok >= need;
    if (mode === 'm') { S.minis[lid] = Math.max(S.minis[lid] || 0, ok); save(); }
    if (mode === 'p') { S.pp[lid] = 0; save(); }
    const wrong = RUN.ids.filter(id => !RUN.res[id]), back = lid && lid !== '_' ? '#/l/' + lid : '#/';
    const title = { m: 'نتیجه آزمون کوچک', p: 'نتیجه تمرین', r: 'نتیجه مرور', w: 'مرور تمام شد' }[mode];
    $app.innerHTML = header(title, { back, right: flags }) +
      `<main class="body"><div class="card result fadein">
        <div class="big">${ok} / ${n}</div>
        <div class="v ${pass ? 'ok' : 'no'}">${pass ? '🎉 عالی! (Geslaagd)' : 'هنوز نه؛ دوباره تمرین کن'}</div>
        <p class="muted">معیار قبولی آزمون CBR: ${fd(44)} از ${fd(50)} (٪${fd(88)}). اینجا یعنی ${fd(need)} از ${fd(n)}.</p>
        ${wrong.length ? `<p class="muted">${fd(wrong.length)} سؤال اشتباه به «مرور اشتباه‌ها» رفت.</p>` : '<p class="muted">هیچ اشتباهی نداشتی 👏</p>'}
        <div class="btnrow" style="width:100%">${wrong.length ? `<button class="btn btn-gold" data-go="#/q/r/${lid || '_'}/0">🔁 مرور اشتباه‌ها</button>` : ''}${lid && lid !== '_' ? `<button class="btn btn-coral" data-go="#/q/m/${lid}/0">⏱️ آزمون کوچک</button>` : ''}</div>
        <button class="btn btn-line btn-block" data-go="${back}">بازگشت</button>
      </div></main>`;
    RUN = null; bindGo();
  }
  function examResult() {
    const counted = RUN.ids.slice(RUN.warm).filter(id => !RUN.test.includes(id));
    const ok = counted.filter(id => RUN.res[id]).length, pass = ok >= D.exam.pass, answered = counted.filter(id => id in RUN.res).length;
    const brk = D.chapters.map(c => { const qs = counted.filter(id => QBY[id].ch === c.n); return { c, n: qs.length, ok: qs.filter(id => RUN.res[id]).length }; }).filter(b => b.n);
    const wrong = counted.filter(id => !RUN.res[id]);
    S.exams.push({ s: ok, n: counted.length, d: Date.now(), p: pass }); save();
    RUN.wrong = wrong;
    $app.innerHTML = header('نتیجه آزمون کامل', { back: '#/', right: flags }) +
      `<main class="body"><div class="card result fadein">
        <div class="big">${ok} / ${counted.length}</div>
        <div class="v ${pass ? 'ok' : 'no'}">${pass ? '🎉 قبول شدی! (Geslaagd)' : 'قبول نشدی (Gezakt)'}</div>
        <p class="muted">برای قبولی ${fd(D.exam.pass)} جواب درست از ${fd(50)} لازم است.${answered < counted.length ? ' ' + fd(counted.length - answered) + ' سؤال بی‌جواب ماند.' : ''}</p>
        <div class="brk">${brk.map(b => `<div><span class="n">${fd(b.c.n)}. ${b.c.fa}</span><span class="b"><i style="width:${Math.round(b.ok / b.n * 100)}%"></i></span><span class="s">${b.ok}/${b.n}</span></div>`).join('')}</div>
        <div class="btnrow" style="width:100%">${wrong.length ? '<button class="btn btn-gold" id="rev">📋 دیدن اشتباه‌ها</button>' : ''}<button class="btn btn-coral" data-go="#/x">⏱️ آزمون دوباره</button></div>
        <button class="btn btn-line btn-block" data-go="#/">خانه</button>
      </div></main>`;
    bindGo();
    const r = document.getElementById('rev'); if (r) r.onclick = () => { const w = RUN.wrong; RUN = { mode: 'w', lid: '_', wrong: w, ids: w, res: {}, fresh: true }; go('#/q/w/_/0'); };
  }
  function examIntro() {
    reset();
    $app.innerHTML = header('آزمون کامل CBR', { back: '#/', right: flags, sub: 'Theorie-examen auto (B)' }) +
      `<main class="body"><div class="card xrules fadein">
        <ul>
          <li>اول <b>${fd(2)} سؤال تمرینی</b> می‌آید که حساب نمی‌شود.</li>
          <li>بعد <b>${fd(52)} سؤال</b>: ${fd(50)} سؤال حساب می‌شود و ${fd(2)} سؤال آزمایشی است که نمره ندارد (نمی‌دانی کدام‌اند).</li>
          <li>وقت: <b>${fd(30)} دقیقه</b>. با اولین سؤال اصلی شروع می‌شود.</li>
          <li>برای قبولی: <b>${fd(44)} جواب درست</b> از ${fd(50)}.</li>
          <li>مثل آزمون واقعی، تا آخر آزمون جواب درست را نمی‌بینی. در آخر نتیجه هر فصل را می‌بینی.</li>
          <li>همه نوع سؤال CBR هست: بله/خیر، چندگزینه‌ای، عدد، زدن روی تصویر، ترتیب، چند جواب درست و فیلم کوتاه.</li>
        </ul>
        <button class="btn btn-coral btn-block" id="go">شروع آزمون ←</button>
      </div></main>`;
    bindGo();
    document.getElementById('go').onclick = () => { startRun('x', '_'); RUN.fresh = true; go('#/q/x/_/0'); };
  }

  /* ---------- sign dictionary ---------- */
  const CAT = { A: 'سرعت', B: 'حق تقدم', C: 'ورود ممنوع', D: 'جهت اجباری', E: 'پارک و توقف', F: 'دیگر دستورها', G: 'نوع راه', H: 'منطقه شهری', J: 'هشدار', K: 'مسیریابی', L: 'اطلاعات' };
  function signs(cat) {
    const all = window.RW_SIGNS || [], c = cat || S.scat || 'A'; S.scat = c; save();
    const list = all.filter(s => s[1] === c);
    $app.innerHTML = header('فرهنگ تابلوها', { back: '#/', right: flags, sub: 'Bijlage 1 RVV 1990 · ' + fd(all.length) + ' تابلو' }) +
      `<main class="body"><div class="chips">${Object.keys(CAT).map(k => `<button class="${k === c ? 'on' : ''}" data-cat="${k}">${k} · ${CAT[k]}</button>`).join('')}</div>
        <div class="scroll body" style="padding:0"><div class="slist">${list.map(s => `<button class="sitem" data-go="#/s/${s[0]}"><img src="signs/${s[0]}.svg" alt="${s[0]}" loading="lazy"><b>${s[0]}</b><small>${s[3]}</small></button>`).join('')}</div></div></main>`;
    bindGo();
    $app.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => signs(b.dataset.cat));
    const on = $app.querySelector('.chips .on'); on && on.scrollIntoView({ inline: 'center', block: 'nearest' });
  }
  function signOne(code) {
    const all = window.RW_SIGNS || [], k = all.findIndex(s => s[0] === code); if (k < 0) return go('#/s');
    const s = all[k], list = all.filter(x => x[1] === s[1]), j = list.indexOf(s);
    const nx = list[(j + 1) % list.length][0], pv = list[(j - 1 + list.length) % list.length][0];
    $app.innerHTML = header('تابلوی ' + s[0], { back: '#/s', right: flags, sub: CAT[s[1]] }) +
      `<main class="body"><div class="card sdetail fadein"><img src="signs/${s[0]}.svg" alt="${s[0]}"><div class="code">${s[0]}</div><div class="fa">${s[3]}</div><div class="nl">${s[2]}</div><div class="muted">${fd(j + 1)} از ${fd(list.length)}</div></div>
      <div class="navrow"><button class="btn btn-line" data-go="#/s/${pv}">→ قبلی</button><button class="btn btn-coral" data-go="#/s/${nx}">بعدی ←</button></div></main>`;
    bindGo(); swipe($app.querySelector('.sdetail'), () => go('#/s/' + nx), () => go('#/s/' + pv));
  }
  /* ---------- glossary ---------- */
  function glossary() {
    const seen = {}, G = D.glossary.filter(g => { const k = g.nl.toLowerCase(); if (seen[k]) return false; seen[k] = 1; return true; }).sort((a, b) => a.nl.localeCompare(b.nl, 'nl'));
    $app.innerHTML = header('واژه‌نامه آزمون', { back: '#/', right: flags, sub: fd(G.length) + ' اصطلاح · NL · EN · FA' }) +
      `<main class="body"><input class="search" id="q" placeholder="جستجو: هلندی، انگلیسی یا فارسی" dir="auto" /><div class="scroll body" style="padding:0" id="gl"></div></main>`;
    bindGo();
    const box = document.getElementById('gl'), inp = document.getElementById('q');
    const draw = () => { const t = inp.value.trim().toLowerCase(); box.innerHTML = G.filter(g => !t || (g.nl + ' ' + g.en + ' ' + g.fa).toLowerCase().includes(t)).slice(0, 400).map(g => `<div class="gitem"><div class="nl">${g.nl}</div>${g.en ? `<div class="en" dir="ltr">${g.en}</div>` : ''}<div class="fa">${g.fa}</div></div>`).join('') || '<p class="muted">چیزی پیدا نشد</p>'; };
    inp.oninput = draw; draw();
  }

  function route() {
    reset();
    const h = (location.hash || '#/').slice(1).split('/').filter(Boolean);
    if (h[0] === 'l') return lesson(h[1]);
    if (h[0] === 't') return theory(h[1], +h[2] || 0);
    if (h[0] === 'q') return question(h[1], h[2] || '_', +h[3] || 0);
    if (h[0] === 'x') return examIntro();
    if (h[0] === 's') return h[1] ? signOne(decodeURIComponent(h[1])) : signs();
    if (h[0] === 'g') return glossary();
    home();
  }
  window.__run = () => RUN; window.__S = () => S;
  window.addEventListener('hashchange', route);
  route();
})();
