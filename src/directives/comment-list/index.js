exports.inject = function(app) {
  app.directive('commentsList', exports.factory);
};

exports.factory = function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '='
    },
    template: require('./index.html'),
    compile: function(element, attrs, transclude) {
      var contents = element.contents().remove();
      var compiledContents;

      return function(scope, el) {
        if(!compiledContents) {
          compiledContents = $compile(contents, transclude);
        }

        compiledContents(scope, function(clone) {
          el.append(clone);
        });
      };
    }
  }
};
