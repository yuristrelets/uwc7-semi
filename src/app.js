require('angular');
require('angular-ui-router');


// register worker
navigator
  .serviceWorker
  .register('worker.js', { scope: '/uwc7-semi/' })
  .then(function(reg) {
    console.info('Service worker registered! Scope:', reg.scope);
  })
  .catch(function(error) {
    console.error('Service worker error!', error);
  });


// start app
var deps = [
  'ui.router',
  require('./services/index').name,
  require('./directives/index').name
];

angular
  .module('app', deps)
  .config(require('./routes'));
