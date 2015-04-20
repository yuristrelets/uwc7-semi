module.exports = function($scope, conf) {
  angular.extend($scope, {
    name: conf.name
  });
};