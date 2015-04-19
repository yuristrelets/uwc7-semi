exports.inject = function(app) {
  app.factory('Markdown', exports.factory);
};

exports.factory = function() {
  var markdown = require('markdown').markdown;

  return {
    makeHtml: function(value) {
      return markdown.toHTML(value);
    }
  };
};