exports.inject = function(app) {
  app.directive('pagination', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: {
      before: '=',
      after: '=',
      onChange: '&'
    },
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope, conf) {
  angular.extend($scope, {
    // methods
    prev: _prev,
    next: _next
  });

  var _state = {
    count: 0,
    before: null,
    after: null
  };

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

    $scope.onChange({ params: params });
  }
}
