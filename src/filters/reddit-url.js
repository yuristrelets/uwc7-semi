exports.inject = function(app) {
  app.filter('redditUrl', exports.factory);
};

exports.factory = function() {
  console.log(arguments);

  return 'asdasdsd';
};
