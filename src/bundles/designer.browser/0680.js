module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(65),
            r = require(37),
            ReadableStream = require(143),
            l = require(371),
            c = require(323),
            d = require(102),
            u = require(149),
            p = require(74),
            g = !p && u("map", TypeError),
            h = l(function () {
                var e = this.iterator,
                    t = r(i(this.next, e));
                if (!(this.done = !!t.done)) return c(e, this.mapper, [t.value, this.counter++], true);
            });
        o(
            { target: "Iterator", proto: true, real: true, forced: p || g },
            {
                map: function (e) {
                    r(this);
                    try {
                        a(e);
                    } catch (e) {
                        d(this, "throw", e);
                    }
                    return g ? i(g, this, e) : new h(ReadableStream(this), { mapper: e });
                },
            }
        );
    };
