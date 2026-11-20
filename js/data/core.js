/* CBR Daniel — course structure and content helpers. All lesson text, questions and explanations are written by us
   from the law texts (RVV 1990 BWBR0004825 version 2026-07-01, WVW 1994, Regeling voertuigen, Reglement rijbewijzen)
   and the official CBR exam information (cbr.nl, Rijprocedure B for ADAS). Nothing is copied from commercial apps. */
window.RW = {
  exam: { q: 50, test: 2, warm: 2, min: 30, pass: 44 },
  chapters: [
    { n: 1, fa: 'جاده و جای تو در آن', nl: 'Gebruik van de weg', ex: 7, lessons: ['plaats', 'snel', 'inhaal', 'park'] },
    { n: 2, fa: 'حق تقدم و اول گذاشتن', nl: 'Voorrang en voor laten gaan', ex: 9, lessons: ['vk', 'afslaan', 'roto', 'manv'] },
    { n: 3, fa: 'راه‌های ویژه و کاربران آسیب‌پذیر', nl: 'Bijzondere wegen en weggebruikers', ex: 6, lessons: ['snelweg', 'erf', 'overweg', 'kwets'] },
    { n: 4, fa: 'رانندگی ایمن و شرایط اضطراری', nl: 'Veilig rijden en noodsituaties', ex: 7, lessons: ['afstand', 'zicht', 'gevaar', 'pech'] },
    { n: 5, fa: 'تابلوها، چراغ‌ها و خط‌کشی', nl: 'Verkeerstekens en aanwijzingen', ex: 8, lessons: ['waarsch', 'verbod', 'aanwijs', 'lichten'] },
    { n: 6, fa: 'رانندگی مسئولانه، ADAS و محیط زیست', nl: 'Verantwoord rijden, ADAS en milieu', ex: 5, lessons: ['alcohol', 'afleid', 'adas1', 'adas2', 'milieu'] },
    { n: 7, fa: 'قانون و مدارک', nl: 'Wetgeving', ex: 4, lessons: ['rijbew', 'papier', 'gordel', 'ongeval'] },
    { n: 8, fa: 'شناخت خودرو', nl: 'Voertuigkennis', ex: 4, lessons: ['lamp', 'onderh', 'zichtauto', 'aanh'] }
  ],
  lessons: {}, glossary: []
};
(function () {
  var R = window.RW;
  function opts(o) { return (o || []).map(function (x) { return Array.isArray(x) ? { fa: x[0], nl: x[1] || '' } : x; }); }
  function kk(k) { if (!k) return null; var p = k.split('|'); return { nl: p[0], en: p[1] || '' }; }
  var h = {
    C: function (t, nl, en, x, ref, s, say) { return { t: t, nl: nl, en: en, x: x, ref: ref, s: s, say: say }; },
    mc: function (q, nl, o, a, e, ref, s, k) { return { type: 'mc', q: q, nl: nl, o: opts(o), a: a, e: e, ref: ref, s: s, k: kk(k) }; },
    yn: function (q, nl, a, e, ref, s, k) { return { type: 'yn', q: q, nl: nl, a: a ? 0 : 1, e: e, ref: ref, s: s, k: kk(k) }; },
    num: function (q, nl, a, e, ref, s, k) { return { type: 'num', q: q, nl: nl, a: a, e: e, ref: ref, s: s, k: kk(k) }; },
    hot: function (q, nl, a, e, ref, s, k) { return { type: 'hot', q: q, nl: nl, a: a, e: e, ref: ref, s: s, k: kk(k) }; },
    ord: function (q, nl, a, e, ref, s, k) { return { type: 'order', q: q, nl: nl, a: a, e: e, ref: ref, s: s, k: kk(k) }; },
    mul: function (q, nl, o, a, e, ref, s, k) { return { type: 'multi', q: q, nl: nl, o: opts(o), a: a, e: e, ref: ref, s: s, k: kk(k) }; },
    anim: function (q, nl, o, a, e, ref, s, k) { return { type: 'anim', q: q, nl: nl, o: opts(o), a: a, e: e, ref: ref, s: s, k: kk(k), terms: kk(k) }; },
    /* register a lesson; question ids = <lesson>.<n>, card audio = audio/<lesson>-<NN>.mp3 */
    L: function (l) {
      l.qs = (l.qs || []).concat(l.gen ? l.gen() : []);
      l.qs.forEach(function (q, i) { q.id = l.id + '.' + (i + 1); q.lid = l.id; q.ch = l.ch; });
      l.cards.forEach(function (c, i) { c.aid = l.id + '-' + String(i + 1).padStart(2, '0'); });
      R.lessons[l.id] = l;
      (l.cards || []).forEach(function (c) { if (c.nl) R.glossary.push({ nl: c.nl, en: c.en, fa: c.t, lid: l.id }); });
      (l.terms || []).forEach(function (t) { R.glossary.push({ nl: t[0], en: t[1], fa: t[2], lid: l.id }); });
    },
    sign: function (code, cap) { return { type: 'pic', t: [{ s: code, c: cap }] }; },
    pic: function (t, o) { var s = { type: 'pic', t: t.map(function (x) { return typeof x === 'string' ? { i: x } : x; }) }; for (var k in (o || {})) s[k] = o[k]; return s; }
  };
  /* seeded shuffle so generated questions are stable between visits */
  function rnd(seed) { var x = 0; for (var i = 0; i < seed.length; i++) x = (x * 31 + seed.charCodeAt(i)) | 0; return function () { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; }; }
  function shuffle(a, r) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  h.shuffle = shuffle; h.rnd = rnd;
  /* sign questions generated from the dictionary (Bijlage 1): «what does this sign mean?» + «tap the sign that means …» */
  h.signQs = function (codes, pool, opt) {
    opt = opt || {}; var S = {}; (window.RW_SIGNS || []).forEach(function (s) { S[s[0]] = s; });
    pool = (pool || codes).filter(function (c) { return S[c]; }); codes = codes.filter(function (c) { return S[c]; });
    var same = opt.same || [['C3', 'C4'], ['J12', 'J13'], ['L2', 'J22'], ['C23-01', 'C23-02'], ['J9', 'D1'], ['G11', 'G12a'], ['K12', 'K13'], ['K1', 'K4'], ['K7', 'K8'], ['L14', 'L15']];
    var clash = function (a, b) { return a === b || S[a][3] === S[b][3] || same.some(function (p) { return p.indexOf(a) >= 0 && p.indexOf(b) >= 0; }); };
    var out = [];
    codes.forEach(function (c, i) {
      var r = rnd(c + (opt.seed || '')), others = shuffle(pool.filter(function (x) { return !clash(x, c); }), r);
      var d = []; others.forEach(function (x) { if (d.length < 2 && d.every(function (y) { return !clash(x, y); })) d.push(x); });
      var o = shuffle([c].concat(d), r), a = o.indexOf(c);
      var ref = 'RVV پیوست ۱ (' + c + ')', k = S[c][2].split(/[,;(]/)[0].trim() + '|sign ' + c;
      if (i % 3 !== 2 || d.length < 2) out.push({ type: 'mc', q: 'این تابلو یعنی چه؟', nl: 'Wat betekent dit bord?', o: o.map(function (x) { return { fa: S[x][3], nl: '' }; }), a: a, e: 'تابلوی <b>' + c + '</b>: ' + S[c][3] + '.' + (opt.extra && opt.extra[c] ? ' ' + opt.extra[c] : ''), ref: ref, s: { type: 'pic', t: [{ s: c }] }, k: { nl: k.split('|')[0], en: 'sign ' + c } });
      else {
        var four = shuffle([c].concat(others.filter(function (x) { return !clash(x, c); }).slice(0, 3)), r);
        out.push({ type: 'hot', q: 'روی تابلویی بزن که یعنی: «' + S[c][3] + '»', nl: 'Klik op het juiste bord.', a: c, e: 'تابلوی درست <b>' + c + '</b> است: ' + S[c][3] + '.' + (opt.extra && opt.extra[c] ? ' ' + opt.extra[c] : ''), ref: ref, s: { type: 'signs', signs: four.map(function (x) { return { id: x, hot: x }; }) }, k: { nl: k.split('|')[0], en: 'sign ' + c } });
      }
    });
    return out;
  };
  R.h = h;
})();
