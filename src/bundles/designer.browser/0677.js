module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(27),
            a = require(244),
            r = RangeError,
            s = String.fromCharCode,
            l = String.fromCodePoint,
            c = i([].join);
        o(
            { target: "String", stat: true, arity: 1, forced: !!l && 1 !== l.length },
            {
                fromCodePoint: function (e) {
                    for (var t, n = [], o = arguments.length, i = 0; o > i; ) {
                        if (((t = +arguments[i++]), a(t, 1114111) !== t)) throw new r(t + " is not a valid code point");
                        n[i] = t < 65536 ? s(t) : s(55296 + ((t -= 65536) >> 10), (t % 1024) + 56320);
                    }
                    return c(n, "");
                },
            }
        );
    };
