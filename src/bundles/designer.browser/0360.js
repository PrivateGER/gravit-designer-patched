module.exports = function (module, exports, require) {
        "use strict";
        var o = require(43),
            i = require(136),
            a = require(88).f,
            r = o("unscopables"),
            s = Array.prototype;
        (void 0 === s[r] && a(s, r, { configurable: true, value: i(null) }),
            (module.exports = function (e) {
                s[r][e] = true;
            }));
    };
