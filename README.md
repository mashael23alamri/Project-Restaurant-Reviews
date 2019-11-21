# Restaurant-Reviews

## Responsive Design
The page response was implemented using viewport and some CCS features.

so , in HTML 
```HTML
  <head>
     <meta name="viewport" content="width=device-width,initial-scale=1">
  </head
```
and in CSS
```CSS
  @media only screen and (max-width :600px) {
	header{
		display: flex;
		flex-direction: column;
	}
  ......... ect.
```
And many other characteristics of them
```CSS
         display: flex;
	flex-direction: row;
	flex-wrap: wrap;
  ......... ect.
```
.............................................................................

## The Focus
 Use a property tabIndex to be given a sequential order for the disabled in the two files main.js and restaurant_info.js.
EX:

```js
 name.tabIndex = 0;
  ```
.............................................................................

Use the property aria-label to give an accurate and concise description for people with special needs.
EX:

```js
 more.setAttribute("aria-label",'View more details about ${restaurant.name}');
  ```
  .............................................................................
  
  ## Service Workers
  The setup a service workers
  
  1-Register the Service Worker
  Create a new file (app.js) inside the JavaScript folder
  
  ```js
 if('serviceWorker' in navigator){
   navigator.serviceWorker.register('/sw.js')
  .then((reg) => console.log('service worker registered',reg))
  .catch((err) => console.log('service worker not registered',err));
}
  ```
  
  2-Install the Service Worker
  
  3-Open a cache and cache files
  Create a new file (sw.js) inside the Project folder
  
  ```js
 const MyCacheName = 'site-static';
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
 self.addEventListener('install', function (evt) {
   //open a cache...
  evt.waitUntil(
    caches.open(MyCacheName).then(function (cache) {
      console.log('caching shell assets');
       //cache all files...
       return cache.addAll(assets);
    }).chtch(erroe =>{
      console.log('erroe');
    })
  );
});
  ```
  
  4-Intercept requests and utilize the cache
  
  ```js
 self.addEventListener('fetch' ,function (evt){
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      returen response || fetch (evt.request);
    })
  );
});

  ```
  
  5-Update the Service Worker
  
  ```js
self.addEventListener('activate' , function (evt){
  evt.waitUntil(
      caches.keys().then(function (cacheName) {
        return Promise.all(
          cacheName.filter(function (cacheName){
            return cacheName.startsWith('site-')&& cacheName != MyCacheName;
          }).map(function (cacheName){
            return caches.delete(cacheName);
          })
        );
      });

  ```
   .............................................................................
   
   # Resources
- [link to site Web](https://developers.google.com/web/fundamentals/primers/service-workers) 
- [link to site W3schools](https://www.w3schools.com/default.asp) 
- [link to  site Mozilla](developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role)   
- [link to  site whatwg](html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute)
  
