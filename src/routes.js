module.exports = function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .when('/?', function($location) {
      var url = $location.url();
      url = decodeURIComponent(url).replace('/?', '');

      if(url.charAt(0) === '/')  {
        url = url.slice(1);
      }

      if(url) {
        return '/r/' + url;
      }

      return false;
    })
    .otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      template: require('./routes/index.html')
    })
    .state('app.home', {
      url: '/',
      template: require('./routes/index/index.html')
    })
    .state('app.list', {
      url: '/r/{subreddit:.{3,}}/:sort?after&before&{count:int}',
      params: {
        sort: {
          value: 'hot',
          squash: true
        },
        count: {
          value: 0,
          squash: true
        }
      },
      controllerAs: 'vm',
      controller: require('./routes/list/index'),
      template: require('./routes/list/index.html')
    })
    .state('app.comments', {
      url: '/{subreddit:.{3,}}/comments/{id:.{3,}}',
      controllerAs: 'vm',
      controller: require('./routes/comments/index'),
      template: require('./routes/comments/index.html')
    })
    .state('app.404', {
      url: '/*path',
      template: require('./routes/404/index.html')
    });

};
