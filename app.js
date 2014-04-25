'use strict';

var app = angular.module('app', [ 'ngResource', 'ui.router', 'ui.bootstrap', 'angularMoment', 'ngGrid']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to home state
    $urlRouterProvider.otherwise("/ad");

    // setup the states
    $stateProvider
//        .state('home', {
//            url: "/",
//            templateUrl: "components/home/home.html",
//            controller: 'HomeCtrl'
//        })
        .state('ad', {
            url: "/ad",
            templateUrl: "components/ad/ad.html",
            controller: 'ADCtrl'
        })
        .state('email', {
            url: "/email",
            templateUrl: "components/email/email.html",
            controller: 'EmailCtrl'
        })
        .state('pharos', {
            url: "/pharos",
            templateUrl: "components/pharos/pharos.html",
            controller: 'PharosCtrl'
        });

});

app.run(function ($rootScope, $location) {
    //by default ui-router removes any query string params, since I would like the current selected user
    //to part of the url, we have to disable this functionally
    var locationSearch = null;
    $rootScope.$on('$stateChangeStart',  function (event, toState, toParams, fromState, fromParams) {
        //save location.search so we can add it back after transition is done
        if( $location.search() != null) {
            locationSearch = $location.search();
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //restore all query string parameters back to $location.search
        if( locationSearch != null)
            $location.search(locationSearch);
    });

    //Path to webapi, all resources will use this
    //$rootScope.api =  "http://localhost:42166/api/";
    //$rootScope.api =  "http://account.nku.edu/api/";
    $rootScope.api =  "/api/";
});

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('ago',  function () {

    return function (value) {


        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            // Milliseconds since the epoch
            value = new Date(parseInt(value, 10));
        }


        return moment(value).fromNow();
    };
});

/**
 * Created by towlesj on 4/24/2014.
 */
app.directive("dateTime", function ($compile, $modal) {
    return {
        restrict: "EA",
        scope: {
            datetime: "=dateTime"
        },
        replace: 'true',
        template: '<div ng-show="datetime"> ' +
            '{{ datetime | amDateFormat:"M/DD/YYYY h:mm:ss a"  }} - {{ datetime | ago }}' +
            '</div>'
    };
})

