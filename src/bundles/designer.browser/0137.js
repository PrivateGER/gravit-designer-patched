module.exports = function (module, exports, require) {
        "use strict";
        var o = require(88).f,
            i = require(61),
            a = require(43)("toStringTag");
        module.exports = function (e, t, n) {
            (e && !n && (e = e.prototype), e && !i(e, a) && o(e, a, { configurable: true, value: t }));
        };
    };
