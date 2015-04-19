exports.inject = function(app) {
  app.directive('externalLinker', exports.factory);
};

exports.factory = function() {
  return {
    restrict: 'AE',
    link: function(scope, element) {
      element.on('click', function(e) {
        if('a' === e.target.tagName.toLowerCase()) {
          e.target.setAttribute('target', '_blank');
        }
      });
    }
  }
};
