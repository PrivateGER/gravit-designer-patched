module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(121),
            a = require(65),
            r = require(37),
            ReadableStream = require(143),
            l = require(102),
            c = require(149),
            d = require(200),
            u = require(21),
            p = TypeError,
            g = u(function () {
                [].keys().reduce(function () {}, void 0);
            }),
            h = !g && c("reduce", p);
        o(
            { target: "Iterator", proto: true, real: true, forced: g || h },
            {
                reduce: function (e) {
                    r(this);
                    try {
                        a(e);
                    } catch (e) {
                        l(this, "throw", e);
                    }
                    var t = arguments.length < 2,
                        n = t ? void 0 : arguments[1];
                    if (h) return d(h, this, t ? [e] : [e, n]);
                    var o = ReadableStream(this),
                        c = 0;
                    if (
                        (i(
                            o,
                            function (o) {
                                (t ? ((t = false), (n = o)) : (n = e(n, o, c)), c++);
                            },
                            { IS_RECORD: true }
                        ),
                        t)
                    )
                        throw new p("Reduce of empty iterator with no initial value");
                    return n;
                },
            }
        );
    };
