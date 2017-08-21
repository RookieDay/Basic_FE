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