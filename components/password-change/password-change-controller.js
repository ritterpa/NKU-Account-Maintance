app.controller('PasswordChangeCtrl', function ($scope, $modalInstance, ADUser, username) {

    $scope.username = username;
    $scope.result = null;

    $scope.change = function(password) {
           ADUser.password({username: $scope.username, password: password}).$promise.then( function(obj){
               console.log(obj)
               $scope.result = obj;
           }, function(obj){
               console.log(obj)
               $scope.result = obj;
           });
    };


    $scope.ok = function () {

        $modalInstance.close();
//        $modalInstance.close($scope.selected.item);

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});