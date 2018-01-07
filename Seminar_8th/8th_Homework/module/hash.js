/*
 Default module
*/
const crypto = require('crypto');
const async = require('async');

/*
 Custom module
*/
const hashKey = require('../config/hashKey').key;

module.exports = {

    // Encoding
    encoding : async (...args) => {        
        let data1 = args[0];
        await crypto.pbkdf2(data1, hashKey.toString('base64'), 100000, 64, 'sha512', function(err, hashed){ 
            return hashed.toString('base64');     
        });   
    },
    /*
    // Encoding2
    encoding2 : function(password){        
        crypto.pbkdf2(password, hashKey.toString('base64'), 100000, 64, 'sha512', function(err, hashed){ 
            console.log('hashed : ' + hashed);
            return hashed.toString('base64');     
        });   
    },
    */
    // Decoding
    decoding : function(password) {
        var decipher = crypto.createDecipher('aes192', hashKey);
        var decoded_result = decipher.update(password, 'base64', 'utf-8');
        decoded_result += decipher.final('utf-8');
        return decoded_result;
    }
};
