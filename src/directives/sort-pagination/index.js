exports.inject = function(app) {
  app.directive('sortPagination', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope, $state, $stateParams) {
  angular.extend($scope, {
    current: $stateParams.sort,

    // methods
    redirect: _redirect
  });

  // ================================================

  /**
   * Performs redirect by sort type.
   * @param item
   * @private
   */
  function _redirect(item) {
    $state.go('app.list', {
      subreddit: $stateParams.subreddit,
      sort: item,
      before: null,
      after: null,
      count: null
    });
  }
}
