var hy = hy || {};

(function (hy, win, doc) {

    function readyViewPath (dc, zone) {
        var offset = this._borderWidth / 2;
        dc.beginPath();
        if (this._cornorRadius > 0) {
            var ltx = zone.minX + offset;
            var lty = zone.minY + offset;
            var rbx = zone.maxX - offset;
            var rby = zone.maxY - offset;
            dc.moveTo(ltx, lty + this._cornorRadius);
            dc.arcTo(ltx, lty, ltx + this._cornorRadius, lty, this._cornorRadius);
            dc.lineTo(rbx - this._cornorRadius, lty);
            dc.arcTo(rbx, lty, rbx, lty + this._cornorRadius, this._cornorRadius);
            dc.lineTo(rbx, rby - this._cornorRadius);
            dc.arcTo(rbx, rby, rbx - this._cornorRadius, rby, this._cornorRadius);
            dc.lineTo(ltx + this._cornorRadius, rby);
            dc.arcTo(ltx, rby, ltx, rby - this._cornorRadius, this._cornorRadius);
            dc.lineTo(ltx, lty + this._cornorRadius);
        } else {
            dc.rect(zone.minX + offset, zone.minY + offset, this.getWidth() - this._borderWidth, this.getHeight() - this._borderWidth);
        }
    }

    function paintViewBkAndBorder (sender, dc, zone) {
        /*如果裁剪启用继承*/
        var borderPathReady = false;
        var parent = this.getParent();
        if (this._clipEnable) {
            if (parent == null || this._backgroundColor) {
                this.setPaintInheritValue("backgroundColor", this._backgroundColor);
            } else {
                this.setPaintInheritValue("backgroundColor", parent.getPaintInheritValue("backgroundColor"));
            }
        } else {
            this.setPaintInheritValue("backgroundColor", null);
        }
        if (this._backgroundColor) {
            readyViewPath.call(this, dc, zone);
            dc.setFillStyle(this._backgroundColor);
            dc.fill();
            borderPathReady = true;
        }
        if (this._borderWidth > 0 && this._borderColor) {
            if (!borderPathReady) {
                readyViewPath.call(this, dc, zone);
            }
            dc.setLineWidth(this._borderWidth);
            dc.setStrokeStyle(this._borderColor);
            dc.stroke();
        }
    }

    function syncViewResponseZoneX (sender) {
        var responseZone = this.getResponseZone();
        responseZone.minX = -Math.round(this.getAnchorX() * this.getWidth());
        responseZone.maxX = responseZone.minX + this.getWidth();
    }

    function syncViewResponseZoneY (sender) {
        var responseZone = this.getResponseZone();
        responseZone.minY = -Math.round(this.getAnchorY() * this.getHeight());
        responseZone.maxY = responseZone.minY + this.getHeight();
    }


    hy.gui = hy.gui || {};
    hy.gui.View = hy.extend(hy.RichNode);
    hy.gui.View.prototype.defaultDragEnable = false;
    hy.gui.View.prototype.defaultWheelEnable = false;
    hy.gui.View.prototype.defaultResizeEnable = false;
    hy.gui.View.prototype.defaultRotateEnable = false;
    hy.gui.View.prototype.defaultAnchorMoveEnable = false;
    hy.gui.View.prototype.defaultAdjustLayoutStyle = 1;
    hy.gui.View.prototype.defaultBackgroundColor = null;
    hy.gui.View.prototype.defaultBorderWidth = 0;
    hy.gui.View.prototype.defaultBorderColor = null;
    hy.gui.View.prototype.defaultAnchorX = 0;
    hy.gui.View.prototype.defaultAnchorY = 0;
    hy.gui.View.prototype.defaultClipEnable = true;
    hy.gui.View.prototype.init = function (config) {
        this.super("init", [config]);
        this._backgroundColor = hy.util.dataType.isUndefined(config.backgroundColor) ? this.defaultBackgroundColor : config.backgroundColor;
        this._borderWidth = hy.util.dataType.isUndefined(config.borderWidth) ? this.defaultBorderWidth : config.borderWidth;
        this._borderColor = hy.util.dataType.isUndefined(config.borderColor) ? this.defaultBorderColor : config.borderColor;

        this.addObserver(hy.event.name.ANCHORXCHG, this, syncViewResponseZoneX);
        this.addObserver(hy.event.name.WIDTHCHG, this, syncViewResponseZoneX);
        this.addObserver(hy.event.name.ANCHORYCHG, this, syncViewResponseZoneY);
        this.addObserver(hy.event.name.HEIGHTCHG, this, syncViewResponseZoneY);
        this.addObserver(hy.event.name.PAINT, this, paintViewBkAndBorder);
    }
    hy.gui.View.prototype.sync = function () {
        this.super("sync", null);
        syncViewResponseZoneX.call(this);
        syncViewResponseZoneY.call(this);
    }
    hy.gui.View.prototype.setBackgroundColor = function (color) {
        if (this._backgroundColor != color) {
            this._backgroundColor = color;
            this.refresh();
        }
    }
    hy.gui.View.prototype.getBackgroundColor = function () {
        return this._backgroundColor;
    }
    hy.gui.View.prototype.setBorderWidth = function (width) {
        if (this._borderWidth != width) {
            this._borderWidth = width;
            this.refresh();
        }
    }
    hy.gui.View.prototype.getBorderWidth = function () {
        return this._borderWidth;
    }
    hy.gui.View.prototype.setBorderColor = function (color) {
        if (this._borderColor != color) {
            this._borderColor = color;
            this.refresh();
        }
    }
    hy.gui.View.prototype.getBorderColor = function () {
        return this._borderColor;
    }
    hy.gui.View.prototype.ifPaint = function () {
        if (this.getChildNodeCount() > 0 || this.getObserversCount(hy.event.name.PAINT) > 1
            || this._backgroundColor != null || (this._borderWidth > 0 && this._borderColor)) {
            return true;
        } else {
            return false;
        }
    }

})(hy, window, document);