var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var waterfall = require('async-waterfall');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Remote digital ocean mongo database IP
mongoose.connect('mongodb://162.243.129.147/stat');

//Create a schema
var Schema = mongoose.Schema;

//Establish the format that the data is saved in the remote server
var robotStatisticsSchema = new Schema({
  active: String,
  inactive: String,
  appointments: String,
  locations: String
}, {collection: 'stat'});

var chatSchema = new Schema({
  timestamp: String,
  message: String,
  name: String,
}, {collection: 'chat'});

//Assign the schema
var statData = mongoose.model('statData', robotStatisticsSchema);
var chatData = mongoose.model('chatData', chatSchema);

/*
  Grabs the updated statistics for the robots
  - Online
  - Offline
  - Appointments
  - Number of supported locations
*/
app.get('/getStats', function(req, res) {
  waterfall([
    function(callback){

      //Pull the data from remote mongo server
      mongoose.model('statData').find(function(err, serverDbData) {
        statData = serverDbData;
        callback(null, statData, 'done');
      })
    },
  ], function (err, statJSONData, result) {

    //Send the queries JSON from DB back to Angular controller
    res.json(statJSONData);
  });
});

/*
 Stores chat data from front-end form to DB
*/
app.post('/storeMessage', function(req, res) {

  console.log(req.body.chat);
  var chatMsg = new chatData({ timestamp: req.body.timestamp, message: req.body.chat, name: req.body.name});
  chatMsg.save(function(err) {
    if (err) {
      console.log("We have a problem")
    } else {
      console.log("Data saved into the database successfully!");
    }
  })

});

//Start the server
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
