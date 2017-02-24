var hy = hy || {};

(function (hy, win, doc) {

    function layoutMenuItems (sender, zone) {
        for (var i = 0, count = this._dropDownItems.length; i < count; ++i) {
            var dropDownMenu = this._dropDownItems[i];
            dropDownMenu.setHeight(zone.height);
        }
    }

    function mallocMenuItems () {
        if (this.__needMallocMenuItems) {
            this.__needMallocMenuItems = false;
            var itemCount = this._menuItems.length;
            var dropDownCount = this._dropDownItems.length;
            var startX = 0;
            for (var i = 0; i < itemCount; ++i) {
                var dropDownMenu = null;
                if (i < dropDownCount) {
                    dropDownMenu = this._dropDownItems[i];
                } else {
                    dropDownMenu = new hy.gui.DropDownMenu({});
                    dropDownMenu.addObserver(hy.event.name.DROPDOWNMENUSELECTED, this, dropDownMenuSelected, 0);
                    this.addChildNodeAtLayer(dropDownMenu, 0);
                }
                dropDownMenu.setText(this._menuItems[i].name);
                dropDownMenu.setX(startX);
                dropDownMenu.setY(0);
                dropDownMenu.setWidth(dropDownMenu.getTextMeasuredLength() + 30);
                dropDownMenu.setHeight(this.getHeight());
                dropDownMenu.setTag(1);
                dropDownMenu.setDropItems(this._menuItems[i].dropItems);
                startX += dropDownMenu.getWidth();
            }
            if (itemCount < dropDownCount) {
                for (var i = dropDownCount - 1; i >= itemCount; --i) {
                    this._dropDownItems[i].removeFromParent(true);
                    this._dropDownItems.splice(i, 1);
                }
            }
        }
    }

    function dropDownMenuSelected (sender, e, itemIndex) {
        this.postNotification(hy.event.name.MENUSELECTED, this, [e, sender.getTag(), itemIndex]);
    }

    hy.gui = hy.gui || {};
    hy.gui.Menu = hy.extend(hy.gui.View);
    hy.gui.Menu.prototype.defaultResponseEnable = false;
    hy.gui.Menu.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._menuItems = hy.util.dataType.isUndefined(config.menuItems) ? null : config.menuItems;
        this._dropDownItems = [];
        this.__needMallocMenuItems = true;
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutMenuItems, 0);
        this.addObserver(hy.event.name.ENTERFRAME, this, mallocMenuItems, 0);
    }
    hy.gui.Menu.prototype.setMenuItems = function (items) {
        this._menuItems = items;
        this.needMallocMenuItems();
    }
    hy.gui.Menu.prototype.getMenuItems = function () {
        return this._menuItems;
    }
    hy.gui.Menu.prototype.needMallocMenuItems = function () {
        this.__needMallocMenuItems = true;
    }

})(hy, window, document);
