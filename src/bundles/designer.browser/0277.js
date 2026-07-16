module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21),
            i = require(35),
            a = /#|\.prototype\./,
            r = function (e, t) {
                var n = l[s(e)];
                return n === d || (n !== c && (i(t) ? o(t) : !!t));
            },
            s = (r.normalize = function (e) {
                return String(e).replace(a, ".").toLowerCase();
            }),
            l = (r.data = {}),
            c = (r.NATIVE = "N"),
            d = (r.POLYFILL = "P");
        module.exports = r;
    };
