module.exports = function (module, exports, require) {
        "use strict";
        var o = require(93),
            i = require(244),
            a = require(101);
        module.exports = function (e) {
            for (
                var t = o(this),
                    n = a(t),
                    r = arguments.length,
                    s = i(r > 1 ? arguments[1] : void 0, n),
                    l = r > 2 ? arguments[2] : void 0,
                    c = void 0 === l ? n : i(l, n);
                c > s;

            )
                t[s++] = e;
            return t;
        };
    };
