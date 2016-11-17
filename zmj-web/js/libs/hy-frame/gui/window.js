var hy = hy || {};

+function(hy, win, doc) {

    function layoutWindow (sender, zone) {
        this._icon.setX(zone.minX + 3);
        this._icon.setY(zone.minY + 5);
        this._icon.setWidth(17);
        this._icon.setHeight(17);
        this._titleLabel.setX(zone.minX + 23);
        this._titleLabel.setY(zone.minY + 5);
        this._titleLabel.setWidth(this.getWidth() - 46);
        this._titleLabel.setHeight(17);
        this._closeIcon.setX(zone.maxX - 20);
        this._closeIcon.setY(zone.minY + 5);
        this._closeIcon.setWidth(17);
        this._closeIcon.setHeight(17);
        this._mainView.setX(zone.minX + 3);
        this._mainView.setY(zone.minY + 27);
        this._mainView.setWidth(zone.width - 6);
        this._mainView.setHeight(zone.height - 30);
    }

    function paintBackground (sender, dc, zone) {
        /*如果裁剪启用继承*/
        if (this._backgroundColor) {
            var width = zone.width;
            var height = zone.height;
            dc.beginPath();
            dc.moveTo(zone.minX, zone.minY + 27);
            dc.lineTo(zone.minX, zone.maxY);
            dc.lineTo(zone.maxX, zone.maxY);
            dc.lineTo(zone.maxX, zone.minY + 27);
            dc.lineTo(zone.maxX - 3, zone.minY + 27);
            dc.lineTo(zone.maxX - 3, zone.maxY - 3);
            dc.lineTo(zone.minX + 3, zone.maxY - 3);
            dc.lineTo(zone.minX + 3, zone.minY + 27);
            dc.closePath();
            dc.rect(zone.minX, zone.minY, width, 27);
            dc.setFillStyle(this._backgroundColor);
            dc.fill();
        }
    }

    function mouseupCloseBtn (sender, e) {
        if (this._closeStyle == 1) {
            this.removeFromParent(true);
        } else {
            this.setVisible(false);
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
        responseZone.maxY = responseZone.minY + 27;
    }

    hy.gui = hy.gui || {};
    hy.gui.Window = hy.extend(hy.RichNode);
    hy.gui.Window.prototype.defaultResponseEnable = true;
    hy.gui.Window.prototype.defaultDragEnable = true;
    hy.gui.Window.prototype.defaultResizeEnable = true;
    hy.gui.Window.prototype.defaultRotateEnable = false;
    hy.gui.Window.prototype.defaultWheelEnable = false;
    hy.gui.Window.prototype.defaultAnchorMoveEnable = false;
    hy.gui.Window.prototype.defaultResizeStyle = 1;
    hy.gui.Window.prototype.defaultAdjustLayoutStyle = 1;
    hy.gui.Window.prototype.defaultBackgroundColor = null;
    hy.gui.Window.prototype.defaultBorderWidth = 0;
    hy.gui.Window.prototype.defaultBorderColor = null;
    hy.gui.Window.prototype.defaultAnchorX = 0;
    hy.gui.Window.prototype.defaultAnchorY = 0;
    hy.gui.Window.prototype.defaultClipEnable = true;
    hy.gui.Window.prototype.defaultTitle = "window";
    hy.gui.Window.prototype.defaultCloseStyle = 1;
    hy.gui.Window.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._backgroundColor = hy.util.dataType.isUndefined(config.backgroundColor) ? this.defaultBackgroundColor : config.backgroundColor;
        this._icon = new hy.gui.ImageView({});
        this._closeIcon = new hy.gui.Button({normalColor: null, hoverColor: hy.gui.colors.RED, responseEnable: true});
        this._titleLabel = new hy.gui.Label({textColor: hy.gui.colors.PUREWHITE, textFont: '12px 宋体'});
        this._closeStyle = hy.util.dataType.isUndefined(config.closeStyle) ? this.defaultCloseStyle : config.closeStyle;

        this._icon.setImage(hy.util.dataType.isUndefined(config.icon) ? null : config.icon);
        this._closeIcon.setImage(hy.util.dataType.isUndefined(config.closeIcon) ? null : config.closeIcon);
        this._titleLabel.setText(hy.util.dataType.isUndefined(config.title) ? this.defaultTitle : config.title);
        this._mainView = hy.util.dataType.isUndefined(config.mainView) ? new hy.gui.View({}) : config.mainView;

        this._closeIcon.addObserver(hy.event.name.MOUSEUP, this, this._mouseupCloseBtn);
        this.addChildNodeAtLayer(this._icon, 0);
        this.addChildNodeAtLayer(this._closeIcon, 0);
        this.addChildNodeAtLayer(this._titleLabel, 0);
        this.addChildNodeAtLayer(this._mainView, 0);

        this.addObserver(hy.event.name.ANCHORXCHG, this, syncViewResponseZoneX);
        this.addObserver(hy.event.name.WIDTHCHG, this, syncViewResponseZoneX);
        this.addObserver(hy.event.name.ANCHORYCHG, this, syncViewResponseZoneY);
        this.addObserver(hy.event.name.HEIGHTCHG, this, syncViewResponseZoneY);
        this.addObserver(hy.event.name.PAINT, this, paintBackground);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutWindow);
    }
    hy.gui.Window.prototype.sync = function () {
        this.superCall("sync", null);
        syncViewResponseZoneX.call(this);
        syncViewResponseZoneY.call(this);
    }
    hy.gui.Window.prototype.getIcon = function () {
        return this._icon;
    }
    hy.gui.Window.prototype.getCloseIcon = function () {
        return this._closeIcon;
    }
    hy.gui.Window.prototype.getTitleLabel = function () {
        return this._titleLabel;
    }
    hy.gui.Window.prototype.getMainView = function () {
        return this._mainView;
    }
    hy.gui.Window.prototype.setBackgroundColor = function (color) {
        if (this._backgroundColor != color) {
            this._backgroundColor = color;
            this.refresh();
        }
    }
    hy.gui.Window.prototype.getBackgroundColor = function () {
        return this._backgroundColor;
    }

}(hy, window, document);