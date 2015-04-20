exports.inject = function(app) {
  app.directive('pagination', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: {
      before: '=',
      after: '='
    },
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope, conf, $state, $stateParams) {
  angular.extend($scope, {
    // methods
    prev: _prev,
    next: _next
  });

  var _state = $stateParams;

  // ================================================

  /**
   * Go to next page.
   * @private
   */
  function _next() {
    _redirect({
      before: null,
      after: $scope.after,
      count: (_state.before ? _state.count - 1 : _state.count + conf.reddit.perPage)
    });
  }

  /**
   * Go to previous page.
   * @private
   */
  function _prev() {
    _redirect({
      after: null,
      before: $scope.before,
      count: (_state.after ? _state.count + 1 : _state.count - conf.reddit.perPage)
    });
  }

  /**
   * Performs redirect.
   * @param params
   * @private
   */
  function _redirect(params) {
    angular.extend(_state, params);
    $state.go('app.list', _state);
  }
}
