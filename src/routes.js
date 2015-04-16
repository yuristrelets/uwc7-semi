module.exports = function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/r/aww');

  $stateProvider
    .state('subreddit', {
      url: "/r/:subreddit",
      controllerAs: 'vm',
      controller: require('./routes/index/index'),
      template: require('./routes/index/index.html')
    });
};