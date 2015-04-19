require('reddit.js');

require('angular');
require('angular-ui-router');
require('angular-module-sanitize');

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
  'ngSanitize',
  require('./services/index').name,
  require('./directives/index').name,
  require('./filters/index').name
];

angular
  .module('app', deps)
  .value('conf', require('./values'))
  .config(require('./routes'));
