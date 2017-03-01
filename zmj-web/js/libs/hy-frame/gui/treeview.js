var hy = hy || {};

(function (hy, win, doc) {

    function reloadTree () {
        if (this.__needReloadTree) {
            this.__needReloadTree = false;
            if (this._root) {
                var dataSource = this.getDataSource();
                recycleAllNodeView.call(this);
                var starty = this._paddingTop;
                this._nodeInfos = {y: 0, height: 0, nodePath: [], view: null, childNodes: []};
                var layoutY = reloadTreeNode.call(this, dataSource, this._nodeInfos, "", starty);
                this.setContentHeight(layoutY + this._paddingBottom);
                mallocTreeView.call(this);
            }
        }
    }

    function reloadTreeNode (dataSource, nodeInfo, nodePathStr, layoutY) {
        var nodePath = [];
        if (nodePathStr.length > 0) {
            var nodePathSplit = nodePathStr.split("-");
            var nodePathLen = nodePathSplit.length;
            for (var i = 0; i < nodePathLen; ++i) {
                nodePath.push(parseInt(nodePathSplit[i]));
            }
        }
        var nodeHeight = dataSource.heightOfNodeInPath(this, nodePath);
        nodeInfo.y = layoutY;
        nodeInfo.height = nodeHeight;
        nodeInfo.nodePath = nodePath;
        layoutY += nodeHeight;
        var childNodeNum = dataSource.numberOfNodeInPath(this, nodePath);
        for (var i = 0; i < childNodeNum; ++i) {
            var childNode = {y: 0, height: 0, nodePath: null, view: null, childNodes: []};
            var nextNodePathStr = "";
            if (nodePathStr == "") {
                nextNodePathStr = "" + i;
            } else {
                nextNodePathStr = nodePathStr + "-" + i;
            }
            layoutY = reloadTreeNode.call(this, dataSource, childNode, nextNodePathStr, layoutY);
            nodeInfo.childNodes.push(childNode);
        }
        this.needMallocTreeView();
        return layoutY;
    }

    function mallocTreeView () {
        if (this.__needMallocTreeView) {
            this.__needMallocTreeView = false;
            var dataSource = this.getDataSource();
            var contentOffsetY = this.getContentOffsetY();
            var contentMaxY = contentOffsetY + this.getHeight();
            for (var i = this._nodeViews.length - 1; i >= 0; --i) {
                var nodeView = this._nodeViews[i];
                if (nodeView.getY() >= contentMaxY || (nodeView.getY() + nodeView.getHeight() <= contentOffsetY)) {
                    var reuseIdentity = nodeView.getReuseIdentity();
                    if (!this._reuseNodeViews[reuseIdentity]) {
                        this._reuseNodeViews[reuseIdentity] = [];
                    }
                    this._reuseNodeViews[reuseIdentity].push(nodeView);
                    var nodePath = nodeView.getNodePath();
                    var nodeInfo = this._nodeInfos;
                    for (var j = 0, nodeDeepth = nodePath.length; j < nodeDeepth; ++j) {
                        nodeInfo = nodeInfo.childNodes[nodePath[j]];
                    }
                    nodeInfo.view = null;
                    nodeView.setNodePath(null);
                    nodeView.removeFromParent(false);
                    this._nodeViews.splice(i, 1);
                }
            }
            var maxContentWidth = mallocTreeNodeView.call(this, dataSource, this._nodeInfos, contentOffsetY, contentMaxY, 0);
            this.setContentWidth(maxContentWidth + this._paddingLeft + this._paddingRight);
        }
    }

    function mallocTreeNodeView (dataSource, nodeInfo, offsetY, maxY, maxContentWidth) {
        if (nodeInfo.y < maxY) {
            if (nodeInfo.y + nodeInfo.height > offsetY && nodeInfo.height > 0) {
                if (!nodeInfo.view) {
                    var nodeView = dataSource.viewOfNodeInPath(this, nodeInfo.nodePath);
                    var contextMenu = dataSource.contextMenuOfNodeInPath(this, nodeInfo.nodePath);
                    nodeView.setContextMenu(contextMenu);
                    nodeView.setX(0);
                    nodeView.setY(nodeInfo.y);
                    nodeView.setWidth(this.getContentWidth());
                    nodeView.setHeight(nodeInfo.height);
                    nodeView.setNodePath(nodeInfo.nodePath);
                    if (compareNodePath(nodeInfo.nodePath, this._selectedNodePath)) {
                        nodeView.setBackgroundColor(this._nodeSelColor);
                    } else {
                        nodeView.setBackgroundColor(this._nodeNormalColor);
                    }
                    nodeView.addObserver(hy.event.name.CLICK, this, clickTreeNode, 0);
                    nodeView.addObserver(hy.event.name.DBLCLICK, this, dblclickTreeNode, 0);
                    nodeView.addObserver(hy.event.name.MOUSEDOWN, this, mousedownTreeNode, 0);
                    nodeView.addObserver(hy.event.name.MOUSEMOVE, this, mousemoveTreeNode, 0);
                    nodeView.addObserver(hy.event.name.MOUSEUP, this, mouseupTreeNode, 0);
                    nodeView.addObserver(hy.event.name.MOUSEOVER, this, mouseoverTreeNode, 0);
                    nodeView.addObserver(hy.event.name.MOUSEOUT, this, mouseoutTreeNode, 0);
                    nodeView.addObserver(hy.event.name.CONTEXTMENU, this, contextmenuTreeNode, 0);
                    nodeView.addObserver(hy.event.name.CONTEXTMENUSELECTED, this, contextmenuSelectedTreeNode, 0);
                    this._nodeViews.push(nodeView);
                    this.getContentView().addChildNodeAtLayer(nodeView, 0);
                    nodeInfo.view = nodeView;
                }
                var nodeWidth = dataSource.widthOfNodeInPath(this, nodeInfo.nodePath);
                if (nodeWidth > maxContentWidth) {
                    maxContentWidth = nodeWidth;
                }
            }
            if (nodeInfo.childNodes) {
                var childNodeLength = nodeInfo.childNodes.length;
                for (var i = 0; i < childNodeLength; ++i) {
                    maxContentWidth = mallocTreeNodeView.call(this, dataSource, nodeInfo.childNodes[i], offsetY, maxY, maxContentWidth);
                }
            }
        }
        return maxContentWidth;
    }

    function recycleAllNodeView () {
        for (var i = this._nodeViews.length - 1; i >= 0; --i) {
            var nodeView = this._nodeViews[i];
            var reuseIdentity = nodeView.getReuseIdentity();
            if (!this._reuseNodeViews[reuseIdentity]) {
                this._reuseNodeViews[reuseIdentity] = [];
            }
            this._reuseNodeViews[reuseIdentity].push(nodeView);
            var nodePath = nodeView.getNodePath();
            var nodeInfo = this._nodeInfos;
            for (var j = 0, nodeDeepth = nodePath.length; j < nodeDeepth; ++j) {
                nodeInfo = nodeInfo.childNodes[nodePath[j]];
            }
            nodeInfo.view = null;
            nodeView.setNodePath(null);
            nodeView.removeFromParent(false);
            this._nodeViews.splice(i, 1);
        }
    }

    function layoutTreeNodeViews (sender, zone) {
        var contentWidth = this._contentView.getWidth();
        var x = this._paddingLeft;
        var width = contentWidth - this._paddingLeft - this._paddingRight;
        this.__insertFlagView.setX(x);
        this.__insertFlagView.setWidth(width);
        this.__insertFlagView.setHeight(1);
        for (var i = 0, len = this._nodeViews.length; i < len; ++i) {
            this._nodeViews[i].setX(x);
            this._nodeViews[i].setWidth(width);
        }
    }

    function paintInsertFlagView (sender, dc, zone) {
        dc.beginPath();
        var height = zone.height;
        if (height > 1) {
            dc.beginPath();
            dc.rect(zone.minX + 0.5, zone.minY + 0.5, sender.getWidth() - 1, sender.getHeight() - 1);
        } else {
            dc.beginPath();
            dc.moveTo(zone.minX, 0.5);
            dc.lineTo(zone.maxX, 0.5);
        }
        dc.setStrokeStyle("#00f");
        dc.stroke();
    }

    function compareNodePath (srcNodePath, targetNodePath) {
        if (srcNodePath) {
            if (targetNodePath) {
                if (srcNodePath == targetNodePath) {
                    return true;
                } else {
                    var srcDeepth = srcNodePath.length;
                    var targetDeepth = targetNodePath.length;
                    if (srcDeepth == targetDeepth) {
                        for (var i = srcDeepth - 1; i >= 0; --i) {
                            if (srcNodePath[i] != targetNodePath[i]) {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else {
            if (targetNodePath) {
                return false;
            } else {
                return true;
            }
        }
    }

    function checkIsChildNode (childNodePath, childDeepth, parentNodePath, parentDeepth) {
        if (parentNodePath && childNodePath) {
            if (parentNodePath.length == 0) {
                return true;
            } else {
                if (childDeepth <= parentDeepth) {
                    return false;
                } else {
                    for (var i = parentDeepth - 1; i >= 0; --i) {
                        if (childNodePath[i] != parentNodePath[i]) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        } else {
            return false;
        }
    }


    function clickTreeNode (sender, e) {
        this.postNotification(hy.event.name.NODECLICK, [e, sender]);
    }

    function dblclickTreeNode (sender, e) {
        this.postNotification(hy.event.name.NODEDBLCLICK, [e, sender]);
    }

    function mousedownTreeNode (sender, e) {
        this.postNotification(hy.event.name.NODEMOUSEDOWN, [e, sender]);
        if (this._nodeSelEnable) {
            this.setSelectedNodePath(sender.getNodePath());
        }
    }

    function mousemoveTreeNode (sender, e) {
        if (e.isMouseDown) {
            if (this._nodeSelEnable && this._nodeDragEnable) {
                var nodePath = sender.getNodePath();
                if (nodePath) {
                    if (nodePath && this._selectedNodePath
                        && !compareNodePath(this._selectedNodePath, nodePath)
                        && !checkIsChildNode(nodePath, nodePath.length, this._selectedNodePath, this._selectedNodePath.length)) {
                        var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                        var clipZone = sender.getClipZone();
                        var douCenter = clipZone.minY + clipZone.maxY;
                        var dataSource = this.getDataSource();
                        var isLeaf = dataSource.isLeafOfNodeInPath(this, nodePath);
                        var viewOffset = dataSource.viewOffsetOfNodeInPath(this, nodePath);
                        var contentWidth = this.getContentView().getWidth();
                        if (localLoc.y < douCenter / 4) {
                            this.__insertFlagView.setX(viewOffset);
                            this.__insertFlagView.setY(sender.getY() + clipZone.minY);
                            this.__insertFlagView.setWidth(contentWidth - viewOffset);
                            this.__insertFlagView.setHeight(1);
                        } else if (localLoc.y < douCenter * 3 / 4) {
                            if (!isLeaf) {
                                this.__insertFlagView.setX(viewOffset);
                                this.__insertFlagView.setY(sender.getY() + douCenter / 2);
                                this.__insertFlagView.setWidth(contentWidth - viewOffset);
                                this.__insertFlagView.setHeight(sender.getHeight());
                            }
                        } else {
                            this.__insertFlagView.setX(viewOffset);
                            this.__insertFlagView.setY(sender.getY() + clipZone.minY + sender.getHeight());
                            this.__insertFlagView.setWidth(contentWidth - viewOffset);
                            this.__insertFlagView.setHeight(1);
                        }
                        this.__insertFlagView.setVisible(true);
                    } else {
                        this.__insertFlagView.setVisible(false);
                    }
                }

            }
        }
        this.postNotification(hy.event.name.NODEMOUSEMOVE, [e, sender]);
    }

    function mouseupTreeNode (sender, e) {
        if (!compareNodePath(sender.getNodePath(), this._selectedNodePath)) {
            sender.setBackgroundColor(this._nodeNormalColor);
            this.__insertFlagView.setVisible(false);
            if (this._nodeSelEnable && this._nodeDragEnable) {
                var nodePath = sender.getNodePath();
                if (nodePath && this._selectedNodePath
                    && !compareNodePath(this._selectedNodePath, nodePath)
                    && !checkIsChildNode(nodePath, nodePath.length, this._selectedNodePath, this._selectedNodePath.length)) {
                    var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                    var clipZone = sender.getClipZone();
                    var douCenter = clipZone.minY + clipZone.maxY;
                    var dataSource = this.getDataSource();
                    var isLeaf = dataSource.isLeafOfNodeInPath(this, nodePath);
                    var desNodePath = hy.clone(nodePath);
                    if (localLoc.y > douCenter * 3 / 4) {
                        desNodePath[desNodePath.length - 1] = desNodePath[desNodePath.length - 1] + 1;
                    } else if (localLoc.y > douCenter * 1 / 4) {
                        if (!isLeaf) {
                            desNodePath.push(0);
                        } else {
                            desNodePath = null;
                        }
                    }
                    if (desNodePath != null) {
                        var result = this.dragNodeFromTo(this._selectedNodePath, desNodePath);
                        if (!compareNodePath(this._selectedNodePath, result)) {
                            this.postNotification(hy.event.name.NODEDRAG, [this._selectedNodePath, desNodePath]);
                            this.setSelectedNodePath(result);
                        }
                    }
                }
            }
        }
        this.postNotification(hy.event.name.NODEMOUSEUP, [e, sender]);
    }

    function mouseoverTreeNode (sender, e) {
        if (e.isMouseDown) {
            var nodePath = sender.getNodePath();
            if (nodePath && this._selectedNodePath
                && !compareNodePath(this._selectedNodePath, nodePath)
                && !checkIsChildNode(this._selectedNodePath, this._selectedNodePath.length, nodePath, nodePath.length)) {
                this.__insertFlagView.setVisible(true);
            } else {
                this.__insertFlagView.setVisible(false);
            }
        }
        this.postNotification(hy.event.name.NODEMOUSEOVER, [e, sender]);
    }

    function mouseoutTreeNode (sender, e) {
        if (e.isMouseDown) {
            this.__insertFlagView.setVisible(false);
        }
        this.postNotification(hy.event.name.NODEMOUSEOUT, [e, sender]);
    }

    function contextmenuTreeNode (sender, e) {
        this.postNotification(hy.event.name.NODECONTEXTMENU, [e, sender]);
    }

    function contextmenuSelectedTreeNode (sender, e, contextMenuIndex) {
        try {
            var nodePath = sender.getNodePath();
            this.postNotification(hy.event.name.NODECONTEXTMENUSELECTED, [e, contextMenuIndex, nodePath]);
        } catch (err) {
            window.console.log(err);
        }
    }

    var defaultDataSource = {
        numberOfNodeInPath: function (treeView, nodePath) {
            return 0;
        },
        widthOfNodeInPath: function (treeView, nodePath) {
            return 0;
        },
        heightOfNodeInPath: function (treeView, nodePath) {
            return 0;
        },
        contextMenuOfNodeInPath: function (treeView, nodePath) {
            return null;
        },
        viewOfNodeInPath: function (treeView, nodePath) {
            return null;
        },
        viewOffsetOfNodeInPath: function (treeView, nodePath) {
            return 0;
        },
        isLeafOfNodeInPath: function (treeView, nodePath) {
            return false;
        }
    };

    hy.gui = hy.gui || {};
    hy.gui.TreeView = hy.extend(hy.gui.ScrollView);
    hy.gui.TreeView.prototype.defaultDataSource = defaultDataSource;
    hy.gui.TreeView.prototype.init = function (config) {
        this.super("init", [config]);
        this._paddingLeft = hy.util.dataType.isUndefined(config.paddingLeft) ? 0 : config.paddingLeft;
        this._paddingRight = hy.util.dataType.isUndefined(config.paddingRight) ? 0 : config.paddingRight;
        this._paddingTop = hy.util.dataType.isUndefined(config.paddingTop) ? 0 : config.paddingTop;
        this._paddingBottom = hy.util.dataType.isUndefined(config.paddingBottom) ? 0 : config.paddingBottom;

        this._root = hy.util.dataType.isUndefined(config.root) ? null : config.root;
        this._dataSource = hy.util.dataType.isUndefined(config.dataSource) ? this.defaultDataSource : config.dataSource;
        this._nodeNormalColor = hy.util.dataType.isUndefined(config.nodeNormalColor) ? null : config.nodeNormalColor;
        this._nodeSelColor = hy.util.dataType.isUndefined(config.nodeSelColor) ? null : config.nodeSelColor;
        this._nodeDragEnable = hy.util.dataType.isUndefined(config.nodeDragEnable) ? this.defaultNodeDragEnable : config.nodeDragEnable;
        this._nodeSelEnable = hy.util.dataType.isUndefined(config.nodeSelEnable) ? this.defaultSelEnable : config.nodeSelEnable;

        this._reuseNodeViews = {};
        this._nodeViews = [];
        this._nodeInfos = {};
        this._selectedNodePath = null;
        this.__needReloadTree = false;
        this.__needMallocTreeView = false;
        this.__insertFlagView = new hy.Node({visible: false, anchorX: 0, anchorY: 0.5});
        this.__insertFlagView.addObserver(hy.event.name.PAINT, this, paintInsertFlagView, 0);

        this.getContentView().addChildNodeAtLayer(this.__insertFlagView, 1);
        this.getContentView().addObserver(hy.event.name.YCHG, this, this.needMallocTreeView, 0);
        this.getContentView().addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutTreeNodeViews, 0);
        this.addObserver(hy.event.name.HEIGHTCHG, this, this.needMallocTreeView, 0);
        this.addObserver(hy.event.name.ENTERFRAME, this, reloadTree, 0);
        this.addObserver(hy.event.name.ENTERFRAME, this, mallocTreeView, 0);
        this.needReloadTree();
    }
    hy.gui.TreeView.prototype.setRoot = function (root) {
        if (this._root != root) {
            this._root = root;
            this.needReloadTree();
        }
    }
    hy.gui.TreeView.prototype.getRoot = function () {
        return this._root;
    }
    hy.gui.TreeView.prototype.setDataSource = function (dataSource) {
        if (this._dataSource != dataSource) {
            this._dataSource = dataSource;
            this.needReloadTree();
        }
    }
    hy.gui.TreeView.prototype.getDataSource = function () {
        return this._dataSource;
    }
    hy.gui.TreeView.prototype.setNodeNormalColor = function (color) {
        this._nodeNormalColor = color;
    }
    hy.gui.TreeView.prototype.getNodeNormalColor = function () {
        return this._nodeNormalColor;
    }
    hy.gui.TreeView.prototype.setNodeSelColor = function (color) {
        this._nodeSelColor = color;
    }
    hy.gui.TreeView.prototype.getNodeSelColor = function () {
        return this._nodeSelColor;
    }
    hy.gui.TreeView.prototype.setNodeDragEnable = function (dragEnable) {
        this._nodeDragEnable = dragEnable;
        if (!this._nodeDragEnable) {
            this.__insertFlagView.setVisible(false);
        }
    }
    hy.gui.TreeView.prototype.getNodeDragEnable = function () {
        return this._nodeDragEnable;
    }
    hy.gui.TreeView.prototype.setNodeSelEnable = function (selEnable) {
        this._nodeSelEnable = selEnable;
        if (!this._nodeSelEnable) {
            this.__insertFlagView.setVisible(false);
            this.setSelectedNodePath(null);
        }
    }
    hy.gui.TreeView.prototype.getNodeSelEnable = function () {
        return this._nodeSelEnable;
    }
    hy.gui.TreeView.prototype.setSelectedNodePath = function (nodePath) {
        if (!compareNodePath(nodePath, this._selectedNodePath)) {
            var oldNodePath = this._selectedNodePath;
            var curSelView = this.getNodeViewOfNodePath(oldNodePath, oldNodePath ? oldNodePath.length : 0);
            if (curSelView) {
                curSelView.setBackgroundColor(this._nodeNormalColor);
            }
            var nextNodeView = this.getNodeViewOfNodePath(nodePath, nodePath ? nodePath.length : 0);
            if (nextNodeView) {
                nextNodeView.setBackgroundColor(this._nodeSelColor);
            }
            this._selectedNodePath = nodePath;
            if (oldNodePath) {
                this.postNotification(hy.event.name.NODEUNSELECTED, [oldNodePath]);
            }
            if (nodePath) {
                this.postNotification(hy.event.name.NODESELECTED, [nodePath]);
            }
        }
    }
    hy.gui.TreeView.prototype.getSelectedNodePath = function () {
        return this._selectedNodePath;
    }

    hy.gui.TreeView.prototype.dragNodeFromTo = function (fromNodePath, toNodePath) {
        return fromNodePath;
    }
    hy.gui.TreeView.prototype.getNodeViewOfNodePath = function (nodePath, nodeDeepth) {
        if (nodePath && nodeDeepth <= nodePath.length) {
            var node = this._nodeInfos;
            for (var i = 0; i < nodeDeepth; ++i) {
                if (node.childNodes && nodePath[i] < node.childNodes.length) {
                    node = node.childNodes[nodePath[i]];
                } else {
                    return null;
                }
            }
            if (node) {
                return node.view;
            }
        } else {
            return null;
        }
    }
    hy.gui.TreeView.prototype.getReuseNodeViewOfIdentity = function (reuseIdentity) {
        if (this._reuseNodeViews[reuseIdentity] && this._reuseNodeViews[reuseIdentity].length > 0) {
            return this._reuseNodeViews[reuseIdentity].pop();
        } else {
            return null;
        }
    }

    hy.gui.TreeView.prototype.needReloadTree = function () {
        this.__needReloadTree = true;
    }
    hy.gui.TreeView.prototype.needMallocTreeView = function () {
        this.__needMallocTreeView = true;
    }

})(hy, window, document);