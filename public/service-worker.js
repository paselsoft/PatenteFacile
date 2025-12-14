const CACHE_NAME = 'patente-facile-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installazione: Pre-caching dei file core
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Gestione messaggio per forzare l'attivazione del nuovo SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Attivazione: Pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      })
    ))
  );
  self.clients.claim();
});

// Fetch: Strategia Ibrida
self.addEventListener('fetch', (event) => {
  // Ignora richieste non GET (es. POST API) o estensioni Chrome
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  // 1. Strategia Network-First per Navigazione HTML (assicura aggiornamenti)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('./index.html');
        })
    );
    return;
  }

  // 2. Strategia Cache-First per Asset Statici (Immagini, Font, JS CDN)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Cacha la risposta solo se valida (status 200)
        // Nota: Cacha anche risposte opache (type 'opaque') da CDN esterni
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch((error) => {
        console.log('[Service Worker] Fetch failed:', error);
      });
    })
  );
});