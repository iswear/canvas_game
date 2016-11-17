var hy = hy || {};

+function (hy, win, doc) {

    hy.util = hy.util || {};

    hy.util.textLayouter = hy.util.textLayouter || {};
    hy.util.textLayouter.getInstance = function () {
        if (!hy.util.textLayouter._instance) {
            hy.util.textLayouter._instance = new hy.util.TextLayouter({});
        }
        return hy.util.textLayouter._instance;
    }

    hy.util.TextLayouter = hy.extend(hy.Object);
    hy.util.TextLayouter.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._measureCanvas = document.createElement("canvas");
        this._measureContext = this._measureCanvas.getContext("2d");
        this._charWidthMaps = {};
    }
    hy.util.TextLayouter.prototype.getCharWidthMap = function (font) {
        if (this._charWidthMaps[font]) {
            return this._charWidthMaps[font];
        } else {
            var charWidthMap = {};
            this._measureContext.font = font;
            charWidthMap[" "] = this._measureContext.measureText(" ").width;
            charWidthMap["!"] = this._measureContext.measureText("!").width;
            charWidthMap["\""] = this._measureContext.measureText("\"").width;
            charWidthMap["#"] = this._measureContext.measureText("#").width;
            charWidthMap["$"] = this._measureContext.measureText("$").width;
            charWidthMap["%"] = this._measureContext.measureText("%").width;
            charWidthMap["&"] = this._measureContext.measureText("&").width;
            charWidthMap["'"] = this._measureContext.measureText("'").width;
            charWidthMap["("] = this._measureContext.measureText("(").width;
            charWidthMap[")"] = this._measureContext.measureText(")").width;
            charWidthMap["*"] = this._measureContext.measureText("*").width;
            charWidthMap["+"] = this._measureContext.measureText("+").width;
            charWidthMap[","] = this._measureContext.measureText("-").width;
            charWidthMap["-"] = this._measureContext.measureText(",").width;
            charWidthMap["."] = this._measureContext.measureText(",").width;
            charWidthMap["/"] = this._measureContext.measureText("/").width;
            charWidthMap["0"] = this._measureContext.measureText("0").width;
            charWidthMap["1"] = this._measureContext.measureText("1").width;
            charWidthMap["2"] = this._measureContext.measureText("2").width;
            charWidthMap["3"] = this._measureContext.measureText("3").width;
            charWidthMap["4"] = this._measureContext.measureText("4").width;
            charWidthMap["5"] = this._measureContext.measureText("5").width;
            charWidthMap["6"] = this._measureContext.measureText("6").width;
            charWidthMap["7"] = this._measureContext.measureText("7").width;
            charWidthMap["8"] = this._measureContext.measureText("8").width;
            charWidthMap["9"] = this._measureContext.measureText("9").width;
            charWidthMap[":"] = this._measureContext.measureText(":").width;
            charWidthMap[";"] = this._measureContext.measureText(";").width;
            charWidthMap["<"] = this._measureContext.measureText("<").width;
            charWidthMap["="] = this._measureContext.measureText("=").width;
            charWidthMap[">"] = this._measureContext.measureText(">").width;
            charWidthMap["?"] = this._measureContext.measureText("?").width;
            charWidthMap["@"] = this._measureContext.measureText("@").width;
            charWidthMap["A"] = this._measureContext.measureText("A").width;
            charWidthMap["B"] = this._measureContext.measureText("B").width;
            charWidthMap["C"] = this._measureContext.measureText("C").width;
            charWidthMap["D"] = this._measureContext.measureText("D").width;
            charWidthMap["E"] = this._measureContext.measureText("E").width;
            charWidthMap["F"] = this._measureContext.measureText("F").width;
            charWidthMap["G"] = this._measureContext.measureText("G").width;
            charWidthMap["H"] = this._measureContext.measureText("H").width;
            charWidthMap["I"] = this._measureContext.measureText("I").width;
            charWidthMap["J"] = this._measureContext.measureText("J").width;
            charWidthMap["K"] = this._measureContext.measureText("K").width;
            charWidthMap["L"] = this._measureContext.measureText("L").width;
            charWidthMap["M"] = this._measureContext.measureText("M").width;
            charWidthMap["N"] = this._measureContext.measureText("N").width;
            charWidthMap["O"] = this._measureContext.measureText("O").width;
            charWidthMap["P"] = this._measureContext.measureText("P").width;
            charWidthMap["Q"] = this._measureContext.measureText("Q").width;
            charWidthMap["R"] = this._measureContext.measureText("R").width;
            charWidthMap["S"] = this._measureContext.measureText("S").width;
            charWidthMap["T"] = this._measureContext.measureText("T").width;
            charWidthMap["U"] = this._measureContext.measureText("U").width;
            charWidthMap["V"] = this._measureContext.measureText("V").width;
            charWidthMap["W"] = this._measureContext.measureText("W").width;
            charWidthMap["X"] = this._measureContext.measureText("X").width;
            charWidthMap["Y"] = this._measureContext.measureText("Y").width;
            charWidthMap["["] = this._measureContext.measureText("Z").width;
            charWidthMap["\\"] = this._measureContext.measureText("\\").width;
            charWidthMap["]"] = this._measureContext.measureText("]").width;
            charWidthMap["^"] = this._measureContext.measureText("^").width;
            charWidthMap["_"] = this._measureContext.measureText("_").width;
            charWidthMap["`"] = this._measureContext.measureText("`").width;
            charWidthMap["a"] = this._measureContext.measureText("a").width;
            charWidthMap["b"] = this._measureContext.measureText("b").width;
            charWidthMap["c"] = this._measureContext.measureText("c").width;
            charWidthMap["d"] = this._measureContext.measureText("d").width;
            charWidthMap["e"] = this._measureContext.measureText("e").width;
            charWidthMap["f"] = this._measureContext.measureText("f").width;
            charWidthMap["g"] = this._measureContext.measureText("g").width;
            charWidthMap["h"] = this._measureContext.measureText("h").width;
            charWidthMap["i"] = this._measureContext.measureText("i").width;
            charWidthMap["j"] = this._measureContext.measureText("j").width;
            charWidthMap["k"] = this._measureContext.measureText("k").width;
            charWidthMap["l"] = this._measureContext.measureText("l").width;
            charWidthMap["m"] = this._measureContext.measureText("m").width;
            charWidthMap["n"] = this._measureContext.measureText("n").width;
            charWidthMap["o"] = this._measureContext.measureText("o").width;
            charWidthMap["p"] = this._measureContext.measureText("p").width;
            charWidthMap["q"] = this._measureContext.measureText("q").width;
            charWidthMap["r"] = this._measureContext.measureText("r").width;
            charWidthMap["s"] = this._measureContext.measureText("s").width;
            charWidthMap["t"] = this._measureContext.measureText("t").width;
            charWidthMap["u"] = this._measureContext.measureText("u").width;
            charWidthMap["v"] = this._measureContext.measureText("v").width;
            charWidthMap["w"] = this._measureContext.measureText("w").width;
            charWidthMap["x"] = this._measureContext.measureText("x").width;
            charWidthMap["y"] = this._measureContext.measureText("y").width;
            charWidthMap["z"] = this._measureContext.measureText("z").width;
            charWidthMap["{"] = this._measureContext.measureText("{").width;
            charWidthMap["|"] = this._measureContext.measureText("|").width;
            charWidthMap["}"] = this._measureContext.measureText("}").width;
            charWidthMap["~"] = this._measureContext.measureText("~").width;
            charWidthMap["\n"] = this._measureContext.measureText("\n").width;
            charWidthMap["zh"] = this._measureContext.measureText("汉").width;
            this._charWidthMaps[font] = charWidthMap;
            return charWidthMap;
        }
    }
    hy.util.TextLayouter.prototype.getTextLayoutWidth = function (text, font) {
        var charWidthMap = this.getCharWidthMap(font);
        var textWidth = 0;
        var curChar = null;
        for (var i = 0, len = text.length; i < len; ++i) {
            curChar = text[i];
            if (curChar > '~') {
                textWidth += charWidthMap["zh"];
            } else {
                textWidth += charWidthMap[text[i]] ? charWidthMap[text[i]] : charWidthMap[" "];
            }
        }
        return Math.ceil(textWidth);
    }
    hy.util.TextLayouter.prototype.getTextLayoutArray = function (text, font, maxWidth) {
        if (!text) {
            return [];
        }
        var charWidthMap = this.getCharWidthMap(font);
        var length = text.length;
        var curLineWidth = 0, curCharWidth = 0;
        var startCharIndex = 0, preSpaceIndex = -1, preSpaceWidth = 0;
        var curChar = null;
        var textArr = [];
        var clearSpace = false;
        if (maxWidth > 0) {
            for (var i = 0; i < length; ++i) {
                if (curChar > '~') {
                    curCharWidth = charWidthMap["zh"];
                    curLineWidth += curCharWidth;
                    preSpaceIndex = i;
                    preSpaceWidth = curLineWidth;
                } else {
                    curCharWidth = charWidthMap[curChar];
                    curLineWidth += curCharWidth;
                    if (curChar == '\n') {
                        textArr.push(text.substring(startCharIndex, i));
                        startCharIndex = i + 1;
                        curLineWidth = 0;
                        clearSpace = false;
                    } else if (curChar == ' ') {
                        preSpaceIndex = i;
                        preSpaceWidth = curLineWidth;
                    }
                }
                if (curLineWidth > maxWidth) {
                    clearSpace = true;
                    if (curChar > '~' || curChar == '' || preSpaceIndex <= startCharIndex) {
                        textArr.push(text.substring(startCharIndex, i));
                        startCharIndex = i;
                        curLineWidth = curCharWidth;
                    } else {
                        textArr.push(text.substring(startCharIndex, preSpaceIndex));
                        startCharIndex = preSpaceIndex + 1;
                        curLineWidth -= preSpaceWidth;
                    }
                }
            }
        }
        if(startCharIndex < length) {
            textArr.push(text.substr(startCharIndex, length));
        }
        return textArr;
    }
    hy.util.TextLayouter.prototype.purge = function () {
        this._measureCanvas = null;
        this._measureContext = null;
        this._charWidthMaps = null;
        this.superCall("purge", null);
    }

}(hy, window, document);