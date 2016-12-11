+function ($, hy, win, doc) {

    var g_uiModular = {};
    var g_gameModular = {};

    +function (modular) {

        modular.menu = $("#ID_app_menu").menu().on("menuselect", function(event, ui){
            var item = ui.item;
            if (item.attr("data-menu-path") == "1_2") {
                if (app_dialog_open.dialog("isOpen")) {
                    app_dialog_open.dialog("close");
                } else {
                    app_dialog_open.dialog("open");
                }
            } else if (item.attr("data-menu-path") == "1_3") {
                if (app_dialog_save.dialog("isOpen")) {
                    app_dialog_save.dialog("close");
                } else {
                    app_dialog_save.dialog("open");
                }
            }
        });

        modular.toolbar = $("#ID_app_toolbar").toolbar();

        modular.view = $("#ID_app_view").layout({
            eastWidth: 250,
            southHeight: 120
        });

        modular.tabs_document = $("#ID_app_view_center").tabs({
            isCustom: true
        });

        modular.tabs_res = $("#ID_app_view_right").tabs({
            isCustom: true
        });

        modular.tabs_editor = $("#ID_app_view_bottom").tabs({
            isCustom: true
        });

        modular.dialog_open = $("#ID_dialog_open").dialog({
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

        modular.dialog_save = $("#ID_dialog_save").dialog({
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

    }(g_uiModular);


    +function (modular) {

        function layoutMapRoot (sender, zone) {
            this._map.setX(0);
            this._map.setY(0);
            this._map.setWidth(zone.width);
            this._map.setHeight(zone.height);
        }
        
        function mousedownMap(sender, e) {
            modular.param.isMouseMapDown = true;
        }
        
        function mousemoveMap(sender, e) {
            if (modular.param.isMouseMapDown) {
                if (modular.param.a_mapStatus == 1) {
                    var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
                    var col = Math.round(localLoc.x / this._gridWidth);
                    var row = Math.round(localLoc.y / this._gridHeight);
                    this.setTerrainDatasCell(row, col, 1);
                }
            }
        }

        function mouseupMap(sender, e) {
            modular.param.isMouseMapDown = false;
        }

        modular.class = {};
        modular.class.MapRoot = hy.extend(hy.gui.View);
        modular.class.MapRoot.prototype.init = function (config) {
            this.superCall("init", [config]);
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
        modular.class.MapRoot.prototype.getMap = function () {
            return this._map;
        }


        modular.param = {};
        modular.param.a_mapStatus = 0;  //0移动 1笔刷 2精灵建筑摆放
        modular.param.a_isMouseMapDown = false;

        modular.param.m_mapRoot = new modular.class.MapRoot({});
        modular.param.m_appDocument = new hy.Application({
            width: 400,
            height: 300,
            scaleMode: 0,
            canvas: doc.getElementById("ID_app_canvas")
        });
        modular.param.m_appDocument.run(modular.param.m_mapRoot);

        modular.api = {};
        modular.api.setMapStatus = function (status) {
            if (status == 0) {
                modular.param.a_mapStatus = status;
                modular.param.m_mapRoot.getMap().getRenderLayer().setDragEnable(true);
            } else if (status == 1) {
                modular.param.a_mapStatus = status;
                modular.param.m_mapRoot.getMap().getRenderLayer().setDragEnable(false);
            } else if (status == 3) {
                modular.param.a_mapStatus = status;
                modular.param.m_mapRoot.getMap().getRenderLayer().setDragEnable(true);
            }
        }

    }(g_gameModular);

    g_gameModular.api.setMapStatus(1);


}(jQuery, hy, window, document);