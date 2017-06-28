// 经典：闭包实现点击button弹出相应序号
/*<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>*/

var lists = document.getElementsByTagName('li');
// N1
for (var i = 0; i < lists.length; i++) {
    (function (index) {
        lists[index].onmouseover = function () {
            alert(index);
        }
    })(i);
}
// N2
for (var i = 0; i < lists.length; i++) {
    lists[i].index = i;
    lists[i].onmouseover = function () {
        alert(this.index)
    }
}
// N3
function eventListener(list, index) {
    list.onmouseover = function () {
        alert(index);
    }
}
for (var i = 0; i < lists.length; i++) {
    eventListener(lists[i], i);
}

// 排序算法
//冒泡排序 两两比较 最大或者最小的排在了最后
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            let temp;
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

//快速排序  元素为基准， 小的放左边 大的放右边
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var pivotIndex = Math.floor(arr.length / 2);
    //找基准，并把基准从原数组删除 从index开始删除1个元素
    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];
    var right = [];

    // 比基准小的放在left 大的放在right
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

// 选择排序 把每一个数都与第一个数比较，如果小于第一个数，就把它们交换位置；这样一轮下来，最小的数就排到了最前面；重复n-1轮
function selectSort(arr) {
    let len = arr.length;
    let temp;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) { //寻找最小的数
                minIndex = j;           //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

// 插入排序:

// 解析：

//  （1） 从第一个元素开始，该元素可以认为已经被排序

//  （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描

//  （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置

//  （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置

//  （5）将新元素插入到下一位置中

//  （6） 重复步骤2

function insertSort(arr) {
    // 假设第0个元素是一个有序的数列，第1个以后是无序的序列
    // 所以第一个元素开始讲无序序列的元素插入到有序数列中
    for (let i = 1; i < arr.length; i++) {
        // 升序
        if (arr[i] < arr[i - 1]) {
            // 取出无序序列的第i个元素作为被插入元素
            var guard = arr[i];
            // 记住有序序列的最后一个位置 并且将有序序列位置扩大一个
            var j = i - 1;
            arr[i] = arr[j];
            while (j > 0 && guard < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = guard;
        }
    }
    return arr;
}

// 将数组长度赋值为0（arr.length = 0）也能达到清空数组的目的，并且同时能实现数组重用，减少内存垃圾的产生。

// 方法function优化
setTimeout((function (self) {
    return function () {
        this.trick();
    }
})(this), 16);
// 每过16毫秒调用一次this.tick()，嗯，乍一看似乎没什么问题，但是仔细一琢磨，每一次调用都返回了一个新的方法对象，这就导致了大量的方法对象垃圾！

// 为了解决这个问题，可以将作为返回值的方法保存起来，例如：
this.tickFunc = (function (self) {
    return function () {
        self.trick();
    }
})(this);

setTimeout(this.tickFunc, 16);


// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象
// splice() 方法通过删除现有元素和/或添加新元素来更改数组的内容。 array.splice(start, deleteCount, item1, item2, ...)

// 数组中不使用push pop操作来操作数据， 使用数组长度+1 和-1 来保证数组增减（pop将会使得array的最后一个元素将会变成内存垃圾）

// 封装自己的ajax
var $ = {
    params: function (params) {
        var data = '';
        for (key in params) {
            data += key + '=' + params[key] + '&';
        }
        return data.slice(0, -1);
    },
    ajax: function (options) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest;
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var type = options.type || 'get',
            url = options.url || location.pathname,
            data = this.params(options.data),
            callback = options.success;
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type, url);
        if (type == 'post') {
            xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var contentType = xhr.getResponseHeader('Content-Type');
                var data = xhr.responseText;
                if (contentType.indexOf('json') != -1) {
                    data = JSON.parse(data);
                }
                callback(data);
            } else {
                options.error('failed');
            }
        }
    }
}

// 1. target:触发事件的某个具体对象，只会出现在事件流的目标阶段（谁触发谁命中，所以肯定是目标阶段）
// 2. currentTarget:绑定事件的对象，恒等于this，可能出现在事件流的任意一个阶段中
// 3. 通常情况下terget和currentTarget是一致的，我们只要使用terget即可，但有一种情况必须区分这三者的关系，那就是在父子嵌套的关系中，父元素绑定了事件，单击了子元素（根据事件流，在不阻止事件流的前提下他会传递至父元素，导致父元素的事件处理函数执行），这时候currentTarget指向的是父元素，因为他是绑定事件的对象，而target指向了子元素，因为他是触发事件的那个具体对象，
/*
<div id="one">
    <div id="three"></div>
</div>*/

one.addEventListener('click', function (e) {
    console.log(e.target); //three
    console.log(e.currentTarget); //one
})

// 寻找一个字符串中只出现一次的字符
console.log([...new Set(Array.from("1sadada1edfdvc"))]);

// 寻找两个字符串中都出现的字符
var str1 = "1fsoo", str2 = "p1asdoqf";
var set = new Set();
for (var i = 0; i < str1.length; i++) {
    if (str2.indexOf(str1[i]) != -1) {
        set.add(str1[i]);
    }
}


// JSONP
function addScript(src) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    document.body.appendChild(script);
}
window.onload = function () {
    addScript('http://example.com/ip?callback=foo');
}
function foo(data) {
    console.log('ip is' + data.ip);
}

// 一段英语字符串，有","、“。”、“ ”。取出所有单词
var str = "hi,world.but we are not goof";
var arr = str.split(/\,|\s+|\./g);

// Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
// Object.defineProperty(obj, prop, descriptor)
// 参数
// obj
// 要在其上定义属性的对象。
// prop
// 要定义或修改的属性的名称。
// descriptor
// 将被定义或修改的属性的描述符。
// 返回值
// 被传递给函数的对象
// 描述
// 该方法允许精确添加或修改对象的属性。一般情况下，我们为对象添加属性是通过赋值来创建并显示在属性枚举中（for...in 或 Object.keys 方法）， 但这种方式添加的属性值可以被改变，也可以被删除。而使用 Object.defineProperty() 则允许改变这些额外细节的默认设置。例如，默认情况下，使用  Object.defineProperty() 增加的属性值是不可改变的。

// 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

// 数据描述符和存取描述符均具有以下可选键值：

// configurable
// 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
// enumerable
// 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
// 数据描述符同时具有以下可选键值：

// value
// 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
// writable
// 当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。
// 存取描述符同时具有以下可选键值：

// get
// 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
// set
// 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。
// 记住，这些选项不一定是自身属性，如果是继承来的也要考虑。为了确认保留这些默认值，你可能要在这之前冻结 Object.prototype，明确指定所有的选项，或者将__proto__属性指向null。
// 使用 __proto__
Object.defineProperty(obj, "key", {
    __proto__: null, // 没有继承的属性
    value: "static"  // 没有 enumerable
    // 没有 configurable
    // 没有 writable
    // 作为默认值
});

// 显式
Object.defineProperty(obj, "key", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static"
});

// 循环使用同一对象
function withValue(value) {
    var d = withValue.d || (
        withValue.d = {
            enumerable: false,
            writable: false,
            configurable: false,
            value: null
        }
    );
    d.value = value;
    return d;
}
// ... 并且 ...
Object.defineProperty(obj, "key", withValue("static"));

// 如果 freeze 可用, 防止代码添加或删除对象原型的属性
// （value, get, set, enumerable, writable, configurable）
(Object.freeze || Object)(Object.prototype);

创建属性

// 如果对象中不存在指定的属性，Object.defineProperty()就创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。拥有布尔值的字段的默认值都是false。value，get和set字段的默认值为undefined。定义属性时如果没有get/set/value/writable，那它被归类为数据描述符。

var o = {}; // 创建一个新对象

// Example of an object property added with defineProperty with a data property descriptor
Object.defineProperty(o, "a", {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
});

// 对象o拥有了属性a，值为37

// Example of an object property added with defineProperty with an accessor property descriptor
var bValue;
Object.defineProperty(o, "b", {
    get: function () {
        return bValue;
    },
    set: function (newValue) {
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});

o.b = 38;
// 对象o拥有了属性b，值为38

// The value of o.b is now always identical to bValue, unless o.b is redefined

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
    value: 0x9f91102,
    get: function () {
        return 0xdeadbeef;
    }
});
// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors

// 修改属性

// 如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果描述符的 configurable 特性为false（即该特性为non-configurable），那么除了 writable 外，其他特性都不能被修改，并且数据和存取描述符也不能相互切换。

// 如果一个属性的 configurable 为 false，则其 writable 特性也只能修改为 false。

// 如果尝试修改 non-configurable 属性特性（除 writable 以外），将会产生一个TypeError 异常，除非当前值与修改值相同。

// Writable 属性

// 当属性特性（property attribute） writable 设置为false时，表示 non-writable，属性不能被修改。

var o = {}; // 创建一个新对象

Object.defineProperty(o, "a", {
    value: 37,
    writable: false
});

console.log(o.a); // 打印 37
o.a = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(o.a); // 打印 37， 赋值不起作用。

// 正如上例中看到的，修改一个 non-writable 的属性不会改变属性的值，同时也不会报异常。

// Enumerable 特性

// 属性特性 enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。


var o = {};
Object.defineProperty(o, "a", { value: 1, enumerable: true });
Object.defineProperty(o, "b", { value: 2, enumerable: false });
Object.defineProperty(o, "c", { value: 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {
    console.log(i);
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false

// Configurable 特性

// configurable 特性表示对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改。
var o = {};
Object.defineProperty(o, "a", {
    get: function () { return 1; },
    configurable: false
});

// throws a TypeError
Object.defineProperty(o, "a", { configurable: true });
// throws a TypeError
Object.defineProperty(o, "a", { enumerable: true });
// throws a TypeError (set was undefined previously) 
Object.defineProperty(o, "a", { set: function () { } });
// throws a TypeError (even though the new get does exactly the same thing) 
Object.defineProperty(o, "a", { get: function () { return 1; } });
// throws a TypeError
Object.defineProperty(o, "a", { value: 12 });

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
// 如果 o.a 的 configurable 特性已经为 true，没有错误会被抛出，并且属性会在最后被删除。

// 添加多个属性和默认值

// 考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和Object.defineProperty()为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示。
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
    value: 1,
    writable: true,
    configurable: true,
    enumerable: true
});


// 另一方面，
Object.defineProperty(o, "a", { value: 1 });
// 等同于 :
Object.defineProperty(o, "a", {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: false
});

// 一般的 Setters 和 Getters

// 下面的例子说明了如何实现自我存档的对象。当 temperature 属性设置时，archive 数组会得到一个 log。
function Archiver() {
    var temperature = null;
    var archive = [];
    Object.defineProperty(this, 'temperature', {
        get: function () {
            console.log('get!');
            return temperature;
        },
        set: function (value) {
            temperature = value;
            archive.push({ val: temperature });
        }
    });
    this.getArchive = function () { return archive };
}
var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]

//test2
var pattern = {
    get: function () {
        return 'I alway return this string,whatever you have assigned';
    },
    set: function () {
        this.myname = 'this is my name string';
    }
};


function TestDefineSetAndGet() {
    Object.defineProperty(this, 'myproperty', pattern);
}


var instance = new TestDefineSetAndGet();
instance.myproperty = 'test';

// 'I alway return this string,whatever you have assigned'
console.log(instance.myproperty);
// 'this is my name string'
console.log(instance.myname);


// Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
var obj = {
    prop: function () { },
    foo: "bar"
};

// 可以添加新的属性,已有的属性可以被修改或删除
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

var o = Object.freeze(obj);

assert(Object.isFrozen(obj) === true);

// 现在任何修改操作都会失败
obj.foo = "quux"; // 静默失败
obj.quaxxor = "the friendly duck"; // 静默失败,并没有成功添加上新的属性

// ...在严格模式中会抛出TypeError异常
function fail() {
    "use strict";
    obj.foo = "sparky"; // 抛出TypeError异常
    delete obj.quaxxor; // 抛出TypeError异常
    obj.sparky = "arf"; // 抛出TypeError异常
}

fail();

// 使用Object.defineProperty方法同样会抛出TypeError异常
Object.defineProperty(obj, "ohai", { value: 17 }); // 抛出TypeError异常
Object.defineProperty(obj, "foo", { value: "eit" }); // 抛出TypeError异常


// 下面的例子演示了一个冻结对象中的非冻结对象是可以被修改的（浅冻结）。
obj = {
    internal: {}
};
Object.freeze(obj);
obj.internal.a = "aValue";

obj.internal.a // "aValue"

// 想让一个对象变的完全冻结,冻结所有对象中的对象,我们可以使用下面的函数.
function deepFreeze(o) {
    var prop, propKey;
    Object.freeze(o); //首先冻结第一层对象
    for (propKey in o) {
        prop = o[propKey];
        if (!o.hasOwnProperty(PropertyKey) || !(typeof prop === 'objcet') || Object.isFrozen(prop)) {
            //跳过原型链上的属性和已冻结的对象
            continue;
        }
        deepFreeze(prop);//递归调用
    }
}

obj2 = {
    internal: {}
};

deepFreeze(obj2);
obj2.internal.a = "anotherValue";
obj2.internal.a; // undefined

// Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象。
// Object.create(proto, [ propertiesObject ])

// 参数
// proto
// 一个对象，应该是新创建的对象的原型。
// propertiesObject
// 可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。
// 抛出异常
// 如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。

// 使用Object.create实现类式继承

// 下面的例子演示了如何使用Object.create()来实现类式继承。这是一个单继承。

//Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
}

Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
    Shape.call(this); //call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);

var rect = new Rectangle();

rect instanceof Rectangle //true.
rect instanceof Shape //true.

rect.move(1, 1); //Outputs, "Shape moved."

// 如果你希望能继承到多个对象,则可以使用混入的方式。
function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}

MyClass.prototype = Object.create(SuperClass.prototype); //inherit
mixin(MyClass.prototype, OtherSuperClass.prototype); //mixin

MyClass.prototype.myMethod = function () {
    // do a thing
};

// mixin函数会把超类原型上的函数拷贝到子类原型上，这里mixin函数没有给出,需要由你实现。一个和 mixin 很像的函数是

// 使用Object.create 的 propertyObject 参数
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: { writable: true, configurable: true, value: "hello" },
    // bar会成为所创建对象的访问器属性
    bar: {
        configurable: false,
        get: function () { return 10 },
        set: function (value) { console.log("Setting `o.bar` to", value) }
    }
})


function Constructor() { }
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
    console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } });


// Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。


// http://www.jianshu.com/p/d36fb31f9cff
// 揭秘babel的魔法之class魔法处理
// 在探究ES6之前，我们先来回顾一下ES5环境下，我们如何实现类的继承：
// Person是一个构造器
function Person(name) {
    this.type = 'Person';
    this.name = name;
}

// 我们可以通过prototype的方式来加一条实例方法
Person.prototype.hello = function () {
    console.log('hello ' + this.name);
}

// 对于私有属性(Static method)，我们当然不能放在原型链上了。我们可以直接放在构造函数上面
Person.fn = function () {
    console.log('static');
};

// 我们可以这么应用：
var julien = new Person('julien');
var darul = new Person('darul');
julien.hello(); // 'hello julien'
darul.hello(); // 'hello darul'
Person.fn(); // 'static'

// 这样会报错，因为fn是一个私有属性
julien.fn(); //Uncaught TypeError: julien.fn is not a function

// 在ES6环境下
// class Person {
//     constructor(name) {
//         this.name = name;
//         this.type="person"
//     }
//     hello() {
//         console.log('hello ' + this.name);
//     }
//     static fn() {
//         console.log('static');
//     };
// }

// 接下来进行babel编译
// Class Person{}
// 被编译为：

// function _classCallCheck(instance, Constructor) {
//     // 检查是否成功创建了一个对象
//     if (!(instance instanceof Constructor)) {  
//         throw new TypeError("Cannot call a class as a function"); 
//     } 
// }

// var Person = function Person() {
//     _classCallCheck(this, Person);
// };

// _classCallCheck是为了保证调用的安全性。比如我们这么调用：
// ok
var p = new Person();

// 是没有问题的，但是直接调用：

// Uncaught TypeError: Cannot call a class as a function
Person();
// 就会报错，这就是_classCallCheck所起的作用。具体原理自己看代码就好了，很好理解。
// 我们发现，Class关键字会被编译成构造函数，于是我们便可以通过new来实现实例的生成。

// Constructor探秘
// 我们这次尝试加入constructor,再来看看编译结果：

// class Person() {
//     constructor(name) {  
//         this.name = name;
//         this.type = 'person'
//     }
// }
// 编译结果：

// var Person = function Person(name) {
//     _classCallCheck(this, Person);
//     this.type = 'person';
//     this.name = name;
// };

// 增加方法
// 我们尝试给Person类添加一个方法：hello：

// class Person {
//     constructor(name) {
//         this.name = name;
//         this.type = 'person'
//     }

//     hello() {
//         console.log('hello ' + this.name);
//     }
// }

// 核心思路：

// var _createClass = (function () {   
//     function defineProperties(target, props) { 
//         // 对于每一个定义的属性props，都要完全拷贝它的descriptor,并扩展到target上
//     }  
//     return defineProperties(Constructor.prototype, protoProps);    
// })();

// var Person = (function () {
//     function Person(name) { // 同之前... }

//     _createClass(Person, [{
//         key: 'hello',
//         value: function hello() {
//             console.log('hello ' + this.name);
//         }
//     }]);

//     return Person;
// })();


// 现在，我们知道我们添加的方法：

// hello() {
//     console.log('hello ' + this.name);
// }
// 被编译为：

// _createClass(
//     Person, [{
//     key: 'hello',
//     value: function hello() {
//         console.log('hello ' + this.name);
//     }
// }]);
// 而_createClass接受2个－3个参数，分别表示：

// 参数1 => 我们要扩展属性的目标对象，这里其实就是我们的Person
// 参数2 => 需要在目标对象原型链上添加的属性，这是一个数组
// 参数3 => 需要在目标对象上添加的属性，这是一个数组


// JSON.parse() 方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。可以提供可选的reviver函数以在返回之前对所得到的对象执行变换。
// JSON.parse(text[, reviver])
// 参数
// text
// 要被解析成JavaScript值的字符串，查看 JSON 对象学习的JSON 语法的说明。
// reviver 可选
// 如果是一个函数，则规定了原始值如何被解析改造，在被返回之前。
// 返回值
// Object对应给定的JSON文本。
// 异常
// 若被解析的 JSON 字符串是非法的，则会抛出 一个语法错误 异常。
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null

// 使用 reviver 函数

// 如果指定了 reviver 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。更具体点讲就是：解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中。如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。

// 当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 this 值会是 {"": 修改过的解析值}，在编写 reviver 函数时，要注

JSON.parse('{"p": 5}', function (k, v) {
    if (k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3 
// ""

// JSON.parse() 不允许用逗号作为结尾
// both will throw a SyntaxError
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');


class Animal {
    constructor() {
        this.type = 'animal'
    }
    says(say) {
        setTimeout(function () {
            console.log(this.type + ' says ' + say);
        }, 1000);
    }
}

var a = new Animal();
a.says('ana');

// this指向了window 解决办法如下：
// 方法1 self
//    says(say){
//        var self = this;
//         setTimeout(function(){
//             console.log(self.type + ' says ' + say);
//         },1000);
//     }

//方法2 bind 
//  says(say){
//      setTimeout(function(){
//          console.log(self.type + ' says ' + say)
//      }.bind(this), 1000)

// 方法3 箭头函数
// class Animal {
//     constructor(){
//         this.type = 'animal'
//     }
//     says(say){
//         setTimeout( () => {
//             console.log(this.type + ' says ' + say)
//         }, 1000)
//     }
// }
//  var animal = new Animal()
//  animal.says('hi')  //animal says hi

alert(1 && 2);  // ...> 2

// 正则表达式匹配，开头为11N, 12N或1NNN，后面是-7-8个数字的电话号码。
var regexp = /^(11N|12N|1NNN)\d{7,8}$/;

var obj = {
    a: 1,
    b: function () {
        console.log(this.a)
    }
};
var a = 2;
var objb = obj.b;
obj.b(); //1
objb();   //2
obj.b.call(window); //2


function A() { }
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;
console.log(new A());  //{}
console.log(new B());  //{a:undefined}
console.log(new C(2)); // {a:2}


var a = 1;
function b() {
    var a = 2;
    function c() {
        console.log(a);
    }
    return c;
}
b()(); //2

// CSS Hack http://www.imooc.com/article/13699
/*
CSS hack方式一：条件注释法:

只在IE下生效 
<!--[if IE]> 
这段文字只在IE浏览器显示 
<![endif]--> 

只在IE6下生效 
<!--[if IE 6]> 
这段文字只在IE6浏览器显示 
<![endif]--> 

只在IE6以上版本生效 
<!--[if gte IE 6]> 
这段文字只在IE6以上(包括)版本IE浏览器显示 
<![endif]--> 

只在IE8上不生效 
<!--[if ! IE 8]> 
这段文字在非IE8浏览器显示 
<![endif]--> 

非IE浏览器生效 
<!--[if !IE]> 
这段文字只在非IE浏览器显示 
<![endif]-->

*/

/*
CSS hack方式二：类内属性前缀法
属性前缀法是在CSS样式属性名前加上一些只有特定浏览器才能识别的hack前缀，以达到预期的页面展现效果。
IE浏览器各版本 CSS hack 对照表
说明：在标准模式中
“-″减号是IE6专有的hack
“\9″ IE6/IE7/IE8/IE9/IE10都生效
“\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
“\9\0″ 只对IE9/IE10生效，是IE9/10的hack
*/

/*
CSS hack方式三：选择器前缀法
选择器前缀法是针对一些页面表现不一致或者需要特殊对待的浏览器，在CSS选择器前加上一些只有某些特定浏览器才能识别的前缀进行hack。
目前最常见的是
html 前缀只对IE6生效
+html +前缀只对IE7生效
@media screen\9{...}只对IE6/7生效
@media \0screen {body { background: red; }}只对IE8有效
@media \0screen\,screen\9{body { background: blue; }}只对IE6/7/8有效
@media screen\0 {body { background: green; }} 只对IE8/9/10有效
@media screen and (min-width:0\0) {body { background: gray; }} 只对IE9/10有效
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对IE10有效
等等


CSS3选择器结合JavaScript的Hack
我们用IE10进行举例：
由于IE10用户代理字符串（UserAgent）为：Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)，所以我们可以使用JavaScript将此属性添加到文档标签中，再运用CSS3基本选择器匹配。
JavaScript代码:
var htmlObj = document.documentElement;
htmlObj.setAttribute('data-useragent',navigator.userAgent);
htmlObj.setAttribute('data-platform', navigator.platform );
CSS3匹配代码：
html[data-useragent*='MSIE 10.0'] #id {
color: #F00;
}

*/

/*
 写出下面代码在浏览器中的颜色值？
background:red;
_background:green;
*background:blue;
background:black/9;
答：  IE6中blue、 IE7 遨游中blue、其他（IE8 chrome ff safari opera等）是red
备注（知识库相关）：
兼容性hacker设置，分下面三大类：
a.   IE6认识的hacker 是下划线_ 和星号 *
b.  IE7 遨游认识的hacker是星号 *
c.   其他（IE8 chrome ff safari opera等）

background: red;//firefox
_background: green;//IE6
*background: blue;//IE6，IE7
background: black\9;//IE6---IE10
*/

// 添加些css让其水平垂直居中。
// <div style="text-align:center;height:200px;width:200px;line-height:200px">AAA</div>

// 在空白处填写代码，是其点击时，前景色为白色，背景色为黑色。
// <div onclick='this.style.color="white";this.style.backgroundcolor=black'>AAA</div>

// 点击时从1分钟开始，每秒递减到0。
{/*<div onclick="test();">AAA</div>*/ }
function test() {
    var t = 60;
    var div = document.querySelector('div');
    div.innerHTML = t.toString();

    var timerId = setInterval(function () {
        if (t <= 0) {
            clearInterval(timerId);
        } else {
            t--;
            div.innerHTML = t.toString();
        }
    }, 1000);
}

// IE下mouseover和mouseenter的区别
// 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
// 只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。

// DOM元素的位置大集合
// pageX pageY clintX clintY clientWidth clientHeight
// scrollTop scrollLeft scrollWidth scrollHeight 



// 一个简单的缓动函数
btn.onclick = function () {
    animate(srcTarget, {
        "left": 400,
        "top": 200,
        "width": 300,
        "height": 200
    }, function () {
        animate(srcTarget, {
            "left": 400,
            "top": 200,
            "width": 300,
            "height": 200
        })
    });
}
function getStyle(obj, arr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            var leader = parseInt(getStyle(obj, k)) || 0;
            var target = json[k];
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style[k] = leader + step + 'px';
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}

// 利用JS生成一个table
function createTable(rowNum, colNum) {
    var row = '';
    for (var i = 0; i < rowNum; i++) {
        var col = '';
        for (var j = 0; j < colNum; j++) {
            col += '<td>111</td>';
        }
        row += '<tr>' + col + '</tr>';
    }
    var res = '<table>' + row + '</table>';
    var wrap = document.querySelector('#wrap');
    wrap.innerHTML = res;
}
createTable(4, 1);

//图片预加载函数
function preLoadPics(arrs) {
    var arr = [];
    var callback = function () { };
    var index = 0;
    var imgObj = document.getElementById('#imgObj');
    function addIndex() {
        if (index++ === arrs.length) {
            callback();
        }
    }
    for (var i = 0; i < arrs.length; i++) {
        arr[i] = new Image();
        arr[i].src = arrs[i];
        arr[i].onload = function () {
            addIndex();
            imgObj.src = this.src;
            imgObj.height = 50;
            imgObj.width = 50;
        }
    }
    return {
        done: function (c) {
            callback = c || callback;
        }
    }
}

preLoadPics(['a.jpg']).done(function () {
    console.log('done');
})

// 模拟hash table
function HashTable() {
    this.arr = [];
}
HashTable.prototype.add = function (data) {
    this.arr.push(data);
}
HashTable.prototype.remove = function (i) {
    if (this.arr[i]) {
        delete this.arr[i];
        return true;
    }
    return false;
}
HashTable.prototype.contains = function (data) {
    return this.arr.indexOf(data) !== -1 ? true : false;
}
HashTable.prototype.length = function () {
    return this.arr.length;
}

var h = new HashTable();


// 继承

// 原型式继承是借助已有的对象创建新的对象，将子类的原型指向父类，就相当于加入了父类这条原型链 
// 原型链继承 

function Parent() {
    this.name = 'ana';
}
function Child() {
    this.age = 12;
}
Child.prototype = new Parent();//Child继承Parent，通过原型，形成链条
var c = new Child();
console.log("c - " + c.age);
console.log("c - " + c.name);

function Brother() {
    this.sex = 'male';
}
Brother.prototype = new Child();
var bro = new Brother();
console.log("b - " + bro.name);
console.log("b - " + bro.age);
console.log("b - " + bro.sex);


// 高级程序设计
// 每一个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，
// 而实例都包含一个指向原型的对象的内部指针
// 子类有时候需要重写超类型中的某个方法，或者添加超类中不存在的某个方法，
// 给原型添加方法的代码一定要放在替换原型的语句之后。
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
}
function SubType(){
    this.subProperty = false;
} 
//继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subProperty;
}
SubType.prototype.getSuperValue = function(){
    return 'ana';
}

var instance = new SubType();
alert(instance.getSuperValue());

// 在通过原型链实现继承的时候，不能使用对象字面量创建原型方法，因为这样会重写原型链
function SuperType1(){
    this.property = true;
}
SuperType1.prototype.getSuperValue = function(){
    return this.property;
}
function SubType1(){
    this.subProperty = false;
} 
//继承了SuperType
SubType1.prototype = new SuperType1();
// 使用字面量添加新方法 会导致上一行代码无效
SubType1.prototype = {
    getSubValues:function(){
        return this.subProperty;
    },
    someMethod:function(){
        return false;
    }
}
var insta = new SubType1();
alert(insta.getSubValues());

// 继承总结如下:
// 1. 构造函数继承 核心：Animal.call(this,arguments);
// 2. prototype原型方式 核心： Cat.prototype = new Animal(); Cat.prototype.constructor = Cat;
// 3. prototype 中介 function extend(Child,Parent){
//                         var F = function(){};
//                         F.prototype = Parent.prototype;
//                         Child.prototype = new F();
//                         Child.prototype.constructor = Child;
//                         Child.uber = Parent.prototype;
//                   }
// 4. 拷贝继承
//             //浅拷贝
//             function extend2(Child,Parent){
//                 var p = Parent.prototype;
//                 var c = Child.prototype;
//                 for(var k in p){
//                     c[k] = p[k];
//                 }
//                 c.uber = p;
//             }     
//             //深拷贝
//             function deepCopy(p,c){
//                 var c = c || {};
//                 for(var i in p){
//                     if(typeof p[i] === 'object'){
//                         c[i] = (p[i].constructor === Array) ? [] : {};
//                         deepCopy(p[i],c[i]);
//                     } else {
//                         c[i] = p[i];
//                     }
//                 }
//                 return c;
//             }
// 5 组合式继承 其背后的思路是 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。 
//   function Parent(age){
//         this.name = ['mike','jack','smith'];
//         this.age = age;
//     }
//     Parent.prototype.run = function () {
//         return this.name  + ' are both' + this.age;
//     };
//     function Child(age){
//         Parent.call(this,age);//对象冒充，给超类型传参
//     }
//     Child.prototype = new Parent();

//  isPrototypeOf() 某个proptotype对象和某个实例之间的关系
//  hasOwnProperty() 用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
//  in 运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。

// 构造函数继承
　function Animal1() {
    this.species = "动物";
　　}

function Cat(name, color) {
    this.name = name;
    this.color = color;
　　}
// 一、 构造函数绑定
function Cat(name, color) {
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
　　}
　　var cat1 = new Cat("大毛", "黄色");
　　alert(cat1.species); // 动物

// 二、 prototype模式
Cat.prototype = new Animal();//它相当于完全删除了prototype 对象原先的值，然后赋予一个新值
　　Cat.prototype.constructor = Cat;   //任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。
　　var cat1 = new Cat("大毛", "黄色");
　　alert(cat1.species); // 动物


// 利用空对象作为中介
function extend(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;//为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
}

extend(Cat, Animal);
var cat1 = new Cat("大毛", "黄色");
alert(cat1.species); // 动物


// 五、 拷贝继承
// 首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
　function Animals() { }
　　Animals.prototype.species = "动物";

// 然后，再写一个函数，实现属性拷贝的目的。
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
 
　extend2(Cat, Animal);
　　var cat1 = new Cat("大毛", "黄色");
　　alert(cat1.species); // 动物

// 非构造函数继承
// var Chinese = {
// 　　　　nation:'中国'
// 　　};

// 　　var Doctor ={
// 　　　　career:'医生'
// 　　}
// 这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
　　}

// 这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
// 使用的时候，第一步先在父对象的基础上，生成子对象：
// 　　var Doctor = object(Chinese);
// 然后，再加上子对象本身的属性：
// 　　Doctor.career = '医生';
// 这时，子对象已经继承了父对象的属性了。
// 　　alert(Doctor.nation); //中国


// 只向外暴露一个借口
function Inter(pwd) {
    var password = pwd;
    function getPassword() {
        return password;
    }
    this.pwdService = function () {
        return getPassword();
    }
}
Inter.prototype.checkPwd = function (pwd) {
    return this.pwdService() === pwd;
}
// 保护pwd和getPwd、只留下check接口

// 字符串查询 次数
var strs = Array.from('aab');
var obj = {}, count;
for (var i = 0; i < strs.length; i++) {
    if (obj[strs[i]]) {
        obj[strs[i]] = 1 + obj[strs[i]];
    } else {
        obj[strs[i]] = 1;
    }
}


// 垂直居中
{/*<div class="parent">
  <div class="children"></div>
</div>
方法1:
.parent {
  position: relative;
}

.chilren {
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -$height/2;
  margin-left: -$width/2;
}

方法2:当不知道子元素的宽高时，这种方法就无法实现正真的垂直居中。这个时候就可以使用 transform: translate(-50%, -50%); 来实现子元素自身的偏移。
.parent {
  position: relative;
}

.chilren {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


方法3:不使用定位来来使得元素垂直居中 (margin: 0 auto 水平居中)
.chilren {
  margin: 50% auto 0;
  transform: translateY(50%);
}

方法4:Flexbox 布局来实现
.parent {
  display: flex;
}

.chilren {
  margin: auto;
}*/}

// .请说出三种减低页面加载时间的方法
// 1、压缩css、js文件
// 2、合并js、css文件，减少http请求
// 3、外部js、css文件放在最底下
// 4、减少dom操作，尽可能用变量替代不必要的dom操作



// FOUC - Flash Of Unstyled Content 文档样式闪烁 
//   <style type="text/css"
//   media="all">@import
//   "../fouc.css";</style>  

//   而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。 

//   解决方法简单的出奇，只要在<head>之间加入一个<link>或者<script>元素就可以了。


// W3C 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分
// IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 padding

// call apply 区别
// 在知道调用函数的参数数量时，使用 call() 的性能会优于 apply()。主要在实现的过程中 apply() 需要完成额外的操作（判断第二个参数类数组的长度，etc.）


// 尾递归  http://www.ruanyifeng.com/blog/2015/04/tail-call.html
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
// 递归非常耗费内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。

function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
factorial(5) // 120
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

function factorial1(n, total) {
    if (n === 1) return total;
    return factorial1(n - 1, n * total);
}

factorial1(5, 1) // 120

// web安全 https://segmentfault.com/a/1190000006672214
// XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。
// 其实在web前端方面，可以简单的理解为一种javascript代码注入。

// 目前来讲，最简单的办法防治办法，还是将前端输出数据都进行转义最为稳妥。 其本质是，浏览器遇到script标签的话，则会执行其中的脚本。但是如果我们将script标签的进行转义，则浏览器便不会认为其是一个标签，但是显示的时候，还是会按照正常的方式去显示


// 升级攻击
// 1.我们防住了script标签的左右尖括号，蓝鹅，聪明的黑客们还是想出了好办法去破解，我们知道，直接给innerHTML赋值一段js，是无法被执行的。

// jquery的append可以做到，究其原因，就是因为jquery会在将append元素变为fragment的时候，找到其中的script标签，再使用eval执行一遍。jquery的append使用的方式也是innerHTML。而innerHTML是会将unicode码转换为字符实体的。

// 利用这两种知识结合，我们可以得出，网站使用append进行dom操作，如果是append我们可以决定的字段，那么我们可以将左右尖括号，使用unicode码伪装起来，就像这样--"\u003cscript\u003ealert('okok');"。接下来转义的时候，伪装成\u003的<会被漏掉，append的时候，则会被重新调用。

//  2.img标签的再次利用
//  在加载图片失败的时候，会调用该元素上的onerror事件。我们正可以利用这种方式来进行攻击。

// CSRF（Cross-site request forgery跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。
// 其实就是网站中的一些提交行为，被黑客利用，你在访问黑客的网站的时候，进行的操作，会被操作到其他网站上(如：你所使用的网络银行的网站)。



// 定位 absolute releative http://blog.csdn.net/cyyax/article/details/50607066
// relative和static方式在最外层时是以<body>标签为定位原点的，而absoulte方式在无父级是position非static定位时是以<html>作为原点定位。<html>和<body>元素相差9px左右。


// bind函数实现
Function.prototype.bind = Function.prototype.bind || function (context) {
    var self = this;
    return function () {
        self.apply(context, arguments);
    }
}

// slice(start,end) 从已有的数组中返回选定的元素。
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
// arr.splice(2,3,"William") 从第二个开始删除三个元素 并插入元素"William"
// MDN bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var args = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () { },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis || this,
                    args.concat(Array.prototype.slice.call(arguments)));
            }
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    }
}


let promise = new Promise(function (resolve, reject) {
    console.log('promise');
    resolve();
})

promise.then(function () {
    console.log('Resolved');
})
console.log('hi');

//promise hi Resolved
// Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以Resolved最后输出。

function loadImageAsync(url) {
    return new Promise(function (resolve, rejcet) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.error = function () {
            reject(new Error('can`t load'));
        };
        image.src = url;
    })
}
// 使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法

var getJson = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    })
    return promise;
}

getJson('/posts.json').then(function (json) {
    console.log('contenst: ' + json);
}, function (error) {
    console.log('error');
})

// getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作

var p1 = new Promise(function (resolve, rejcet) {

});
var p2 = new Promise(function (resolve, reject) {
    resolve(p1);
})
// 1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作
// 这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。

var p3 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')));
})

var p4 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
})
p4
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

getJson('post.json').then(function (post) {
    return getJson(post.commentURL);
}).then(function funA(comments) {
    console.log('resloved', comments);
}, function funB(err) {
    console.log('Rejected', err);
})
// 第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用funcA，如果状态变为Rejected，就调用funcB。
// 使用箭头函数
getJson1('post.json').then(
    post => getJson(post.commentURL)
).then(
    comments => console.log('resolved', commnets),
    err => console.log('error', err)
    )

// Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
getJson('post.json').then(
    //...
).catch(
    err => console.log('error', err)
    )
// getJSON方法返回一个 Promise 对象，如果该对象状态变为Resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
p.then((val) => console.log('fulfilled:', val))
    .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
    .then(null, (err) => console.log("rejected:", err));


var promisex = new Promise(function (resolve, reject) {
    throw new Error('test');
});
promisex.catch(function (error) {
    console.log(error);
});
// Error: test
// promise抛出一个错误，就被catch方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。
// N1
var px = new Promise(function (resolve, reject) {
    try {
        throw new Error('test');
    } catch (e) {
        reject(e);
    }
});
px.catch(function (error) {
    console.log(error);
});
//N2
var ps = new Promise(function (resolve, reject) {
    reject(new Error('text'));
});
ps.catch(function (error) {
    console.log(error);
})
// 可以发现reject方法的作用，等同于抛出错误。

// 如果Promise状态已经变成Resolved，再抛出错误是无效的。
var pp = new Promise(function (resolve, reject) {
    resolve('ok');
    throw new Error('text');
})
pp.then(function (value) { console.log(value) })
    .catch(function (error) { console.log(error) });
// Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

// 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
// bad
promise
    .then(function (data) {
        // success
    }, function (err) {
        // error
    });

// good
promise
    .then(function (data) { //cb
        // success
    })
    .catch(function (err) {
        // error
    });

//   第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。

// catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

// Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
// Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

// p的状态由p1、p2、p3决定，分成两种情况。
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

var prominses = [2, 2, 3, 1, 3].map((id) => {
    return getJson('/post/' + id + '.json');
})
Promise.all(prominses).then(function (posts) {

}).catch(function (reason) {
    //
});



// Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
// 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

// Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

const pq = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);
pq.then(response => console.log(response));
pq.catch(error => console.log(error));

// 上面代码中，如果5秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

// Promise.resolve 将现有对象转为Promise对象
// （1）参数是一个Promise实例

// 如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

// （2）参数是一个thenable对象

// thenable对象指的是具有then方法的对象，比如下面这个对象。
// Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
let thenable = {
    then: function (resolve, reject) {
        resolve(42);
    }
};

let po = Promise.resolve(thenable);
po.then(function (value) {
    console.log(value);
})
// thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出42。

// （3）参数不是具有then方法的对象，或根本就不是对象

// 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。
var p = Promise.resolve('Hello');

p.then(function (s) {
    console.log(s)
});
// Hello

// 上面代码生成一个新的Promise对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有then方法），返回Promise实例的状态从一生成就是Resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

// （4）不带有任何参数

// Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

// 所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。

var p = Promise.resolve();

p.then(function () {
    // ...
});

// 上面代码的变量p就是一个Promise对象。

// 需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时

setTimeout(function () {
    console.log('three');
}, 0);

Promise.resolve().then(function () {
    console.log('two');
});

console.log('one');

// one
// two
// three


// 上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。


// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
    console.log(s)
});
// 出错了

// 上面代码生成一个Promise对象的实例p，状态为rejected，回调函数会立即执行。

// 注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

const thenable1 = {
    then: function (resolve, reject) {
        reject('wrong');
    }
};
Promise.reject(thenable1)
    .catch(e => {
        console.log(e + ' -:- ' + e === thenable)
    })

// 上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。


// ES6附加方法
// done()
// Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

asyncFunc()
    .then(f1)
    .catch(r1)
    .then(f2)
    .done();


// 它的实现代码相当简单。
Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => { throw reason }, 0);
        });
};
// 从上面代码可见，done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。

// finally()
// finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

// 服务器使用Promise处理请求，然后使用finally方法关掉服务器。
server.listen(0)
    .then(function () {
        // run test
    })
    .finally(server.stop);

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
// 不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。

// 加载图片
// 我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。

const preloadImage = function (path) {
    return new Promise(function (reslove, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    })
}



// 实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。

Promise.resolve().then(f)
// 上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。

const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
// 上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。

// 那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用async函数来写。
const fx = () => console.log('now');
(async () => fx())();
console.log('next');
// now
// next
// 上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的async函数，因此如果f是同步的，就会得到同步的结果；如果f是异步的，就可以用then指定下一步，就像下面的写法。

// (async () => f())()
// .then(...)

// 需要注意的是，async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法。

// (async () => f())()
// .then(...)
// .catch(...)


// 第二种写法是使用new Promise()。

const fp = () => console.log('now');
(
    () => new Promise(
        resolve => resolve(f())
    )
)();

console.log('next');
//now next

// 上面代码也是使用立即执行的匿名函数，执行new Promise()。这种情况下，同步函数也是同步执行的。


// generator
// yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，

// var arr = [1, [[2, 3], 4], [5, 6]];
// var flat = function* (a){
//     a.forEach(function(item){
//         if(typeof item !== 'number'){
//             yield* flat(item);
//         } else {
//             yield item;
//         }
//     })
// };
// for(var f of flat(arr)){
//     console.log(f);
// }

// 上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式

// 一种修改方法是改用for循环。
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

// for (var fx of flat(arr)) {
//   console.log(fx);
// }

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {
    //   console.log('Hello' + yield); // SyntaxError
    //   console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}

// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}

// 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

// 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable] // [1, 2, 3]
// Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。

// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

function* gen() {
    // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
// 上面代码中，gen是一个 Generator 函数，调用它会生成一个遍历器对象g。它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己。

// 由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。

function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    }
}

const wrapped = wrapper(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
})
wrapped().next('hello!');


// 通过next方法的参数，向 Generator 函数内部输入值的例子
function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b


// 利用 Generator 函数和for...of循环，实现斐波那契数列的例子。
function* fib() {
    let [prev, curr] = [0, 1];
    for (; ;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fib()) {
    if (n > 1000) break;
    console.log(n);
}

// 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);
    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'jane', last: 'tom' };
for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}

// 上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。这时，我们通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。

function* objects() {
    let propKeys = object.keys(this);
    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
let jans = { first: 'jane', last: 'done' };
jans[Symbol.iterator] = objects;
for (let [key, value] of jans) {
    console.log(`${key}: ${value}`);
}


// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

function* numbers() {
    yield 1
    yield 2
    return 3
    //   yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
    console.log(n)
}
// 1
// 2


// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获', e);
    }
}

var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b


// Generator.prototype.return() § ⇧
// Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

// 上面代码中，遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。并且，Generator函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。

// 如果return方法调用时，不提供参数，则返回值的value属性为undefined。


function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return() // { value: undefined, done: true }

// 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
// 上面代码中，调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。


// yield* 表达式 
// 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v;
    }
    yield 'y';
}

for (let v of bar()) {
    console.log(v);
}
// "x"
// "a"
// "b"
// "y"



function* inner() {
    yield 'hello!';
}

function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}

var genx = outer1()
genx.next().value // "open"
genx.next().value // 返回一个遍历器对象
genx.next().value // "close"

function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
}

var genx = outer2()
genx.next().value // "open"
genx.next().value // "hello!"
genx.next().value // "close"
// 上面例子中，outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。


// yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。

function* concat(iter1, iter2) {
    yield* iter1;
    yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
    for (var value of iter1) {
        yield value;
    }
    for (var value of iter2) {
        yield value;
    }
}
// 上面代码说明，yield*后面的Generator函数（没有return语句时），不过是for...of的一种简写形式，完全可以用后者替代前者。反之，则需要用var value = yield* iterator的形式获取return语句的值。

// 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。

let read = (function* () {
    yield 'hello';
    yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"
// 上面代码中，yield表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，所以被yield*遍历。

// yield*命令可以很方便地取出嵌套数组的所有成员。

function* iterTree(tree) {
    if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
        }
    } else {
        yield tree;
    }
}
const tree = ['a', ['b', 'c'], ['d', 'e']], arrx = [];
for (let x of iterTree(tree)) {
    arrx.push(x);
}


// 使用yield*语句遍历完全二叉树。
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}
// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
    if (t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

//下面生成二叉树
function make(array) {
    //判断是否为叶子节点
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let trees = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
var res = [];
for (let node of inorder(trees)) {
    res.push(node);
}
res;


// 作为对象属性的Generator函数
// 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
let objs = {
    * myGenerator() {

    }
}
// 上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个 Generator 函数。

// 它的完整形式如下，与上面的写法是等价的。

let objx = {
    myGeneratorMethod: function* () {
        // ···
    }
};



// Generator 函数的this
// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
function* gx() { }

gx.prototype.hello = function () {
    return 'hi!';
};

let objss = gx();

objss instanceof gx // true
objss.hello() // 'hi!'


// 上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。

// function* g() {
//   this.a = 11;
// }

// let obj = g();
// obj.a // undefined
// 上面代码中，Generator函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。


// 那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？

// 下面是一个变通方法。首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。

// 一个办法就是将obj换成F.prototype。
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
var fxx = F.call(F.prototype);

fxx.next();  // Object {value: 2, done: false}
fxx.next();  // Object {value: 3, done: false}
fxx.next();  // Object {value: undefined, done: true}

fxx.a // 1
fxx.b // 2
fxx.c // 3

// 再将F改成构造函数，就可以对它执行new命令了。
function* gens() {
    this.a = a;
    yield this.b = b;
    yield this.c = c;
}
function F() {
    return gens.call(gens.prototype);
}
var fq = new F();
fq.next();  // Object {value: 2, done: false}
fq.next();  // Object {value: 3, done: false}
fq.next();  // Object {value: undefined, done: true}

fq.a // 1
fq.b // 2
fq.c // 3



// Generator 与状态机
// Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

var ticking = true;
var clock = function () {
    if (ticking)
        console.log('Tick!');
    else
        console.log('Tock!');
    ticking = !ticking;
}
// 上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

// 应用
// Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。

// （1）异步操作的同步化表达
// Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()

// 上面代码中，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

// 下面是另一个例子，通过 Generator 函数逐行读取文本文件。

function* numbers() {
    let file = new FileReader("numbers.txt");
    try {
        while (!file.eof) {
            yield parseInt(file.readLine(), 10);
        }
    } finally {
        file.close();
    }
}
// 上面代码打开文本文件，使用yield表达式可以手动逐行读取文件。


// （2）控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

step1(function (value1) {
    step2(value1, function (value2) {
        step3(value2, function (value3) {
            step4(value3, function (value4) {
                // Do something with value4
            });
        });
    });
});
// 采用 Promise 改写上面的代码。

Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
        // Do something with value4
    }, function (error) {
        // Handle any error from step1 through step4
    })
    .done();
// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。

function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        var value5 = yield step4(value4);
        // Do something with value4
    } catch (e) {
        // Handle any error from step1 through step4
    }
}
// 然后，使用一个函数，按次序自动执行所有步骤。


// （3）部署 Iterator 接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。

function* applyInter(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myobj = { foo: 2, bar: 1 };
for (let [key, value] of applyInter(myobj)) {
    console.log(key, value);
}

// JavaScript 语言的 Thunk 函数
// JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

//多参数版本readFile
fs.readFile(fileName, callback);

// Thunk版本
var thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    }
}

var readFileThunk = thunk(fileName);
readFileThunk(callback);

// 上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。
// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

//ES5版本
var thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (args) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
}

//Es6
const thunks = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

// 使用上面的转换器，生成fs.readFile的 Thunk 函数。
var readFileThunk = thunks(fs.readFile);
readFileThunk(fileA)(callback);

//简单案例
function fax(a, cb) {
    cb(a);
}
const sp = thunks(fax);
sp(1)(console.log); //1


// Thunkify 模块
// 生产环境的转换器，建议使用 Thunkify 模块。
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
});


// 首先是安装。
// $ npm install thunkify
var thunkify = require('thunkify');
var fs = require('fs');

var reads = thunkify(fs.readFile);
reads('package.json')(function (err, str) {
    // ...
});

// Thunkify 的源码与上一节那个简单的转换器非常像。
function thunkifys(fn) {
    return function () {
        var args = new Array(arguments.length);
        var ctx = this;
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        return function (done) {
            var called;
            args.push(function () {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            })
            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}


// Generator 函数的流程管理
// 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。
// Generator 函数可以自动执行。


function* gen() {
    // ...
}

var g = gen();
var res = g.next();

while (!res.done) {
    console.log(res.value);
    res = g.next();
}

// 上面代码中，Generator 函数gen会自动执行完所有步骤。

// 但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。以读取文件为例。下面的 Generator 函数封装了两个异步操作。

var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var genx = function* () {
    var r1 = yield readFileThunk('etc/fstab');
    console.log(r1.toString());
    var r2 = yield readFileThunk('etc/shells');
    console.log(r2.toString());
}

// 上面代码中，yield命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

// 这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。为了便于理解，我们先看如何手动执行上面这个 Generator 函数。

var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        g.next(data);
    })
})

// 上面代码中，变量g是 Generator 函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）。

// 仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。


// Thunk 函数的自动流程管理
// Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。

function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

function* gx() {
    // ...
}

run(gx);




// 基于 Promise 对象的自动执行
// 还是沿用上面的例子。首先，把fs模块的readFile方法包装成一个 Promise 对象。
var fs = require('fs');
var readF = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

var genss = function* () {
    var f1 = yield readF('etc/shell');
    var f2 = yield readF('etc/bat');
    console.log(f1.toString());
    console.log(f2.toString());
}

// 然后，手动执行上面的 Generator 函数。
var ggg = genss();
ggg.next().value.then(function (data) {
    ggg.next(data).value.then(function (data) {
        ggg.next();
    })
})

// 手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

function runs(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        })
    }
}
runs(genss);

// 只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。



// co 模块的源码
// co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。
// 首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
function co(gen) {
    var ctx = this;
    return new Promise(function (resolve, reject) {

    })
}

// 在返回的 Promise 对象里面，co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为resolved。

function co(gen) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
    })
}

// 接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
function co(gen) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(
                new TypeError(
                    'You may only yield a function, promise, generator, array, or object, '
                    + 'but the following object was passed: "'
                    + String(ret.value)
                    + '"'
                )
            );
        }
    })
}

// 最后，就是关键的next函数，它会反复调用自身





// async 函数是什么？一句话，它就是 Generator 函数的语法糖。


var asyncReadFile = async function () {
    var f1 = await readFile('etc/a');
    var f2 = await readFile('etc/c');
    console.log(f1.toString());
    console.log(f2.toString());
}
// （1）内置执行器。
var result = asyncReadFile();
// Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
// 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。

// （2）更好的语义。
// async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

// （3）更广的适用性。
// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

// （4）返回值是 Promise。
// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
// 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。


// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
async function getStockPricesByName(name) {
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPricesByName(symbol);
    return stockPrice;
}

getStockPricesByName('goog').then(function (result) {
    console.log('restl');
})




function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 50);


// 上面代码指定50毫秒以后，输出hello world。
// 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。


async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 50);


// async 函数有多种使用形式。


// 函数声明
async function foox() { }

// 函数表达式
const fooq = async function () { };

// 对象的方法
// let obja = { async foo() {} };
// obj.foo().then(...);

// Class 的方法
class Storage {
    constructor() {
        this.cachePromise = caches.open('avatars');
    }

    async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}

const storage = new Storage();
// storage.getAvatar('jake').then(…);

// 箭头函数
const fooqq = async () => { };


// 返回 Promise 对象
// async函数返回一个 Promise 对象。

// async函数内部return语句返回的值，会成为then方法回调函数的参数。

async function fqq() {
    return 'hello world';
}

fqq().then(v => console.log(v))
// "hello world"


// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

async function fc() {
    throw new Error('出错了');
}

fc().then(
    v => console.log(v),
    e => console.log(e)
)
// Error: 出错了


// Promise 对象的状态变化
// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"



// await 命令
// 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
async function fm() {
    return await 123;
}

fm().then(v => console.log(v))

// 上面代码中，await命令的参数是数值123，它被转成 Promise 对象，并立即resolve。
// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
async function fss() {
    await Promise.reject('出错了');
}

fss()
    .then(v => console.log(v))
    .catch(e => console.log(e))
// 出错了

// 注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。


// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。

async function anan() {
    try {
        await Promise.reject('wrong');
    } catch (e) {
        return await Promise.resolve('hello');
    }
}
anan().then(v => console.log(v));


// 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
async function ana() {
    await Promise.reject('wrong')
        .catch(e => console.log(e));
    return await Promise.resolve('hello word');
}

ana().then(v => console.log(v));


// 错误处理
// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。\
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await superagent.get('http://google.com/this-throws-an-error');
            break;
        } catch (err) { }
    }
    console.log(i); // 3
}

test();
// 上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。





// 使用注意点
// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法

async function myFunction() {
    await somethingThatReturnsAPromise()
        .catch(function (err) {
            console.log(err);
        });
};


// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

let foos = await getFoo();
let bars = await getBar();

// 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

// 写法一
let [foo1, bar1] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo2 = await fooPromise;
let bar2 = await barPromise;

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。
async function dbFunc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map(doc => db.post(doc));
    let results = await Promise.all(promises);
    console.log(result);
}

//或者如下
async function dbs(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map(doc => db.post(doc));

    let results = [];
    for (let promise of promises) {
        results.push(await prominse);
    }
    console.log(results);
}


// 与其他异步处理方法的比较
// 我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。

// 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

function checkAnimation(ele, animations) {
    //变量ret用来保存上一个动画的返回值
    var ret = null;

    //新建一个空的Promise
    var p = Promise.resolve();

    //使用then方法添加所有动画
    for (var anim of animations) {
        p = p.then(function (val) {
            ret = val;
            return anim(elem);
        })
    }

    // 返回一个部署了错误捕捉机制的Promise
    return p.catch(function (e) {
        //...
    }).then(function () {
        return ret;
    })
}

// 虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（then、catch等等），操作本身的语义反而不容易看出来。

// 接着是 Generator 函数的写法。
function chainAnimationsGenerator(elem, animations) {

    return spawn(function* () {
        var ret = null;
        try {
            for (var anim of animations) {
                ret = yield anim(elem);
            }
        } catch (e) {
            /* 忽略错误，继续执行 */
        }
        return ret;
    });

}

// 上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在spawn函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就是自动执行器，它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个 Promise。


// 最后是 async 函数的写法。
async function chainAnimationsAsync(elem, animations) {
    var ret = null;
    try {
        for (var anim of animations) {
            ret = await anim(elem);
        }
    } catch (e) {
        /* 忽略错误，继续执行 */
    }
    return ret;
}

// 可以看到Async函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将Generator写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用Generator写法，自动执行器需要用户自己提供。/



var eventUtil = {
    addHandler: function (ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, handler);
        } else {
            ele['on' + type] = handler;
        }
    },
    removeHandler: function (ele, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //阻止默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //取消事件冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}


function parseUrl(url) {
    var url = url.toString();
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        params: (function () {
            var ret = {};
            var seg = a.search.replace(/^\?/, '').split('&').filter(function (v, i) {
                if (v !== '' && v.indexOf('=')) {
                    return true;
                }
            });
            seg.forEach(function (element, index) {
                var idx = element.indexOf('=');
                var key = element.substring(0, idx);
                var value = element.substring(idx + 1);
                ret[key] = value;
            })
            return ret;
        })()
    }
}

parseUrl("https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0").params;


function indeOfString(str, b) {
    //使用正则表达式
    // var reg = new RegExp(b,"g");
    // var arr = [];
    // while(m = reg.exec(str)){
    //     arr.push(m.index)
    // }
    // return arr;
    //使用循环
    var i = -1, as = [];
    do {
        i = str.indexOf(b, i + b.length);
        if (i != -1) {
            as.push(i);
        }
    } while (i != -1)
    return as;
}
var str = "adsdsaa";
var s = "ds"
console.log(indeOfString(str, s));


function quickSorts(arr) {
    if (arr.length <= 1) return arr;
    var pid = Math.floor(arr.length / 2);
    var arPid = arr.splice(pid, 1)[0];
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > arPid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSorts(left).concat(arPid, quickSorts(right));
}

// 两个有序数组，如何将他们两个排序好的数组返回回去

var arr1 = [1, 2, 3, 6, 8, 9];
var arr2 = [2, 4, 5, 6, 7, 9, 11];
function getRes(arr1, arr2) {
    var len1 = arr1.length, len2 = arr2.length, i = 0, j = 0, k = 0;
    var res = [];
    while(i < len1 && j < len2){
        if(arr1[i] <= arr2[j]){
            res[k++] = arr1[i++];
        } else {
            res[k++] = arr2[j++];
        }
    }
    while(i < len1) res[k++] = arr1[i++];
    while(j < len2) res[k++] = arr2[j++];
    return res;
}
getRes(arr1, arr2);

//有问题的
// var arr1 = [1, 2, 3, 6, 8, 9];
// var arr2 = [2, 4, 5, 6, 7, 9, 11];
// var len1 = arr1.length - 1;
// var len2 = arr2.length - 1;
// var res = [];
// function arrRemerge(arr1, arr2, len1, len2) {
//     if (len1 >= 0 && len2 >= 0) {
//         if (arr1[len1] >= arr2[len2]) {
//             res.push(arr1[len1]);
//             len1--;
//         } else {
//             res.push(arr2[len2]);
//             len2--;
//         }
//         arrRemerge(arr1, arr2, len1, len2)
//     }
//     while(len1 < 0) res.push(arr2[len2--]);
//     while(len2 < 0) res.push(arr2[len1--]);
//     return res;
// }
// arrRemerge(arr1, arr2, len1, len2);


// 归并排序
/* 排序并合并*/
function merge(left, right) {
   var re = [];
   while(left.length > 0 && right.length > 0) {
       if(left[0] < right[0]) {
           re.push(left.shift());
       } else {
           re.push(right.shift());
       }
   }
   /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
   return re.concat(left).concat(right);
}
 
function mergeSort(array) {
   if(array.length == 1) return array;
   /* 首先将无序数组划分为两个数组 */
   var mid = Math.floor(array.length / 2);
   var left = array.slice(0, mid);
   var right = array.slice(mid);
   /* 递归分别对左右两部分数组进行排序合并 */
   return merge(mergeSort(left), mergeSort(right));
}
var a = [23, 47 ,81 ,95 ,7, 14, 39, 55, 62, 74]
alert(mergeSort(a));
