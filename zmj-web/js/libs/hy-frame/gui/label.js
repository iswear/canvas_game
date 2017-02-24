var hy = hy || {};

(function(hy, win, doc) {

    function syncLabelTextMeasuredLength () {
        this.__textLayoutInfo.singleLineWidth = hy.util.textLayouter.getInstance().getTextLayoutWidth(this._text, this._textFont);
    }

    function syncLabelRenderCacheInvalid () {
        this.__textCacheInfo.invalid = true;
    }

    function syncLabelTextLayoutInvalid () {
        this.__textLayoutInfo.invalid = true;
    }

    function syncLabelTextFontSizeInvalid () {
        this.__textFontSizeInfo.invalid = true;
    }

    function syncLabelTextSizeReason () {
        if (this._textLineNum != 1) {
            this.__textLayoutInfo.invalid = true;
            this.__textCacheInfo.invalid = true;
        }
    }

    function pickupLabelTextFontSize () {
        var reg = /[1-9][0-9]*px/i;
        var fontSize = this._textFont.match(reg);
        if (fontSize != null) {
            this.__textFontSizeInfo.size = parseInt(fontSize[0].substr(0, fontSize[0].length - 2));
        } else {
            this.__textFontSizeInfo.size = 12;
        }
        this.__textFontSizeInfo.invalid = false;
    }

    function layoutLabelText (zone) {
        if (this._textLineNum != 1) {
            var borderWidth = (this._borderColor && this._borderWidth > 0) ? this._borderWidth : 0;
            this.__textMutliLines = hy.util.textLayouter.getInstance().getTextLayoutArray(this._text, this._textFont, zone.width - this._textPaddingLeft - this._textPaddingRight - 2 * borderWidth);
        } else {
            this.__textMutliLines = [this._text];
        }
        this.__textLayoutInfo.invalid = false;
    }

    function paintLabelTextCache (zone) {
        var lineHeight = (this._textLineHeight > this.__textFontSizeInfo.size) ? this._textLineHeight : this.__textFontSizeInfo.size;
        var lineNum = (this._textLineNum < 1 || this._textLineNum > this.__textMutliLines.length) ? this.__textMutliLines.length : this._textLineNum;
        var borderWidth = (this._borderColor && this._borderWidth > 0) ? this._borderWidth : 0;
        var cacheWidth, cacheHeight = lineNum * lineHeight;
        if (lineNum == 1) {
            cacheWidth = this.__textLayoutInfo.singleLineWidth;
        } else {
            cacheWidth = zone.width - this._textPaddingLeft - this._textPaddingRight - 2 * borderWidth;
        }
        var cacheRenderContext = this.__textCacheInfo.renderContext;
        if (cacheWidth > 0 && cacheHeight > 0) {
            var textx = 0, texty = lineHeight / 2;
            cacheRenderContext.setWidth(cacheWidth);
            cacheRenderContext.setHeight(cacheHeight + 1);
            cacheRenderContext.clearRect(0, 0, cacheWidth, cacheHeight);
            cacheRenderContext.setTextBaseline("middle");
            switch (this._textHorAlign) {
                case hy.gui.TEXT_HORALIGN_LEFT:
                {
                    textx = 0;
                    cacheRenderContext.setTextAlign("left");
                    break;
                }
                case hy.gui.TEXT_HORALIGN_RIGHT:
                {
                    textx = cacheWidth;
                    cacheRenderContext.setTextAlign("right");
                    break;
                }
                default :
                {
                    textx = cacheWidth / 2;
                    cacheRenderContext.setTextAlign("center");
                    break;
                }
            }
            cacheRenderContext.setFont(this._textFont);
            cacheRenderContext.setFillStyle(this._textColor);
            for (var i = 0; i < lineNum; ++i) {
                cacheRenderContext.fillText(this.__textMutliLines[i], textx, texty);
                texty += lineHeight;
            }
        } else {
            cacheRenderContext.setWidth(0);
            cacheRenderContext.setHeight(0);
        }
        this.__textCacheInfo.invalid = false;
    }

    function paintLabelText (sender, dc, zone) {
        if (this._text && this._text.length > 0) {
            if (this.__textFontSizeInfo.invalid) {
                pickupLabelTextFontSize.call(this);
            }
            if (this.__textLayoutInfo.invalid) {
                layoutLabelText.call(this, zone);
            }
            if (this.__textCacheInfo.invalid) {
                paintLabelTextCache.call(this, zone);
            }
            var cacheRenderContext = this.__textCacheInfo.renderContext;
            var cacheWidth = cacheRenderContext.getWidth();
            var cacheHeight = cacheRenderContext.getHeight();
            if (!this._textHidden && cacheWidth > 0 && cacheHeight > 0) {
                var srcwidth, srcheight;
                var borderWidth = (this._borderColor && this._borderWidth > 0) ? this._borderWidth : 0;
                var desx = zone.minX + this._textPaddingLeft + borderWidth;
                var desy = zone.minY + this._textPaddingTop + borderWidth;
                var labelwidth = zone.width - desx - this._textPaddingRight - borderWidth;
                var labelheight = zone.height - desy - this._textPaddingBottom - borderWidth;
                if (labelwidth > 0 && labelheight > 0) {
                    srcwidth = (cacheWidth < labelwidth) ? cacheWidth : labelwidth;
                    srcheight = (cacheHeight < labelheight) ? cacheHeight : labelheight;
                    switch (this._textHorAlign) {
                        case hy.gui.TEXT_HORALIGN_LEFT:
                        {
                            break;
                        }
                        case hy.gui.TEXT_HORALIGN_RIGHT:
                        {
                            desx += labelwidth - srcwidth;
                            break;
                        }
                        default :
                        {
                            desx += Math.ceil((labelwidth - srcwidth) / 2);
                            break;
                        }
                    }
                    switch (this._textVerAlign) {
                        case hy.gui.TEXT_VERALIGN_TOP:
                        {
                            break;
                        }
                        case hy.gui.TEXT_VERALIGN_BOTTOM:
                        {
                            desy += (labelheight - srcheight);
                            break;
                        }
                        default :
                        {
                            desy += Math.ceil((labelheight - srcheight) / 2);
                            break;
                        }
                    }
                    dc.drawImageExt(cacheRenderContext.getCanvas(), 0, 0, srcwidth, srcheight, desx, desy, srcwidth, srcheight);
                }
            }
        }
    }

    hy.gui = hy.gui || {};
    hy.gui.Label = hy.extend(hy.gui.View);
    hy.gui.Label.prototype.defaultText = "Label";
    hy.gui.Label.prototype.defaultTextColor = hy.gui.colors.BLACK;
    hy.gui.Label.prototype.defaultTextHorAlign = hy.gui.TEXT_HORALIGN_LEFT;
    hy.gui.Label.prototype.defaultTextVerAlign = hy.gui.TEXT_VERALIGN_CENTER;
    hy.gui.Label.prototype.defaultTextLineHeight = 0;
    hy.gui.Label.prototype.defaultTextFont = "13px Helvetica, Roboto, Arial, sans-serif";
    hy.gui.Label.prototype.defaultTextPaddingLeft = 0;
    hy.gui.Label.prototype.defaultTextPaddingRight = 0;
    hy.gui.Label.prototype.defaultTextPaddingTop = 0;
    hy.gui.Label.prototype.defaultTextPaddingBottom = 0;
    hy.gui.Label.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._text = hy.util.dataType.isUndefined(config.text) ? this.defaultText : config.text;
        this._textFont = hy.util.dataType.isUndefined(config.textFont) ? this.defaultTextFont : config.textFont;
        this._textColor = hy.util.dataType.isUndefined(config.textColor) ? this.defaultTextColor : config.textColor;
        this._textHidden = hy.util.dataType.isUndefined(config.textHidden) ? false : config.textHidden;
        this._textHorAlign = hy.util.dataType.isUndefined(config.textHorAlign) ? this.defaultTextHorAlign : config.textHorAlign;
        this._textVerAlign = hy.util.dataType.isUndefined(config.textVerAlign) ? this.defaultTextVerAlign : config.textVerAlign;
        this._textLineHeight = hy.util.dataType.isUndefined(config.textLineHeight) ? this.defaultTextLineHeight : config.textLineHeight;
        this._textLineNum = hy.util.dataType.isUndefined(config.textLineNum) ? 1 : config.textLineNum;
        this._textPaddingLeft = hy.util.dataType.isUndefined(config.textPaddingLeft) ? this.defaultTextPaddingLeft : config.textPaddingLeft;
        this._textPaddingRight = hy.util.dataType.isUndefined(config.textPaddingRight) ? this.defaultTextPaddingRight : config.textPaddingRight;
        this._textPaddingTop = hy.util.dataType.isUndefined(config.textPaddingTop) ? this.defaultTextPaddingTop : config.textPaddingTop;
        this._textPaddingBottom = hy.util.dataType.isUndefined(config.textPaddingBottom) ? this.defaultTextPaddingBottom : config.textPaddingBottom;
        this.__textFontSizeInfo = {invalid: true, size: 0};
        this.__textCacheInfo = {invalid: true, renderContext: new hy.RenderContext({})};
        this.__textLayoutInfo = {invalid: true, multiLines: null, singleLineWidth: 0};

        this.addObserver(hy.event.name.WIDTHCHG, this, syncLabelTextSizeReason, 0);
        this.addObserver(hy.event.name.PAINT, this, paintLabelText, 0);
    }
    hy.gui.Label.prototype.sync = function () {
        this.superCall("sync", null);
        syncLabelTextFontSizeInvalid.call(this);
        syncLabelRenderCacheInvalid.call(this);
        syncLabelTextLayoutInvalid.call(this);
        syncLabelTextMeasuredLength.call(this);
    }
    hy.gui.Label.prototype.setText = function (text) {
        if (this._text != text) {
            this._text = text;
            this.refresh();
            syncLabelTextMeasuredLength.call(this);
            syncLabelTextLayoutInvalid.call(this);
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getText = function () {
        return this._text;
    }
    hy.gui.Label.prototype.setTextFont = function (font) {
        if (this._textFont != font) {
            this._textFont = font;
            this.refresh();
            syncLabelTextMeasuredLength.call(this);
            syncLabelTextLayoutInvalid.call(this);
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextFont = function () {
        return this._textFont;
    }
    hy.gui.Label.prototype.setTextColor = function (color) {
        if (this._textColor != color) {
            this._textColor = color;
            this.refresh();
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextColor = function () {
        return this._textColor;
    }
    hy.gui.Label.prototype.setTextHidden = function (hidden) {
        if (this._textHidden != hidden) {
            this._textHidden = hidden;
            this.refresh();
        }
    }
    hy.gui.Label.prototype.getTextHidden = function () {
        return this._textHidden;
    }
    hy.gui.Label.prototype.setTextHorAlign = function (textAlign) {
        if (this._textHorAlign != textAlign) {
            this._textHorAlign = textAlign;
            this.refresh();
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextHorAlign = function () {
        return this._textHorAlign;
    }
    hy.gui.Label.prototype.setTextVerAlign = function (textAlign) {
        if (this._textVerAlign != textAlign) {
            this._textVerAlign = textAlign;
            this.refresh();
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextVerAlign = function () {
        return this._textVerAlign;
    }
    hy.gui.Label.prototype.setTextLineHeight = function (lineHeight) {
        if (this._textLineHeight != lineHeight) {
            this._textLineHeight = lineHeight;
            this.refresh();
            syncLabelTextLayoutInvalid.call(this);
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextLineHeight = function () {
        return this._textLineHeight;
    }
    hy.gui.Label.prototype.setTextLineNum = function (lineNum) {
        if (this._textLineNum != lineNum) {
            this._textLineNum = lineNum;
            this.refresh();
            syncLabelTextLayoutInvalid.call(this);
            syncLabelRenderCacheInvalid.call(this);
        }
    }
    hy.gui.Label.prototype.getTextLineNum = function () {
        return this._textLineNum;
    }
    hy.gui.Label.prototype.setTextPaddingLeft = function (padding) {
        if (this._textPaddingLeft != padding) {
            this._textPaddingLeft = padding;
            this.refresh();
            syncLabelTextSizeReason.call(this);
        }
    }
    hy.gui.Label.prototype.getTextPaddingLeft = function () {
        return this._textPaddingLeft;
    }
    hy.gui.Label.prototype.setTextPaddingRight = function (padding) {
        if (this._textPaddingRight != padding) {
            this._textPaddingRight = padding;
            this.refresh();
            syncLabelTextSizeReason.call(this);
        }
    }
    hy.gui.Label.prototype.getTextPaddingRight = function () {
        return this._textPaddingRight;
    }
    hy.gui.Label.prototype.setTextPaddingTop = function (padding) {
        if (this._textPaddingTop != padding) {
            this._textPaddingTop = padding;
            this.refresh();
        }
    }
    hy.gui.Label.prototype.getTextPaddingTop = function () {
        return this._textPaddingTop;
    }
    hy.gui.Label.prototype.setTextPaddingBottom = function (padding) {
        if (this._textPaddingBottom != padding) {
            this._textPaddingBottom = padding;
            this.refresh();
        }
    }
    hy.gui.Label.prototype.getTextPaddingBottom = function () {
        return this._textPaddingBottom;
    }
    hy.gui.Label.prototype.getTextMeasuredLength = function () {
        return this.__textLayoutInfo.singleLineWidth;
    }
})(hy, window, document);