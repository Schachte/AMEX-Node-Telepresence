/**********************************
NPM packages (SEE package.json)
***********************************/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var waterfall = require('async-waterfall');
var schemas = require('./schemas');
var http = require('http'),
    fs = require('fs')

/**********************************
External File Dependencies
***********************************/
var routes_stats = require('./components/stats');
var routes_chat = require('./components/chat');
var routes_location = require('./components/location');

/**********************************
Server Setup
***********************************/
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

/**********************************
App usages
***********************************/
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**********************************
REST API Endpoints
***********************************/
//Grabs the updated statistics for the robots
app.get('/getStats', routes_stats.statistics);

//Grabs the updated statistics for the robots
app.get('/getRobotLocation', routes_location.locationData);

//Stores chat data from front-end form to DB
app.post('/storeMessage', routes_chat.storeChatData);

/**********************************
Run the Server
***********************************/
http.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});
