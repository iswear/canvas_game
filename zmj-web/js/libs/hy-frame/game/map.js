var hy = hy || {};

var resources = {
    "1":{
        id:1,
        url:"../../res/terrain/grass.jpeg",
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
};

+function (hy, win, doc) {

    function paintGrid (sender, dc, zone) {
        var visibleZone = this.getClipZone();
        var minX = visibleZone.minX - zone.x;
        var minY = visibleZone.minY - zone.y;
        var maxX = minX + visibleZone.width;
        var maxY = minY + visibleZone.height;
        if (minX < zone.minX) {
            minX = zone.minX;
        }
        if (minY < zone.minY) {
            minY = zone.minY;
        }
        if (maxX > zone.maxX) {
            maxX = zone.maxX;
        }
        if (maxY > zone.maxY) {
            maxY = zone.maxY;
        }

        if (minX < maxX && minY < maxY) {
            var x = Math.floor(minX / this._gridWidth) * this._gridWidth + 0.5;
            var y = Math.floor(minY / this._gridHeight) * this._gridHeight + 0.5;
            dc.beginPath();
            for (var endX = maxX + 0.5; x <= endX; x += this._gridWidth) {
                dc.moveTo(x, minY);
                dc.lineTo(x, maxY);
            }
            for (var endY = maxY + 0.5; y <= endY; y += this._gridHeight) {
                dc.moveTo(minX, y);
                dc.lineTo(maxX, y);
            }
            dc.setStrokeStyle("#000");
            dc.stroke();
        }
    }

    function paintTerrain (sender, dc, zone) {
        var visibleZone = this.getClipZone();
        var minX = visibleZone.minX - zone.x;
        var minY = visibleZone.minY - zone.y;
        var maxX = minX + visibleZone.width;
        var maxY = minY + visibleZone.height;
        if (minX < zone.minX) {
            minX = zone.minX;
        }
        if (minY < zone.minY) {
            minY = zone.minY;
        }
        if (maxX > zone.maxX) {
            maxX = zone.maxX;
        }
        if (maxY > zone.maxY) {
            maxY = zone.maxY;
        }
        if (minX < maxX && minY < maxY) {
            var gridWidth = this._gridWidth;
            var gridHeight = this._gridHeight;
            var row = Math.floor(minY / gridHeight);
            var col = Math.floor(minX / gridWidth);
            var endRow = Math.ceil(maxY / gridHeight);
            var endCol = Math.ceil(maxX / gridWidth);
            var startX = col * gridWidth;
            var startY = row * gridHeight;
            var loader = this.getApplication().getFileLoader();
            for (var i = row, y = startY; i < endRow; ++i, y += gridHeight) {
                for (var j = col, x = startX; j < endCol; ++j, x += gridWidth) {
                    var cellInfo;
                    var initCell = false;
                    if (this._terrainDatasCompiled[i]) {
                        if (this._terrainDatasCompiled[i][j]) {
                            cellInfo = this._terrainDatasCompiled[i][j];
                        } else {
                            cellInfo = [];
                            this._terrainDatasCompiled[i][j] = cellInfo;
                            initCell = true;
                        }
                    } else {
                        cellInfo = [];
                        this._terrainDatasCompiled[i] = [];
                        this._terrainDatasCompiled[i][j] = cellInfo;
                        initCell = true;
                    }
                    if (initCell) {
                        if (this._terrainDatas[i]) {
                            if (this._terrainDatas[i][j] != undefined) {
                                var value = this._terrainDatas[i][j];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 2;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 2]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 2]);
                                }
                            }
                            if (this._terrainDatas[i][j + 1] != undefined) {
                                var value = this._terrainDatas[i][j + 1];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 1;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 1]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 1]);
                                }
                            }
                        }
                        if (this._terrainDatas[i + 1]) {
                            if (this._terrainDatas[i + 1][j] != undefined) {
                                var value = this._terrainDatas[i + 1][j];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 8;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 8]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 8]);
                                }
                            }
                            if (this._terrainDatas[i + 1][j + 1] != undefined) {
                                var value = this._terrainDatas[i + 1][j + 1];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 4;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 4]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 4]);
                                }
                            }
                        }
                    }
                    for (var a = 0, size = cellInfo.length; a < size; ++a) {
                        if (resources[cellInfo[a][0]]) {
                            var url = resources[cellInfo[a][0]].url;
                            var clipZone = resources[cellInfo[a][0]].clipUnits[cellInfo[a][1]];
                            var image = loader.getImage(url);
                            if (image) {
                                dc.drawImageExt(image, clipZone[0], clipZone[1], clipZone[2], clipZone[3], x, y, gridWidth, gridHeight);
                            } else {
                                loader.loadImageAsync(url, this, loadTerrainImgCB);
                            }
                        }
                    }
                }
            }
        }
    }

    function loadTerrainImgCB (url, success) {
        if (success) {
            this.refresh();
        } else {
            this._image = null;
        }
    }

    function mousedownRenderLayer (sender, e) {
        var localLoc = sender.transPointFromAncestorNode(e.offsetLoc, null);
        var col = Math.round(localLoc.x / this._gridWidth);
        var row = Math.round(localLoc.y / this._gridHeight);
        this.setTerrainDatasCell(row, col, this._value);
    }

    function dbclickRenderLayer (sender, e) {
        if (this._value == 0) {
            this._value = 1;
        } else {
            this._value = 0;
        }
    }

    hy.game = hy.game || {};
    hy.game.Map = hy.extend(hy.Node);
    hy.game.Map.prototype.defaultClipEnable = true;
    hy.game.Map.prototype.defaultGridWidth = 64;
    hy.game.Map.prototype.defaultGridHeight = Math.round(64 * 0.7);
    hy.game.Map.prototype.defaultRow = 20;
    hy.game.Map.prototype.defaultCol = 20;
    hy.game.Map.prototype.defaultAnchorX = 0;
    hy.game.Map.prototype.defaultAnchorY = 0;
    hy.game.Map.prototype.init = function (config) {
        this.superCall("init", [config]);
        this._row = hy.util.dataType.isUndefined(config.row) ? this.defaultRow : config.row;
        this._col = hy.util.dataType.isUndefined(config.col) ? this.defaultCol : config.col;
        this._gridWidth = hy.util.dataType.isUndefined(config.gridWidth) ? this.defaultGridWidth : config.gridWidth;
        this._gridHeight = hy.util.dataType.isUndefined(config.gridHeight) ? this.defaultGridHeight : config.gridHeight;
        this._terrainDatas = hy.util.dataType.isUndefined(config.terrainDatas) ? [] : config.terrainDatas;
        this._terrainDatasCompiled = [];
        this._value = 1;

        this._renderLayer = new hy.Node({
            x: 0,
            y: 0,
            width: this._col * this._gridWidth,
            height: this._row * this._gridHeight,
            anchorX: 0,
            anchorY: 0,
            rotateZ: 0,
            responseEnable: true,
            dragEnable: true,
            responseZone: {minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity}
        });
        this._renderLayer.addObserver(hy.event.name.PAINT, this, paintGrid, Infinity);
        this._renderLayer.addObserver(hy.event.name.PAINT, this, paintTerrain, 0);
        this._renderLayer.addObserver(hy.event.name.MOUSEDOWN, this, mousedownRenderLayer, 0);
        this._renderLayer.addObserver(hy.event.name.DBLCLICK, this, dbclickRenderLayer, 0);
        this.addChildNodeAtLayer(this._renderLayer, 0);
    }
    hy.game.Map.prototype.setRow = function (row) {
        if (this._row != row) {
            this._row = row;
            this._renderLayer.setHeight(row * this._gridHeight);
        }
    }
    hy.game.Map.prototype.getRow = function () {
        return this._row;
    }
    hy.game.Map.prototype.setCol = function (col) {
        if (this._col != col) {
            this._col = col;
            this._renderLayer.setWidth(col * this._gridWidth);
        }
    }
    hy.game.Map.prototype.getCol = function () {
        return this._col;
    }
    hy.game.Map.prototype.setGridWidth = function (width) {
        if (this._gridWidth != width) {
            this._gridWidth = width;
            this._renderLayer.setWidth(this._col * width);
        }
    }
    hy.game.Map.prototype.getGridWidth = function () {
        return this._gridWidth;
    }
    hy.game.Map.prototype.setGridHeight = function (height) {
        if (this._gridHeight != height) {
            this._gridHeight = height;
            this._renderLayer.setHeight(this._row * height);
        }
    }
    hy.game.Map.prototype.getGridHeight = function () {
        return this._gridHeight;
    }
    hy.game.Map.prototype.setTerrainDatas = function (datas) {
        if (this._terrainDatas != datas) {
            this._terrainDatas = datas;
        }
    }
    hy.game.Map.prototype.getTerrainDatas = function () {
        return this._terrainDatas;
    }
    hy.game.Map.prototype.setTerrainDatasCell = function (row, col, value) {
        if (row >= 0 && col >= 0 && row <= this._row && col <= this._col) {
            if (!this._terrainDatas[row]) {
                this._terrainDatas[row] = [];
            }
            if (this._terrainDatas[row][col] != value) {
                this._terrainDatas[row][col] = value;
                var sRow = (row > 0) ? (row - 1) : 0;
                var sCol = (col > 0) ? (col - 1) : 0;
                var eRow = (row < this._row) ? (row + 1) : this._row;
                var eCol = (col < this._col) ? (col + 1) : this._col;
                for (var i = sRow; i < eRow; ++i) {
                    for (var j = sCol; j < eCol; ++j) {
                        var cellInfo = [];
                        if (!this._terrainDatasCompiled[i]) {
                            this._terrainDatasCompiled[i] = [];
                        }
                        this._terrainDatasCompiled[i][j] = cellInfo;
                        if (this._terrainDatas[i]) {
                            if (this._terrainDatas[i][j] != undefined) {
                                var value = this._terrainDatas[i][j];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 2;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 2]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 2]);
                                }
                            }
                            if (this._terrainDatas[i][j + 1] != undefined) {
                                var value = this._terrainDatas[i][j + 1];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 1;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 1]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 1]);
                                }
                            }
                        }
                        if (this._terrainDatas[i + 1]) {
                            if (this._terrainDatas[i + 1][j] != undefined) {
                                var value = this._terrainDatas[i + 1][j];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 8;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 8]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 8]);
                                }
                            }
                            if (this._terrainDatas[i + 1][j + 1] != undefined) {
                                var value = this._terrainDatas[i + 1][j + 1];
                                var b = 0;
                                var len = cellInfo.length;
                                for (; b < len; ++b) {
                                    if (value == cellInfo[b][0]) {
                                        cellInfo[b][1] += 4;
                                        break;
                                    } else if (value < cellInfo[b][0]) {
                                        cellInfo.splice(b, 0, [value, 4]);
                                        break;
                                    }
                                }
                                if (b == len) {
                                    cellInfo.push([value, 4]);
                                }
                            }
                        }
                    }
                }
                this.refresh();
            }
        }
    }
    hy.game.Map.prototype.getTerrainDatasCell = function (row, col) {
        if (this._terrainDatasCompiled[row]) {
            if (this._terrainDatasCompiled[row][col]) {
                return this._terrainDatasCompiled[row][col];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}(hy, window, document);