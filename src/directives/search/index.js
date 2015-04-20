exports.inject = function(app) {
  app.directive('search', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: true,
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope, $state) {
  angular.extend($scope, {
    search: null,

    // methods
    submit: _submit
  });

  // ================================================

  /**
   * Form submit handler.
   * @private
   */
  function _submit() {
    if($scope.search) {
      $state.go('app.list', { subreddit: $scope.search });
      $scope.search = null;
    }
  }

}
