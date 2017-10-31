const fs = require('fs');

/**
 * 
 * read는 
 * function(err, data){
 * err와 data가 있다.
 * 
 */

const readFile = function(){
	fs.readFile('./test.txt', 'utf-8', function(err, data){
		if(err){
			console.log("read file error : "+ err);
		} else{
			console.log("successful read file!");
			/**
			 * 
			 * 실제로는 res.write로 
			 * DB에 통신 !
			 * 
			 */
			console.log(data);
		}
	});
}

/**
 * 
 * Write는 
 * function(err){
 * err밖에 없다.
 * 
 */
const writeFile = function(){
	let data = 'write file!';
	fs.writeFile('./test.txt', data, 'utf-8', function(err){
		if(err){
			console.log("write file error : " + err);
		}	else{
			console.log("successful write file!");
		}
	});
}

readFile();
//writeFile();
