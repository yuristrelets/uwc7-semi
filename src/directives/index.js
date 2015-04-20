require('angular');

var app = angular.module('app.directives', []);

require('./external-linker/index').inject(app);

require('./pagination/index').inject(app);
require('./sort-pagination/index').inject(app);

require('./list-item/index').inject(app);

require('./comment-list/index').inject(app);
require('./comment-item/index').inject(app);

require('./service-worker/index').inject(app);

module.exports = app;
