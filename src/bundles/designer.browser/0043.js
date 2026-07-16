module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(296),
            a = require(61),
            r = require(258),
            s = require(295),
            l = require(398),
            c = RegExp.Symbol,
            d = i("wks"),
            u = l ? c.for || c : (c && c.withoutSetter) || r;
        module.exports = function (e) {
            return (a(d, e) || (d[e] = s && a(c, e) ? c[e] : u("Symbol." + e)), d[e]);
        };
    };
