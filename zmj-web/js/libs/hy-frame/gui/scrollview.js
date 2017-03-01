var hy = hy || {};

(function (hy, win, doc) {

    function layoutScrollView (sender, zone) {
        this._horScrollBar.setX(0);
        this._horScrollBar.setY(this.getHeight() - this._horScrollBar.getHeight());
        this._horScrollBar.setWidth(this.getWidth());
        this._verScrollBar.setX(this.getWidth() - this._verScrollBar.getWidth());
        this._verScrollBar.setY(0);
        this._verScrollBar.setHeight(this.getHeight());
        var width = zone.width;
        var height = zone.height;
        var offsetX = this.getContentOffsetX();
        var offsetY = this.getContentOffsetY();
        var contentWidth = this.getContentWidth();
        var contentHeight = this.getContentHeight();
        if (this._scrollBarVisible) {
            if (contentWidth <= width && contentHeight <= height) {
                this._horScrollBar.setPaddingRight(0);
                this._verScrollBar.setPaddingBottom(0);
                this._horScrollBar.setVisible(false);
                this._verScrollBar.setVisible(false);
                this._contentView.setWidth(width);
                this._contentView.setHeight(height);
            } else if (contentWidth > width && contentHeight <= height - this._horScrollBar.getHeight()) {
                this._horScrollBar.setPaddingRight(0);
                this._verScrollBar.setPaddingBottom(0);
                this._horScrollBar.setVisible(true);
                this._verScrollBar.setVisible(false);
                this._contentView.setWidth(contentWidth);
                this._contentView.setHeight(height - this._horScrollBar.getHeight());
            } else if (contentHeight > height && contentWidth <= width - this._verScrollBar.getWidth()) {
                this._horScrollBar.setPaddingRight(0);
                this._verScrollBar.setPaddingBottom(0);
                this._horScrollBar.setVisible(false);
                this._verScrollBar.setVisible(true);
                this._contentView.setWidth(width - this._verScrollBar.getWidth());
                this._contentView.setHeight(contentHeight);
            } else {
                this._horScrollBar.setPaddingRight(this._verScrollBar.getWidth());
                this._verScrollBar.setPaddingBottom(this._horScrollBar.getHeight());
                this._horScrollBar.setVisible(true);
                this._verScrollBar.setVisible(true);
                this._contentView.setWidth(width - this._verScrollBar.getWidth());
                this._contentView.setHeight(height - this._horScrollBar.getHeight());
            }
        } else {
            this._horScrollBar.setVisible(false);
            this._verScrollBar.setVisible(false);
            this._contentView.setWidth(width > contentWidth ? width : contentWidth);
            this._contentView.setHeight(height > contentHeight ? height : contentHeight);
        }
        if (width > contentWidth) {
            this.setContentOffsetX(offsetX > 0 ? 0 : offsetX);
        }
        if (height > contentHeight) {
            this.setContentOffsetY(offsetY > 0 ? 0 : offsetY);
        }
        syncLocalScrollToHorBar.call(this);
        syncLocalScrollToVerBar.call(this);
    }

    function wheelScrollView (sender, e) {
        var height = this.getHeight();
        var contentHeight = this.getContentHeight();
        if (contentHeight > height) {
            if (e.wheelDelta > 0) {
                var newOffset = this.getContentOffsetY() - this._wheelStep;
                if (newOffset > 0) {
                    this.setContentOffsetY(newOffset);
                } else {
                    this.setContentOffsetY(0);
                }
            } else {
                var newOffset = this.getContentOffsetY() + this._wheelStep;
                var overallHeight = this.getContentHeight();
                var visibleHeight = this.getHeight();
                if (this._horScrollBar.getVisible()) {
                    visibleHeight -= this._horScrollBar.getHeight();
                }
                if (newOffset + visibleHeight > overallHeight) {
                    this.setContentOffsetY(overallHeight - visibleHeight);
                } else {
                    this.setContentOffsetY(newOffset);
                }
            }
        }
        e.stopDispatch();
    }

    function syncLocalScrollToHorBar (sender) {
        var overallWidth = this.getContentWidth();
        var scrolledWidth = this.getContentOffsetX();
        var visibleWidth = this.getWidth();
        if (this._verScrollBar.getVisible()) {
            visibleWidth -= this._verScrollBar.getWidth();
        }
        this._horScrollBar.setScrollRate(scrolledWidth, visibleWidth, overallWidth);
    }

    function syncLocalScrollToVerBar (sender) {
        var overallHeight = this.getContentHeight();
        var scrolledHeight = this.getContentOffsetY();
        var visibleHeight = this.getHeight();
        if (this._horScrollBar.getVisible()) {
            visibleHeight -= this._horScrollBar.getHeight();
        }
        this._verScrollBar.setScrollRate(scrolledHeight, visibleHeight, overallHeight);
    }

    function syncLocalScrollFromHorBar (sender, e) {
        var scrolledRate = this._horScrollBar.getScrollRate();
        this._contentView.setX(-scrolledRate.scrolledRate * this._contentView.getWidth());
    }

    function syncLocalScrollFromVerBar (sender, e) {
        var scrolledRate = this._verScrollBar.getScrollRate();
        this._contentView.setY(-scrolledRate.scrolledRate * this._contentView.getHeight());
    }


    hy.gui = hy.gui || {};
    hy.gui.ScrollView = hy.extend(hy.gui.View);
    hy.gui.ScrollView.prototype.defaultResponseEnable = true;
    hy.gui.ScrollView.prototype.defaultWheelStep = 20;
    hy.gui.ScrollView.prototype.defaultScrollBarVisible = true;
    hy.gui.ScrollView.prototype.init = function (config) {
        this.super("init", [config]);
        this._wheelStep = hy.util.dataType.isUndefined(config.wheelStep) ? this.defaultWheelStep : config.wheelStep;
        this._scrollBarVisible = hy.util.dataType.isUndefined(config.scrollBarVisible) ? this.defaultScrollBarVisible : config.scrollBarVisible;

        this._contentView = hy.util.dataType.isUndefined(config.contentView) ? (new hy.gui.View({mouseEnable: false})) : config.contentView;
        this._horScrollBar = new hy.gui.ScrollBar({
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 1,
            paddingBottom: 1,
            height: 10,
            scrollDirection: 0
        });
        this._verScrollBar = new hy.gui.ScrollBar({
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 0,
            paddingBottom: 0,
            width: 10,
            scrollDirection: 1
        });
        this.addChildNodeAtLayer(this._contentView, 0);
        this.addChildNodeAtLayer(this._horScrollBar, 1);
        this.addChildNodeAtLayer(this._verScrollBar, 1);

        this._horScrollBar.addObserver(hy.event.name.SCROLLED, this, syncLocalScrollFromHorBar, 0);
        this._verScrollBar.addObserver(hy.event.name.SCROLLED, this, syncLocalScrollFromVerBar, 0);
        this._contentView.addObserver(hy.event.name.XCHG, this, syncLocalScrollToHorBar, 0);
        this._contentView.addObserver(hy.event.name.YCHG, this, syncLocalScrollToVerBar, 0);
        this._contentView.addObserver(hy.event.name.WIDTHCHG, this, this.needLayoutSubNodes, 0);
        this._contentView.addObserver(hy.event.name.HEIGHTCHG, this, this.needLayoutSubNodes, 0);

        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutScrollView, 0);
        this.addObserver(hy.event.name.MOUSEWHEEL, this, wheelScrollView, 0);
    }
    hy.gui.ScrollView.prototype.setContentOffsetX = function (offsetX) {
        this._contentView.setX(-offsetX);
    }
    hy.gui.ScrollView.prototype.getContentOffsetX = function () {
        return -this._contentView.getX();
    }
    hy.gui.ScrollView.prototype.setContentOffsetY = function (offsetY) {
        this._contentView.setY(-offsetY);
    }
    hy.gui.ScrollView.prototype.getContentOffsetY = function () {
        return -this._contentView.getY();
    }
    hy.gui.ScrollView.prototype.setContentWidth = function (width) {
        this._contentView.setMinWidth(width);
        this.needLayoutSubNodes();
    }
    hy.gui.ScrollView.prototype.getContentWidth = function () {
        return this._contentView.getMinWidth();
    }
    hy.gui.ScrollView.prototype.setContentHeight = function (height) {
        this._contentView.setMinHeight(height);
        this.needLayoutSubNodes();
    }
    hy.gui.ScrollView.prototype.getContentHeight = function () {
        return this._contentView.getMinHeight();
    }
    hy.gui.ScrollView.prototype.getContentView = function () {
        return this._contentView;
    }

})(hy, window, document);