const FILES_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
   ]
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';
// --------------------------install-----------------------------------//
self.addEventListener("install", (event) =>{
    // pre cache image data
    event.waitUntil(
      caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipwaiting())
    );
    }); 
    
  // ------------------------------activate---------------------------//
  self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
        })
        .then((cachesToDelete) => {
          return Promise.all(
            cachesToDelete.map((cacheToDelete) => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });
//   ----------------------------fetch-----------------------------------//
self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open(RUNTIME).then((cache) => {
            return fetch(event.request).then((response) => {
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  });
  
  