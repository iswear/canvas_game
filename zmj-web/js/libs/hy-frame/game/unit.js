var hy = hy || {};

(function (hy, win, doc) {

    function checkActionFrame (curframe, preframe) {
        if (preframe != null) {
            if (curframe.tween == undefined) {
                curframe.tween = 0;
            }
            if (curframe.param[hy.game.frame.param.X] == undefined) {
                curframe.param[hy.game.frame.param.X] = preframe.param[hy.game.frame.param.X];
            }
            if (curframe.param[hy.game.frame.param.Y] == undefined) {
                curframe.param[hy.game.frame.param.Y] = preframe.param[hy.game.frame.param.Y];
            }
            if (curframe.param[hy.game.frame.param.WIDTH] == undefined) {
                curframe.param[hy.game.frame.param.WIDTH] = preframe.param[hy.game.frame.param.WIDTH];
            }
            if (curframe.param[hy.game.frame.param.HEIGHT] == undefined) {
                curframe.param[hy.game.frame.param.HEIGHT] = preframe.param[hy.game.frame.param.HEIGHT];
            }
            if (curframe.param[hy.game.frame.param.SCALEX] == undefined) {
                curframe.param[hy.game.frame.param.SCALEX] = preframe.param[hy.game.frame.param.SCALEX];
            }
            if (curframe.param[hy.game.frame.param.SCALEY] == undefined) {
                curframe.param[hy.game.frame.param.SCALEY] = preframe.param[hy.game.frame.param.SCALEY];
            }
            if (curframe.param[hy.game.frame.param.ANCHORX] == undefined) {
                curframe.param[hy.game.frame.param.ANCHORX] = preframe.param[hy.game.frame.param.ANCHORX];
            }
            if (curframe.param[hy.game.frame.param.ANCHORY] == undefined) {
                curframe.param[hy.game.frame.param.ANCHORY] = preframe.param[hy.game.frame.param.ANCHORY];
            }
            if (curframe.param[hy.game.frame.param.ROTATEZ] == undefined) {
                curframe.param[hy.game.frame.param.ROTATEZ] = preframe.param[hy.game.frame.param.ROTATEZ];
            }
            if (curframe.param[hy.game.frame.param.ALPHA] == undefined) {
                curframe.param[hy.game.frame.param.ALPHA] = preframe.param[hy.game.frame.param.ALPHA];
            }
        } else {
            if (curframe.tween == undefined) {
                curframe.tween = 0;
            }
            if (curframe.param[hy.game.frame.param.X] == undefined) {
                curframe.param[hy.game.frame.param.X] = this.getX();
            }
            if (curframe.param[hy.game.frame.param.Y] == undefined) {
                curframe.param[hy.game.frame.param.Y] = this.getY();
            }
            if (curframe.param[hy.game.frame.param.WIDTH] == undefined) {
                curframe.param[hy.game.frame.param.WIDTH] = this.getWidth();
            }
            if (curframe.param[hy.game.frame.param.HEIGHT] == undefined) {
                curframe.param[hy.game.frame.param.HEIGHT] = this.getHeight();
            }
            if (curframe.param[hy.game.frame.param.SCALEX] == undefined) {
                curframe.param[hy.game.frame.param.SCALEX] = this.getScaleX();
            }
            if (curframe.param[hy.game.frame.param.SCALEY] == undefined) {
                curframe.param[hy.game.frame.param.SCALEY] = this.getScaleY();
            }
            if (curframe.param[hy.game.frame.param.ANCHORX] == undefined) {
                curframe.param[hy.game.frame.param.ANCHORX] = this.getAnchorX();
            }
            if (curframe.param[hy.game.frame.param.ANCHORY] == undefined) {
                curframe.param[hy.game.frame.param.ANCHORY] = this.getAnchorY();
            }
            if (curframe.param[hy.game.frame.param.ROTATEZ] == undefined) {
                curframe.param[hy.game.frame.param.ROTATEZ] = this.getRotateZ();
            }
            if (curframe.param[hy.game.frame.param.ALPHA] == undefined) {
                curframe.param[hy.game.frame.param.ALPHA] = this.getAlpha();
            }
        }
    }

    function runActionScheduler (frame) {
        this.setX(frame[hy.game.frame.param.X]);
        this.setY(frame[hy.game.frame.param.Y]);
        this.setWidth(frame[hy.game.frame.param.WIDTH]);
        this.setHeight(frame[hy.game.frame.param.HEIGHT]);
        this.setScaleX(frame[hy.game.frame.param.SCALEX]);
        this.setScaleY(frame[hy.game.frame.param.SCALEY]);
        this.setAnchorX(frame[hy.game.frame.param.ANCHORX]);
        this.setAnchorY(frame[hy.game.frame.param.ANCHORY]);
        this.setRotateZ(frame[hy.game.frame.param.ROTATEZ]);
        this.setAlpha(frame[hy.game.frame.param.ALPHA]);
    }

    function paintUnitImg (sender, dc, zone) {
        if (this._image) {
            var app = this.getApplication();
            if (app) {
                var loader = app.getFileLoader();
                if (typeof(this._image) == "string") {
                    var image = loader.getImage(this._image);
                    if (image) {
                        paintUnitImgSubFun.call(this, dc, zone, image, 0, 0, image.width, image.height);
                    } else {
                        loader.loadImageAsync(this._image, this, loadUnitImgCB);
                    }
                } else {
                    var image = loader.getImage(this._image.URL);
                    if (image) {
                        paintUnitImgSubFun.call(this, dc, zone, image, this._image.srcX, this._image.srcY, this._image.srcWidth, this._image.srcHeight);
                    } else {
                        loader.loadImageAsync(this._image, this, loadUnitImgCB);
                    }
                }
            }
        }
    }

    function paintUnitImgSubFun () {
        switch (this._mirror) {
            case hy.game.MIRROR_X:
            {
                dc.pushTransform(0, 0, -1, 1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX - this.getWidth(), zone.minY, this.getWidth(), this.getHeight());
                dc.popTransform();
                break;
            }
            case hy.game.MIRROR_Y:
            {
                dc.pushTransform(0, 0, 1, -1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX, zone.minY - this.getHeight(), this.getWidth(), this.getHeight());
                dc.popTransform();
                break;
            }
            case hy.game.MIRROR_BOTH:
            {
                dc.pushTransform(0, 0, -1, -1, 0, false);
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX - this.getWidth(), zone.minY - this.getHeight(), this.getWidth(), this.getHeight());
                dc.popTransform();
                break;
            }
            default :
            {
                dc.drawImageExt(image, srcX, srcY, srcWidth, srcHeight, zone.minX, zone.minY, this.getWidth(), this.getHeight());
                break;
            }
        }
    }

    function loadUnitImgCB (url, success) {
        if (success) {
            this.refresh();
        } else {
            this._image = null;
        }
    }

    hy.game = hy.game || {};
    hy.game.Unit = hy.extend(hy.RichNode);
    hy.game.Unit.prototype.defaultAnchorX = 0.5;
    hy.game.Unit.prototype.defaultAnchorY = 0.5;
    hy.game.Unit.prototype.defaultName = "unit";
    hy.game.Unit.prototype.init = function (config) {
        this.super("init", [config]);
        this._name = hy.util.dataType.isUndefined(config.name) ? this.defaultName : config.name;
        this._image = hy.util.dataType.isUndefined(config.image) ? null : config.image;
        this._mirror = hy.util.dataType.isUndefined(config.mirror) ? hy.game.MIRROR_NONE : config.mirror;
        this._actionFrames = hy.util.dataType.isUndefined(config.actionFrames) ? {} : config.actionFrames;
        this._childUnitsLayer = hy.util.dataType.isUndefined(config.childUnitsLayer) ? 0 : config.childUnitsLayer;
        this.__runningAction = null;
        this.__compiledActions = {};
        this.addObserver(hy.event.name.PAINT, this, paintUnitImg, 0);
    }
    hy.game.Unit.prototype.setName = function (name) {
        this._name = name;
    }
    hy.game.Unit.prototype.getName = function () {
        return this._name;
    }
    hy.game.Unit.prototype.setImage = function (image) {
        if (this._image != image) {
            this._image = image;
            this.refresh();
        }
    }
    hy.game.Unit.prototype.getImage = function () {
        return this._image;
    }
    hy.game.Unit.prototype.renameAction = function (oldName, newName, childrename) {
        this._actionFrames[newName] = this._actionFrames[oldName];
        this.__compiledActions[newName] = this.__compiledActions[oldName];
        delete this._actionFrames[oldName];
        delete this.__compiledActions[oldName];
        if (childrename) {
            var childUnits = this.getChildUnits();
            if (childUnits) {
                for (var i = 0, len = childUnits.length; i < len; ++i) {
                    childUnits[i].renameActionFrames(oldName, newName, childrename);
                }
            }
        }
    }
    hy.game.Unit.prototype.removeAction = function (name, childremove) {
        delete this._actionFrames[name];
        delete this.__compiledActions[name];
        if (childremove) {
            var childUnits = this.getChildUnits();
            if (childUnits) {
                for (var i = 0, len = childUnits.length; i < len; ++i) {
                    childUnits[i].removeAction(name, childremove);
                }
            }
        }
    }
    hy.game.Unit.prototype.setActionFramesOfName = function (name, frames) {
        this._actionFrames[name] = frames;
        delete this.__compiledActions[name];
    }
    hy.game.Unit.prototype.getActionFramesOfName = function (name) {
        if (!this._actionFrames[name]) {
            this._actionFrames[name] = [];
        }
        return this._actionFrames[name];
    }


    hy.game.Unit.prototype.addChildUnit = function (unit) {
        this.addChildNodeAtLayer(unit, this._childUnitsLayer);
    }
    hy.game.Unit.prototype.addChildUnitAt = function (unit, unitIndex) {
        this.addChildNodeAtLocation(unit, this._childUnitsLayer, unitIndex);
    }
    hy.game.Unit.prototype.getChildUnits = function () {
        return this.getLayerAt(this._childUnitsLayer);
    }
    hy.game.Unit.prototype.getChildUnitAt = function (unitIndex) {
        return this.getChildNodeAt(this._childUnitsLayer, unitIndex);
    }
    hy.game.Unit.prototype.removeChildUnit = function (unit, clean) {
        this.removeChildNodeAtLayer(this._childUnitsLayer, unit, clean);
    }
    hy.game.Unit.prototype.removeChildUnitAt = function (unitIndex, clean) {
        this.removeChildNodeAtLocation(this._childUnitsLayer, unitIndex, clean);
    }
    hy.game.Unit.prototype.getUnitIndexInParent = function () {
        var parent = this.getParent();
        return parent.getChildNodeIndexAtLayer(this, this._childUnitsLayer);
    }
    hy.game.Unit.prototype.runActionOfName = function (name, loop, target, callback, childrun) {
        this.stopRuningActions(true);
        var action = this.__compiledActions[name];
        if (!action) {
            action = this.compileActionOfName(name);
            this.__compiledActions[name] = action;
        }
        if (action) {
            this.__runningAction = name;
            this.runAction(action, target, callback, loop);
        }
        if (childrun) {
            var childUnits = this.getChildUnits();
            if (childUnits) {
                for (var i = 0, len = childUnits.length; i < len; ++i) {
                    childUnits[i].runActionOfName(name, loop, target, callback, childrun);
                }
            }
        }
    }
    hy.game.Unit.prototype.stopRuningActions = function (childstop) {
        if (this.__runningAction != null) {
            var action = this.__compiledActions[this.__runningAction];
            this.stopAction(action);
            this.__runningAction = null;
        }
        if (childstop) {
            var childUnits = this.getChildUnits();
            if (childUnits) {
                for (var i = 0, len = childUnits.length; i < len; ++i) {
                    childUnits[i].stopRuningActions(childstop);
                }
            }
        }
    }
    hy.game.Unit.prototype.compileActionOfName = function (name) {
        var frames = this.getActionFramesOfName(name);
        if (frames != null) {
            var len = frames.length;
            var syncAcArr = [];
            for (var i = 0; i < len; ++i) {
                var AsyncAcArr = [];
                var curframe = frames[i];
                if (i == 0) {
                    checkActionFrame(null, curframe);
                    AsyncAcArr.push(new hy.action.Scheduler({
                        interval: curframe.time * 1000,
                        repeats: 1,
                        target: this,
                        callBack: runActionScheduler,
                        param: curframe.param
                    }));
                } else {
                    var preframe = frames[i - 1];
                    checkActionFrame(preframe, curframe);
                    var deltaParam, deltaTime = curframe.time - preframe.time;
                    if (curframe.tween > 0) {
                        if (curframe.param[hy.game.frame.param.X] != preframe.param[hy.game.frame.param.X]) {
                            deltaParam = curframe.param[hy.game.frame.param.X] - preframe.param[hy.game.frame.param.X];
                            AsyncAcArr.push(new hy.action.MoveX({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.Y] != preframe.param[hy.game.frame.param.Y]) {
                            deltaParam = curframe.param[hy.game.frame.param.Y] - preframe.param[hy.game.frame.param.Y];
                            AsyncAcArr.push(new hy.action.MoveY({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.WIDTH] != preframe.param[hy.game.frame.param.WIDTH]) {
                            deltaParam = curframe.param[hy.game.frame.param.WIDTH] - preframe.param[hy.game.frame.param.WIDTH];
                            AsyncAcArr.push(new hy.action.ResizeWidth({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.HEIGHT] != preframe.param[hy.game.frame.param.HEIGHT]) {
                            deltaParam = curframe.param[hy.game.frame.param.HEIGHT] - preframe.param[hy.game.frame.param.HEIGHT];
                            AsyncAcArr.push(new hy.action.ResizeHeight({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.SCALEX] != preframe.param[hy.game.frame.param.SCALEX]) {
                            deltaParam = curframe.param[hy.game.frame.param.SCALEX] - preframe.param[hy.game.frame.param.SCALEX];
                            AsyncAcArr.push(new hy.action.ScaleX({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.SCALEY] != preframe.param[hy.game.frame.param.SCALEY]) {
                            deltaParam = curframe.param[hy.game.frame.param.SCALEY] - preframe.param[hy.game.frame.param.SCALEY];
                            AsyncAcArr.push(new hy.action.ScaleY({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.ANCHORX] != preframe.param[hy.game.frame.param.ANCHORX]) {
                            deltaParam = curframe.param[hy.game.frame.param.ANCHORX] - preframe.param[hy.game.frame.param.ANCHORX];
                            AsyncAcArr.push(new hy.action.MoveAnchorX({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.action.MoveAnchorY] != preframe.param[hy.action.MoveAnchorY]) {
                            deltaParam = curframe.param[hy.action.MoveAnchorY] - preframe.param[hy.action.MoveAnchorY];
                            AsyncAcArr.push(new hy.action.MoveAnchorY({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.ROTATEZ] != preframe.param[hy.game.frame.param.ROTATEZ]) {
                            deltaParam = curframe.param[hy.game.frame.param.ROTATEZ] - preframe.param[hy.game.frame.param.ROTATEZ];
                            AsyncAcArr.push(new hy.action.RotateZ({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                        if (curframe.param[hy.game.frame.param.ALPHA] != preframe.param[hy.game.frame.param.ALPHA]) {
                            deltaParam = curframe.param[hy.game.frame.param.ALPHA] - preframe.param[hy.game.frame.param.ALPHA];
                            AsyncAcArr.push(new hy.action.Fade({
                                targetOffset: deltaParam,
                                offsetFun: (deltaParam / deltaTime * 0.001) + "*t"
                            }));
                        }
                    } else {
                        AsyncAcArr.push(new hy.action.Scheduler({
                            interval: deltaTime * 1000,
                            repeats: 1,
                            target: this,
                            callBack: runActionScheduler,
                            param: curframe.param
                        }));
                    }
                }
                syncAcArr.push(new hy.action.AsyncQueue({actions: AsyncAcArr}))
            }
            var resultAction = new hy.action.SyncQueue({actions: syncAcArr});
            this.__compiledActions[name] = new hy.action.SyncQueue({actions: syncAcArr});
            return resultAction;
        }
    }

})(hy, window, document);