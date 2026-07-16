module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(65),
            r = require(37),
            ReadableStream = require(143),
            l = require(371),
            c = require(323),
            d = require(74),
            u = require(102),
            p = require(149),
            g = !d && p("filter", TypeError),
            h = l(function () {
                for (var e, t, n = this.iterator, o = this.predicate, a = this.next; ; ) {
                    if (((e = r(i(a, n))), (this.done = !!e.done))) return;
                    if (((t = e.value), c(n, o, [t, this.counter++], true))) return t;
                }
            });
        o(
            { target: "Iterator", proto: true, real: true, forced: d || g },
            {
                filter: function (e) {
                    r(this);
                    try {
                        a(e);
                    } catch (e) {
                        u(this, "throw", e);
                    }
                    return g ? i(g, this, e) : new h(ReadableStream(this), { predicate: e });
                },
            }
        );
    };
