var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var waterfall = require('async-waterfall');
var schemas = require('./schemas');

var routes_stats = require('./components/stats');
var routes_chat = require('./components/chat');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var statData = schemas.statData;
var chatData = schemas.chatData;

//Grabs the updated statistics for the robots
app.get('/getStats', routes_stats.statistics);

//Stores chat data from front-end form to DB
app.post('/storeMessage', routes_chat.storeChatData);

//Start the server
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
