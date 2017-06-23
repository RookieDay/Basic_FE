
["1", "2", "3"].map(parseInt); //[1,NaN,NaN]

// 解析
// parseInt(string, radix)
// 参数	                         描述
// string	                       必需。要被解析的字符串。

// radix 	                       可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

//                                 如果省略该参数或其值为 ‘0‘，则数字将以 10 为基础来解析。如果它以 ‘”0x”‘ 或 ‘”0X”‘ 开头，将以 16 为基数。

//                                 如果该参数小于 2 或者大于 36，则 ‘parseInt()‘ 将返回 ‘NaN‘。

// map使用 -- array1.map(callbackfn[, thisArg])
// 回调函数的语法如下所示：
// function callbackfn(value, index, array1)

// 使用thisArg
// 定义一个对象 object，保护 divisor 属性和 remainder 方法
// remainder 函数求每个传入的值的个位数。（即除以 10 取余数）
// var obj = { 
//     divisor: 10, 
//     remainder: function (value) { 
//         return value % this.divisor; 
//     } 
// } 

// 定义一个包含 4 个元素的数组
// var numbers = [6, 12, 25, 30]; 

// 对 numbers 数组的每个元素调用 obj 对象的 remainder 函数。
// map 函数的第 2 个参数传入 ogj。 
// var result = numbers.map(obj.remainder, obj); 
// document.write(result); 

// 输出: 
// 6,2,5,0


// parseInt 需要 2 个参数 (val radix)， 而 map 传递了 3 个参数 (element, index, array)
// 如果想让 parseInt(string, radix) 返回 NaN，有两种情况：
// 第一个参数不能转换成数字。
// 第二个参数不在 2 到 36 之间。

var parseInts = function(str,radix){
    return str + ' - ' + radix;
};

["1", "2", "3","4"].map(parseInts);

var parseIntss = function(str,radix,obj){
    return str + ' - ' + radix + ' - ' + obj;
};

["1", "2", "3","4"].map(parseIntss);




[typeof null, null instanceof Object]  // ["object", false]

[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]  //an error Per spec: reduce on an empty array without an initial value throws TypeError

let sum = [0,1,2,3,4].reduce(function(prev,curr,index,arr){
    console.log(prev + ' - ' + curr + ' - ' + index + ' - ' + arr);
    return prev + curr;
},0);

console.log(sum);


let list1 = [[0, 1], [2, 3], [4, 5]];

let list2 = [0, [1, [2, [3, [4, [5, [6]]]]]]];

const flatten = (arr) =>{
    return arr.reduce((prev,curr)=>{
        return prev.concat(Array.isArray(curr) ? flatten(curr):curr);
    },[]
   );
}

flatten(list1);
flatten(list2);

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
}, []);

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countNames = names.reduce((allNames,name)=>{
    if(name in allNames){
        allNames[name]++;
    } else {
        allNames[name] = 1;
    }
    return allNames;
},{})
// countedNames is { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }


var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');    // + 的优先级 大于 ?  


var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count); //it goes into an infinite loop, 2^53 is the highest possible number in javascript, and 2^53+1 gives 2^53, so i can never become larger than that.

var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});  //Array.prototype.filter is not invoked for the missing elements.

