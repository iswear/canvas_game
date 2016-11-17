var hy = hy || {};

+function (hy, win, doc) {

    hy.util = hy.util || {};
    hy.util.math = hy.util.math || {};

    /*{x:, y:}*/
    hy.util.math.vector = {};
    hy.util.math.vector.getAngle = function (vector) {
        try {
            if (vector.x == 0 && vector.y == 0) {
                return 0;
            } else {
                return Math.atan2(vector.x, vector.y);
            }
        } catch (err) {
            throw "the param is not a vector"
        }
    }

    hy.util.math.vector.getNormalizeVector = function (vector) {
        try {
            var mold = hy.util.math.vector.getMold(vector);
            return {x:vector.x / mold, y: vector.y / mold};
        } catch (err) {
            throw "the param is not a vector";
        }
    }

    hy.util.math.vector.getMoldSquare = function (vector) {
        try {
            return vector.x * vector.x + vector.y * vector.y;
        } catch (err) {
            throw "the param is not a vector";
        }
    }

    hy.util.math.vector.getMold = function (vector) {
        try {
            return Math.sqrt(hy.util.math.vector.getMoldSquare(vector));
        } catch (err) {
            throw "the param is not vector";
        }
    }

    /*{x:,y:,width:,height:}*/
    hy.util.math.rect = {};
    /*{width:, height:}*/
    hy.util.math.size = {};
    /*{x:,y:,radius:}*/
    hy.util.math.circle = {};
    /*[{x:,y:},{x:,y:}]*/
    hy.util.math.line = {};
    /*[{x:,y:},{x:,y:}]*/
    hy.util.math.polygon = {};
    /*{minX:,maxX:,minY:,maxY:}*/

}(hy, window, document);