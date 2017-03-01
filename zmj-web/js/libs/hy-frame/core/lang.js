var hy = hy || {};

(function (hy, win, doc) {

    hy.extend = function (base) {
        var zero = function (config) {
            this.init(config);
            this.sync();
        }
        if (base) {
            zero.prototype = Object.create(base.prototype);
            zero.prototype._super_ = base.prototype;
        } else {
            zero.prototype.init = function (config) { }
            zero.prototype.sync = function () { }
        }
        return zero;
    }

})(hy, window, document);
