var hy = hy || {};

+function (hy, win, doc) {

    function paintImageViewImgSubFun (dc, zone, image, srcX, srcY, srcWidth, srcHeight) {
        var width = zone.width;
        var height = zone.height;
        switch (this._mirror) {
            case hy.gui.MIRROR_X: {
                dc.pushTransform(0, 0, -1, 1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX - width, zone.minY, width, height);
                dc.popTransform();
                break;
            }
            case hy.gui.MIRROR_Y: {
                dc.pushTransform(0, 0, 1, -1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX, zone.minY - height, width, height);
                dc.popTransform();
                break;
            }
            case hy.gui.MIRROR_BOTH: {
                dc.pushTransform(0, 0, -1, -1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX - width, zone.minY - height, width, height);
                dc.popTransform();
                break;
            }
            default : {
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX, zone.minY, width, height);
                break;
            }
        }
    }

    function paintImageViewImg (sender, dc, zone) {
        if (this._image != null) {
            var app = this.getApplication();
            if (app) {
                var loader = app.getFileLoader();
                if (typeof(this._image) == "string") {
                    var image = loader.getImage(this._image);
                    if (image) {
                        paintImageViewImgSubFun.call(this, dc, zone, image, 0, 0, image.width, image.height);
                    } else {
                        loader.loadImageAsync(this._image, this, loadImageViewImgCB);
                    }
                } else {
                    var image = loader.getImage(this._image.URL);
                    if (image) {
                        paintImageViewImgSubFun.call(this, dc, zone, image, this._image.srcX, this._image.srcY, this._image.srcWidth, this._image.srcHeight);
                    } else {
                        loader.loadImageAsync(this._image, this, loadImageViewImgCB);
                    }
                }
            }
        }
    }

    function loadImageViewImgCB (url, success) {
        if (success) {
            this.refresh();
        } else {
            this._image = null;
        }
    }

    hy.gui = hy.gui || {};
    hy.gui.ImageView = hy.extend(hy.gui.View);
    hy.gui.ImageView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._image = hy.util.dataType.isUndefined(config.image) ? null : config.image;
        this._mirror = hy.util.dataType.isUndefined(config.mirror) ? hy.gui.MIRROR_NONE : config.mirror;
        this.addObserver(hy.event.name.PAINT, this, paintImageViewImg, 0);
    }
    hy.gui.ImageView.prototype.setImage = function (image) {
        if (this._image != image) {
            this._image = image;
            this.refresh();
        }
    }
    hy.gui.ImageView.prototype.getImage = function () {
        return this._image;
    }
    hy.gui.ImageView.prototype.setMirror = function (mirror) {
        if (this._mirror != mirror) {
            this._mirror = mirror;
            this.refresh();
        }
    }
    hy.gui.ImageView.prototype.getMirror = function () {
        return this._mirror;
    }

}(hy, window, document);