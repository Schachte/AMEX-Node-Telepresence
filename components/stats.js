var waterfall = require('async-waterfall');
var schemas = require('../schemas');
var mongoose = require('mongoose');
var statData = schemas.statData;

//Emit the DB changes to the socket connection on the client-side
exports.statUpdates = function statUpdates(io) {
  var jsonData = pullStatData(function(data){
    io.emit('statistics', data[0]);
  });
};

//Get the statistics from DB, then callback to the emit socket
function pullStatData(emitData) {
  waterfall([
    function(callback){
      mongoose.model('statData').find(function(err, serverDbData) {
        callback(null, serverDbData, 'done');
      })
    },
  ], function (err, statJSONData, result) {
    emitData(statJSONData);
  });
};
