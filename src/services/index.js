require('angular');

var app = angular.module('app.services', []);

require('./reddit-client').inject(app);

module.exports = app;