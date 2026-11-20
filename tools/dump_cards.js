// prints JSON [{aid, text}] of every theory card's narration (card.say, else title + Dutch term + body without HTML)
const fs = require('fs'), path = require('path'), R = p => path.join(__dirname, '..', p);
global.window = global;
['js/data/core.js', 'js/data/signs.js', ...[1, 2, 3, 4, 5, 6, 7, 8].map(n => `js/data/ch${n}.js`)].forEach(f => eval(fs.readFileSync(R(f), 'utf8')));
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const out = [];
RW.chapters.forEach(ch => ch.lessons.forEach(lid => { const l = RW.lessons[lid]; if (!l) return;
  l.cards.forEach(c => out.push({ aid: c.aid, text: c.say ? strip(c.say) : strip(c.t) + '. ' + (c.nl ? 'به هلندی: ' + strip(c.nl).replace(/[→·]/g, '،') + '. ' : '') + strip(c.x) })); }));
console.log(JSON.stringify(out));
