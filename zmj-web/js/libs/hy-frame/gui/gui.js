/**
 * Created by Administrator on 2014/10/13.
 */
var hy = hy || {};

(function (hy, win, doc) {

    hy.gui = {};
    hy.gui.TEXT_HORALIGN_LEFT = 1;
    hy.gui.TEXT_HORALIGN_CENTER = 2;
    hy.gui.TEXT_HORALIGN_RIGHT = 3;
    hy.gui.TEXT_VERALIGN_TOP = 1;
    hy.gui.TEXT_VERALIGN_CENTER = 2;
    hy.gui.TEXT_VERALIGN_BOTTOM = 3;

    hy.gui.CONTEXTMENU_TYPE_NORMAL = 0;
    hy.gui.CONTEXTMENU_TYPE_DROPDOWN = 1;
    hy.gui.CONTEXTMENU_TYPE_COMBOBOX = 2;

    hy.gui.MIRROR_NONE = 0;
    hy.gui.MIRROR_X = 1;
    hy.gui.MIRROR_Y = 2;
    hy.gui.MIRROR_BOTH = 3;

    /*gui主题色调设计*/
    hy.gui.colors = {};
    hy.gui.colors.PUREWHITE = "#ffffff";
    hy.gui.colors.PUREBLACK = "#000000";
    hy.gui.colors.GREEN = "#2ecc71";
    hy.gui.colors.DGREEN = "#27ae60";
    hy.gui.colors.BLUE = "#3498db";
    hy.gui.colors.DBLUE = "#2980b9";
    hy.gui.colors.PURPLE = "#9b59b6";
    hy.gui.colors.DPURPLE = "#8e44ad";
    hy.gui.colors.BLACK = "#34495e";
    hy.gui.colors.DBLACK = "#2c3e50";
    hy.gui.colors.YELLOW = "#f1c40f";
    hy.gui.colors.DYELLOW = "#f39c12";
    hy.gui.colors.ORANGE = "#e67e22";
    hy.gui.colors.DORANGE = "#d35400";
    hy.gui.colors.RED = "#e74c3c";
    hy.gui.colors.DRED = "#c0392b";
    hy.gui.colors.SILVER = "#ecf0f1";
    hy.gui.colors.DSILVER = "#bdc3c7";
    hy.gui.colors.GRAY = "#95a5a6";
    hy.gui.colors.DGRAY = "#7f8c8d";

    hy.gui.colors.GRAYLEVEL1 = "#111111";
    hy.gui.colors.GRAYLEVEL2 = "#222222";
    hy.gui.colors.GRAYLEVEL3 = "#333333";
    hy.gui.colors.GRAYLEVEL4 = "#444444";
    hy.gui.colors.GRAYLEVEL5 = "#555555";
    hy.gui.colors.GRAYLEVEL6 = "#666666";
    hy.gui.colors.GRAYLEVEL7 = "#777777";
    hy.gui.colors.GRAYLEVEL8 = "#888888";
    hy.gui.colors.GRAYLEVEL9 = "#999999";
    hy.gui.colors.GRAYLEVEL10 = "#aaaaaa";
    hy.gui.colors.GRAYLEVEL11 = "#bbbbbb";
    hy.gui.colors.GRAYLEVEL12 = "#cccccc";
    hy.gui.colors.GRAYLEVEL13 = "#dddddd";
    hy.gui.colors.GRAYLEVEL14 = "#eeeeee";

})(hy, window, document);
