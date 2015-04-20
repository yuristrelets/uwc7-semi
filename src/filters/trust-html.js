exports.inject = function(app) {
  app.filter('trustHtml', exports.factory);
};

exports.factory = function($sce) {
  return function(text) {
    var html = angular.element('<textarea/>').html(text);

    return $sce.trustAsHtml(html.val());
  }
};
