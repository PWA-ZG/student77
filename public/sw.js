const filesToCache = [
    '/',
    'index.html',
    'app.js',
    'assets/site.css',
    'manifest.json'
];


self.addEventListener('install', function(event) {
event.waitUntil(
    caches.open('moja-cache').then(function(cache) {
        return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("**************************************");
    console.log("**   Activating new service worker... **");
    console.log("**************************************");
    const cacheWhitelist = [staticCacheName];
    // Ovako možemo obrisati sve ostale cacheve koji nisu naš
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
    })
);
});