var waterfall = require('async-waterfall');
var schemas = require('../schemas');
var mongoose = require('mongoose');
var statData = schemas.statData;

exports.statistics = function(req, res) {
  waterfall([
    function(callback){

      //Pull the data from remote mongo server
      mongoose.model('statData').find(function(err, serverDbData) {
        callback(null, serverDbData, 'done');
      })
    },
  ], function (err, statJSONData, result) {

    //Send the queries JSON from DB back to Angular controller
    res.json(statJSONData);
  });
};
