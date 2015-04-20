module.exports = function($scope, $state, $stateParams, conf, Reddit) {
  angular.extend($scope, {
    items: [],
    subreddit: $stateParams.subreddit,
    error: false,
    before: null,
    after: null,
    sortItems: conf.reddit.sortBy
  });

  // init
  _loadSubreddit($stateParams);

  // ===================================================

  /**
   * Loads subreddit page.
   * @param params
   * @private
   */
  function _loadSubreddit(params) {
    if(!params.subreddit) {
      return $state.go('app.404');
    }

    Reddit.subreddit(params)(_success, _error);
  }

  function _success(res) {
    $scope.$evalAsync(function() {
      $scope.items = res.data.children;
      $scope.before = res.data.before;
      $scope.after = res.data.after;
    });
  }

  function _error() {
    $scope.$evalAsync(function() {
      $scope.error = true;
    });
  }

};