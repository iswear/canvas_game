var hy = hy || {};

(function (hy, win, doc) {

    function paintTimelineRule (sender, dc, zone) {
        /*宽度为8*/
        dc.setStrokeStyle(hy.gui.colors.DBLACK);
        dc.setFont("10px sans-serif");
        dc.beginPath();
        var frameNum = 20 * this._duration;
        var longY = zone.maxY - 16;
        var halfLongY = zone.maxY - 13;
        var shortY = zone.maxY - 10;
        var bottomY = zone.maxY - 2;
        var height = this.getHeight();
        for (var i = 0, x = zone.minX, rightx = zone.maxX; i < frameNum && x < rightx; ++i) {
            if (i % 20 == 0) {
                dc.moveTo(x + 0.5, longY);
                dc.lineTo(x + 0.5, bottomY);
                dc.strokeText(i / 20, x + 2, height - 11);
            } else if (i % 20 == 20 / 2) {
                dc.moveTo(x + 0.5, halfLongY);
                dc.lineTo(x + 0.5, bottomY);
            } else {
                dc.moveTo(x + 0.5, shortY);
                dc.lineTo(x + 0.5, bottomY);
            }
            x = x + 8;
        }
        dc.stroke();
    }

    hy.gui = hy.gui || {};
    hy.gui.TimelineRule = hy.extend(hy.gui.View);
    hy.gui.TimelineRule.prototype.defaultHeight = 20;
    hy.gui.TimelineRule.prototype.defaultDuration = 3;
    hy.gui.TimelineRule.prototype.defaultClipEnable = false;
    hy.gui.TimelineRule.prototype.init = function (config) {
        this.super("init", [config]);
        this._duration = hy.util.dataType.isUndefined(config.duration) ? this.defaultDuration : config.duration;
        this._selectedFrame = -1;
        this.addObserver(hy.event.name.PAINT, this, paintTimelineRule, 0);
    }
    hy.gui.TimelineRule.prototype.setDuration = function (duration) {
        if (this._duration != duration) {
            this._duration = duration;
            this.refresh();
        }
    }
    hy.gui.TimelineRule.prototype.getDuration = function () {
        return this._duration;
    }
    hy.gui.TimelineRule.prototype.setSelectedFrame = function (frame) {
        if (this._selectedFrame != frame) {
            this._selectedFrame = frame;
            this.refresh();
        }
    }
    hy.gui.TimelineRule.prototype.getSelectedFrame = function () {
        return this._selectedFrame;
    }

})(hy, window, document);