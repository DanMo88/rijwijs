// Rijwijs service worker v3 · HTML network-first · assets stale-while-revalidate
const V = 'rijwijs-v3';
const SHELL = ['./', 'index.html', 'css/styles.css?v=3', 'js/app.js?v=3', 'js/data.js?v=3', 'js/diagram.js?v=3', 'js/install.js?v=3', 'js/audio.js?v=3', 'manifest.webmanifest',
  'fonts/Vazirmatn-Regular.woff2', 'fonts/Vazirmatn-Bold.woff2', 'fonts/Vazirmatn-Black.woff2', 'fonts/Fredoka-Bold.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'images/shir-o-khorshid.svg', 'images/nl.svg',
  'signs/B1.svg', 'signs/B2.svg', 'signs/B3.svg', 'signs/B4.svg', 'signs/B5.svg', 'signs/B6.svg', 'signs/B7.svg', 'signs/D1.svg', 'signs/J8.svg',
  'audio/t01.mp3?v=3', 'audio/t02.mp3?v=3', 'audio/t03.mp3?v=3', 'audio/t04.mp3?v=3', 'audio/t05.mp3?v=3', 'audio/t06.mp3?v=3', 'audio/t07.mp3?v=3', 'audio/t08.mp3?v=3', 'audio/t09.mp3?v=3', 'audio/t10.mp3?v=3', 'audio/t11.mp3?v=3'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('rijwijs-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(V).then(c => c.put(req, cp)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
  } else {
    e.respondWith(caches.match(req).then(hit => { const net = fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(V).then(c => c.put(req, cp)); } return r; }).catch(() => hit); return hit || net; }));
  }
});
