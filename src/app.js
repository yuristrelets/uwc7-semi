require('reddit.js');

require('angular');
require('angular-ui-router');
require('angular-module-sanitize');

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

require('./services/service-worker')
  .register(function() {
    angular.bootstrap(document, ['app']);
  });

window.addEventListener('online', function() { console.log('online'); });
window.addEventListener('offline', function() { console.log('offline'); });