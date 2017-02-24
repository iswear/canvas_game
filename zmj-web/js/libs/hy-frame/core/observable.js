var hy = hy || {};

(function (hy) {

    hy.Observable = hy.extend(hy.Object);
    hy.Observable.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._localNotification = new hy.Notification({});
    }
    hy.Observable.prototype.addObserver = function (name, target, callBack, index) {
        this._localNotification.addObserver(name, target, callBack, this, index);
    }
    hy.Observable.prototype.removeObserver = function (name, target, callBack, index) {
        this._localNotification.removeObserver(name, target, callBack, this, index);
    }
    hy.Observable.prototype.postNotification = function (name, params) {
        this._localNotification.postNotification(name, this, params);
    }
    hy.Observable.prototype.getObserversCount = function (name) {
        return this._localNotification.getObserversCount(name);
    }
    hy.Observable.prototype.purge = function () {
        this._localNotification.purge();
        this._localNotification = null;
        this.superCall("purge", null);
    }

})(hy);
