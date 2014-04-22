app.controller('ADCtrl', ['$scope', '$rootScope', 'User', 'ADUser', function ($scope, $rootScope, User, ADUser) {
    $scope.user = null;

    //setup funciton for getting ad info
    $scope.SetUser = function (username) {
        ADUser.get({ username: username }).$promise.then(function (user) {
            $scope.user = user;
        })
    }
    //setup the first time
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }

    //setup callback if user changes
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });


    $scope.Unlock = function () {
        ADUser.unlock({ dn: $scope.user.DistinguishedName }).$promise.then(function () {
            console.log('user unlocked');
            $scope.SetUser($scope.user.samAccountName);
        });
    }
}]);