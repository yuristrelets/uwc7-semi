require('angular');

var app = angular.module('app.services', []);

require('./reddit-client').inject(app);
require('./markdown').inject(app);

module.exports = app;