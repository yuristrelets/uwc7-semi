module.exports = function($scope, $stateParams, conf, Reddit) {
  angular.extend($scope, {
    items: [],
    error: false,
    before: null,
    after: null,
    sortItems: conf.reddit.sortBy
  });

  // init
  _loadSubreddit({
    before: $stateParams.before,
    after: $stateParams.after,
    count: $stateParams.count
  });

  // ===================================================

  /**
   * Loads subreddit page.
   * @param params
   * @private
   */
  function _loadSubreddit(params) {
    var request = Reddit.subreddit($stateParams.subreddit, $stateParams.sort, params || {});

    request(
      function _success(res) {
        console.log(res);
        $scope.$evalAsync(function() {
          $scope.items = res.data.children;
          $scope.before = res.data.before;
          $scope.after = res.data.after;
        });
      },
      function _error() {
        $scope.$evalAsync(function() {
          $scope.error = true;
        });
      }
    );
  }

};