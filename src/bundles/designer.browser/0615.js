module.exports = function (module, exports, require) {
        "use strict";
        var o = require(110),
            i = require(27),
            a = require(243),
            r = require(404),
            s = require(37),
            l = i([].concat);
        module.exports =
            o("Reflect", "ownKeys") ||
            function (e) {
                var t = a.f(s(e)),
                    n = r.f;
                return n ? l(t, n(e)) : t;
            };
    };
