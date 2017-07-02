
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

var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
//Goodbye Jack


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



          
var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two]  
//[true,false] JavaScript does not have precision math, even though sometimes it works correctly.


function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));  //switch uses === internally and new String(x) !== x 
//在 switch 内部使用严格相等 === 进行判断，并且 new String("A") 返回的是一个对象，而 String("A") 则是直接返回字符串 "A"。


function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A')); //String(x) does not create an object but does return a string, i.e. typeof String(1) === "string"



function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane); //Infinity % 2 gives NaN, -9 % 2 gives -1 (modulo operator keeps sign so it's result is only reliable compared to 0)
// -9 % 2 = -1 以及 Infinity % 2 = NaN，求余运算符会保留符号，所以只有 isEven 的判断是可靠的。


parseInt(3, 8);
parseInt(3, 2);
parseInt(3, 0);

// A. 3, 3, 3
// B. 3, 3, NaN
// C. 3, NaN, NaN
// D. other  

// 实际结果是 3, NaN, 3 
parseInt("10");         // 返回 10 (默认十进制)
parseInt("19",10);      // 返回 19 (十进制: 10+9)  10 + 9*10^0
parseInt("11",2);       // 返回 3 (二进制: 2+1)    1*2^1 + 1*2^0
parseInt("17",8);       // 返回 15 (八进制: 8+7)
parseInt("1f",16);      // 返回 31 (十六进制: 16+15)


Array.isArray( Array.prototype )   //true 鲜为人知的事实：其实 Array.prototype 也是一个数组。



var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}
// == 相等中，如果有一个操作数是布尔类型，会先把他转成数字，所以比较变成了 [0] == 1；同时规范指出如果其他类型和数字比较，会尝试把这个类型转成数字再进行宽松比较，而对象（数组也是对象）会先调用它的 toString() 方法，此时 [0] 会变成 "0"，然后将字符串 "0" 转成数字 0，而 0 == 1 的结果显然是 false。


[]==[]  //false 这是两个不同的数组对象


'5' + 3  //'53'
'5' - 3  //2
// + 运算符中只要有一个是字符串，就会变成字符串拼接操作。你不知道的是，- 运算符要求两个操作数都是数字，如果不是，会强制转换成数字，所以结果就变成了 5 - 2 = 3


1 + - + + + - + 1  //2  
// 你只要知道 + 1 = 1和- 1 = -1，注意符号之间的空格。两个减号抵消，所以最终结果等效于 1 + 1 = 2。或者你也可以在符号之间插入 0 来理解，即 1 + 0 - 0 + 0 + 0 + 0 - 0 + 1，这样你就一目了然了

var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });  //["1", undefined x 2]
// map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
        

function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1) //The result is 21, in javascript variables are tied to the arguments object so changing the variables changes arguments and changing arguments changes the local variables even when they are not in the same scope.
// 在JavaScript中，参数变量和 arguments 是双向绑定的。改变参数变量，arguments 中的值会立即改变；而改变 arguments 中的值，参数变量也会对应改变。

var a = 111111111111111110000,
    b = 1111;
a + b;  //111111111111111110000  
// 这是IEEE 754规范的黑锅，不是JavaScript的问题。表示这么大的数占用过多位数，会丢失精度 Lack of precision for numbers in JavaScript affects both small and big numbers.



var x = [].reverse;
x(); //window
// reverse 方法颠倒数组中元素的位置，并返回该数组的引用。 而这里调用的时候没有制定数组，所以默认的 this 就是 window，所以最后结果返回的是 window
// [].reverse will return this and when invoked without an explicit receiver object it will default to the default this AKA window



Number.MIN_VALUE > 0 // true
// Number.MIN_VALUE is the smallest value bigger than zero, -Number.MAX_VALUE gets you a reference to something like the most negative number.

// MIN_VALUE属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。MIN_VALUE的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。因为 MIN_VALUE是 Number 的一个静态属性，因此应该直接使用： Number.MIN_VALUE，而不是作为一个创建的 Number实例的属性。


[1 < 2 < 3, 3 < 2 < 1] //[true,true]
// This is parsed as (1 > 2) > 3 and (3 > 2) > 1. Than it's implicit conversions at work: true gets intified and is 1, while false gets intified and becomes 0.
// <和>的优先级都是从左到右，所以 1 < 2 < 3 会先比较 1 < 2，这会得到 true，但是 < 要求比较的两边都是数字，所以会发生隐式强制转换，将 true 转换成 1，所以最后就变成了比较 1 < 3，结果显然为 true。同理可以分析后者。


// the most classic wtf
2 == [[[2]]]   // both objects get converted to strings and in both cases the resulting string is "2"
// 如果比较的两个值中有一个是数字类型，就会尝试将另外一个值强制转换成数字，再进行比较。而数组强制转换成数字的过程会先调用它的 toString方法转成字符串，然后再转成数字。所以 [2]会被转成 "2"，然后递归调用，最终 [[[2]]] 会被转成数字 2。


          
// 3.toString()
// 3..toString()
// 3...toString() 
// 3.x is a valid syntax to define "3" with a mantissa of x, toString is not a valid number, but the empty string is.

// 点运算符会被优先识别为数字常量的一部分，然后才是对象属性访问符。所以  3.toString() 实际上被JS引擎解析成 (3.)toString()，显然会出现语法错误。但是如果你这么写 (3).toString()，人为加上括号，这就是合法的。


(function(){
  var x = y = 1;
})();
console.log(y);
console.log(x);  //y is an automatic global, not a function local one.
// 在函数中没有用 var 声明变量 y，所以 y 会被自动创建在全局变量 window下面，所以在函数外面也可以访问得到。而 x 由于被 var 声明过，所以在函数外部是无法访问的。


          
var a = /123/,
    b = /123/;
a == b  //false 
a === b //false
// Per spec Two regular expression literals in a program evaluate to regular expression objects that never compare as === to each other even if the two literals' contents are identical.


var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b
a === b
a >   c
a <   c
// false false false true
// Arrays are compared lexicographically with > and <, but not with == and ===


var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b] //false true
// Functions have a prototype property but other objects don't so a.prototype is undefined. 
// Every Object instead has an internal property accessible via Object.getPrototypeOf
// 对象是没有 prototype 属性的，所以 a.prototype 是 undefined，但我们可以通过 Object.getPrototypeOf 方法来获取一个对象的原型。
// Object.getPrototypeOf(a)  就是获得对象的原型

// Object.getPrototypeOf() 方法返回指定对象的原型（即, 内部[[Prototype]]属性的值）。
let proto = {};
let obj = Object.create(proto); 
Object.getPrototypeOf(obj) === proto;
 // true 如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。


function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b  //false    
// f.prototype is the object that will become the parent of any objects created with new f while Object.getPrototypeOf returns the parent in the inheritance hierarchy.

function Person() {}
var p = new Person();

var a = p.__proto__;
var b = Object.getPrototypeOf(p);
var c = Person.prototype;
console.log(a === b, a === c, b === c);
// true, true, true

var d = Person.__proto__;
var e = Object.getPrototypeOf(Person);
var f1 = Function.prototype;
console.log(d === e, d === f1, e === f1);
// true, true, true
// 任何函数都是 Function 的实例，而p是函数 Person 的实例，Object.getPrototypeOf 会获取构造当前对象的原型。所以 Object.getPrototypeOf(p) === Person.prototype，而 Object.getPrototypeOf(Person) === Function.prototype



