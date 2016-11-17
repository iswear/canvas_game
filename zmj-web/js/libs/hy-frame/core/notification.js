var hy = hy || {};

+function (hy, win, doc) {

    hy.Notification = hy.extend(hy.Object);
    hy.Notification.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._observers = {};
        this._observersCount = {};
    }
    hy.Notification.prototype.addObserver = function (name, target, callBack, sender, index) {
        if (!this._observers[name]) {
            this._observers[name] = [];
            this._observersCount[name] = 0;
        }
        var index = index ? index : 0;
        var observer;
        for (var i = 0, len = this._observers[name].length; i < len; ++i) {
            observer = this._observers[name][i];
            if (observer.index > index) {
                this._observers[name].splice(i, 0, {target: target, callBack: callBack, sender: sender, index: index});
                this._observersCount[name]++;
                return;
            } else if (observer.index == index && observer.target == target && observer.callBack == callBack && observer.sender == sender) {
                if (observer.remove) {
                    delete observer.remove;
                    this._observersCount[name]++;
                }
                return;
            }
        }
        this._observers[name].push({target: target, callBack: callBack, sender: sender, index: index});
        this._observersCount[name]++;
    }
    hy.Notification.prototype.removeObserver = function (name, target, callBack, sender, index) {
        if (this._observers[name]) {
            for (var i = this._observers[name].length - 1; i >= 0; --i) {
                var observer = this._observers[name][i];
                if (observer.target == target && observer.callBack == callBack && observer.sender == sender && index == observer.index) {
                    observer.remove = true;
                    this._observersCount[name]--;
                }
            }
        }
    }
    hy.Notification.prototype.getObserversCount = function (name) {
        return this._observersCount[name];
    }
    hy.Notification.prototype.postNotification = function (name, sender, params) {
        if (this._observers[name]) {
            var observers = this._observers[name];
            var observer = null;
            params = params ? params : [];
            params.unshift(sender);
            for (var i = 0, len = observers.length; i < len; ++i) {
                observer = observers[i];
                if (observer.remove) {
                    observers.splice(i, 1);
                    --i;
                    --len;
                } else if (observer.sender || observer.sender == sender) {
                    observer.callBack.apply(observer.target, params);
                }
            }
        }
    }
    hy.Notification.prototype.purge = function () {
        this._observers = null;
        this.superCall("purge", null);
    }

}(hy, window, document);