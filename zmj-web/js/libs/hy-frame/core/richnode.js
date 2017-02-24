var hy = hy || {};

(function (hy, win, doc) {

    function syncResizeEnv () {
        if (this._resizeEnable) {
            if (!this._resizeNodes) {
                this._resizeNodes = [];
                for (var i = 0; i < 8; ++i) {
                    var node = null;
                    switch (i) {
                        case 0:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 0,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "nw-resize"
                            });
                            break;
                        }
                        case 1:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 1,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "ns-resize"
                            });
                            break;
                        }
                        case 2:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 2,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "ne-resize"
                            });
                            break;
                        }
                        case 3:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 3,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "ew-resize"
                            });
                            break;
                        }
                        case 4:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 4,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "se-resize"
                            });
                            break;
                        }
                        case 5:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 5,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "ns-resize"
                            })
                            break;
                        }
                        case 6:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 6,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "sw-resize"
                            });
                            break;
                        }
                        case 7:
                        {
                            var node = new hy.Node({
                                anchorX: 0.5,
                                anchorY: 0.5,
                                width: 6,
                                height: 6,
                                tag: 7,
                                responseEnable: true,
                                responseZone: {minX: -3, maxX: 3, minY: -3, maxY: 3},
                                dragEnable: true,
                                cursor: "ew-resize"
                            });
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    if (node) {
                        node.addObserver(hy.event.name.BEFOREDRAG, this, beforeDragResizeNodes, 0);
                        node.addObserver(hy.event.name.DRAGING, this, dragingResizeNodes, 0);
                        node.addObserver(hy.event.name.AFTERDRAG, this, afterDragResizeNodes, 0);
                        this._resizeNodes.push(node);
                    }
                }
            }
            for (var i = 0, len = this._resizeNodes.length; i < len; ++i) {
                this.addChildNodeAtLayer(this._resizeNodes[i], 0);
            }
            this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutResizeNodes, 0);
            this.addObserver(hy.event.name.PAINT, this, paintResizeIcon, Infinity);
            this.__resizeStatus = {startVector: null, startLoc: null, startSize: null};
        } else {
            if (this._resizeNodes) {
                for (var i = 0; i < 8; ++i) {
                    this._resizeNodes[i].removeFromParent(false);
                }
            }
            this.removeObserver(hy.event.name.LAYOUTSUBNODES, this, layoutResizeNodes, 0);
            this.removeObserver(hy.event.name.PAINT, this, paintResizeIcon, Infinity);
            delete this.__resizeStatus;
        }
    }

    function syncRotateEnv () {
        if (this._rotateEnable) {
            if (!this._rotateNode) {
                this._rotateNode = new hy.Node({
                    x: 0, y: -25, anchorX: 0.5, anchorY: 9.5, width: 8, height: 8,
                    responseEnable: true,
                    dragEnable: true,
                    responseZone: {minX: -4, maxX: 4, minY: -4, maxY: 4}
                });
                this._rotateNode.addObserver(hy.event.name.BEFOREDRAG, this, beforeDragRotateNode, 0);
                this._rotateNode.addObserver(hy.event.name.DRAGING, this, dragingRotateNode, 0);
                this._rotateNode.addObserver(hy.event.name.AFTERDRAG, this, afterDragRotateNode, 0);
            }
            this.addChildNodeAtLayer(this._rotateNode, 1);
            this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutRotateNodes, 0);
            this.addObserver(hy.event.name.PAINT, this, paintRotateIcon, Infinity);
            this.__rotateStatus = {startEventAngle: 0, startAngle: 0};
        } else {
            if (this._rotateNode) {
                this._rotateNode.removeFromParent(false);
            }
            this.removeObserver(hy.event.name.LAYOUTSUBNODES, this, layoutRotateNodes, 0);
            this.removeObserver(hy.event.name.PAINT, this, paintRotateIcon, Infinity);
            delete this.__rotateStatus;
        }
    }

    function syncAnchorEnv () {
        if (this._anchorMoveEnable) {
            if (!this._anchorNode) {
                this._anchorNode = new hy.Node({
                    anchorX: 0.5, anchorY: 0.5, width: 8, height: 8,
                    responseEnable: true,
                    dragEnable: true,
                    responseZone: {minX: -4, maxX: 4, minY: -4, maxY: 4}
                });
                this._anchorNode.addObserver(hy.event.name.BEFOREDRAG, this, beforeDragAnchorNode, 0);
                this._anchorNode.addObserver(hy.event.name.DRAGING, this, dragingAnchorNode, 0);
                this._anchorNode.addObserver(hy.event.name.AFTERDRAG, this, afterDragAnchorNode, 0);
            }
            this.addChildNodeAtLayer(this._anchorNode, 0);
            this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutAnchorNode, 0);
            this.addObserver(hy.event.name.PAINT, this, paintAnchorNode, Infinity);
            this.__anchorMoveStatus = {startEventLoc: null, startLoc: null, startAnchor: null};
        } else {
            if (this._anchorNode) {
                this._anchorNode.removeFromParent(false);
            }
            this.removeObserver(hy.event.name.LAYOUTSUBNODES, this, layoutAnchorNode, 0);
            this.removeObserver(hy.event.name.PAINT, this, paintAnchorNode, Infinity);
            delete this.__anchorMoveStatus;
        }
    }

    function layoutResizeNodes (sender, zone) {
        var localEnter = {x: (zone.minX + zone.maxX) / 2, y: (zone.minY + zone.maxY) / 2};
        this._resizeNodes[0].setX(zone.minX);
        this._resizeNodes[0].setY(zone.minY);
        this._resizeNodes[1].setX(localEnter.x);
        this._resizeNodes[1].setY(zone.minY);
        this._resizeNodes[2].setX(zone.maxX);
        this._resizeNodes[2].setY(zone.minY);
        this._resizeNodes[3].setX(zone.maxX);
        this._resizeNodes[3].setY(localEnter.y);
        this._resizeNodes[4].setX(zone.maxX);
        this._resizeNodes[4].setY(zone.maxY);
        this._resizeNodes[5].setX(localEnter.x);
        this._resizeNodes[5].setY(zone.maxY);
        this._resizeNodes[6].setX(zone.minX);
        this._resizeNodes[6].setY(zone.maxY);
        this._resizeNodes[7].setX(zone.minX);
        this._resizeNodes[7].setY(localEnter.y);
        if (this._adjustLayoutStyle != 0) {
            var width = zone.width - 6;
            var height = zone.height - 6;
            for (var i = 1; i < 8; i += 2) {
                var responseZone = this._resizeNodes[i].getResponseZone();
                switch (i) {
                    case 1:
                    case 5:
                    {
                        responseZone.minX = -width / 2;
                        responseZone.maxX = width / 2;
                        break;
                    }
                    case 3:
                    case 7:
                    {
                        responseZone.minY = -height / 2;
                        responseZone.maxY = height / 2;
                        break;
                    }
                    default:
                        break;
                }
            }
        } else {
            var width = zone.width - 6;
            var height = zone.height - 6;
            for (var i = 1; i < 8; i += 2) {
                var responseZone = this._resizeNodes[i].getResponseZone();
                switch (i) {
                    case 1:
                    case 5:
                    {
                        responseZone.minX = -3;
                        responseZone.maxX = 3;
                        break;
                    }
                    case 3:
                    case 7:
                    {
                        responseZone.minY = -3;
                        responseZone.maxY = 3;
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }

    function layoutRotateNodes (sender, zone) {
        this._rotateNode.setX(0);
        this._rotateNode.setY(-25);
    }

    function layoutAnchorNode (sender, zone) {
        this._anchorNode.setX(0);
        this._anchorNode.setY(0);
    }

    function beforeDragResizeNodes (sender, e) {
        var resizeStatus = this.__resizeStatus;
        resizeStatus.startVector = this.transPointFromAncestorNode(e.offsetLoc, null);
        resizeStatus.startSize = {width: this.getWidth(), height: this.getHeight()};
        resizeStatus.startLoc = {x: this.getX(), y: this.getY()};
        this.postNotification(hy.event.name.BEFORERESIZE, [e]);
    }

    function dragingResizeNodes (sender, e) {
        var resizeStatus = this.__resizeStatus;
        switch (sender.getTag()) {
            case 0:
            case 2:
            case 4:
            case 6:
            {
                if (this._resizeStyle == 1) {
                    var localAnchorOffset = this.transVectorFromAncestorNode({
                        x: this.getX() - resizeStatus.startLoc.x,
                        y: this.getY() - resizeStatus.startLoc.y
                    }, this.getParent());
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    localEventPoint.x += localAnchorOffset.x;
                    localEventPoint.y += localAnchorOffset.y;
                    var widthInc, heightInc, xInc, yInc;
                    var centerX = (0.5 - this.getAnchorX()) * resizeStatus.startSize.width;
                    var centerY = (0.5 - this.getAnchorY()) * resizeStatus.startSize.height;
                    if (resizeStatus.startVector.x - centerX > 0) {
                        widthInc = localEventPoint.x - resizeStatus.startVector.x;
                        xInc = widthInc * this.getAnchorX();
                    } else {
                        widthInc = resizeStatus.startVector.x - localEventPoint.x;
                        xInc = widthInc * (this.getAnchorX() - 1);
                    }
                    if (resizeStatus.startVector.y - centerY > 0) {
                        heightInc = localEventPoint.y - resizeStatus.startVector.y;
                        yInc = heightInc * this.getAnchorY();
                    } else {
                        heightInc = resizeStatus.startVector.y - localEventPoint.y;
                        yInc = heightInc * (this.getAnchorY() - 1);
                    }
                    var vectorIncInParent = this.transVectorToAncestorNode({x: xInc, y: yInc}, this.getParent());
                    this.setX(resizeStatus.startLoc.x + vectorIncInParent.x);
                    this.setY(resizeStatus.startLoc.y + vectorIncInParent.y);
                    this.setWidth(resizeStatus.startSize.width + widthInc);
                    this.setHeight(resizeStatus.startSize.height + heightInc);
                } else {
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    var centerX = (0.5 - this.getAnchorX()) * resizeStatus.startSize.width;
                    var centerY = (0.5 - this.getAnchorY()) * resizeStatus.startSize.height;
                    var widthInc = (resizeStatus.startVector.x - centerX > 0) ? ((1 == this.getAnchorX()) ? 0 : (localEventPoint.x - resizeStatus.startVector.x) / (1 - this.getAnchorX())) : ((0 == this.getAnchorX()) ? 0 : (resizeStatus.startVector.x - localEventPoint.x) / this.getAnchorX());
                    var heightInc = (resizeStatus.startVector.y - centerY > 0) ? ((1 == this.getAnchorY()) ? 0 : (localEventPoint.y - resizeStatus.startVector.y) / (1 - this.getAnchorY())) : ((0 == this.getAnchorY()) ? 0 : (resizeStatus.startVector.y - localEventPoint.y) / this.getAnchorY());
                    this.setWidth(resizeStatus.startSize.width + widthInc);
                    this.setHeight(resizeStatus.startSize.height + heightInc);
                }
                this.postNotification(hy.event.name.RESIZING, [e]);
                break;
            }
            case 1:
            case 5:
            {
                if (this._resizeStyle == 1) {
                    var localAnchorOffset = this.transVectorFromAncestorNode({
                        x: this.getX() - resizeStatus.startLoc.x,
                        y: this.getY() - resizeStatus.startLoc.y
                    }, this.getParent());
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    localEventPoint.x += localAnchorOffset.x;
                    localEventPoint.y += localAnchorOffset.y;
                    var heightInc, yInc;
                    var centerY = (0.5 - this.getAnchorY()) * resizeStatus.startSize.height;
                    if (resizeStatus.startVector.y - centerY > 0) {
                        heightInc = localEventPoint.y - resizeStatus.startVector.y;
                        yInc = heightInc * this.getAnchorY();
                    } else {
                        heightInc = resizeStatus.startVector.y - localEventPoint.y;
                        yInc = heightInc * (this.getAnchorY() - 1);
                    }
                    var vectorIncInParent = this.transVectorToAncestorNode({x: 0, y: yInc}, this.getParent());
                    this.setX(resizeStatus.startLoc.x + vectorIncInParent.x);
                    this.setY(resizeStatus.startLoc.y + vectorIncInParent.y);
                    this.setHeight(resizeStatus.startSize.height + heightInc);
                } else {
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    var centerY = (0.5 - this.getAnchorY()) * resizeStatus.startSize.height;
                    var heightInc = (resizeStatus.startVector.y - centerY > 0) ? ((1 == this.getAnchorY()) ? 0 : (localEventPoint.y - resizeStatus.startVector.y) / (1 - this.getAnchorY())) : ((0 == this.getAnchorY()) ? 0 : (resizeStatus.startVector.y - localEventPoint.y) / this.getAnchorY());
                    this.setHeight(resizeStatus.startSize.height + heightInc);
                }
                this.postNotification(hy.event.name.RESIZING, [e]);
                break;
            }
            case 3:
            case 7:
            {
                if (this._resizeStyle == 1) {
                    var localAnchorOffset = this.transVectorFromAncestorNode({
                        x: this.getX() - resizeStatus.startLoc.x,
                        y: this.getY() - resizeStatus.startLoc.y
                    }, this.getParent());
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    localEventPoint.x += localAnchorOffset.x;
                    localEventPoint.y += localAnchorOffset.y;
                    var widthInc, xInc;
                    var centerX = (0.5 - this.getAnchorX()) * resizeStatus.startSize.width;
                    if (resizeStatus.startVector.x - centerX > 0) {
                        widthInc = localEventPoint.x - resizeStatus.startVector.x;
                        xInc = widthInc * this.getAnchorX();
                    } else {
                        widthInc = resizeStatus.startVector.x - localEventPoint.x;
                        xInc = widthInc * (this.getAnchorX() - 1);
                    }
                    var vectorIncInParent = this.transVectorToAncestorNode({x: xInc, y: 0}, this.getParent());
                    this.setX(resizeStatus.startLoc.x + vectorIncInParent.x);
                    this.setY(resizeStatus.startLoc.y + vectorIncInParent.y);
                    this.setWidth(resizeStatus.startSize.width + widthInc);
                } else {
                    var localEventPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
                    var centerX = (0.5 - this.getAnchorX()) * resizeStatus.startSize.width;
                    var widthInc = (resizeStatus.startVector.x - centerX > 0) ? ((1 == this.getAnchorX()) ? 0 : (localEventPoint.x - resizeStatus.startVector.x) / (1 - this.getAnchorX())) : ((0 == this.getAnchorX()) ? 0 : (resizeStatus.startVector.x - localEventPoint.x) / this.getAnchorX());
                    this.setWidth(resizeStatus.startSize.width + widthInc);
                }
                this.postNotification(hy.event.name.RESIZING, [e]);
                break;
            }
            default :
                break;
        }
        this.needLayoutSubNodes();
    }

    function afterDragResizeNodes (sender, e) {
        this.postNotification(hy.event.name.AFTERRESIZE, [e]);
    }

    function beforeDragRotateNode (sender, e) {
        var rotateStatus = this.__rotateStatus;
        var canvasPoint = this.transPointToAncestorNode({x: 0, y: 0}, null);
        var canvasVector = {x: e.offsetLoc.x - canvasPoint.x, y: e.offsetLoc.y - canvasPoint.y};
        rotateStatus.startEventAngle = hy.geometry.vector.getAngle(canvasVector);
        rotateStatus.startAngle = this.getRotateZ();
        this.postNotification(hy.event.name.BEFOREROTATE, [e]);
    }

    function dragingRotateNode (sender, e) {
        var rotateStatus = this.__rotateStatus;
        var canvasPoint = this.transPointToAncestorNode({x: 0, y: 0}, null);
        var canvasVector = {x: e.offsetLoc.x - canvasPoint.x, y: e.offsetLoc.y - canvasPoint.y};
        this.setRotateZ(rotateStatus.startAngle + hy.geometry.vector.getAngle(canvasVector) - rotateStatus.startEventAngle);
        this.postNotification(hy.event.name.ROTATING, [e]);
        this.needLayoutSubNodes();
    }

    function afterDragRotateNode (sender, e) {
        this.postNotification(hy.event.name.AFTERROTATE, [e]);
    }

    function beforeDragAnchorNode (sender, e) {
        var moveStatus = this.__anchorMoveStatus;
        moveStatus.startEventLoc = {x: e.offsetLoc.x, y: e.offsetLoc.y};
        moveStatus.startAnchor = {x: this.getAnchorX(), y: this.getAnchorY()};
        moveStatus.startLoc = {x: this.getX(), y: this.getY()};
        this.postNotification(hy.event.name.BEFOREANCHORMOVE, [e]);
    }

    function dragingAnchorNode (sender, e) {
        var moveStatus = this.__anchorMoveStatus;
        var offsetVector = {
            x: e.offsetLoc.x - moveStatus.startEventLoc.x,
            y: e.offsetLoc.y - moveStatus.startEventLoc.y
        };
        var localOffsetVector;
        var parentOffsetVector;
        var parentNode = this.getParent();
        if (parentNode) {
            parentOffsetVector = parentNode.transVectorFromAncestorNode(offsetVector, null);
            localOffsetVector = this.transVectorFromAncestorNode(parentOffsetVector, parentNode);
        } else {
            parentOffsetVector = offsetVector;
            localOffsetVector = this.transVectorFromAncestorNode(offsetVector, null);
        }
        this.setX(moveStatus.startLoc.x + parentOffsetVector.x);
        this.setY(moveStatus.startLoc.y + parentOffsetVector.y);
        this.setAnchorX(moveStatus.startAnchor.x + localOffsetVector.x / this.getWidth());
        this.setAnchorY(moveStatus.startAnchor.y + localOffsetVector.y / this.getHeight());
        this.postNotification(hy.event.name.ANCHORMOVING, [e]);
        this.needLayoutSubNodes();
    }

    function afterDragAnchorNode (sender, e) {
        this.postNotification(hy.event.name.AFTERANCHORMOVE, [e]);
    }

    function paintResizeIcon (sender, dc, zone) {
        if (this._adjustLayoutStyle == 0) {
            dc.setStrokeStyle("#00f");
            dc.setLineWidth(1);
            var minX = zone.minX - 0.5;
            var minY = zone.minY - 0.5;
            var maxX = zone.maxX + 0.5;
            var maxY = zone.maxY + 0.5;
            var centerx = (minX + maxX) / 2;
            var middley = (minY + maxY) / 2;
            var pi2 = Math.PI * 2;
            dc.beginPath();
            dc.arc(minX, minY, 3, 0, pi2, false);
            dc.lineTo(centerx - 2, minY);
            dc.moveTo(centerx + 3, minY);
            dc.arc(centerx, minY, 3, 0, pi2, false);
            dc.lineTo(maxX - 2, minY);
            dc.moveTo(maxX + 3, minY);
            dc.arc(maxX, minY, 3, 0, pi2, false);
            dc.moveTo(minX + 3, middley);
            dc.arc(minX, middley, 3, 0, pi2, false);
            dc.moveTo(maxX + 3, middley);
            dc.arc(maxX, middley, 3, 0, pi2, false);
            dc.moveTo(minX + 3, maxY);
            dc.arc(minX, maxY, 3, 0, pi2, false);
            dc.lineTo(centerx - 3, maxY);
            dc.moveTo(centerx + 3, maxY);
            dc.arc(centerx, maxY, 3, 0, pi2, false);
            dc.lineTo(maxX - 3, maxY);
            dc.moveTo(maxX + 3, maxY);
            dc.arc(maxX, maxY, 3, 0, pi2, false);
            dc.moveTo(minX, minY + 3);
            dc.lineTo(minX, middley - 3);
            dc.moveTo(minX, middley + 3);
            dc.lineTo(minX, maxY - 3);
            dc.moveTo(maxX, minY + 3);
            dc.lineTo(maxX, middley - 3);
            dc.moveTo(maxX, middley + 3);
            dc.lineTo(maxX, maxY - 3);
            dc.stroke();
        }
    }

    function paintRotateIcon (sender, dc, zone) {
        var rotateX = this._rotateNode.getX();
        var rotateY = this._rotateNode.getY();
        dc.setStrokeStyle(hy.gui.colors.PUREBLACK);
        dc.beginPath();
        dc.arc(rotateX, rotateY, 4, 0, Math.PI * 2, false);
        dc.moveTo(0, 0);
        dc.lineTo(rotateX, rotateY + 4);
        dc.stroke();
    }

    function paintAnchorNode (sender, dc, zone) {
        dc.setFillStyle(hy.gui.colors.PUREBLACK);
        dc.beginPath();
        dc.arc(0, 0, 4, 0, Math.PI * 2, false);
        dc.fill();
        dc.setStrokeStyle("#00f");
        dc.beginPath();
        dc.moveTo(4, 0);
        dc.lineTo(25, 0);
        dc.lineTo(20, 1.5);
        dc.lineTo(20, -1.5);
        dc.lineTo(25, 0);
        dc.stroke();
        dc.setStrokeStyle("#0f0");
        dc.beginPath();
        dc.moveTo(0, 4);
        dc.lineTo(0, 25);
        dc.lineTo(1.5, 20);
        dc.lineTo(-1.5, 20);
        dc.lineTo(0, 25);
        dc.stroke();
    }

    hy.RichNode = hy.extend(hy.Node);
    hy.RichNode.prototype.defaultAnchorMoveEnable = true;
    hy.RichNode.prototype.defaultResizeEnable = true;
    hy.RichNode.prototype.defaultRotateEnable = true;
    hy.RichNode.prototype.defaultResizeStyle = 0;
    hy.RichNode.prototype.defaultAdjustLayoutStyle = 0;//0:gamenode布局模式;1:guinode布局模式
    hy.RichNode.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._anchorMoveEnable = hy.util.dataType.isUndefined(config.anchorMoveEnable) ? this.defaultAnchorMoveEnable : config.anchorMoveEnable;
        this._resizeEnable = hy.util.dataType.isUndefined(config.resizeEnable) ? this.defaultResizeEnable : config.resizeEnable;
        this._rotateEnable = hy.util.dataType.isUndefined(config.rotateEnable) ? this.defaultRotateEnable : config.rotateEnable;
        this._resizeStyle = hy.util.dataType.isUndefined(config.resizeStyle) ? this.defaultResizeStyle : config.resizeStyle;
        this._adjustLayoutStyle = hy.util.dataType.isUndefined(config.adjustLayoutStyle) ? this.defaultAdjustLayoutStyle : config.adjustLayoutStyle;
    }
    hy.RichNode.prototype.sync = function () {
        this.superCall("sync", null);
        syncResizeEnv.call(this);
        syncRotateEnv.call(this);
        syncAnchorEnv.call(this);
    }
    hy.RichNode.prototype.getResizeEnable = function () {
        return this._resizeEnable;
    }
    hy.RichNode.prototype.setResizeEnable = function (resizeEnable) {
        if (this._resizeEnable != resizeEnable) {
            this._resizeEnable = resizeEnable;
            syncResizeEnv.call(this);
        }
    }
    hy.RichNode.prototype.getRotateEnable = function () {
        return this._rotateEnable;
    }
    hy.RichNode.prototype.setRotateEnable = function (rotateEnable) {
        if (this._rotateEnable != rotateEnable) {
            this._rotateEnable = rotateEnable;
            syncRotateEnv.call(this);
        }
    }
    hy.RichNode.prototype.getAnchorMoveEnable = function () {
        return this._anchorMoveEnable;
    }
    hy.RichNode.prototype.setAnchorMoveEnable = function (anchorMoveEnable) {
        if (this._anchorMoveEnable != anchorMoveEnable) {
            this._anchorMoveEnable = anchorMoveEnable;
            syncAnchorEnv.call(this);
        }
    }

})(hy, window, document);