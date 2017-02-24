var hy = hy || {};

(function (hy, win, doc) {

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


})(hy, window, document);
