module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(37),
            a = require(35),
            r = require(116),
            s = require(306),
            l = TypeError;
        module.exports = function (e, t) {
            var n = e.exec;
            if (a(n)) {
                var c = o(n, e, t);
                return (null !== c && i(c), c);
            }
            if ("RegExp" === r(e)) return o(s, e, t);
            throw new l("RegExp#exec called on incompatible receiver");
        };
    };
