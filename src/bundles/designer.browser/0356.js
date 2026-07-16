module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            RegExp = require(23),
            a = require(27),
            r = require(277),
            s = require(288),
            l = require(100),
            c = require(136),
            d = require(243).f,
            u = require(144),
            p = require(454),
            g = require(62),
            h = require(460),
            f = require(344),
            m = require(1040),
            y = require(79),
            v = require(21),
            _ = require(61),
            b = require(80).enforce,
            w = require(260),
            C = require(43),
            x = require(458),
            S = require(459),
            E = C("match"),
            A = RegExp.RegExp,
            T = A.prototype,
            G = RegExp.SyntaxError,
            P = a(T.exec),
            D = a("".charAt),
            L = a("".replace),
            I = a("".indexOf),
            k = a("".slice),
            O = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,
            F = /a/g,
            R = /a/g,
            M = new A(F) !== F,
            N = f.MISSED_STICKY,
            B = f.UNSUPPORTED_Y,
            U =
                o &&
                (!M ||
                    N ||
                    x ||
                    S ||
                    v(function () {
                        return ((R[E] = false), A(F) !== F || A(R) === R || "/a/i" !== String(A(F, "i")));
                    }));
        if (r("RegExp", U)) {
            for (
                var $ = function (e, t) {
                        var n,
                            o,
                            i,
                            a,
                            r,
                            d,
                            f = u(T, this),
                            m = p(e),
                            y = void 0 === t,
                            v = [],
                            w = e;
                        if (!f && m && y && e.constructor === $) return e;
                        if (
                            ((m || u(T, e)) && ((e = e.source), y && (t = h(w))),
                            (e = void 0 === e ? "" : g(e)),
                            (t = void 0 === t ? "" : g(t)),
                            (w = e),
                            x && ("dotAll" in F) && (o = !!t && I(t, "s") > -1) && (t = L(t, /s/g, "")),
                            (n = t),
                            N && ("sticky" in F) && (i = !!t && I(t, "y") > -1) && B && (t = L(t, /y/g, "")),
                            S &&
                                ((e = (a = (function (e) {
                                    for (
                                        var t, n = e.length, o = 0, i = "", a = [], r = c(null), s = false, l = false, d = 0, u = "";
                                        o <= n;
                                        o++
                                    ) {
                                        if ("\\" === (t = D(e, o))) t += D(e, ++o);
                                        else if ("]" === t) s = false;
                                        else if (!s)
                                            switch (true) {
                                                case "[" === t:
                                                    s = true;
                                                    break;
                                                case "(" === t:
                                                    if (((i += t), "?:" === k(e, o + 1, o + 3))) continue;
                                                    (P(O, k(e, o + 1)) && ((o += 2), (l = true)), d++);
                                                    continue;
                                                case ">" === t && l:
                                                    if ("" === u || _(r, u)) throw new G("Invalid capture group name");
                                                    ((r[u] = true), (a[a.length] = [u, d]), (l = false), (u = ""));
                                                    continue;
                                            }
                                        l ? (u += t) : (i += t);
                                    }
                                    return [i, a];
                                })(e))[0]),
                                (v = a[1])),
                            (r = s(A(e, t), f ? this : T, $)),
                            (o || i || v.length) &&
                                ((d = b(r)),
                                o &&
                                    ((d.dotAll = true),
                                    (d.raw = $(
                                        (function (e) {
                                            for (var t, n = e.length, o = 0, i = "", a = false; o <= n; o++)
                                                "\\" !== (t = D(e, o))
                                                    ? a || "." !== t
                                                        ? ("[" === t ? (a = true) : "]" === t && (a = false), (i += t))
                                                        : (i += "[\\s\\S]")
                                                    : (i += t + D(e, ++o));
                                            return i;
                                        })(e),
                                        n
                                    ))),
                                i && (d.sticky = true),
                                v.length && (d.groups = v)),
                            e !== w)
                        )
                            try {
                                l(r, "source", "" === w ? "(?:)" : w);
                            } catch (e) {}
                        return r;
                    },
                    j = d(A),
                    K = 0;
                j.length > K;

            )
                m($, A, j[K++]);
            ((T.constructor = $), ($.prototype = T), y(RegExp, "RegExp", $, { constructor: true }));
        }
        w("RegExp");
    };
