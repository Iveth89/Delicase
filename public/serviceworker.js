importScripts('/dixie.js');
importScripts('/bd.js');

let staticCache = "static-v1";
let dynamicCache = "dynamic-v1";
let inmutableCache = "inmutable-v1";
self.skipWaiting();

self.addEventListener("install", (result) => {
  // abrir el cache con base al nombre y si no existe lo crea
  let files_appShell = ["/",
    "/index.html",
    "/carrito.html",
    "/detalle.html",
    "/assets/favicon.ico","/css/styles.css",
    "/js/scripts.js",
    "/js/detalle.js",
    "/js/carrito.js",
    "/js/index.js",
    "/bd.js",
    'https://delicase.vercel.app/general/getAllTiposProducto',
    'https://delicase.vercel.app/general/getAllProductos?tp_id=0&key_words=',
    '/assets/imagenes/1.jpg',
    '/assets/imagenes/2.jpg',
    'assets/imagenes/3.jpg',
    'assets/imagenes/4.jpg',
    'assets/imagenes/5.jpg',
    'assets/imagenes/6.jpg',
    'assets/imagenes/7.jpg',
    'assets/imagenes/8.jpg',
    'assets/imagenes/9.jpg',
    'assets/imagenes/10.jpg',
    'assets/imagenes/11.jpg',
    'assets/imagenes/12.jpg',
    'assets/imagenes/13.jpg',
    'assets/imagenes/14.jpg',
    'assets/imagenes/15.jpg',
    'assets/imagenes/16.jpg',
    'assets/imagenes/17.jpg',
    'assets/imagenes/18.jpg',
    'assets/imagenes/19.jpg',
    'assets/imagenes/20.jpg',
    'assets/imagenes/21.jpg',
    'assets/imagenes/22.jpg',
    'assets/imagenes/23.jpg'
];
  const static_cache = caches.open(staticCache).then((cacheStatic) => {
    cacheStatic.addAll(files_appShell);
  });

  const inmutable_cache_files = [
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js",
      "/dixie.js"
    ];
   const inmutable_cache=caches.open(inmutableCache).then((cacheInmutable) => {
    cacheInmutable.addAll(inmutable_cache_files);
  });
  result.waitUntil(Promise.all([static_cache, inmutable_cache]));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cachesList) =>
        Promise.all(
          cachesList.map((cacheName) => {
            if (staticCache != cacheName && inmutableCache != cacheName) {
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => {
        console.log("V2 now ready to handle fetches!");
      })
  );
});






addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(dynamicCache)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(dynamicCache)
                .then(function(cache) {
                  return cache.match('/index.html');
                });
            });
        }
      })
  );
});



self.addEventListener('sync',function(event) {
    if(event.tag=='sincronizacion'){
      event.waitUntil( sincronizacion());
    }});

