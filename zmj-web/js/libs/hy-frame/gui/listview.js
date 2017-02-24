var hy = hy || {};

(function(hy, win, doc) {

    function reloadList () {
        if (this.__needReloadList) {
            this.__needReloadList = false;
            var dataSource = this._dataSource;
            recycleAllItemView.call(this);
            this._itemInfos = [];
            var itemsNum = dataSource.numberOfListItem(this);
            var cursorY = this._paddingTop;
            for (var i = 0; i < itemsNum; ++i) {
                /*item layout info*/
                var itemInfo = {
                    x: this._paddingLeft,
                    y: cursorY,
                    width: 0,
                    height: dataSource.heightOfListItem(this),
                    view: null
                };
                this._itemInfos.push(itemInfo);
                cursorY += itemInfo.height;
            }
            this.setContentHeight(cursorY + this._paddingBottom);
            this.needMallocListView();
        }
    }

    function mallocListView () {
        if (this.__needMallocListView) {
            this.__needMallocListView = false;
            var dataSource = this._dataSource;
            var contentOffsetY = this.getContentOffsetY();
            var contentMaxY = contentOffsetY + this.getHeight();
            for (var i = this._itemViews.length - 1; i >= 0; --i) {
                var itemView = this._itemViews[i];
                if (itemView.getY() >= contentMaxY || (itemView.getY() + itemView.getHeight() <= contentOffsetY)) {
                    var reuseIdentity = itemView.getReuseIdentity();
                    if (!this._reuseItemViews[reuseIdentity]) {
                        this._reuseItemViews[reuseIdentity] = [];
                    }
                    this._reuseItemViews[reuseIdentity].push(itemView);
                    this._itemInfos[itemView.getItemIndex()].view = null;
                    itemView.setItemIndex(-1);
                    itemView.removeFromParent(false);
                    this._itemViews.splice(i, 1);
                }
            }
            var itemWidth = this.getContentWidth();
            var itemMaxWidth = 0;
            for (var i = 0, itemNum = this._itemInfos.length; i < itemNum; ++i) {
                var itemInfo = this._itemInfos[i];
                if (itemInfo.y < contentMaxY) {
                    if (itemInfo.y + itemInfo.height > contentOffsetY && itemInfo.height > 0) {
                        if (!itemInfo.view) {
                            var itemView = dataSource.viewOfListItem(this, i);
                            if (itemView != null) {
                                var contextMenu = dataSource.contextMenuOfListItem(this, i);
                                itemView.setContextMenu(contextMenu);
                                itemView.setX(0);
                                itemView.setY(itemInfo.y);
                                itemView.setWidth(itemWidth);
                                itemView.setHeight(itemInfo.height);
                                itemView.setItemIndex(i);
                                if (i == this._selectedItemIndex) {
                                    itemView.setBackgroundColor(this._itemSelColor);
                                } else {
                                    itemView.setBackgroundColor(this._itemNormalColor);
                                }
                                itemView.addObserver(hy.event.name.CLICK, this, clickListItem, 0);
                                itemView.addObserver(hy.event.name.DBLCLICK, this, dblclickListItem, 0);
                                itemView.addObserver(hy.event.name.MOUSEDOWN, this, mousedownListItem, 0);
                                itemView.addObserver(hy.event.name.MOUSEMOVE, this, mousemoveListItem, 0);
                                itemView.addObserver(hy.event.name.MOUSEUP, this, mouseupListItem, 0);
                                itemView.addObserver(hy.event.name.MOUSEOVER, this, mouseoverListItem, 0);
                                itemView.addObserver(hy.event.name.MOUSEOUT, this, mouseoutListItem, 0);
                                itemView.addObserver(hy.event.name.CONTEXTMENU, this, contextmenuListItem, 0);
                                itemView.addObserver(hy.event.name.CONTEXTMENUSELECTED, this, contextmenuSelectedListItem, 0);
                                this._itemViews.push(itemView);
                                this.getContentView().addChildNodeAtLayer(itemView, 0);
                                itemInfo.view = itemView;
                            }
                        }
                        var itemViewWidth = dataSource.widthOfListItem(this, i);
                        if (itemViewWidth > itemMaxWidth) {
                            itemMaxWidth = itemViewWidth;
                        }
                    }
                } else {
                    break;
                }
            }
            this.setContentWidth(itemMaxWidth + this._paddingLeft + this._paddingRight);
        }
    }

    function recycleAllItemView () {
        for (var i = this._itemViews.length - 1; i >= 0; --i) {
            var itemView = this._itemViews[i];
            var reuseIdentity = itemView.getReuseIdentity();
            if (!this._reuseItemViews[reuseIdentity]) {
                this._reuseItemViews[reuseIdentity] = [];
            }
            this._reuseItemViews[reuseIdentity].push(itemView);
            this._itemInfos[itemView.getItemIndex()].view = null;
            itemView.setItemIndex(-1);
            itemView.removeFromParent(false);
            this._itemViews.splice(i, 1);
        }
    }

    function layoutListItemView (zone) {
        var contentwidth = this._contentView.getWidth();
        var x = this._paddingLeft;
        var width = contentwidth - this._paddingLeft - this._paddingRight;
        this.__insertFlagView.setX(x);
        this.__insertFlagView.setWidth(width);
        this.__insertFlagView.setHeight(1);
        for (var i = 0, len = this._itemViews.length; i < len; ++i) {
            this._itemViews[i].setX(x);
            this._itemViews[i].setWidth(width);
        }
    }

    function paintInsertFlagView (sender, dc, zone) {
        dc.beginPath();
        dc.moveTo(zone.minX, 0.5);
        dc.lineTo(zone.maxX, 0.5);
        dc.setStrokeStyle("#00f")
        dc.stroke();
    }

    function clickListItem (sender, e) {
        this.postNotification(hy.event.name.ITEMCLICK, [e, sender]);
    }

    function dblclickListItem (sender, e) {
        this.postNotification(hy.event.name.ITEMDBLCLICK, [e, sender]);
    }

    function mousedownListItem (sender, e) {
        if (this._itemSelEnable) {
            this.setSelectedItemIndex(sender.getItemIndex());
        }
        this.postNotification(hy.event.name.ITEMMOUSEDOWN, [e, sender]);
    }

    function mousemoveListItem (sender, e) {
        if (e.isMouseDown) {
            if (this._itemSelEnable && this._itemDragEnable) {
                var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                var clipZone = sender.getClipZone();
                if (localLoc.y > (clipZone.minY + clipZone.maxY) / 2) {
                    this.__insertFlagView.setY(sender.getY() + clipZone.minY + sender.getHeight());
                } else {
                    this.__insertFlagView.setY(sender.getY() + clipZone.minY);
                }
            }
        }
        this.postNotification(hy.event.name.ITEMMOUSEMOVE, [e, sender]);
    }

    function mouseupListItem (sender, e) {
        if (this._selectedItemIndex != sender.getItemIndex()) {
            this.__insertFlagView.setVisible(false);
            if (this._itemSelEnable && this._itemDragEnable) {
                var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                var clipZone = sender.getClipZone();
                if (localLoc.y > (clipZone.minY + clipZone.maxY) / 2) {
                    var result = this.dragItemFromTo(this._selectedItemIndex, sender.getItemIndex() + 1);
                    if (result != this._selectedItemIndex) {
                        this.postNotification(hy.event.name.ITEMDRAG, [this._selectedItemIndex, sender.getItemIndex() + 1]);
                        this.setSelectedItemIndex(result);
                    }
                } else {
                    var result = this.dragItemFromTo(this._selectedItemIndex, sender.getItemIndex());
                    if (result != this._selectedItemIndex) {
                        this.postNotification(hy.event.name.ITEMDRAG, [this._selectedItemIndex, sender.getItemIndex()]);
                        this.setSelectedItemIndex(result);
                    }
                }
            }
        }
        this.postNotification(hy.event.name.ITEMMOUSEUP, [e, sender]);
    }

    function mouseoverListItem (sender, e) {
        if (e.isMouseDown) {
            if (this._selectedItemIndex != sender.getItemIndex()) {
                if (this._itemSelEnable && this._itemDragEnable) {
                    this.__insertFlagView.setVisible(true);
                }
            }
        }
        this.postNotification(hy.event.name.ITEMMOUSEOVER, [e, sender]);
    }

    function mouseoutListItem (sender, e) {
        if (e.isMouseDown) {
            this.__insertFlagView.setVisible(false);
        }
        this.postNotification(hy.event.name.ITEMMOUSEOUT, [e, sender]);
    }

    function contextmenuListItem (sender, e) {
        this.postNotification(hy.event.name.ITEMCONTEXTMENU, [e, sender]);
    }

    function contextmenuSelectedListItem (sender, e, contextMenuIndex) {
        try {
            var itemIndex = sender.getItemIndex();
            this.postNotification(hy.event.name.ITEMCONTEXTMENUSELECTED, [e, contextMenuIndex, itemIndex]);
        } catch (err) {
            window.console.log(err)
        }
    }

    var defaultDataSource = {
        numberOfListItem: function (listView) {
            return 0;
        },
        widthOfListItem: function (listView, itemIndex) {
            return 0;
        },
        heightOfListItem: function (listView, itemIndex) {
            return 0;
        },
        contextMenuOfListItem: function (listView, itemIndex) {
            return null;
        },
        viewOfListItem: function (listView, itemIndex) {
            return null;
        }
    };

    hy.gui = hy.gui || {};
    hy.gui.ListView = hy.extend(hy.gui.ScrollView);
    hy.gui.ListView.prototype.defaultDataSource = defaultDataSource;
    hy.gui.ListView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._paddingLeft = hy.util.dataType.isUndefined(config.paddingLeft) ? 0 : config.paddingLeft;
        this._paddingRight = hy.util.dataType.isUndefined(config.paddingRight) ? 0 : config.paddingRight;
        this._paddingTop = hy.util.dataType.isUndefined(config.paddingTop) ? 0 : config.paddingTop;
        this._paddingBottom = hy.util.dataType.isUndefined(config.paddingBottom) ? 0 : config.paddingBottom;

        this._dataSource = hy.util.dataType.isUndefined(config.dataSource) ? this.defaultDataSource : config.dataSource;
        this._itemNormalColor = hy.util.dataType.isUndefined(config.itemNormalColor) ? null : config.itemNormalColor;
        this._itemSelColor = hy.util.dataType.isUndefined(config.itemSelColor) ? null : config.itemSelColor;
        this._itemSelEnable = hy.util.dataType.isUndefined(config.itemSelEnable) ? false : config.itemSelEnable;
        this._itemDragEnable = hy.util.dataType.isUndefined(config.itemDragEnable) ? false : config.itemDragEnable;
        this._selectedItemIndex = -1;

        this._reuseItemViews = {};
        this._itemViews = [];
        this._itemInfos = [];
        /*{y:(Number),height:(Number),view:(view)}*/
        this.__needReloadList = false;
        this.__needMallocListView = false;
        this.__insertFlagView = new hy.Node({visible: false, anchorX: 0, anchorY: 0.5});
        this.__insertFlagView.addObserver(hy.event.name.PAINT, this, paintInsertFlagView, 0);

        this.getContentView().addChildNodeAtLayer(this.__insertFlagView, 1);
        this.getContentView().addObserver(hy.event.name.YCHG, this, this.needMallocListView, 0);
        this.getContentView().addObserver(hy.event.name.HEIGHTCHG, this, this.needMallocListView, 0);
        this.getContentView().addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutListItemView, 0);

        this.addObserver(hy.event.name.ENTERFRAME, this, reloadList, 0);
        this.addObserver(hy.event.name.ENTERFRAME, this, mallocListView, 0);
        this.needReloadList();
    }
    hy.gui.ListView.prototype.setDataSource = function (dataSource) {
        this._dataSource = dataSource;
    }
    hy.gui.ListView.prototype.getDataSource = function () {
        return this._dataSource;
    }
    hy.gui.ListView.prototype.setItemNormalColor = function (normalColor) {
        this._itemNormalColor = normalColor;
    }
    hy.gui.ListView.prototype.getItemNormalColor = function () {
        return this._itemNormalColor;
    }
    hy.gui.ListView.prototype.setSelectedItemColor = function (itemSelColor) {
        this._itemSelColor = itemSelColor;
    }
    hy.gui.ListView.prototype.getSelectedItemColor = function () {
        return this._itemSelColor;
    }
    hy.gui.ListView.prototype.setItemDragEnable = function (itemDragEnable) {
        this._itemDragEnable = itemDragEnable;
        if (!this._itemDragEnable) {
            this.__insertFlagView.setVisible(false);
        }
    }
    hy.gui.ListView.prototype.getItemDragEnable = function () {
        return this._itemDragEnable;
    }
    hy.gui.ListView.prototype.setItemSelEnable = function (itemSelEnable) {
        this._itemSelEnable = itemSelEnable;
        if (!this._itemSelEnable) {
            this.__insertFlagView.setVisible(false);
            this.setSelectedItemIndex(-1);
        }
    }
    hy.gui.ListView.prototype.getSelItemEnable = function () {
        return this._itemSelEnable;
    }
    hy.gui.ListView.prototype.setSelectedItemIndex = function (index) {
        if (this._selectedItemIndex != index) {
            var oldSelItemIndex = this._selectedItemIndex;
            var curSelView = this.getItemViewOfItemIndex(oldSelItemIndex);
            if (curSelView) {
                curSelView.setBackgroundColor(this._itemNormalColor);
            }
            var nextSelView = this.getItemViewOfItemIndex(index);
            if (nextSelView) {
                nextSelView.setBackgroundColor(this._itemSelColor);
            }
            this._selectedItemIndex = index;
            if (oldSelItemIndex >= 0) {
                this.postNotification(hy.event.name.ITEMUNSELECTED, [oldSelItemIndex]);
            }
            if (this._selectedItemIndex >= 0) {
                this.postNotification(hy.event.name.ITEMSELECTED, [this._selectedItemIndex]);
            }
        }
    }
    hy.gui.ListView.prototype.getSelectedItemIndex = function () {
        return this._selectedItemIndex;
    }

    hy.gui.ListView.prototype.getItemViewOfItemIndex = function (itemIndex) {
        if (itemIndex >= 0 && itemIndex < this._itemInfos.length) {
            return this._itemInfos[itemIndex].view;
        } else {
            return null;
        }
    }
    hy.gui.ListView.prototype.getReuseItemViewOfIdentity = function (reuseIdentity) {
        if (this._reuseItemViews[reuseIdentity] && this._reuseItemViews[reuseIdentity].length > 0) {
            return this._reuseItemViews[reuseIdentity].pop();
        } else {
            return null;
        }
    }
    hy.gui.ListView.prototype.dragItemFromTo = function (fromIndex, toIndex) {
        return fromIndex;
    }

    hy.gui.ListView.prototype.needReloadList = function () {
        this.__needReloadList = true;
    }
    hy.gui.ListView.prototype.needMallocListView = function () {
        this.__needMallocListView = true;
    }

})(hy, window, document);
