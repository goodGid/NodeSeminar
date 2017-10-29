const fs = require('fs');
const json2csv = require('json2csv');

let field2 = ['title', 'singer'];
let music = [
	{
		"title" : "너를 찾아서",
		"singer" : "윤종신"
	},
	{
		"title" : "선물",
		"singer" : "멜로망스"
	},
	{
		"title" : "썸탈거야",
		"singer" : "볼빨간사춘기"
	}
];

let object = json2csv({
	data : music,
	fields : field2 // Line 4처럼 field2로 해도 됨 !
});
fs.writeFile('./music.csv', object, function(err){
	if(err){
		console.log("write csv error : "+ err);
	} else{
		console.log("successful write csv");
	}
})