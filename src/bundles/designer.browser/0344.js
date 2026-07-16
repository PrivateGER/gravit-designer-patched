module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21),
            i = require(23 /* RegExp */).RegExp,
            a = o(function () {
                var e = i("a", "y");
                return ((e.lastIndex = 2), null !== e.exec("abcd"));
            }),
            r =
                a ||
                o(function () {
                    return !i("a", "y").sticky;
                }),
            s =
                a ||
                o(function () {
                    var e = i("^r", "gy");
                    return ((e.lastIndex = 2), null !== e.exec("str"));
                });
        module.exports = { BROKEN_CARET: s, MISSED_STICKY: r, UNSUPPORTED_Y: a };
    };
