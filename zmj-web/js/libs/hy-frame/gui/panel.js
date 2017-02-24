//sans-serif"
var hy = hy || {};

(function (hy, win, doc) {

    function paintPanelHeader (sender, dc, zone) {
        dc.beginPath();
        dc.rect(zone.minX, 0, zone.width, 25);
        dc.setFillStyle(hy.gui.colors.BLUE);
        dc.fill();
    }

    function layoutPanel (sender, zone) {
        this._icon.setX(2);
        this._icon.setY(4);
        this._icon.setWidth(17);
        this._icon.setHeight(17);
        this._titleLabel.setX(23);
        this._titleLabel.setY(4);
        this._titleLabel.setWidth(zone.width - 28);
        this._titleLabel.setHeight(17);
        this._mainView.setX(0);
        this._mainView.setY(25);
        this._mainView.setWidth(zone.width);
        this._mainView.setHeight(zone.height - 25);
    }

    hy.gui = hy.gui || {};
    hy.gui.Panel = hy.extend(hy.gui.View);
    hy.gui.Panel.prototype.defaultTitle = "panel";
    hy.gui.Panel.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._icon = new hy.gui.ImageView({});
        this._titleLabel = new hy.gui.Label({textColor: hy.gui.colors.PUREWHITE, textFont: "12px 宋体"});

        this._icon.setImage(hy.util.dataType.isUndefined(config.icon) ? null : config.icon);
        this._titleLabel.setText(hy.util.dataType.isUndefined(config.title) ? this.defaultTitle : config.title);
        this._mainView = hy.util.dataType.isUndefined(config.mainView) ? new hy.gui.View({}) : config.mainView;

        this.addChildNodeAtLayer(this._icon, 0);
        this.addChildNodeAtLayer(this._titleLabel, 0);
        this.addChildNodeAtLayer(this._mainView, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutPanel, 0);
        this.addObserver(hy.event.name.PAINT, this, paintPanelHeader, 0);
    }
    hy.gui.Panel.prototype.getIcon = function () {
        return this._icon;
    }
    hy.gui.Panel.prototype.getTitleLabel = function () {
        return this._titleLabel;
    }
    hy.gui.Panel.prototype.getMainView = function () {
        return this._mainView;
    }

})(hy, window, document);