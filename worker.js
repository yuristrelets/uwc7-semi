(function() {
  'use strict';

  var LOCAL_FILES = [
    'index.html',
    'app.js'
  ];

  var STATIC_CACHE_ID = 'static-cache-v1';
  var REDDIT_CACHE_ID = 'reddit-cache-v1';

  // add polyfill
  importScripts("build/js/sw-cache-polyfill.js");

  // add events
  self.addEventListener('install', onInstall);
  self.addEventListener('activate', onActivate);
  self.addEventListener('fetch', onFetch);


  function onInstall(e) {
    console.log('install');
    /*e.waitUntil(
      caches
        .open(STATIC_CACHE_ID)
        .then(function(cache) {
          return cache.addAll(LOCAL_FILES);
        })
    );*/
  }

  function onActivate(e) {
    console.log('activate');
  }


  function onFetch(e) {
    var request = e.request;

    console.log(e.request.url);

    e.respondWith(
      caches
        .match(request)
        .then(function (response) {
          console.log('from cache', response);

          //if (response) return response;

          return fetch(request)
            .then(function (response) {
              console.log('fetched', response);
              var response2 = response.clone();
              var response3 = response.clone();

              if (/.reddit.com/.test(response2.url)) {
                console.log('hello reddit');

                caches
                  .open(REDDIT_CACHE_ID)
                  .then(function (cache) {
                    cache.put(request, response2);
                  });

                response3
                  .json()
                  .then(function (json) {
                    console.log('json', json);
                  });
              }

              return response;
            });
        })
    );
  }

})();
