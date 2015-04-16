module.exports = function($stateParams, RedditClient) {
  var vm = this;

  vm.title = 'Main Page';

  console.log($stateParams);


  RedditClient
    .hot($stateParams.subreddit)
    .limit(25)
    .fetch(function(res) {
      console.log(res);

      vm.items = res.data;


    }, function(err) {
      console.log(err);
    });



};