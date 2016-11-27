+function ($) {

    var app_menu = $("#ID_menu").menu().on("menuselect", function(event, ui){
        var item = ui.item;
        if (item.attr("data-menu-path") == "1$2") {
            if (app_dialog_open.dialog("isOpen")) {
                app_dialog_open.dialog("close");
            } else {
                app_dialog_open.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "1$3") {
            if (app_dialog_save.dialog("isOpen")) {
                app_dialog_save.dialog("close");
            } else {
                app_dialog_save.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "2$1") {
            if (app_dialog_brush.dialog("isOpen")) {
                item.find(".i-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_brush.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_brush.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "2$2") {
            if (app_dialog_sprite.dialog("isOpen")) {
                item.find(".ui-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_sprite.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_sprite.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "2$3") {
            if (app_dialog_image.dialog("isOpen")) {
                item.find(".ui-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_image.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_image.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "2$4") {
            if (app_dialog_music.dialog("isOpen")) {
                item.find(".ui-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_music.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_music.dialog("open");
            }
        } else if (item.attr("data-menu-path") == "2$5") {
            if (app_dialog_effect.dialog("isOpen")) {
                item.find(".ui-icon").removeClass("ui-icon-check").addClass("ui-icon-blank");
                app_dialog_effect.dialog("close");
            } else {
                item.find(".ui-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                app_dialog_effect.dialog("open");
            }
        }
    });

    var app_toolbar = $("#ID_toolbar").toolbar();

    var app_dialog_open = $("#ID_dialog_open").dialog({
        autoOpen: false,
        modal: true,
        minTop: 61,
        minLeft: 61,
        position: {
            my: 'center',
            at: 'center',
            of: window
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
        minTop: 61,
        minLeft: 61,
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

    var app_dialog_brush = $("#ID_dialog_brush").dialog({
        autoOpen: false,
        minTop: 61,
        minLeft: 61
    });

    var app_dialog_sprite = $("#ID_dialog_sprite").dialog({
        autoOpen: false,
        minTop: 61,
        minLeft: 61
    });

    var app_dialog_image = $("#ID_dialog_image").dialog({
        autoOpen: false,
        minTop: 61,
        minLeft: 61
    });

    var app_dialog_music = $("#ID_dialog_music").dialog({
        autoOpen: false,
        minTop: 61,
        minLeft: 61
    });

    var app_dialog_effect = $("#ID_dialog_effect").dialog({
        autoOpen: false,
        minTop: 61,
        minLeft: 61
    });
}(jQuery);