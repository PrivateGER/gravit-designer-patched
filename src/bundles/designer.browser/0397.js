module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(46),
            a = require(241),
            r = require(145),
            s = require(614),
            l = require(43),
            c = TypeError,
            d = l("toPrimitive");
        module.exports = function (e, t) {
            if (!i(e) || a(e)) return e;
            var n,
                l = r(e, d);
            if (l) {
                if ((void 0 === t && (t = "default"), (n = o(l, e, t)), !i(n) || a(n))) return n;
                throw new c("Can't convert object to primitive value");
            }
            return (void 0 === t && (t = "number"), s(e, t));
        };
    };
