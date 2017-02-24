var hy = hy || {};

(function (hy, win, doc) {

    hy.game = hy.game || {};
    hy.game.Model = hy.extend(hy.game.Unit);
    hy.game.Model.prototype.defaultName = "model";
    hy.game.Model.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._actionNames = hy.util.isUndefined(config.actionNames) ? [] : config.actionNames;
    }
    hy.game.Model.prototype.getActionNames = function () {
        return this._actionNames;
    }
    hy.game.Model.prototype.addActionName = function (actionName) {
        for (var i = 0, len = this._actionNames.length; i < len; ++i) {
            if (this._actionNames[i] == actionName) {
                return false;
            }
        }
        this._actionNames.push(actionName);
        return true;
    }
    hy.game.Model.prototype.removeActionName = function (actionName, childRemove) {
        for (var i = 0, len = this._actionNames.length; i < len; ++i) {
            if (this._actionNames[i] == actionName) {
                this._actionNames.splice(i, 1);
                len--;
            }
        }
        this.removeActionFramesOfName(actionName, childRemove);
    }
    hy.game.Model.prototype.renameActionName = function (oldName, newName, childrename) {
        var pos = -1;
        for (var i = 0, len = this._actionNames.length; i < len; ++i) {
            if (this._actionNames[i] == newName) {
                return false;
            } else if (this._actionNames[i] == oldName) {
                pos = i;
            }
        }
        if (pos >= 0) {
            this._actionNames[pos] = newName;
            this.renameActionFrames(oldName, newName, childrename);
            return true;
        } else {
            return false;
        }
    }

})(hy, window, document);