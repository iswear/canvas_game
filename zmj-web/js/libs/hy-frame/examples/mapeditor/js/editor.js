
(function (hy, win, doc) {

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
        scaleMode: 0
    });
    app.run(new mapeditor.class.MainWin({
        contextmenu:["呵呵"]
    }));

})(hy, window, document);