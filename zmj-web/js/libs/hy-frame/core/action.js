var hy = hy || {};

(function (hy, win, doc) {

    hy.action = hy.action || {};
    hy.action.Manager = hy.extend(hy.Object);
    hy.action.Manager.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._actionBinders = [];
        this._paused = false;
    }
    hy.action.Manager.prototype.pause = function () {
        this._paused = true;
    }
    hy.action.Manager.prototype.resume = function () {
        this._paused = false;
    }
    hy.action.Manager.prototype.addActionBinder = function (sprite, action, target, callBack, loop) {
        var actionBinder = new hy.action.Binder({
            sprite: sprite,
            action: action,
            target: target,
            callBack: callBack,
            loop: loop
        });
        this._actionBinders.push(actionBinder);
    }
    hy.action.Manager.prototype.removeAllActions = function () {
        for (var i = 0, len = this._actionBinders.length; i < len; ++i) {
            this._actionBinders[i].setRemove(true);
        }
    }
    hy.action.Manager.prototype.removeActionOfSprite = function (sprite, action) {
        for (var i = 0, len = this._actionBinders.length; i < len; ++i) {
            var actionBinder = this._actionBinders[i];
            if (actionBinder.getSprite() == sprite && actionBinder.getAction() == action) {
                actionBinder.setRemove(true);
            }
        }
    }
    hy.action.Manager.prototype.removeAllActionsOfSprite = function (sprite) {
        for (var i = 0, len = this._actionBinders.length; i < len; ++i) {
            var actionBinder = this._actionBinders[i];
            if (actionBinder.getSprite() == sprite) {
                actionBinder.setRemove(true);
            }
        }
    }
    hy.action.Manager.prototype.runActions = function (deltaTime) {
        if (!this._paused) {
            for (var i = 0, len = this._actionBinders.length; i < len; ++i) {
                var actionBinder = this._actionBinders[i];
                if (actionBinder.getRemove()) {
                    this._actionBinders.splice(i, 1);
                    actionBinder.purge();
                    --i;
                    --len;
                } else {
                    var result = actionBinder.execute(deltaTime);
                    if (result && !actionBinder.getLoop()) {
                        actionBinder.setRemove(true);
                    }
                }
            }
        }
    }
    hy.action.Manager.prototype.purge = function () {
        this._actionBinders = null;
        this.superCall("purge", null);
    }

    hy.action.Binder = hy.extend(hy.Object);
    hy.action.Binder.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._sprite = hy.util.dataType.isUndefined(config.sprite) ? null : config.sprite;
        this._action = hy.util.dataType.isUndefined(config.action) ? null : config.action;
        this._target = hy.util.dataType.isUndefined(config.target) ? null : config.target;
        this._callBack = hy.util.dataType.isUndefined(config.callBack) ? null : config.callBack;
        this._loop = hy.util.dataType.isUndefined(config.loop) ? false : config.loop;
        this._remove = false;
        this._runParams = {};
    }
    hy.action.Binder.prototype.setSprite = function (sprite) {
        this._sprite = sprite;
    }
    hy.action.Binder.prototype.getSprite = function () {
        return this._sprite;
    }
    hy.action.Binder.prototype.setAction = function (action) {
        this._action = action;
    }
    hy.action.Binder.prototype.getAction = function () {
        return this._action;
    }
    hy.action.Binder.prototype.getTarget = function () {
        return this._target;
    }
    hy.action.Binder.prototype.setTarget = function (target) {
        this._target = target;
    }
    hy.action.Binder.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
    }
    hy.action.Binder.prototype.getCallBack = function () {
        return this._callBack;
    }
    hy.action.Binder.prototype.setLoop = function (loop) {
        this._loop = loop;
    }
    hy.action.Binder.prototype.getLoop = function () {
        return this._loop;
    }
    hy.action.Binder.prototype.setRemove = function (remove) {
        this._remove = remove;
    }
    hy.action.Binder.prototype.getRemove = function () {
        return this._remove;
    }
    hy.action.Binder.prototype.setRunParams = function (key, value) {
        this._runParams[key] = value;
    }
    hy.action.Binder.prototype.getRunParams = function (key) {
        return this._runParams[key];
    }
    hy.action.Binder.prototype.delRunParams = function (key) {
        delete this._runParams[key];
    }
    hy.action.Binder.prototype.execute = function (deltaTime) {
        var result = this._action.execute(this, deltaTime);
        if (this._callBack != null) {
            this._callBack.apply(this._target, [this._action, result]);
        }
        return result;
    }
    hy.action.Binder.prototype.purge = function () {
        this._sprite = null;
        this._action = null;
        this._target = null;
        this._callBack = null;
        this._runParams = null;
        this.superCall("purge", null);
    }


    hy.action.Scheduler = hy.extend(hy.Object);
    hy.action.Scheduler.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._target = hy.util.dataType.isUndefined(config.target) ? null : config.target;
        this._callBack = hy.util.dataType.isUndefined(config.callBack) ? null : config.callBack;
        this._interval = hy.util.dataType.isUndefined(config.interval) ? 0 : config.interval;
        this._repeats = hy.util.dataType.isUndefined(config.repeats) ? 0 : config.repeats;
        this._param = hy.util.dataType.isUndefined(config.param) ? null : config.param;
    };
    hy.action.Scheduler.prototype.setTarget = function (target) {
        this._target = target;
    }
    hy.action.Scheduler.prototype.getTarget = function () {
        return this._target;
    }
    hy.action.Scheduler.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
    }
    hy.action.Scheduler.prototype.getCallBack = function () {
        return this._callBack;
    }
    hy.action.Scheduler.prototype.setInterval = function (interval) {
        this._interval = interval;
    }
    hy.action.Scheduler.prototype.getInterval = function () {
        return this._interval;
    }
    hy.action.Scheduler.prototype.setRepeats = function (repeats) {
        this._repeats = repeats;
    }
    hy.action.Scheduler.prototype.getRepeats = function () {
        return this._repeats;
    }
    hy.action.Scheduler.prototype.setParam = function (param) {
        this._param = param;
    }
    hy.action.Scheduler.prototype.getParam = function () {
        return this._param;
    }
    hy.action.Scheduler.prototype.execute = function (actionBinder, deltaTime) {
        if (this._repeats == 0) {
            return true;
        } else {
            var inited = actionBinder.getRunParams("inited");
            var repeats, sumTime;
            if (inited) {
                repeats = actionBinder.getRunParams("repeats");
                sumTime = actionBinder.getRunParams("sumtime");
            } else {
                repeats = 0;
                sumTime = 0;
                actionBinder.setRunParams("inited", true);
                actionBinder.setRunParams("repeats", 0);
                actionBinder.setRunParams("sumtime", 0);
            }
            sumTime += deltaTime;
            if (sumTime >= this._interval) {
                this._callBack.apply(this._target, [this._param]);
                sumTime -= this._interval;
                repeats += 1;
            }
            if (repeats >= this._repeats) {
                actionBinder.setRunParams("inited", false);
                return true;
            } else {
                actionBinder.setRunParams("repeats", repeats);
                actionBinder.setRunParams("sumtime", sumTime);
                return false;
            }
        }
    }
    hy.action.Scheduler.prototype.purge = function () {
        this._target = null;
        this._callBack = null;
        this._param = null;
        this.superCall("purge", null);
    }

    hy.action.Base = hy.extend(hy.Object);
    hy.action.Base.prototype.execute = function () {
    }

    hy.action.Animation = hy.extend(hy.action.Base)
    hy.action.Animation.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._targetOffset = hy.util.dataType.isUndefined(config.targetOffset) ? 0 : config.targetOffset;
        this._offsetFun = eval("(function(t){ return " + (hy.util.dataType.isUndefined(config.offsetFun) ? "0" : config.offsetFun) + "; })");
    };
    hy.action.Animation.prototype.setTargetOffset = function (targetOffset) {
        this._targetOffset = targetOffset;
    }
    hy.action.Animation.prototype.getTargetOffset = function () {
        return this._targetOffset;
    }
    hy.action.Animation.prototype.setOffsetFun = function (offsetFun) {
        this._offsetFun = eval("(function(t){ return " + offsetFun + "; })");
    }
    hy.action.Animation.prototype.getOffsetFun = function () {
        return this._offsetFun;
    }
    hy.action.Animation.prototype.purge = function () {
        this._offsetFun = null;
        this.superCall("purge", null);
    }

    hy.action.MoveX = hy.extend(hy.action.Animation);
    hy.action.MoveX.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetX, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetX = actionBinder.getRunParams("offsetx");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetX = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetx", offsetX);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetX = this._offsetFun(sumTime);
        if ((offsetX - this._targetOffset) * (newOffsetX - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setX(sprite.getX() + this._targetOffset - offsetX);
            return true;
        } else {
            actionBinder.setRunParams("offsetx", newOffsetX);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setX(sprite.getX() + newOffsetX - offsetX);
            return false;
        }
    }

    hy.action.MoveY = hy.extend(hy.action.Animation);
    hy.action.MoveY.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetY, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetY = actionBinder.getRunParams("offsety");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetY = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsety", offsetY);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetY = this._offsetFun(sumTime);
        if ((offsetY - this._targetOffset) * (newOffsetY - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setY(sprite.getY() + this._targetOffset - offsetY);
            return true;
        } else {
            actionBinder.setRunParams("offsety", newOffsetY);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setY(sprite.getY() + newOffsetY - offsetY);
            return false;
        }
    }

    hy.action.ResizeWidth = hy.extend(hy.action.Animation);
    hy.action.ResizeWidth.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetWidth, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetWidth = actionBinder.getRunParams("offsetwidth");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetWidth = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetwidth", offsetWidth);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetWidth = this._offsetFun(sumTime);
        if ((offsetWidth - this._targetOffset) * (newOffsetWidth - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setWidth(sprite.getWidth() + this._targetOffset - offsetWidth);
            return true;
        } else {
            actionBinder.setRunParams("offsetwidth", newOffsetWidth);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setWidth(sprite.getWidth() + newOffsetWidth - offsetWidth);
            return false;
        }
    }

    hy.action.ResizeHeight = hy.extend(hy.action.Animation);
    hy.action.ResizeHeight.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetHeight, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetHeight = actionBinder.getRunParams("offsetheight");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetHeight = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetheight", offsetHeight);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetHeight = this._offsetFun(sumTime);
        if ((offsetHeight - this._targetOffset) * (newOffsetHeight - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setHeight(sprite.getHeight() + this._targetOffset - offsetHeight);
            return true;
        } else {
            actionBinder.setRunParams("offsetheight", newOffsetHeight);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setHeight(sprite.getHeight() + newOffsetHeight - offsetHeight);
            return false;
        }
    }

    hy.action.ScaleX = hy.extend(hy.action.Animation);
    hy.action.ScaleX.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetScaleX, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetScaleX = actionBinder.getRunParams("offsetscalex");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetScaleX = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetscalex", offsetScaleX);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetScaleX = this._offsetFun(sumTime);
        if ((offsetScaleX - this._targetOffset) * (newOffsetScaleX - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setScaleX(sprite.getScaleX() + this._targetOffset - offsetScaleX);
            return true;
        } else {
            actionBinder.setRunParams("offsetscalex", newOffsetScaleX);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setScaleX(sprite.getScaleX() + newOffsetScaleX - offsetScaleX);
            return false;
        }
    }

    hy.action.ScaleY = hy.extend(hy.action.Animation);
    hy.action.ScaleY.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetScaleY, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetScaleY = actionBinder.getRunParams("offsetscaley");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetScaleY = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetscaley", offsetScaleY);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetScaleY = this._offsetFun(sumTime);
        if ((offsetScaleY - this._targetOffset) * (newOffsetScaleY - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setScaleY(sprite.getScaleY() + this._targetOffset - offsetScaleY);
            return true;
        } else {
            actionBinder.setRunParams("offsetscaley", newOffsetScaleY);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setScaleY(sprite.getScaleY() + newOffsetScaleY - offsetScaleY);
            return false;
        }
    }

    hy.action.MoveAnchorX = hy.extend(hy.action.Animation);
    hy.action.MoveAnchorX.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetX, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetX = actionBinder.getRunParams("offsetx");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetX = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetx", offsetX);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetX = this._offsetFun(sumTime);
        if ((offsetX - this._targetOffset) * (newOffsetX - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setAnchorX(sprite.getAnchorX() + this._targetOffset - offsetX);
            return true;
        } else {
            actionBinder.setRunParams("offsetx", newOffsetX);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setAnchorX(sprite.getAnchorX() + newOffsetX - offsetX);
            return false;
        }
    }

    hy.action.MoveAnchorY = hy.extend(hy.action.Animation);
    hy.action.MoveAnchorY.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetY, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetY = actionBinder.getRunParams("offsety");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetY = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsety", offsetY);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetY = this._offsetFun(sumTime);
        if ((offsetY - this._targetOffset) * (newOffsetY - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setAnchorY(sprite.getAnchorY() + this._targetOffset - offsetY);
            return true;
        } else {
            actionBinder.setRunParams("offsety", newOffsetY);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setAnchorY(sprite.getAnchorY() + newOffsetY - offsetY);
            return false;
        }
    }

    hy.action.RotateZ = hy.extend(hy.action.Animation);
    hy.action.RotateZ.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetAngle, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetAngle = actionBinder.getRunParams("offsetangle");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetAngle = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetangle", offsetAngle);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetAngle = this._offsetFun(sumTime);
        if ((offsetAngle - this._targetOffset) * (newOffsetAngle - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setRotateZ(sprite.getRotateZ() + this._targetOffset - offsetAngle);
            return true;
        } else {
            actionBinder.setRunParams("offsetangle", newOffsetAngle);
            actionBinder.setRunParams("sumtime", sumTime);
            sprite.setRotateZ(sprite.getRotateZ() + newOffsetAngle - offsetAngle);
            return false;
        }
    }

    hy.action.Fade = hy.extend(hy.action.Animation);
    hy.action.Fade.prototype.execute = function (actionBinder, deltaTime) {
        var sprite = actionBinder.getSprite();
        var offsetAlpha, sumTime;
        var initFlag = actionBinder.getRunParams("inited");
        if (initFlag) {
            offsetAlpha = actionBinder.getRunParams("offsetalpha");
            sumTime = actionBinder.getRunParams("sumtime");
        } else {
            offsetAlpha = 0;
            sumTime = 0;
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("offsetalpha", offsetAlpha);
            actionBinder.setRunParams("sumtime", sumTime);
        }
        sumTime += deltaTime;
        var newOffsetAlpha = this._offsetFun(sumTime);
        if ((offsetAlpha - this._targetOffset) * (newOffsetAlpha - this._targetOffset) <= 0) {
            actionBinder.setRunParams("inited", false);
            sprite.setAlpha(sprite.getAlpha() + this._targetOffset - offsetAlpha);
            return true;
        } else {
            actionBinder.setRunParams("offsetAlpha", newOffsetAlpha);
            actionBinder.setRunParams("sumTime", sumTime);
            sprite.setAlpha(sprite.getAlpha() + newOffsetAlpha - offsetAlpha);
            return false;
        }
    }

    hy.action.Queue = hy.extend(hy.action.Base);
    hy.action.Queue.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._actions = hy.util.dataType.isUndefined(config.actions) ? [] : config.actions;
    }
    hy.action.Queue.prototype.setActions = function (actions) {
        this._actions = actions;
    }
    hy.action.Queue.prototype.getActions = function () {
        return this._actions;
    }

    hy.action.SyncQueue = hy.extend(hy.action.Queue);
    hy.action.SyncQueue.prototype.execute = function (actionBinder, deltaTime) {
        var initFlag = actionBinder.getRunParams("inited");
        var actionBinders;
        if (!initFlag) {
            actionBinders = [];
            var sprite = actionBinder.getSprite();
            var actions = this.getActions();
            for (var i = 0, actionNum = actions.length; i < actionNum; ++i) {
                actionBinders.push(new hy.action.Binder({sprite: sprite, action: actions[i]}));
            }
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("actionBinders", actionBinders);
        } else {
            actionBinders = actionBinder.getRunParams("actionBinders", actionBinders);
        }
        if (actionBinders.length == 0) {
            actionBinder.setRunParams("inited", false);
            return true;
        } else {
            var curactionBinder = actionBinders[0];
            if (curactionBinder.execute(deltaTime) == true) {
                actionBinders.splice(0, 1);
            }
            return false;
        }
    }

    hy.action.AsyncQueue = hy.extend(hy.action.Queue);
    hy.action.AsyncQueue.prototype.execute = function (actionBinder, deltaTime) {
        var initFlag = actionBinder.getRunParams("inited");
        var actionBinders;
        if (!initFlag) {
            actionBinders = [];
            var sprite = actionBinder.getSprite();
            var actions = this.getActions();
            for (var i = 0, actionNum = actions.length; i < actionNum; ++i) {
                actionBinders.push(new hy.action.Binder({sprite: sprite, action: actions[i]}));
            }
            actionBinder.setRunParams("inited", true);
            actionBinder.setRunParams("actionBinders", actionBinders);
        } else {
            actionBinders = actionBinder.getRunParams("actionBinders");
        }
        if (actionBinders.length == 0) {
            actionBinder.setRunParams("inited", false);
            return true;
        } else {
            var curactionBinder = null;
            for (var i = actionBinders.length - 1; i >= 0; --i) {
                curactionBinder = actionBinders[i];
                if (curactionBinder.execute(deltaTime)) {
                    actionBinders.splice(i, 1);
                }
            }
            return false;
        }
    }

})(hy, window, document);
