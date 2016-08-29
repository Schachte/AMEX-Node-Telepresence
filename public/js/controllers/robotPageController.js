/**
 * Created by Spencer Smith on 8/28/2016.
 *
 * All things related to the robot page should be found here
 */

var app = angular.module('myApp');

app.controller('robotList', function($scope, $http) {
    $scope.message = "robot page reached";
});
