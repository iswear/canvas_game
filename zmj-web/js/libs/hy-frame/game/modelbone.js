var hy = hy || {};

+function (hy, win, doc) {

    function syncModelResponseZone (sender) {
        var height = this.getHeight() / 2;
        if (height < 30) {
            height = 30;
        }
        var responseZone = this.getResponseZone();
        responseZone.minX = -3;
        responseZone.maxX = 3;
        responseZone.minY = -3;
        responseZone.maxY = height;
    }

    function paintModelBone (sender, dc, zone) {
        var height = this.getHeight() / 2;
        if (height < 30) {
            height = 30;
        }
        dc.beginPath();
        dc.arc(0, 0, 3, 0, Math.PI, true);
        dc.lineTo(0, height);
        dc.closePath();
        dc.setFillStyle(hy.gui.colors.PUREBLACK);
        dc.fill();
    }

    hy.game = hy.game || {};
    hy.game.ModelBone = hy.extend(hy.game.Model);
    hy.game.ModelBone.prototype.init = function (config) {
        this.superCall("init", [config]);
        this.addObserver(hy.event.name.HEIGHTCHG, this, syncModelResponseZone, 0);
        this.addObserver(hy.event.name.PAINT, this, paintModelBone, Infinity);
    }
    hy.game.ModelBone.prototype.sync = function () {
        this.superCall("sync", null);
        syncModelResponseZone.call(this);
    }

}(hy, window, document);