function thunk(fn) {
    return function () {
        //保存当前传入的参数
        var args = Array.prototype.slice.call(arguments);
        //当前this
        var ctx = this;
        return function (done) {
            var called;
            args.push(function () {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            })
            try {
                fn.apply(ctx, args);
            } catch (error) {
                done(error);
            }
        }
    }
}

function f(a, b, callback) {
    var sum = a + b;
    callback(sum);
    callback(sum);
}

var ft = thunk(f);
ft(1, 2)(console.log)