module.exports = function (module, exports, require) {
        "use strict";
        require(20);
        var o = require(29),
            i = require(79),
            a = require(306),
            r = require(21),
            s = require(43),
            l = require(100),
            c = s("species"),
            d = RegExp.prototype;
        module.exports = function (e, t, n, u) {
            var p = s(e),
                g = !r(function () {
                    var t = {};
                    return (
                        (t[p] = function () {
                            return 7;
                        }),
                        7 !== ""[e](t)
                    );
                }),
                h =
                    g &&
                    !r(function () {
                        var t = false,
                            n = /a/;
                        return (
                            "split" === e &&
                                (((n = {}).constructor = {}),
                                (n.constructor[c] = function () {
                                    return n;
                                }),
                                (n.flags = ""),
                                (n[p] = /./[p])),
                            (n.exec = function () {
                                return ((t = true), null);
                            }),
                            n[p](""),
                            !t
                        );
                    });
            if (!g || !h || n) {
                var f = /./[p],
                    m = t(p, ""[e], function (e, t, n, i, r) {
                        var s = t.exec;
                        return s === a || s === d.exec
                            ? g && !r
                                ? { done: true, value: o(f, t, n, i) }
                                : { done: true, value: o(e, n, t, i) }
                            : { done: false };
                    });
                (i(String.prototype, e, m[0]), i(d, p, m[1]));
            }
            u && l(d[p], "sham", true);
        };
    };
