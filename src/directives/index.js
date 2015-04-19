require('angular');

var app = angular.module('app.directives', []);

require('./pagination/index').inject(app);
require('./sort-pagination/index').inject(app);

require('./list-item/index').inject(app);

module.exports = app;
