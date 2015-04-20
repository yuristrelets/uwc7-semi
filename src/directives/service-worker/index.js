exports.inject = function(app) {
  app.directive('serviceWorker', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope, ServiceWorker) {
  angular.extend($scope, {
    active: ServiceWorker.active
  });
}
