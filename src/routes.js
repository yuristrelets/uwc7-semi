module.exports = function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .when('/?', function($location) {
      var url = decodeURIComponent($location.url());
      console.log(url, url.replace('/?', ''));
      return url.replace('/?', '');
    })
    .otherwise('/');

  $urlRouterProvider.when('/?', '/');

  $stateProvider
    .state('app', {
      abstract: true,
      template: require('./routes/index.html')
    })
    .state('app.home', {
      url: '/',
      /*controllerAs: 'vm',
      controller: require('./routes/list/index'),*/
      template: 'index page'
    })
    .state('app.list', {
      url: '/:subreddit/:sort?after&before&count',
      params: {
        sort: {
          value: 'hot',
          squash: true
        }
      },
      controllerAs: 'vm',
      controller: require('./routes/list/index'),
      template: require('./routes/list/index.html')
    })
    .state('app.comments', {
      url: '/:subreddit/comments/:id',
      controllerAs: 'vm',
      controller: require('./routes/comments/index'),
      template: require('./routes/comments/index.html')
    })
    .state('app.404', {
      url: '/*path',
      template: require('./routes/404/index.html')
    });

};
