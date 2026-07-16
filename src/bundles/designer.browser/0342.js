module.exports = function (module, exports, require) {
        "use strict";
        var o = require(37),
            i = require(408),
            a = require(194),
            r = require(43)("species");
        module.exports = function (e, t) {
            var n,
                s = o(e).constructor;
            return void 0 === s || a((n = o(s)[r])) ? t : i(n);
        };
    };
