app.controller('PharosCtrl', ['$scope', '$rootScope', 'User', 'PharosUser', function ($scope, $rootScope, User, PharosUser) {
    $scope.user = null; //
    //setup callback if user changes
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });
    //setup funciton for getting pharos info
    $scope.SetUser = function (username) {

        PharosUser.get({ username: username }).$promise.then(function (user) {
            $scope.user = user;
        })
    }
    //setup the first time
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }


}]);
