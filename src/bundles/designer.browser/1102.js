module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i = require(786),
            RegExp = require(23),
            r = require(27),
            s = require(232),
            l = require(558),
            c = require(1106),
            d = require(1107),
            u = require(46),
            p = require(80).enforce,
            g = require(21),
            h = require(452),
            f = Object,
            m = Array.isArray,
            y = f.isExtensible,
            v = f.isFrozen,
            _ = f.isSealed,
            b = f.freeze,
            w = f.seal,
            C = !RegExp.ActiveXObject && "ActiveXObject" in RegExp,
            x = function (e) {
                return function () {
                    return e(this, arguments.length ? arguments[0] : void 0);
                };
            },
            S = c("WeakMap", x, d),
            E = S.prototype,
            A = r(E.set);
        if (h)
            if (C) {
                ((o = d.getConstructor(x, "WeakMap", true)), l.enable());
                var T = r(E.delete),
                    G = r(E.has),
                    P = r(E.get);
                s(E, {
                    delete: function (e) {
                        if (u(e) && !y(e)) {
                            var t = p(this);
                            return (t.frozen || (t.frozen = new o()), T(this, e) || t.frozen.delete(e));
                        }
                        return T(this, e);
                    },
                    has: function (e) {
                        if (u(e) && !y(e)) {
                            var t = p(this);
                            return (t.frozen || (t.frozen = new o()), G(this, e) || t.frozen.has(e));
                        }
                        return G(this, e);
                    },
                    get: function (e) {
                        if (u(e) && !y(e)) {
                            var t = p(this);
                            return (t.frozen || (t.frozen = new o()), G(this, e) ? P(this, e) : t.frozen.get(e));
                        }
                        return P(this, e);
                    },
                    set: function (e, t) {
                        if (u(e) && !y(e)) {
                            var n = p(this);
                            (n.frozen || (n.frozen = new o()), G(this, e) ? A(this, e, t) : n.frozen.set(e, t));
                        } else A(this, e, t);
                        return this;
                    },
                });
            } else
                i &&
                    g(function () {
                        var e = b([]);
                        return (A(new S(), e, 1), !v(e));
                    }) &&
                    s(E, {
                        set: function (e, t) {
                            var n;
                            return (m(e) && (v(e) ? (n = b) : _(e) && (n = w)), A(this, e, t), n && n(e), this);
                        },
                    });
    };
