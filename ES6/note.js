var node = {
    loc:{
        start:{
            line:1,
            column:5
        }
    }
};

var {loc,loc:{start},loc:{start:{line}}} = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
// 上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。

// 变量的结构赋值
// 1. 变量值的交换
let x = 1;
let y = 2;
[x,y] = [y,x];

//2.从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
//返回一个数组
function example(){
    return [1,2,3];
}
let [a,b,c] = example();
//返回一个对象
function example(){
    return {
        foo:1,
        bar:2
    }
}
let {foo,bar} = example();

// 3.函数参数的定义
// 解构赋值可以方便地将一组参数与变量名对应起来。
// 参数是一组有次序的值
// function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
// function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

// 4.提取JSON数据
let jsonData = {
    id:42,
    status:'ok',
    data:[9,2]
}
let { id, status, data: number } = jsonData;

console.log(id, status, number);

// 5.函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
// 6.遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}

// 7.输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");

// 模板字符串甚至还能嵌套
const tmpl = addrs =>`
    <table>
    ${addrs.map(addr=>`
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
    `).join('')}
    </table>
`;

tmpl([{first:'1',last:'2'},{first:'a',last:'b'}]);


// 正则表达式 专栏  https://zhuanlan.zhihu.com/p/27338649
// ES6 class

// class Point{
//     constructor(){
//         // ..
//     }
// }
// Object.assign(Point.prototype,{
//     toString(){},
//     toValue(){}
// });
// Object.keys(Point.prototype)
// []
// Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

// 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

// 采用 Class 表达式，可以写出立即执行的 Class
let person = new class {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}('ana');
person.sayName();

// person是一个立即执行的类的实例
