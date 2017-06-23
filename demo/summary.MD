### 浏览器存储及使用
[http://www.admin10000.com/document/9261.html](存储方案)
Cookie 
  4096字节；缺点：存储量小，请求头附带cookie带来性能问题。 
* Flash Share Object 
  默认支持100k，跨浏览器存储最好的方式，毕竟现在没有安装flash插件的用户是很少的； 
  缺点：需要加载一个swf文件，个别用户不支持flash。 
* IE的 UserData 
  最少也能支持640k，IE8后已经支持DOM Storage；缺点：IE only。 
* DOM Storage 
  默认支持5M存储量；缺点：IE7，IE6不支持。 
* Google Gears 
  功能最强；缺点：但需要安装软件，而且，安装的用户是较少的。 



1.Cookie

Cookie是一个用户通过浏览器浏览网站产出的信息的票根，Cookies通常被用来标示一个网站用户的浏览经历，它可能包含这个用户的个人偏好或访问这个网站的一些输入信息。用户可以自己随意操作他们浏览器中的Cookie。
Cookies 可以通过服务端使用 Set-Cookie Http header来设置和修改，当然也可以使用javascript的document.cookie去操作
```
//读取网站下所有的cookie信息，获取的结果是一个以分号;作为分割的一个字符串
var allCookies = document.cookie;
//例如：在百度首页，获取的如下
// "BAIDUID=B32F2BF6BCB66D5559E199F5B1908F4C:FG=1; PSTM=1444711125; BIDUPSID=9DE77BD4B191F421CA54DB11C954067A; ispeed_lsm=0; MCITY=-289%3A; BDSFRCVID=hWtsJeC62Ag8XZc4Nvqo2MixJD2vkWoTH6aoB7vKuwGS_LREoJS6EG0PtvlQpYD-KiV2ogKK0eOTHvvP; H_BDCLCKID_SF=JbADoDD-JCvbfP0kKtr_MJQH-UnLq-vUbT7Z0l8KtqjJbMnL-TOF5R_eD4c0hUTRtjcW-b7mWIQHDp_65xRh5U-9BPvN04RZLbc4KKJxbPQSVtJXQKcvMq5XhUJiB5O-Ban7LtQxfJOKHICRe5-ajxK; BD_CK_SAM=1; locale=zh; BD_HOME=0; H_PS_PSSID=1455_18241_18559_17000_15227_11651; BD_UPN=123253"

//往原来的已经存在的cookie中加入新的cookie
document.cookie ="test=yui";

//当然也可以在后面加上可选择的选项键值对，例如domain，以及其他path，expires
document.cookie="test=yui;domain=.baidu.com"

//删除cookie，就是让这个cookie值得expires过，就是设置这个expires为0
document.cookie="test=yui;domain=.baidu.com;expires=0");
```


2.Web Storage

Web Storage有两种机制，分别为sessionStorage和localStorage。
sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage是一种半持久化的本地存储（会话级别的存储），而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

这两个对象，对外的方法主要有: setItem，getItem，以键值对的形式存储和读取，key按照索引获取当前存储的key值，找不到时返回null，length属性代表当前存储的key，value对数



#### cookie 是怎么工作的？
首先必须明确一点，存储cookie是浏览器提供的功能。cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的cookie。

当网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。这个特点很重要，因为这关系到“什么样的数据适合存储在cookie中”。

存储在cookie中的数据，每次都会被浏览器自动放在http请求中，如果这些数据并不是每个请求都需要发给服务端的数据，浏览器这设置自动处理无疑增加了网络开销；但如果这些数据是每个请求都需要发给服务端的数据（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。所以对于那设置“每次请求都要携带的信息（最典型的就是身份认证信息）”就特别适合放在cookie中，其他类型的数据就不适合了。

但在 localStorage 出现之前，cookie被滥用当做了存储工具。什么数据都放在cookie中，即使这些数据只在页面中使用而不需要随请求传送到服务端。当然cookie标准还是做了一些限制的：每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个（但很多浏览器厂商在具体实现时支持大于20个）。

#### cookie 的格式
document.cookie
JS 原生的 API提供了获取cookie的方法：document.cookie（注意，这个方法只能获取非 HttpOnly 类型的cookie）。在 console 中执行这段代码可以看到结果如下图：
打印出的结果是一个字符串类型，因为cookie本身就是存储在浏览器中的字符串。但这个字符串是有格式的，由键值对 key=value构成，键值对之间由一个分号和一个空格隔开。

cookie 的属性选项
每个cookie都有一定的属性，如什么时候失效，要发送到哪个域名，哪个路径等等。这些属性是通过cookie选项来设置的，cookie选项包括：expires、domain、path、secure、HttpOnly。在设置任一个cookie时都可以设置相关的这些属性，当然也可以不设置，这时会使用这些属性的默认值。在设置这些属性时，属性之间由一个分号和一个空格隔开。代码示例如下：
```
"key=name; expires=Thu, 25 Feb 2016 04:18:00 GMT; domain=ppsc.sankuai.com; path=/; secure; HttpOnly"
```

expires

expires选项用来设置“cookie 什么时间内有效”。expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过 new Date().toGMTString()或者 new Date().toUTCString() 来获得）。

如expires=Thu, 25 Feb 2016 04:18:00 GMT表示cookie讲在2016年2月25日4:18分之后失效，对于失效的cookie浏览器会清空。如果没有设置该选项，则默认有效期为session，即会话cookie。这种cookie在浏览器关闭后就没有了。

expires 是 http/1.0协议中的选项，在新的http/1.1协议中expires已经由 max-age 选项代替，两者的作用都是限制cookie 的有效时间。expires的值是一个时间点（cookie失效时刻= expires），而max-age 的值是一个以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）。
另外，max-age 的默认值是 -1(即有效期为 session )；若max-age有三种可能值：负数、0、正数。负数：有效期session；0：删除cookie；正数：有效期为创建时刻+ max-age

domain 和 path

domain是域名，path是路径，两者加起来就构成了 URL，domain和path一起来限制 cookie 能被哪些 URL 访问。

一句话概括：某cookie的 domain为“baidu.com”, path为“/ ”，若请求的URL(URL 可以是js/html/img/css资源请求，但不包括 XHR 请求)的域名是“baidu.com”或其子域如“api.baidu.com”、“dev.api.baidu.com”，且 URL 的路径是“/ ”或子路径“/home”、“/home/login”，则浏览器会将此 cookie 添加到该请求的 cookie 头部中。

所以domain和path2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。如果没有设置这两个选项，则会使用默认值。domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。

特别说明1：
发生跨域xhr请求时，即使请求URL的域名和路径都满足 cookie 的 domain 和 path，默认情况下cookie也不会自动被添加到请求头部中。若想知道原因请阅读本文最后一节）

特别说明2：
domain是可以设置为页面本身的域名（本域），或页面本身域名的父域，但不能是公共后缀 public suffix。举例说明下：如果页面域名为 www.baidu.com, domain可以设置为“www.baidu.com”，也可以设置为“baidu.com”，但不能设置为“.com”或“com”。
secure

secure选项用来设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie 才能被发送至服务器。

默认情况下，cookie不会带secure选项(即为空)。所以默认情况下，不管是HTTPS协议还是HTTP协议的请求，cookie 都会被发送至服务端。但要注意一点，secure选项只是限定了在安全情况下才可以传输给服务端，但并不代表你不能看到这个 cookie。

下面我们设置一个 secure类型的 cookie：

document.cookie = "name=huang; secure";

httpOnly

这个选项用来设置cookie是否能通过 js 去访问。默认情况下，cookie不会带httpOnly选项(即为空)，所以默认情况下，客户端是可以通过js代码去访问（包括读取、修改、删除等）这个cookie的。当cookie带httpOnly选项时，客户端则无法通过js代码去访问（包括读取、修改、删除等）这个cookie。

在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。

凡是httpOnly类型的cookie，其 HTTP 一列都会打上√，如上图中的PA_VTIME。你通过document.cookie是不能获取的，也不能修改PA_VTIME的。

——httpOnly与安全

从上面介绍中，大家是否会有这样的疑问：为什么我们要限制客户端去访问cookie？其实这样做是为了保障安全。

试想：如果任何 cookie 都能被客户端通过document.cookie获取会发生什么可怕的事情。当我们的网页遭受了 XSS 攻击，有一段恶意的script脚本插到了网页中。这段script脚本做的事情是：通过document.cookie读取了用户身份验证相关的 cookie，并将这些 cookie 发送到了攻击者的服务器。攻击者轻而易举就拿到了用户身份验证信息，于是就可以摇摇大摆地冒充此用户访问你的服务器了（因为攻击者有合法的用户身份验证信息，所以会通过你服务器的验证）。

如何设置 cookie？
知道了cookie的格式，cookie的属性选项，接下来我们就可以设置cookie了。首先得明确一点：cookie既可以由服务端来设置，也可以由客户端来设置。

服务端设置 cookie
不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。而response header中有一项叫set-cookie，是服务端专门用来设置cookie的。如下图所示，服务端返回的response header中有5个set-cookie字段，每个字段对应一个cookie（注意不能将多个cookie放在一个set-cookie字段中），set-cookie字段的值就是普通的字符串，每个cookie还设置了相关属性选项。


注意：

一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。
服务端可以设置cookie 的所有选项：expires、domain、path、secure、HttpOnly
客户端设置 cookie
在网页即客户端中我们也可以通过js代码来设置cookie。如我当前打开的网址为http://dxw.st.sankuai.com/mp/，在控制台中我们执行了下面代码：

document.cookie = "name=Jonh; ";
查看浏览器 cookie 面板如下图所示，cookie确实设置成功了，而且属性选项 domain、path、expires都用了默认值。


再执行下面代码：

document.cookie="age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";
查看浏览器cookie 面板，如下图所示，新的cookie设置成功了，而且属性选项 domain、path、expires都变成了设定的值

注意：

客户端可以设置cookie 的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项。
用 js 如何设置多个 cookie

当要设置多个cookie时， js 代码很自然地我们会这么写：

document.cookie = "name=Jonh; age=12; class=111";
但你会发现这样写只是添加了第一个cookie“name=John”，后面的所有cookie都没有添加成功。所以最简单的设置多个cookie的方法就在重复执行document.cookie = "key=name"，如下：

document.cookie = "name=Jonh";
document.cookie = "age=12";
document.cookie = "class=111";


如何修改、删除
修改 cookie
要想修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新cookie时，path/domain这几个选项一定要旧cookie 保持一样。否则不会修改旧值，而是添加了一个新的 cookie。

删除 cookie
删除一个cookie 也挺简单，也是重新赋值，只要将这个新cookie的expires 选项设置为一个过去的时间点就行了。但同样要注意，path/domain/这几个选项一定要旧cookie 保持一样。

cookie 编码
cookie其实是个字符串，但这个字符串中逗号、分号、空格被当做了特殊符号。所以当cookie的 key 和 value 中含有这3个特殊字符时，需要对其进行额外编码，一般会用escape进行编码，读取时用unescape进行解码；当然也可以用encodeURIComponent/decodeURIComponent或者encodeURI/decodeURI（三者的区别可以参考这篇文章）。

var key = escape("name;value");
var value = escape("this is a value contain , and ;");
document.cookie= key + "=" + value + "; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";
跨域请求中 cookie
之前在介绍 XHR 的一篇文章里面提过：默认情况下，在发生跨域时，cookie 作为一种 credential 信息是不会被传送到服务端的。必须要进行额外设置才可以。具体原因和如何设置可以参考我的这篇文章：你真的会使用XMLHttpRequest吗？

另外，关于跨域资源共享 CORS极力推荐大家阅读阮一峰老师的这篇 跨域资源共享 CORS 详解。

其他补充
什么时候 cookie 会被覆盖：name/domain/path 这3个字段都相同的时候；
关于domain的补充说明（参考1/参考2）：
如果显式设置了 domain，则设置成什么，浏览器就存成什么；但如果没有显式设置，则浏览器会自动取 url 的 host 作为 domain 值；
新的规范中，显式设置 domain 时，如果 value 最前面带点，则浏览器处理时会将这个点去掉，所以最后浏览器存的就是没有点的（注意：但目前大多数浏览器并未全部这么实现）
前面带点‘.’和不带点‘.’有啥区别：
带点：任何 subdomain 都可以访问，包括父 domain
不带点：只有完全一样的域名才能访问，subdomain 不能（但在 IE 下比较特殊，它支持 subdomain 访问）

