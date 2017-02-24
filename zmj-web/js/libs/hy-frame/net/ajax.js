var hy = hy || {};

(function (hy) {


    hy.net = hy.net || {};
    hy.net.Ajax = hy.extend(hy.Object);
    hy.net.Ajax.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._URL = hy.util.dataType.isUndefined(config.URL) ? null : config.URL;
        this._args = hy.util.dataType.isUndefined(config.args) ? null : config.args;
        this._mode = hy.util.dataType.isUndefined(config.mode) ? null : config.mode;
        this._target = hy.util.dataType.isUndefined(config.target) ? null : config.target;
        this._callBack = hy.util.dataType.isUndefined(config.callBack) ? null : config.callBack;
        this._xmlHttp = new XMLHttpRequest();
    }
    hy.net.Ajax.prototype.setURL = function (URL) {
        this._URL = URL;
    }
    hy.net.Ajax.prototype.getURL = function () {
        return this._URL;
    }
    hy.net.Ajax.prototype.setArgs = function (args) {
        this._args = args;
    }
    hy.net.Ajax.prototype.getArgs = function () {
        return this._args;
    }
    hy.net.Ajax.prototype.setMode = function (mode) {
        this._mode = mode.toLowerCase();
    }
    hy.net.Ajax.prototype.getMode = function () {
        return this._mode;
    }
    hy.net.Ajax.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
    }
    hy.net.Ajax.prototype.getCallBack = function () {
        return this._callBack;
    }
    hy.net.Ajax.prototype.setTarget = function (target) {
        this._target = target;
    }
    hy.net.Ajax.prototype.getTarget = function () {
        return this._target;
    }
    hy.net.Ajax.prototype.sendSync = function () {
        if (this._URL) {
            if (this._mode == "post") {
                this._xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                this._xmlHttp.open("POST", this._url, false);
                this._xmlHttp.send(this._args);
                return this._xmlHttp;
            } else {
                this._xmlHttp.open("GET", this._url + "?" + this._args, false);
                this._xmlHttp.send();
                return this._xmlHttp;
            }
        }
    }
    hy.net.Ajax.prototype.sendAsync = function () {
        if (this._URL) {
            var $this = this;
            this._xmlHttp.onreadystatechange = function () {
                if (this.readyState == 4 && $this._callBack) {
                    $this._callBack.call($this._target, $this, this);
                }
            }
            if (this._mode == "post") {
                this._xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                this._xmlHttp.open("POST", this._url, false);
                this._xmlHttp.send(this._args);
            } else {
                this._xmlHttp.open("GET", this._url + "?" + this._args, false);
                this._xmlHttp.send();
            }
        }
    }
    hy.net.Ajax.prototype.clean = function () {
        this._callBack = null;
        this._target = null;
        this._xmlHttp.onreadystatechange = null;
        this._xmlHttp = null;
        this.superCall("clean");
    }

})(hy);