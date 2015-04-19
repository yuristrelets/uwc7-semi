exports.inject = function(app) {
  app.directive('listItem', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      item: '=',
      noLink: '='
    },
    template: require('./index.html'),
    controller: _controller
  }
};

function _controller($scope) {
  angular.extend($scope, {

  });

  // ================================================

}
