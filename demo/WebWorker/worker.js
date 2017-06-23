var i = 0;
function timeCount(){
    for(var i = 0,sum = 0;i < 100; i++ ){
        for(var j = 0; j < 100000; j++){
            sum += j;
        }
    }
    //将得到的sum发送回主线程
    postMessage(sum);
}

//将执行timedCount前的时间，通过postMessage发送回主线程
postMessage('Before' , '+ new Date()');
timeCount();
//结束timedCount后，将结束时间发送回主线程
postMessage('after' + '+new Date()');


// 上面代码执行的流程是：创建的worker对象，并用onmessage方法接收worker.js里面postMessage传递过来的数据(event.data)，并将数据追加到div#result中。


// 待worker.js中的timedCount方法运算完后，执行postMessage操作，向主线程传数据，