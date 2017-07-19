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


