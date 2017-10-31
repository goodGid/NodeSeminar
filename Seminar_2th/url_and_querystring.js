const url = require('url');
const querystring = require('querystring');

let urlPath = 'https://www.google.co.kr/search?a=b&c=d&e=f';
let urlParsed = url.parse(urlPath);
let queryParsed = querystring.parse(urlParsed.query);

console.log(urlParsed);
console.log("======================================================================");
console.log(urlParsed.path);
console.log("======================================================================");
console.log(queryParsed);
console.log();