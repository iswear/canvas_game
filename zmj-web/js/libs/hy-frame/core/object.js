var hy = hy || {};

(function (hy, win, doc) {

    hy.Object = hy.extend(null);
    hy.Object.prototype.superCall = function (funName, args) {
        if (arguments.length == 1 || !args) {
            args = [];
        }
        var runflag = false;
        var retValue;
        if (this._assSuper_ == null) {
            this._assSuper_ = {};
        }
        if (this._assPreSuper_ == null) {
            this._assPreSuper_ = {};
        }
        while (!runflag) {
            if (!this._assSuper_[funName]) {
                if (this._super_) {
                    this._assPreSuper_[funName] = this;
                    this._assSuper_[funName] = this._super_;
                }
            } else {
                if (this._assPreSuper_[funName]._super_) {
                    this._assPreSuper_[funName] = this._assPreSuper_[funName]._super_;
                } else {
                    this._assPreSuper_[funName] = null;
                }
                if (this._assSuper_[funName]._super_) {
                    this._assSuper_[funName] = this._assSuper_[funName]._super_;
                } else {
                    this._assSuper_[funName] = null;
                }
            }
            var preSuper = this._assPreSuper_[funName];
            var tempSuper = this._assSuper_[funName];
            if (tempSuper && tempSuper[funName]) {
                if (!(preSuper && preSuper[funName] && preSuper[funName] == tempSuper[funName])) {
                    retValue = tempSuper[funName].apply(this, args);
                    runflag = true;
                }
            } else {
                runflag = true;
            }
        }
        this._assSuper_[funName] = null;
        return retValue;
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