module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(121),
            r = require(65),
            s = require(37),
            ReadableStream = require(143),
            c = require(102),
            d = require(149)("every", TypeError);
        o(
            { target: "Iterator", proto: true, real: true, forced: d },
            {
                every: function (e) {
                    s(this);
                    try {
                        r(e);
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    if (d) return i(d, this, e);
                    var t = ReadableStream(this),
                        n = 0;
                    return !a(
                        t,
                        function (t, o) {
                            if (!e(t, n++)) return o();
                        },
                        { IS_RECORD: true, INTERRUPTED: true }
                    ).stopped;
                },
            }
        );
    };
