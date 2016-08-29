/**
 * Created by Spencer Smith on 8/27/2016.
 */

var app = angular.module('myApp');

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/robots', {
            templateUrl: 'robotPage.html'
        })
        .when('/', {
            templateUrl:'mainPage.html',
            controller: 'mainStatistics'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);