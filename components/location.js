var waterfall = require('async-waterfall');
var schemas = require('../schemas');
var mongoose = require('mongoose');
var locationData = schemas.locationData;

exports.locationData = function(req, res) {
  waterfall([
    function(callback){

      //Pull the data from remote mongo server
      mongoose.model('locationData').find(function(err, serverDbData) {
        callback(null, serverDbData, 'done');
      })
    },
  ], function (err, locationRobotData, result) {

    //Send the queried JSON from DB back to Angular controller
    res.json(locationRobotData);
  });
};
