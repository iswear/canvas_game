var hy = hy || {};

+function (hy, win, doc) {

    hy.util = hy.util || {};
    hy.util.dataType = {};
    hy.util.dataType.isNumeric = function (value) {
        return isNaN(value);
    }
    hy.util.dataType.isString = function (value) {
        if (value instanceof String) {
            return true;
        } else {
            if ((typeof value) === "string") {
                return true;
            } else {
                return false;
            }
        }
    }
    hy.util.dataType.isArray = function (value) {
        if (value instanceof Array) {
            return true;
        } else {
            if ((typeof value) === "string") {
                return true;
            } else {
                return false;
            }
        }
    }
    hy.util.dataType.isObject = function (value) {
        if (value instanceof  Object) {
            return true;
        } else {
            if ((typeof value) == "object") {
                return true;
            } else {
                return false;
            }
        }
    }
    hy.util.dataType.isUndefined = function (value) {
        return value === undefined;
    }
    hy.util.dataType.clone = function (obj) {
        if (hy.util.dataType.isArray(obj)) {
            var rArr = [];
            for (var i = 0, size = obj.length; i < size; ++i) {
                rArr.push(hy.util.dataType.clone(obj[i]));
            }
            return rArr;
        } else if (hy.util.dataType.isObject(obj)) {
            var rObj = {};
            for (var item in obj) {
                if (obj.hasOwnProperty(item)) {
                    rObj[item] = hy.util.dataType.clone(obj[item]);
                }
            }
            return rObj;
        } else {
            return obj;
        }
    }


}(hy, window, document);