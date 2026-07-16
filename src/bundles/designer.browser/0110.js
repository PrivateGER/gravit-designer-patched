module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(35),
            a = function (e) {
                return i(e) ? e : void 0;
            };
        module.exports = function (e, t) {
            return arguments.length < 2 ? a(RegExp[e]) : RegExp[e] && RegExp[e][t];
        };
    };
