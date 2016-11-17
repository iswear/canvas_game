/*
 nodeData:{
 id:,
 icon:,
 name:,
 }
 */
var hy = hy || {};

+function (hy, win, doc) {

    function layoutSimpleListItemView (sender, zone) {
        this._itemIcon.setX(0);
        this._itemIcon.setY(0);
        this._itemIcon.setWidth(zone.height);
        this._itemIcon.setHeight(zone.height);
        this._itemLabel.setX(zone.height);
        this._itemLabel.setY(0);
        this._itemLabel.setWidth(zone.width - zone.height);
        this._itemLabel.setHeight(zone.height);
    }

    hy.gui = hy.gui || {};
    hy.gui.SimpleListItemView = hy.extend(hy.gui.ListItemView);
    hy.gui.SimpleListItemView.prototype.defaultReuseIdentity = "simplelistitem";
    hy.gui.SimpleListItemView.prototype.defaultItemEditEnable = false;
    hy.gui.SimpleListItemView.prototype.clipBound = false;
    hy.gui.SimpleListItemView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._itemIcon = new hy.gui.ImageView({responseEnable: true});
        this._itemLabel = new hy.gui.Label({lineNum: 1});
        this.addChildNodeAtLayer(this._itemIcon, 0);
        this.addChildNodeAtLayer(this._itemLabel, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutSimpleListItemView, 0);
    }
    hy.gui.SimpleListItemView.prototype.getItemIcon = function () {
        return this._itemIcon;
    }
    hy.gui.SimpleListItemView.prototype.getItemLabel = function () {
        return this._itemLabel;
    }
    hy.gui.SimpleListItemView.prototype.getItemTextMeasuredLength = function () {
        return this._itemLabel.getTextMeasuredLength();
    }

}(hy, window, document);