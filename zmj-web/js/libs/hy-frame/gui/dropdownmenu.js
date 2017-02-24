/*
 dropItems:[
 {
 name:,
 icon:
 }
 ]
 */
var hy = hy || {};

(function (hy, win, doc) {

    function showDropDownMenu (sender, e) {
        if (e.button == 0 && this._dropItems != null && this._dropItems.length > 0) {
            var app = this.getApplication();
            app.showContextMenu(e, this, this._dropItems, hy.gui.CONTEXTMENU_TYPE_DROPDOWN);
        }
        e.stopDispatch();
    }

    hy.gui = hy.gui || {};
    hy.gui.DropDownMenu = hy.extend(hy.gui.Label);
    hy.gui.DropDownMenu.prototype.defaultResponseEnable = true;
    hy.gui.DropDownMenu.prototype.defaultTextHorAlign = hy.gui.TEXT_HORALIGN_CENTER;
    hy.gui.DropDownMenu.prototype.defaultTextVerAlign = hy.gui.TEXT_VERALIGN_CENTER;
    hy.gui.DropDownMenu.prototype.defaultBackgroundColor = null;
    hy.gui.DropDownMenu.prototype.defaultNormalColor = null;
    hy.gui.DropDownMenu.prototype.defaultSelColor = hy.gui.colors.DBLUE;
    hy.gui.DropDownMenu.prototype.init = function (config) {
        this.super("init", [config]);
        this._dropItems = hy.util.dataType.isUndefined(config.dropItems) ? null : config.dropItems;
        this._normalColor = hy.util.dataType.isUndefined(config.normalColor) ? this.defaultNormalColor : config.normalColor;
        this._selColor = hy.util.dataType.isUndefined(config.selColor) ? this.defaultSelColor : config.selColor;
        this.addObserver(hy.event.name.MOUSEUP, this, showDropDownMenu, 0);
    }
    hy.gui.DropDownMenu.prototype.setDropItems = function (items) {
        this._dropItems = items;
    }
    hy.gui.DropDownMenu.prototype.getDropItems = function () {
        return this._dropItems;
    }
    hy.gui.DropDownMenu.prototype.setNormalColor = function (color) {
        this._normalColor = color;
    }
    hy.gui.DropDownMenu.prototype.getNormalColor = function () {
        return this._normalColor;
    }
    hy.gui.DropDownMenu.prototype.setSelColor = function (color) {
        this._selColor = color;
    }
    hy.gui.DropDownMenu.prototype.getSelColor = function () {
        return this._selColor;
    }

})(hy, window, document);