### index1 圣杯布局
html代码中  middle部分首先要放在container的最前部分。然后是left,right

1.将三者都 float:left , 再加上一个position:relative (因为相对定位后面会用到）

2.middle部分 width:100%占满

3.此时middle占满了，所以要把left拉到最左边，使用margin-left:-100%

4.这时left拉回来了，但会覆盖middle内容的左端，要把middle内容拉出来，所以在外围container加上 padding:0 220px 0 200px

5.middle内容拉回来了，但left也跟着过来了，所以要还原，就对left使用相对定位 left:-200px  同理，right也要相对定位还原 right:-220px

6.到这里大概就自适应好了。如果想container高度保持一致可以给left middle right都加上min-height:130px

不过衰衰地发现ie中有问题.. ie6/7/8/9中 下面的空白高度都不一样..

当然，为了保证窗口不能缩太小无法展示左右，可以给body加上 min-width


### index2 双飞翼布局
听说双飞翼布局是玉伯大大提出来的，始于淘宝UED

如果把三栏布局比作一只大鸟，可以把main看成是鸟的身体，sub和extra则是鸟的翅膀。这个布局的实现思路是，先把最重要的身体部分放好，然后再将翅膀移动到适当的地方.

其实跟上边的圣杯布局差不多的，当然也可以改动一下（自己想想有哪些不同吧）

恩，这里有一只鸟~

左翅sub有200px,右翅extra..220px.. 身体main自适应未知

1.html代码中，main要放最前边，sub  extra

2.将main  sub  extra 都float:left

3.将main占满 width:100%

4.此时main占满了，所以要把sub拉到最左边，使用margin-left:-100%  同理 extra使用margin-left:-220px

（这时可以直接继续上边圣杯布局的步骤，也可以有所改动）

5.main内容被覆盖了吧，除了使用外围的padding，还可以考虑使用margin。

给main增加一个内层div-- main-inner, 然后margin:0 220px 0 200px

6.main正确展示