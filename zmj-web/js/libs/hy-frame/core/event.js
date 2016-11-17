var hy = hy || {};

+function (hy, win, doc) {

    hy.event = hy.event || {};

    hy.event.addEventListener = function (node, type, target, listener) {
        try {
            node.addEventListener(type, listener.bind(target), false);
        } catch (err) {
            type = "on" + type;
            node.attachEvent("on" + type, listener.bind(this));
        }
    }

    hy.event.key = {};
    hy.event.key.BACKSPACE = 8;
    hy.event.key.TAB = 9;
    hy.event.key.CLEAR = 12;
    hy.event.key.ENTER = 13;
    hy.event.key.SHIFT_LEFT = 16;
    hy.event.key.CTRL_LEFT = 17;
    hy.event.key.ALT_LEFT = 18;
    hy.event.key.PAUSE = 19;
    hy.event.key.CAPS_LOCK = 20;
    hy.event.key.ESCAPE = 27;
    hy.event.key.SPACE = 32;
    hy.event.key.PRIOR = 33;
    hy.event.key.NEXT = 34;
    hy.event.key.END = 35;
    hy.event.key.HOME = 36;
    hy.event.key.LEFT = 37;
    hy.event.key.UP = 38;
    hy.event.key.RIGHT = 39;
    hy.event.key.DOWN = 40;
    hy.event.key.SELECT = 41;
    hy.event.key.PRINT = 42;
    hy.event.key.EXECUTE = 43;
    hy.event.key.INSERT = 44;
    hy.event.key.DELETE = 45;
    hy.event.key.HELP = 47;
    hy.event.key.NUMBER0 = 48;
    hy.event.key.NUMBER1 = 49;
    hy.event.key.NUMBER2 = 50;
    hy.event.key.NUMBER3 = 51;
    hy.event.key.NUMBER4 = 52;
    hy.event.key.NUMBER5 = 53;
    hy.event.key.NUMBER6 = 54;
    hy.event.key.NUMBER7 = 55;
    hy.event.key.NUMBER8 = 56;
    hy.event.key.NUMBER9 = 57;
    hy.event.key.A = 65;
    hy.event.key.B = 66;
    hy.event.key.C = 67;
    hy.event.key.D = 68;
    hy.event.key.E = 69;
    hy.event.key.F = 70;
    hy.event.key.G = 71;
    hy.event.key.H = 72;
    hy.event.key.I = 73;
    hy.event.key.J = 74;
    hy.event.key.K = 75;
    hy.event.key.L = 76;
    hy.event.key.M = 77;
    hy.event.key.N = 78;
    hy.event.key.O = 79;
    hy.event.key.P = 80;
    hy.event.key.Q = 81;
    hy.event.key.R = 82;
    hy.event.key.S = 83;
    hy.event.key.T = 84;
    hy.event.key.U = 85;
    hy.event.key.V = 86;
    hy.event.key.W = 87;
    hy.event.key.X = 88;
    hy.event.key.Y = 89;
    hy.event.key.Z = 90;
    hy.event.key.KP_NUMBER0 = 96;
    hy.event.key.KP_NUMBER1 = 97;
    hy.event.key.KP_NUMBER2 = 98;
    hy.event.key.KP_NUMBER3 = 99;
    hy.event.key.KP_NUMBER4 = 100;
    hy.event.key.KP_NUMBER5 = 101;
    hy.event.key.KP_NUMBER6 = 102;
    hy.event.key.KP_NUMBER7 = 103;
    hy.event.key.KP_NUMBER8 = 104;
    hy.event.key.KP_NUMBER9 = 105;
    hy.event.key.KP_MULTIPLY = 106;
    hy.event.key.KP_ADD = 107;
    hy.event.key.KP_SEPARATOR = 108;
    hy.event.key.KP_SUBSTRACT = 109;
    hy.event.key.KP_DECIMAL = 110;
    hy.event.key.KP_DEVIDE = 111;
    hy.event.key.F1 = 112;
    hy.event.key.F2 = 113;
    hy.event.key.F3 = 114;
    hy.event.key.F4 = 115;
    hy.event.key.F5 = 116;
    hy.event.key.F6 = 117;
    hy.event.key.F7 = 118;
    hy.event.key.F8 = 119;
    hy.event.key.F9 = 120;
    hy.event.key.F10 = 121;
    hy.event.key.F11 = 122;
    hy.event.key.F12 = 123;
    hy.event.key.F13 = 124;
    hy.event.key.F14 = 125;
    hy.event.key.F15 = 126;
    hy.event.key.F16 = 127;
    hy.event.key.F17 = 128;
    hy.event.key.F18 = 129;
    hy.event.key.F19 = 130;
    hy.event.key.F20 = 131;
    hy.event.key.F21 = 132;
    hy.event.key.F22 = 133;
    hy.event.key.F23 = 134;
    hy.event.key.F24 = 135;
    hy.event.key.NUM_LOCK = 136;
    hy.event.key.SCROLL_LOCK = 137;

    hy.event.name = {};
    hy.event.name.KEYDOWN = "keydown";
    hy.event.name.KEYPRESS = "keypress";
    hy.event.name.KEYUP = "keyup";
    hy.event.name.CLICK = "click";
    hy.event.name.DBLCLICK = "dblclick";
    hy.event.name.MOUSEDOWN = "mousedown";
    hy.event.name.MOUSEMOVE = "mousemove";
    hy.event.name.MOUSEUP = "mouseup";
    hy.event.name.MOUSEOVER = "mouseover";
    hy.event.name.MOUSEOUT = "mouseout";
    hy.event.name.MOUSEWHEEL = "mousewheel";
    hy.event.name.CONTEXTMENU = "contextmenu";
    hy.event.name.CONTEXTMENUSELECTED = "contextmenuselected";

    hy.event.name.BEFOREDRAG = "beforedrag";
    hy.event.name.DRAGING = "draging";
    hy.event.name.AFTERDRAG = "afterdrag";
    hy.event.name.BEFOREROTATE = "beforerotate";
    hy.event.name.ROTATING = "rotating";
    hy.event.name.AFTERROTATE = "afterrotate";
    hy.event.name.BEFOREANCHORMOVE = "beforeanchormove";
    hy.event.name.ANCHORMOVING = "anchormoving";
    hy.event.name.AFTERANCHORMOVE = "afteranchormove";
    hy.event.name.BEFORERESIZE = "beforeresize";
    hy.event.name.RESIZING = "resizing";
    hy.event.name.AFTERRESIZE = "afterresize";
    hy.event.name.BEFOREROTATE = "beforerotate";
    hy.event.name.ROTATING = "rotating";
    hy.event.name.AFTERROTATE = "afterrotate";


    hy.event.name.SCROLLED = "scrolled";
    hy.event.name.MENUSELECTED = "menuselected";
    hy.event.name.DROPDOWNMENUSELECTED = "dropdownmenuselected";
    hy.event.name.COMBOBOXITEMSELECTED = "comboboxitemselected";

    hy.event.name.ITEMCLICK = "itemclick";
    hy.event.name.ITEMDBLCLICK = "itemdblclick";
    hy.event.name.ITEMMOUSEDOWN = "itemmousedown";
    hy.event.name.ITEMMOUSEMOVE = "itemmousemove";
    hy.event.name.ITEMMOUSEUP = "itemmouseup";
    hy.event.name.ITEMMOUSEOVER = "itemmouseover";
    hy.event.name.ITEMMOUSEOUT = "itemmouseout";
    hy.event.name.ITEMCONTEXTMENU = "itemcontextmenu";
    hy.event.name.ITEMCONTEXTMENUSELECTED = "itemcontextmenuselected";
    hy.event.name.ITEMSELECTED = "itemselected";
    hy.event.name.ITEMUNSELECTED = "itemunselected";
    hy.event.name.ITEMDRAG = "itemdrag";

    hy.event.name.NODECLICK = "nodeclick";
    hy.event.name.NODEDBLCLICK = "nodedblclick";
    hy.event.name.NODEMOUSEDOWN = "nodemousedown";
    hy.event.name.NODEMOUSEMOVE = "nodemousemove";
    hy.event.name.NODEMOUSEUP = "nodemouseup";
    hy.event.name.NODEMOUSEOVER = "nodemouseover";
    hy.event.name.NODEMOUSEOUT = "nodemouseout";
    hy.event.name.NODECONTEXTMENU = "nodecontextmenu";
    hy.event.name.NODECONTEXTMENUSELECTED = "nodecontextmenuselected";
    hy.event.name.NODESELECTED = "nodeselected";
    hy.event.name.NODEUNSELECTED = "nodeunselected";
    hy.event.name.NODEDRAG = "nodedrag";

    hy.event.name.PAINT = "paint";
    hy.event.name.ENTERFRAME = "enterframe";
    hy.event.name.LAYOUTSUBNODES = "layoutsubnodes";

    hy.event.name.WINWIDTHCHG = "winwidthchg";
    hy.event.name.WINHEIGHTCHG = "winheightchg";
    hy.event.name.XCHG = "xchg";
    hy.event.name.YCHG = "ychg";
    hy.event.name.WIDTHCHG = "widthchg";
    hy.event.name.HEIGHTCHG = "heightchg";
    hy.event.name.ANCHORXCHG = "anchorxchg";
    hy.event.name.ANCHORYCHG = "anchorychg";
    hy.event.name.SCALEXCHG = "scalexchg";
    hy.event.name.SCALEYCHG = "scaleychg";
    hy.event.name.ALPHACHG = "alphachg";
    hy.event.name.ROTATEZCHG = "rotatezchg";
    hy.event.name.TEXTCHG = "textchg";


    // hy.event.name.ABSXCHG = "absxchg";
    // hy.event.name.ABSYCHG = "absychg";
    // hy.event.name.ABSWIDTHCHG = "abswidthchg";
    // hy.event.name.ABSHEIGHTCHG = "absheightchg";

}(hy, window, document);


