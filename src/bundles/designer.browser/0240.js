module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(21),
            a = require(116),
            r = Object,
            s = o("".split);
        module.exports = i(function () {
            return !r("z").propertyIsEnumerable(0);
        })
            ? function (e) {
                  return "String" === a(e) ? s(e, "") : r(e);
              }
            : r;
    };
