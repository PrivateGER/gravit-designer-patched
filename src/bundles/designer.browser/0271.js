module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i = require(25),
            a = require(223),
            r = require(222).f,
            s = require(117),
            l = require(62),
            c = require(361),
            d = require(92),
            u = require(362),
            p = require(74),
            g = a("".slice),
            h = Math.min,
            f = u("endsWith");
        i(
            {
                target: "String",
                proto: true,
                forced: !!(p || f || ((o = r(String.prototype, "endsWith")), !o || o.writable)) && !f,
            },
            {
                endsWith: function (e) {
                    var t = l(d(this));
                    c(e);
                    var n = arguments.length > 1 ? arguments[1] : void 0,
                        o = t.length,
                        i = void 0 === n ? o : h(s(n), o),
                        a = l(e);
                    return g(t, i - a.length, i) === a;
                },
            }
        );
    };
