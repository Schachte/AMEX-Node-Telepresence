
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

//Handle retrieving chat messages from database
app.controller('chatMessages', function($scope, $http) {
     getChatData();

     function getChatData() {

       //GET request to the server backend
       $http.get('/getChats').success(function(res) {
         //Get JSON response from server of live DB statistics
         $scope.chats = res;
       });
      //  setTimeout(getChatData, 10000);
   }
});
