/**
 * Created by iswear on 16/10/1.
 */
var hy = hy || {};

+function (hy, win, doc) {

    hy.util = hy.util || {};
    hy.util.timer = hy.util.timer || {};

    if (win.requestAnimationFrame) {
        hy.util.timer._requestAniFrame = win.requestAnimationFrame;
    } else if (win.webkitRequestAnimationFrame) {
        hy.util.timer._requestAniFrame = win.webkitRequestAnimationFrame;
    } else if (win.msRequestAnimationFrame) {
        hy.util.timer._requestAniFrame = win.msRequestAnimationFrame;
    } else if (win.mozRequestAnimationFrame) {
        hy.util.timer._requestAniFrame = win.mozRequestAnimationFrame;
    } else if (win.oRequestAnimationFrame) {
        hy.util.timer._requestAniFrame = win.oRequestAnimationFrame;
    } else {
        hy.util.timer._requestAniFrame = null;
    }

    hy.util.timer.setTimeout = function (callBack, target, delay) {
        return win.setTimeout(callBack.bind(target), delay);
    }
    hy.util.timer.setInterval = function (callBack, target, interval) {
        return win.setInterval(callBack.bind(target), interval);
    }
    hy.util.timer.setRequestFrame = function (callBack, target) {
        if (hy.util.timer._requestAniFrame != null) {
            var reqAniFrame = hy.util.timer._requestAniFrame;
            function requestFrameProxy () {
                callBack.call(target);
                reqAniFrame(requestFrameProxy);
            }
            requestFrameProxy();
        } else {
            throw "浏览器不支持requestAnimationFrame";
        }
    }


}(hy, window, document);
