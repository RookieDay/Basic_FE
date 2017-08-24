### Array list
- Array.from 方法从一个类似数组或可迭代的对象中创建一个新的数组实例。
>Array.from(arrayLike[, mapFn[, thisArg]]) -->类似Array.from(obj).map(mapFn, thisArg)
```
Array.prototype 本身也是一个 Array。
Array.isArray(Array.prototype); 
// true
```
```
Array.from('foo'); 
// ["f", "o", "o"]

let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]
```

- Array.isArray() 用于确定传递的值是否是一个 Array。
>Array.isArray(obj)

```
instanceof 和 isArray
当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes.
var iframe = document.createElement('iframe');
document.body.appenChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new XArray(1,2,3) //[1,2,3]

//correctly checking for Array
Array.isArray(arr) // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```
```
Polyfill
if(!Array.isArray){
    Array.isArray = function(obj){
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
```

- Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个包含 7 个 undefined 元素的数组。
>Array.of(element0[, element1[, ...[, elementN]]])

```
Array.of(1);         // [1]
Array.of(1, 2, 3);   // [1, 2, 3]
Array.of(undefined); // [undefined]
```
```
Polyfill
if(!Array.of){
    Array.of = function(){
        return Array.prototype.slice.call(argumments);
    }
}
```

- concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
```
var alphaNumeric = alpha.concat(1, [2, 3]);  //// 组成新数组 ["a", "b", "c", 1, 2, 3], 原alpha数组未被修改
```

- copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。
>arr.copyWithin(目标索引, [源开始索引], [结束源索引])  arr.copyWithin(target, start, end)
target
0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。

start
0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
如果 start 被忽略，copyWithin 将会从0开始复制。

end
0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
如果 end 被忽略，copyWithin 将会复制到 arr.length。


```
从第2个开始 第三个结束 复制到第一个的地方
["alpha", "beta", "copy", "delta"].copyWithin(1, 2, 3);
// 0:"alpha" 1:"beta" 2:"copy" 3:"delta"
// ["alpha", "copy", "copy", "delta"]
// 0:"alpha" 1:"copy" 2:"copy" 3:"delta"
```
```
[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

({0:undefined,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5}).copyWithin(0,3,5);
结果为：
{0:1,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5};
也就是
{0:1,3:1,length:5}


// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant: 
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

- entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
```
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

- every() 方法测试数组的所有元素是否都通过了指定函数的测试。
>arr.every(callback[, thisArg])
```
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
```

- fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。
> arr.fill(value, start, end) 如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值. 如果 end 是个负数, 则结束索引会被自动计算成为 length+end.
```
[1, 2, 3].fill(4)            // [4, 4, 4]
[1, 2, 3].fill(4, 1)         // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2)      // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1)      // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2)    // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN)  // [1, 2, 3]
Array(3).fill(4);            // [4, 4, 4]
[].fill.call({length: 3}, 4) // {0: 4, 1: 4, 2: 4, length: 3}
```

- filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
```
function isBigEnough(value) {
  return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

// filtered is [12, 130, 44]

// ES6 way

const isBigEnough = value => value >= 10;

let [...spraed]= [12, 5, 8, 130, 44];

let filtered = spraed.filter(isBigEnough);

// filtered is [12, 130, 44]
```

- find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
>arr.find(callback[, thisArg])
如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用Array.prototype.indexOf() 或 Array.prototype.includes()。
```
function isBigEnough(element) {
  return element >= 15;
}

[12, 5, 8, 130, 44].find(isBigEnough); // 130
```
```
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) { 
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

```
寻找数组中的质数
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```
```
当在回调中删除数组中的一个值时，当访问到这个位置时，其传入的值时 undefiend：
// Declare array with no element at index 2, 3 and 4
var a = [0,1,,,,5,6];

// Shows all indexes, not just those that have been assigned values
a.find(function(value, index) {
  console.log('Visited index ' + index + ' with value ' + value); 
});

// Shows all indexes, including deleted
a.find(function(value, index) {

  // Delete element 5 on first iteration
  if (index == 0) {
    console.log('Deleting a[5] with value ' + a[5]);
    delete a[5];
  }
  // Element 5 is still visited even though deleted
  console.log('Visited index ' + index + ' with value ' + value); 
});
```

- findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
```
function isBigEnough(element) {
  return element >= 15;
}

[12, 5, 8, 130, 44].findIndex(isBigEnough); // 3
```

```
查找数组中首个质数元素的索引
function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) return false;
    }
    return (element > 1);
}

console.log( [4, 6, 8, 12].findIndex(isPrime) ); // -1, 没找到质数元素
console.log( [4, 6, 7, 12].findIndex(isPrime) ); // 2
```

- forEach() 方法对数组的每个元素执行一次提供的函数。
>array.forEach(callback(currentValue, index, array){
    //do something
}, this)

array.forEach(callback[, thisArg])

```
let a = ['a', 'b', 'c'];

a.forEach(function(element) {
    console.log(element);
});

// a
// b
// c
```

```
对象复制函数
下面的代码会创建一个给定对象的副本。 创建对象的副本有不同的方法，以下是只是一种方法，并解释了Array.prototype.forEach() 是如何使用ECMAScript 5 Object.* 元属性（meta property ）函数工作的。
function copy(obj) {
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var obj1 = { a: 1, b: 2 };
var obj2 = copy(obj1); // obj2 looks like obj1 now
```

```
如果数组在迭代时被修改了，则其他元素会被跳过。
下面的例子输出"one", "two", "four"。当到达包含值"two"的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four"现在在数组更前的位置，"three"会被跳过。 forEach()不会在迭代之前创建数组的副本。
var words = ["one", "two", "three", "four"];
words.forEach(function(word) {
  console.log(word);
  if (word === "two") {
    words.shift();
  }
});
// one
// two
// four
```