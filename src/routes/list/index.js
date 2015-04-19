module.exports = function($scope, $stateParams, conf, Reddit) {
  var vm = this;
  vm.items = [];

  console.log($stateParams);

  vm.sortByList = conf.reddit.sortBy;
  vm.sortBy = $stateParams.sort;

  var options = {
    after: $stateParams.after,
    before: $stateParams.before,
    count: $stateParams.count
  };

  var request = Reddit.subreddit($stateParams.subreddit, $stateParams.sort, options);
  request(_success, _error);

  function _success(res) {
    console.log(res);
    $scope.$evalAsync(function() {
      vm.items = res.data.children;
    });
  }

  function _error(err) {
    console.log(err);
  }

};