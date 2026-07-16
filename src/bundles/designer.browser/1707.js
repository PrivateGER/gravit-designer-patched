module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(37),
            ReadableStream = require(143),
            s = require(1708),
            l = require(576),
            c = require(102),
            d = require(371),
            u = require(149),
            p = require(74),
            g = !p && u("drop", RangeError),
            h = d(function () {
                for (var e, t = this.iterator, n = this.next; this.remaining; )
                    if ((this.remaining--, (e = a(i(n, t))), (this.done = !!e.done))) return;
                if (((e = a(i(n, t))), !(this.done = !!e.done))) return e.value;
            });
        o(
            { target: "Iterator", proto: true, real: true, forced: p || g },
            {
                drop: function (e) {
                    var t;
                    a(this);
                    try {
                        t = l(s(+e));
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    return g ? i(g, this, t) : new h(ReadableStream(this), { remaining: t });
                },
            }
        );
    };
