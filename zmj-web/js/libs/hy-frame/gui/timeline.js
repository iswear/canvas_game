var hy = hy || {};

(function (hy, win, doc) {

    function sortKeyFrames (keyFrames) {
        for (var i = 1, len = this._keyFrames.length; i < len; ++i) {
            for (var j = i - 1; j >= 0; --j) {
                if (this._keyFrames[j].time > this._keyFrames[j + 1].time) {
                    var tempFrame = this._keyFrames[i];
                    this._keyFrames[j] = this._keyFrames[j + 1];
                    this._keyFrames[j + 1] = tempFrame;
                } else {
                    break;
                }
            }
        }
        return keyFrames;
    }

    function paintTimeline (sender, dc, zone) {
        dc.setStrokeStyle(hy.gui.colors.DGRAY);
        dc.setLineWidth(1);
        dc.beginPath();
        var width = zone.width;
        var height = zone.height;
        var frameNum = this._duration * 20;
        for (var i = 0, x = zone.minX + 0.5, rightx = zone.maxX; i < frameNum && x < rightx; ++i) {
            dc.moveTo(x, 0);
            dc.lineTo(x, height);
            x += 8;
        }
        dc.stroke();
        dc.setFillStyle(hy.gui.colors.RED);
        if (this._selectedFrame >= 0) {
            var selRectX = this._selectedFrame * 8 + zone.minX;
            if (selRectX < width) {
                dc.fillRect(selRectX + 1, 0, 7, height);
            }
        }
        if (this._keyFrames && this._keyFrames.length > 0) {
            dc.setStrokeStyle(hy.gui.colors.PUREBLACK);
            dc.beginPath();
            for (var i = this._keyFrames.length - 1; i >= 1; --i) {
                if (this._keyFrames[i].tween) {
                    var preTime = this._keyFrames[i - 1].time;
                    var curTime = this._keyFrames[i].time;
                    var preX = preTime * 160 + 8 + zone.minX;
                    var curX = curTime * 160 + zone.minX;
                    var lineY = height - 3.5 + zone.minY;
                    dc.moveTo(preX + 1, lineY - 1);
                    dc.lineTo(curX - 1, lineY - 1);
                    dc.lineTo(curX - 5, lineY);
                    dc.moveTo(curX - 1, lineY - 1);
                    dc.lineTo(curX - 5, lineY - 2);
                }
            }
            dc.stroke();
            dc.setFillStyle(hy.gui.colors.PUREBLACK);
            dc.beginPath();
            var rectY = height - 7;
            var rectOffset = 2;
            for (var i = this._keyFrames.length - 1; i >= 0; --i) {
                var curTime = this._keyFrames[i].time + zone.minX;
                var curX = curTime * 160 + rectOffset + zone.minY;
                dc.rect(curX, rectY, 5, 5);
            }
            dc.fill();
        }
    }

    function mousedownTimeline (sender, e) {
        var localPoint = this.transPointFromAncestorNode(e.offsetLoc, null);
        var clipZone = this.getClipZone();
        if (localPoint.x - clipZone.minX < 160 * this._duration) {
            this.setSelectedFrame(Math.floor((localPoint.x - clipZone.minX) / 8));
        }
    }

    hy.gui.Timeline = hy.extend(hy.gui.View);
    hy.gui.Timeline.prototype.defaultHeight = 20;
    hy.gui.Timeline.prototype.defaultDuration = 3;
    hy.gui.Timeline.prototype.defaultClipEnable = false;
    hy.gui.Timeline.prototype.init = function (config) {
        this.super("init", [config]);
        this._duration = hy.util.dataType.isUndefined(config.duration) ? this.defaultDuration : config.duration;
        this._keyFrames = hy.util.dataType.isUndefined(config.keyFrames) ? [] : config.keyFrames;
        this._selectedFrame = -1;
        this.addObserver(hy.event.name.PAINT, this, paintTimeline, 0);
        this.addObserver(hy.event.name.MOUSEDOWN, this, mousedownTimeline, 0);
    }
    hy.gui.Timeline.prototype.setDuration = function (duration) {
        if (this._duration != duration) {
            this._duration = duration;
            this.refresh();
        }
    }
    hy.gui.Timeline.prototype.getDuration = function () {
        return this._duration;
    }
    hy.gui.Timeline.prototype.setSelectedFrame = function (frame) {
        if (this._selectedFrame != frame) {
            this._selectedFrame = frame;
            this.refresh();
        }
    }
    hy.gui.Timeline.prototype.getSelectedFrame = function () {
        return this._selectedFrame;
    }
    hy.gui.Timeline.prototype.setKeyFrames = function (keyFrames) {
        if (this._keyFrames != keyFrames) {
            this._keyFrames = keyFrames;
            this.refresh();
        }
    }
    hy.gui.Timeline.prototype.getKeyFrames = function () {
        return this._keyFrames;
    }
    hy.gui.Timeline.prototype.addKeyFrameAt = function (index, param) {
        var time = index * 0.05;
        for (var i = 0, len = this._keyFrames.length; i < len; ++i) {
            if (time <= this._keyFrames[i].time) {
                if (time == this._keyFrames.time) {
                    this._keyFrames[i].param = param;
                } else {
                    var frame = {time: time, tween: this._keyFrames[i].tween, param: param};
                    this._keyFrames.splice(i, 0, frame);
                    this.refresh();
                }
                return;
            }
        }
        var frame = {time: time, tween: 0, param: param};
        this._keyFrames.push(frame);
        this.refresh();
    }
    hy.gui.Timeline.prototype.removeKeyFrameAt = function (index) {
        var time = index * 0.05;
        for (var i = 0, len = this._keyFrames.length; i < len; ++i) {
            if (time == this._keyFrames[i].time) {
                this._keyFrames.splice(i, 1);
                this.refresh();
                break;
            }
        }
    }
    hy.gui.Timeline.prototype.addTweenAt = function (index) {
        var time = index * 0.05;
        for (var i = 0, len = this._keyFrames.length; i < len; ++i) {
            if (time <= this._keyFrames[i].time) {
                if (!this._keyFrames[i].tween) {
                    this._keyFrames[i].tween = 1;
                    this.refresh();
                }
                return;
            }
        }
    }
    hy.gui.Timeline.prototype.removeTweenAt = function (index) {
        var time = index * 0.05;
        for (var i = 0, len = this._keyFrames.length; i < len; ++i) {
            if (time <= this._keyFrames[i].time) {
                if (this._keyFrames[i].tween) {
                    this._keyFrames[i].tween = 0;
                    this.refresh();
                }
                return;
            }
        }
    }

})(hy, window, document);