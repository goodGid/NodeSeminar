const jwt = require('jsonwebtoken');
const secret = "1JL804uytDF(*&$YhJKEF)981ypfu:DJjl1";

let option = {
  algorithm: 'HS256',
  expiresIn: 120
};

let payload = {
  key1: "test",
  key2: 123
};


jwt.sign(payload, secret, option, (err, token) => {
	if(err) console.log(err);
	else console.log(token);
});



let token2 = 'eyJ1c2VyX2lkIjoiMSIsInVzZXJfbmlja25hbWUiOlt7Im5pY2tuYW1lIjoiMyJ9XSwiaWF0IjoxNTEyOTY3NzM5LCJleHAiOjE1MTU1NTk3Mzl9.-WW-rJw68PGBa_cNU7d5qGROe5ociSc3IIXQ3J7SSp0';
jwt.verify(token2, secret, (err, data) => {
  if (err){
  	if(err.message === 'jwt expired') console.log('expired token');
      else if(err.message === 'invalid token') console.log('invalid token');
  }
  else {
    console.log(data);
    console.log(data.key1);
    console.log(data.key2);
  }
});



router.get('/:string', function(req, res){
        let secret = req.app.get('jwt-secret');
        let option = {
            alogorithm : 'HS512',
            expiresIn : 3600 * 24 * 1 // 토근 유효기간이 10일
        };
    
        let payload = {
            key1 = "key1"
        };
    
        let token = jwt.sign(payload,secret,option);
    });



    