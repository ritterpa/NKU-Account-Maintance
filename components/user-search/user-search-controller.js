
app.controller('UserSearchCtrl', ['$scope', '$rootScope', 'User', function ($scope, $rootScope, User) {

    $scope.user = null;
    $scope.userText = null;

    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.user = user;
        $scope.userText = user.Name;
    });

    $scope.SelectUser = function (item, model, label) {
        User.SetCurrentUser(item);
    }

    //used by ui-autocomplete
    $scope.GetUsers = function (term) {
        return User.query({ term: term }).$promise.then(function (users) {
            $scope.users = users;
            return users;
        });
    }

}]);