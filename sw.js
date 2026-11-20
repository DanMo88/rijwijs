// CBR Daniel service worker · HTML network-first · assets stale-while-revalidate (audio and signs cached on first use)
const V = 'cbrdaniel-v11';
const JS = ['data/core', 'data/signs', 'data/ch1', 'data/ch2', 'data/ch3', 'data/ch4', 'data/ch5', 'data/ch6', 'data/ch7', 'data/ch8', 'data/audio-index', 'diagram', 'scenes', 'audio', 'app', 'install'];
const SHELL = ['./', 'index.html', 'css/styles.css?v=5', 'manifest.webmanifest'].concat(JS.map(j => 'js/' + j + '.js?v=5'),
  ['fonts/Vazirmatn-Regular.woff2', 'fonts/Vazirmatn-Bold.woff2', 'fonts/Vazirmatn-Black.woff2', 'fonts/Fredoka-Bold.woff2',
   'icons/icon-192.png', 'icons/icon-512.png', 'images/shir-o-khorshid.svg', 'images/nl.svg']);
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => (k.startsWith('rijwijs-') || k.startsWith('cbrdaniel-')) && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
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
