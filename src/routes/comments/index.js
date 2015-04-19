module.exports = function($scope, $window, $stateParams) {
  angular.extend($scope, {
    item: null,
    comments: null,

    // methods
    back: _back,
    reload: _reload
  });

  console.log('hello!');
  console.log($stateParams);

  _load();

  // ========================================

  function _load() {
    reddit
      .comments($stateParams.id, $stateParams.subreddit)
      .fetch(
        function(res) {
          console.log(res);

          $scope.$evalAsync(function() {
            $scope.item = res[0].data.children[0].data;
            $scope.comments = res[1].data;

            console.log($scope);
          });
        },
        function(err) {
          console.log(err);
        }
      );
  }

  function _back() {
    $window.history.back();
  }

  function _reload() {
    $window.location.reload();
  }

};