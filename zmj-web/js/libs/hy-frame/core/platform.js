var hy = hy || {};

(function (hy, win, doc) {

    hy.platform = {};
    hy.platform._isMobile = navigator.userAgent.toLowerCase().indexOf("mobile") != -1;
    hy.platform._isDeskTop = !hy.platform._isMobile;
    hy.platform._isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;

    hy.platform.isMobile = function () {
        return hy.platform._isMobile;
    }
    hy.platform.isDeskTop = function () {
        return hy.platform._isDeskTop;
    }
    hy.platform.isIE = function () {
        return hy.platform._isIE;
    }

})(hy, window, document);