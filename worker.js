(function() {
  'use strict';

  console.log('==========================================');

  importScripts("lib/sw-cache-polyfill.js");

  self.addEventListener('install', function(event) {
    console.log('install');
    event.waitUntil(
      caches
        .open('static-cache-v1')
        .then(function(cache) {
          return cache.addAll([
            "/uwc7-semi/index.html",
            "/uwc7-semi/app.js"
          ]);
        })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('activate');
  });

  self.addEventListener("fetch", function (event) {
    var request = event.request;

    console.log(event.request.url);

    event.respondWith(
      caches
        .match(request)
        .then(function(response) {
          console.log('from cache', response);

          if(response) return response;

          return fetch(request)
            .then(function(response) {
              console.log('fetched', response);
              var response2 = response.clone();
              var response3 = response.clone();

              if(/.reddit.com/.test(response2.url)) {
                console.log('hello reddit');

                caches
                  .open('reddit-cache-v1')
                  .then(function(cache) {
                    cache.put(request, response2);
                  });

                response3
                  .json()
                  .then(function(json) {
                    console.log('json', json);
                  });
              }

              return response;
            });
        })
    );
  });

})();