var hy = hy || {};

+function (hy, win, doc) {

    function syncClipZoneX (sender) {
        var width = Math.round(this._width);
        var minX = -Math.round(this._anchorX * this._width);
        var maxX = width + minX;
        if (minX != this._clipZone.minX) {
            this._clipZone.minX = minX;
            this.refresh();
        }
        if (maxX != this._clipZone.maxX) {
            this._clipZone.maxX = maxX;
            this.refresh();
        }
        if (width != this._clipZone.width) {
            this._clipZone.width = width;
            this.refresh();
            this.needLayoutSubNodes();
        }
    }

    function syncClipZoneY (sender) {
        var height = Math.round(this._height);
        var minY = -Math.round(this._anchorY * this._height);
        var maxY = height + minY;
        if (minY != this._clipZone.minY) {
            this._clipZone.minY = minY;
            this.refresh();
        }
        if (maxY != this._clipZone.maxY) {
            this._clipZone.maxY = maxY;
            this.refresh();
        }
        if (height != this._clipZone.height) {
            this._clipZone.height = height;
            this.refresh();
            this.needLayoutSubNodes();
        }
    }

    function syncIntX (sender) {
        var x = Math.round(this._x);
        if (x != this._clipZone.x) {
            this._clipZone.x = x;
            this.refresh();
        }
    }

    function syncIntY (sender) {
        var y = Math.round(this._y);
        if (y != this._clipZone.y) {
            this._clipZone.y = y;
            this.refresh();
        }
    }

    function syncRotateZSinCos (sender) {
        this.__rotateZSinCos.sin = Math.sin(this._rotateZ);
        this.__rotateZSinCos.cos = Math.cos(this._rotateZ);
    }

    function beforeDragNode (sender, e) {
        var localLoc = this.transPointFromAncestorNode(e.offsetLoc, null);
        var responseZone = this._responseZone;
        if (this._dragEnable
            && localLoc.x >= responseZone.minX && localLoc.x <= responseZone.maxX
            && localLoc.y >= responseZone.minY && localLoc.y <= responseZone.maxY) {
            var app = this.getApplication();
            this.__dragStatus.startCanvasLoc = {x: e.offsetLoc.x, y: e.offsetLoc.y};
            this.__dragStatus.startParantLoc = {x: this.getX(), y: this.getY()};
            this.postNotification(hy.event.name.BEFOREDRAG, [e]);
            app.addObserver(hy.event.name.MOUSEMOVE, this, dragingNode, 0);
            app.addObserver(hy.event.name.MOUSEUP, this, afterDragNode, 0);
            e.stopDispatch();
        }
    }

    function dragingNode (sender, e) {
        var parent = this.getParent();
        if (parent == null) {
            this.setX(e.offsetX + this.__dragStatus.startParantLoc.x - this.__dragStatus.startCanvasLoc.x);
            this.setY(e.offsetY + this.__dragStatus.startParantLoc.y - this.__dragStatus.startCanvasLoc.y);
        } else {
            var parentCurPoint = parent.transPointFromAncestorNode(e.offsetLoc, null);
            var parentStartPoint = parent.transPointFromAncestorNode(this.__dragStatus.startCanvasLoc, null);
            this.setX(parentCurPoint.x + this.__dragStatus.startParantLoc.x - parentStartPoint.x);
            this.setY(parentCurPoint.y + this.__dragStatus.startParantLoc.y - parentStartPoint.y);
        }
        this.postNotification(hy.event.name.DRAGING, [e]);
    }

    function afterDragNode (sender, e) {
        var app = this.getApplication();
        app.removeObserver(hy.event.name.MOUSEMOVE, this, dragingNode, 0);
        app.removeObserver(hy.event.name.MOUSEUP, this, afterDragNode, 0);
        this.postNotification(hy.event.name.AFTERDRAG, [e]);
    }

    function contextMenuNode (sender, e) {
        if (this._contextMenu != null && this._contextMenu.length > 0) {
            var app = this.getApplication();
            app.showContextMenu(e, this, this._contextMenu, hy.gui.CONTEXTMENU_TYPE_NORMAL);
            e.stopDispatch();
        }
    }

    hy.Node = hy.extend(hy.Observable);
    hy.Node.prototype.defaultX = 0;
    hy.Node.prototype.defaultY = 0;
    hy.Node.prototype.defaultWidth = 100;
    hy.Node.prototype.defaultHeight = 50;
    hy.Node.prototype.defaultAnchorX = 0.5;
    hy.Node.prototype.defaultAnchorY = 0.5;
    hy.Node.prototype.defaultAlpha = 1.0;
    hy.Node.prototype.defaultRotateZ = 0;
    hy.Node.prototype.defaultVisible = true;
    hy.Node.prototype.defaultCornorRadius = 0;
    hy.Node.prototype.defaultCursor = null;
    hy.Node.prototype.defaultContextMenu = null;

    hy.Node.prototype.defaultClipEnable = false;
    hy.Node.prototype.defaultResponseEnable = false;
    hy.Node.prototype.defaultDragEnable = false;

    hy.Node.prototype.defaultMinX = 0;
    hy.Node.prototype.defaultMaxX = Infinity;
    hy.Node.prototype.defaultMinY = 0;
    hy.Node.prototype.defaultMaxY = Infinity;

    hy.Node.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._x = hy.util.dataType.isUndefined(config.x) ? this.defaultX : config.x;
        this._y = hy.util.dataType.isUndefined(config.y) ? this.defaultY : config.y;
        this._width = hy.util.dataType.isUndefined(config.width) ? this.defaultWidth : config.width;
        this._height = hy.util.dataType.isUndefined(config.height) ? this.defaultHeight : config.height;
        this._anchorX = hy.util.dataType.isUndefined(config.anchorX) ? this.defaultAnchorX : config.anchorX;
        this._anchorY = hy.util.dataType.isUndefined(config.anchorY) ? this.defaultAnchorY : config.anchorY;
        this._scaleX = hy.util.dataType.isUndefined(config.scaleX) ? 1 : config.scaleX;
        this._scaleY = hy.util.dataType.isUndefined(config.scaleY) ? 1 : config.scaleY;
        this._alpha = hy.util.dataType.isUndefined(config.alpha) ? this.defaultAlpha : config.alpha;
        this._rotateZ = hy.util.dataType.isUndefined(config.rotateZ) ? this.defaultRotateZ : config.rotateZ;
        this._visible = hy.util.dataType.isUndefined(config.visible) ? this.defaultVisible : config.visible;
        this._cornorRadius = hy.util.dataType.isUndefined(config.cornorRadius) ? this.defaultCornorRadius : config.cornorRadius;
        this._cursor = hy.util.dataType.isUndefined(config.cursor) ? this.defaultCursor : config.cursor;
        this._contextMenu = hy.util.dataType.isUndefined(config.contextMenu) ? this.defaultContextMenu : config.contextMenu;
        this._childNodes = hy.util.dataType.isUndefined(config.defaultLayer) ? {
            count: 0,
            defaultLayer: 0,
            nodeLayers: []
        } : {
            count: 0,
            defaultLayer: config.defaultLayer,
            nodeLayers: []
        };

        this._clipEnable = hy.util.dataType.isUndefined(config.clipEnable) ? this.defaultClipEnable : config.clipEnable;
        this._responseEnable = hy.util.dataType.isUndefined(config.responseEnable) ? this.defaultResponseEnable : config.responseEnable;
        this._dragEnable = hy.util.dataType.isUndefined(config.dragEnable) ? this.defaultDragEnable : config.dragEnable;
        this._wheelEnable = hy.util.dataType.isUndefined(config.wheelEnable) ? this.defaultWheelEnable : config.wheelEnable;

        this._clipZone = {minX: 0, maxX: 0, minY: 0, maxY: 0};
        this._responseZone = hy.util.dataType.isUndefined(config.responseZone) ? {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0
        } : config.responseZone;

        this._tag = hy.util.dataType.isUndefined(config.tag) ? 0 : config.tag;
        this._minX = hy.util.dataType.isUndefined(config.minX) ? (-Infinity) : config.minX;
        this._maxX = hy.util.dataType.isUndefined(config.maxX) ? Infinity : config.maxX;
        this._minY = hy.util.dataType.isUndefined(config.minY) ? (-Infinity) : config.minY;
        this._maxY = hy.util.dataType.isUndefined(config.maxY) ? Infinity : config.maxY;
        this._minWidth = hy.util.dataType.isUndefined(config.minWidth) ? this.defaultMinX : config.minWidth;
        this._maxWidth = hy.util.dataType.isUndefined(config.maxWidth) ? this.defaultMaxX : config.maxWidth;
        this._minHeight = hy.util.dataType.isUndefined(config.minHeight) ? this.defaultMinY : config.minHeight;
        this._maxHeight = hy.util.dataType.isUndefined(config.maxHeight) ? this.defaultMaxY : config.maxHeight;

        this._paintInheritInfo = {};
        this._application = null;
        this._parent = null;
        this._needLayoutSubNodes = true;
        this.__rotateZSinCos = {sin: 0, cos: 0};
        this.__dragStatus = {startCanvasLoc: null, startParantLoc: null, ready: false};

        this.addObserver(hy.event.name.WIDTHCHG, this, syncClipZoneX, 0);
        this.addObserver(hy.event.name.ANCHORXCHG, this, syncClipZoneX, 0);
        this.addObserver(hy.event.name.HEIGHTCHG, this, syncClipZoneY, 0);
        this.addObserver(hy.event.name.ANCHORYCHG, this, syncClipZoneY, 0);
        this.addObserver(hy.event.name.XCHG, this, syncIntX, 0);
        this.addObserver(hy.event.name.YCHG, this, syncIntY, 0);

        this.addObserver(hy.event.name.ROTATEZCHG, this, syncRotateZSinCos, 0);
        this.addObserver(hy.event.name.MOUSEDOWN, this, beforeDragNode, 0);
        this.addObserver(hy.event.name.CONTEXTMENU, this, contextMenuNode, 0);

    }
    hy.Node.prototype.sync = function () {
        this.superCall("sync", null);
        syncClipZoneX.call(this);
        syncClipZoneY.call(this);
        syncIntX.call(this);
        syncIntY.call(this);
        syncRotateZSinCos.call(this);
    }
    hy.Node.prototype.setX = function (x) {
        if (this._x != x) {
            x = (x > this._minX) ? x : this._minX;
            x = (x < this._maxX) ? x : this._maxX;
            if (this._x != x) {
                this._x = x;
                this.postNotification(hy.event.name.XCHG, null);
            }
        }
    }
    hy.Node.prototype.getX = function () {
        return this._clipZone.x;
    }
    hy.Node.prototype.setY = function (y) {
        if (this._y != y) {
            y = (y > this._minY) ? y : this._minY;
            y = (y < this._maxY) ? y : this._maxY;
            if (this._y != y) {
                this._y = y;
                this.postNotification(hy.event.name.YCHG, null);
            }
        }
    }
    hy.Node.prototype.getY = function () {
        return this._clipZone.y;
    }
    hy.Node.prototype.setWidth = function (width) {
        if (this._width != width) {
            width = (width > this._minWidth) ? width : this._minWidth;
            width = (width < this._maxWidth) ? width : this._maxWidth;
            if (this._width != width) {
                this._width = width;
                this.postNotification(hy.event.name.WIDTHCHG, null);
            }
        }
    }
    hy.Node.prototype.getWidth = function () {
        return this._clipZone.width;
    }
    hy.Node.prototype.setHeight = function (height) {
        if (this._height != height) {
            height = (height > this._minHeight) ? height : this._minHeight;
            height = (height < this._maxHeight) ? height : this._maxHeight;
            if (this._height != height) {
                this._height = height;
                this.postNotification(hy.event.name.HEIGHTCHG, null);
            }
        }
    }
    hy.Node.prototype.getHeight = function () {
        return this._clipZone.height;
    }
    hy.Node.prototype.setAnchorX = function (anchorX) {
        if (this._anchorX != anchorX) {
            this._anchorX = anchorX;
            this.postNotification(hy.event.name.ANCHORXCHG, null);
        }
    }
    hy.Node.prototype.getAnchorX = function () {
        return this._anchorX;
    }
    hy.Node.prototype.setAnchorY = function (anchorY) {
        if (this._anchorY != anchorY) {
            this._anchorY = anchorY;
            this.postNotification(hy.event.name.ANCHORYCHG, null);
        }
    }
    hy.Node.prototype.getAnchorY = function () {
        return this._anchorY;
    }
    hy.Node.prototype.setScaleX = function (scaleX) {
        if (this._scaleX != scaleX) {
            this._scaleX = scaleX;
            this.refresh();
            this.postNotification(hy.event.name.SCALEXCHG, null);
        }
    }
    hy.Node.prototype.getScaleX = function () {
        return this._scaleX;
    }
    hy.Node.prototype.setScaleY = function (scaleY) {
        if (this._scaleY != scaleY) {
            this._scaleY = scaleY;
            this.refresh();
            this.postNotification(hy.event.name.SCALEYCHG, null);
        }
    }
    hy.Node.prototype.getScaleY = function () {
        return this._scaleY;
    }
    hy.Node.prototype.setAlpha = function (alpha) {
        if (this._alpha != alpha) {
            this._alpha = alpha;
            this.refresh();
            this.postNotification(hy.event.name.ALPHACHG, null);
        }
    }
    hy.Node.prototype.getAlpha = function () {
        return this._alpha;
    }
    hy.Node.prototype.setRotateZ = function (rotateZ) {
        if (this._rotateZ != rotateZ) {
            this._rotateZ = rotateZ;
            this.refresh();
            this.postNotification(hy.event.name.ROTATEZCHG, null);
        }
    }
    hy.Node.prototype.getRotateZ = function () {
        return this._rotateZ;
    }
    hy.Node.prototype.setVisible = function (visible) {
        if (this._visible != visible) {
            this._visible = visible;
            this.refresh();
        }
    }
    hy.Node.prototype.getVisible = function () {
        return this._visible;
    }
    hy.Node.prototype.setClipEnable = function (clipEnable) {
        if (this._clipEnable != clipEnable) {
            this._clipEnable = clipEnable;
            this.refresh();
        }
    }
    hy.Node.prototype.getClipEnable = function () {
        return this._clipEnable;
    }
    hy.Node.prototype.setCornorRadius = function (radius) {
        if (this._cornorRadius != radius) {
            this._cornorRadius = radius;
            this.refresh();
        }
    }
    hy.Node.prototype.getCornorRadius = function () {
        return this._cornorRadius;
    }
    hy.Node.prototype.setCursor = function (cursor) {
        this._cursor = cursor;
    }
    hy.Node.prototype.getCursor = function () {
        return this._cursor;
    }
    hy.Node.prototype.setResponseEnable = function (responseEnable) {
        this._responseEnable = responseEnable;
    }
    hy.Node.prototype.getResponseEnable = function () {
        return this._responseEnable;
    }
    hy.Node.prototype.setDragEnable = function (dragEnable) {
        this._dragEnable = dragEnable;
    }
    hy.Node.prototype.getDragEnable = function () {
        return this._dragEnable;
    }
    hy.Node.prototype.setWheelEnable = function (wheelEnable) {
        this._wheelEnable = wheelEnable;
    }
    hy.Node.prototype.getWheelEnable = function () {
        return this._wheelEnable;
    }
    hy.Node.prototype.setContextMenu = function (contextMenu) {
        this._contextMenu = contextMenu;
    }
    hy.Node.prototype.getContextMenu = function () {
        return this._contextMenu;
    }
    hy.Node.prototype.setTag = function (tag) {
        this._tag = tag;
    }
    hy.Node.prototype.getTag = function () {
        return this._tag;
    }
    hy.Node.prototype.setMinX = function (minX) {
        this._minX = minX;
        if (this._x < minX) {
            this.setX(minX);
        }
    }
    hy.Node.prototype.getMinX = function () {
        return this._minX;
    }
    hy.Node.prototype.setMinY = function (minY) {
        this._minY = minY;
        if (this._y < minY) {
            this.setY(minY);
        }
    }
    hy.Node.prototype.getMinY = function () {
        return this._minY;
    }
    hy.Node.prototype.setMaxX = function (maxX) {
        this._maxX = maxX;
        if (this._x > maxX) {
            this.setX(maxX);
        }
    }
    hy.Node.prototype.getMaxX = function () {
        return this._maxX;
    }
    hy.Node.prototype.setMaxY = function (maxY) {
        this._maxY = maxY;
        if (this._y > maxY) {
            this.setY(maxY);
        }
    }
    hy.Node.prototype.getMaxY = function () {
        return this._maxY;
    }
    hy.Node.prototype.setMinWidth = function (minWidth) {
        this._minWidth = minWidth;
        if (this._width < minWidth) {
            this.setWidth(minWidth);
        }
    }
    hy.Node.prototype.getMinWidth = function () {
        return this._minWidth;
    }
    hy.Node.prototype.setMinHeight = function (minHeight) {
        this._minHeight = minHeight;
        if (this._height < minHeight) {
            this.setHeight(minHeight);
        }
    }
    hy.Node.prototype.getMinHeight = function () {
        return this._minHeight;
    }
    hy.Node.prototype.setMaxWidth = function (maxWidth) {
        this._maxWidth = maxWidth;
        if (this._width > maxWidth) {
            this.setWidth(maxWidth);
        }
    }
    hy.Node.prototype.getMaxWidth = function () {
        return this._maxWidth;
    }
    hy.Node.prototype.setMaxHeight = function (maxHeight) {
        this._maxHeight = maxHeight;
        if (this._height > maxHeight) {
            this.setHeight(maxHeight);
        }
    }
    hy.Node.prototype.getMaxHeight = function () {
        return this._maxHeight;
    }
    hy.Node.prototype.setPaintInheritValue = function (key, value) {
        this._paintInheritInfo[key] = value;
    }
    hy.Node.prototype.getPaintInheritValue = function (key) {
        return this._paintInheritInfo[key];
    }

    hy.Node.prototype.getClipZone = function () {
        return this._clipZone;
    }
    hy.Node.prototype.getResponseZone = function () {
        return this._responseZone;
    }

    hy.Node.prototype.setApplication = function (app) {
        this._application = app;
    }
    hy.Node.prototype.getApplication = function () {
        if (!this._application) {
            var parent = this._parent;
            if (parent == null) {
                this._application = null;
            } else {
                this._application = parent.getApplication();
            }
        }
        return this._application;
    }
    hy.Node.prototype.setParent = function (parent) {
        this._parent = parent;
    }
    hy.Node.prototype.getParent = function () {
        return this._parent;
    }

    hy.Node.prototype.getLayers = function () {
        return this._childNodes.nodeLayers;
    }
    hy.Node.prototype.getLayerAt = function (layerIndex) {
        if (layerIndex < this._childNodes.nodeLayers.length) {
            return this._childNodes.nodeLayers[layerIndex];
        } else {
            return null;
        }
    }
    hy.Node.prototype.getChildNodeAt = function (layerIndex, nodeIndex) {
        if (layerIndex < this._childNodes.nodeLayers.length) {
            var layer = this._childNodes.nodeLayers[layerIndex];
            if (layer) {
                if (nodeIndex < layer.length) {
                    return layer[nodeIndex];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    hy.Node.prototype.getChildNodeLocation = function (node) {
        for (var i = 0, len = this._childNodes.nodeLayers.length - 1; i < len; --i) {
            var curlayer = this._childNodes.nodeLayers[i];
            if (curlayer) {
                for (var j = 0, layerLen = curlayer.length; j < layerLen; --j) {
                    var curnode = curlayer[j];
                    if (curnode == node) {
                        return {layerIndex: i, nodeIndex: j};
                    }
                }
            }
        }
        return {layerIndex: -1, nodeIndex: -1};
    }
    hy.Node.prototype.getChildNodeIndexAtLayer = function (node, layerIndex) {
        if (layerIndex < this._childNodes.nodeLayers.length) {
            var curLayer = this._childNodes.nodeLayers[layerIndex];
            if (curLayer) {
                for (var i = 0, len = curLayer.length; i < len; ++i) {
                    if (curLayer[i] == node) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    hy.Node.prototype.getChildNodeCount = function () {
        return this._childNodes.count;
    }
    hy.Node.prototype.addChildNode = function (node) {
        if (!node.getParent()) {
            this.addChildNodeAtLayer(node, this._childNodes.defaultLayer);
        }
    }
    hy.Node.prototype.addChildNodeAtLayer = function (node, layerIndex) {
        if (!node.getParent()) {
            if (!this._childNodes.nodeLayers[layerIndex]) {
                this._childNodes.nodeLayers[layerIndex] = [];
            }
            node.setParent(this);
            this._childNodes.nodeLayers[layerIndex].push(node);
            this._childNodes.count++;
            this.needLayoutSubNodes();
            this.refresh();
        }
    }
    hy.Node.prototype.addChildNodeAtLocation = function (node, layerIndex, nodeIndex) {
        if (!node.getParent()) {
            if (!this._childNodes.nodeLayers[layerIndex]) {
                this._childNodes.nodeLayers[layerIndex] = [];
            }
            var len = this._childNodes.nodeLayers[layerIndex].length;
            node.setParent(this);
            if (len < nodeIndex) {
                this._childNodes.nodeLayers[layerIndex].push(node);
                this._childNodes.count++;
                this.needLayoutSubNodes();
                this.refresh();
                return len;
            } else {
                this._childNodes.nodeLayers[layerIndex].splice(nodeIndex, 0, node);
                this._childNodes.count++;
                this.needLayoutSubNodes();
                this.refresh();
                return nodeIndex;
            }
        }
    }
    hy.Node.prototype.removeChildNode = function (node, clean) {
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            if (layer) {
                for (var j = 0, layerLen = layer.length; j < layerLen; ++j) {
                    if (node == layer[j]) {
                        layer.splice(j, 1);
                        layerLen--;
                        node.setApplication(null);
                        node.setParent(null);
                        this._childNodes.count--;
                        this.refresh();
                        if (clean) {
                            node.purge();
                        }
                    }
                }
            }
        }
    }
    hy.Node.prototype.removeChildNodeAtLayer = function (layerIndex, node, clean) {
        var layers = this._childNodes.nodeLayers;
        if (layerIndex < layers.length) {
            var layer = layers[layerIndex];
            if (layer) {
                for (var i = 0, len = layer.length; i < len; ++i) {
                    if (node == layer[i]) {
                        layer.splice(i, 1);
                        len--;
                        node.setApplication(null);
                        node.setParent(null);
                        this._childNodes.count--;
                        this.refresh();
                        if (clean) {
                            node.purge();
                        }
                    }
                }
            }
        }
    }
    hy.Node.prototype.removeChildNodeAtLocation = function (layerIndex, nodeIndex, clean) {
        var layers = this._childNodes.nodeLayers;
        if (layerIndex < layers.length) {
            var layer = layers[layerIndex];
            if (layer) {
                if (nodeIndex < layer.length) {
                    var node = layer[nodeIndex];
                    layer.splice(nodeIndex, 1);
                    node.setApplication(null);
                    node.setParent(null);
                    this._childNodes.count--;
                    this.refresh();
                    if (clean) {
                        node.purge();
                    }
                }
            }
        }
    }
    hy.Node.prototype.removeFromParent = function (clean) {
        var parent = this.getParent();
        if (parent != null) {
            parent.removeChildNode(this, clean);
        }
    }
    hy.Node.prototype.runAction = function (action, target, callBack, loop) {
        var app = this.getApplication();
        app.getActionManager().addActionBinder(this, action, target, callBack, loop);
    }
    hy.Node.prototype.stopAction = function (action) {
        var app = this.getApplication();
        app.getActionManager().removeActionOfSprite(this, action);
    }
    hy.Node.prototype.stopAllActions = function () {
        var app = this.getApplication();
        app.getActionManager().removeAllActionsOfSprite(this);
    }

    hy.Node.prototype.ifPaint = function () {
        if (this.getChildNodeCount() > 0 || this.getObserversCount(hy.event.name.PAINT)) {
            return true;
        } else {
            return false;
        }
    }

    hy.Node.prototype.getSinRotateZ = function () {
        return this.__rotateZSinCos.sin;
    }
    hy.Node.prototype.getCosRotateZ = function () {
        return this.__rotateZSinCos.cos;
    }
    hy.Node.prototype.transPointToAncestorNode = function (point, ancestorNode) {
        var parentNode = this.getParent();
        var newPoint = {x: point.x, y: point.y};
        var anglesin = this.getSinRotateZ();
        var anglecos = this.getCosRotateZ();
        newPoint.x = this.getX() + (point.x * this.getScaleX() * anglecos - point.y * this.getScaleY() * anglesin);
        newPoint.y = this.getY() + (point.x * this.getScaleX() * anglesin + point.y * this.getScaleY() * anglecos);
        if (parentNode == null || parentNode == ancestorNode) {
            return newPoint;
        } else {
            return parentNode.transPointToAncestorNode(newPoint, ancestorNode);
        }

    }
    hy.Node.prototype.transVectorToAncestorNode = function (vector, ancestorNode) {
        var parentNode = this.getParent();
        var newVector = {x: vector.x, y: vector.y};
        var angleSin = this.getSinRotateZ();
        var angleCos = this.getCosRotateZ();
        newVector.x = (vector.x * this.getScaleX() * angleCos - vector.y * this.getScaleY() * angleSin);
        newVector.y = (vector.x * this.getScaleX() * angleSin + vector.y * this.getScaleY() * angleCos);
        if (parentNode == null || parentNode == ancestorNode) {
            return newVector;
        } else {
            return parentNode.transVectorToAncestorNode(newVector, ancestorNode);
        }
    }
    hy.Node.prototype.transPointFromAncestorNode = function (point, ancestorNode) {
        var newPoint = {x: point.x, y: point.y};
        var parentNode = this.getParent();
        if (parentNode != null && parentNode != ancestorNode) {
            newPoint = parentNode.transPointFromAncestorNode(point, ancestorNode);
        }
        var offsetX = newPoint.x - this.getX();
        var offsetY = newPoint.y - this.getY();
        var angleSin = this.getSinRotateZ();
        var angleCos = this.getCosRotateZ();
        newPoint.x = (offsetX * angleCos + offsetY * angleSin) / this.getScaleX();
        newPoint.y = (offsetY * angleCos - offsetX * angleSin) / this.getScaleY();
        return newPoint;
    }
    hy.Node.prototype.transVectorFromAncestorNode = function (vector, ancestorNode) {
        var newVector = {x: vector.x, y: vector.y};
        var parentNode = this.getParent();
        if (parentNode != null && parentNode != ancestorNode) {
            newVector = parentNode.transVectorFromAncestorNode(vector, ancestorNode);
        }
        var angleSin = this.getSinRotateZ();
        var angleCos = this.getCosRotateZ();
        newVector.x = (vector.x * angleCos + vector.y * angleSin) / this.getScaleX();
        newVector.y = (vector.y * angleCos - vector.x * angleSin) / this.getScaleY();
        return newVector;
    }

    hy.Node.prototype.needLayoutSubNodes = function () {
        this._needLayoutSubNodes = true;
    }
    hy.Node.prototype.refresh = function () {
        var app = this.getApplication();
        if (app) {
            app.refresh();
        }
    }

    hy.Node.prototype._dispatchMouseEvent = function (eventName, e, isMouseMove) {
        if (this._visible) {
            var localLoc = this.getUserProperty("event_local_loc");
            if (this._clipEnable) {
                var clipZone = this._clipZone;
                if (localLoc.x >= clipZone.minX &&
                    localLoc.x <= clipZone.maxX &&
                    localLoc.y >= clipZone.minY &&
                    localLoc.y <= clipZone.maxY) {
                    var layers = this._childNodes.nodeLayers;
                    for (var i = layers.length - 1; i > -1; --i) {
                        var layer = layers[i];
                        if (layer) {
                            for (var j = layer.length - 1; j > -1; --j) {
                                var node = layer[j];
                                node.setUserProperty("event_local_loc", node.transPointFromAncestorNode(localLoc, this));
                                if (node._dispatchMouseEvent(eventName, e, isMouseMove)) {
                                    return true;
                                }
                            }
                        }
                    }
                    var responseZone = this._responseZone;
                    if (localLoc.x >= responseZone.minX &&
                        localLoc.x <= responseZone.maxX &&
                        localLoc.y >= responseZone.minY &&
                        localLoc.y <= responseZone.maxY) {
                        var parentNode = null;
                        var subNode = null;
                        var preTargetNode = e.targetNode;
                        if (preTargetNode != this) {
                            e.targetNode = this;
                            if (isMouseMove) {
                                if (preTargetNode) {
                                    parentNode = preTargetNode.getParent();
                                    subNode = preTargetNode;
                                    e.resumeDispatch();
                                    while (parentNode != null) {
                                        if (e.isDispatch()) {
                                            if (subNode.getResponseEnable()) {
                                                subNode.postNotification(hy.event.name.MOUSEOUT, [e]);
                                            }
                                            subNode = parentNode;
                                            parentNode = parentNode.getParent();
                                        } else {
                                            break;
                                        }
                                    }
                                    parentNode = this.getParent();
                                    subNode = this;
                                    e.resumeDispatch();
                                    while (parentNode != null) {
                                        if (e.isDispatch()) {
                                            if (subNode.getResponseEnable()) {
                                                subNode.postNotification(hy.event.name.MOUSEOVER, [e]);
                                            }
                                            subNode = parentNode;
                                            parentNode = parentNode.getParent();
                                        } else {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        parentNode = this.getParent();
                        subNode = this;
                        e.resumeDispatch();
                        while (parentNode != null) {
                            if (e.isDispatch()) {
                                if (subNode.getResponseEnable()) {
                                    subNode.postNotification(eventName, [e]);
                                }
                                subNode = parentNode;
                                parentNode = parentNode.getParent();
                            } else {
                                break;
                            }
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                var layers = this._childNodes.nodeLayers;
                for (var i = layers.length - 1; i > -1; --i) {
                    var layer = layers[i];
                    if (layer) {
                        for (var j = layer.length - 1; j > -1; --j) {
                            var node = layer[j];
                            node.setUserProperty("event_local_loc", node.transPointFromAncestorNode(localLoc, this));
                            if (node._dispatchMouseEvent(eventName, e, isMouseMove)) {
                                return true;
                            }
                        }
                    }
                }

                var responseZone = this._responseZone;
                if (localLoc.x >= responseZone.minX &&
                    localLoc.x <= responseZone.maxX &&
                    localLoc.y >= responseZone.minY &&
                    localLoc.y <= responseZone.maxY) {
                    var parentNode = null;
                    var subNode = null;
                    var preTargetNode = e.targetNode;
                    if (preTargetNode != this) {
                        e.targetNode = this;
                        if (isMouseMove) {
                            if (preTargetNode) {
                                parentNode = preTargetNode.getParent();
                                subNode = preTargetNode;
                                e.resumeDispatch();
                                while (parentNode != null) {
                                    if (e.isDispatch()) {
                                        if (subNode.getResponseEnable()) {
                                            subNode.postNotification(hy.event.name.MOUSEOUT, [e]);
                                        }
                                        subNode = parentNode;
                                        parentNode = parentNode.getParent();
                                    } else {
                                        break;
                                    }
                                }
                                parentNode = this.getParent();
                                subNode = this;
                                e.resumeDispatch();
                                while (parentNode != null) {
                                    if (e.isDispatch()) {
                                        if (subNode.getResponseEnable()) {
                                            subNode.postNotification(hy.event.name.MOUSEOVER, [e]);
                                        }
                                        subNode = parentNode;
                                        parentNode = parentNode.getParent();
                                    } else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    parentNode = this.getParent();
                    subNode = this;
                    e.resumeDispatch();
                    while (parentNode != null) {
                        if (e.isDispatch()) {
                            if (subNode.getResponseEnable()) {
                                subNode.postNotification(eventName, [e]);
                            }
                            subNode = parentNode;
                            parentNode = parentNode.getParent();
                        } else {
                            break;
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
    }
    hy.Node.prototype._dispatchLoop = function (dc, deltaTime, inheritPaint) {
        /*进入当前帧*/
        this.postNotification(hy.event.name.ENTERFRAME, [deltaTime]);
        /*重新布局*/
        var clipZone = this._clipZone;
        if (this._needLayoutSubNodes) {
            this.postNotification(hy.event.name.LAYOUTSUBNODES, [clipZone]);
            this._needLayoutSubNodes = false;
        }
        /*绘制操作*/
        if (inheritPaint && this._visible && this.ifPaint()) {
            dc.pushTransform(clipZone.x, clipZone.y, this._scaleX, this._scaleY, this._rotateZ, this._clipEnable, this._alpha);
            if (this._clipEnable) {
                dc.beginPath();
                var cornorRadis = this._cornorRadius;
                if (cornorRadis) {
                    dc.moveTo(clipZone.minX, clipZone.minY + this._cornorRadius);
                    dc.arcTo(clipZone.minX, clipZone.minY, clipZone.minX + cornorRadis, clipZone.minY, cornorRadis);
                    dc.lineTo(clipZone.maxX - cornorRadis, clipZone.minY);
                    dc.arcTo(clipZone.maxX, clipZone.minY, clipZone.maxX, clipZone.minY + cornorRadis, cornorRadis);
                    dc.lineTo(clipZone.maxX, clipZone.maxY - cornorRadis);
                    dc.arcTo(clipZone.maxX, clipZone.maxY, clipZone.maxX - cornorRadis, clipZone.maxY, cornorRadis);
                    dc.lineTo(clipZone.minX + cornorRadis, clipZone.maxY);
                    dc.arcTo(clipZone.minX, clipZone.maxY, clipZone.minX, clipZone.maxY - cornorRadis, cornorRadis);
                    dc.lineTo(clipZone.minX, clipZone.minY + cornorRadis);
                } else {
                    dc.rect(clipZone.minX, clipZone.minY, this._width, this._height);
                }
                dc.clip();
            }
            this.postNotification(hy.event.name.PAINT, [dc, clipZone]);
            var layers = this._childNodes.nodeLayers;
            for (var i = 0, len = layers.length; i < len; ++i) {
                var layer = layers[i];
                if (layer) {
                    for (var j = 0, len2 = layer.length; j < len2; ++j) {
                        layer[j]._dispatchLoop(dc, deltaTime, true);

                    }
                }
            }
            dc.popTransform();
        } else {
            var layers = this._childNodes.nodeLayers;
            for (var i = 0, len = layers.length; i < len; ++i) {
                var layer = layers[i];
                if (layer) {
                    for (var j = 0, len2 = layer.length; j < len2; ++j) {
                        layer[j]._dispatchLoop(dc, deltaTime, false);
                    }
                }
            }
        }
    }

    hy.Node.prototype.purge = function () {
        this.stopAllActions();
        this._clipZone = null;
        this._responseZone = null;
        this._paintInheritInfo = null;
        this._application = null;
        this._parent = null;
        this.__rotateZSinCos = null;
        this.__dragStatus = null;
        var layers = this.getLayers();
        for (var i = layers.length - 1; i > -1; --i) {
            var layer = layers[i];
            if (layer) {
                for (var j = layer.length - 1; j > -1; --j) {
                    var node = layer[j];
                    layer.splice(j, 1);
                    node.purge();
                }
            }
        }
        this._childNodes = null;
        this.superCall("purge", null);
    }
}(hy, window, document);