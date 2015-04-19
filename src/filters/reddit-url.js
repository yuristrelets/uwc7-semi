exports.inject = function(app) {
  app.filter('redditUrl', exports.factory);
};

exports.factory = function() {
  return function(url) {
    if('/' === url.charAt(0)) url = url.slice(1);

    return 'http://reddit.com/' + url;
  }
};
