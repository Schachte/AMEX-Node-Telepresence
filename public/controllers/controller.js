// Load the statistics for robot info on index
angular.module('myApp', [])
   .controller('mainStatistics', function($scope, $http) {

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


       })

       setTimeout(getStatData, 10000);
   }
});
