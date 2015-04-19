exports.inject = function(app) {
  app.directive('commentItem', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'E',
    scope: {
      comment: '='
    },
    template: require('./index.html')
  }
};
