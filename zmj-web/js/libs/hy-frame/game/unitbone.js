var hy = hy || {};

(function (hy, win, doc) {

    function syncUnitResponseZone (sender) {
        var height = this.getHeight() / 2;
        if (height < 20) {
            height = 20;
        }
        var responseZone = this.getResponseZone();
        responseZone.minX = -3;
        responseZone.maxX = 3;
        responseZone.minY = -3;
        responseZone.maxY = height;
    }

    function paintUnitBone (sender, dc, zone) {
        dc.beginPath();
        dc.arc(0, 0, 3, 0, Math.PI, true);
        dc.lineTo(0, this.getHeight() / 2);
        dc.closePath();
        dc.setFillStyle(hy.gui.colors.PUREBLACK);
        dc.fill();
    }

    hy.game = hy.game || {};
    hy.game.UnitBone = hy.extend(hy.game.Unit);
    hy.game.UnitBone.prototype.init = function (config) {
        this.super("init", [config]);
        this.addObserver(hy.event.name.HEIGHTCHG, this, syncUnitResponseZone, 0);
        this.addObserver(hy.event.name.PAINT, this, paintUnitBone, 0);
    }
    hy.game.UnitBone.prototype.sync = function () {
        this.super("sync", null);
        syncUnitResponseZone.call(this);
    }

})(hy, window, document);