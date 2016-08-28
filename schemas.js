//Remote digital ocean mongo database IP
var mongoose = require('mongoose');
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


var robotLocationSchema = new Schema({
  lat: Number,
  long: Number,
  name: String

}, {collection: 'location'});

//Assign the schema
exports.statData = mongoose.model('statData', robotStatisticsSchema);
exports.chatData = mongoose.model('chatData', chatSchema);
exports.locationData = mongoose.model('locationData', robotLocationSchema);
