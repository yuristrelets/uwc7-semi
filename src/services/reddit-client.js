exports.inject = function(app) {
  app.factory('Reddit', exports.factory);
};

exports.factory = function(conf) {

  /**
   * Load subreddit page.
   * @param params
   * @returns {Function}
   * @private
   */
  function _subreddit(params) {
    if(-1 === conf.reddit.sortBy.indexOf(params.sort)) {
      params.sort = conf.reddit.sortBy[0];
    }

    var request = reddit[params.sort](params.subreddit);
    request.limit(conf.reddit.perPage);

    angular.forEach(params, function(value, key) {
      if(value && request[key]) {
        request[key](value);
      }
    });

    return request.fetch;
  }

  /**
   * Load comments page.
   * @param subreddit
   * @param id
   * @returns {Function}
   * @private
   */
  function _comments(subreddit, id) {
    return reddit.comments(id, subreddit).fetch;
  }


  /**
   * Export
   */

  return {
    subreddit: _subreddit,
    comments: _comments
  }

};