app.controller('EmailOnsiteCtrl', ['$scope', '$rootScope', 'User', 'ExchangeUser', function ($scope, $rootScope, User, ExchangeUser) {
    $scope.status = 'none';

    $scope.user = null;
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });
    $scope.SetUser = function (username) {
        $scope.user = null;
        $scope.status = 'loading';
        ExchangeUser.getonsite({ username: username }).$promise.then(function (user) {
            $scope.status = 'loaded';
            $scope.user = user;
            $scope.SetProgressBar();
        }, function() {
            $scope.status = 'none';
        });
    };
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }

    //set progress par
    $scope.SetProgressBar = function() {

        if( $scope.user.StorageLimitStatus == "NoChecking" )
        {
            $scope.hasQuota = false;
            return;
        }
        else
            $scope.hasQuota = true;

        function Parse(size) {
            var regMatch = /[0-9,]+(?= bytes[)])/g
            var regReplace = /,/g

            var value = size.match(regMatch);
            value = value[0].replace(regReplace,'');
            return value;
        }


        var value = Parse($scope.user.TotalItemSize)
        var warning = Parse($scope.user.DatabaseIssueWarningQuota)
        var send = Parse($scope.user.DatabaseProhibitSendQuota)
        var receive = Parse($scope.user.DatabaseProhibitSendReceiveQuota)

        value /= receive;
        warning /= receive;
        send /=receive;
        receive = 1;

        var type;
        var message;
        if (value < warning) {
            type = 'success';
            message = "";
        } else if (value < send) {
            type = 'info';
            message = "over warning limit";
        } else if (value < receive) {
            type = 'warning';
            message = "over send limit";
        } else {
            message = "over receive limit";
            type = 'danger';
        }

        $scope.message = message;
        $scope.showWarning = (type === 'info' || type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
    };

}]);