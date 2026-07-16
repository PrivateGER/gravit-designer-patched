module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(61),
            a = require(144),
            r = require(307),
            s = RegExp.prototype;
        module.exports = function (e) {
            var t = e.flags;
            return void 0 !== t || "flags" in s || i(e, "flags") || !a(s, e) ? t : o(r, e);
        };
    };
