module.exports = function (module, exports, require) {
        "use strict";
        var o = require(131),
            i = require(145),
            a = require(194),
            r = require(203),
            s = require(43)("iterator");
        module.exports = function (e) {
            if (!a(e)) return i(e, s) || i(e, "@@iterator") || r[o(e)];
        };
    };
