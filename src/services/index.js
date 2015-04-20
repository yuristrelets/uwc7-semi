require('angular');

var app = angular.module('app.services', []);

require('./reddit-client').inject(app);
require('./service-worker').inject(app);

module.exports = app;