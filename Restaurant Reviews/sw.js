const MyCacheName = 'site-static';
const dynamicCache = 'site-dynamic';
let assets =['/' ,
 '/index.html' ,
 '/restaurant.html' ,
 '/css/styles.css' ,
 '/data/restaurants.josn',
 '/img/1.jpg',
 '/img/2.jpg',
 '/img/3.jpg',
 '/img/4.jpg',
 '/img/5.jpg',
 '/img/6.jpg',
 '/img/7.jpg',
 '/img/8.jpg',
 '/img/9.jpg',
 '/img/10.jpg',
 '/js/main.js',
 '/js/app.js','/js/dbhelper.js','/js/restaurant_info.js',
];

//install service worker...
self.addEventListener('install', function (evt) {
   //open a cache...
  evt.waitUntil(
    caches.open(MyCacheName).then(function (cache) {
      console.log('caching shell assets');
       //cache all files...
       return cache.addAll(assets);
    }).catch(erroe =>{
      console.log('erroe');
    })
  );
});

//fetch event...
//this event intercept all requsets and checks whether there is a version in cache...
//if there is , it serves it from the cache otherwise from network...
self.addEventListener('fetch' ,function (evt){
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request).then(fetcr => {
       return caches.open(dynamicCache).then(cache =>{
         cache.put(evt.request.url, fetcr.clone());
         limitCaches(dynamicCache ,3);
         return fetcr;
        })
      });
    })
  );
});


self.addEventListener("message", function(evt) {
    if (evt.data.action === "skipWaiting") {
        self.skipWaiting();
    }
});

//activate service worker...
self.addEventListener('activate' , function (evt){
  evt.waitUntil(
      caches.keys().then(keys =>{
        return Promise.all(keys
          .filter(key => key !== MyCacheName && key !== dynamicCache)
          .map(key => caches.delete(key))
        )
     })
  );
});
