
//Global app variable to represent the application
var app = angular.module('myApp', []);

//Handle form requests for persisting chat data
app.controller('formCtrl', function($scope, $http) {
  $scope.sendChat = function() {
      var user_text = {
        chat: $(".widther").val(),
        timestamp: Date.now(),
        name: "TEMP_NAME"
      }
      console.log("Send chat called succcessfully!");

      $http.post('/storeMessage', user_text).success(function(res) {
        console.log("Called backend function successfully!");
      });
  };
});
