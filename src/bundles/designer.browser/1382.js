module.exports = function (module, exports, require) {
        "use strict";
        var o = require(1383),
            i = require(61),
            a = require(1384),
            r = require(88).f;
        module.exports = function (e) {
            var t = o.Symbol || (o.Symbol = {});
            i(t, e) || r(t, e, { value: a.f(e) });
        };
    };
