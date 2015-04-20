(function() {
  'use strict';

  var REDDIT_URL = 'https://www.reddit.com/';

  var STATIC_CACHE_ID = 'static-cache-v1';
  var REDDIT_CACHE_ID = 'reddit-cache-v1';
  var REDDIT_STATIC_CACHE_ID = 'reddit-static-cache-v1';

  // add polyfill
  importScripts("build/js/sw-cache-polyfill.js");

  // add events
  self.addEventListener('install', onInstall);
  self.addEventListener('activate', onActivate);
  self.addEventListener('fetch', onFetch);


  function onInstall(e) {
    console.log('worker installed');
  }

  function onActivate(e) {
    console.log('worker activated');
  }

  function onFetch(e) {
    var request = e.request;
    //console.log('fetch', request.url);

    e.respondWith(
      caches
        .match(request)
        .then(function(cacheResponse) {
          //console.log('from cache', cacheResponse);

          // assume static content
          // TODO return basic content
          if(cacheResponse && 'opaque' === cacheResponse.type) {
            return cacheResponse;
          }

          return _fetch(request, cacheResponse);
        })
    );
  }

  function _fetch(request, cacheResponse) {
    return fetch(request)
      .then(function(response) {
        //console.log('fetched', response);

        var cacheId;
        var url = response.url;
        var responseJson = response.clone();
        var responseCache = response.clone();

        if('cors' === response.type && /reddit.com/.test(url)) {
          cacheId = REDDIT_CACHE_ID;

          // parse list pages
          if(/(hot|new|top|controversial).json/.test(url)) {
            responseJson.json().then(_cacheList);
          }

        } else if('basic' === response.type) {
          cacheId = STATIC_CACHE_ID;

        } else if('opaque' == response.type) {
          cacheId = REDDIT_STATIC_CACHE_ID;
        }

        if(cacheId && response.status < 400) {
          caches
            .open(cacheId)
            .then(function(cache) {
              //console.log('cached!');
              cache.put(request, responseCache);
            });
        }

        return response;
      })
      .catch(function() {
        // if response failed
        // and response exists in cache
        // return cached response
        if(cacheResponse) {
          return cacheResponse;
        }
      });
  }

  /**
   * Cache all detail links from list.
   * @param list
   * @private
   */
  function _cacheList(list) {
    console.log('!!!!!', list);
    var cacheList = [], parts;
    list = list.data.children;

    list.forEach(function(item) {
      // prepare url
      parts = item.data.permalink.split('/');
      cacheList.push(REDDIT_URL + parts.slice(1, 5).join('/') + '.json');
    });

    console.log('!!!!!!!!!', cacheList);

    caches
      .open(REDDIT_CACHE_ID)
      .then(function(cache) {
        return cache.addAll(cacheList);
      });
  }

})();
