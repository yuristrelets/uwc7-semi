require('angular');
require('angular-ui-router');


var deps = [
  'ui.router',
  require('./services/index').name,
  require('./directives/index').name
];

angular
  .module('app', deps)
  .config(require('./routes'));