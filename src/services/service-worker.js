exports.inject = function(app) {
  app.factory('ServiceWorker', exports.factory);
};

exports.factory = function() {
  var controller = navigator.serviceWorker.controller;

  return {
    active: !!controller
  };
};

exports.register = function(appstart) {
  if(!'serviceWorker' in navigator) {
    return alert('Your browser is sucks! Use latest version of Chrome.');
  }

  navigator
    .serviceWorker
    .register('worker.js', { scope: '/uwc7-semi/' })
    .then(function() {
      console.info('Service worker registered!');
      appstart();
    })
    .catch(function(error) {
      console.error('Service worker error!', error);
      alert('Service Worker Error! Open console for details.');
    });
};