/* Rijwijs — precise top-down SVG traffic scenes. Right-hand traffic (NL).
   Local frame = approach from the South (bottom), heading North (up). Other approaches are rotations. */
(function () {
  var C = 150, ROT = { S: 0, W: 90, N: 180, E: 270 };
  var COL = { you: '#E8734A', a: '#3F9BD6', b: '#9B6BD0', c: '#5BB36A', d: '#E3A72F' };
  function rot(x, y, deg) { var r = deg * Math.PI / 180, dx = x - C, dy = y - C; return [C + dx * Math.cos(r) - dy * Math.sin(r), C + dx * Math.sin(r) + dy * Math.cos(r)]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function roads(sp) {
    var arms = sp.arms || (sp.type === 't' ? ['S', 'E', 'W'] : ['S', 'N', 'E', 'W']);
    var o = '<rect width="300" height="300" fill="#E3EED3"/>';
    if (sp.buildings) {
      [[0, 0], [197, 0], [0, 197], [197, 197]].forEach(function (p) { o += '<rect x="' + (p[0] + 6) + '" y="' + (p[1] + 6) + '" width="91" height="91" rx="6" fill="#E9D3B4" stroke="#CDB18A" stroke-width="2"/><rect x="' + (p[0] + 18) + '" y="' + (p[1] + 18) + '" width="67" height="67" rx="4" fill="#D9BE98"/>'; });
    }
    // sidewalks
    arms.forEach(function (a) { o += '<g transform="rotate(' + ROT[a] + ' 150 150)"><rect x="105" y="150" width="90" height="150" fill="#EDE6D8"/></g>'; });
    o += '<rect x="105" y="105" width="90" height="90" fill="#EDE6D8"/>';
    arms.forEach(function (a) {
      var un = sp.unpaved && sp.unpaved.indexOf(a) >= 0;
      o += '<g transform="rotate(' + ROT[a] + ' 150 150)"><rect x="115" y="150" width="70" height="150" fill="' + (un ? '#C8A66F' : '#8F959B') + '"/>';
      if (un) { for (var i = 0; i < 18; i++) o += '<circle cx="' + (120 + (i * 37) % 60) + '" cy="' + (195 + (i * 23) % 100) + '" r="1.6" fill="#A9864F"/>'; }
      else o += '<line x1="150" y1="200" x2="150" y2="300" stroke="#fff" stroke-width="2" stroke-dasharray="9 9"/>';
      if (sp.bikelane && sp.bikelane === a) o += '<rect x="174" y="186" width="11" height="114" fill="#C9604A" opacity=".9"/><line x1="174" y1="186" x2="174" y2="300" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5"/>';
      o += '</g>';
    });
    o += '<rect x="115" y="115" width="70" height="70" fill="#8F959B"/>';
    if (sp.unpaved) sp.unpaved.forEach(function (a) { o += '<g transform="rotate(' + ROT[a] + ' 150 150)"><rect x="115" y="185" width="70" height="3" fill="#8F959B"/></g>'; });
    if (sp.tram) { // tram rails along the W-E road, eastbound lane
      o += '<g stroke="#4A4F55" stroke-width="1.6"><line x1="0" y1="161" x2="300" y2="161"/><line x1="0" y1="173" x2="300" y2="173"/></g>';
    }
    arms.forEach(function (a) {
      o += '<g transform="rotate(' + ROT[a] + ' 150 150)">';
      if (sp.teeth && sp.teeth.indexOf(a) >= 0) { for (var x = 151; x < 184; x += 8.2) o += '<path d="M' + x + ',189 l7,0 l-3.5,9z" fill="#fff"/>'; }
      if (sp.zebra && sp.zebra.indexOf(a) >= 0) { for (var zx = 118; zx < 184; zx += 11) o += '<rect x="' + zx + '" y="196" width="7" height="22" fill="#fff"/>'; }
      if (sp.stopline && sp.stopline.indexOf(a) >= 0) o += '<rect x="151" y="189" width="34" height="4" fill="#fff"/><text x="168" y="216" font-size="9" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial">STOP</text>';
      o += '</g>';
    });
    return o;
  }
  function signAt(a, id, k) { // sign on the right-hand corner of approach a, kept upright
    var p = rot(207, 205 + (k || 0) * 30, ROT[a]);
    return '<g><line x1="' + p[0] + '" y1="' + (p[1] + 13) + '" x2="' + p[0] + '" y2="' + (p[1] + 22) + '" stroke="#6b6b6b" stroke-width="2"/><image href="signs/' + id + '.svg" x="' + (p[0] - 14) + '" y="' + (p[1] - 14) + '" width="28" height="28"/></g>';
  }
  function lightAt(a, color) {
    var p = rot(200, 196, ROT[a]);
    var on = { red: '#E53935', yellow: '#F9C02D', green: '#2EAD4B' };
    return '<g><rect x="' + (p[0] - 6) + '" y="' + (p[1] - 16) + '" width="12" height="32" rx="3" fill="#2B2B2B"/>' +
      ['red', 'yellow', 'green'].map(function (c, i) { return '<circle cx="' + p[0] + '" cy="' + (p[1] - 9 + i * 9) + '" r="3.4" fill="' + (c === color ? on[c] : '#555') + '"/>'; }).join('') + '</g>';
  }
  function arrowPath(go, x) {
    x = x || 167;
    if (go === 'straight') return 'M' + x + ',196 L' + x + ',55';
    if (go === 'right') return 'M' + x + ',196 L' + x + ',182 Q' + x + ',' + 167 + ' ' + (x + 18) + ',167 L245,167';
    if (go === 'left') return 'M' + x + ',196 L' + x + ',170 Q' + x + ',133 ' + (x - 35) + ',133 L55,133';
    return '';
  }
  function head(go, x) {
    x = x || 167;
    if (go === 'straight') return 'M' + (x - 6) + ',60 L' + x + ',48 L' + (x + 6) + ',60z';
    if (go === 'right') return 'M240,161 L252,167 L240,173z';
    if (go === 'left') return 'M60,127 L48,133 L60,139z';
    return '';
  }
  function body(u) {
    var col = u.color || COL[u.id] || COL.a, k = u.kind || 'car';
    if (k === 'bike' || k === 'moped') {
      return '<rect x="-2" y="-12" width="4" height="24" rx="2" fill="#333"/><rect x="-7" y="-6" width="14" height="3" rx="1.5" fill="#333"/>' +
        '<ellipse cx="0" cy="2" rx="7" ry="5.5" fill="' + col + '"/><circle cx="0" cy="-1" r="' + (k === 'moped' ? 4.6 : 3.8) + '" fill="' + (k === 'moped' ? '#222' : '#F0C9A0') + '"/>';
    }
    if (k === 'ped') return '<circle cx="0" cy="0" r="7" fill="' + col + '"/><circle cx="0" cy="0" r="4" fill="#F0C9A0"/>';
    if (k === 'kid') return '<circle cx="0" cy="0" r="5.5" fill="#E45D8C"/><circle cx="0" cy="0" r="3.2" fill="#F0C9A0"/>';
    if (k === 'bus' || k === 'truck') return '<rect x="-12" y="-34" width="24" height="68" rx="4" fill="' + (k === 'bus' ? '#F2C200' : col) + '" stroke="rgba(0,0,0,.2)"/><rect x="-9" y="-30" width="18" height="7" rx="2" fill="#2E3A44" opacity=".8"/>' + (k === 'truck' ? '<rect x="-12" y="-18" width="24" height="2" fill="rgba(0,0,0,.25)"/>' : '<text x="0" y="6" font-size="8" font-weight="900" fill="#5E3A22" text-anchor="middle" font-family="Arial" transform="rotate(90)">BUS</text>');
    if (k === 'tractor') return '<rect x="-11" y="-6" width="22" height="22" rx="3" fill="#5BB36A"/><rect x="-7" y="-18" width="14" height="13" rx="2" fill="#5BB36A"/><rect x="-14" y="2" width="5" height="14" rx="2" fill="#333"/><rect x="9" y="2" width="5" height="14" rx="2" fill="#333"/><rect x="-6" y="-2" width="12" height="8" rx="1" fill="#2E3A44" opacity=".7"/>';
    if (k === 'moto') return '<rect x="-3" y="-15" width="6" height="30" rx="3" fill="#333"/><ellipse cx="0" cy="1" rx="7" ry="7" fill="' + col + '"/><circle cx="0" cy="-1" r="4.5" fill="#222"/>';
    if (k === 'pol') return '<rect x="-10" y="-18" width="20" height="36" rx="6" fill="#fff" stroke="#C9C9C9"/><rect x="-7.5" y="-12" width="15" height="7" rx="2" fill="#2E3A44" opacity=".8"/><rect x="-10" y="0" width="20" height="5" fill="#1F4FB3"/><rect x="-10" y="5" width="20" height="2.5" fill="#E8734A"/><rect x="-6" y="-4" width="12" height="3" rx="1" fill="#1E6FFF"/>';
    if (k === 'tram') return '<rect x="-12" y="-42" width="24" height="84" rx="7" fill="#F2F2F2" stroke="#2F6FB0" stroke-width="3"/><rect x="-8" y="-38" width="16" height="9" rx="2" fill="#2F6FB0"/><text x="0" y="6" font-size="8" font-weight="900" fill="#2F6FB0" text-anchor="middle" font-family="Arial" transform="rotate(90)">TRAM</text>';
    if (k === 'van') return '<rect x="-11" y="-24" width="22" height="48" rx="5" fill="' + col + '"/><rect x="-8" y="-20" width="16" height="7" rx="2" fill="#2E3A44" opacity=".75"/>';
    var amb = k === 'amb';
    return '<rect x="-10" y="-18" width="20" height="36" rx="6" fill="' + (amb ? '#FFFFFF' : col) + '" stroke="' + (amb ? '#C9C9C9' : 'rgba(0,0,0,.15)') + '" stroke-width="1"/>' +
      '<rect x="-7.5" y="-12" width="15" height="7" rx="2" fill="#2E3A44" opacity=".8"/><rect x="-7.5" y="9" width="15" height="4.5" rx="1.5" fill="#2E3A44" opacity=".55"/>' +
      (amb ? '<rect x="-10" y="-1" width="20" height="4" fill="#F2C200"/><rect x="-10" y="3" width="20" height="3" fill="#2F6FB0"/><rect x="-6" y="-4" width="12" height="3" rx="1" fill="#1E6FFF"/>' : '');
  }
  function unit(u, i, sp) {
    var a = u.from || 'S', deg = ROT[a], d = u.d || 0, x = u.x || 167, y = 222 + d;
    if (u.kind === 'tram') y = 250 + d; else if (u.kind === 'bike' || u.kind === 'moped') y = 214 + d; else if (u.kind === 'van') y = 230 + d;
    if (u.at) { x = u.at[0]; y = u.at[1]; }
    var col = u.color || COL[u.id] || COL.a, o = '';
    var anim = u.anim ? ' class="drive" style="--dy:' + u.anim[0] + 'px;--dl:' + (u.anim[1] || 0) + 's;--du:' + (u.anim[2] || 3) + 's"' : '';
    o += '<g transform="rotate(' + deg + ' 150 150)">';
    if (u.go && !sp.noArrows) o += '<g' + (u.anim ? ' class="arrowin"' : '') + ' opacity=".85"><path d="' + arrowPath(u.go, x) + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-dasharray="7 5" stroke-linecap="round"/><path d="' + head(u.go, x) + '" fill="' + col + '"/></g>';
    o += '<g' + anim + '><g transform="translate(' + x + ' ' + y + ')">' + body(u) + '</g>';
    if (u.kind === 'amb') o += '<g transform="translate(' + x + ' ' + y + ')" fill="none" stroke="#1E6FFF" stroke-width="2" stroke-linecap="round"><path d="M-15,-22 q-6,-6 0,-13"/><path d="M15,-22 q6,-6 0,-13"/><path d="M-21,-24 q-8,-9 0,-18"/><path d="M21,-24 q8,-9 0,-18"/></g>';
    o += '</g></g>';
    var small = u.kind === 'bike' || u.kind === 'moped', p = u.lo ? rot(x + u.lo[0], y + u.lo[1], deg) : small ? rot(x - 21, y + 2, deg) : rot(x, y, deg), lbl = u.label || (u.id === 'you' ? 'تو' : '');
    if (lbl) {
      var hot = u.hot ? ' data-hot="' + u.hot + '" class="hot"' : '';
      o += '<g' + hot + (u.anim ? ' style="display:none"' : '') + '><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (u.hot ? 13 : 11) + '" fill="#fff" stroke="' + col + '" stroke-width="3"/><text x="' + p[0] + '" y="' + (p[1] + 4.6) + '" font-size="' + (lbl.length > 1 ? 10 : 13) + '" font-weight="900" text-anchor="middle" fill="' + col + '" font-family="Vazirmatn, Fredoka, sans-serif">' + esc(lbl) + '</text><text class="ord" x="' + (p[0] + 12) + '" y="' + (p[1] - 10) + '" font-size="12" font-weight="900" fill="#fff" text-anchor="middle"></text></g>';
    }
    return o;
  }
  function signsBoard(sp) { // grid of signs with optional captions / hotspots
    var n = sp.signs.length, cols = n <= 2 ? n : 2, rows = Math.ceil(n / cols), w = 300 / cols, h = (sp.h || 300) / rows, o = '<rect width="300" height="' + (sp.h || 300) + '" fill="#FFFDF7"/>';
    sp.signs.forEach(function (s, i) {
      var cx = (i % cols) * w + w / 2, cy = Math.floor(i / cols) * h + h / 2 - (s.cap ? 10 : 0), sz = Math.min(w, h) * (s.cap ? .56 : .68);
      o += '<g' + (s.hot ? ' data-hot="' + s.hot + '" class="hot"' : '') + '><rect x="' + ((i % cols) * w + 6) + '" y="' + (Math.floor(i / cols) * h + 6) + '" width="' + (w - 12) + '" height="' + (h - 12) + '" rx="14" fill="#fff" stroke="#EFE3C9" stroke-width="2"/>' +
        '<image href="signs/' + s.id + '.svg" x="' + (cx - sz / 2) + '" y="' + (cy - sz / 2) + '" width="' + sz + '" height="' + sz + '"/>' +
        (s.cap ? '<text x="' + cx + '" y="' + (cy + sz / 2 + 17) + '" font-size="12.5" font-weight="700" fill="#5E3A22" text-anchor="middle" font-family="Vazirmatn">' + esc(s.cap) + '</text>' : '') + '</g>';
    });
    return o;
  }
  function ladder() { // aanwijzingen > verkeerslichten > borden > regels
    var rows = [['۱', 'Aanwijzingen', 'پلیس / راهنمای ترافیک', 'p'], ['۲', 'Verkeerslichten', 'چراغ راهنمایی', 'l'], ['۳', 'Verkeersborden', 'تابلو و خط‌کشی', 's'], ['۴', 'Verkeersregels', 'قانون کلی (راست مقدم)', 'r']];
    var o = '<rect width="300" height="300" fill="#FFFDF7"/>';
    rows.forEach(function (r, i) {
      var y = 12 + i * 71, w = 276 - i * 22, x = 150 - w / 2, cl = ['#E8734A', '#E3A72F', '#5BB36A', '#3F9BD6'][i];
      o += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="62" rx="14" fill="#fff" stroke="' + cl + '" stroke-width="3"/>';
      o += '<circle cx="' + (x + w - 24) + '" cy="' + (y + 31) + '" r="15" fill="' + cl + '"/><text x="' + (x + w - 24) + '" y="' + (y + 37) + '" font-size="16" font-weight="900" fill="#fff" text-anchor="middle" font-family="Vazirmatn">' + r[0] + '</text>';
      o += '<text x="' + (x + w - 48) + '" y="' + (y + 27) + '" font-size="13" font-weight="900" fill="#5E3A22" text-anchor="end" font-family="Vazirmatn">' + r[2] + '</text>';
      o += '<text x="' + (x + w - 48) + '" y="' + (y + 47) + '" font-size="11.5" font-weight="700" fill="' + cl + '" text-anchor="end" font-family="Fredoka, Arial">' + r[1] + '</text>';
      var ix = x + 28, iy = y + 31;
      if (r[3] === 'p') o += '<circle cx="' + ix + '" cy="' + (iy - 12) + '" r="6" fill="#F0C9A0"/><rect x="' + (ix - 9) + '" y="' + (iy - 22) + '" width="18" height="5" rx="2" fill="#1F3A6B"/><rect x="' + (ix - 7) + '" y="' + (iy - 5) + '" width="14" height="22" rx="4" fill="#1F3A6B"/><rect x="' + (ix - 22) + '" y="' + (iy - 4) + '" width="16" height="5" rx="2" fill="#1F3A6B"/><rect x="' + (ix + 6) + '" y="' + (iy - 4) + '" width="16" height="5" rx="2" fill="#1F3A6B"/>';
      if (r[3] === 'l') o += '<rect x="' + (ix - 8) + '" y="' + (iy - 22) + '" width="16" height="44" rx="4" fill="#2B2B2B"/><circle cx="' + ix + '" cy="' + (iy - 12) + '" r="5" fill="#E53935"/><circle cx="' + ix + '" cy="' + iy + '" r="5" fill="#555"/><circle cx="' + ix + '" cy="' + (iy + 12) + '" r="5" fill="#2EAD4B"/>';
      if (r[3] === 's') o += '<image href="signs/B6.svg" x="' + (ix - 20) + '" y="' + (iy - 20) + '" width="40" height="40"/>';
      if (r[3] === 'r') o += '<path d="M' + (ix - 16) + ',' + iy + ' h26 m-8,-8 l9,8 l-9,8" fill="none" stroke="#3F9BD6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    });
    return o;
  }
  function render(sp) {
    if (!sp) return '';
    var vbH = sp.h || 300, inner = '';
    if (window.SceneX && SceneX[sp.type]) inner = SceneX[sp.type](sp, { unit: unit, body: body, signAt: signAt, lightAt: lightAt, esc: esc });
    else if (sp.type === 'signs') inner = signsBoard(sp);
    else if (sp.type === 'ladder') inner = ladder();
    else {
      inner = roads(sp);
      (sp.signsAt || []).forEach(function (s) { inner += signAt(s[0], s[1], s[2]); });
      (sp.lights || []).forEach(function (l) { inner += lightAt(l[0], l[1]); });
      (sp.units || []).forEach(function (u, i) { inner += unit(u, i, sp); });
      if (sp.wx && window.SceneX) inner += SceneX.wx(sp.wx);
      if (sp.note) inner += '<rect x="8" y="8" width="' + (sp.note.length * 7.2 + 18) + '" height="24" rx="12" fill="rgba(255,255,255,.92)"/><text x="17" y="25" font-size="12" font-weight="700" fill="#5E3A22" font-family="Fredoka, Arial">' + esc(sp.note) + '</text>';
      if (sp.mark) inner += sp.mark;
    }
    return '<svg class="scene" viewBox="0 0 300 ' + vbH + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(sp.alt || '') + '">' + inner + '</svg>';
  }
  window.Scene = { render: render, body: body, esc: esc };
})();
