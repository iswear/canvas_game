var hy = hy || {};

(function (hy, win, doc) {

    function createFullScreenCanvas () {
        var canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        doc.body.appendChild(canvas);
        return canvas;
    }

    function checkSyncAppSizeEnv () {
        var clientWidth = this._renderCanvas.clientWidth;
        var clientHeight = this._renderCanvas.clientHeight;
        if (clientWidth != this._canvasWidth) {
            this._canvasWidth = clientWidth;
            if (clientHeight != this._canvasHeight) {
                this._canvasHeight = clientHeight;
            }
            syncAppSizeEnv.call(this);
        } else if (clientHeight != this._canvasHeight) {
            this._canvasHeight = clientHeight;
            syncAppSizeEnv.call(this);
        }
    }

    function syncAppSizeEnv () {
        switch (this._scaleMode) {
            case 1: {
                this._winHeight =  this._winWidth * this._canvasHeight / this._canvasWidth;
                this._scaleX = this._winWidth / this._canvasWidth;
                this._scaleY = this._winHeight / this._canvasHeight;
                break;
            }
            case 2: {
                this._winWidth = this._winHeight * this._canvasWidth / this._canvasHeight;
                this._scaleX = this._winWidth / this._canvasWidth;
                this._scaleY = this._winHeight / this._canvasHeight;
                break;
            }
            case 3: {
                this._scaleX = this._winWidth / this._canvasWidth;
                this._scaleY = this._winHeight / this._canvasHeight;
                break;
            }
            default : {
                this._scaleX = 1;
                this._scaleY = 1;
                this._winWidth = this._canvasWidth;
                this._winHeight = this._canvasHeight;
                break;
            }
        }
        this._renderContext.setWidth(this._winWidth);
        this._renderContext.setHeight(this._winHeight);
        if (this._runNodeInfo.curNode) {
            this._runNodeInfo.curNode.setWidth(this._winWidth);
            this._runNodeInfo.curNode.setHeight(this._winHeight);
        }
    }

    function defaultMouseEventArg () {
        return {
            e: null,
            touch: null,
            identifier: 0,
            target: null,
            screenLoc: {x: 0, y: 0},
            clientLoc: {x: 0, y: 0},
            pageLoc: {x: 0, y: 0},
            preOffsetLoc: {x: 0, y: 0},
            offsetLoc: {x: 0, y: 0},
            nodeLoc: null,
            wheelDelta: 0,
            keyCode: 0,
            button: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            isMouseDown: false,
            preValid: false,
            targetNode: null,
            _app: null,
            _dispatch: true,
            isDispatch: function () {
                return this._dispatch;
            },
            stopDispatch: function () {
                this._dispatch = false;
            },
            resumeDispatch: function () {
                this._dispatch = true;
            },
            stopDomDispatch: function () {
                try {
                    this.e.stopPropagation();
                } catch (error) {
                    this.e.cancelBubble = true;
                }
            },
            preventDomDefault: function () {
                try {
                    this.e.preventDefault();
                } catch (err) {
                    this.e.returnValue = false;
                }
            }
        };
    }

    function formatMouseEventArg (e, touch) {
        if (touch) {
            var hyevent = this._mouseEveArgs[touch.identifier];
            if (!hyevent) {
                hyevent = defaultMouseEventArg();
                this._mouseEveArgs[touch.identifier] = hyevent;
            }
            hyevent.e = e;
            hyevent.touch = touch;
            hyevent.identifier = touch.identifier;
            hyevent.target = touch.target ? touch.target : touch.srcElement;
            hyevent.screenLoc.x = touch.screenX;
            hyevent.screenLoc.y = touch.screenY;
            hyevent.clientLoc.x = touch.clientX;
            hyevent.clientLoc.y = touch.clientY;
            hyevent.pageLoc.x = touch.pageX;
            hyevent.pageLoc.y = touch.pageY;
            if (hyevent.preValid) {
                var canvasOffset = this._renderCanvas.getBoundingClientRect();
                hyevent.preOffsetLoc.x = hyevent.offsetLoc.x;
                hyevent.preOffsetLoc.y = hyevent.offsetLoc.y;
                hyevent.offsetLoc.x = (hyevent.pageLoc.x - canvasOffset.left) * this.getScaleX();
                hyevent.offsetLoc.y = (hyevent.pageLoc.y - canvasOffset.top) * this.getScaleY();
            } else {
                var canvasOffset = this._renderCanvas.getBoundingClientRect();
                hyevent.offsetLoc.x = (hyevent.pageLoc.x - canvasOffset.left) * this.getScaleX();
                hyevent.offsetLoc.y = (hyevent.pageLoc.y - canvasOffset.top) * this.getScaleY();
                hyevent.preOffsetLoc.x = hyevent.offsetLoc.x;
                hyevent.preOffsetLoc.y = hyevent.offsetLoc.y;
            }
            hyevent._dispatch = true;
            hyevent._app = this;
            var rootNode = this._runNodeInfo.rootNode;
            rootNode.setUserProperty("event_local_loc", rootNode.transPointFromAncestorNode(hyevent.offsetLoc, null));
            return hyevent;
        } else {
            var hyevent = this._mouseEveArgs[0];
            if (!hyevent) {
                hyevent = defaultMouseEventArg();
                this._mouseEveArgs[0] = hyevent;
            }
            hyevent.e = e;
            hyevent.touch = touch;
            hyevent.target = e.target ? e.target : e.srcElement;
            hyevent.screenLoc.x = e.screenX;
            hyevent.screenLoc.y = e.screenY;
            hyevent.clientLoc.x = e.clientX;
            hyevent.clientLoc.y = e.clientY;
            hyevent.pageLoc.x = e.pageX ? e.pageX : (document.body.scrollLeft + e.clientX);
            hyevent.pageLoc.y = e.pageY ? e.pageY : (document.body.scrollTop + e.clientY);
            hyevent.preOffsetLoc.x = hyevent.offsetLoc.x;
            hyevent.preOffsetLoc.y = hyevent.offsetLoc.y;
            var canvasOffset = this._renderCanvas.getBoundingClientRect();
            hyevent.offsetLoc.x = (hyevent.pageLoc.x - canvasOffset.left) * this.getScaleX();
            hyevent.offsetLoc.y = (hyevent.pageLoc.y - canvasOffset.top) * this.getScaleY();
            hyevent.wheelDelta = e.wheelDelta ? e.wheelDelta : e.detail;
            hyevent.keyCode = e.keyCode;
            hyevent.button = e.button;
            hyevent.altKey = e.altKey;
            hyevent.ctrlKey = e.ctrlKey;
            hyevent.metaKey = e.metaKey;
            hyevent._dispatch = true;
            hyevent._app = this;
            var rootNode = this._runNodeInfo.rootNode;
            rootNode.setUserProperty("event_local_loc", rootNode.transPointFromAncestorNode(hyevent.offsetLoc, null));
            return hyevent;
        }
    }

    hy.Application = hy.extend(hy.Observable);
    hy.Application.prototype.defaultWinWidth = 600;
    hy.Application.prototype.defaultWinHeight = 400;
    hy.Application.prototype.init = function (config) {
        this.super("init", [config]);
        this._winWidth = hy.util.dataType.isUndefined(config.winWidth) ? this.defaultWinWidth : config.winWidth;
        this._winHeight = hy.util.dataType.isUndefined(config.winHeight) ? this.defaultWinHeight : config.winHeight;
        this._canvasWidth = 0;
        this._canvasHeight = 0;
        this._scaleMode = hy.util.dataType.isUndefined(config.scaleMode) ? 0 : config.scaleMode;

        if (hy.util.dataType.isUndefined(config.canvas)) {
            this._renderCanvas = createFullScreenCanvas();
            this._renderContext = new hy.RenderContext({
                width: this._winWidth,
                height: this._winHeight,
                canvas: this._renderCanvas
            });
        } else {
            this._renderCanvas = config.canvas;
            this._renderContext = new hy.RenderContext({
                width: this._winWidth,
                height: this._winHeight,
                canvas: this._renderCanvas
            });
        }

        this._scaleX = 1;
        this._scaleY = 1;

        this._preLoopTime = 0;
        this._refresh = true;
        this._mouseCursor = "default";
        this._mouseEveArgs = [];

        this._runNodeInfo = {
            rootNode: new hy.Node({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                alpha: 1.0,
                rotateZ: 0,
                visible: true,
                mouseEnable: false,
                dragEnable: false,
                wheelEnable: false
            }),
            nodeStack: [],
            curNode: null
        };

        this._actionManager = new hy.action.Manager({});
        this._fileLoader = new hy.net.FileLoader({});
        this._inputTextBox = new hy.html.TextBox({});
        this._contextMenu = new hy.gui.ContextMenu({
            width: 125,
            visible: false,
            responseEnable: true
        });
        this._runNodeInfo.rootNode.setApplication(this);
        this._runNodeInfo.rootNode.addChildNodeAtLayer(this._contextMenu, 1);
    }
    hy.Application.prototype.sync = function () {
        this.super("sync", null);
        checkSyncAppSizeEnv.call(this);
    }
    hy.Application.prototype.getWinWidth = function () {
        return this._winWidth;
    }
    hy.Application.prototype.getWinHeight = function () {
        return this._winHeight;
    }
    hy.Application.prototype.getScaleX = function () {
        return this._scaleX;
    }
    hy.Application.prototype.getScaleY = function () {
        return this._scaleY;
    }
    hy.Application.prototype.setMouseCursor = function (mouseCursor) {
        if (this._renderContext) {
            var canvas = this._renderContext.getCanvas();
            if (canvas) {
                if (mouseCursor) {
                    if (this._mouseCursor != mouseCursor) {
                        this._mouseCursor = mouseCursor;
                        canvas.style.cursor = mouseCursor;
                    }
                } else {
                    this._mouseCursor = "default";
                    canvas.style.cursor = this._mouseCursor;
                }
            }
        }
    }
    hy.Application.prototype.getInputTextBox = function () {
        return this._inputTextBox;
    }
    hy.Application.prototype.showContextMenu = function (e, node, menuItems, menuType) {
        this._contextMenu.showForNode(e, node, menuItems, menuType);
    }
    hy.Application.prototype.hideContextMenu = function () {
        this._contextMenu.hide();
    }
    hy.Application.prototype.getActionManager = function () {
        return this._actionManager;
    }
    hy.Application.prototype.getFileLoader = function () {
        return this._fileLoader;
    }

    hy.Application.prototype.pause = function () {
        this._actionManager.pause();
    }
    hy.Application.prototype.resume = function () {
        this._actionManager.resume();
    }

    hy.Application.prototype.refresh = function () {
        this._refresh = true;
    }
    hy.Application.prototype.pushRunNode = function (node) {
        if (node) {
            var runNodeInfo = this._runNodeInfo;
            if (runNodeInfo.curNode) {
                runNodeInfo.rootNode.removeChildNode(runNodeInfo.curNode, false);
            }
            runNodeInfo.nodeStack.push(node);
            runNodeInfo.curNode = node;
            runNodeInfo.rootNode.addChildNode(node, 0);
            node.setWidth(this._winWidth);
            node.setHeight(this._winHeight);
        }
    }
    hy.Application.prototype.popRunNode = function (clean) {
        var runNodeInfo = this._runNodeInfo;
        var node = runNodeInfo.curNode;
        if (node) {
            runNodeInfo.rootNode.removeChildNodeAtLayer(0, node, clean);
            runNodeInfo.nodeStack.pop();
            if (runNodeInfo.nodeStack.length > 0) {
                runNodeInfo.curNode = runNodeInfo.nodeStack[this._runNodeStack.length - 1];
                runNodeInfo.rootNode.addChildNode(this._runNode, 0);
                runNodeInfo.curNode.setWidth(this._winWidth);
                runNodeInfo.curNode.setHeight(this._winHeight);
            }
        }
        return node;
    }
    hy.Application.prototype.run = function (node) {
        this._preLoopTime = 0;
        this.pushRunNode(node);
        this.initEventDispatcher();
        try {
            hy.util.timer.setRequestFrame(this.mainLoop, this);
        } catch (err) {
            hy.util.timer.setInterval(this.mainLoop, this);
        }
    }

    hy.Application.prototype.initEventDispatcher = function () {
        if (hy.platform.isMobile()) {
            hy.event.addEventListener(doc, "touchstart", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = true;
                    curTouch.isMouseDown = true;
                    curTouch.targetNode = null;
                    this.postNotification(hy.event.name.MOUSEDOWN, [curTouch]);
                    this._inputTextBox.hideForNode(this._inputTextBox.getInputNode());
                }
            });
            hy.event.addEventListener(doc, "touchmove", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    if (curTouch.preOffsetLoc.x != curTouch.offsetLoc.x || curTouch.preOffsetLoc.y != curTouch.offsetLoc.y) {
                        this.postNotification(hy.event.name.MOUSEMOVE, [curTouch]);
                        var subNode = curTouch.targetNode;
                        if (subNode != null) {
                            var parentNode = subNode.getParent();
                            curTouch.resumeDispatch();
                            while (parentNode != null) {
                                if (curTouch.isDispatch()) {
                                    if (subNode.getResponseEnable()) {
                                        subNode.postNotification(hy.event.name.MOUSEOUT, [curTouch]);
                                    }
                                    subNode = parentNode;
                                    parentNode = parentNode.getParent();
                                } else {
                                    break;
                                }
                            }
                            curTouch.targetNode = null;
                        }
                    }
                }
            });
            hy.event.addEventListener(doc, "touchend", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = false;
                    curTouch.isMouseDown = false;
                    curTouch.targetNode = null;
                    this.postNotification(hy.event.name.MOUSEUP, [curTouch]);
                }
            });
            hy.event.addEventListener(doc, "touchcancel", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = false;
                    curTouch.isMouseDown = false;
                    curTouch.targetNode = null;
                    this.postNotification(hy.event.name.MOUSEUP, [curTouch]);
                }
            });
            hy.event.addEventListener(canvas, "touchstart", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = true;
                    curTouch.isMouseDown = true;
                    if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEDOWN, curTouch, false)) {
                        curTouch.targetNode = null;
                    }
                    this.postNotification(hy.event.name.MOUSEDOWN, [curTouch]);
                    this._inputTextBox.hideForNode(this._inputTextBox.getInputNode());
                    curTouch.stopDomDispatch();
                    curTouch.preventDomDefault();
                }
                //this.hideContextMenu();
            });
            hy.event.addEventListener(this._renderCanvas, "touchmove", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    if (curTouch.preOffsetLoc.x != curTouch.offsetLoc.x || curTouch.preOffsetLoc.y != curTouch.offsetLoc.y) {
                        if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEMOVE, curTouch, true)) {
                            var subNode = curTouch.targetNode;
                            if (subNode != null) {
                                var parentNode = subNode.getParent();
                                curTouch.resumeDispatch();
                                while (parentNode != null) {
                                    if (curTouch.isDispatch()) {
                                        if (subNode.getResponseEnable()) {
                                            subNode.postNotification(hy.event.name.MOUSEOUT, [curTouch]);
                                        }
                                        subNode = parentNode;
                                        parentNode = parentNode.getParent();
                                    } else {
                                        break;
                                    }
                                }
                                curTouch.targetNode = null;
                            }
                        }
                        this.postNotification(hy.event.name.MOUSEMOVE, [curTouch]);
                    }
                    curTouch.stopDomDispatch();
                    curTouch.preventDomDefault();
                }
            });
            hy.event.addEventListener(this._renderCanvas, "touchend", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = false;
                    curTouch.isMouseDown = false;
                    if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEUP, curTouch, false)) {
                        e.targetNode = null;
                    }
                    this.postNotification(hy.event.name.MOUSEUP, [curTouch]);
                    curTouch.stopDomDispatch();
                    curTouch.preventDomDefault();
                }
            });
            hy.event.addEventListener(this._renderCanvas, "touchcancel", this, function (e) {
                var e = event ? event : e;
                for (var i = 0, touchCount = e.changedTouches.length; i < touchCount; ++i) {
                    var curTouch = formatMouseEventArg.call(this, e, e.changedTouches[i]);
                    curTouch.preValid = false;
                    curTouch.isMouseDown = false;
                    if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEUP, curTouch, false)) {
                        e.targetNode = null;
                    }
                    this.postNotification(hy.event.name.MOUSEUP, [curTouch]);
                    curTouch.stopDomDispatch();
                    curTouch.preventDomDefault();
                }
            });
        } else {
            hy.event.addEventListener(doc, "keydown", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                this.postNotification(hy.event.name.KEYDOWN, e);
            });
            hy.event.addEventListener(doc, "keypress", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                this.postNotification(hy.event.name.KEYPRESS, e);
            });
            hy.event.addEventListener(doc, "keyup", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                this.postNotification(hy.event.name.KEYUP, e);
            });
            hy.event.addEventListener(doc, "mousedown", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                e.isMouseDown = true;
                this.postNotification(hy.event.name.MOUSEDOWN, [e]);
                this._inputTextBox.hideForNode(this._inputTextBox.getInputNode());
            });
            hy.event.addEventListener(doc, "mousemove", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                this.postNotification(hy.event.name.MOUSEMOVE, [e]);
                var subNode = e.targetNode;
                if (subNode != null) {
                    var parentNode = subNode.getParent();
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
                    e.targetNode = null;
                }
            });
            hy.event.addEventListener(doc, "mouseup", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                e.isMouseDown = false;
                this.postNotification(hy.event.name.MOUSEUP, [e]);
            });
            hy.event.addEventListener(this._renderCanvas, "click", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.CLICK, e, false)) {
                    e.targetNode = null;
                }
                this.postNotification(hy.event.name.CLICK, [e]);
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "dblclick", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.DBLCLICK, e, false)) {
                    e.targetNode = null;
                }
                this.postNotification(hy.event.name.DBLCLICK, [e]);
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "contextmenu", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.CONTEXTMENU, e, false)) {
                    e.targetNode = null;
                }
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "mousedown", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                e.isMouseDown = true;
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEDOWN, e, false)) {
                    e.targetNode = null;
                }
                this.postNotification(hy.event.name.MOUSEDOWN, [e]);
                this.hideContextMenu();
                this._inputTextBox.hideForNode(this._inputTextBox.getInputNode());
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "mousemove", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (e.preOffsetLoc.x != e.offsetLoc.x || e.preOffsetLoc.y != e.offsetLoc.y) {
                    if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEMOVE, e, true)) {
                        var subNode = e.targetNode;
                        if (subNode != null) {
                            var parentNode = subNode.getParent();
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
                            e.targetNode = null;
                        }
                    }
                    this.postNotification(hy.event.name.MOUSEMOVE, [e]);
                }
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "mouseup", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                e.isMouseDown = false;
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEUP, e, false)) {
                    e.targetNode = null;
                }
                this.postNotification(hy.event.name.MOUSEUP, [e]);
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "mousewheel", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEWHEEL, e, true)) {
                    e.targetNode = null;
                }
                e.stopDomDispatch();
                e.preventDomDefault();
            });
            hy.event.addEventListener(this._renderCanvas, "DOMMouseScroll", this, function (e) {
                var e = formatMouseEventArg.call(this, event ? event : e, null);
                if (!this._runNodeInfo.rootNode._dispatchMouseEvent(hy.event.name.MOUSEWHEEL, e, true)) {
                    e.targetNode = null;
                }
                e.stopDomDispatch();
                e.preventDomDefault();
            });
        }
    }

    hy.Application.prototype.mainLoop = function () {
        checkSyncAppSizeEnv.call(this);
        var deltaTime;
        if (this._preLoopTime != 0) {
            var curFrameTime = (new Date()).getTime();
            deltaTime = curFrameTime - this._preLoopTime;
            this._preLoopTime = curFrameTime;
            this._actionManager.runActions(deltaTime);
        } else {
            this._preLoopTime = (new Date()).getTime();
            deltaTime = 0;
        }
        if (this._refresh) {
            this._refresh = false;
            this._renderContext.clearRect(0, 0, this._winWidth, this._winHeight);
            this._runNodeInfo.rootNode._dispatchLoop(this._renderContext, deltaTime, true);
        } else {
            this._runNodeInfo.rootNode._dispatchLoop(this._renderContext, deltaTime, false);
        }
    }
    hy.Application.prototype.purge = function () {
        this._mouseEveArgs = null;
        var nodeStack = this._runNodeInfo.nodeStack;
        var rootNode = this._runNodeInfo.rootNode;
        for (var i = 0, len = nodeStack.length; i < len; ++i) {
            nodeStack[i].purge();
        }
        rootNode.purge();
        this._runNodeInfo = null;
        this._inputTextBox.purge();
        this._inputTextBox = null;
        this._contextMenu.purge();
        this._contextMenu = null;
        this._renderContext.purge();
        this._renderContext = null;
        this._actionManager.purge();
        this._actionManager = null;
        this._fileLoader.purge();
        this._fileLoader = null;
        this.super("purge", null);
    }

})(hy, window, document);
