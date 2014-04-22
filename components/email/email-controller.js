app.controller('EmailCtrl', ['$scope', '$rootScope', 'User', 'ExchangeUser', function ($scope, $rootScope, User, ExchangeUser) {

    $scope.user = User.CurrentUser;
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });
    $scope.SetUser = function (username) {
        ExchangeUser.get({ username: username }).$promise.then(function (user) {
            $scope.user = user;
        })
    }
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }
}]);