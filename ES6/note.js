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

class Point {}
Point.name // "Point"

class CustomElement {
    constructor(element){
        this.element = element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(
    CustomElement.prototype,'html'
);

'get' in descriptor   //true
'set' in descriptor   //true

// 存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。

// 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数

class Foo{
    constructor(...args){
        this.args = args;
    }
    *[Symbol.iterator](){
        for(let arg of this.args){
            yield arg;
        }
    }
}

for(let x of new Foo('hello','world')){
    console.log(x);
}
// hello
// world


// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function

// 父类的静态方法，可以被子类继承
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'

// 静态方法也是可以从super对象上调用的。
class Foo{
    static ana(){
        return 'hello';
    }
}
class Bar extends Foo{
    static ana(){
        return super.ana() + 'hah';
    }
}
Bar.ana();


// new是从构造函数生成实例的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

class Person{
    constructor(x,y){
        console.log(new.target === Person);
        this.x = x;
        this.y = y;
    }
}
var p = new Person(3,4);  //true

// 子类继承父类时，new.target会返回子类
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false


// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
class Shape{
    constructor(){
        if(new.target === Shape){
            throw new Error('此类不能实例化')
        }
    }
}
class Rectangle extends Shape{
    constructor(x,y){
        super();
    }
}
var x = new Shape();     //报错
var y = new Rectangle(2,3); // 



// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class ColoPoint extends Point{
    constructor(x,y,color){
        this.color = color; //错误
        super(x,y);
        this.color = color;
    }
}

// Object.getPrototypeOf方法可以用来从子类上获取父类 可以使用这个方法判断，一个类是否继承了另一个类。
Object.getPrototypeOf(ColorPoint) === Point


class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true

// 子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性
// 作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。

// module
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
// 上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
// function和class的输出，也必须遵守这样的写法。
// 报错
function fx() {}
// export fx;

// 正确
export function f() {};

// 正确
function f() {}
export {f};


//语法
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
// 第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。
// export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

// get方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦截读取操作的例子。

var person = {
    name:'ana'
}
var prox = new Proxy(person,{
    get:function(target,property){
        if(property in target){
            return target[property];
        } else {
            throw new ReferenceError('error');
        }
    }
})

prox.name;
prox.aa; //上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。


// set方法用来拦截某个属性的赋值操作。

let vail = {
    set:function(obj,prop,value){
        if(prop === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError('wrong');
            } 
            if(value > 200){
                throw new RangeError('range error');
            }
        }
        obj[prop] = value; 
    }
}

let p = new Proxy({},vail);
p.age = 100;
p.age //100
p.age = 'ana' //wrong
p.age = 300; //wrong


// 我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。

var handler = {
    get (target,key){
        invr(key,'get');
        return target[key];
    },
    set (target,key,value){
        invr(key,'set');
        target[key] = value;
        return true;
    }
}
function invr(key,action){
    if(key[0] === '_'){
        throw new Error('wrong');
    }
}
var target = {};
var p = new Proxy(target,handler);
p.__prs //wrong
p._poo = 's' ;//wrong


// apply方法拦截函数的调用、call和apply操作。
// apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"


let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99
// 上面代码中，has拦截只对in循环生效，对for...in循环不生效，导致不符合要求的属性没有被排除在for...in循环之外。


// construct方法用于拦截new命令
var p = new Proxy(function (){},{
    construct:function(target,args){
        console.log('called:' + args.join(','));
        return {value:args[0] * 10};
    }
})
(new p(1)).value;
// construct方法返回的必须是一个对象，否则会报错。

// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
    deleteProperty (target,key){
        inv(key,'delete');
        return true;
    }
}

function inv(key,action){
    if(key[0] === '_'){
        throw new Error('error');
    }
}
var pro = new Proxy({_pro:'foo'},handler);
delete pro._pro;

// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。

var myObj = {
    foo:1,
    bar:2,
    get baz(){
        return this.foo + this.bar;
    }
}
var my = {
    foo:3,
    bar:6
}
Reflect.get(myObj,'baz',my) ;//9

// Reflect.has方法对应name in obj里面的in运算符
var m = {
    foo:1
}
//旧写法
'foo' in m
//now
Reflect.has(m,'foo');

// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);


Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。

// 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
const ags = [11,3,12,3,11,4];
//旧的
const youngest = Math.min.apply(Math,ags);
const old = Math.max.apply(Math,ags);
const tye = Object.prototype.toString.call(youngest);


// 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
let s = Symbol();

let obj = {
//   [s]: function (arg) { ... }
};

obj[s](123);
// 如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。
// 增强的对象写法，上面代码的obj对象可以写得更简洁一些
let obj = {
    // [s](arg){...}
}

const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}

// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。
// Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

// 消除魔术字符串
function getArea(shape,options){
    var area = 0;
    switch(shape){
        case 'Tri': //魔术字符串
        area = .5 * options.width * options.height;
        break;
        //...
    }
    return area;
}
getArea('Tri',{width:100,height:100});

// 字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护
var shapeType = {
    tri:'tri'
}
function getArea(shape,options){
    var area = 0;
    switch(shape){
        case shapeType.tri: //魔术字符串
        area = .5 * options.width * options.height;
        break;
        //...
    }
    return area;
}
getArea(shapeType.tri,{width:100,height:100});

// 我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。
// 如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

const shapeType = {
  triangle: Symbol()
};


// Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]


// Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30次，会返回30个不同的Symbol值
// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
// 上面代码中，变量s2属于未登记的Symbol值，所以返回undefined。

// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

