var hy = hy || {};

(function (hy, win, doc) {

    function syncSplitSpaceViews () {
        if (this._splitViews && this._splitViews.length > 0) {
            var viewCount = this._splitViews.length;
            /*删除残存分割视图*/
            for (var i = this._splitSpaceViews.length - 1; i >= 0; --i) {
                this._splitSpaceViews[i].removeFromParent(true);
                this._splitSpaceViews.splice(i, 1);
            }
            /*添加所有需要视图*/
            for (var i = 0; i < viewCount; ++i) {
                this.addChildNodeAtLayer(this._splitViews[i], 0);
                if (i < viewCount - 1) {
                    var spaceView = new hy.gui.View({
                        clipEnable: false,
                        responseEnable: true,
                        dragEnable: this._adjustEnable
                    });
                    if (this._adjustEnable) {
                        if (this._splitDirection == 0) {
                            spaceView.setMinY(0);
                            spaceView.setMaxY(0);
                            spaceView.setCursor("ew-resize");
                        } else {
                            spaceView.setMinX(0);
                            spaceView.setMaxX(0);
                            spaceView.setCursor("ns-resize");
                        }
                        spaceView.addObserver(hy.event.name.DRAGING, this, this.needLayoutSubNodes, 0);
                    } else {
                        spaceView.setCursor(null);
                    }
                    this._splitSpaceViews.push(spaceView);
                    this.addChildNodeAtLayer(spaceView, 0);
                }
            }
            /*初始化布局*/
            if (this._splitDirection == 0) {
                var averageWidth = this.getWidth() - this._splitSpace * (viewCount - 1);
                var averageViewWidth = averageWidth / viewCount;
                var x = 0;
                for (var i = 0, splitViewCount = viewCount - 1; i < splitViewCount; ++i) {
                    x += averageViewWidth;
                    this._splitSpaceViews[i].setX(x);
                    x += this._splitSpace;
                }
                for (var i = 0; i < viewCount; ++i) {
                    this._splitViews[i].setHeight(averageViewWidth);
                }
            } else {
                var averageHeight = this.getHeight() - this._splitSpace * (viewCount - 1);
                var averageViewHeight = averageHeight / viewCount;
                var y = 0;
                for (var i = 0, splitViewCount = viewCount - 1; i < splitViewCount; ++i) {
                    y += averageViewHeight;
                    this._splitSpaceViews[i].setY(y);
                    y += this._splitSpace;
                }
                for (var i = 0; i < viewCount; ++i) {
                    this._splitViews[i].setHeight(averageViewHeight);
                }
            }
        } else {
            for (var i = this._splitSpaceViews.length - 1; i >= 0; --i) {
                this._splitSpaceViews[i].removeFromParent(true);
            }
        }
    }

    function resizeSplitViewWidth () {
        if (this._splitDirection == 0) {
            this.__needAutoAdjustFlag = true;
        }
    }

    function resizeSplitViewHeight () {
        if (this._splitDirection != 0) {
            this.__needAutoAdjustFlag = true;
        }
    }

    function layoutSplitViews (sender, zone) {
        var viewCount = this._splitViews.length;
        var width = zone.width;
        var height = zone.height;
        if (this._splitDirection == 0) {
            if (this.__needAutoAdjustFlag) {
                this.__needAutoAdjustFlag = false;
                if (this._autoAdjustViewIndex < 0) {
                    var x = 0;
                    for (var i = 0, splitViewCount = viewCount - 1; i < splitViewCount; ++i) {
                        x += this._splitViews[i].getWidth();
                        this._splitSpaceViews[i].setX(x);
                        x += this._splitSpace;
                    }
                } else {
                    var x = 0;
                    for (var i = 0, splitViewCount = (this._autoAdjustViewIndex < viewCount) ? this._autoAdjustViewIndex : (viewCount - 1); i < splitViewCount; ++i) {
                        x += this._splitViews[i].getWidth();
                        this._splitSpaceViews[i].setX(x);
                        x += this._splitSpace;
                    }
                    var reverseX = zone.width;
                    for (var i = viewCount - 1; i > this._autoAdjustViewIndex; --i) {
                        reverseX -= (this._splitViews[i].getWidth() + this._splitSpace);
                        this._splitSpaceViews[i - 1].setX(reverseX);
                    }
                }
            }
            for (var i = 0; i < viewCount; ++i) {
                if (i == 0) {
                    var splitView = this._splitViews[i];
                    var spaceView = this._splitSpaceViews[i];
                    spaceView.setWidth(this._splitSpace);
                    spaceView.setHeight(height);
                    spaceView.setMinX(0);
                    splitView.setX(0);
                    splitView.setY(0);
                    splitView.setWidth(spaceView.getX());
                    splitView.setHeight(height);
                } else if (i == viewCount - 1) {
                    var splitView = this._splitViews[i];
                    var preSpaceView = this._splitSpaceViews[i - 1];
                    preSpaceView.setMaxX(width - this._splitSpace);
                    splitView.setX(preSpaceView.getX() + this._splitSpace);
                    splitView.setY(0);
                    splitView.setWidth(width - splitView.getX());
                    splitView.setHeight(height);
                } else {
                    var splitView = this._splitViews[i];
                    var spaceView = this._splitSpaceViews[i];
                    var preSpaceView = this._splitSpaceViews[i - 1];
                    spaceView.setWidth(this._splitSpace);
                    spaceView.setHeight(height);
                    spaceView.setMinX(preSpaceView.getX() + this._splitSpace);
                    preSpaceView.setMaxX(spaceView.getX() - this._splitSpace);
                    splitView.setX(preSpaceView.getX() + this._splitSpace);
                    splitView.setY(0);
                    splitView.setWidth(spaceView.getX() - preSpaceView.getX() - this._splitSpace);
                    splitView.setHeight(height);
                }
            }
        } else {
            if (this.__needAutoAdjustFlag) {
                this.__needAutoAdjustFlag = false;
                if (this._autoAdjustViewIndex < 0) {
                    var y = 0;
                    for (var i = 0, splitViewCount = viewCount - 1; i < splitViewCount; ++i) {
                        y += this._splitViews[i].getHeight();
                        this._splitSpaceViews[i].setY(y);
                        y += this._splitSpace;
                    }
                } else {
                    var y = 0;
                    for (var i = 0, splitViewCount = (this._autoAdjustViewIndex < viewCount) ? this._autoAdjustViewIndex : (viewCount - 1); i < splitViewCount; ++i) {
                        y += this._splitViews[i].getHeight();
                        this._splitSpaceViews[i].setY(y);
                        y += this._splitSpace;
                    }
                    var reverseY = this.getHeight();
                    for (var i = viewCount - 1; i > this._autoAdjustViewIndex; --i) {
                        reverseY -= (this._splitViews[i].getHeight() + this._splitSpace);
                        this._splitSpaceViews[i - 1].setY(reverseY);
                    }
                }
            }
            for (var i = 0; i < viewCount; ++i) {
                if (i == 0) {
                    var splitView = this._splitViews[i];
                    var spaceView = this._splitSpaceViews[i];
                    spaceView.setWidth(width);
                    spaceView.setHeight(this._splitSpace);
                    spaceView.setMinX(0);
                    splitView.setX(0);
                    splitView.setY(0);
                    splitView.setWidth(width);
                    splitView.setHeight(spaceView.getY());
                } else if (i == viewCount - 1) {
                    var splitView = this._splitViews[i];
                    var preSpaceView = this._splitSpaceViews[i - 1];
                    preSpaceView.setMaxY(height - this._splitSpace);
                    splitView.setX(0);
                    splitView.setY(preSpaceView.getY() + this._splitSpace);
                    splitView.setWidth(width);
                    splitView.setHeight(height - splitView.getY());
                } else {
                    var splitView = this._splitViews[i];
                    var spaceView = this._splitSpaceViews[i];
                    var preSpaceView = this._splitSpaceViews[i - 1];
                    spaceView.setWidth(width);
                    spaceView.setHeight(this._splitSpace);
                    spaceView.setMinY(preSpaceView.getY() + this._splitSpace);
                    preSpaceView.setMaxY(spaceView.getY() - this._splitSpace);
                    splitView.setX(0);
                    splitView.setY(preSpaceView.getY() + this._splitSpace);
                    splitView.setWidth(width);
                    splitView.setHeight(spaceView.getY() - preSpaceView.getY() - this._splitSpace);
                }
            }
        }
    }

    function paintSplitSpaceViews (sender, dc, zone) {
        var len = this._splitSpaceViews.length;
        if(len > 0){
            dc.beginPath();
            for(var i = 0; i < len; ++i){
                var spaceView = this._splitSpaceViews[i];
                dc.fillRect(spaceView.getX(), spaceView.getY(), spaceView.getWidth(), spaceView.getHeight());
            }
            dc.setFillStyle(hy.gui.colors.GRAYLEVEL1);
            dc.fill();
        }
    }

    hy.gui = hy.gui || {};
    hy.gui.SplitView = hy.extend(hy.gui.View);
    hy.gui.SplitView.prototype.defaultSplitSpace = 4;
    hy.gui.SplitView.prototype.defaultAdjustEnable = true;
    hy.gui.SplitView.prototype.defaultSplitDirection = 0;
    hy.gui.SplitView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._splitViews = hy.util.dataType.isUndefined(config.splitViews) ? null : config.splitViews;
        this._splitSpace = hy.util.dataType.isUndefined(config.splitSpace) ? this.defaultSplitSpace : config.splitSpace;
        this._splitDirection = hy.util.dataType.isUndefined(config.splitDirection) ? this.defaultSplitDirection : config.splitDirection;
        this._adjustEnable = hy.util.dataType.isUndefined(config.adjustEnable) ? this.defaultAdjustEnable : config.adjustEnable;
        this._autoAdjustViewIndex = hy.util.dataType.isUndefined(config.autoAdjustViewIndex) ? -1 : config.autoAdjustViewIndex;
        this._splitSpaceViews = [];
        this.__needAutoAdjustFlag = false;
        this.addObserver(hy.event.name.WIDTHCHG, this, resizeSplitViewWidth, 0);
        this.addObserver(hy.event.name.HEIGHTCHG, this, resizeSplitViewHeight, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutSplitViews, 0);
        //this.addObserver(hy.event.name.PAINT, this, this._paintSplitSpaceViews, 0);
    }
    hy.gui.SplitView.prototype.sync = function () {
        this.superCall("sync", null);
        syncSplitSpaceViews.call(this);
    }

})(hy, window, document);