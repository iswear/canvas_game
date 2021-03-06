/**
 * Created by iswear on 16/3/23.
 */
var hy = hy || {};

+function (hy, win, doc) {

    function mousedownMenuItem (sender, e, itemview) {
        this.__readyHidden = false;
    }

    function mouseupMenuItem (sender, e, itemview) {
        var menutype = this.getUserProperty("menutype");
        var menunode = this.getUserProperty("menunode");
        switch (menutype) {
            case hy.gui.CONTEXTMENU_TYPE_NORMAL:
            {
                menunode.postNotification(hy.event.name.CONTEXTMENUSELECTED, [e, itemview.getItemIndex()]);
                break;
            }
            case hy.gui.CONTEXTMENU_TYPE_DROPDOWN:
            {
                menunode.postNotification(hy.event.name.DROPDOWNMENUSELECTED, [e, itemview.getItemIndex()]);
                break;
            }
            case hy.gui.CONTEXTMENU_TYPE_COMBOBOX:
            {
                menunode.setSelectedItemIndex(itemview.getItemIndex());
                break;
            }
            default:
            {
                break;
            }
        }
        this.__readyHidden = true;
        this.hide();
    }

    function mouseoverMenuItem (sender, e, itemView) {
        itemView.setBackgroundColor(hy.gui.colors.BLUE);
    }

    function mouseoutMenuItem (sender, e, itemView) {
        itemView.setBackgroundColor(null);
    }

    function layoutContextMenu (sender, zone) {
        this._menuList.setX(1);
        this._menuList.setY(1);
        this._menuList.setWidth(this.getWidth() - 2);
        this._menuList.setHeight(this.getHeight() - 2);
    }

    hy.gui = hy.gui || {};
    hy.gui.ContextMenu = hy.extend(hy.gui.View);
    hy.gui.ContextMenu.prototype.defaultBorderWidth = 1;
    hy.gui.ContextMenu.prototype.defaultBorderColor = hy.gui.colors.PUREBLACK;
    hy.gui.ContextMenu.prototype.init = function (config) {
        this.superCall("init", [config]);
        this.__readyHidden = true;
        this._menuList = new hy.gui.SimpleListView({
            itemHeight: 23,
            scrollBarVisible: true,
            backgroundColor: hy.gui.colors.PUREWHITE
        });
        this.addChildNodeAtLayer(this._menuList, 0);
        this._menuList.addObserver(hy.event.name.ITEMMOUSEDOWN, this, mousedownMenuItem, 0);
        this._menuList.addObserver(hy.event.name.ITEMMOUSEUP, this, mouseupMenuItem, 0);
        this._menuList.addObserver(hy.event.name.ITEMMOUSEOVER, this, mouseoverMenuItem, 0);
        this._menuList.addObserver(hy.event.name.ITEMMOUSEOUT, this, mouseoutMenuItem, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutContextMenu, 0);
    }
    hy.gui.ContextMenu.prototype.setItems = function (items) {
        this._menuList.setItems(items);
    }
    hy.gui.ContextMenu.prototype.showForNode = function (e, node, menuItems, menuType) {
        if (this.getVisible()) {
            this.hide();
        }
        this.setUserProperty("menunode", node);
        this.setUserProperty("menutype", menuType);
        switch (menuType) {
            case hy.gui.CONTEXTMENU_TYPE_NORMAL:
            {
                var x = e.offsetLoc.x + 3;
                var y = e.offsetLoc.y + 3;
                this.setItems(menuItems);
                var width = this.getWidth();
                var height = this.getHeight();
                if (x + width > this._winWidth) {
                    x -= (width + 6);
                }
                if (y + height > this._winHeight) {
                    y -= (y + height - this._winHeight);
                }
                this.setX(x);
                this.setY(y);
                this.setWidth(120);
                this.setHeight(menuItems ? (23 * menuItems.length + 2) : 0);
                this.__readyHidden = true;
                this.setVisible(true);
                break;
            }
            case hy.gui.CONTEXTMENU_TYPE_DROPDOWN:
            {
                node.setBackgroundColor(node.getSelColor());
                var pointNode = node.transPointToAncestorNode({x: 0, y: node.getHeight()}, null);
                this.setX(pointNode.x);
                this.setY(pointNode.y);
                this.setWidth(120);
                this.setHeight(menuItems ? (23 * menuItems.length + 2) : 0);
                this.setItems(menuItems);
                this.__readyHidden = true;
                this.setVisible(true);
                break;
            }
            case hy.gui.CONTEXTMENU_TYPE_COMBOBOX:
            {
                var pointNode = node.transPointToAncestorNode({x: 0, y: node.getHeight()}, null);
                this.setX(pointNode.x);
                this.setY(pointNode.y);
                this.setWidth(node.getWidth());
                if (menuItems) {
                    var height = 23 * menuItems.length + 2;
                    this.setHeight(height > 200 ? 200 : height);
                } else {
                    this.setHeight(0);
                }
                this.setItems(menuItems);
                this.__readyHidden = true;
                this.setVisible(true);
                break;
            }
            default:
            {
                break;
            }
        }
    }
    hy.gui.ContextMenu.prototype.hide = function () {
        if (this.__readyHidden) {
            var menutype = this.getUserProperty("menutype");
            if (menutype == 1) {
                var menunode = this.getUserProperty("menunode");
                menunode.setBackgroundColor(menunode.getNormalColor());
            }
            this.setVisible(false);
            this.setItems(null);
        }
    }

}(hy, window, document);