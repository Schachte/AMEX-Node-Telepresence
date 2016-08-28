var waterfall = require('async-waterfall');
var schemas = require('../schemas');
var mongoose = require('mongoose');
var chatData = schemas.chatData;


exports.storeChatData = function(req, res) {

  var chatMsg = new chatData({ timestamp: req.body.timestamp,message: req.body.chat, name: req.body.name});

  chatMsg.save(function(err) {
    if (!err) {
      console.log("Data saved into the database successfully!");
    } else {
      console.log(!err);
    }
  });
};
