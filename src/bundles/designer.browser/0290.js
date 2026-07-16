module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(49),
            RegExp = require(23),
            r = require(27),
            s = require(61),
            l = require(35),
            c = require(144),
            d = require(62),
            u = require(120),
            p = require(341),
            g = RegExp.Symbol,
            h = g && g.prototype;
        if (i && l(g) && (!("description" in h) || void 0 !== g().description)) {
            var f = {},
                m = function () {
                    var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : d(arguments[0]),
                        t = c(h, this) ? new g(e) : void 0 === e ? g() : g(e);
                    return ("" === e && (f[t] = true), t);
                };
            (p(m, g), (m.prototype = h), (h.constructor = m));
            var y = "Symbol(description detection)" === String(g("description detection")),
                v = r(h.valueOf),
                _ = r(h.toString),
                b = /^Symbol\((.*)\)[^)]+$/,
                w = r("".replace),
                C = r("".slice);
            (u(h, "description", {
                configurable: true,
                get: function () {
                    var e = v(this);
                    if (s(f, e)) return "";
                    var t = _(e),
                        n = y ? C(t, 7, -1) : w(t, b, "$1");
                    return "" === n ? void 0 : n;
                },
            }),
                o({ global: true, constructor: true, forced: true }, { Symbol: m }));
        }
    };
