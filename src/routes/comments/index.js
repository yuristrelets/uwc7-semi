module.exports = function($scope, $window, $stateParams, Reddit) {
  angular.extend($scope, {
    item: null,
    comments: null,
    error: false,

    // methods
    back: _back
  });

  _loadComments($stateParams);

  // ========================================

  /**
   * Loads
   * @param params
   * @private
   */
  function _loadComments(params) {
    if(!params.subreddit || !params.id) {
      return $state.go('app.404');
    }

    Reddit.comments(params.subreddit, params.id)(_success, _error);
  }

  function _success(res) {
    $scope.$evalAsync(function() {
      $scope.item = res[0].data.children[0].data;
      $scope.comments = res[1].data;
    });
  }

  function _error() {
    $scope.$evalAsync(function() {
      $scope.error = true;
    });
  }

  /**
   * Go back handler.
   * @private
   */
  function _back() {
    $window.history.back();
  }

};