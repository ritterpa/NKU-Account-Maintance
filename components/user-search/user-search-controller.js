
app.controller('UserSearchCtrl', ['$scope', '$rootScope', 'User', function ($scope, $rootScope, User) {

    $scope.user = null;
    $scope.userText = {
        Normal: '',
        Strict: ''
    };

    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.user = user;
        $scope.userText.Normal = user.Name;
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

    $scope.SetUser = function()
    {
        return User.get({ username: $scope.userText.Strict }).$promise.then(function (data) {
            console.log('set user ' + $scope.userText.Strict);
            User.SetCurrentUser(data);
        }, function () {
            console.log('No user ' + $scope.userText.Strict + ' found.');
        });
    };

}]);