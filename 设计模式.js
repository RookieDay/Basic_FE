// 设计模式的根本原因是为了代码复用，增加可维护性。有如下原则：

// https://segmentfault.com/a/1190000004568177#articleHeader2
// http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html


// 【开闭原则】：对扩展开放，对修改关闭；
// 【里氏转换原则】：子类继承父类，单独调用完全可以运行；
// 【依赖倒转原则】：引用一个对象，如果这个对象有底层类型，直接引用底层；
// 【结构隔离原则】：每一个接口应该是一种角色；
// 【合成/聚合复用原则】：新对象应该使用一些已有的对象，使之成为新对象的一部分；
// 【迪米特原则】：一个对象应该对其它对象有尽可能少的了解；


// 单例模式
// 单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JavaScript中，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
// 单例模式作用和注意事项

// 模式作用
    // 模块间通信；
    // 系统中某个类的对象只能存在一个；
    // 保护自己的属性和方法（不受外面的干扰）；

// 注意事项：
    // 注意this的使用：随着调用不断变化，谁调用指向谁；
    // 闭包容易造成内存泄露，不需要的赶快干掉：闭包就是拿到不该拿到的东西，return；
    // 注意new的成本。（继承）

var SingletonTester = (function () {

    //参数：传递给单例的一个参数集合
    function Singleton(args) {
        //设置args变量为接收的参数或者为空（如果没有提供的话）
        var args = args || {};
        //设置name参数
        this.name = 'SingletonTester';
        //设置pointX的值
        this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
        //设置pointY的值
        this.pointY = args.pointY || 10;
    }

    //实例容器
    var instance;

    return {
        name: 'SingletonTester',
        //获取实例的方法
        //返回Singleton的实例
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    }
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX); // 输出 5 




// 构造函数模式:
// 构造模式作用和注意事项

// 模式作用：
    // 用于创建特点类型的对象：给某一个人
    // 第一次声明的时候给对象赋值；
    // 自己声明构造函数，赋予属性和方法；（告诉别人自己想要怎么样的门。）

// 注意事项
    // 声明函数时候处理业务逻辑；
    // 区分和单例的区别，配合单例实现初始化；
    // 构造函数大写字母开头（推荐~）
    // 注意new的成本。（继承）（相同的尽量放在原型链上）
function Car(model, year, miles) {
    // if(!this instanceof Car){
    //     return new Car(model,year,miles);
    // } 这里有需要的话可以强制使用new 就是下面的第二种运行情况
    this.model = model;
    this.year = year;
    this.miles = miles;
}

/*
注意：这里我们使用了Object.prototype.方法名，而不是Object.prototype
主要是用来避免重写定义原型prototype对象
*/
Car.prototype.output= function () {
    return this.model + "走了" + this.miles + "公里";
};

var tom = new Car("大叔", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);


// PS1：这个地方还有两种调用方式
//方法1：作为函数调用
Car("大叔", 2009, 20000);  //添加到window对象上 
console.log(window.output());

//方法2：在另外一个对象的作用域内调用
var o = new Object();
Car.call(o, "Dudu", 2010, 5000);
console.log(o.output()); 

//PS2: 需要注意的地方
// 使用原始包装函数
var s = new String("my string");
var n = new Number(101);
var b = new Boolean(true);

// 推荐这种
var s = "my string";
var n = 101;
var b = true;

// 只有在想保留数值状态的时候使用这些包装函数 number, string, boolean
// 原始string
var greet = "Hello there";
// 使用split()方法分割
greet.split(' ')[0]; // "Hello"
// 给原始类型添加新属性不会报错
greet.smile = true;
// 单没法获取这个值（18章ECMAScript实现里我们讲了为什么）
console.log(typeof greet.smile); // "undefined"

// 原始string
var greet = new String("Hello there");
// 使用split()方法分割
greet.split(' ')[0]; // "Hello"
// 给包装函数类型添加新属性不会报错
greet.smile = true;
// 可以正常访问新属性
console.log(typeof greet.smile); // "boolean"




//建造者模式
// 将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。主要解决在软件系统中，有时候面临着"一个复杂对象"的创建工作，由于需求的变化，这个复杂对象的某些部分经常面临着剧烈的变化，一些基本部件不会变。所以需要将变与不变分离。与抽象工厂的区别：在建造者模式里，有个指导者(Director)，由指导者来管理建造者，用户是与指导者联系的，指导者联系建造者最后得到产品。即建造者模式可以强制实行一种分步骤进行的建造过程。

// 建造者模式四要素
// 1.产品类Product：一般是一个较为复杂的对象，也就是说创建对象的过程比较复杂，一般会有比较多的代码量。
// 2.抽象建造者类Builder: 将建造的具体过程交与它的子类来实现，这样更容易扩展。
// 3.建造者类ConcreteBuilder: 组建产品；返回组建好的产品。
// 4.指导类Director: 负责调用适当的建造者来组建产品，指导类一般不与产品类发生依赖关系，与指导类直接交互的是建造者类


// 建造者模式优点
// https://my.oschina.net/wyc1219/blog/830331
// http://blog.csdn.net/u013072064/article/details/48159757
// 1.建造者模式的封装性很好。使用建造者模式可以有效的封装变化，在使用建造者模式的场景中，一般产品类和建造者类是比较稳定的，因此，将主要的业务逻辑封装在指导者类中对整体而言可以取得比较好的稳定性。2.建造者模式很容易进行扩展。如果有新的需求，通过实现一个新的建造者类就可以完成。


// 举个例子：前面你创建了一个生产保时捷的工厂，生产一台保时捷911需要的主要部件都一样(引擎，轮子，方向盘...)和流程是不变的，变的是引擎，轮子，控制系统等等部件具体实现，这些部件的生产交由具体的builder去生产。


// 建造者模式作用和注意事项
// 模式作用：
    // 分布构建一个复杂的对象（包工头对工人，工人对房子）；
    // 解耦封装过程和具体构建的组件；
    // 无需关心组件如何组装；
    // 各司其职，拆解流程；

// 注意事项：
    // 一定要有一个稳定的算法进行支持（合同）；
    // 加工工艺是暴露的（可以直接找工人，但是包工头更熟悉）

// <!--工作流程：白富美盖房子->包工头->工人->房子   -->   语义化写法
//发生一个请求 白富美  
    //建造者模式 包工头  
    //完整的工程 工人  
  
//    1.产出的东西是房子  
//    2.baogongtou调用工人进行开工 而且他要很清楚工人们具体的某一个大项  
//    3.工人是盖房子 工人可以建卧室，客厅，厨房  
//    4.包工头只是一个借口而已 他不干活 他只对外说我能盖房子  
    // function Fangzi(){  
    //     this.woshi="";  
    //     this.keting="";  
    //     this.chufang="";  
    // }  
  
    // function Baogongtou(){  
    //     this.gaifangzi=function(gongren){  
    //         gongren.jian_woshi();  
    //         gongren.jian_keting();  
    //         gongren.jian_chufang();  
    //     }  
    // }  
  
    // function Gongren(){  
    //     this.jian_woshi=function(){  
    //         //console.log('卧室我盖好了');  
    //         alert('卧室我盖好了');  
    //     }  
    //     this.jian_keting=function(){  
    //         alert('客厅我盖好了');  
    //     }  
    //     this.jian_chufang=function(){  
    //         alert('厨房我盖好了');  
    //     }  
    //     this.jiaogong=function(){  
    //         var _fangzi=new Fangzi();  
    //         _fangzi.woshi="ok";  
    //         _fangzi.keting="ok";  
    //         _fangzi.chufang="ok";  
    //         return _fangzi;  
    //     }  
    // }  
    // var gongren=new Gongren;  
    // var baogongtou=new Baogongtou(gongren);  
    // baogongtou.gaifangzi(gongren);  
    //主人要房子  
    // var myfangzi=gongren.jiaogong();  
    // console.log(myfangzi);  

// 专有名词写法
//产品类 我们的房子结构
function Product(){  
    this.woshi="";  
    this.keting="";  
    this.chufang="";  
}  

//指挥者类 调用工人进行开工 而且他要很清楚工人们具体的某一个大项  
function Director(){  
    this.startWork=function(worker){  
        worker.jian_woshi();  
        worker.jian_keting();  
        worker.jian_chufang();  
    }  
}  
  
//工程师 建造者类 工人干的活 
function Worker(){  
    this.jian_woshi=function(){    
        console.log('卧室我盖好了');  
    }  
    this.jian_keting=function(){  
        console.log('客厅我盖好了');  
    }  
    this.jian_chufang=function(){  
        console.log('厨房我盖好了');  
    }  
    //最后完成的房子任务
    this.done=function(){  
        var _Product=new Product();  
        _Product.woshi="ok";  
        _Product.keting="ok";  
        _Product.chufang="ok"; 
        console.log('done') 
        return _Product;  
    }  
}  

var worker=new Worker;  
var director=new Director(worker);  
director.startWork(worker);  
//主人要房子  
var myProduct=worker.done();  
console.log(myProduct);  



// 工厂模式
// 工厂模式定义了一个用于创建对象的接口，这个接口决定了实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型（抽象工厂）。（简单工厂：能找到具体细节）；抽象工厂只留口，不做事，留给外界覆盖；
// 这个模式十分有用，尤其是创建对象的流程赋值的时候，比如依赖于很多设置文件等。并且，会经常在程序里看到工厂方法，用于让子类定义需要创建的对象类型。
// 简单工厂模式：使用一个类（通常为单体）来生成实例。
// 复杂工厂模式：使用子类来决定一个成员变量应该是哪个具体的类的实例。

// 工厂模式的作用和注意事项
// 作用：
// 对象的构建十分复杂；
// 需要依赖具体的环境创建不同实例；
// 处理大量具有相同属性的小对象；

// 注意事项：
// 不能滥用工厂，有时候仅仅是给代码增加复杂度；


var BicycleFactory = {
    createBicycle : function( model ){
        var bicycle;
        switch( model ){
            case "The Speedster":
                bicycle = new Speedster();
                break;
            case "The Lowrider":
                bicycle = new Lowrider();
                break;
            case "The Cruiser":
            default:
                bicycle = new Cruiser();
                break;
        }
        return bycicle;
    }
}

// BicycleFactory 是一个脱离于BicycleShop的单体。降低耦合度的效果显而易见。当需要添加新的类型的时候，不需要动 BicycleShop 只需修改工厂单体对象就可以。

var BicycleShop = function(){};

BicycleShop.prototype = {
    sellBicycle : function( model ){
        var bicycle = BicycleFactory.createBicycle(model);     
        return bicycle;
    }
}


// 工厂模式：
// 真正的工厂模式与简单工厂模式相比，主要区别就是它不是另外使用一个对象或者类来创建实例（自行车），而是使用一个子类。工厂是一个将其成员对象的实例化推迟到子类中进行的类。

// 比如加入BicycleShop可以决定从那一家厂商进行进货，那么简单的一个BicycleFactory是不够了的，因为各个厂商会各自生产不同的Speedster，Lowrider，Cruiser等型号自行车，所以首先需要生成各自厂商的shop实例，不同厂商的shop实例拥有不同的生成几个型号自行车的方法。
// 也就是相当于将自行车对象的实例化推迟到了shop实例中产生。
// 基础：
var BicycleShop = function(){}
BicycleShop.prototype={
    sellBicycle: function( model ){
        var bicycle = this.createBicycle( model );
        return bicycle;
    },
    createBicycle: function( model ){
        throw new Error( " Unsupported " );
    }
}

// 各自厂商：
var AcmeBicycleShop = function(){};

extend( AcmeBicycleShop , BicycleShop );
AcmeBicycleShop.prototype.createBicycle = function( model ){
    var bicycle;
    switch( model ){
        case "The Speedster":
            bicycle = new AcmeSpeedster();
            break;
        case "The Lowrider":
            bicycle = new AcmeLowrider();
            break;
        case "The Cruiser":
        default:
            bicycle = new AcmeCruiser();
            break;
    }
    return bicycle;
}

var GeneralBicycleShop = function(){};

extend( GeneralBicycleShop , BicycleShop );
GeneralBicycleShop.prototype.createBicycle = function( model ){
//    ...
}


// 当然，你也可以对于外层生成的子类实例在使用简单工厂模式进行包装一下~对于添加其他厂商也很简单，在创建一个Bicycle的子类重新定义其createBicycle的工厂方法即可。

// 工厂模式使用场合

// 动态实现 例如自行车的例子，创建一些用不同方式实现统一接口的对象，那么可以使用一个工厂方法或者简单工厂对象来简化实现过程。选择可以是明确进行的也可以是隐含的。
// 节省设置开销 如果对象要进行复杂的并且彼此相关的设置的时候，那么工厂模式可以很显著的减少每种对象的代码量。将特定的设置代码提取出来会使得代码有极大地提升。并且能优化结构便于维护。
// 用于许多小型对象组成一个大对象。
// 工厂模式之利 主要好处就是可以消除对象间的耦合，通过使用工程方法而不是new关键字。将所有实例化的代码集中在一个位子防止代码重复。
// 工厂模式之弊 大多数类最好使用new关键字和构造函数，可以让代码更加简单易读。而不必去查看工厂方法来知道。

var page = page || {};
page.dom = page.dom || {};
//子函数1：处理文本
page.dom.Text = function () {
    this.insert = function (where) {
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    };
};

//子函数2：处理链接
page.dom.Link = function () {
    this.insert = function (where) {
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    };
};

//子函数3：处理图片
page.dom.Image = function () {
    this.insert = function (where) {
        var im = document.createElement('img');
        im.src = this.url;
        where.appendChild(im);
    };
};


page.dom.factory = function (type) {
    return new page.dom[type];
}


var o = page.dom.factory('Link');
o.url = 'http://www.cnblogs.com';
o.insert(document.body);


// 代理模式
// 代理模式概念解读

// 代理模式文字解读

// 代理：顾名思义就是帮组别人做事，GoF对代理模式的定义如下：
// 代理模式（Proxy），为其它对象提供一种代理以控制对这个对象的访问。代理模式是的代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。

// 代理模式作用和注意点

// 模式作用：
//     远程代理（一个对象将不同空间的对象进行局部代理）；
//     虚拟代理（根据需要创建开销很大的对象如渲染网页暂时用占位符替代真图）；
//     安全代理（控制真实对象的访问权限）；
//     智能指引（调用对象代理处理另外一些事情如垃圾回收机制）；

// 注意事项：
//     不能滥用代理，有时候仅仅是给代码增加复杂度；



// 代理模式的一个好处就是对外部提供统一的接口方法，而代理类在接口中实现对真实类的附加操作行为，从而可以在不影响外部调用情况下，进行系统扩展。也就是说，我要修改真实角色的操作的时候，尽量不要修改他，而是在外部在“包”一层进行附加行为，即代理类。

// 代理模式使用场景

// 当我们需要使用的对象很复杂或者需要很长时间去构造，这时就可以使用代理模式(Proxy)。例如：如果构建一个对象很耗费时间和计算机资源，代理模式(Proxy)允许我们控制这种情况，直到我们需要使用实际的对象。一个代理(Proxy)通常包含和将要使用的对象同样的方法，一旦开始使用这个对象，这些方法将通过代理(Proxy)传递给实际的对象。 一些可以使用代理模式(Proxy)的情况：
// 一个对象，比如一幅很大的图像，需要载入的时间很长。
// 一个需要很长时间才可以完成的计算结果，并且需要在它计算过程中显示中间结果
// 一个存在于远程计算机上的对象，需要通过网络载入这个远程对象则需要很长时间，特别是在网络传输高峰期。
// 一个对象只有有限的访问权限，代理模式(Proxy)可以验证用户的权限

// 假如dudu要送酸奶小妹玫瑰花，却不知道她的联系方式或者不好意思，想委托大叔去送这些玫瑰，那大叔就是个代理（其实挺好的，可以扣几朵给媳妇），那我们如何来做呢？
var girl = function(name){
    this.name = name;
}

var dudu = function(girl){
    this.girl = girl;
    this.sendGit = function(Git){
        alert('hi' + girl.name + 'send' + Git);
    }
}

//代理
var proxtTom = function(girl){
    this.girl = girl;
    this.sendGit = function(gift){
        (new dudu(girl)).sendGit(git);
    }
}

var proxy = new proxtTom(new girl('ana'));
proxy.sendGit('999 rose');