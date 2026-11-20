/* CBR Daniel — extra scene types: straight roads ('road'), roundabouts ('round'), pictogram panels ('pic'),
   weather overlays and a small icon library. All drawn in code; signs come from signs/*.svg (Wikimedia Commons, PD). */
(function () {
  var COL = { you: '#E8734A', a: '#3F9BD6', b: '#9B6BD0', c: '#5BB36A', d: '#E3A72F', e: '#E45D8C' };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.fs || 12) + '" font-weight="' + (o.fw || 900) + '" fill="' + (o.c || '#5E3A22') + '" text-anchor="' + (o.a || 'middle') + '" font-family="' + (o.ff || 'Vazirmatn, Fredoka, Arial') + '"' + (o.dir ? ' direction="' + o.dir + '"' : '') + '>' + esc(s) + '</text>'; }
  function sign(code, x, y, sz) { return '<image href="signs/' + code + '.svg" x="' + (x - sz / 2) + '" y="' + (y - sz / 2) + '" width="' + sz + '" height="' + sz + '"/>'; }
  function pill(x, y, s, o) { o = o || {}; var w = s.length * (o.w || 7.2) + 18; return '<rect x="' + (o.a === 'end' ? x - w : x) + '" y="' + y + '" width="' + w + '" height="24" rx="12" fill="' + (o.bg || 'rgba(255,255,255,.93)') + '"/>' + T((o.a === 'end' ? x - w : x) + w / 2, y + 16.5, s, { fs: 12, fw: 700, c: o.c || '#5E3A22', ff: 'Vazirmatn, Fredoka, Arial' }); }
  function note(sp) { return sp.note ? pill(8, 8, sp.note) : ''; }

  /* ---------- weather / light overlays ---------- */
  function wx(k) {
    var o = '';
    if (k === 'fog') o = '<rect width="300" height="300" fill="#fff" opacity=".55"/><rect width="300" height="150" fill="#fff" opacity=".3"/>';
    if (k === 'night') o = '<rect width="300" height="300" fill="#0B1A33" opacity=".55"/><circle cx="270" cy="30" r="13" fill="#FFF3C4"/><circle cx="276" cy="25" r="12" fill="#2A3550"/>';
    if (k === 'rain') { for (var i = 0; i < 46; i++) o += '<line x1="' + ((i * 53) % 300) + '" y1="' + ((i * 37) % 300) + '" x2="' + ((i * 53) % 300 - 5) + '" y2="' + ((i * 37) % 300 + 13) + '" stroke="#5B8FC9" stroke-width="2" opacity=".7"/>'; o = '<rect width="300" height="300" fill="#7C93AB" opacity=".18"/>' + o; }
    if (k === 'snow') { for (var j = 0; j < 50; j++) o += '<circle cx="' + ((j * 61) % 300) + '" cy="' + ((j * 43) % 300) + '" r="2.6" fill="#fff"/>'; o = '<rect width="300" height="300" fill="#DCE6F0" opacity=".3"/>' + o; }
    if (k === 'ice') o = '<rect width="300" height="300" fill="#BFE3F5" opacity=".35"/>' + T(270, 290, '❄', { fs: 22, c: '#2F6FB0' });
    if (k === 'sun') o = '<circle cx="150" cy="-10" r="60" fill="#FFE27A" opacity=".75"/><rect width="300" height="300" fill="#FFF6CC" opacity=".25"/>';
    if (k === 'wind') o = '<g fill="none" stroke="#5E7FA8" stroke-width="4" stroke-linecap="round" opacity=".8"><path d="M10,70 h70 q18,0 18,-14"/><path d="M10,95 h110 q18,0 18,14"/><path d="M10,120 h55"/></g>';
    return o;
  }

  /* ---------- straight road (driving up = north) ---------- */
  function road(sp, X) {
    var L = sp.L || [{ d: 'dn' }, { d: 'up' }], mk = sp.marks || [], H = sp.h || 300;
    var W = { car: 46, bike: 24, shoulder: 32, spits: 46, bus: 46, in: 46, out: 46 };
    var tw = L.reduce(function (a, l) { return a + (W[l.t || 'car'] || 46); }, 0), x0 = 150 - tw / 2, xs = [], x = x0;
    L.forEach(function (l) { xs.push([x, x + (W[l.t || 'car'] || 46)]); x += W[l.t || 'car'] || 46; });
    var o = '', side = sp.side || 'rural';
    var bg = side === 'city' ? '#EDE6D8' : '#E3EED3';
    o += '<rect width="300" height="' + H + '" fill="' + bg + '"/>';
    if (side === 'city') { for (var y = 6; y < H; y += 74) { o += '<rect x="4" y="' + y + '" width="' + Math.max(8, x0 - 22) + '" height="64" rx="5" fill="#E9D3B4" stroke="#CDB18A" stroke-width="2"/><rect x="' + (x0 + tw + 18) + '" y="' + y + '" width="' + Math.max(8, 300 - x0 - tw - 22) + '" height="64" rx="5" fill="#E9D3B4" stroke="#CDB18A" stroke-width="2"/>'; } }
    if (side === 'rural') { for (var ty = 20; ty < H; ty += 70) o += '<circle cx="' + (x0 - 22) + '" cy="' + ty + '" r="11" fill="#9CC98A"/><circle cx="' + (x0 + tw + 22) + '" cy="' + (ty + 34) + '" r="11" fill="#9CC98A"/>'; }
    if (side === 'hwy') o += '<rect x="' + (x0 - 6) + '" y="0" width="3" height="' + H + '" fill="#9AA3AB"/><rect x="' + (x0 + tw + 3) + '" y="0" width="3" height="' + H + '" fill="#9AA3AB"/>';
    if (sp.jn) sp.jn.forEach(function (j) { // side road [side, y, paved?]
      var r = j[0] === 'r', yy = j[1];
      o += '<rect x="' + (r ? x0 + tw : 0) + '" y="' + (yy - 22) + '" width="' + (r ? 300 - x0 - tw : x0) + '" height="44" fill="' + (j[2] === 0 ? '#C8A66F' : '#8F959B') + '"/>';
    });
    L.forEach(function (l, i) {
      var c = { bike: '#C9604A', shoulder: '#8F959B', spits: '#8F959B', bus: '#9A6B5C' }[l.t] || '#8F959B';
      o += '<rect x="' + xs[i][0] + '" y="0" width="' + (xs[i][1] - xs[i][0]) + '" height="' + H + '" fill="' + c + '"/>';
      if (l.t === 'bus') o += T((xs[i][0] + xs[i][1]) / 2, H * .62, 'BUS', { fs: 13, c: '#fff', ff: 'Arial' });
      if (l.t === 'bike') for (var by = 40; by < H; by += 110) o += '<g transform="translate(' + ((xs[i][0] + xs[i][1]) / 2) + ' ' + by + ')" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="-5" cy="4" r="4"/><circle cx="5" cy="4" r="4"/><path d="M-5,4 L-1,-3 L5,4 M-1,-3 L3,-3"/></g>';
      if (l.arrow) { var ax = (xs[i][0] + xs[i][1]) / 2, ay = l.ay || H * .55; o += '<g fill="#fff">' + ({ s: '<rect x="' + (ax - 3) + '" y="' + (ay - 4) + '" width="6" height="26"/><path d="M' + (ax - 9) + ',' + (ay - 2) + ' L' + ax + ',' + (ay - 16) + ' L' + (ax + 9) + ',' + (ay - 2) + 'z"/>', l: '<rect x="' + (ax - 3) + '" y="' + (ay - 2) + '" width="6" height="24"/><path d="M' + (ax + 3) + ',' + (ay + 2) + ' L' + (ax + 3) + ',' + (ay - 4) + ' L' + (ax - 12) + ',' + (ay - 4) + ' L' + (ax - 12) + ',' + (ay - 10) + ' L' + (ax - 20) + ',' + (ay - 1) + ' L' + (ax - 12) + ',' + (ay + 8) + ' L' + (ax - 12) + ',' + (ay + 2) + 'z"/>', r: '<rect x="' + (ax - 3) + '" y="' + (ay - 2) + '" width="6" height="24"/><path d="M' + (ax - 3) + ',' + (ay + 2) + ' L' + (ax - 3) + ',' + (ay - 4) + ' L' + (ax + 12) + ',' + (ay - 4) + ' L' + (ax + 12) + ',' + (ay - 10) + ' L' + (ax + 20) + ',' + (ay - 1) + ' L' + (ax + 12) + ',' + (ay + 8) + ' L' + (ax + 12) + ',' + (ay + 2) + 'z"/>' }[l.arrow] || '') + '</g>'; }
    });
    // edge lines
    o += '<rect x="' + (x0 + 2) + '" y="0" width="2" height="' + H + '" fill="#fff" opacity=".9"/><rect x="' + (x0 + tw - 4) + '" y="0" width="2" height="' + H + '" fill="#fff" opacity=".9"/>';
    if (sp.vlak) sp.vlak.forEach(function (v) { // verdrijvingsvlak [laneIdx, y1, y2]
      var a = xs[v[0]][0] + 3, b = xs[v[0]][1] - 3; o += '<rect x="' + a + '" y="' + v[1] + '" width="' + (b - a) + '" height="' + (v[2] - v[1]) + '" fill="none" stroke="#fff" stroke-width="2.5"/>';
      for (var vy = v[1]; vy < v[2] - 6; vy += 12) o += '<line x1="' + a + '" y1="' + (vy + 12) + '" x2="' + b + '" y2="' + vy + '" stroke="#fff" stroke-width="2.5"/>';
    });
    mk.forEach(function (m, i) {
      if (!m || m === 'none' || !xs[i + 1]) return; var bx = xs[i][1];
      var dash = '<line x1="' + bx + '" y1="0" x2="' + bx + '" y2="' + H + '" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>';
      var sol = function (dx) { return '<line x1="' + (bx + dx) + '" y1="0" x2="' + (bx + dx) + '" y2="' + H + '" stroke="#fff" stroke-width="3"/>'; };
      var dsh = function (dx) { return '<line x1="' + (bx + dx) + '" y1="0" x2="' + (bx + dx) + '" y2="' + H + '" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>'; };
      if (m === 'dash') o += dash;
      if (m === 'solid') o += sol(0);
      if (m === 'double') o += sol(-3) + sol(3);
      if (m === 'dashsolid') o += dsh(-3) + sol(3);   // dashed on the left, solid on the right
      if (m === 'soliddash') o += sol(-3) + dsh(3);   // solid on the left, dashed on the right
      if (m === 'block') o += '<line x1="' + bx + '" y1="0" x2="' + bx + '" y2="' + H + '" stroke="#fff" stroke-width="5" stroke-dasharray="6 6"/>';
      if (m === 'yellow') o += '<line x1="' + bx + '" y1="0" x2="' + bx + '" y2="' + H + '" stroke="#F2C200" stroke-width="3"/>';
    });
    if (sp.curb) sp.curb.forEach(function (c) { // [side, kind 'yd'|'ys'|'blue', y1, y2]
      var cx = c[0] === 'r' ? x0 + tw + 2 : x0 - 2, col = c[1] === 'blue' ? '#2F6FB0' : '#F2C200';
      o += '<line x1="' + cx + '" y1="' + (c[2] || 0) + '" x2="' + cx + '" y2="' + (c[3] || H) + '" stroke="' + col + '" stroke-width="5"' + (c[1] === 'yd' ? ' stroke-dasharray="12 9"' : '') + '/>';
    });
    if (sp.zebra != null) { var zl = sp.zebraL || [0, L.length - 1]; for (var zx = xs[zl[0]][0] + 3; zx < xs[zl[1]][1] - 6; zx += 12) o += '<rect x="' + zx + '" y="' + sp.zebra + '" width="7" height="30" fill="#fff"/>'; }
    if (sp.stop) sp.stop.forEach(function (st) { var a = xs[st[0]]; o += '<rect x="' + a[0] + '" y="' + st[1] + '" width="' + (a[1] - a[0]) + '" height="5" fill="#fff"/>'; });
    if (sp.teeth) sp.teeth.forEach(function (st) { var a = xs[st[0]]; for (var tx = a[0] + 2; tx < a[1] - 7; tx += 8.5) o += '<path d="M' + tx + ',' + st[1] + ' l7,0 l-3.5,10z" fill="#fff"/>'; });
    if (sp.rail != null) { var ry = sp.rail; o += '<rect x="0" y="' + (ry - 16) + '" width="300" height="32" fill="#B9AD98"/>'; for (var rx = 0; rx < 300; rx += 12) o += '<rect x="' + rx + '" y="' + (ry - 14) + '" width="6" height="28" fill="#8A6A45"/>'; o += '<rect x="0" y="' + (ry - 8) + '" width="300" height="3" fill="#555"/><rect x="0" y="' + (ry + 5) + '" width="300" height="3" fill="#555"/>';
      if (sp.barrier) o += '<g><rect x="' + (x0 + tw + 4) + '" y="' + (ry + 22) + '" width="8" height="8" fill="#333"/><rect x="' + (sp.barrier === 'down' ? x0 + tw / 2 : x0 + tw + 6) + '" y="' + (ry + 23) + '" width="' + (sp.barrier === 'down' ? tw / 2 + 6 : 5) + '" height="' + (sp.barrier === 'down' ? 5 : 5) + '" fill="#E53935" stroke="#fff" stroke-dasharray="6 6"/></g>'; }
    if (sp.tunnel != null) o += '<rect x="' + (x0 - 14) + '" y="0" width="' + (tw + 28) + '" height="' + sp.tunnel + '" fill="#3D3D45" opacity=".85"/><path d="M' + (x0 - 14) + ',' + sp.tunnel + ' h' + (tw + 28) + '" stroke="#222" stroke-width="5"/>';
    if (sp.dist) sp.dist.forEach(function (d) { // [x, y1, y2, label]
      var dx = d[0]; o += '<g stroke="#E8734A" stroke-width="2.5" fill="#E8734A"><line x1="' + dx + '" y1="' + d[1] + '" x2="' + dx + '" y2="' + d[2] + '"/><path d="M' + (dx - 5) + ',' + (d[1] + 8) + ' L' + dx + ',' + d[1] + ' L' + (dx + 5) + ',' + (d[1] + 8) + 'z"/><path d="M' + (dx - 5) + ',' + (d[2] - 8) + ' L' + dx + ',' + d[2] + ' L' + (dx + 5) + ',' + (d[2] - 8) + 'z"/></g>' + '<rect x="' + (dx - 26) + '" y="' + ((d[1] + d[2]) / 2 - 11) + '" width="52" height="22" rx="11" fill="#fff" stroke="#E8734A" stroke-width="2"/>' + T(dx, (d[1] + d[2]) / 2 + 4.5, d[3], { fs: 11.5, c: '#E8734A' });
    });
    if (sp.gantry) { o += '<rect x="' + (x0 - 10) + '" y="10" width="' + (tw + 20) + '" height="6" fill="#6B7280"/>'; sp.gantry.forEach(function (g, i) { if (g == null || !xs[i]) return; var cx = (xs[i][0] + xs[i][1]) / 2; o += '<rect x="' + (cx - 17) + '" y="18" width="34" height="30" rx="3" fill="#111"/>' + mx(g, cx, 33); }); }
    if (sp.signs) sp.signs.forEach(function (s) { var sx = s[2] === 'l' ? x0 - 20 : x0 + tw + 20, sz = s[3] || 32; sx = Math.max(sz / 2 + 2, Math.min(300 - sz / 2 - 2, sx)); o += '<line x1="' + sx + '" y1="' + (s[0] + sz / 2) + '" x2="' + sx + '" y2="' + (s[0] + sz / 2 + 10) + '" stroke="#6b6b6b" stroke-width="2"/>' + sign(s[1], sx, s[0], sz); });
    if (sp.tl) sp.tl.forEach(function (l) { var lx = x0 + tw + 14; o += '<rect x="' + (lx - 7) + '" y="' + (l[0] - 18) + '" width="14" height="36" rx="3" fill="#2B2B2B"/>' + ['red', 'yellow', 'green'].map(function (c, i) { return '<circle cx="' + lx + '" cy="' + (l[0] - 10 + i * 10) + '" r="3.8" fill="' + (c === l[1] ? { red: '#E53935', yellow: '#F9C02D', green: '#2EAD4B' }[c] : '#555') + '"/>'; }).join(''); });
    if (sp.parked) sp.parked.forEach(function (p) { var px = p[0] === 'r' ? x0 + tw + 14 : x0 - 14; o += '<g transform="translate(' + px + ' ' + p[1] + ')' + (p[2] ? ' rotate(' + p[2] + ')' : '') + '">' + X.body({ color: p[3] || '#9AA3AB' }) + '</g>'; });
    (sp.units || []).forEach(function (u) {
      var ln = xs[u.ln == null ? L.length - 1 : u.ln] || xs[0], ux = u.x != null ? u.x : (ln[0] + ln[1]) / 2 + (u.dx || 0), uy = u.y == null ? H * .72 : u.y;
      var dn = (L[u.ln] || {}).d === 'dn' || u.dn, col = u.color || COL[u.id] || COL.a;
      if (u.go) { var p = ''; var ga = u.ga || 70;
        if (u.go === 'up') p = 'M' + ux + ',' + (uy - 26) + ' L' + ux + ',' + (uy - 26 - ga);
        if (u.go === 'l' || u.go === 'r') { var tx2 = ux + (u.go === 'l' ? -(u.gw || 46) : (u.gw || 46)); p = 'M' + ux + ',' + (uy - 24) + ' C' + ux + ',' + (uy - 50) + ' ' + tx2 + ',' + (uy - 46) + ' ' + tx2 + ',' + (uy - ga - 16); }
        if (u.go === 'R' || u.go === 'L') { var ex = u.go === 'R' ? 300 : 0; p = 'M' + ux + ',' + (uy - 24) + ' L' + ux + ',' + (u.gy + 16) + ' Q' + ux + ',' + u.gy + ' ' + (ux + (u.go === 'R' ? 16 : -16)) + ',' + u.gy + ' L' + ex + ',' + u.gy; }
        if (u.go === 'dn') p = 'M' + ux + ',' + (uy + 26) + ' L' + ux + ',' + (uy + 26 + ga);
        o += '<path d="' + p + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-dasharray="7 5" stroke-linecap="round" opacity=".9"' + (u.anim ? ' class="arrowin"' : '') + ' marker-end="url(#ah' + col.slice(1) + ')"/>';
        o += '<defs><marker id="ah' + col.slice(1) + '" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="' + col + '"/></marker></defs>';
      }
      var an = u.anim ? ' class="drive" style="--dy:' + u.anim[0] + 'px;--dl:' + (u.anim[1] || 0) + 's;--du:' + (u.anim[2] || 3) + 's"' : '';
      var rot = u.rot != null ? u.rot : dn ? 180 : 0;
      o += '<g' + an + '><g transform="translate(' + ux + ' ' + uy + ') rotate(' + rot + ')">' + X.body(Object.assign({}, u, { color: col })) + (u.blink ? '<circle cx="' + (u.blink === 'l' ? -10 : 10) + '" cy="-17" r="3.5" fill="#FFB300" class="blink"/><circle cx="' + (u.blink === 'l' ? -10 : 10) + '" cy="17" r="3.5" fill="#FFB300" class="blink"/>' : '') + (u.brake ? '<rect x="-9" y="16" width="5" height="3" fill="#FF2A2A"/><rect x="4" y="16" width="5" height="3" fill="#FF2A2A"/>' : '') + (u.beam ? '<path d="M-8,-18 L-26,' + (u.beam === 'high' ? -110 : -70) + ' L26,' + (u.beam === 'high' ? -110 : -70) + ' L8,-18z" fill="#FFF3A8" opacity=".55"/>' : '') + '</g></g>';
      var lbl = u.label || (u.id === 'you' ? 'تو' : '');
      if (lbl) { var lx = ux + (u.lx || 0), ly = uy + (u.ly || 0); o += '<g' + (u.hot ? ' data-hot="' + u.hot + '" class="hot"' : '') + (u.anim ? ' style="display:none"' : '') + '><circle cx="' + lx + '" cy="' + ly + '" r="' + (u.hot ? 13 : 11) + '" fill="#fff" stroke="' + col + '" stroke-width="3"/>' + T(lx, ly + 4.6, lbl, { fs: lbl.length > 1 ? 10 : 13, c: col }) + '<text class="ord" x="' + (lx + 12) + '" y="' + (ly - 10) + '" font-size="12" font-weight="900" fill="#fff" text-anchor="middle"></text></g>'; }
    });
    if (sp.hots) sp.hots.forEach(function (h) { o += '<g data-hot="' + h[0] + '" class="hot"><circle cx="' + h[1] + '" cy="' + h[2] + '" r="15" fill="#fff" fill-opacity=".9" stroke="#3F9BD6" stroke-width="3"/>' + T(h[1], h[2] + 5, h[3] || h[0], { fs: 13, c: '#3F9BD6' }) + '<text class="ord" x="' + (h[1] + 12) + '" y="' + (h[2] - 10) + '" font-size="12" font-weight="900" fill="#fff" text-anchor="middle"></text></g>'; });
    if (sp.wx) o += wx(sp.wx);
    return o + note(sp);
  }
  function mx(g, cx, cy) { // matrix sign content
    if (g === 'x') return '<g stroke="#FF2A2A" stroke-width="4" stroke-linecap="round"><line x1="' + (cx - 9) + '" y1="' + (cy - 9) + '" x2="' + (cx + 9) + '" y2="' + (cy + 9) + '"/><line x1="' + (cx + 9) + '" y1="' + (cy - 9) + '" x2="' + (cx - 9) + '" y2="' + (cy + 9) + '"/></g>';
    if (g === 'dn') return '<path d="M' + (cx - 3) + ',' + (cy - 11) + ' h6 v10 h6 l-9,11 l-9,-11 h6z" fill="#2EE65A"/>';
    if (g === 'l' || g === 'r') { var s = g === 'l' ? -1 : 1; return '<path d="M' + (cx - 8 * s) + ',' + (cy - 10) + ' L' + (cx + 6 * s) + ',' + (cy + 4) + '" stroke="#fff" stroke-width="4"/><path d="M' + (cx + 9 * s) + ',' + (cy + 9) + ' l' + (-12 * s) + ',0 l' + (12 * s) + ',-12z" fill="#fff"/>'; }
    if (g === 'end') return '<circle cx="' + cx + '" cy="' + cy + '" r="11" fill="none" stroke="#fff" stroke-width="2"/><line x1="' + (cx - 8) + '" y1="' + (cy + 8) + '" x2="' + (cx + 8) + '" y2="' + (cy - 8) + '" stroke="#fff" stroke-width="2"/>';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="12" fill="none" stroke="#FF2A2A" stroke-width="2.5"/>' + T(cx, cy + 4.5, g, { fs: String(g).length > 2 ? 9.5 : 12, c: '#fff', ff: 'Arial' });
  }

  /* ---------- roundabout (traffic goes counter-clockwise) ---------- */
  function round(sp, X) {
    var o = '<rect width="300" height="300" fill="#E3EED3"/>', C = 150, R = 74, r = 38;
    var ROT = { S: 0, W: 90, N: 180, E: 270 };
    ['S', 'N', 'E', 'W'].forEach(function (a) { o += '<g transform="rotate(' + ROT[a] + ' 150 150)"><rect x="122" y="150" width="56" height="150" fill="#8F959B"/><line x1="150" y1="' + (C + R + 6) + '" x2="150" y2="300" stroke="#fff" stroke-width="2" stroke-dasharray="9 9"/>' + (sp.bike ? '<rect x="104" y="' + (C + R + 6) + '" width="14" height="150" fill="#C9604A"/>' : '') + '</g>'; });
    if (sp.bike) o += '<circle cx="150" cy="150" r="' + (R + 12) + '" fill="none" stroke="#C9604A" stroke-width="14"/>';
    o += '<circle cx="150" cy="150" r="' + R + '" fill="#8F959B"/><circle cx="150" cy="150" r="' + r + '" fill="#A8D08D" stroke="#fff" stroke-width="3"/>';
    (sp.teeth === false ? [] : (sp.teeth || ['S', 'N', 'E', 'W'])).forEach(function (a) { o += '<g transform="rotate(' + ROT[a] + ' 150 150)">'; for (var x = 151; x < 176; x += 8) o += '<path d="M' + x + ',' + (C + R + 4) + ' l7,0 l-3.5,9z" fill="#fff"/>'; o += '</g>'; });
    if (sp.signs !== false) { o += '<image href="signs/D1.svg" x="196" y="236" width="28" height="28"/>' + (sp.teeth === false ? '' : '<image href="signs/B6.svg" x="196" y="206" width="28" height="28"/>'); }
    var ang = { S: 90, E: 0, N: 270, W: 180 }; // screen angles of arms (deg, y down)
    (sp.units || []).forEach(function (u) {
      var col = u.color || COL[u.id] || COL.a, x, y, rot;
      if (u.ring != null) { var t = u.ring * Math.PI / 180, rr = (R + r) / 2; x = C + rr * Math.cos(t); y = C + rr * Math.sin(t); rot = u.ring; } // ring angle in screen degrees
      else { var a = u.from || 'S', p = rotP(165, 252 + (u.d || 0), ROT[a]); x = p[0]; y = p[1]; rot = ROT[a]; }
      if (u.exit) { // dashed path on the ring to an exit arm
        var st = u.ring != null ? u.ring : ang[u.from || 'S'], en = ang[u.exit], rr2 = (R + r) / 2;
        var sweep = ((st - en) % 360 + 360) % 360; if (sweep === 0) sweep = 360;
        var pts = []; for (var k = 0; k <= 24; k++) { var tt = (st - sweep * k / 24) * Math.PI / 180; pts.push((C + rr2 * Math.cos(tt)).toFixed(1) + ',' + (C + rr2 * Math.sin(tt)).toFixed(1)); }
        var eo = rotP(135, 290, ROT[u.exit]);
        o += '<polyline points="' + (u.ring == null ? x.toFixed(1) + ',' + y.toFixed(1) + ' ' : '') + pts.join(' ') + ' ' + eo[0].toFixed(1) + ',' + eo[1].toFixed(1) + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-dasharray="7 5" opacity=".85"/>';
      }
      var deg0 = u.ring != null ? 0 : ROT[u.from || 'S'], an = u.anim ? '<g transform="rotate(' + deg0 + ' 150 150)"><g class="drive" style="--dy:' + u.anim[0] + 'px;--dl:' + (u.anim[1] || 0) + 's;--du:' + (u.anim[2] || 3) + 's"><g transform="rotate(' + (-deg0) + ' 150 150)">' : '';
      o += an + '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' + X.body(Object.assign({}, u, { color: col })) + (u.blink ? '<circle cx="' + (u.blink === 'l' ? -10 : 10) + '" cy="-17" r="3.5" fill="#FFB300" class="blink"/>' : '') + '</g>' + (u.anim ? '</g></g></g>' : '');
      var lbl = u.label || (u.id === 'you' ? 'تو' : '');
      if (lbl) o += '<g' + (u.hot ? ' data-hot="' + u.hot + '" class="hot"' : '') + (u.anim ? ' style="display:none"' : '') + '><circle cx="' + x + '" cy="' + y + '" r="12" fill="#fff" stroke="' + col + '" stroke-width="3"/>' + T(x, y + 4.6, lbl, { fs: lbl.length > 1 ? 10 : 13, c: col }) + '<text class="ord" x="' + (x + 12) + '" y="' + (y - 10) + '" font-size="12" font-weight="900" fill="#fff" text-anchor="middle"></text></g>';
    });
    return o + note(sp);
  }
  function rotP(x, y, deg) { var t = deg * Math.PI / 180, dx = x - 150, dy = y - 150; return [150 + dx * Math.cos(t) - dy * Math.sin(t), 150 + dx * Math.sin(t) + dy * Math.cos(t)]; }

  /* ---------- pictogram panels ---------- */
  function pic(sp) {
    var t = sp.t || [], n = t.length, cols = sp.cols || (n <= 1 ? 1 : n <= 2 ? 2 : n <= 4 ? 2 : 3), rows = Math.ceil(n / cols), H = sp.h || 300;
    var w = 300 / cols, h = H / rows, o = '<rect width="300" height="' + H + '" fill="#FFFDF7"/>';
    t.forEach(function (it, i) {
      var cx = (i % cols) * w + w / 2, top = Math.floor(i / cols) * h, hasCap = it.c != null, sz = Math.min(w, h) * (hasCap ? .58 : .74), cy = top + h / 2 - (hasCap ? 12 : 0);
      var bd = it.v ? '#5BB36A' : it.x ? '#D65A3A' : '#EFE3C9';
      o += '<g' + (it.hot ? ' data-hot="' + it.hot + '" class="hot"' : '') + '><rect x="' + ((i % cols) * w + 5) + '" y="' + (top + 5) + '" width="' + (w - 10) + '" height="' + (h - 10) + '" rx="14" fill="#fff" stroke="' + bd + '" stroke-width="' + (it.v || it.x ? 3 : 2) + '"/>';
      o += '<g transform="translate(' + (cx - sz / 2) + ' ' + (cy - sz / 2) + ') scale(' + (sz / 100) + ')">' + (it.s ? '<image href="signs/' + it.s + '.svg" x="6" y="6" width="88" height="88"/>' : icon(it.i)) + '</g>';
      if (it.n != null) o += '<rect x="' + (cx - Math.max(22, String(it.n).length * 5.5 + 8)) + '" y="' + (cy + sz / 2 - 20) + '" width="' + (2 * Math.max(22, String(it.n).length * 5.5 + 8)) + '" height="24" rx="12" fill="#E8734A"/>' + T(cx, cy + sz / 2 - 3, it.n, { fs: 13, c: '#fff', ff: 'Fredoka, Vazirmatn, Arial' });
      if (it.x) o += '<g stroke="#D65A3A" stroke-width="7" stroke-linecap="round" opacity=".9"><line x1="' + (cx - sz * .36) + '" y1="' + (cy - sz * .36) + '" x2="' + (cx + sz * .36) + '" y2="' + (cy + sz * .36) + '"/><line x1="' + (cx + sz * .36) + '" y1="' + (cy - sz * .36) + '" x2="' + (cx - sz * .36) + '" y2="' + (cy + sz * .36) + '"/></g>';
      if (it.v) o += '<circle cx="' + (cx + sz * .38) + '" cy="' + (cy - sz * .38) + '" r="13" fill="#5BB36A"/><path d="M' + (cx + sz * .38 - 6) + ',' + (cy - sz * .38) + ' l4,5 l8,-9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>';
      if (hasCap) o += T(cx, top + h - 18, it.c, { fs: it.c.length > 22 ? 10.5 : 12.5, fw: 700 });
      if (it.hot) o += '<text class="ord" x="' + (cx + w / 2 - 18) + '" y="' + (top + 24) + '" font-size="13" font-weight="900" fill="#fff" text-anchor="middle"></text>';
      o += '</g>';
    });
    return o + note(sp);
  }

  /* ---------- icon library (100×100 boxes) ---------- */
  function lamp(col, inner) { return '<rect x="8" y="8" width="84" height="84" rx="18" fill="#1F2328"/><g fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' + inner + '</g>'; }
  function car(x, y, s, c) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-40,8 L-36,-8 Q-32,-20 -18,-22 L18,-22 Q32,-20 36,-8 L40,8 Q42,18 34,18 L-34,18 Q-42,18 -40,8z" fill="' + (c || '#E8734A') + '"/><path d="M-26,-8 L-20,-17 L20,-17 L26,-8z" fill="#BFE3F5"/><circle cx="-24" cy="18" r="9" fill="#333"/><circle cx="24" cy="18" r="9" fill="#333"/><circle cx="-24" cy="18" r="3.5" fill="#999"/><circle cx="24" cy="18" r="3.5" fill="#999"/></g>'; }
  function person(x, y, s, c) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + (c || '#3F9BD6') + '"><circle cx="0" cy="-30" r="10"/><rect x="-11" y="-18" width="22" height="30" rx="8"/><rect x="-10" y="8" width="8" height="28" rx="4"/><rect x="2" y="8" width="8" height="28" rx="4"/></g>'; }
  function speedo(n) { return '<circle cx="50" cy="54" r="40" fill="#1F2328"/><path d="M20,72 A34,34 0 1 1 80,72" fill="none" stroke="#555" stroke-width="6"/><path d="M20,72 A34,34 0 0 1 50,20" fill="none" stroke="#E8734A" stroke-width="6"/><line x1="50" y1="56" x2="34" y2="30" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="56" r="5" fill="#fff"/>' + T(50, 86, n, { fs: 17, c: '#fff', ff: 'Fredoka, Arial' }); }
  function tl(state) { var on = { r: '#E53935', y: '#F9C02D', g: '#2EAD4B' }; return '<rect x="32" y="4" width="36" height="92" rx="10" fill="#2B2B2B"/>' + ['r', 'y', 'g'].map(function (c, i) { return '<circle cx="50" cy="' + (22 + i * 28) + '" r="11" fill="' + (state.indexOf(c) >= 0 ? on[c] : '#555') + '"/>'; }).join('') + (state.indexOf('a') >= 0 ? '<path d="M44,78 h10 v-6 l8,8 l-8,8 v-6 h-10z" fill="#1F2328"/>' : '') + (state.indexOf('f') >= 0 ? '<g transform="translate(50 78) scale(.45)" fill="none" stroke="#1F2328" stroke-width="5"><circle cx="-12" cy="6" r="9"/><circle cx="12" cy="6" r="9"/><path d="M-12,6 L-3,-9 L12,6 M-3,-9 L6,-9"/></g>' : ''); }
  function cop(pose) { // traffic controller (Bijlage 2)
    var b = '<circle cx="50" cy="20" r="9" fill="#F0C9A0"/><rect x="40" y="8" width="20" height="6" rx="2" fill="#1F3A6B"/><rect x="38" y="30" width="24" height="36" rx="6" fill="#1F3A6B"/><rect x="40" y="64" width="8" height="30" rx="3" fill="#1F3A6B"/><rect x="52" y="64" width="8" height="30" rx="3" fill="#1F3A6B"/>';
    var arm = function (x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1F3A6B" stroke-width="8" stroke-linecap="round"/><circle cx="' + x2 + '" cy="' + y2 + '" r="4.5" fill="#fff"/>'; };
    if (pose === 'up') return b + arm(60, 34, 66, 2) + arm(40, 34, 36, 62);
    if (pose === 'side') return b + arm(60, 34, 94, 34) + arm(40, 34, 36, 62);
    if (pose === 'both') return b + arm(60, 34, 94, 34) + arm(40, 34, 6, 34);
    if (pose === 'slow') return b + arm(60, 34, 92, 40) + '<path d="M86,52 q6,8 2,16" fill="none" stroke="#E8734A" stroke-width="3" stroke-dasharray="3 3"/>' + arm(40, 34, 36, 62);
    if (pose === 'brig') return '<circle cx="50" cy="22" r="9" fill="#F0C9A0"/><rect x="38" y="32" width="24" height="40" rx="6" fill="#F7E14A"/><rect x="40" y="70" width="8" height="24" rx="3" fill="#333"/><rect x="52" y="70" width="8" height="24" rx="3" fill="#333"/><line x1="40" y1="38" x2="22" y2="30" stroke="#F7E14A" stroke-width="7" stroke-linecap="round"/><line x1="22" y1="30" x2="22" y2="14" stroke="#555" stroke-width="3"/><image href="signs/F10.svg" x="8" y="0" width="28" height="28"/>';
    return b;
  }
  var IC = {
    car: function () { return car(50, 52, 1); },
    car2: function () { return car(50, 52, 1, '#3F9BD6'); },
    van: function () { return '<rect x="8" y="26" width="70" height="44" rx="6" fill="#9AA3AB"/><path d="M78,40 h10 l6,14 v16 h-16z" fill="#9AA3AB"/><rect x="80" y="42" width="8" height="10" fill="#BFE3F5"/><circle cx="26" cy="72" r="9" fill="#333"/><circle cx="76" cy="72" r="9" fill="#333"/>'; },
    truck: function () { return '<rect x="4" y="18" width="64" height="50" rx="4" fill="#3F9BD6"/><path d="M68,32 h14 l12,16 v20 h-26z" fill="#E8734A"/><rect x="72" y="36" width="10" height="12" fill="#BFE3F5"/><circle cx="20" cy="72" r="9" fill="#333"/><circle cx="46" cy="72" r="9" fill="#333"/><circle cx="80" cy="72" r="9" fill="#333"/>'; },
    bike: function () { return '<g fill="none" stroke="#3B3227" stroke-width="5" stroke-linecap="round"><circle cx="26" cy="64" r="17"/><circle cx="74" cy="64" r="17"/><path d="M26,64 L44,34 L74,64 M44,34 L66,34 M40,26 h12 M66,34 l6,-10 h8"/></g>'; },
    moped: function () { return '<g fill="none" stroke="#3B3227" stroke-width="5"><circle cx="24" cy="68" r="14"/><circle cx="78" cy="68" r="14"/></g><path d="M24,68 L40,48 h30 l8,20z" fill="#9B6BD0"/><rect x="34" y="40" width="22" height="8" rx="4" fill="#333"/><path d="M70,48 l6,-22 h8" fill="none" stroke="#333" stroke-width="5"/>'; },
    moto: function () { return IC.moped(); },
    ped: function () { return person(50, 52, 1.1); },
    kid: function () { return person(40, 60, .75, '#E45D8C') + person(66, 52, 1, '#3F9BD6'); },
    old: function () { return person(46, 52, 1, '#9B6BD0') + '<path d="M66,36 L74,94" stroke="#8A6A3C" stroke-width="5" stroke-linecap="round"/>'; },
    blind: function () { return person(44, 52, 1, '#3B3227') + '<line x1="58" y1="44" x2="84" y2="94" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="58" y1="44" x2="84" y2="94" stroke="#ccc" stroke-width="1"/><line x1="76" y1="78" x2="81" y2="88" stroke="#E53935" stroke-width="6"/>'; },
    beer: function () { return '<path d="M26,26 h40 v58 q0,8 -8,8 h-24 q-8,0 -8,-8z" fill="#F9C02D"/><path d="M26,26 q4,-12 14,-8 q6,-10 16,-2 q10,-4 10,10z" fill="#fff" stroke="#EEE"/><path d="M66,40 h10 q8,0 8,8 v14 q0,8 -8,8 h-10" fill="none" stroke="#E3A72F" stroke-width="6"/>'; },
    wine: function () { return '<path d="M30,10 h40 q2,30 -20,40 q-22,-10 -20,-40z" fill="#9B2335"/><rect x="47" y="50" width="6" height="30" fill="#ccc"/><rect x="32" y="80" width="36" height="6" rx="3" fill="#ccc"/>'; },
    pill: function () { return '<g transform="rotate(-35 50 50)"><rect x="18" y="36" width="64" height="28" rx="14" fill="#fff" stroke="#9B6BD0" stroke-width="4"/><path d="M50,36 h18 a14,14 0 0 1 0,28 h-18z" fill="#9B6BD0"/></g>'; },
    drug: function () { return '<path d="M50,12 q8,20 4,34 q14,-12 30,-10 q-14,14 -30,18 q12,8 20,22 q-16,-4 -24,-14 q-8,10 -24,14 q8,-14 20,-22 q-16,-4 -30,-18 q16,-2 30,10 q-4,-14 4,-34z" fill="#5BB36A"/>'; },
    phone: function () { return '<rect x="30" y="8" width="40" height="84" rx="8" fill="#1F2328"/><rect x="34" y="16" width="32" height="62" rx="3" fill="#3F9BD6"/><circle cx="50" cy="85" r="3.5" fill="#888"/><path d="M40,30 h20 M40,40 h14" stroke="#fff" stroke-width="3"/>'; },
    holder: function () { return '<rect x="20" y="64" width="60" height="10" rx="5" fill="#555"/><rect x="45" y="52" width="10" height="14" fill="#555"/><rect x="26" y="10" width="48" height="44" rx="6" fill="#1F2328"/><rect x="30" y="14" width="40" height="34" rx="3" fill="#5BB36A"/><path d="M38,40 l10,-14 l12,14" fill="none" stroke="#fff" stroke-width="3"/>'; },
    clock: function () { return '<circle cx="50" cy="50" r="40" fill="#fff" stroke="#3B3227" stroke-width="6"/><path d="M50,22 v28 l18,12" fill="none" stroke="#E8734A" stroke-width="6" stroke-linecap="round"/>'; },
    sleep: function () { return '<circle cx="42" cy="58" r="30" fill="#F0C9A0"/><path d="M28,58 q6,5 12,0 M46,58 q6,5 12,0" fill="none" stroke="#3B3227" stroke-width="3.5" stroke-linecap="round"/>' + T(76, 30, 'Z', { fs: 22, c: '#3F9BD6', ff: 'Fredoka, Arial' }) + T(88, 16, 'z', { fs: 15, c: '#3F9BD6', ff: 'Fredoka, Arial' }); },
    coffee: function () { return '<path d="M20,40 h50 v26 q0,22 -25,22 q-25,0 -25,-22z" fill="#8A5A3C"/><path d="M70,48 h6 q10,0 10,10 q0,10 -10,10 h-8" fill="none" stroke="#8A5A3C" stroke-width="6"/><path d="M34,14 q-6,8 0,16 M48,10 q-6,8 0,16" fill="none" stroke="#bbb" stroke-width="4" stroke-linecap="round"/>'; },
    eye: function () { return '<path d="M6,50 Q50,4 94,50 Q50,96 6,50z" fill="#fff" stroke="#3B3227" stroke-width="5"/><circle cx="50" cy="50" r="18" fill="#3F9BD6"/><circle cx="50" cy="50" r="8" fill="#1F2328"/>'; },
    glasses: function () { return '<g fill="#BFE3F5" stroke="#3B3227" stroke-width="5"><circle cx="28" cy="54" r="18"/><circle cx="72" cy="54" r="18"/></g><path d="M46,50 q4,-6 8,0 M10,50 L4,38 M90,50 L96,38" fill="none" stroke="#3B3227" stroke-width="5"/>'; },
    tyre: function () { return '<circle cx="50" cy="50" r="42" fill="#2B2B2B"/><circle cx="50" cy="50" r="22" fill="#B8BEC4"/><circle cx="50" cy="50" r="7" fill="#777"/><g stroke="#555" stroke-width="4">' + [0, 45, 90, 135].map(function (a) { return '<line x1="50" y1="8" x2="50" y2="20" transform="rotate(' + a + ' 50 50)"/><line x1="50" y1="80" x2="50" y2="92" transform="rotate(' + a + ' 50 50)"/>'; }).join('') + '</g>'; },
    tread: function () { return '<rect x="14" y="20" width="72" height="56" rx="6" fill="#2B2B2B"/><g fill="#555"><rect x="22" y="20" width="10" height="56"/><rect x="45" y="20" width="10" height="56"/><rect x="68" y="20" width="10" height="56"/></g><path d="M8,86 h84" stroke="#E8734A" stroke-width="4"/><path d="M50,78 v-30" stroke="#E8734A" stroke-width="3"/>'; },
    triangle: function () { return '<path d="M50,8 L94,88 H6z" fill="#E53935"/><path d="M50,30 L77,78 H23z" fill="#fff"/><rect x="44" y="88" width="12" height="8" fill="#555"/>'; },
    vest: function () { return '<path d="M30,10 L42,14 Q50,26 58,14 L70,10 L86,30 L78,44 L74,40 V92 H26 V40 L22,44 L14,30z" fill="#F7E14A"/><rect x="26" y="56" width="48" height="7" fill="#C9C9C9"/><rect x="26" y="72" width="48" height="7" fill="#C9C9C9"/>'; },
    hazard: function () { return '<rect x="8" y="8" width="84" height="84" rx="16" fill="#E53935"/><path d="M50,20 L80,74 H20z" fill="none" stroke="#fff" stroke-width="6"/><path d="M50,38 L66,66 H34z" fill="none" stroke="#fff" stroke-width="5"/>'; },
    license: function () { return '<rect x="6" y="20" width="88" height="60" rx="8" fill="#F4C6D6" stroke="#C97A96" stroke-width="3"/><rect x="14" y="30" width="24" height="30" rx="3" fill="#fff"/>' + person(26, 52, .42, '#8A6A3C') + '<path d="M46,34 h38 M46,46 h30 M46,58 h36" stroke="#9A5A73" stroke-width="4"/><rect x="66" y="64" width="20" height="10" rx="2" fill="#3F67B5"/>'; },
    kcard: function () { return '<rect x="6" y="20" width="88" height="60" rx="8" fill="#DDE9F7" stroke="#6E8FBF" stroke-width="3"/><rect x="14" y="30" width="44" height="14" rx="3" fill="#F2C200"/>' + T(36, 41.5, 'XX-123-Y', { fs: 9, c: '#222', ff: 'Arial' }) + '<path d="M14,56 h66 M14,68 h50" stroke="#6E8FBF" stroke-width="4"/>'; },
    plate: function () { return '<rect x="4" y="34" width="92" height="32" rx="5" fill="#F2C200" stroke="#222" stroke-width="3"/><rect x="4" y="34" width="14" height="32" rx="4" fill="#2C4EA8"/>' + T(57, 57, 'AB-12-CD', { fs: 15, c: '#111', ff: 'Arial' }); },
    shield: function () { return '<path d="M50,6 L86,20 V48 Q86,78 50,94 Q14,78 14,48 V20z" fill="#3F9BD6"/><path d="M34,50 l12,12 l22,-24" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'; },
    apk: function () { return '<circle cx="50" cy="50" r="42" fill="#5BB36A"/>' + T(50, 60, 'APK', { fs: 26, c: '#fff', ff: 'Fredoka, Arial' }); },
    wrench: function () { return '<path d="M70,10 a20,20 0 0 0 -24,26 L12,70 a8,8 0 0 0 12,12 L58,48 a20,20 0 0 0 26,-24 l-12,12 l-10,-4 l-4,-10z" fill="#7A8794"/>'; },
    euro: function () { return '<circle cx="50" cy="50" r="42" fill="#E3A72F"/>' + T(50, 66, '€', { fs: 48, c: '#fff', ff: 'Arial' }); },
    belt: function () { return person(50, 52, 1.1, '#3F9BD6') + '<path d="M34,26 L66,70" stroke="#E8734A" stroke-width="7" stroke-linecap="round"/><path d="M38,62 h26" stroke="#E8734A" stroke-width="6"/>'; },
    childseat: function () { return '<path d="M30,14 h30 q8,0 8,8 v40 h14 q6,0 6,6 v14 h-64 v-60 q0,-8 6,-8z" fill="#3F9BD6"/>' + person(46, 50, .55, '#E45D8C') + '<path d="M38,48 L56,66" stroke="#E8734A" stroke-width="5"/>'; },
    rearseat: function () { return '<path d="M70,14 h-30 q-8,0 -8,8 v40 h-14 q-6,0 -6,6 v14 h64 v-60 q0,-8 -6,-8z" fill="#9B6BD0"/>' + person(54, 50, .55, '#E45D8C'); },
    airbag: function () { return lamp('#E53935', '<circle cx="40" cy="30" r="7"/><path d="M40,40 v20 h14 M34,48 l-6,18"/><circle cx="66" cy="50" r="12" fill="#E53935"/>'); },
    helmet: function () { return '<path d="M14,64 Q14,16 54,16 Q90,16 90,56 L90,68 H58 L50,58 H26 L22,68 H14z" fill="#E8734A"/><path d="M58,40 h30 v16 h-30z" fill="#3B3227" opacity=".8"/>'; },
    trailer: function () { return car(30, 52, .6) + '<rect x="56" y="34" width="40" height="28" rx="3" fill="#9AA3AB"/><line x1="50" y1="56" x2="58" y2="56" stroke="#333" stroke-width="4"/><circle cx="76" cy="66" r="7" fill="#333"/>'; },
    roofbox: function () { return car(50, 60, 1) + '<rect x="24" y="22" width="52" height="12" rx="6" fill="#3B3227"/>'; },
    load: function () { return car(50, 60, 1) + '<rect x="22" y="14" width="56" height="20" rx="3" fill="#C8A66F" stroke="#8A6A45" stroke-width="2"/><path d="M18,36 L84,12 M18,12 L84,36" stroke="#E8734A" stroke-width="3"/>'; },
    dim: function () { return lamp('#2EE65A', '<path d="M40,30 q-16,0 -16,20 q0,20 16,20 q8,0 8,-20 q0,-20 -8,-20z" fill="#2EE65A"/><path d="M56,36 l22,6 M56,50 l22,6 M56,64 l22,6"/>'); },
    high: function () { return lamp('#4D8BFF', '<path d="M40,30 q-16,0 -16,20 q0,20 16,20 q8,0 8,-20 q0,-20 -8,-20z" fill="#4D8BFF"/><path d="M56,36 h24 M56,50 h24 M56,64 h24"/>'); },
    fogf: function () { return lamp('#2EE65A', '<path d="M40,30 q-16,0 -16,20 q0,20 16,20 q8,0 8,-20 q0,-20 -8,-20z" fill="#2EE65A"/><path d="M56,36 l22,6 M56,50 l22,6 M56,64 l22,6"/><path d="M66,30 q-6,20 0,40" stroke-dasharray="4 5"/>'); },
    fogr: function () { return lamp('#FFB300', '<path d="M60,30 q16,0 16,20 q0,20 -16,20 q-8,0 -8,-20 q0,-20 8,-20z" fill="#FFB300"/><path d="M44,36 h-22 M44,50 h-22 M44,64 h-22"/><path d="M34,30 q6,20 0,40" stroke-dasharray="4 5"/>'); },
    drl: function () { return lamp('#2EE65A', '<circle cx="34" cy="50" r="12" fill="#2EE65A"/><path d="M54,38 h24 M54,50 h24 M54,62 h24" stroke-dasharray="3 5"/>'); },
    oil: function () { return lamp('#E53935', '<path d="M18,56 h44 l20,-14 M30,56 v-16 h26 l6,16 M86,58 q-4,8 0,12 q4,-4 0,-12z" fill="none"/>'); },
    temp: function () { return lamp('#E53935', '<path d="M50,18 v40"/><circle cx="50" cy="66" r="9"/><path d="M50,28 h10 M50,40 h10 M22,82 q7,-6 14,0 q7,6 14,0 q7,-6 14,0 q7,6 14,0"/>'); },
    battery: function () { return lamp('#E53935', '<rect x="18" y="34" width="64" height="40" rx="4"/><path d="M28,34 v-8 M72,34 v-8 M30,54 h12 M60,54 h12 M66,48 v12"/>'); },
    brake: function () { return lamp('#E53935', '<circle cx="50" cy="50" r="22"/><path d="M20,30 q-8,20 0,40 M80,30 q8,20 0,40 M50,38 v14 M50,60 v1"/>'); },
    abs: function () { return lamp('#FFB300', '<circle cx="50" cy="50" r="26"/><path d="M18,30 q-8,20 0,40 M82,30 q8,20 0,40"/>') + T(50, 58, 'ABS', { fs: 18, c: '#FFB300', ff: 'Arial' }); },
    engine: function () { return lamp('#FFB300', '<path d="M18,40 h12 v-8 h24 v8 h14 l8,8 v8 h6 v-12 M18,40 v28 h50 l8,-8 v-12 M18,54 h-6"/>'); },
    tpms: function () { return lamp('#FFB300', '<path d="M24,30 q-8,8 -4,28 q4,16 30,16 q26,0 30,-16 q4,-20 -4,-28"/><path d="M50,36 v18 M50,62 v1"/>'); },
    fuel: function () { return lamp('#FFB300', '<rect x="24" y="22" width="30" height="58" rx="3"/><path d="M24,42 h30 M54,34 l14,8 v28 q0,6 6,6 q6,0 6,-6 v-30"/>'); },
    beltlamp: function () { return lamp('#E53935', '<circle cx="46" cy="24" r="7"/><path d="M38,36 L58,74 M34,62 h30 M46,36 v26"/>'); },
    epb: function () { return lamp('#E53935', '<circle cx="50" cy="50" r="22"/><path d="M20,30 q-8,20 0,40 M80,30 q8,20 0,40"/>') + T(50, 59, 'P', { fs: 24, c: '#E53935', ff: 'Arial' }); },
    plug: function () { return '<path d="M36,10 v18 M64,10 v18" stroke="#3B3227" stroke-width="8" stroke-linecap="round"/><path d="M24,28 h52 v18 q0,22 -26,22 q-26,0 -26,-22z" fill="#5BB36A"/><path d="M50,68 v22" stroke="#3B3227" stroke-width="8"/><path d="M52,34 l-8,12 h10 l-8,12" fill="none" stroke="#fff" stroke-width="4"/>'; },
    leaf: function () { return '<path d="M84,14 Q20,10 18,60 Q16,86 40,86 Q86,80 84,14z" fill="#5BB36A"/><path d="M22,82 Q46,48 76,24" fill="none" stroke="#fff" stroke-width="4"/>'; },
    gear: function () { return '<g fill="#7A8794"><circle cx="50" cy="50" r="26"/>' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<rect x="44" y="12" width="12" height="16" rx="2" transform="rotate(' + a + ' 50 50)"/>'; }).join('') + '</g><circle cx="50" cy="50" r="10" fill="#fff"/>'; },
    rpm: function () { return '<circle cx="50" cy="54" r="40" fill="#1F2328"/><path d="M20,72 A34,34 0 1 1 80,72" fill="none" stroke="#555" stroke-width="6"/><path d="M68,24 A34,34 0 0 1 80,72" fill="none" stroke="#E53935" stroke-width="6"/><line x1="50" y1="56" x2="42" y2="26" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' + T(50, 86, 'x1000', { fs: 11, c: '#fff', ff: 'Arial' }); },
    window: function () { return '<path d="M10,80 L22,26 Q24,18 32,18 H68 Q76,18 78,26 L90,80z" fill="#BFE3F5" stroke="#3B3227" stroke-width="5"/><path d="M30,74 Q50,34 72,30" fill="none" stroke="#3B3227" stroke-width="4"/>'; },
    wiper: function () { return IC.window(); },
    mirror: function () { return '<rect x="14" y="28" width="62" height="40" rx="14" fill="#BFE3F5" stroke="#3B3227" stroke-width="5"/><path d="M76,48 h14" stroke="#3B3227" stroke-width="8"/>' + car(44, 50, .32, '#3F9BD6'); },
    blindspot: function () { return '<path d="M50,52 L6,96 H40z" fill="#E53935" opacity=".35"/>' + '<g transform="rotate(0)">' + car(50, 30, .55) + '</g>' + IC.bike().replace('<g ', '<g transform="translate(0 50) scale(.35) translate(30 30)" '); },
    radar: function () { return car(36, 66, .6) + car(86, 66, .45, '#3F9BD6') + '<g fill="none" stroke="#3F9BD6" stroke-width="4" stroke-linecap="round"><path d="M60,50 q6,8 0,16"/><path d="M66,44 q10,14 0,28"/><path d="M72,38 q14,20 0,40"/></g>' + '<path d="M14,22 h26 M14,22 v12 M40,22 v12" stroke="#E8734A" stroke-width="4"/>'; },
    acc: function () { return IC.radar(); },
    lane: function () { return '<rect x="8" y="8" width="84" height="84" rx="12" fill="#8F959B"/><path d="M28,8 v84 M72,8 v84" stroke="#fff" stroke-width="4" stroke-dasharray="10 8"/>' + '<g transform="translate(50 62) scale(.55)">' + '<rect x="-20" y="-36" width="40" height="72" rx="10" fill="#E8734A"/></g><path d="M36,30 l-8,-8 M64,30 l8,-8" stroke="#2EE65A" stroke-width="5" stroke-linecap="round"/>'; },
    aeb: function () { return car(30, 64, .55) + '<rect x="70" y="30" width="20" height="50" rx="4" fill="#3F9BD6"/><path d="M50,22 l6,10 h-12z" fill="#E53935"/><text x="50" y="31" font-size="9" fill="#fff" text-anchor="middle" font-family="Arial">!</text><g fill="none" stroke="#E53935" stroke-width="4"><path d="M56,52 q5,8 0,16"/><path d="M62,46 q9,14 0,28"/></g>'; },
    cam: function () { return '<rect x="12" y="30" width="62" height="44" rx="8" fill="#3B3227"/><path d="M74,44 l16,-10 v36 l-16,-10z" fill="#3B3227"/><circle cx="40" cy="52" r="14" fill="#3F9BD6" stroke="#fff" stroke-width="4"/>'; },
    park: function () { return '<rect x="10" y="10" width="80" height="80" rx="14" fill="#2F6FB0"/>' + T(50, 72, 'P', { fs: 60, c: '#fff', ff: 'Arial' }); },
    sensor: function () { return car(50, 34, .6) + '<g fill="none" stroke="#E3A72F" stroke-width="4"><path d="M30,60 q20,14 40,0"/><path d="M24,70 q26,18 52,0"/><path d="M18,80 q32,22 64,0"/></g>'; },
    wheel: function () { return '<circle cx="50" cy="50" r="38" fill="none" stroke="#3B3227" stroke-width="10"/><circle cx="50" cy="50" r="9" fill="#3B3227"/><path d="M14,50 h28 M58,50 h28 M50,58 v30" stroke="#3B3227" stroke-width="8"/>'; },
    hands: function () { return IC.wheel() + '<circle cx="16" cy="44" r="10" fill="#F0C9A0" stroke="#C99A6E" stroke-width="2"/><circle cx="84" cy="44" r="10" fill="#F0C9A0" stroke="#C99A6E" stroke-width="2"/>'; },
    isa: function () { return '<rect x="6" y="18" width="88" height="64" rx="12" fill="#1F2328"/><circle cx="34" cy="50" r="20" fill="#fff" stroke="#E53935" stroke-width="5"/>' + T(34, 56, '50', { fs: 15, c: '#111', ff: 'Arial' }) + T(72, 58, '52', { fs: 20, c: '#FFB300', ff: 'Fredoka, Arial' }); },
    cruise: function () { return lamp('#2EE65A', '<path d="M22,66 a30,30 0 1 1 56,0"/><path d="M50,62 l12,-18"/>'); },
    snow: function () { return '<g stroke="#3F9BD6" stroke-width="6" stroke-linecap="round">' + [0, 60, 120].map(function (a) { return '<line x1="50" y1="10" x2="50" y2="90" transform="rotate(' + a + ' 50 50)"/>'; }).join('') + '</g>'; },
    rain: function () { return '<path d="M24,46 a18,18 0 0 1 18,-20 a22,22 0 0 1 40,8 a14,14 0 0 1 0,28 h-56 a14,14 0 0 1 -2,-16z" fill="#9AA3AB"/><g stroke="#3F9BD6" stroke-width="5" stroke-linecap="round"><line x1="34" y1="72" x2="28" y2="88"/><line x1="52" y1="72" x2="46" y2="88"/><line x1="70" y1="72" x2="64" y2="88"/></g>'; },
    fog: function () { return '<g stroke="#9AA3AB" stroke-width="8" stroke-linecap="round"><line x1="12" y1="30" x2="88" y2="30"/><line x1="20" y1="50" x2="80" y2="50"/><line x1="12" y1="70" x2="88" y2="70"/></g>'; },
    sun: function () { return '<circle cx="50" cy="50" r="20" fill="#F9C02D"/><g stroke="#F9C02D" stroke-width="6" stroke-linecap="round">' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<line x1="50" y1="8" x2="50" y2="20" transform="rotate(' + a + ' 50 50)"/>'; }).join('') + '</g>'; },
    night: function () { return '<rect x="6" y="6" width="88" height="88" rx="16" fill="#1F2A44"/><circle cx="54" cy="44" r="24" fill="#FFF3C4"/><circle cx="66" cy="36" r="22" fill="#1F2A44"/>'; },
    wind: function () { return '<g fill="none" stroke="#5E7FA8" stroke-width="7" stroke-linecap="round"><path d="M8,36 h56 q14,0 14,-12 q0,-10 -10,-10"/><path d="M8,56 h74 q12,0 12,12 q0,10 -10,10"/><path d="M8,76 h36"/></g>'; },
    ice: function () { return IC.snow() + '<rect x="6" y="80" width="88" height="10" rx="5" fill="#BFE3F5"/>'; },
    leafroad: function () { return '<rect x="6" y="60" width="88" height="30" fill="#8F959B"/><path d="M30,66 q8,-10 16,0 q-8,10 -16,0z M60,74 q8,-10 16,0 q-8,10 -16,0z" fill="#C9604A"/>' + IC.rain().replace(/<g stroke[^]*$/, ''); },
    water: function () { return '<rect x="6" y="56" width="88" height="34" fill="#8F959B"/><path d="M6,66 q11,-8 22,0 q11,8 22,0 q11,-8 22,0 q11,8 22,0 V90 H6z" fill="#3F9BD6" opacity=".8"/>' + car(50, 46, .55); },
    check: function () { return '<circle cx="50" cy="50" r="42" fill="#5BB36A"/><path d="M28,52 l14,14 l30,-32" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'; },
    cross: function () { return '<circle cx="50" cy="50" r="42" fill="#D65A3A"/><path d="M32,32 L68,68 M68,32 L32,68" stroke="#fff" stroke-width="10" stroke-linecap="round"/>'; },
    info: function () { return '<circle cx="50" cy="50" r="42" fill="#3F9BD6"/><rect x="45" y="44" width="10" height="32" rx="4" fill="#fff"/><circle cx="50" cy="30" r="6" fill="#fff"/>'; },
    warn: function () { return '<path d="M50,8 L94,88 H6z" fill="#F9C02D" stroke="#3B3227" stroke-width="4"/><rect x="45" y="34" width="10" height="30" rx="4" fill="#3B3227"/><circle cx="50" cy="74" r="6" fill="#3B3227"/>'; },
    first: function () { return '<rect x="10" y="22" width="80" height="62" rx="10" fill="#fff" stroke="#2EAD4B" stroke-width="5"/><rect x="40" y="10" width="20" height="14" rx="4" fill="none" stroke="#2EAD4B" stroke-width="5"/><path d="M50,36 v36 M32,54 h36" stroke="#2EAD4B" stroke-width="10"/>'; },
    phone112: function () { return IC.phone() + T(50, 56, '112', { fs: 16, c: '#fff', ff: 'Fredoka, Arial' }); },
    police: function () { return '<rect x="8" y="8" width="84" height="84" rx="16" fill="#1F3A6B"/>' + T(50, 58, 'POLITIE', { fs: 15, c: '#fff', ff: 'Arial' }); },
    fire: function () { return '<path d="M50,8 q22,22 22,46 a22,22 0 0 1 -44,0 q0,-16 12,-26 q0,14 10,18 q-6,-20 0,-38z" fill="#E8734A"/>'; },
    ext: function () { return '<rect x="34" y="26" width="32" height="66" rx="10" fill="#E53935"/><path d="M42,26 v-10 h16 v10 M58,16 h18 l6,10" fill="none" stroke="#333" stroke-width="5"/>'; },
    ruler: function () { return '<rect x="6" y="38" width="88" height="24" rx="3" fill="#F9C02D" stroke="#8A6A3C" stroke-width="2"/><path d="M16,38 v10 M28,38 v6 M40,38 v10 M52,38 v6 M64,38 v10 M76,38 v6 M88,38 v10" stroke="#3B3227" stroke-width="2.5"/>'; },
    dist2: function () { return car(22, 60, .42, '#3F9BD6') + car(78, 60, .42) + '<path d="M36,82 H64" stroke="#E8734A" stroke-width="4"/><circle cx="50" cy="30" r="16" fill="#fff" stroke="#E8734A" stroke-width="4"/><path d="M50,22 v8 l6,4" stroke="#E8734A" stroke-width="3.5" fill="none"/>'; },
    eco: function () { return IC.leaf(); },
    bus: function () { return '<rect x="6" y="20" width="88" height="54" rx="8" fill="#F2C200"/><rect x="12" y="28" width="16" height="16" fill="#BFE3F5"/><rect x="32" y="28" width="16" height="16" fill="#BFE3F5"/><rect x="52" y="28" width="16" height="16" fill="#BFE3F5"/><rect x="72" y="28" width="16" height="30" fill="#BFE3F5"/><circle cx="26" cy="76" r="8" fill="#333"/><circle cx="74" cy="76" r="8" fill="#333"/>'; },
    tram: function () { return '<rect x="6" y="20" width="88" height="56" rx="12" fill="#fff" stroke="#2F6FB0" stroke-width="5"/><rect x="14" y="30" width="72" height="18" rx="4" fill="#BFE3F5"/><path d="M30,10 l20,10 l20,-10" fill="none" stroke="#333" stroke-width="3"/><path d="M0,88 h100" stroke="#555" stroke-width="4"/>'; },
    train: function () { return '<rect x="14" y="10" width="72" height="70" rx="14" fill="#F2C200"/><rect x="22" y="20" width="56" height="26" rx="4" fill="#2E3A44"/><circle cx="32" cy="62" r="6" fill="#fff"/><circle cx="68" cy="62" r="6" fill="#fff"/><path d="M24,80 l-10,12 M76,80 l10,12" stroke="#333" stroke-width="5"/>'; },
    tractor: function () { return '<rect x="20" y="40" width="46" height="26" rx="4" fill="#5BB36A"/><rect x="42" y="16" width="26" height="26" rx="3" fill="#5BB36A"/><rect x="46" y="20" width="18" height="16" fill="#BFE3F5"/><circle cx="66" cy="70" r="20" fill="#333"/><circle cx="26" cy="74" r="12" fill="#333"/>'; },
    horse: function () { return '<path d="M20,46 q4,-12 20,-12 h22 l10,-14 q10,4 10,14 l-6,6 v20 h-6 v-14 h-34 v14 h-6 v-18z" fill="#8A5A3C"/>'; },
    amb: function () { return '<rect x="6" y="30" width="70" height="40" rx="6" fill="#fff" stroke="#C9C9C9" stroke-width="3"/><path d="M76,40 h10 l8,14 v16 h-18z" fill="#fff" stroke="#C9C9C9" stroke-width="3"/><path d="M30,42 v20 M20,52 h20" stroke="#2F6FB0" stroke-width="7"/><rect x="34" y="20" width="16" height="10" rx="3" fill="#1E6FFF"/><circle cx="24" cy="72" r="8" fill="#333"/><circle cx="76" cy="72" r="8" fill="#333"/>'; },
    siren: function () { return '<rect x="30" y="44" width="40" height="34" rx="6" fill="#1E6FFF"/><rect x="24" y="76" width="52" height="10" rx="3" fill="#333"/><g stroke="#1E6FFF" stroke-width="5" stroke-linecap="round"><line x1="50" y1="10" x2="50" y2="28"/><line x1="18" y1="24" x2="28" y2="36"/><line x1="82" y1="24" x2="72" y2="36"/></g>'; },
    tl_r: function () { return tl('r'); }, tl_y: function () { return tl('y'); }, tl_g: function () { return tl('g'); }, tl_ry: function () { return tl('ry'); },
    tl_ga: function () { return tl('ga'); }, tl_ra: function () { return tl('ra'); }, tl_f: function () { return tl('rf'); },
    yflash: function () { return '<rect x="32" y="20" width="36" height="60" rx="10" fill="#2B2B2B"/><circle cx="50" cy="50" r="13" fill="#F9C02D"/><g stroke="#F9C02D" stroke-width="4" stroke-linecap="round"><line x1="14" y1="50" x2="24" y2="50"/><line x1="76" y1="50" x2="86" y2="50"/><line x1="20" y1="28" x2="27" y2="34"/><line x1="80" y1="28" x2="73" y2="34"/></g>'; },
    ped_r: function () { return '<rect x="26" y="6" width="48" height="88" rx="8" fill="#2B2B2B"/><rect x="34" y="14" width="32" height="34" rx="4" fill="#3a0d0d"/>' + person(50, 34, .45, '#E53935') + '<rect x="34" y="52" width="32" height="34" rx="4" fill="#123015"/>'; },
    ped_g: function () { return '<rect x="26" y="6" width="48" height="88" rx="8" fill="#2B2B2B"/><rect x="34" y="14" width="32" height="34" rx="4" fill="#3a0d0d"/><rect x="34" y="52" width="32" height="34" rx="4" fill="#123015"/>' + person(50, 72, .45, '#2EE65A'); },
    rail_r: function () { return '<rect x="10" y="30" width="80" height="34" rx="17" fill="#2B2B2B"/><circle cx="30" cy="47" r="11" fill="#E53935"/><circle cx="70" cy="47" r="11" fill="#555"/><path d="M50,64 v30" stroke="#333" stroke-width="5"/><g stroke="#E53935" stroke-width="3"><line x1="12" y1="47" x2="4" y2="47"/></g>'; },
    rail_w: function () { return '<rect x="10" y="30" width="80" height="34" rx="17" fill="#2B2B2B"/><circle cx="30" cy="47" r="11" fill="#555"/><circle cx="70" cy="47" r="11" fill="#555"/><circle cx="50" cy="20" r="10" fill="#fff" stroke="#999" stroke-width="2"/><path d="M50,64 v30" stroke="#333" stroke-width="5"/>'; },
    bridge_r: function () { return '<rect x="22" y="14" width="56" height="72" rx="10" fill="#2B2B2B"/><circle cx="50" cy="36" r="12" fill="#E53935"/><circle cx="50" cy="64" r="12" fill="#E53935"/>'; },
    mx_x: function () { return '<rect x="10" y="10" width="80" height="80" rx="8" fill="#111"/>' + mx('x', 50, 50).replace(/stroke-width="4"/, 'stroke-width="9"').replace(/-9/g, '-24').replace(/\+ 9/g, '+24').replace(/(\d+(\.\d+)?)/g, function (m) { return m; }); },
    mx_g: function () { return '<rect x="10" y="10" width="80" height="80" rx="8" fill="#111"/><path d="M42,20 h16 v30 h16 l-24,30 l-24,-30 h16z" fill="#2EE65A"/>'; },
    mx_w: function () { return '<rect x="10" y="10" width="80" height="80" rx="8" fill="#111"/><path d="M28,24 L64,60" stroke="#fff" stroke-width="10"/><path d="M76,74 h-32 l32,-32z" fill="#fff"/>'; },
    mx_n: function () { return '<rect x="10" y="10" width="80" height="80" rx="8" fill="#111"/><circle cx="50" cy="50" r="32" fill="none" stroke="#FF2A2A" stroke-width="6"/>' + T(50, 62, '70', { fs: 32, c: '#fff', ff: 'Arial' }); },
    mx_end: function () { return '<rect x="10" y="10" width="80" height="80" rx="8" fill="#111"/><circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-width="4"/><line x1="30" y1="70" x2="70" y2="30" stroke="#fff" stroke-width="4"/>'; },
    cop_up: function () { return cop('up'); }, cop_side: function () { return cop('side'); }, cop_both: function () { return cop('both'); }, cop_slow: function () { return cop('slow'); }, brig: function () { return cop('brig'); },
    stopd: function () { return car(50, 40, .9) + '<path d="M10,82 H90" stroke="#E8734A" stroke-width="5"/><path d="M10,74 v16 M90,74 v16" stroke="#E8734A" stroke-width="4"/>'; },
    keys: function () { return '<circle cx="34" cy="40" r="20" fill="none" stroke="#E3A72F" stroke-width="9"/><path d="M48,54 L84,90 M70,76 l8,-8 M78,84 l8,-8" stroke="#E3A72F" stroke-width="9" stroke-linecap="round"/>'; },
    window2: function () { return IC.window(); },
    jack: function () { return '<path d="M20,86 h60 M50,86 V40 M30,40 h40 l-20,-24z" fill="#7A8794" stroke="#555" stroke-width="6"/>'; },
    num: function () { return ''; }
  };
  function icon(name) {
    if (!name) return '';
    if (/^sp:/.test(name)) return speedo(name.slice(3));
    if (/^txt:/.test(name)) { var s = name.slice(4); return '<rect x="6" y="20" width="88" height="60" rx="14" fill="#FFF1EA" stroke="#E8734A" stroke-width="3"/>' + T(50, 60, s, { fs: s.length > 6 ? 16 : 26, c: '#E8734A', ff: 'Fredoka, Vazirmatn, Arial' }); }
    if (/^sg:/.test(name)) return '<image href="signs/' + name.slice(3) + '.svg" x="6" y="6" width="88" height="88"/>';
    return (IC[name] || IC.info)();
  }
  window.SceneX = { road: road, round: round, pic: pic, wx: wx, icon: icon, icons: Object.keys(IC) };
})();
