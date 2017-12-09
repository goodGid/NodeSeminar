/*
 Default module
*/ 
const express = require('express');
const router = express.Router();


/*
 Custom module
*/


/*
 Variable declaration 
*/

/*
 Function Sector
*/

/*
 Method : Get
*/

router.get('/:string', function(req, res){

    let secret = req.app.get('jwt-secret');
    let option = {
        alogorithm : 'HS512',
        expiresIn : 3600 * 24 * 1 // 토근 유효기간이 10일
    };

    let payload = {
        key1 = "key1",
        user_name = "user_name"
    };

    // let token = jwt.sign(payload,secret,option);

    let token;
    jwt.sign(payload, secret, option, (err, token) => {
	    if(err) console.log(err);
	    else {
            console.log(token);
            token = token;
        }
    });

});

    



/*
 Method : Post
*/

module.exports = router;
