var hy = hy || {};

(function (hy, win, doc) {

    function expandedTreeNode (sender, e) {
        if (sender && e.targetNode == sender.getNodeExpandIcon()) {
            var nodeData = sender.getNodeData();
            if (nodeData.expanded) {
                nodeData.expanded = false;
            } else {
                nodeData.expanded = true;
            }
            this.needReloadTree();
        }
    }

    var defaultDataSource = {
        numberOfNodeInPath: function (treeView, nodePath) {
            var node = treeView.getRoot();
            if (node) {
                var nodeDeepth = nodePath.length;
                for (var i = 0; i < nodeDeepth; ++i) {
                    node = node.childNodes[nodePath[i]];
                }
                if (!node || node.leaf || !node.expanded || !node.childNodes) {
                    return 0;
                } else {
                    return node.childNodes.length;
                }
            } else {
                return 0;
            }
        },
        heightOfNodeInPath: function (treeView, nodePath) {
            return treeView._nodeHeight;
        },
        widthOfNodeInPath: function (treeView, nodePath) {
            var simpleNodeView = treeView.getNodeViewOfNodePath(nodePath, nodePath.length);
            if (simpleNodeView) {
                return simpleNodeView.getHeight() * (nodePath.length + 2) + simpleNodeView.getNodeLabel().getTextMeasuredLength() + 5;
            } else {
                return 0;
            }
        },
        contextMenuOfNodeInPath: function (treeView, nodePath) {
            return null;
        },
        viewOfNodeInPath: function (treeView, nodePath) {
            var nodeRoot = treeView.getRoot();
            if (nodeRoot) {
                var nodeDeepth = nodePath.length;
                for (var i = 0; i < nodeDeepth; ++i) {
                    nodeRoot = nodeRoot.childNodes[nodePath[i]];
                }
                var nodeView = treeView.getReuseNodeViewOfIdentity("simpletreenode");
                if (nodeView == null) {
                    nodeView = new hy.gui.SimpleTreeNodeView({reuseIdentity: "simpletreenode"});
                    nodeView.addObserver(hy.event.name.MOUSEDOWN, treeView, expandedTreeNode, 0);
                }
                nodeView.setNodeData(nodeRoot);
                return nodeView;
            } else {
                return null;
            }
        },
        isLeafOfNodeInPath: function (treeView, nodePath) {
            var nodeData = treeView.getNodeViewOfNodePath(nodePath);
            if (nodeData && nodeData.leaf) {
                return true;
            } else {
                return false;
            }
        },
        viewOffsetOfNodeInPath: function (treeView, nodePath) {
            return nodePath.length * treeView.getNodeHeight();
        }
    };

    hy.gui = hy.gui || {};
    hy.gui.SimpleTreeView = hy.extend(hy.gui.TreeView);
    hy.gui.SimpleTreeView.prototype.defaultNodeHeight = 20;
    hy.gui.SimpleTreeView.prototype.defaultDataSource = defaultDataSource;
    hy.gui.SimpleTreeView.prototype.init = function (config) {
        this.super("init", [config]);
        this._nodeHeight = hy.util.dataType.isUndefined(config.nodeHeight) ? this.defaultNodeHeight : config.nodeHeight;
    }
    hy.gui.SimpleTreeView.prototype.setNodeHeight = function (nodeHeight) {
        if (this._nodeHeight != nodeHeight) {
            this._nodeHeight = nodeHeight;
            this.needReloadTree();
        }
    }
    hy.gui.SimpleTreeView.prototype.getNodeHeight = function () {
        return this._nodeHeight;
    }
    hy.gui.SimpleTreeView.prototype.getNodeDataOfNodePath = function (nodePath, nodeDeepth) {
        if (nodePath && nodeDeepth >= 0 && nodeDeepth <= nodePath.length) {
            var node = this.getRoot();
            if (node) {
                for (var i = 0; i < nodeDeepth; ++i) {
                    if (node.childNodes && nodePath[i] < node.childNodes.length) {
                        node = node.childNodes[nodePath[i]];
                    } else {
                        return null;
                    }
                }
                return node;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    hy.gui.SimpleTreeView.prototype.dragNodeFromTo = function (fromNodePath, toNodePath) {
        if (fromNodePath && toNodePath) {
            var fromParNodeData = this.getNodeDataOfNodePath(fromNodePath, fromNodePath.length - 1);
            var toParNodeData = this.getNodeDataOfNodePath(toNodePath, toNodePath.length - 1);
            var fromNodeData = this.getNodeDataOfNodePath(fromNodePath, fromNodePath.length);
            var fromIndex = fromNodePath[fromNodePath.length - 1];
            var toIndex = toNodePath[toNodePath.length - 1];
            if (fromParNodeData == toParNodeData) {
                if (fromIndex > toIndex) {
                    fromParNodeData.childNodes.splice(fromIndex, 1);
                    toParNodeData.childNodes.splice(toIndex, 0, fromNodeData);
                    this.needReloadTree();
                } else if (fromIndex < toIndex) {
                    fromParNodeData.childNodes.splice(fromIndex, 1);
                    toParNodeData.childNodes.splice(toIndex - 1, 0, fromNodeData);
                    toNodePath[toNodePath.length - 1] = toIndex - 1;
                    this.needReloadTree();
                }
            } else {
                if (!toParNodeData.childNodes) {
                    toParNodeData.childNodes = [];
                }
                fromParNodeData.childNodes.splice(fromIndex, 1);
                toParNodeData.childNodes.splice(toIndex, 0, fromNodeData);
                this.needReloadTree();
            }
        }
        return this.getSelectedNodePath();
    }

})(hy, window, document);