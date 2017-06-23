var querystring = require('querystring');
var str = 'nick=ana&age=24';
var obj = querystring.parse(str);
console.log(" 1.. " + JSON.stringify(obj));
console.log(" 2.. " + JSON.stringify(obj,null,4));
console.log('-----------------');


var str1 = 'nick=ana&age=24&extra=name-ana|country-zh';
var obj1 = querystring.parse(str1);
var obj2 = querystring.parse(obj1.extra, '|', '-');
console.log(' 1.. ' + JSON.stringify(obj2));
console.log(' 2.. ' + JSON.stringify(obj2, null, 4));


//  1.. {"nick":"ana","age":"24"}
//  2.. {
//     "nick": "ana",
//     "age": "24"
// }
// -----------------
//  1.. {"name":"ana","country":"zh"}
//  2.. {
//     "name": "ana",
//     "country": "zh"
// }


var obj3 = {
    "nick": "casper",
    "age": "24"
};
var str3 = querystring.stringify(obj3);
console.log(' 1.. ' + str3);
console.log('-----------------');


var obj4 = {
    "name": "chyingp",
    "country": "cn"
};
var str4 = querystring.stringify(obj4, '|', '-');
console.log(' 1.. ' + str4);
//  1.. nick=casper&age=24
// -----------------
//  1.. name-chyingp|country-cn
