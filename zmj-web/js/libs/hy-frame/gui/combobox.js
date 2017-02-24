var hy = hy || {};

(function (hy, win, doc) {

    function showComlboboxItem (sender, e) {
        if (e.button == 0 && this._optionItems != null && this._optionItems.length > 0) {
            var app = this.getApplication();
            app.showContextMenu(e, this, this._optionItems, hy.gui.CONTEXTMENU_TYPE_COMBOBOX);
        }
        e.stopDispatch();
    }

    function paintDownIcon (sender, dc, zone) {
        if (!this._optionItems || this._selectedItemIndex < 0 || this._selectedItemIndex > this._optionItems.length) {
            this.setSelectedItemIndex(0);
        }
        var height = zone.height;
        dc.setFillStyle(hy.gui.colors.BLUE);
        dc.beginPath();
        dc.fillRect(zone.maxX - height, zone.minY, height, height);
        dc.setFillStyle(hy.gui.colors.PUREWHITE);
        dc.beginPath();
        var startX = zone.maxX - height;
        dc.moveTo(startX + height / 3, zone.minY + height / 3);
        dc.lineTo(startX + height * 2 / 3, zone.minY + height / 3);
        dc.lineTo(startX + height / 2, zone.minY + height * 2 / 3);
        dc.closePath();
        dc.fill();
    }

    hy.gui = hy.gui || {};
    hy.gui.ComboBox = hy.extend(hy.gui.Label);
    hy.gui.ComboBox.prototype.defaultResponseEnable = true;
    hy.gui.ComboBox.prototype.defaultTextHorAlign = hy.gui.TEXT_HORALIGN_LEFT;
    hy.gui.ComboBox.prototype.defaultTextVerAlign = hy.gui.TEXT_VERALIGN_CENTER;
    hy.gui.ComboBox.prototype.defaultBackgroundColor = null;
    hy.gui.ComboBox.prototype.defaultNormalColor = null;
    hy.gui.ComboBox.prototype.defaultSelColor = hy.gui.colors.DBLUE;
    hy.gui.ComboBox.prototype.defaultText = "";
    hy.gui.ComboBox.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._optionItems = hy.util.dataType.isUndefined(config.optionItems) ? null : config.optionItems;
        this._selectedItemIndex = -1;
        this.addObserver(hy.event.name.MOUSEUP, this, showComlboboxItem, 0);
        this.addObserver(hy.event.name.PAINT, this, paintDownIcon, 0);
    }
    hy.gui.ComboBox.prototype.setOptionItems = function (items) {
        this._optionItems = items;
    }
    hy.gui.ComboBox.prototype.getOptionItems = function () {
        return this._optionItems;
    }
    hy.gui.ComboBox.prototype.setSelectedItemIndex = function (index) {
        if (this._optionItems) {
            if (index < this._optionItems.length) {
                this.setText(this._optionItems[index].name);
            } else {
                this.setText("");
            }
        }
        this.postNotification(hy.event.name.COMBOBOXITEMSELECTED, [index]);
        this._selectedItemIndex = index;
    }
    hy.gui.ComboBox.prototype.getSelectedItemIndex = function () {
        return this._selectedItemIndex;
    }

})(hy, window, document);