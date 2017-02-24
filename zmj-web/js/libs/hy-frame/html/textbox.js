var hy = hy || {};

(function (hy, win, doc) {

    hy.html = hy.html || {};
    hy.html.TextBox = hy.extend(hy.Object);
    hy.html.TextBox.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._inputNode = null;
        this._inputNodeVisible = true;
        this._isFocus = false;

        this._outerConEl = document.createElement("div");
        this._outerConEl.style.position = "absolute";
        this._outerConEl.style.display = "none";
        this._outerConEl.style.zIndex = "999";
        this._outerConEl.style.borderStyle = "solid";
        this._outerConEl.style.overflow = "hidden";

        this._innerConEl = document.createElement("div");
        this._innerConEl.style.overflow = "scroll";

        this._tableEl = document.createElement("div");
        this._tableEl.style.display = "table";
        this._tableEl.style.width = "100%";
        this._tableEl.style.height = "100%";

        this._inputEl = document.createElement("div");
        this._inputEl.style.display = "table-cell";
        this._inputEl.style.outline = "none";
        this._inputEl.setAttribute("contenteditable", "true");
        this._scrollBarWidth = 0;

        this._tableEl.appendChild(this._inputEl);
        this._innerConEl.appendChild(this._tableEl);
        this._outerConEl.appendChild(this._innerConEl);
        document.body.appendChild(this._outerConEl);

        if (hy.platform.isMobile()) {
            hy.event.addEventListener(this._inputEl, this, "touchstart", function (e) {
                e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, this, "touchmove", function (e) {
                e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, this, "touchend", function (e) {
                e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, this, "touchcancel", function (e) {
                e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
        } else {
            hy.event.addEventListener(this._inputEl, "keydown", this, function (e) {
                var e = event ? event : e;
                try {
                    if (this._inputNode.getTextLineNum() == 1 && e.keyCode == hy.event.key.ENTER) {
                        this.hideForNode(this._inputNode);
                    }
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "keypress", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "keyup", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "click", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "dblclick", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "mousedown", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "mousemove", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "mouseup", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "mousewheel", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "DOMMouseScroll", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "contextmenu", this, function (e) {
                var e = event ? event : e;
                try {
                    e.stopPropagation();
                } catch (err) {
                    e.cancelBubble = true;
                }
            });
            hy.event.addEventListener(this._inputEl, "focus", this, function (e) {
                this._isFocus = true;
            });
            hy.event.addEventListener(this._inputEl, "blur", this, function (e) {
                this._isFocus = false;
            });
        }
    }
    hy.html.TextBox.prototype.setValue = function (value) {
        this._inputEl.innerText = value;
    }
    hy.html.TextBox.prototype.getValue = function () {
        return this._inputEl.innerText;
    }
    hy.html.TextBox.prototype.getInputNode = function () {
        return this._inputNode;
    }
    hy.html.TextBox.prototype.isFocus = function () {
        return this._isFocus;
    }
    hy.html.TextBox.prototype.showForNode = function (node) {
        if (node && this._inputNode != node) {
            var width = node.getWidth() - node.getTextPaddingLeft() - node.getTextPaddingRight() - 2 * node.getBorderWidth();
            var height = node.getHeight() - node.getTextPaddingTop() - node.getTextPaddingBottom() - 2 * node.getBorderWidth();
            if (width > 0 && height > 0) {
                this.blurForNode(this._inputNode);
                var clipZone = node.getClipZone();
                var absPoint = node.transPointToAncestorNode({x: clipZone.minX, y: clipZone.minY}, null);
                /*位置*/
                var boxWidth = width + this._scrollBarWidth;
                var boxHeight = height + this._scrollBarWidth;
                this._outerConEl.style.top = absPoint.y + "px";
                this._outerConEl.style.left = absPoint.x + "px";
                this._outerConEl.style.width = width + "px";
                this._outerConEl.style.height = height + "px";

                this._innerConEl.style.width = boxWidth + "px";
                this._innerConEl.style.height = boxHeight + "px";
                /*空格处理*/
                if (node.getTextLineNum() == 1) {
                    this._inputEl.style.whiteSpace = "nowrap";
                } else {
                    this._inputEl.style.whiteSpace = "pre-wrap";
                }
                /*背景*/
                if (node.getPaintInheritValue("backgroundColor") && node.getTextLineNum() != 1) {
                    this._outerConEl.style.backgroundColor = node.getPaintInheritValue("backgroundColor");
                } else {
                    this._outerConEl.style.background = "transparent";
                }
                /*内边距边框*/
                if (node.getBorderColor() && node.getBorderWidth() > 0 && node.getTextLineNum() != 1) {
                    this._outerConEl.style.borderColor = node.getBorderColor();
                    this._outerConEl.style.borderWidth = node.getBorderWidth() + "px";
                    this._outerConEl.style.paddingLeft = node.getTextPaddingLeft() + "px";
                    this._outerConEl.style.paddingRight = node.getTextPaddingRight() + "px";
                    this._outerConEl.style.paddingTop = node.getTextPaddingTop() + "px";
                    this._outerConEl.style.paddingBottom = node.getTextPaddingBottom() + "px";
                } else {
                    this._outerConEl.style.borderColor = "transparent";
                    this._outerConEl.style.borderWidth = "0px";
                    this._outerConEl.style.paddingLeft = node.getTextPaddingLeft() + "px";
                    this._outerConEl.style.paddingRight = node.getTextPaddingRight() + "px";
                    this._outerConEl.style.paddingTop = node.getTextPaddingTop() + "px";
                    this._outerConEl.style.paddingBottom = node.getTextPaddingBottom() + "px";
                }
                /*圆角*/
                if (node.getCornorRadius() > 0) {
                    this._outerConEl.style.borderRadius = node.getCornorRadius() + "px";
                } else {
                    this._outerConEl.style.borderRadius = "0px";
                }
                /*字体*/
                this._inputEl.style.font = node.getTextFont();
                this._inputEl.style.color = node.getTextColor();
                var reg = /[1-9][0-9]*px/i;
                var fontSizeStr = node.getTextFont().match(reg);
                var fontSize = 12;
                if (fontSizeStr != null) {
                    fontSize = parseInt(fontSizeStr[0].substr(0, fontSizeStr[0].length - 2));
                }
                if (fontSize < node.getTextLineHeight()) {
                    this._inputEl.style.lineHeight = node.getTextLineHeight() + "px";
                } else {
                    this._inputEl.style.lineHeight = fontSize + "px";
                }
                /*文字对齐选项*/
                switch (node.getTextHorAlign()) {
                    case hy.gui.TEXT_HORALIGN_LEFT:
                    {
                        this._inputEl.style.textAlign = "left";
                        break;
                    }
                    case hy.gui.TEXT_HORALIGN_RIGHT:
                    {
                        this._inputEl.style.textAlign = "right";
                        break;
                    }
                    default :
                    {
                        this._inputEl.style.textAlign = "center";
                        break;
                    }
                }
                switch (node.getTextVerAlign()) {
                    case hy.gui.TEXT_VERALIGN_TOP:
                    {
                        this._inputEl.style.verticalAlign = "top";
                        break;
                    }
                    case hy.gui.TEXT_VERALIGN_BOTTOM:
                    {
                        this._inputEl.style.verticalAlign = "bottom";
                        break;
                    }
                    default :
                    {
                        this._inputEl.style.verticalAlign = "middle";
                        break;
                    }
                }
                this._inputEl.innerText = node.getText();
                this._outerConEl.style.display = "block";
                if (this._scrollBarWidth == 0) {
                    this._scrollBarWidth = this._innerConEl.offsetWidth - this._innerConEl.clientWidth;
                    boxWidth = width + this._scrollBarWidth;
                    boxHeight = height + this._scrollBarWidth;
                    this._innerConEl.style.width = boxWidth + "px";
                    this._innerConEl.style.height = boxHeight + "px";
                }
                this._inputNode = node;
                this._inputNodeVisible = node.getVisible();
                node.setVisible(false);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    hy.html.TextBox.prototype.hideForNode = function (node) {
        if (this._inputNode && this._inputNode == node) {
            this._inputNode.setText(this._inputEl.innerText);
            this._inputNode.setVisible(this._inputNodeVisible);
            this._inputNode = null;
            this._inputEl.innerText = "";
            this._outerConEl.style.display = "none";
            return true;
        } else {
            return false;
        }
    }
    hy.html.TextBox.prototype.focusForNode = function (node) {
        if (this.showForNode(node)) {
            this._inputEl.focus();
            return true;
        } else {
            return false;
        }
    }
    hy.html.TextBox.prototype.blurForNode = function (node) {
        if (this.hideForNode(node)) {
            this._inputEl.blur();
            return true;
        } else {
            return false;
        }
    }
})(hy, window, document);
