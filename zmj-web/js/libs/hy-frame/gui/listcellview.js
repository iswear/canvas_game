var hy = hy || {};

(function (hy, win, doc) {

    hy.gui = hy.gui || {};
    hy.gui.ListItemView = hy.extend(hy.gui.View);
    hy.gui.ListItemView.prototype.defaultReuseIdentity = "listitem";
    hy.gui.ListItemView.prototype.defaultResponseEnable = true;
    hy.gui.ListItemView.prototype.init = function (config) {
        this.super("init", [config]);
        this._reuseIdentity = hy.util.dataType.isUndefined(config.reuseIdentity) ? this.defaultReuseIdentity : config.reuseIdentity;
        this._itemIndex = -1;
    }
    hy.gui.ListItemView.prototype.setReuseIdentity = function (reuseIdentity) {
        this._reuseIdentity = reuseIdentity;
    }
    hy.gui.ListItemView.prototype.getReuseIdentity = function () {
        return this._reuseIdentity;
    }
    hy.gui.ListItemView.prototype.setItemIndex = function (itemIndex) {
        this._itemIndex = itemIndex;
    }
    hy.gui.ListItemView.prototype.getItemIndex = function () {
        return this._itemIndex;
    }

})(hy, window, document);