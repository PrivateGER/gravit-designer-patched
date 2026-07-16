module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(278),
            a = require(37),
            r = require(46),
            s = require(117),
            l = require(62),
            c = require(92),
            d = require(145),
            u = require(308),
            p = require(279);
        i("match", function (e, t, n) {
            return [
                function (t) {
                    var n = c(this),
                        i = r(t) ? d(t, e) : void 0;
                    return i ? o(i, t, n) : new RegExp(t)[e](l(n));
                },
                function (e) {
                    var o = a(this),
                        i = l(e),
                        r = n(t, o, i);
                    if (r.done) return r.value;
                    if (!o.global) return p(o, i);
                    var c = o.unicode;
                    o.lastIndex = 0;
                    for (var d, g = [], h = 0; null !== (d = p(o, i)); ) {
                        var f = l(d[0]);
                        ((g[h] = f), "" === f && (o.lastIndex = u(i, s(o.lastIndex), c)), h++);
                    }
                    return 0 === h ? null : g;
                },
            ];
        });
    };
