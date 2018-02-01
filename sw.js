var staticAssets = [
  './',
  './index.html',
  './styles/main.css',
  './scripts/main.js'
];

self.addEventListener('install',event => {
  console.log('[SW] Installing...');

  event.waitUntil(
    caches.open('CACHE').then( cache => {
      console.log('[SW] Caching app shell.');
      return cache.addAll(staticAssets);
    })
  )
});

self.addEventListener('active', event => console.log('[SW] Activated.'));

self.addEventListener('fetch', event => {
  console.log('[SW] Fetching');
  // event.respondWidth(
  //   fetch(event.request).catch(err => {
  //     console.error('[SW] Network request Failed. Serving offline page ' + error);
  //     return caches.open('CACHE').then(cache => {
  //       return cache.match('index.html');
  //     });
  //   });
  // );

  event.respondWith(
    fetch(event.request).catch(function(error) {
        console.error( '[SW] Network request Failed. Serving offline page ' + error );
        return caches.open('CACHE').then(function(cache) {
          return cache.match('index.html');
      });
    }));
});
