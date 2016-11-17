var hy = hy || {};

+function (hy, win, doc) {

    var defaultDataSource = {
        numberOfListItem: function (listView) {
            var items = listView.getItems();
            if (items) {
                return items.length;
            } else {
                return 0;
            }
        },
        widthOfListItem: function (listView, itemIndex) {
            var itemView = listView.getItemViewOfItemIndex(itemIndex);
            if (itemView) {
                return itemView.getItemTextMeasuredLength() + listView.getItemHeight() + 5;
            } else {
                return 0;
            }
        },
        heightOfListItem: function (listView, itemIndex) {
            return listView.getItemHeight();
        },
        contextMenuOfListItem: function (listView, itemIndex) {
            return listView.getItemContextMenu();
        },
        viewOfListItem: function (listView, itemIndex) {
            var items = listView.getItems();
            var itemView = listView.getReuseItemViewOfIdentity("listitem");
            if (itemView == null) {
                itemView = new hy.gui.SimpleListItemView({reuseIdentity: "listitem"});
            }
            if (typeof items[itemIndex] === 'string') {
                itemView.getItemLabel().setText(items[itemIndex]);
            } else {
                itemView.getItemLabel().setText(items[itemIndex].name);
            }
            return itemView;
        }
    };

    hy.gui = hy.gui || {};
    hy.gui.SimpleListView = hy.extend(hy.gui.ListView);
    hy.gui.SimpleListView.prototype.defaultItemHeight = 20;
    hy.gui.SimpleListView.prototype.defaultDataSource = defaultDataSource;
    hy.gui.SimpleListView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._items = hy.util.dataType.isUndefined(config.items) ? null : config.items;
        this._itemHeight = hy.util.dataType.isUndefined(config.itemHeight) ? this.defaultItemHeight : config.itemHeight;
        this._itemContextMenu = hy.util.dataType.isUndefined(config.itemContextMenu) ? null : config.itemContextMenu;
    }
    hy.gui.SimpleListView.prototype.setItems = function (items) {
        if (this._items != items) {
            this._items = items;
            this.needReloadList();
        }
    }
    hy.gui.SimpleListView.prototype.getItems = function () {
        return this._items;
    }
    hy.gui.SimpleListView.prototype.setItemHeight = function (itemHeight) {
        this._itemHeight = itemHeight;
        this.needReloadList();
    }
    hy.gui.SimpleListView.prototype.getItemHeight = function () {
        return this._itemHeight;
    }
    hy.gui.SimpleListView.prototype.setItemContextMenu = function (itemContextMenu) {
        this._itemContextMenu = itemContextMenu;
    }
    hy.gui.SimpleListView.prototype.getItemContextMenu = function () {
        return this._itemContextMenu;
    }
    hy.gui.SimpleListView.prototype.dragItemFromTo = function (fromIndex, toIndex) {
        if (fromIndex < this._items.length && toIndex <= this._items.length) {
            if (fromIndex < toIndex) {
                this._items.splice(toIndex, 0, this._items[fromIndex]);
                this._items.splice(fromIndex, 1);
                this.needReloadList();
                return toIndex - 1;
            } else if (fromIndex > toIndex) {
                this._items.splice(toIndex, 0, this._items[fromIndex]);
                this._items.splice(fromIndex + 1, 1);
                this.needReloadList();
                return toIndex;
            }
        } else {
            return fromIndex;
        }
    }


}(hy, window, document);