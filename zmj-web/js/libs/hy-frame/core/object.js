var hy = hy || {};

(function (hy, win, doc) {

    hy.Object = hy.extend(null);
    hy.Object.prototype.superCall = function (funName, args) {
        if (arguments.length == 1 || !args) {
            args = [];
        }
        var that = this.__super_ ? this.__super_ : this;
        var prototype = that._super_;
        var ret = undefined;
        while (typeof prototype[funName] === 'function') {
            if (that[funName] === prototype[funName]) {
                prototype = prototype._super_;
                continue;
            } else {
                this.__super_ = prototype;
                ret = prototype[funName].apply(this, args);
                break;
            }
        }
        this.__super_ = null;
        return ret;
    }
    hy.Object.prototype.init = function (config) {
        this.superCall("init", [config])
        this._userProperty = {};
    }
    hy.Object.prototype.getUserProperty = function (key) {
        return this._userProperty[key];
    }
    hy.Object.prototype.setUserProperty = function (key, value) {
        this._userProperty[key] = value;
    }
    hy.Object.prototype.removeUserProperty = function (key) {
        delete this._userProperty[key];
    }
    hy.Object.prototype.purge = function () {
        this._userProperty = null;
    }

})(hy, window, document);