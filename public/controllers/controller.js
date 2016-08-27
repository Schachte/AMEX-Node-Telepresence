
//Global app variable to represent the application
var app = angular.module('myApp', []);

app.controller('mainStatistics', function($scope, $http) {

     getStatData();

     function getStatData() {

       //GET request to the server backend
       $http.get('/getStats').success(function(res) {

         var stats = {
            active: res[0].active,
            inactive: res[0].inactive,
            appointments: res[0].appointments,
            location_count: res[0].locations
         }

         //Get JSON response from server of live DB statistics
         $scope.stats = stats;
       });
       setTimeout(getStatData, 10000);
   }
});

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
