/*
 nodeData:{
 id:,
 name:,
 leaf:,
 expanded:,
 childNodes:
 }
 */
var hy = hy || {};

(function (hy, win, doc) {

    function layoutTreeNodeView (sender, zone) {
        var nodeDeepth = this._nodePath.length;
        var width = zone.width;
        var height = zone.height;
        this._nodeIcon.setX(nodeDeepth * height + height);
        this._nodeIcon.setY(0);
        this._nodeIcon.setWidth(height);
        this._nodeIcon.setHeight(height);
        this._nodeLabel.setX(nodeDeepth * height + 2 * height);
        this._nodeLabel.setY(0);
        this._nodeLabel.setWidth(width - this._nodeIcon.getWidth() - this._nodeIcon.getX());
        this._nodeLabel.setHeight(height);
        this._nodeExpandIcon.setX(nodeDeepth * this.getHeight());
        this._nodeExpandIcon.setY(0);
        this._nodeExpandIcon.setWidth(height);
        this._nodeExpandIcon.setHeight(height);
    }

    function paintNodeExpandIcon (sender, dc, zone) {
        var width = zone.width;
        var height = zone.height;
        dc.beginPath();
        if (this._nodeData.expanded) {
            dc.moveTo(zone.minX + width / 3, zone.minY + height / 3);
            dc.lineTo(zone.minX + 2 * width / 3, zone.minY + height / 3);
            dc.lineTo(zone.minX + width / 2, zone.minY + 2 * height / 3);
        } else {
            dc.moveTo(zone.minX + width / 3, zone.minY + height / 3);
            dc.lineTo(zone.minX + 2 * width / 3, zone.minY + height / 2);
            dc.lineTo(zone.minX + width / 3, zone.minY + 2 * height / 3);
        }
        dc.closePath();
        dc.setFillStyle(hy.gui.colors.BLACK);
        dc.fill();
    }

    hy.gui = hy.gui || {};
    hy.gui.SimpleTreeNodeView = hy.extend(hy.gui.TreeNodeView);
    hy.gui.SimpleTreeNodeView.prototype.defaultReuseIdentity = "simpletreenode";
    hy.gui.SimpleTreeNodeView.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._nodeIcon = new hy.gui.ImageView({responseEnable: false});
        this._nodeLabel = new hy.gui.TextBox({responseEnable: false, textHorAlign: hy.gui.TEXT_HORALIGN_LEFT});
        this._nodeExpandIcon = new hy.gui.View({responseEnable: true});

        this._nodeData = null;
        this._nodeExpandIcon.addObserver(hy.event.name.PAINT, this, paintNodeExpandIcon, 0);

        this.addChildNodeAtLayer(this._nodeIcon, 0);
        this.addChildNodeAtLayer(this._nodeLabel, 0);
        this.addChildNodeAtLayer(this._nodeExpandIcon, 0);
        this.addObserver(hy.event.name.LAYOUTSUBNODES, this, layoutTreeNodeView, 0);
    }
    hy.gui.SimpleTreeNodeView.prototype.getNodeIcon = function () {
        return this._nodeIcon;
    }
    hy.gui.SimpleTreeNodeView.prototype.getNodeLabel = function () {
        return this._nodeLabel;
    }
    hy.gui.SimpleTreeNodeView.prototype.getNodeExpandIcon = function () {
        return this._nodeExpandIcon;
    }
    hy.gui.SimpleTreeNodeView.prototype.setNodeData = function (nodeData) {
        if (nodeData) {
            this._nodeData = nodeData;
            this._nodeLabel.setText(nodeData.name);
            if (nodeData.leaf) {
                this._nodeExpandIcon.setVisible(false);
            } else {
                this._nodeExpandIcon.setVisible(true);
            }
            this.needLayoutSubNodes();
        }
    }
    hy.gui.SimpleTreeNodeView.prototype.getNodeData = function () {
        return this._nodeData;
    }

})(hy, window, document);