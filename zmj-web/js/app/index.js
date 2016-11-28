+function ($, hy, win, doc) {

    var app_menu = $("#ID_app_menu").menu().on("menuselect", function(event, ui){
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
        } else if (item.attr("data-menu-path") == "2_1") {
            if (app_dialog_resource.dialog("isOpen")) {
                item.find(".ui-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_resource.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_resource.dialog("option", "position", {
                    my: "right top",
                    at: "right top",
                    of: $("#ID_app_view"),
                    collision: "flip"
                });
                app_dialog_resource.dialog("open");
            }
        }
    });

    var app_toolbar = $("#ID_app_toolbar").toolbar();

    var app_dialog_open = $("#ID_dialog_open").dialog({
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

    var app_dialog_save = $("#ID_dialog_save").dialog({
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

    var app_dialog_resource = $("#ID_dialog_resource").dialog({
        autoOpen: false,
        appendTo: "#ID_app_view",
        height: 400
    });

    var app_tabs_resource = $("#ID_tabs_resource").tabs({
        heightStyle: "fill"
    });


    function layoutMapEditor (sender, zone) {
        this._map.setX(0);
        this._map.setY(0);
        this._map.setWidth(zone.width);
        this._map.setHeight(zone.height);
    }

    var mapeditor = mapeditor || {};
    mapeditor.class = mapeditor.class || {};
    mapeditor.class.MainWin = hy.extend(hy.gui.View);
    mapeditor.class.MainWin.prototype.init = function(config){
        this.superCall("init",[config]);
        this._map = new hy.game.Map({
            responseZone:{minX:-Infinity, minY:-Infinity, maxX:Infinity, maxY:Infinity},
            responseEnable:true,
            contextMenu:["移动"]
        });
        this.addChildNodeAtLayer(this._map, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutMapEditor, 0);
    }

    var app = new hy.Application({
        width: 400,
        height: 300,
        scaleMode: 0,
        canvas: doc.getElementById("ID_game_canvas")
    });
    app.run(new mapeditor.class.MainWin({
        contextmenu:["呵呵"]
    }));

}(jQuery, hy, window, document);