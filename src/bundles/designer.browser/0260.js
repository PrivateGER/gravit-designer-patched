module.exports = function (module, exports, require) {
        "use strict";
        var o = require(110),
            i = require(120),
            a = require(43),
            r = require(49),
            s = a("species");
        module.exports = function (e) {
            var t = o(e);
            r &&
                t &&
                !t[s] &&
                i(t, s, {
                    configurable: true,
                    get: function () {
                        return this;
                    },
                });
        };
    };
