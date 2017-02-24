var hy = hy || {};

(function (hy) {

    function cloneCurStatus () {
        var statusobj = {};
        statusobj._fillStyle = this.__statusCur._fillStyle;
        statusobj._strokeStyle = this.__statusCur._strokeStyle;
        statusobj._shadowColor = this.__statusCur._shadowColor;
        statusobj._shadowBlur = this.__statusCur._shadowBlur;
        statusobj._shadowOffsetX = this.__statusCur._shadowOffsetX;
        statusobj._shadowOffsetY = this.__statusCur._shadowOffsetY;
        statusobj._lineCap = this.__statusCur._lineCap;
        statusobj._lineJoin = this.__statusCur._lineJoin;
        statusobj._lineWidth = this.__statusCur._lineWidth;
        statusobj._miterLimit = this.__statusCur._miterLimit;
        statusobj._font = this.__statusCur._font;
        statusobj._textAlign = this.__statusCur._textAlign;
        statusobj._textBaseline = this.__statusCur._textBaseline;
        statusobj._globalAlpha = this.__statusCur._globalAlpha;
        statusobj._globalCompositeOperation = this.__statusCur._globalCompositeOperation;
        return statusobj;
    }

    function getCurContextStatus () {
        this.__statusCur._fillStyle = this.__context.fillStyle;
        this.__statusCur._strokeStyle = this.__context.strokeStyle;
        this.__statusCur._shadowColor = this.__context.shadowColor;
        this.__statusCur._shadowBlur = this.__context.shadowBlur;
        this.__statusCur._shadowOffsetX = this.__context.shadowOffsetX;
        this.__statusCur._shadowOffsetY = this.__context.shadowOffsetY;
        this.__statusCur._lineCap = this.__context.lineCap;
        this.__statusCur._lineJoin = this.__context.lineJoin;
        this.__statusCur._lineWidth = this.__context.lineWidth;
        this.__statusCur._miterLimit = this.__context.miterLimit;
        this.__statusCur._font = this.__context.font;
        this.__statusCur._textAlign = this.__context.textAlign;
        this.__statusCur._textBaseline = this.__context.textBaseline;
        this.__statusCur._globalAlpha = this.__context.globalAlpha;
        this.__statusCur._globalCompositeOperation = this.__context.globalCompositeOperation;
    }

    function syncCanvasSizeInfo () {
        this._canvas.setAttribute("width", this._width);
        this._canvas.setAttribute("height", this._height);
        this.__statusStack = [];
        this.__statusCur = {};
        getCurContextStatus.call(this);
    }

    hy.RenderContext = hy.extend(hy.Observable);
    hy.RenderContext.prototype.defaultWidth = 300;
    hy.RenderContext.prototype.defaultHeight = 200;
    hy.RenderContext.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._width = hy.util.dataType.isUndefined(config.width) ? this.defaultWidth : config.width;
        this._height = hy.util.dataType.isUndefined(config.height) ? this.defaultHeight : config.height;
        this._canvas = hy.util.dataType.isUndefined(config.canvas) ? (document.createElement("canvas")) : config.canvas;
        this.__context = this._canvas.getContext("2d");
        this.__statusStack = [];
        this.__statusCur = {};
    }
    hy.RenderContext.prototype.sync = function () {
        this.superCall("sync", null);
        syncCanvasSizeInfo.call(this);
    }
    hy.RenderContext.prototype.getCanvas = function () {
        return this._canvas;
    }
    hy.RenderContext.prototype.setWidth = function (width) {
        if (this._width != width) {
            this._width = width;
            syncCanvasSizeInfo.call(this);
        }
    }
    hy.RenderContext.prototype.getWidth = function () {
        return this._width;
    }
    hy.RenderContext.prototype.setHeight = function(height) {
        if (this._height != height) {
            this._height = height;
            syncCanvasSizeInfo.call(this);
        }
    }
    hy.RenderContext.prototype.getHeight = function() {
        return this._height;
    }
    hy.RenderContext.prototype.setFillStyle = function (fillStyle) {
        if (this.__statusCur._fillStyle != fillStyle) {
            this.__statusCur._fillStyle = fillStyle;
            this.__context.fillStyle = fillStyle;
            this.__statusCur._fillStyle = this.__context.fillStyle;
        }
    }
    hy.RenderContext.prototype.getFillStyle = function () {
        return this.__statusCur._fillStyle;
    }
    hy.RenderContext.prototype.setStrokeStyle = function (strokeStyle) {
        if (this.__statusCur._strokeStyle != strokeStyle) {
            this.__statusCur._strokeStyle = strokeStyle;
            this.__context.strokeStyle = strokeStyle;
        }
    }
    hy.RenderContext.prototype.getStrokeStyle = function () {
        return this.__statusCur._strokeStyle;
    }
    hy.RenderContext.prototype.setShadowColor = function (shadowColor) {
        if (this.__statusCur._shadowColor != shadowColor) {
            this.__statusCur._shadowColor = shadowColor;
            this.__context.shadowColor = shadowColor;
        }
    }
    hy.RenderContext.prototype.getShadowColor = function () {
        return this.__statusCur._shadowColor;
    }
    hy.RenderContext.prototype.setShadowBlur = function (shadowBlur) {
        if (this.__statusCur._shadowBlur != shadowBlur) {
            this.__statusCur._shadowBlur = shadowBlur;
            this.__context.shadowBlur = shadowBlur;
        }
    }
    hy.RenderContext.prototype.getShadowBlur = function () {
        return this.__statusCur._shadowBlur;
    }
    hy.RenderContext.prototype.setShadowOffsetX = function (shadowOffsetX) {
        if (this.__statusCur._shadowOffsetX != shadowOffsetX) {
            this.__statusCur._shadowOffsetX = shadowOffsetX;
            this.__context.shadowOffsetX = shadowOffsetX;
        }
    }
    hy.RenderContext.prototype.getShadowOffsetX = function () {
        return this.__statusCur._shadowOffsetX;
    }
    hy.RenderContext.prototype.setShadowOffsetY = function (shadowOffsetY) {
        if (this.__statusCur._shadowOffsetY != shadowOffsetY) {
            this.__statusCur._shadowOffsetY = shadowOffsetY;
            this.__context.shadowOffsetY = shadowOffsetY;
        }
    }
    hy.RenderContext.prototype.getShadowOffsetY = function () {
        return this.__statusCur._shadowOffsetY;
    }
    hy.RenderContext.prototype.setLineCap = function (lineCap) {
        if (this.__statusCur._lineCap != lineCap) {
            this.__statusCur._lineCap = lineCap;
            this.__context.lineCap = lineCap;
        }
    }
    hy.RenderContext.prototype.getLineCap = function () {
        return this.__statusCur._lineCap;
    }
    hy.RenderContext.prototype.setLineJoin = function (lineJoin) {
        if (this.__statusCur._lineJoin != lineJoin) {
            this.__statusCur._lineJoin = lineJoin;
            this.__context.lineJoin = lineJoin;
        }
    }
    hy.RenderContext.prototype.getLineJoin = function () {
        return this.__statusCur._lineJoin;
    }
    hy.RenderContext.prototype.setLineWidth = function (lineWidth) {
        if (this.__statusCur._lineWidth != lineWidth) {
            this.__statusCur._lineWidth = lineWidth;
            this.__context.lineWidth = lineWidth;
        }
    }
    hy.RenderContext.prototype.getLineWidth = function () {
        return this.__statusCur._lineWidth;
    }
    hy.RenderContext.prototype.setMiterLimit = function (miterLimit) {
        if (this.__statusCur._miterLimit != miterLimit) {
            this.__statusCur._miterLimit = miterLimit;
            this.__context.miterLimit = miterLimit;
        }
    }
    hy.RenderContext.prototype.getMiterLimit = function () {
        return this.__statusCur._miterLimit;
    }
    hy.RenderContext.prototype.setFont = function (font) {
        if (this.__statusCur._font != font) {
            this.__statusCur._font = font;
            this.__context.font = font;
        }
    }
    hy.RenderContext.prototype.getFont = function () {
        return this.__statusCur._font;
    }
    hy.RenderContext.prototype.setTextAlign = function (textAlign) {
        if (this.__statusCur._textAlign != textAlign) {
            this.__statusCur._textAlign = textAlign;
            this.__context.textAlign = textAlign;
        }
    }
    hy.RenderContext.prototype.getTextAlign = function () {
        return this.__statusCur._textAlign;
    }
    hy.RenderContext.prototype.setTextBaseline = function (textBaseline) {
        if (this.__statusCur._textBaseline != textBaseline) {
            this.__statusCur._textBaseline = textBaseline;
            this.__context.textBaseline = textBaseline;
        }
    }
    hy.RenderContext.prototype.getTextBaseline = function () {
        return this.__statusCur._textBaseline;
    }
    hy.RenderContext.prototype.setGlobalAlpha = function (globalAlpha) {
        if (this.__statusCur._globalAlpha != globalAlpha) {
            this.__statusCur._globalAlpha = globalAlpha;
            this.__context.globalAlpha = globalAlpha;
        }
    }
    hy.RenderContext.prototype.getGlobalAlpha = function () {
        return this.__statusCur._globalAlpha;
    }
    hy.RenderContext.prototype.setGlobalCompositeOperation = function (globalCompositeOperation) {
        if (this.__statusCur._globalCompositeOperation != globalCompositeOperation) {
            this.__statusCur._globalCompositeOperation = globalCompositeOperation;
            this.__context.globalCompositeOperation = globalCompositeOperation;
        }
    }
    hy.RenderContext.prototype.getGlobalCompositeOperation = function () {
        return this.__statusCur._globalCompositeOperation;
    }

    hy.RenderContext.prototype.beginPath = function () {
        this.__context.beginPath();
    }
    hy.RenderContext.prototype.moveTo = function (x, y) {
        this.__context.moveTo(x, y);
    }
    hy.RenderContext.prototype.lineTo = function (x, y) {
        this.__context.lineTo(x, y);
    }
    hy.RenderContext.prototype.rect = function (x, y, width, height) {
        this.__context.rect(x, y, width, height);
    }
    hy.RenderContext.prototype.arc = function (x, y, r, startAngle, endAngle, reserve) {
        this.__context.arc(x, y, r, startAngle, endAngle, reserve);
    }
    hy.RenderContext.prototype.arcTo = function (x1, y1, x2, y2, r) {
        this.__context.arcTo(x1, y1, x2, y2, r);
    }
    hy.RenderContext.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
        this.__context.quadraticCurveTo(cpx, cpy, x, y);
    }
    hy.RenderContext.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) {
        this.__context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    hy.RenderContext.prototype.closePath = function () {
        this.__context.closePath();
    }
    hy.RenderContext.prototype.isPointInPath = function (x, y) {
        return this.__context.isPointInPath(x, y);
    }

    hy.RenderContext.prototype.stroke = function () {
        this.__context.stroke();
    }
    hy.RenderContext.prototype.strokeRect = function (x, y, width, height) {
        this.__context.strokeRect(x, y, width, height);
    }
    hy.RenderContext.prototype.strokeText = function (text, x, y) {
        this.__context.strokeText(text, x, y);
    }
    hy.RenderContext.prototype.strokeTextExt = function (text, x, y, maxWidth) {
        this.__context.strokeText(text, x, y, maxWidth);
    }

    hy.RenderContext.prototype.fill = function () {
        this.__context.fill();
    }
    hy.RenderContext.prototype.fillRect = function (x, y, width, height) {
        this.__context.fillRect(x, y, width, height);
    }
    hy.RenderContext.prototype.fillText = function (text, x, y) {
        this.__context.fillText(text, x, y);
    }
    hy.RenderContext.prototype.fillTextExt = function (text, x, y, maxWidth) {
        this.__context.fillText(text, x, y, maxWidth);
    }

    hy.RenderContext.prototype.drawImage = function (img, x, y) {
        this.__context.drawImage(img, x, y);
    }
    hy.RenderContext.prototype.drawImageExt = function (img, sx, sy, swidth, sheight, x, y, width, height) {
        this.__context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    }
    hy.RenderContext.prototype.createImageData = function (width, height) {
        this.__context.createImageData(width, height);
    }
    hy.RenderContext.prototype.getImageData = function (x, y, width, height) {
        return this.__context.getImageData(x, y, width, height);
    }
    hy.RenderContext.prototype.putImageData = function (imgData, x, y) {
        this.__context.putImageData(imgData, x, y);
    }
    hy.RenderContext.prototype.putImageDataExt = function (imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        this.__context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    }

    hy.RenderContext.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return this.__context.createLinearGradient(x0, y0, x1, y1);
    }
    hy.RenderContext.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        return this.__context.createRadialGradient(x0, y0, r0, x1, y1, r1);
    }
    hy.RenderContext.prototype.createPattern = function (image, repeatMode) {
        return this.__context.createPattern(image, repeatMode);
    }
    hy.RenderContext.prototype.clip = function () {
        this.__context.clip();
    }
    hy.RenderContext.prototype.clearRect = function (x, y, width, height) {
        this.__context.clearRect(x, y, width, height);
    }
    hy.RenderContext.prototype.pushTransform = function (x, y, scaleX, scaleY, rotate, clip, alpha) {
        this.__statusStack.push(cloneCurStatus.call(this));
        this.__context.save();
        if (x != 0 || y != 0) {
            this.__context.translate(x, y);
        }
        if (rotate != 0) {
            this.__context.rotate(rotate);
        }
        if (scaleX != 1 || scaleY != 1) {
            this.__context.scale(scaleX, scaleY);
        }
        if (alpha <= 0) {
            this.__statusCur._globalAlpha = 0;
            this.__context.globalAlpha = 0;
        } else if (alpha < 1) {
            this.__statusCur._globalAlpha *= alpha;
            this.__context.globalAlpha = this.__statusCur._globalAlpha;
        }
    }
    hy.RenderContext.prototype.popTransform = function () {
        this.__context.restore();
        this.__statusCur = this.__statusStack.pop();
    }
    hy.RenderContext.prototype.save = function () {
        this.__context.save();
    }
    hy.RenderContext.prototype.restore = function () {
        this.__context.restore();
    }
    hy.RenderContext.prototype.toDataURL = function () {
        return this._canvas.toDataURL();
    }
    hy.RenderContext.prototype.purge = function () {
        this._canvas = null;
        this.__context = null;
        this.__statusCur = null;
        this.__statusStack = null;
        this.superCall("purge", null);
    }


})(hy);