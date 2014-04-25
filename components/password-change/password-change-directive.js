/**
 * Created by towlesj on 4/24/2014.
 */
app.directive("changePassword", function ($compile, $modal) {
    return {
        restrict: "A",
        scope: {
            username: "=username"
        },
        replace: 'true',
        template: '<button ng-click="open()">Change Password</button>',
        link: function($scope, element, attrs) {
            console.log("directive linking: " + $scope.username );

            $scope.open = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'components/password-change/password-change.html',
                    controller: 'PasswordChangeCtrl',
                    resolve: {
                        username: function () {
                            return $scope.username;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log('selected: ' + selectedItem);
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
        }
    };
})