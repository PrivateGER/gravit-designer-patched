module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(223),
            a = require(21),
            r = require(324 /* lib:core-js */),
            s = require(37),
            l = require(244),
            c = require(117),
            d = r.ArrayBuffer,
            u = r.DataView,
            p = u.prototype,
            g = i(d.prototype.slice),
            h = i(p.getUint8),
            f = i(p.setUint8);
        o(
            {
                target: "ArrayBuffer",
                proto: true,
                unsafe: true,
                forced: a(function () {
                    return !new d(2).slice(1, void 0).byteLength;
                }),
            },
            {
                slice: function (e, t) {
                    if (g && void 0 === t) return g(s(this), e);
                    for (
                        var n = s(this).byteLength,
                            o = l(e, n),
                            i = l(void 0 === t ? n : t, n),
                            a = new d(c(i - o)),
                            r = new u(this),
                            p = new u(a),
                            m = 0;
                        o < i;

                    )
                        f(p, m++, h(r, o++));
                    return a;
                },
            }
        );
    };
