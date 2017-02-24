(function (hy, win, doc) {

    var modeleditor = modeleditor || {};
    modeleditor.class = modeleditor.class || {};
    modeleditor.class.ActionListView = hy.extend(hy.gui.View);
    modeleditor.class.ActionListView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._addBtn = new hy.gui.Button({
            cornorRadius: 3,
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-plus-s.png"
        });
        this._deleteBtn = new hy.gui.Button({
            cornorRadius: 3,
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-minus-s.png"
        });
        this._actionList = new hy.gui.SimpleListView({
            itemSelEnable: true,
            itemSelColor: hy.gui.colors.YELLOW,
            itemContextMenu: [{name: '编辑动作'}, {name: '重命名'}, {name: '删除'}]
        });
        this.addChildNodeAtLayer(this._addBtn, 0);
        this.addChildNodeAtLayer(this._deleteBtn, 0);
        this.addChildNodeAtLayer(this._actionList, 0);
        this.addObserver(hy.event.name.PAINT, this, this._paintToolBarBg, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, this._layoutActionListView, 0);
    }
    modeleditor.class.ActionListView.prototype.getAddBtn = function () {
        return this._addBtn;
    }
    modeleditor.class.ActionListView.prototype.getDeleteBtn = function () {
        return this._deleteBtn;
    }
    modeleditor.class.ActionListView.prototype.getActionList = function () {
        return this._actionList;
    }
    modeleditor.class.ActionListView.prototype._paintToolBarBg = function (sender, dc, zone) {
        dc.beginPath();
        dc.setFillStyle(hy.gui.colors.DSILVER);
        dc.fillRect(zone.minX, zone.minY, zone.width, 23);
    }
    modeleditor.class.ActionListView.prototype._layoutActionListView = function (sender) {
        this._addBtn.setX(this.getWidth() - 43);
        this._addBtn.setY(3);
        this._addBtn.setWidth(17);
        this._addBtn.setHeight(17);

        this._deleteBtn.setX(this.getWidth() - 20);
        this._deleteBtn.setY(3);
        this._deleteBtn.setWidth(17);
        this._deleteBtn.setHeight(17);

        this._actionList.setX(0);
        this._actionList.setY(23);
        this._actionList.setWidth(this.getWidth());
        this._actionList.setHeight(this.getHeight() - 23);
    }

    modeleditor.class.ModelTreeRule = hy.extend(hy.gui.View);
    modeleditor.class.ModelTreeRule.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._blankView = new hy.gui.View({
            backgroundColor: hy.gui.colors.PUREWHITE
        });
        this._timelineRule = new hy.gui.TimelineRule({
            backgroundColor: hy.gui.colors.PUREWHITE
        });
        this.addChildNodeAtLayer(this._timelineRule, 0);
        this.addChildNodeAtLayer(this._blankView, 0);
        this.addObserver(hy.event.name.PAINT, this, this._paintUnderline, 0);
    }
    modeleditor.class.ModelTreeRule.prototype.getTitleLabel = function () {
        return this._titleLabel;
    }
    modeleditor.class.ModelTreeRule.prototype.getTimelineRule = function () {
        return this._timelineRule;
    }
    modeleditor.class.ModelTreeRule.prototype.layoutModelTreeRule = function (offsetX, nameWidth) {
        this._blankView.setX(offsetX);
        this._blankView.setY(0);
        this._blankView.setWidth(nameWidth);
        this._blankView.setHeight(this.getHeight() - 1);

        this._timelineRule.setX(nameWidth + 4);
        this._timelineRule.setY(0);
        this._timelineRule.setWidth(this.getWidth() - nameWidth - 4);
        this._timelineRule.setHeight(this.getHeight() - 1);
    }
    modeleditor.class.ModelTreeRule.prototype._paintUnderline = function (sender, dc, rect) {
        dc.setStrokeStyle(hy.gui.colors.BLACK);
        dc.beginPath();
        dc.moveTo(0, this.getHeight() - 0.5);
        dc.lineTo(this.getWidth(), this.getHeight() - 0.5);
        dc.stroke();
    }

    modeleditor.class.ModelTreeNode = hy.extend(hy.gui.TreeNodeView);
    modeleditor.class.ModelTreeNode.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._nodeIcon = new hy.gui.ImageView({responseEnable: false});
        this._nodeLabel = new hy.gui.Label({responseEnable: false, textHorAlign: hy.gui.TEXT_HORALIGN_LEFT});
        this._nodeExpandIcon = new hy.gui.View({responseEnable: true});
        this._nodeInfoBg = new hy.gui.View({responseEnable: true, backgroundColor: hy.gui.colors.PUREWHITE});
        this._nodeTimeline = new hy.gui.Timeline({responseEnable: true});

        this._nodeExpandIcon.addObserver(hy.event.name.PAINT, this, this._paintNodeExpandIcon, 0);
        this._nodeInfoBg.addChildNodeAtLayer(this._nodeIcon, 0);
        this._nodeInfoBg.addChildNodeAtLayer(this._nodeLabel, 0);
        this._nodeInfoBg.addChildNodeAtLayer(this._nodeExpandIcon, 0);
        this.addChildNodeAtLayer(this._nodeTimeline, 0);
        this.addChildNodeAtLayer(this._nodeInfoBg, 0);
        this.addObserver(hy.event.name.PAINT, this, this._paintUnderline, 0);
    }
    modeleditor.class.ModelTreeNode.prototype.getNodeIcon = function () {
        return this._nodeIcon;
    }
    modeleditor.class.ModelTreeNode.prototype.getNodeLabel = function () {
        return this._nodeLabel;
    }
    modeleditor.class.ModelTreeNode.prototype.getNodeExpandIcon = function () {
        return this._nodeExpandIcon;
    }
    modeleditor.class.ModelTreeNode.prototype.getNodeInfoBg = function () {
        return this._nodeInfoBg;
    }
    modeleditor.class.ModelTreeNode.prototype.getNodeTimeline = function () {
        return this._nodeTimeline;
    }
    modeleditor.class.ModelTreeNode.prototype.layoutModelTreeNode = function (offsetX, nameWidth) {
        this._nodeInfoBg.setX(offsetX);
        this._nodeInfoBg.setY(0);
        this._nodeInfoBg.setWidth(nameWidth);
        this._nodeInfoBg.setHeight(this.getHeight() - 1);
        this._nodeTimeline.setX(nameWidth + 4);
        this._nodeTimeline.setY(0);
        this._nodeTimeline.setWidth(this.getWidth() - nameWidth - 4);
        this._nodeTimeline.setHeight(this.getHeight() - 1);

        var nodeDeepth = this._nodePath.length;
        var startX = nodeDeepth * this.getHeight();
        this._nodeIcon.setX(startX + this.getHeight());
        this._nodeIcon.setY(0);
        this._nodeIcon.setWidth(this.getHeight());
        this._nodeIcon.setHeight(this.getHeight() - 1);
        this._nodeLabel.setX(startX + 2 * this.getHeight());
        this._nodeLabel.setY(0);
        this._nodeLabel.setWidth(nameWidth - startX - this.getHeight() * 2);
        this._nodeLabel.setHeight(this.getHeight() - 1);
        this._nodeExpandIcon.setX(startX);
        this._nodeExpandIcon.setY(0);
        this._nodeExpandIcon.setWidth(this.getHeight());
        this._nodeExpandIcon.setHeight(this.getHeight() - 1);
    }
    modeleditor.class.ModelTreeNode.prototype._paintNodeExpandIcon = function (sender, dc, zone) {
        var width = sender.getWidth();
        var height = sender.getHeight();
        dc.beginPath();
        if (this.getUserProperty("expanded")) {
            dc.moveTo(width / 3, height / 3);
            dc.lineTo(2 * width / 3, height / 3);
            dc.lineTo(width / 2, 2 * height / 3);
        } else {
            dc.moveTo(width / 3, height / 3);
            dc.lineTo(2 * width / 3, height / 2);
            dc.lineTo(width / 3, 2 * height / 3);
        }
        dc.closePath();
        dc.setFillStyle(hy.gui.colors.PUREBLACK);
        dc.fill();
    }
    modeleditor.class.ModelTreeNode.prototype._paintUnderline = function (sender, dc, rect) {
        dc.setStrokeStyle(hy.gui.colors.DSILVER);
        dc.beginPath();
        dc.moveTo(0, this.getHeight());
        dc.lineTo(this.getWidth(), this.getHeight());
        dc.stroke();
    }

    modeleditor.class.ModelTree = hy.extend(hy.gui.TreeView);
    modeleditor.class.ModelTree.prototype.defaultNodeHeight = 20;
    modeleditor.class.ModelTree.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._paddingTop = 23;
        this._nodeHeight = this.isUndefined(config.nodeHeight) ? this.defaultNodeHeight : config.nodeHeight;
        this._modelTreeRule = new modeleditor.class.ModelTreeRule({});
        this._splitView = new hy.gui.View({
            x: 100,
            y: 0,
            width: 4,
            minX: 100,
            maxX: Infinity,
            minY: 0,
            maxY: 0,
            clipEnable: true,
            responseEnable: true,
            dragEnable: true,
            dragZone: {minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity},
            backgroundColor: hy.gui.colors.DSILVER
        });
        this._splitView.addObserver(hy.event.name.XCHG, this, this._layoutContentTrigger, 0);

        this.getContentView().addChildNodeAtLayer(this._modelTreeRule, 1);
        this.getContentView().addObserver(hy.event.name.XCHG, this, this._layoutContentTrigger, 0);
        this.getContentView().addObserver(hy.event.name.YCHG, this, this._layoutContentTrigger, 0);
        this.getContentView().addObserver(hy.event.name.LAYOUTSUBNODES, this, this._layoutTimeTreeContentView, 0);

        this.addChildNodeAtLayer(this._splitView, 0);
        this.addObserver(hy.event.name.NODESELECTED, this, this._selectModelTreeNode, 0);
        this.addObserver(hy.event.name.NODEUNSELECTED, this, this._unselectModelTreeNode, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, this._layoutModelTreeSplitView, 0);
    }
    modeleditor.class.ModelTree.prototype.getNodeHeight = function () {
        return this._nodeHeight;
    }
    modeleditor.class.ModelTree.prototype.getNodeUnitOfNodePath = function (nodePath, nodeDeepth) {
        if (nodePath && nodeDeepth >= 0 && nodeDeepth <= nodePath.length) {
            var node = this.getRoot();
            if (node) {
                for (var i = 0; i < nodeDeepth; ++i) {
                    node = node.getChildUnitAt(nodePath[i]);
                    if (!node) {
                        break;
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
    modeleditor.class.ModelTree.prototype.dragNodeFromTo = function (fromPath, toPath) {
        if (fromPath && toPath) {
            var fromParNodeUnit = this.getNodeUnitOfNodePath(fromPath, fromPath.length - 1);
            var toParNodeUnit = this.getNodeUnitOfNodePath(toPath, toPath.length - 1);
            var fromNodeUnit = this.getNodeUnitOfNodePath(fromPath, fromPath.length);
            var fromIndex = fromPath[fromPath.length - 1];
            var toIndex = toPath[toPath.length - 1];
            if (fromParNodeUnit == toParNodeUnit) {
                if (fromIndex > toIndex) {
                    fromParNodeUnit.removeChildUnitAt(fromIndex, false);
                    toParNodeUnit.addChildUnitAt(fromNodeUnit, toIndex);
                    this.needReloadTree();
                } else if (fromIndex < toIndex) {
                    fromParNodeUnit.removeChildUnitAt(fromIndex, false);
                    toParNodeUnit.addChildUnitAt(fromNodeUnit, toIndex - 1);
                    toPath[toPath.length - 1] = toIndex - 1;
                    this.needReloadTree();
                }
            } else {
                fromParNodeUnit.removeChildUnitAt(fromIndex, false);
                toParNodeUnit.addChildUnitAt(fromNodeUnit, toIndex);
                this.needReloadTree();
            }
        }
        return toPath;
    }
    modeleditor.class.ModelTree.prototype._layoutContentTrigger = function () {
        this.getContentView().needLayoutSubNodes();
    }
    modeleditor.class.ModelTree.prototype._layoutModelTreeSplitView = function (sender) {
        this._splitView.setY(0);
        this._splitView.setHeight(this.getHeight());
        this._splitView.setMinX(100);
        this._splitView.setMaxX(this.getWidth() - 5);
    }
    modeleditor.class.ModelTree.prototype._layoutTimeTreeContentView = function (sender) {
        this.setContentWidth(this._splitView.getX() + this._splitView.getWidth() + this._modelTreeRule.getTimelineRule().getDuration() * 160);

        var contentOffsetX = this.getContentOffsetX();
        var contentWidth = this._contentView.getWidth();
        var width = contentWidth - this._paddingLeft - this._paddingRight;

        this._modelTreeRule.setX(0);
        this._modelTreeRule.setY(this.getContentOffsetY());
        this._modelTreeRule.setWidth(width);
        this._modelTreeRule.setHeight(this._paddingTop);
        this._modelTreeRule.layoutModelTreeRule(contentOffsetX, this._splitView.getX());

        var contentOffsetX = this.getContentOffsetX();
        for (var i = 0, len = this._nodeViews.length; i < len; ++i) {
            this._nodeViews[i].layoutModelTreeNode(contentOffsetX, this._splitView.getX());
        }
    }
    modeleditor.class.ModelTree.prototype._selectModelTreeNode = function (sender, nodePath) {
        var nodeView = this.getNodeViewOfNodePath(nodePath, nodePath.length);
        if (nodeView) {
            nodeView.getNodeInfoBg().setBackgroundColor(hy.gui.colors.YELLOW);
        }
        var nodeUnit = this.getNodeUnitOfNodePath(nodePath, nodePath.length);
        nodeUnit.setResizeEnable(true);
        nodeUnit.setRotateEnable(true);
        nodeUnit.setAnchorMoveEnable(true);
    }
    modeleditor.class.ModelTree.prototype._unselectModelTreeNode = function (sender, nodePath) {
        var nodeView = this.getNodeViewOfNodePath(nodePath, nodePath.length);
        if (nodeView) {
            nodeView.getNodeInfoBg().setBackgroundColor(hy.gui.colors.PUREWHITE);
        }
        var nodeUnit = this.getNodeUnitOfNodePath(nodePath, nodePath.length);
        nodeUnit.setResizeEnable(false);
        nodeUnit.setRotateEnable(false);
        nodeUnit.setAnchorMoveEnable(false);
    }

    modeleditor.class.ModelEditorView = hy.extend(hy.gui.View);
    modeleditor.class.ModelEditorView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._nodeAddBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-plus-s.png"
        });
        this._nodeEditBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-edit-s.png"
        });
        this._nodeRemoveBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-minus-s.png"
        });
        this._textureBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-image-file-s.png"
        });
        this._audioBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-volume-audio-s.png"
        });

        this._durationLabel = new hy.gui.Label({
            text: '时长:'
        });
        this._durationTextBox = new hy.gui.TextBox({
            borderColor: hy.gui.colors.PUREBLACK,
            text: '1',
            textHorAlign: hy.gui.TEXT_HORALIGN_RIGHT
        });
        this._modelTree = new modeleditor.class.ModelTree({
            dataSource: this,
            backgroundColor: hy.gui.colors.PUREWHITE,
            nodeSelEnable: true,
            nodeDragEnable: true,
            nodeSelColor: hy.gui.colors.YELLOW
        });

        this.addChildNodeAtLayer(this._nodeAddBtn, 0);
        this.addChildNodeAtLayer(this._nodeEditBtn, 0);
        this.addChildNodeAtLayer(this._nodeRemoveBtn, 0);
        this.addChildNodeAtLayer(this._textureBtn, 0);
        this.addChildNodeAtLayer(this._audioBtn, 0);

        this.addChildNodeAtLayer(this._durationLabel, 0);
        this.addChildNodeAtLayer(this._durationTextBox, 0);
        this.addChildNodeAtLayer(this._modelTree, 0);
        this.addObserver(hy.event.name.PAINT, this, this._paintToolBarBg, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, this._layoutModelEditor, 0);
    }
    modeleditor.class.ModelEditorView.prototype.getDurationLabel = function () {
        return this._durationLabel;
    }
    modeleditor.class.ModelEditorView.prototype.getDurationTextBox = function () {
        return this._durationTextBox;
    }
    modeleditor.class.ModelEditorView.prototype.getModelTree = function () {
        return this._modelTree;
    }
    modeleditor.class.ModelEditorView.prototype.setEditModel = function (model) {
        this._modelTree.setRoot(model);
    }
    modeleditor.class.ModelEditorView.prototype.getEditModel = function () {
        return this._modelTree.getRoot();
    }
    modeleditor.class.ModelEditorView.prototype._paintToolBarBg = function (sender, dc, zone) {
        dc.beginPath();
        dc.setFillStyle(hy.gui.colors.DSILVER);
        dc.fillRect(zone.minX, zone.minY, zone.width, 23);
    }
    modeleditor.class.ModelEditorView.prototype._layoutModelEditor = function (sender) {
        var width = this.getWidth();
        this._nodeAddBtn.setX(3);
        this._nodeAddBtn.setY(3);
        this._nodeAddBtn.setWidth(17);
        this._nodeAddBtn.setHeight(17);

        this._nodeEditBtn.setX(23);
        this._nodeEditBtn.setY(3);
        this._nodeEditBtn.setWidth(17);
        this._nodeEditBtn.setHeight(17);

        this._nodeRemoveBtn.setX(43);
        this._nodeRemoveBtn.setY(3);
        this._nodeRemoveBtn.setWidth(17);
        this._nodeRemoveBtn.setHeight(17);

        this._textureBtn.setX(63);
        this._textureBtn.setY(3);
        this._textureBtn.setWidth(17);
        this._textureBtn.setHeight(17);

        this._audioBtn.setX(83);
        this._audioBtn.setY(3);
        this._audioBtn.setWidth(17);
        this._audioBtn.setHeight(17);

        this._durationLabel.setX(width - 85);
        this._durationLabel.setY(3);
        this._durationLabel.setWidth(30);
        this._durationLabel.setHeight(17);

        this._durationTextBox.setX(width - 55);
        this._durationTextBox.setY(3);
        this._durationTextBox.setWidth(50);
        this._durationTextBox.setHeight(17);

        this._modelTree.setX(0);
        this._modelTree.setY(23);
        this._modelTree.setWidth(this.getWidth());
        this._modelTree.setHeight(this.getHeight() - 23);
    }

    modeleditor.class.TextureView = hy.extend(hy.gui.View);
    modeleditor.class.TextureView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._goBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-arrow-right-s.png"
        });
        this._uploadBtn = new hy.gui.Button({
            normalColor: null,
            hoverColor: hy.gui.colors.BLUE,
            responseEnable: true,
            image: hy.config.PATH + "res/icon/icon-upload-s.png"
        });
        this._imageUrlBox = new hy.gui.TextBox({});
        this._clipView = new hy.gui.View({
            clipEnable: false,
            resizeStyle: 1,
            adjustLayoutStyle: 0,
            responseEnable: true,
            dragEnable: true,
            resizeEnable: true,
            rotateEnable: false,
            anchorMoveEnable: false
        });
        this._imageView = new hy.gui.ImageView({
            x: 10,
            y: 10,
            clipEnable: false
        });
        var contentView = new hy.gui.View({});
        contentView.addChildNodeAtLayer(this._imageView, 0);
        this._scrollView = new hy.gui.ScrollView({
            contentView: contentView
        });

        this._imageView.addChildNodeAtLayer(this._clipView, 0);
        this.addChildNodeAtLayer(this._goBtn, 0);
        this.addChildNodeAtLayer(this._uploadBtn, 0);
        this.addChildNodeAtLayer(this._imageUrlBox, 0);
        this.addChildNodeAtLayer(this._scrollView, 0);

        this._goBtn.addObserver(hy.event.name.MOUSEUP, this, this._mouseupGoBtn, 0);
        this.addObserver(hy.event.name.PAINT, this, this._paintUnderline, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, this._layoutTextureView, 0);
    }
    modeleditor.class.TextureView.prototype._paintUnderline = function (sender, dc, zone) {
        var width = this.getWidth();
        var height = this.getHeight();
        dc.setFillStyle(hy.gui.colors.YELLOW);
        dc.beginPath();
        dc.fillRect(zone.minX, zone.minY, width, 30);
        dc.beginPath();
        dc.moveTo(27.5, 20);
        dc.lineTo(27.5, 26.5);
        dc.lineTo(width - 27.5, 26.5);
        dc.lineTo(width - 27.5, 20);
        dc.setStrokeStyle(hy.gui.colors.PUREBLACK);
        dc.stroke();
    }
    modeleditor.class.TextureView.prototype._layoutTextureView = function (sender, zone) {
        var width = zone.width;
        var height = zone.height;

        this._imageUrlBox.setX(30);
        this._imageUrlBox.setY(5);
        this._imageUrlBox.setWidth(width - 60);
        this._imageUrlBox.setHeight(20);
        this._uploadBtn.setX(5);
        this._uploadBtn.setY(5);
        this._uploadBtn.setWidth(20);
        this._uploadBtn.setHeight(20);
        this._goBtn.setX(width - 25);
        this._goBtn.setY(5);
        this._goBtn.setWidth(20);
        this._goBtn.setHeight(20);
        this._scrollView.setX(0);
        this._scrollView.setY(23);
        this._scrollView.setWidth(width);
        this._scrollView.setHeight(height - 23);
    }
    modeleditor.class.TextureView.prototype._mouseupGoBtn = function (sender, e) {
        var app = this.getApplication();
        app.getFileLoader().loadImageAsync(this._imageUrlBox.getText(), this, this._loadTextureFinish)
    }
    modeleditor.class.TextureView.prototype._loadTextureFinish = function (url, success) {
        if (success) {
            var image = this.getApplication().getFileLoader().getImage(url);
            var imageWidth = image.width;
            var imageHeight = image.height;
            this._imageView.setWidth(imageWidth);
            this._imageView.setHeight(imageHeight);
            this._scrollView.setContentWidth(imageWidth + 20);
            this._scrollView.setContentHeight(imageHeight + 20);
            this._imageView.setImage(url);
        }
    }

    modeleditor.class.MainWin = hy.extend(hy.gui.View);
    modeleditor.class.MainWin.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._actionEditStatus = {name: null, running: false, selectedframe: -1};
        this._htmlBotMenu = {htmlNode: null};
        this._htmlFullMask = {htmlNode: null, curDialogNode: null, type: 0, action: 0};
        this._initHtmlMenu();
        this._initFullMask();

        this._editingModel = new hy.game.ModelBone({
            width: 150,
            height: 150,
            responseEnable: true,
            dragEnable: true,
            resizeEnable: false,
            rotateEnable: false,
            anchorMoveEnable: false,
            childUnitsLayer: 2,
            image: hy.config.PATH + "res/images/book.jpg",
            actionNames: ["example"]
        });
        this._editingModel.addObserver(hy.event.name.MOUSEDOWN, this, this._mousedownEditUnit, 0);
        this.addChildNodeAtLayer(this._editingModel, 0);

        var actionListView = new modeleditor.class.ActionListView({
            backgroundColor: "#fff",
            itemSelColor: hy.gui.colors.YELLOW
        });
        var newActionBtn = actionListView.getAddBtn();
        newActionBtn.addObserver(hy.event.name.MOUSEUP, this, this._mouseupAddActionBtn, 0);
        var delActionBtn = actionListView.getDeleteBtn();
        delActionBtn.addObserver(hy.event.name.MOUSEUP, this, this._mouseupDelActionBtn, 0);
        this._actionList = actionListView.getActionList();
        this._actionListWin = new hy.gui.Window({
            x: 0,
            y: 0,
            width: 200,
            height: 300,
            visible: true,
            closeStyle: 0,
            backgroundColor: hy.gui.colors.BLUE,
            responseEnable: true,
            dragEnable: true,
            icon: hy.config.PATH + "res/icon/icon-list-s.png",
            closeIcon: hy.config.PATH + "res/icon/icon-close-s.png",
            title: '动作列表',
            mainView: actionListView
        });
        this._actionListWin.addObserver(hy.event.name.MOUSEDOWN, this, this._floatWinToTop, 0);
        this._actionList.addObserver(hy.event.name.ITEMDBLCLICK, this, this._dblclickActionListItem, 0);
        this._actionList.addObserver(hy.event.name.ITEMCONTEXTMENUSELECTED, this, this._contextMenuSelActionList, 0);
        this.addChildNodeAtLayer(this._actionListWin, 1);

        var modelEditorView = new modeleditor.class.ModelEditorView({});
        this._modelTree = modelEditorView.getModelTree();
        this._modelEditorWin = new hy.gui.Window({
            x: 0,
            y: 0,
            width: 200,
            height: 300,
            visible: false,
            closeStyle: 0,
            backgroundColor: hy.gui.colors.BLUE,
            responseEnable: true,
            dragEnable: true,
            icon: hy.config.PATH + "res/icon/icon-tree-s.png",
            closeIcon: hy.config.PATH + "res/icon/icon-close-s.png",
            title: '结构',
            mainView: modelEditorView
        });
        this._modelEditorWin.addObserver(hy.event.name.MOUSEDOWN, this, this._floatWinToTop, 0);
        this._modelTree.setDataSource(this);
        this._modelTree.addObserver(hy.event.name.NODESELECTED, this, this._modelTreeNodeSelected, 0);
        this._modelTree.addObserver(hy.event.name.NODEUNSELECTED, this, this._modelTreeNodeUnSelected, 0);
        this.addChildNodeAtLayer(this._modelEditorWin, 1);

        this._textureManagerView = new modeleditor.class.TextureView({
            backgroundColor: "#fff"
        });
        this._textureManagerWin = new hy.gui.Window({
            x: 0,
            y: 0,
            width: 400,
            height: 300,
            visible: false,
            closeStyle: 0,
            backgroundColor: hy.gui.colors.BLUE,
            responseEnable: true,
            dragEnable: true,
            icon: hy.config.PATH + "res/icon/icon-image-file-s.png",
            closeIcon: hy.config.PATH + "res/icon/icon-close-s.png",
            title: '贴图',
            mainView: this._textureManagerView
        });
        this._textureManagerWin.addObserver(hy.event.name.MOUSEDOWN, this, this._floatWinToTop, 0);
        this.addChildNodeAtLayer(this._textureManagerWin, 1);
    }
    modeleditor.class.MainWin.prototype.sync = function () {
        this.superCall("sync", null);
        this._syncModelInfo();
    }
    modeleditor.class.MainWin.prototype.openActionEditor = function (actionName) {
        this._actionEditStatus.name = actionName;
        this._modelEditorWin.getTitleLabel().setText(actionName);
        this._modelTree.setRoot(this._editingModel);
        this._modelTree.needReloadTree();
        this._modelEditorWin.setVisible(true);
    }
    modeleditor.class.MainWin.prototype.addActionName = function (actionName) {
        if (this._editingModel.addActionName(actionName)) {
            this._actionList.needReloadList();
        }
    }
    modeleditor.class.MainWin.prototype.renameActionName = function (oldName, newName) {
        if (this._editingModel.renameActionName(oldName, newName, true)) {
            this._actionList.needReloadList();
            if (this._actionEditStatus.name == oldName) {
                this._modelEditorWin.getTitleLabel().setText(newName);
                this._actionEditStatus.name = newName;
            }
        }
    }
    modeleditor.class.MainWin.prototype.removeActionName = function (actionName) {
        this._editingModel.removeActionName(actionName);
        this._actionList.needReloadList();
        if (this._actionEditStatus.name == actionName) {
            this._modelTree.setRoot(null);
            this._actionEditStatus.name = null;
            this._modelTree.needReloadTree();
            this._modelEditorWin.setVisible(false);
        }
    }


    modeleditor.class.MainWin.prototype._syncModelInfo = function () {
        this._modelTree.setRoot(this._editingModel);
        this._actionList.setItems(this._editingModel.getActionNames());
    }
    modeleditor.class.MainWin.prototype._initHtmlMenu = function () {
        var htmlBotMenu = document.getElementById("ID_bottom_menu");
        hy.event.addEventListener(htmlBotMenu, "click", this, this._clickEditorMenu);
        this._htmlBotMenu.htmlNode = htmlBotMenu;
    }
    modeleditor.class.MainWin.prototype._initFullMask = function () {
        var htmlBotMenu = document.getElementById("ID_fullmask_con");
        this._htmlFullMask.htmlNode = htmlBotMenu;
        var dialogNodeCloseBtn = document.getElementById("ID_dialog_node_closebtn");
        var dialogNodeSureBtn = document.getElementById("ID_dialog_node_surebtn");
        var dialogNodeCancelBtn = document.getElementById("ID_dialog_node_cancelbtn");
        hy.event.addEventListener(dialogNodeCloseBtn, "click", this, this._closeDialog);
        hy.event.addEventListener(dialogNodeSureBtn, "click", this, this._sureDialog);
        hy.event.addEventListener(dialogNodeCancelBtn, "click", this, this._closeDialog);

        var dialogActionCloseBtn = document.getElementById("ID_dialog_action_closebtn");
        var dialogActionSureBtn = document.getElementById("ID_dialog_action_surebtn");
        var dialogActionCancelBtn = document.getElementById("ID_dialog_action_cancelbtn");
        hy.event.addEventListener(dialogActionCloseBtn, "click", this, this._closeDialog);
        hy.event.addEventListener(dialogActionSureBtn, "click", this, this._sureDialog);
        hy.event.addEventListener(dialogActionCancelBtn, "click", this, this._closeDialog);

        var dialogWarnCloseBtn = document.getElementById("ID_dialog_warn_closebtn");
        var dialogWarnSureBtn = document.getElementById("ID_dialog_warn_surebtn");
        var dialogWarnCancelBtn = document.getElementById("ID_dialog_warn_cancelbtn");
        hy.event.addEventListener(dialogWarnCloseBtn, "click", this, this._closeDialog);
        hy.event.addEventListener(dialogWarnSureBtn, "click", this, this._sureDialog);
        hy.event.addEventListener(dialogWarnCancelBtn, "click", this, this._closeDialog);
    }
    modeleditor.class.MainWin.prototype._showNodeDialog = function (title, name, type, action) {
        var dialog = document.getElementById("ID_dialog_node");
        var dialogTitle = document.getElementById("ID_dialog_node_title");
        var dialogInput = document.getElementById("ID_dialog_node_input");
        var dialogError = document.getElementById("ID_dialog_node_error");

        dialogTitle.innerHTML = title;
        dialogInput.value = name;
        dialogError.innerHTML = "";

        this._htmlFullMask.htmlNode.style.display = "table";
        dialog.style.display = "table-cell";
        this._htmlFullMask.curDialogNode = dialog;
        this._htmlFullMask.type = type;
        this._htmlFullMask.action = action;

        dialogInput.focus();
    }
    modeleditor.class.MainWin.prototype._showActionDialog = function (title, name, type, action) {
        var dialog = document.getElementById("ID_dialog_action");
        var dialogTitle = document.getElementById("ID_dialog_action_title");
        var dialogInput = document.getElementById("ID_dialog_action_input");
        var dialogError = document.getElementById("ID_dialog_action_error");

        dialogTitle.innerHTML = title;
        dialogInput.value = name;
        dialogError.innerHTML = "";

        this._htmlFullMask.htmlNode.style.display = "table";
        dialog.style.display = "table-cell";
        this._htmlFullMask.curDialogNode = dialog;
        this._htmlFullMask.type = type;
        this._htmlFullMask.action = action;

        dialogInput.focus();
    }
    modeleditor.class.MainWin.prototype._showWarnDialog = function (title, msg, type, action) {
        var dialog = document.getElementById("ID_dialog_warn");
        var dialogTitle = document.getElementById("ID_dialog_warn_title");
        var dialogContent = document.getElementById("ID_dialog_warn_content");
        dialogTitle.innerHTML = title;
        dialogContent.innerHTML = msg;

        this._htmlFullMask.htmlNode.style.display = "table";
        dialog.style.display = "table-cell";
        this._htmlFullMask.curDialogNode = dialog;
        this._htmlFullMask.type = type;
        this._htmlFullMask.action = action;
    }
    modeleditor.class.MainWin.prototype._clickEditorMenu = function (e) {
        var eve = event ? event : e;
        var target = eve.target ? event.target : e.srcElement;
        if (target != null) {
            var targetId = target.getAttribute("id");
            if (targetId == "ID_play_btn") {
                var actionIndex = this._actionList.getSelectedItemIndex();
                var actionNames = this._editingModel.getActionNames();
                if (!this._actionEditStatus.running && actionIndex < actionNames.length) {
                    var actionName = actionNames[actionIndex];
                    this._editingModel.runActionOfName(actionName, true, null, null, true);
                    this._actionEditStatus.running = true;
                    var targetClass = target.getAttribute("class");
                    target.setAttribute("class", targetClass.replace("g-icon-play", "g-icon-pause"));
                } else {
                    this._editingModel.stopRuningActions(true);
                    this._actionEditStatus.running = false;
                    var targetClass = target.getAttribute("class");
                    target.setAttribute("class", targetClass.replace("g-icon-pause", "g-icon-play"));
                }
            } else if (targetId == "ID_center_btn") {
                var width = this.getWidth();
                var height = this.getHeight();
                this._editingModel.setX(Math.floor(width / 2));
                this._editingModel.setY(Math.floor(height / 2));
            } else if (targetId == "ID_new_btn") {

            } else if (targetId == "ID_open_btn") {

            } else if (targetId == "ID_save_btn") {

            } else if (targetId == "ID_action_btn") {
                this._actionListWin.setVisible(!this._actionListWin.getVisible());
                this._actionListWin.removeFromParent();
                this.addChildNodeAtLayer(this._actionListWin, 1);
            } else if (targetId == "ID_timeline_btn") {
                this._modelEditorWin.setVisible(!this._modelEditorWin.getVisible());
                this._modelEditorWin.removeFromParent();
                this.addChildNodeAtLayer(this._modelEditorWin, 1);
            } else if (targetId == "ID_texture_btn") {
                this._textureManagerWin.setVisible(!this._textureManagerWin.getVisible());
                this._textureManagerWin.removeFromParent();
                this.addChildNodeAtLayer(this._textureManagerWin, 1);
            } else if (targetId == "ID_audio_btn") {

            }
        }
    }
    modeleditor.class.MainWin.prototype._closeDialog = function (e) {
        this._htmlFullMask.htmlNode.style.display = "none";
        this._htmlFullMask.curDialogNode.style.display = "none";
        this._htmlFullMask.curDialogNode = null;
    }
    modeleditor.class.MainWin.prototype._sureDialog = function (e) {
        switch (this._htmlFullMask.type) {
            case 1:
            {
                switch (this._htmlFullMask.action) {
                    case 1:
                    {/*添加新节点*/
                        var selNodePath = this._modelTree.getSelectedNodePath();
                        if (selNodePath) {
                            var selUnitNode = this._modelTree.getNodeUnitOfNodePath(selNodePath, selNodePath.length);
                            if (selUnitNode) {
                                var dialogInput = document.getElementById("ID_dialog_node_input");
                                var newUnit = new hy.game.UnitBone({
                                    x: 0,
                                    y: 0,
                                    width: 50,
                                    height: 50,
                                    name: dialogInput.value,
                                    responseEnable: true,
                                    dragEnable: true,
                                    resizeEnable: false,
                                    rotateEnable: false,
                                    anchorMoveEnable: false,
                                    childUnitsLayer: 2,
                                });
                            }
                            newUnit.addObserver(hy.event.name.MOUSEDOWN, this, this._mousedownEditUnit, 0);
                            selUnitNode.addChildUnit(newUnit);
                            this._modelTree.needReloadTree();
                            this._closeDialog(null);
                        }
                        break;
                    }
                    case 2:
                    {/*编辑节点*/
                        var selNodePath = this._modelTree.getSelectedNodePath();
                        if (selNodePath) {
                            var selUnitNode = this._modelTree.getNodeUnitOfNodePath(selNodePath, selNodePath.length);
                            if (selUnitNode) {
                                var dialogInput = document.getElementById("ID_dialog_node_input");
                                selUnitNode.setName(dialogInput.value);
                                this._modelTree.needReloadTree();
                                this._closeDialog(null);
                            }
                        }
                        break;
                    }
                    case 3:
                    {/*删除节点*/
                        var selNodePath = this._modelTree.getSelectedNodePath();
                        if (selNodePath) {
                            var selUnitNode = this._modelTree.getNodeUnitOfNodePath(selNodePath, selNodePath.length);
                            if (selUnitNode) {
                                this._modelTree.setSelectedNodePath([]);
                                selUnitNode.removeFromParent(true);
                                this._modelTree.needReloadTree();
                                this._closeDialog(null);
                            }
                        }
                    }
                    default:
                        break;
                }
                break;
            }
            case 2:
            {
                switch (this._htmlFullMask.action) {
                    case 1:
                    {/*添加动作*/
                        var dialogInput = document.getElementById("ID_dialog_action_input");
                        this.addActionName(dialogInput.value);
                        this._closeDialog(null);
                        break;
                    }
                    case 2:
                    {/*重命名动作*/
                        var actionNames = this._editingModel.getActionNames();
                        var itemIndex = this._actionList.getSelectedItemIndex();
                        if (itemIndex > -1 && itemIndex < actionNames.length) {
                            var dialogInput = document.getElementById("ID_dialog_action_input");
                            this.renameActionName(actionNames[itemIndex], dialogInput.value);
                        }
                        this._closeDialog(null);
                        break;
                    }
                    case 3:
                    {/*删除动作*/
                        var actionNames = this._editingModel.getActionNames();
                        var itemIndex = this._actionList.getSelectedItemIndex();
                        if (itemIndex > -1 && itemIndex < actionNames.length) {
                            this.removeActionName(actionNames[itemIndex]);
                        }
                        this._closeDialog(null);
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
            default:
                break;
        }
    }

    modeleditor.class.MainWin.prototype.numberOfNodeInPath = function (treeView, nodePath) {
        var node = treeView.getRoot();
        var nodeDeepth = nodePath.length;
        for (var i = 0; i < nodeDeepth; ++i) {
            if (node) {
                node = node.getChildUnitAt(nodePath[i]);
            } else {
                return 0;
            }
        }
        if (node && node.getUserProperty("expanded")) {
            var childUnits = node.getChildUnits();
            if (childUnits) {
                return childUnits.length;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
    modeleditor.class.MainWin.prototype.heightOfNodeInPath = function (treeView, nodePath) {
        return treeView.getNodeHeight();
    }
    modeleditor.class.MainWin.prototype.widthOfNodeInPath = function (treeView, nodePath) {
        //this._splitView.getX() + this._splitView.getWidth() + this._modelTreeRule.getTimelineRule().getDuration() * 160
        return treeView._splitView.getX() + treeView._splitView.getWidth() + treeView._modelTreeRule.getTimelineRule().getDuration() * 160;
    }
    modeleditor.class.MainWin.prototype.contextMenuOfNodeInPath = function (treeView, nodePath) {
        return null;
    }
    modeleditor.class.MainWin.prototype.viewOfNodeInPath = function (treeView, nodePath) {
        var nodeRoot = treeView.getRoot();
        if (nodeRoot) {
            var nodeDeepth = nodePath.length;
            for (var i = 0; i < nodeDeepth; ++i) {
                nodeRoot = nodeRoot.getChildUnitAt(nodePath[i]);
            }
            var nodeView = treeView.getReuseNodeViewOfIdentity("unittreenode");
            if (nodeView == null) {
                nodeView = new modeleditor.class.ModelTreeNode({reuseIdentity: "unittreenode"});
                var nodeInfoBg = nodeView.getNodeInfoBg();
                var nodeTimeline = nodeView.getNodeTimeline();
                nodeInfoBg.addObserver(hy.event.name.MOUSEDOWN, this, this._expandModelTreeNode, 0);
                nodeInfoBg.addObserver(hy.event.name.CONTEXTMENUSELECTED, this, this._contextmenuModelTreeNode, 0);
                nodeTimeline.addObserver(hy.event.name.CONTEXTMENUSELECTED, this, this._contextmenuModelTreeTimeline, 0);
                nodeTimeline.addObserver(hy.event.name.MOUSEDOWN, this, this._mousedownModelTreeTimeline, 0);
            }
            var nodeIcon = nodeView.getNodeIcon();
            var nodeLabel = nodeView.getNodeLabel();
            var nodeInfoBg = nodeView.getNodeInfoBg();
            var nodeTimeLine = nodeView.getNodeTimeline();
            nodeIcon.setImage(nodePath.length == 0 ? (hy.config.PATH + "res/images/icon_model.png") : (hy.config.PATH + "res/images/icon_unit.png"));
            nodeLabel.setText(nodeRoot.getName());
            nodeTimeLine.setContextMenu(["添加关键帧", "删除关键帧", "添加补间动画", "删除补间动画"]);
            nodeTimeLine.setKeyFrames(nodeRoot.getActionFramesOfName(this._actionEditStatus.name));
            nodeView.setUserProperty("expanded", nodeRoot.getUserProperty("expanded") ? true : false);

            if (treeView._compareNodePath(nodePath, treeView.getSelectedNodePath())) {
                nodeTimeLine.setSelectedFrame(this._actionEditStatus.selectedframe);
                nodeInfoBg.setBackgroundColor(hy.gui.colors.YELLOW);
            } else {
                nodeTimeLine.setSelectedFrame(-1);
                nodeInfoBg.setBackgroundColor(hy.gui.colors.PUREWHITE);
            }
            if (nodePath.length == 0) {
                nodeInfoBg.setContextMenu(["添加新节点", "可见/隐藏", "重命名"]);
            } else {
                nodeInfoBg.setContextMenu(["添加新节点", "可见/隐藏", "重命名", "删除"]);
            }
            return nodeView;
        } else {
            return null;
        }

    }
    modeleditor.class.MainWin.prototype.viewOffsetOfNodeInPath = function (treeView, nodePath) {
        if (nodePath) {
            return treeView.getNodeHeight() * nodePath.length;
        } else {
            return 0;
        }
    }
    modeleditor.class.MainWin.prototype.isLeafOfNodeInPath = function (treeView, nodePath) {
        return false;
    }
    modeleditor.class.MainWin.prototype._expandModelTreeNode = function (sender, e) {
        var nodeView = sender.getParent();
        if (e.targetNode == nodeView.getNodeExpandIcon()) {
            var nodePath = nodeView.getNodePath();
            var nodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
            if (nodeUnit.getUserProperty("expanded")) {
                nodeUnit.setUserProperty("expanded", false);
            } else {
                nodeUnit.setUserProperty("expanded", true);
            }
            this._modelTree.needReloadTree();
        }
    }
    modeleditor.class.MainWin.prototype._contextmenuModelTreeNode = function (sender, e, menuIndex) {
        var nodeView = sender.getParent();
        var nodePath = nodeView.getNodePath();
        switch (menuIndex) {
            case 0:
            {
                this._showNodeDialog("新增节点", "", 1, 1);
                break;
            }
            case 1:
            {
                var nodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
                nodeUnit.setVisible(!nodeUnit.getVisible());
                break;
            }
            case 2:
            {
                var selNodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
                this._showNodeDialog("修改节点", selNodeUnit.getName(), 1, 2);
                break;
            }
            case 3:
            {
                var selUnitNode = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
                this._showWarnDialog("警告", "确认删除此节点么", 1, 3);
                break;
            }
            default:
            {
                break;
            }
        }
    }
    modeleditor.class.MainWin.prototype._contextmenuModelTreeTimeline = function (sender, e, menuIndex) {
        var index = this._actionList.getSelectedItemIndex();
        var actionNames = this._editingModel.getActionNames();
        if (index < actionNames.length) {
            var timeline = sender;
            var selFrame = timeline.getSelectedFrame();
            if (selFrame >= 0) {
                var nodeView = sender.getParent();
                var nodePath = nodeView.getNodePath();
                var nodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
                switch (menuIndex) {
                    case 0:
                    {
                        var param = {};
                        param[hy.game.frame.param.X] = nodeUnit.getX();
                        param[hy.game.frame.param.Y] = nodeUnit.getY();
                        param[hy.game.frame.param.WIDTH] = nodeUnit.getWidth();
                        param[hy.game.frame.param.HEIGHT] = nodeUnit.getHeight();
                        param[hy.game.frame.param.SCALEX] = nodeUnit.getScaleX();
                        param[hy.game.frame.param.SCALEY] = nodeUnit.getScaleY();
                        param[hy.game.frame.param.ANCHORX] = nodeUnit.getAnchorX();
                        param[hy.game.frame.param.ANCHORY] = nodeUnit.getAnchorY();
                        param[hy.game.frame.param.ROTATEZ] = nodeUnit.getRotateZ();
                        param[hy.game.frame.param.ALPHA] = nodeUnit.getAlpha();
                        timeline.addKeyFrameAt(selFrame, param);
                        break;
                    }
                    case 1:
                    {
                        timeline.removeKeyFrameAt(selFrame);
                        break;
                    }
                    case 2:
                    {
                        timeline.addTweenAt(selFrame);
                        break;
                    }
                    case 3:
                    {
                        timeline.removeTweenAt(selFrame);
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
            }
        } else {
            this._showWarnDialog("错误", "您必须在动作列表中选择一个动作才能编辑", 0, 0);
        }
    }
    modeleditor.class.MainWin.prototype._mousedownModelTreeTimeline = function (sender, e) {
        this._actionEditStatus.selectedframe = sender.getSelectedFrame();
    }
    modeleditor.class.MainWin.prototype._modelTreeNodeSelected = function (sender, nodePath) {
        var nodeView = sender.getNodeViewOfNodePath(nodePath, nodePath.length);
        if (nodeView) {
            nodeView.getNodeTimeline().setSelectedFrame(this._actionEditStatus.selectedframe);
        }
    }
    modeleditor.class.MainWin.prototype._modelTreeNodeUnSelected = function (sender, nodePath) {
        var nodeView = sender.getNodeViewOfNodePath(nodePath, nodePath.length);
        if (nodeView) {
            nodeView.getNodeTimeline().setSelectedFrame(-1);
        }
    }


    modeleditor.class.MainWin.prototype._unitsXChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsYChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsAnchorXChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsAnchorYChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsWidthChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsHeightChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }
    modeleditor.class.MainWin.prototype._unitsAngleZChanged = function (sender) {
        var keyframes = sender.getActionFramesOfName(this._actionEditStatus.name);

    }

    modeleditor.class.MainWin.prototype._mouseupAddNodeBtn = function (sender, e) {
        this._showNodeDialog("新增节点", "", 1, 1);
    }
    modeleditor.class.MainWin.prototype._mouseupEditNodeBtn = function (sender, e) {

    }
    modeleditor.class.MainWin.prototype._mouseupDelNodeBtn = function (sender, e) {
        this._showWarnDialog("警告", "确认删除此节点么", 1, 3);
    }
    modeleditor.class.MainWin.prototype._mouseupAddActionBtn = function (sender, e) {
        this._showActionDialog("新增动作", "", 2, 1);
    }
    modeleditor.class.MainWin.prototype._mouseupEditActionBtn = function (sender, e) {

    }
    modeleditor.class.MainWin.prototype._mouseupDelActionBtn = function (sender, e) {
        this._showWarnDialog("警告", "确认删除此动作么", 2, 3);
    }
    modeleditor.class.MainWin.prototype._mousedownEditUnit = function (sender, e) {
        var nodePath = [];
        var curNode = sender;
        while (curNode && curNode != this._editingModel) {
            var index = curNode.getUnitIndexInParent();
            if (index == -1) {
                nodePath = null;
                break;
            } else {
                nodePath.splice(0, 0, index);
            }
            curNode = curNode.getParent();
        }
        var selNodePath = this._modelTree.getSelectedNodePath();
        if (nodePath) {
            if (selNodePath) {
                if (!this._modelTree._compareNodePath(nodePath, selNodePath)) {
                    this._modelTree.setSelectedNodePath(nodePath);
                }
            } else {
                this._modelTree.setSelectedNodePath(nodePath);
            }
        }
    }
    modeleditor.class.MainWin.prototype._floatWinToTop = function (sender, e) {
        var parent = sender.getParent();
        sender.removeFromParent(false);
        parent.addChildNodeAtLayer(sender, 1);
    }

    modeleditor.class.MainWin.prototype._dblclickActionListItem = function (sender, e, itemView) {
        var itemIndex = itemView.getItemIndex();
        var actionNames = this._editingModel.getActionNames();
        if (itemIndex < actionNames.length) {
            this.openActionEditor(actionNames[itemIndex]);
        }
    }
    modeleditor.class.MainWin.prototype._contextMenuSelActionList = function (sender, e, contextMenuIndex, itemIndex) {
        switch (contextMenuIndex) {
            case 0:
            {
                var actionNames = this._editingModel.getActionNames();
                if (itemIndex < actionNames.length) {
                    this.openActionEditor(actionNames[itemIndex]);
                }
                break;
            }
            case 1:
            {
                var actionNames = this._editingModel.getActionNames();
                if (itemIndex < actionNames.length) {
                    this._showActionDialog("修改动作", actionNames[itemIndex], 2, 2);
                }
                break;
            }
            case 2:
            {
                this._showWarnDialog("警告", "确认删除此动作么", 2, 3);
                break;
            }
            default:
            {
                break;
            }
        }
    }
    modeleditor.class.MainWin.prototype._selectedModelTreeNode = function (sender, nodePath) {
        var selNodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
        if (selNodeUnit) {
            selNodeUnit.setResizeEnable(true);
            selNodeUnit.setResizeEnable(true);
            selNodeUnit.setAnchorMoveEnable(true);
        }
    }
    modeleditor.class.MainWin.prototype._unselectdModelTreeNode = function (sender, nodePath) {
        var selNodeUnit = this._modelTree.getNodeUnitOfNodePath(nodePath, nodePath.length);
        if (selNodeUnit) {
            selNodeUnit.setResizeEnable(false);
            selNodeUnit.setResizeEnable(false);
            selNodeUnit.setAnchorMoveEnable(false);
        }
    }
    modeleditor.class.MainWin.prototype._contextMenuSelTimeTree = function (sender, e, contextMenuIndex, nodePath) {
        var nodeview = sender.getNodeViewOfNodePath(nodePath, nodePath.length);
        var timeline = nodeview.getNodeTimeline();
        var selFrame = timeline.getSelectedFrame();
        if (timeline && selFrame >= 0) {
            var nodeUnit = sender.getNodeUnitOfNodePath(nodePath, nodePath.length);
            switch (contextMenuIndex) {
                case 0:
                {
                    var param = {};
                    param[hy.game.frame.param.X] = nodeUnit.getX();
                    param[hy.game.frame.param.Y] = nodeUnit.getY();
                    param[hy.game.frame.param.WIDTH] = nodeUnit.getWidth();
                    param[hy.game.frame.param.HEIGHT] = nodeUnit.getHeight();
                    param[hy.game.frame.param.SCALEX] = nodeUnit.getScaleX();
                    param[hy.game.frame.param.SCALEY] = nodeUnit.getScaleY();
                    param[hy.game.frame.param.ANCHORX] = nodeUnit.getAnchorX();
                    param[hy.game.frame.param.ANCHORY] = nodeUnit.getAnchorY();
                    param[hy.game.frame.param.ROTATEZ] = nodeUnit.getRotateZ();
                    param[hy.game.frame.param.ALPHA] = nodeUnit.getAlpha();
                    timeline.addKeyFrameAt(selFrame, param);
                    break;
                }
                case 1:
                {
                    timeline.removeKeyFrameAt(selFrame);
                    break;
                }
                case 2:
                {
                    timeline.addTweenAt(selFrame);
                    break;
                }
                case 3:
                {
                    timeline.removeTweenAt(selFrame);
                    break;
                }
                default:
                    break;
            }
        }

    }

    var app = new hy.Application({
        refreshMode: 0
    });
    app.run(new modeleditor.class.MainWin({}));

})(hy, window, document);





