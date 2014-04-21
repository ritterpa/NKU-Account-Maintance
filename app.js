'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "components/home/home.html"
        })
        .state('test', {
            url: "/test",
            templateUrl: "components/test/test.html"
        })
        .state('restricted', {
            url: "/restricted",
            templateUrl: "components/authentication/restricted.html"
        });



});

app.run(function ($rootScope, $state, $stateParams) {
//    $rootScope.$state = $state;
//    $rootScope.$stateParams = $stateParams;
});