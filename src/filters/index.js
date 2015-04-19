require('angular');

var app = angular.module('app.filters', []);

require('./timeago').inject(app);
require('./reddit-url').inject(app);

module.exports = app;
