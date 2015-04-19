exports.inject = function(app) {
  app.factory('Reddit', exports.factory);
};

exports.factory = function(conf) {

  function _subreddit(subreddit, sort, options) {
    if(!subreddit) {
      throw new Error('Invalid subreddit!');
    }

    if(-1 === conf.reddit.sortBy.indexOf(sort)) {
      throw new Error('Invalid sort type!');
    }

    var request = reddit[sort](subreddit);
    request.limit(conf.reddit.perPage);

    angular.forEach(options, function(value, key) {
      if(value && request[key]) {
        request[key](value);
      }
    });

    return request.fetch;
  }

  return {
    subreddit: _subreddit
  }
};