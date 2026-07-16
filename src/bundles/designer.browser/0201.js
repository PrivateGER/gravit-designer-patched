module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(186),
            a = require(35),
            r = require(277),
            s = require(299),
            l = require(43),
            c = require(407),
            d = require(74),
            u = require(213),
            p = i && i.prototype,
            g = l("species"),
            h = false,
            f = a(RegExp.PromiseRejectionEvent),
            m = r("Promise", function () {
                var e = s(i),
                    t = e !== String(i);
                if (!t && 66 === u) return true;
                if (d && (!p.catch || !p.finally)) return true;
                if (!u || u < 51 || !/native code/.test(e)) {
                    var n = new i(function (e) {
                            e(1);
                        }),
                        o = function (e) {
                            e(
                                function () {},
                                function () {}
                            );
                        };
                    if ((((n.constructor = {})[g] = o), !(h = n.then(function () {}) instanceof o))) return true;
                }
                return !(t || ("BROWSER" !== c && "DENO" !== c) || f);
            });
        module.exports = { CONSTRUCTOR: m, REJECTION_EVENT: f, SUBCLASSING: h };
    };
