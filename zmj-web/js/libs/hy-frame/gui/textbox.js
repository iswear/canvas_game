var hy = hy || {};

(function (hy, win, doc) {

    function showHtmlTextBox (sender, e) {
        if (this._editEnable) {
            var app = this.getApplication();
            app.getInputTextBox().showForNode(this);
        }
    }

    function hideHtmlTextBox (sender, e) {
        var app = this.getApplication();
        if (!app.getInputTextBox().isFocus()) {
            app.getInputTextBox().hideForNode(this);
        }
    }

    function syncTextBoxToInputBox () {
        var app = this.getApplication();
        if (app.getInputNode() == this) {
            app.getInputTextBox().setValue(this.getText());
        }
    }

    hy.gui = hy.gui || {};
    hy.gui.TextBox = hy.extend(hy.gui.Label);
    hy.gui.TextBox.prototype.defaultEditEnable = true;
    hy.gui.TextBox.prototype.defaultResponseEnable = true;
    hy.gui.TextBox.prototype.init = function (config) {
        this.super("init", [config]);
        this._editEnable = hy.util.dataType.isUndefined(config.editEnable) ? this.defaultEditEnable : config.editEnable;
        this.addObserver(hy.event.name.TEXTCHG, this, syncTextBoxToInputBox, 0);
        this.addObserver(hy.event.name.MOUSEOVER, this, showHtmlTextBox, 0);
        this.addObserver(hy.event.name.MOUSEOUT, this, hideHtmlTextBox, 0);
    }
    hy.gui.TextBox.prototype.setEditEnable = function (editEnable) {
        this._editEnable = editEnable;
    }
    hy.gui.TextBox.prototype.getEditEnable = function () {
        return this._editEnable;
    }

})(hy, window, document);