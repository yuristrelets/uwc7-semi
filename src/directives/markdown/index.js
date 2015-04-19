exports.inject = function(app) {
  app.directive('markdown', exports.factory);
};

exports.factory = function($sanitize, Markdown) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      var html;

      if(attrs.markdown) {
        scope.$watch(attrs.markdown, function(newVal) {
          html = newVal ? $sanitize(Markdown.makeHtml(newVal)) : '';
          element.html(html);
        });

      } else {
        html = $sanitize(Markdown.makeHtml(element.text()));
        element.html(html);
      }
    }
  }
};
