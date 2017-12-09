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


/*
let token2 = '';
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
*/