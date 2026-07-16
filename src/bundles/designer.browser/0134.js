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
            f = u("startsWith");
        i(
            {
                target: "String",
                proto: true,
                forced: !!(p || f || ((o = r(String.prototype, "startsWith")), !o || o.writable)) && !f,
            },
            {
                startsWith: function (e) {
                    var t = l(d(this));
                    c(e);
                    var n = s(h(arguments.length > 1 ? arguments[1] : void 0, t.length)),
                        o = l(e);
                    return g(t, n, n + o.length) === o;
                },
            }
        );
    };
