module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(65),
            a = require(37),
            r = require(185),
            s = require(204),
            l = TypeError;
        module.exports = function (e, t) {
            var n = arguments.length < 2 ? s(e) : t;
            if (i(n)) return a(o(n, e));
            throw new l(r(e) + " is not iterable");
        };
    };
