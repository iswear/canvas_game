/**
 * Created by iswear on 16/5/8.
 */
var hy = hy || {};

+function (hy, win, doc) {

    function mouseoverBtn (sender, e) {
        this.setBackgroundColor(this._hoverColor);
    }

    function mouseoutBtn (sender, e) {
        this.setBackgroundColor(this._normalColor);
    }

    hy.gui = hy.gui || {};
    hy.gui.Button = hy.extend(hy.gui.ImageView);
    hy.gui.Button.prototype.defaultNormalColor = null;
    hy.gui.Button.prototype.defaultHoverColor = hy.gui.colors.DBLUE;
    hy.gui.Button.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._normalColor = hy.util.dataType.isUndefined(config.normalColor) ? this.defaultNormalColor : config.normalColor;
        this._hoverColor = hy.util.dataType.isUndefined(config.hoverColor) ? this.defaultHoverColor : config.hoverColor;

        this.addObserver(hy.event.name.MOUSEOVER, this, mouseoverBtn, 0);
        this.addObserver(hy.event.name.MOUSEOUT, this, mouseoutBtn, 0);
    }
    hy.gui.Button.prototype.setNormalColor = function (color) {
        this._normalColor = color;
    }
    hy.gui.Button.prototype.getNormalColor = function () {
        return this._normalColor;
    }
    hy.gui.Button.prototype.setSelColor = function (color) {
        this._selColor = color;
    }
    hy.gui.Button.prototype.getSelColor = function () {
        return this._selColor;
    }

}(hy, window, document);
