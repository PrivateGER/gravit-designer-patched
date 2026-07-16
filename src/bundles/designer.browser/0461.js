module.exports = function (module, exports, require) {
        "use strict";
        var o = require(199 /* PROPER */).PROPER,
            i = require(21),
            a = require(248);
        module.exports = function (e) {
            return i(function () {
                return !!a[e]() || "​᠎" !== "​᠎"[e]() || (o && a[e].name !== e);
            });
        };
    };
