app.controller('ADCtrl', ['$scope', '$rootScope', 'User', 'ADUser', function ($scope, $rootScope, User, ADUser) {
    $scope.status = 'none';
    $scope.user = null;

    //setup funciton for getting ad info
    $scope.SetUser = function (username) {
        $scope.user = null;
        $scope.status = 'loading';
        ADUser.get({ username: username }).$promise.then(function (user) {
            $scope.status = 'loaded';
            $scope.user = user;
        }, function() {
            $scope.status = 'none';
        });
    };

    //setup the first time
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }

    //setup callback if user changes
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });


    $scope.unlock = function () {
        ADUser.unlock({ username: $scope.user.samAccountName }).$promise.then(function () {
            $scope.SetUser($scope.user.samAccountName);
        }, function() {
            console.log('user unlocked errored');
            $scope.SetUser($scope.user.samAccountName);
        });
    }

}]);