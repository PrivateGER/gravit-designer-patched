module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = 0,
            a = Math.random(),
            r = o((1).toString);
        module.exports = function (e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + r(++i + a, 36);
        };
    };
