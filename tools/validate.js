// node tools/validate.js — loads all content like the browser, checks every card/question, renders every scene.
const fs = require('fs'), path = require('path'), R = p => path.join(__dirname, '..', p);
global.window = global; global.document = undefined;
['js/data/core.js', 'js/data/signs.js', ...[1, 2, 3, 4, 5, 6, 7, 8].map(n => `js/data/ch${n}.js`), 'js/diagram.js', 'js/scenes.js'].forEach(f => { try { eval(fs.readFileSync(R(f), 'utf8')); } catch (e) { console.log('LOAD ERROR', f, e.message); process.exitCode = 1; } });
const D = window.RW, errs = [], types = {}, bych = {}, signsOK = new Set(fs.readdirSync(R('signs')).map(f => f.replace(/\.svg$/, '')));
let nq = 0, nc = 0;
const chk = (c, m) => { if (!c) errs.push(m); };
D.chapters.forEach(ch => ch.lessons.forEach(lid => {
  const l = D.lessons[lid]; if (!l) { errs.push('missing lesson ' + lid); return; }
  chk(l.ch === ch.n, lid + ' wrong ch'); bych[ch.n] = (bych[ch.n] || 0) + l.qs.length;
  l.cards.forEach((c, i) => { nc++; const id = lid + '-c' + (i + 1); chk(c.t && c.x && c.ref, id + ' incomplete'); chk(c.s, id + ' no image');
    let svg = ''; try { svg = Scene.render(c.s); } catch (e) { errs.push(id + ' render ' + e.message); }
    (svg.match(/signs\/([^".]+)\.svg/g) || []).forEach(m => { const k = m.slice(6, -4); chk(signsOK.has(k), id + ' missing sign ' + k); }); });
  l.qs.forEach(q => { nq++; types[q.type] = (types[q.type] || 0) + 1; const id = q.id;
    chk(q.q && q.e && q.ref, id + ' incomplete'); chk(q.s, id + ' no image');
    let svg = ''; try { svg = Scene.render(q.s); } catch (e) { errs.push(id + ' render ' + e.message); }
    (svg.match(/signs\/([^".]+)\.svg/g) || []).forEach(m => { const k = m.slice(6, -4); chk(signsOK.has(k), id + ' missing sign ' + k); });
    const hots = (svg.match(/data-hot="([^"]+)"/g) || []).map(m => m.slice(10, -1));
    if (q.type === 'mc' || q.type === 'anim') chk(q.o && q.o.length >= 2 && q.a >= 0 && q.a < q.o.length, id + ' bad mc');
    if (q.type === 'yn') chk(q.a === 0 || q.a === 1, id + ' bad yn');
    if (q.type === 'num') chk(Number.isInteger(q.a) && q.a >= 0 && q.a < 10000, id + ' bad num');
    if (q.type === 'multi') chk(Array.isArray(q.a) && q.a.length >= 1 && q.a.every(k => k < q.o.length), id + ' bad multi');
    if (q.type === 'hot') chk(hots.includes(q.a) && hots.length >= 2, id + ' hot target missing ' + q.a + ' in [' + hots + ']');
    if (q.type === 'order') chk(Array.isArray(q.a) && q.a.every(a => hots.includes(a)) && q.a.length === hots.length, id + ' order ids ' + q.a + ' vs ' + hots);
    if (q.type === 'anim') chk(/class="drive"/.test(svg), id + ' anim without animation');
  });
}));
console.log('lessons', Object.keys(D.lessons).length, 'cards', nc, 'questions', nq, JSON.stringify(types), 'by chapter', JSON.stringify(bych), 'signs', (window.RW_SIGNS || []).length, 'glossary', D.glossary.length);
if (errs.length) { console.log(errs.length + ' ERRORS'); console.log(errs.slice(0, 60).join('\n')); process.exitCode = 1; } else console.log('OK');
