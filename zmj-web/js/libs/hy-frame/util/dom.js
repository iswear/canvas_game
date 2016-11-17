var hy = hy || {};

+function (hy, win, doc) {

    var body = doc.body;

    hy.util = hy.util || {};
    hy.util.dom = hy.util.dom || {};

    hy.util.dom.getDocVisibleSize = function () {
        var size = {};
        if (win.innerHeight) {
            size.width = win.innerWidth;
            size.height = win.innerHeight;
        } else if (doc.documentElement.clientHeight) {
            size.width = doc.documentElement.clientWidth;
            size.height = doc.documentElement.clientHeight;
        } else {
            size.width = body.clientWidth;
            size.height = body.clientHeight;
        }
        return size;
    }

    hy.util.dom.getDocScrollSize = function () {
        return {width:body.scrollWidth, height:body.scrollHeight};
    }

    hy.util.dom.getParentOffset = function (element) {
        var offsetLeft = element.offsetLeft;
        var offsetTop = element.offsetTop;
        return {left: offsetLeft, top:offsetTop};
    }

    hy.util.dom.getPageOffset = function (element) {
        var parent = element;
        var offsetLeft = 0;
        var offsetTop = 0;
        while (parent != null && parent!=body && parent != doc) {
            offsetLeft += parent.offsetLeft;
            offsetTop += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {left: offsetLeft, top: offsetTop};
    }

}(hy, window, document);
