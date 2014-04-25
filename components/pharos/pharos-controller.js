app.controller('PharosCtrl', ['$scope', '$rootScope', 'User', 'PharosUser', function ($scope, $rootScope, User, PharosUser) {
    $scope.user = null;
    $scope.status = 'none';

    //setup callback if user changes
    $rootScope.$on('CurrentUser', function (event, user) {
        $scope.SetUser(user.Name);
    });
    //setup funciton for getting pharos info
    $scope.SetUser = function (username) {
        $scope.user = null;
        $scope.status = 'loading';

        PharosUser.get({ username: username }).$promise.then(function (user) {
            $scope.status = 'loaded';
            $scope.user = user;
        }, function() {
            $scope.status = 'none';
        });
    }
    //setup the first time
    if (User.CurrentUser != null) {
        $scope.SetUser(User.CurrentUser.Name);
    }

    var hoverTemplate = '<div class="ngCellText" ng-class="col.colIndex()" title="{{row.getProperty(col.field)}}"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
    $scope.gridOptionsTrans = {
        data: 'user.Transactions',
        columnDefs: [

            { field: 'Printer' },
            { field: 'PharosCharge', displayName: 'Pharos Charge' },
            { field: 'CBoardCharge', displayName: 'CBoard Charge' },
            { field: 'When',
                sortFn: function (a, b) {
                    a = new Date(a);
                    b = new Date(b);
                    return a>b ? -1 : a<b ? 1 : 0;
                }
            }
        ],
        filterOptions: { filterText: $scope.filter, useExternalFilter: false },
        enableColumnResize: true,
        showFilter: true,
        enableRowReordering: true,
        multiSelect: false,
        sortInfo: {
            fields: ['When'], directions: ['asc']
        },
        plugins: [new ngGridFlexibleHeightPlugin()]
    };

    $scope.gridOptionsAlerts = {
        data: 'user.Alerts',
        columnDefs: [

            { field: 'Server' },
            { field: 'Item',
                cellTemplate: hoverTemplate
            },
            { field: 'Message',
              cellTemplate: hoverTemplate
            },
            { field: 'When',
                sortFn: function (a, b) {
                    a = new Date(a);
                    b = new Date(b);
                    return a>b ? -1 : a<b ? 1 : 0;
                }
            }
        ],
        filterOptions: { filterText: $scope.filter, useExternalFilter: false },
        enableColumnResize: true,
        showFilter: true,
        enableRowReordering: true,
        multiSelect: false,
        sortInfo: {
            fields: ['When'], directions: ['asc']
        },
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
}]);
