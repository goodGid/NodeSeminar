const fs = require('fs');
const crypto = require('crypto');
const http = require('http');

http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  return new Promise((fulfill, reject) => {
      crypto.randomBytes(32, function(err, buffer) {
        if (err) reject(err);
        else fulfill(buffer.toString('base64'));
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(salt => {
      return new Promise((fulfill, reject) => {
        crypto.pbkdf2(beforeHashing, salt, 100000, 64, 'sha512', function(err, hashed) {
          if (err) reject(err, null);
          else fulfill(hashed.toString('base64'));
        });
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(afterHashing => {
      return new Promise((fulfill, reject) => {
        fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
          if (err) reject(err);
          else fulfill("Successful save data!");
        });
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(msg => {
      return new Promise((fulfill, reject) => {
        res.writeHead(201, {
          "Content-Type": "text/plain"
        });
        res.end("successful save hashed data");
        console.log(msg);
      });
    });

}).listen(3000, function() {
  console.log("Server running on port 3000!");
});