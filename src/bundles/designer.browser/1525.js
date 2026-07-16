module.exports = function (module, exports, require) {
        "use strict";
        var o = require(130),
            i = require(62),
            a = require(92),
            r = RangeError;
        module.exports = function (e) {
            var t = i(a(this)),
                n = "",
                s = o(e);
            if (s < 0 || s === 1 / 0) throw new r("Wrong number of repetitions");
            for (; s > 0; (s >>>= 1) && (t += t)) 1 & s && (n += t);
            return n;
        };
    };
