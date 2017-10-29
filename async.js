const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const async = require('async');

http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  let taskArray = [
    function(callback) {
      crypto.randomBytes(32, function(err, buffer) {
        if (err) callback(err, null);
        else callback(null, buffer.toString('base64'));
      });
    },
    function(salt, callback) {
      crypto.pbkdf2(beforeHashing, salt, 100000, 64, 'sha512', function(err, hashed) {
        if (err) callback(err, null);
        else callback(null, hashed.toString('base64'));
      });
    },
    function(afterHashing, callback) {
      fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
        if (err) callback(err, null);
        else callback(null);
      });
    },
    function(callback) {
      res.writeHead(201, {
        "Content-Type": "text/plain"
      });
      res.end("successful save hashed data");
      callback(null, "Successful save data!");
    }
  ];


  async.waterfall(taskArray, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}).listen(3000, function() {
  console.log("Server running on port 3000!");
});