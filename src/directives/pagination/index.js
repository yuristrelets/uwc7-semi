exports.inject = function(app) {
  app.directive('pagination', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    template: require('./index.html'),
    controllerAs: 'vm',
    controller: Controller,
    link: function(scope, element) {
      console.log('pagination', scope);
    }
  }
};

function Controller($scope, $state, $stateParams) {
  var vm = this;

  vm.before = null;
  vm.after = null;

  var len = $scope.items.length;

  if(len) {
    vm.before = $scope.items[0].data.name;
    vm.after = $scope.items[len - 1].data.name;
  }

  $scope.$watch('items', function(nv) {
    console.log('$watch', nv);
  });

  console.log('!!!!', this);

  vm.go = function(after) {
    $stateParams.after = after;
    $state.go('app.list', $stateParams);
  };


}