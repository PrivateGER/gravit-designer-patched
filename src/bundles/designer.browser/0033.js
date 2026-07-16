module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(421),
            a = require(422),
            r = require(671),
            s = require(100),
            l = function (e) {
                if (e && e.forEach !== r)
                    try {
                        s(e, "forEach", r);
                    } catch (t) {
                        e.forEach = r;
                    }
            };
        for (var c in i) i[c] && l(RegExp[c] && RegExp[c].prototype);
        l(a);
    };
