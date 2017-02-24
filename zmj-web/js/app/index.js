(function ($, hy, win, doc) {

    /**
     * jquery ui 层
     * @type {{}}
     */
    var g_uiModular = {};

    // 菜单
    g_uiModular.menu = (function () {
        return $("#ID_app_menu").menu().on("menuselect", function(event, ui){
            var item = ui.item;
            if (item.attr("data-menu-path") == "1_2") {
                if (g_uiModular.dialog_open.dialog("isOpen")) {
                    g_uiModular.dialog_open.dialog("close");
                } else {
                    g_uiModular.dialog_open.dialog("open");
                }
            } else if (item.attr("data-menu-path") == "1_3") {
                if (g_uiModular.dialog_save.dialog("isOpen")) {
                    g_uiModular.dialog_save.dialog("close");
                } else {
                    g_uiModular.dialog_save.dialog("open");
                }
            }
        });
    })();

    // 工具栏
    g_uiModular.toolbar = (function () {
        return $("#ID_app_toolbar").toolbar();
    })();

    // 主界面布局
    g_uiModular.layout = (function () {
        return $("#ID_app_layout").layout({
            eastWidth: 250,
            southHeight: 120
        });
    })();

    // 文档区域tabs
    g_uiModular.tabs_document = (function () {
        return $("#ID_app_layout_center").tabs({
            isCustom: true
        });
    })();

    // 资源区域tabs
    g_uiModular.tabs_resources = (function () {
        return $("#ID_app_layout_east").tabs({
            isCustom: true
        });
    })();

    // 控制界面tabs
    g_uiModular.tabs_controls = (function () {
        return $("#ID_app_layout_bottom").tabs({
            isCustom: true
        });
    })();

    // 编辑工具树
    g_uiModular.tree_tool = (function () {
        return $("#ID_app_panel_tool").tree({
            nodeEditable: false,
            collapseIcon: null,
            expandIcon: null,
            leafIcon: null,
            root: {
                text: '工具',
                leaf: false,
                expanded: false,
                children: [
                    {
                        text: '选择工具',
                        leaf: true
                    } , {
                        text: '地形笔刷',
                        leaf: true
                    } , {
                        text: '游戏精灵',
                        leaf: true
                    } , {
                        text: '游戏音效',
                        leaf: false,
                        children: [
                            {
                                text: 'item1',
                                leaf: true
                            }
                        ]
                    }
                ]
            }
        });
    })();


    // 打开文档dialog
    g_uiModular.dialog_open = (function () {
        return $("#ID_dialog_open").dialog({
            autoOpen: false,
            modal: true,
            appendTo: "#ID_app",
            position: {
                my: 'center',
                at: 'center',
                of: $("#ID_app")
            },
            buttons: [
                {
                    text: "打开",
                    click: function () {
                        $(this).dialog("close");
                    }
                },{
                    text: "取消",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    })();

    g_uiModular.dialog_save = (function () {
        return $("#ID_dialog_save").dialog({
            autoOpen: false,
            modal: true,
            appendTo: "#ID_app",
            position: {
                my: "center",
                at: "center",
                of: $("#ID_app")
            },
            buttons: [
                {
                    text: "保存",
                    click: function () {
                        $(this).dialog("close");
                    }
                },{
                    text: "取消",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    })();

    // 保存文档dialog

    /**
     * hyframe 层
     * @type {{}}
     */

    var g_gameModular = {};

    g_gameModular.map = (function () {

        var isMouseMapDown = false;
        var mapStatus = 1;

        function layoutMapRoot (sender, zone) {
            this._map.setX(0);
            this._map.setY(0);
            this._map.setWidth(zone.width);
            this._map.setHeight(zone.height);
        }

        function mousedownMap(sender, e) {
            isMouseMapDown = true;
            if (mapStatus == 1) {
                var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                var col = Math.round(localLoc.x / this._gridWidth);
                var row = Math.round(localLoc.y / this._gridHeight);
                this.setTerrainDatasCell(row, col, 1);
            }
        }

        function mousemoveMap(sender, e) {
            if (isMouseMapDown) {
                if (mapStatus == 1) {
                    var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                    var col = Math.round(localLoc.x / this._gridWidth);
                    var row = Math.round(localLoc.y / this._gridHeight);
                    this.setTerrainDatasCell(row, col, 1);
                }
            }
        }

        function mouseupMap(sender, e) {
            isMouseMapDown = false;
        }

        var Map = hy.extend(hy.gui.View);
        Map.prototype.init = function (config) {
            this.super("init", [config]);
            this._map = new hy.game.Map({
                terrainRes: {
                    "1":{
                        id:1,
                        url:"js/libs/hy-frame/res/terrain/grass.jpeg",
                        clipUnits:[
                            [0,0,64,64],
                            [0,64,64,64],
                            [0,128,64,64],
                            [0,192,64,64],
                            [64,0,64,64],
                            [64,64,64,64],
                            [64,128,64,64],
                            [64,192,64,64],
                            [128,0,64,64],
                            [128,64,64,64],
                            [128,128,64,64],
                            [128,192,64,64],
                            [192,0,64,64],
                            [192,64,64,64],
                            [192,128,64,64],
                            [192,192,64,64],
                            [256,0,64,64],
                            [256,64,64,64],
                            [256,128,64,64],
                            [256,192,64,64]
                        ]
                    }
                }
            });
            this._map.getRenderLayer().addObserver(hy.event.name.MOUSEDOWN, this._map, mousedownMap, 0);
            this._map.getRenderLayer().addObserver(hy.event.name.MOUSEUP, this._map, mouseupMap, 0);
            this._map.getRenderLayer().addObserver(hy.event.name.MOUSEMOVE, this._map, mousemoveMap, 0);
            this.addChildNodeAtLayer(this._map, 0);
            this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutMapRoot, 0);
        }

        return new Map({});

    })();
    
    g_gameModular.sprite = (function () {
        return 1;
    })();

    g_gameModular.application = (function () {
        return new hy.Application({
            width: 400,
            height: 300,
            scaleMode: 0,
            canvas: doc.getElementById("ID_app_canvas")
        });
    })();
    
    
    + function () {
        g_gameModular.application.run(g_gameModular.map);
    }();

})(jQuery, hy, window, document);