var hy = hy || {};

+function (hy, win, doc) {

    hy.game = hy.game || {};
    hy.game.frame = hy.game.frame || {};
    hy.game.frame.param = hy.game.frame.param || {};

    hy.game.frame.param.X = "0";
    hy.game.frame.param.Y = "1";
    hy.game.frame.param.WIDTH = "2";
    hy.game.frame.param.HEIGHT = "3";
    hy.game.frame.param.SCALEX = "4";
    hy.game.frame.param.SCALEY = "5";
    hy.game.frame.param.ANCHORX = "6";
    hy.game.frame.param.ANCHORY = "7";
    hy.game.frame.param.ROTATEZ = "8";
    hy.game.frame.param.ALPHA = "9";

    hy.game.MIRROR_NONE = 0;
    hy.game.MIRROR_X = 1;
    hy.game.MIRROR_Y = 2;
    hy.game.MIRROR_BOTH = 3;

}(hy, window, document);