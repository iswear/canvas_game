var hy = hy || {};

(function (hy) {

    function loadCallBack (callBack, target, url, success) {
        if (callBack) {
            if (target) {
                callBack.call(target, url, success);
            } else {
                callBack.call(this, url, success);
            }
        }
    }

    hy.net = hy.net || {};
    hy.net.FileLoader = hy.extend(hy.Observable);
    hy.net.FileLoader.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._loadingImages = {};
        this._loadedImages = {};
        this._loadingAudios = {};
        this._loadedAudios = {};
        this._loadingVideos = {};
        this._loadedVideos = {};
    }
    hy.net.FileLoader.prototype.loadImageAsync = function (url, target, callBack) {
        if (this._loadedImages[url]) {
            return this._loadedImages[url];
        } else {
            if (!this._loadingImages[url]) {
                var $this = this;
                var image = new Image();
                image.src = url;
                this._loadingImages[url] = image;

                function loadsuccess() {
                    this.removeEventListener("load", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingImages[url];
                    $this._loadedImages[url] = image;
                    loadCallBack.call($this, callBack, target, url, true);
                }

                function loaderror() {
                    this.removeEventListener("load", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingImages[url];
                    loadCallBack.call($this, callBack, target, url, false);
                }

                image.addEventListener("load", loadsuccess, false);
                image.addEventListener("error", loaderror, false);
            }
            return null;
        }
    }
    hy.net.FileLoader.prototype.loadAudioAsync = function (url, target, callBack) {
        if (this._loadedAudios[url]) {
            return this._loadedAudios[url];
        } else {
            if (!this._loadingAudios[url]) {
                var $this = this;
                var audio = new Audio();
                audio.src = url;
                this._loadingAudios[url] = audio;

                function loadsuccess() {
                    this.removeEventListener("canplaythrough", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingAudios[url];
                    $this._loadedAudios[url] = audio;
                    loadCallBack.call($this, callBack, target, url, true);
                }

                function loaderror() {
                    this.removeEventListener("canplaythrough", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingAudios[url];
                    loadCallBack.call($this, callBack, target, url, false);
                }

                audio.addEventListener("canplaythrough", loadsuccess, false);
                audio.addEventListener("error", loaderror, false);
            }
            return null;
        }
    }
    hy.net.FileLoader.prototype.loadVideoAsync = function (url, target, callBack) {
        if (this._loadedVideos[url]) {
            return this._loadedVideos[url];
        } else {
            if (!this._loadingVideos[url]) {
                var $this = this;
                var image = new Image();
                image.src = url;
                this._loadingVideos[url] = image;

                function loadsuccess() {
                    this.removeEventListener("load", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingVideos[url];
                    $this._loadedVideos[url] = image;
                    loadCallBack.call($this, callBack, target, url, true);
                }

                function loaderror() {
                    this.removeEventListener("load", loadsuccess, false);
                    this.removeEventListener("error", loaderror, false);
                    delete $this._loadingVideos[url];
                    loadCallBack.call($this, callBack, target, url, false);
                }

                image.addEventListener("load", loadsuccess, false);
                image.addEventListener("error", loaderror, false);
            }
            return null;
        }
    }
    hy.net.FileLoader.prototype.getImage = function (url) {
        if (this._loadedImages[url]) {
            return this._loadedImages[url];
        } else {
            return null;
        }
    }
    hy.net.FileLoader.prototype.getAudio = function (url) {
        if (this._loadedAudios[url]) {
            return this._loadedAudios[url];
        } else {
            return null;
        }
    }
    hy.net.FileLoader.prototype.getVideo = function (url) {
        if (this._loadedVideos[url]) {
            return this._loadedVideos[url];
        } else {
            return null;
        }
    }
    hy.net.FileLoader.prototype.removeImage = function (url) {
        if (this._loadingImages[url]) {
            delete this._loadingImages[url];
        }
        if (this._loadedImages[url]) {
            delete this._loadedImages[url];
        }
    }
    hy.net.FileLoader.prototype.removeAudio = function (url) {
        if (this._loadingAudios[url]) {
            delete this._loadingAudios[url];
        }
        if (this._loadedAudios[url]) {
            delete this._loadedAudios[url];
        }
    }
    hy.net.FileLoader.prototype.removeVideo = function (url) {
        if (this._loadingVideos[url]) {
            delete this._loadingVideos[url];
        }
        if (this._loadedVideos[url]) {
            delete this._loadedVideos[url];
        }
    }
    hy.net.FileLoader.prototype.removeAllImages = function () {
        this._loadingImages = {};
        this._loadedImages = {};
    }
    hy.net.FileLoader.prototype.removeAllAudios = function () {
        this._loadingAudios = {};
        this._loadedAudios = {};
    }
    hy.net.FileLoader.prototype.removeAllVideos = function () {
        this._loadingVideos = {};
        this._loadedVideos = {};
    }

})(hy);
