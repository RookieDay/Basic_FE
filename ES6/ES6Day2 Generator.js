// 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

// ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

// function * foo(x, y) { ··· }
// function *foo(x, y) { ··· }
// function* foo(x, y) { ··· }
// function*foo(x, y) { ··· }
// 由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。


// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);

// 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

// 另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
// 上面代码在一个普通函数中使用yield表达式，结果产生一个句法错误。
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

for (var fs of flat(arr)){
  console.log(fs);
}


// 上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式（这个函数里面还使用了yield*表达式，详细介绍见后文）。一种修改方法是改用for循环。


// var arr = [1, [[2, 3], 4], [5, 6]];

// var flat = function* (a) {
//   var length = a.length;
//   for (var i = 0; i < length; i++) {
//     var item = a[i];
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };

// for (var f of flat(arr)) {
//   console.log(f);
// }
// 1, 2, 3, 4, 5, 6


// 另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

// function* demo() {
//   console.log('Hello' + yield); // SyntaxError
//   console.log('Hello' + yield 123); // SyntaxError

//   console.log('Hello' + (yield)); // OK
//   console.log('Hello' + (yield 123)); // OK
// }
// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

// function* demo() {
//   foo(yield 'a', yield 'b'); // OK
//   let input = yield; // OK
// }


// 与 Iterator 接口的关系
// 上一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

// 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

// var myIterable = {};
// myIterable[Symbol.iterator] = function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// };

// [...myIterable] // [1, 2, 3]
// 上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。

// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

// function* gen(){
//   // some code
// }

// var g = gen();

// g[Symbol.iterator]() === g
// // true
// 上面代码中，gen是一个 Generator 函数，调用它会生成一个遍历器对象g。它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己。


// next 方法的参数 § ⇧
// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

// function* f() {
//   for(var i = 0; true; i++) {
//     var reset = yield i;
//     if(reset) { i = -1; }
//   }
// }

// var g = f();

// g.next() // { value: 0, done: false }
// g.next() // { value: 1, done: false }
// g.next(true) // { value: 0, done: false }
// 上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

// 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

// 再看一个例子。

// function* foo(x) {
//   var y = 2 * (yield (x + 1));
//   var z = yield (y / 3);
//   return (x + y + z);
// }

// var a = foo(5);
// a.next() // Object{value:6, done:false}
// a.next() // Object{value:NaN, done:false}
// a.next() // Object{value:NaN, done:true}

// var b = foo(5);
// b.next() // { value:6, done:false }
// b.next(12) // { value:8, done:false }
// b.next(13) // { value:42, done:true }
// 上面代码中，第二次运行next方法的时候不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

// 如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

// 注意，由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。

// function wrapper(generatorFunction) {
//   return function (...args) {
//     let generatorObject = generatorFunction(...args);
//     generatorObject.next();
//     return generatorObject;
//   };
// }

// const wrapped = wrapper(function* () {
//   console.log(`First input: ${yield}`);
//   return 'DONE';
// });

// wrapped().next('hello!')
// // First input: hello!
// 上面代码中，Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。

// 再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。

// function* dataConsumer() {
//   console.log('Started');
//   console.log(`1. ${yield}`);
//   console.log(`2. ${yield}`);
//   return 'result';
// }

// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next('a')
// // 1. a
// genObj.next('b')
// // 2. b
// 上面代码是一个很直观的例子，每次通过next方法向 Generator 函数输入值，然后打印出来。

// for...of 循环
// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。

// function *foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }

// for (let v of foo()) {
//   console.log(v);
// }
// // 1 2 3 4 5
// 上面代码使用for...of循环，依次显示5个yield表达式的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

// 下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。

// function* fibonacci() {
//   let [prev, curr] = [0, 1];
//   for (;;) {
//     [prev, curr] = [curr, prev + curr];
//     yield curr;
//   }
// }

// for (let n of fibonacci()) {
//   if (n > 1000) break;
//   console.log(n);
// }
// 从上面代码可见，使用for...of语句时不需要使用next方法。

// 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。

// function* objectEntries(obj) {
//   let propKeys = Reflect.ownKeys(obj);

//   for (let propKey of propKeys) {
//     yield [propKey, obj[propKey]];
//   }
// }

// let jane = { first: 'Jane', last: 'Doe' };

// for (let [key, value] of objectEntries(jane)) {
//   console.log(`${key}: ${value}`);
// }
// // first: Jane
// // last: Doe
// 上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。这时，我们通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。

// function* objectEntries() {
//   let propKeys = Object.keys(this);

//   for (let propKey of propKeys) {
//     yield [propKey, this[propKey]];
//   }
// }

// let jane = { first: 'Jane', last: 'Doe' };

// jane[Symbol.iterator] = objectEntries;

// for (let [key, value] of jane) {
//   console.log(`${key}: ${value}`);
// }
// // first: Jane
// // last: Doe
// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

// function* numbers () {
//   yield 1
//   yield 2
//   return 3
//   yield 4
// }

// // 扩展运算符
// [...numbers()] // [1, 2]

// // Array.from 方法
// Array.from(numbers()) // [1, 2]

// // 解构赋值
// let [x, y] = numbers();
// x // 1
// y // 2

// // for...of 循环
// for (let n of numbers()) {
//   console.log(n)
// }
// // 1
// // 2


// Generator.prototype.throw()
// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

// var g = function* () {
//   try {
//     yield;
//   } catch (e) {
//     console.log('内部捕获', e);
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a');
//   i.throw('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }
// // 内部捕获 a
// // 外部捕获 b
// 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。

// var g = function* () {
//   try {
//     yield;
//   } catch (e) {
//     console.log(e);
//   }
// };

// var i = g();
// i.next();
// i.throw(new Error('出错了！'));
// // Error: 出错了！(…)
// 注意，不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。

// var g = function* () {
//   while (true) {
//     try {
//       yield;
//     } catch (e) {
//       if (e != 'a') throw e;
//       console.log('内部捕获', e);
//     }
//   }
// };

// var i = g();
// i.next();

// try {
//   throw new Error('a');
//   throw new Error('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }
// // 外部捕获 [Error: a]
// 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。

// 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。

// var g = function* () {
//   while (true) {
//     yield;
//     console.log('内部捕获', e);
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a');
//   i.throw('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }
// // 外部捕获 a
// 上面代码中，Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获。

// 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

// var gen = function* gen(){
//   yield console.log('hello');
//   yield console.log('world');
// }

// var g = gen();
// g.next();
// g.throw();
// // hello
// // Uncaught undefined
// 上面代码中，g.throw抛出错误以后，没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。

// throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。

// var gen = function* gen(){
//   try {
//     yield console.log('a');
//   } catch (e) {
//     // ...
//   }
//   yield console.log('b');
//   yield console.log('c');
// }

// var g = gen();
// g.next() // a
// g.throw() // b
// g.next() // c
// 上面代码中，g.throw方法被捕获以后，自动执行了一次next方法，所以会打印b。另外，也可以看到，只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历。

// 另外，throw命令与g.throw方法是无关的，两者互不影响。

// var gen = function* gen(){
//   yield console.log('hello');
//   yield console.log('world');
// }

// var g = gen();
// g.next();

// try {
//   throw new Error();
// } catch (e) {
//   g.next();
// }
// // hello
// // world
// 上面代码中，throw命令抛出的错误不会影响到遍历器的状态，所以两次执行next方法，都进行了正确的操作。

// 这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次catch语句就可以了。

// Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。

// function* foo() {
//   var x = yield 3;
//   var y = x.toUpperCase();
//   yield y;
// }

// var it = foo();

// it.next(); // { value:3, done:false }

// try {
//   it.next(42);
// } catch (err) {
//   console.log(err);
// }
// 上面代码中，第二个next方法向函数体内传入一个参数42，数值是没有toUpperCase方法的，所以会抛出一个TypeError错误，被函数体外的catch捕获。

// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

// function* g() {
//   yield 1;
//   console.log('throwing an exception');
//   throw new Error('generator broke!');
//   yield 2;
//   yield 3;
// }

// function log(generator) {
//   var v;
//   console.log('starting generator');
//   try {
//     v = generator.next();
//     console.log('第一次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第二次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第三次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   console.log('caller done');
// }

// log(g());
// // starting generator
// // 第一次运行next方法 { value: 1, done: false }
// // throwing an exception
// // 捕捉错误 { value: 1, done: false }
// // 第三次运行next方法 { value: undefined, done: true }
// // caller done
// 上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了

// 求数组前n大数
// es6 promise api async 
// generator
// script 多脚本执行 如何
// 确定是否加载完
// onerror冒泡
// xss csrf
// meta的属性 手写html
// 语义化标签
// 各种布局的实现
// 哪些可以冒泡 哪些不可以
// 反向代理
// 自己封装一个onclick事件
// 可能会覆盖，需要一个onclick  队列  