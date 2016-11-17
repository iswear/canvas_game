var hy = hy || {};

+function (hy, win, doc) {

    hy.extend = function (base) {
        var zero = function (config) {
            if (config) {
                this.init(config);
                this.sync();
            }
        }
        if (base) {
            zero.prototype = new base();
            zero.prototype._super_ = base.prototype;
        } else {
            zero.prototype.init = function (config) { }
            zero.prototype.sync = function () { }
        }
        return zero;
    }

}(hy, window, document);
