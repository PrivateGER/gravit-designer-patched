module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(278),
            a = require(37),
            r = require(46),
            s = require(92),
            l = require(1387),
            c = require(62),
            d = require(145),
            u = require(279);
        i("search", function (e, t, n) {
            return [
                function (t) {
                    var n = s(this),
                        i = r(t) ? d(t, e) : void 0;
                    return i ? o(i, t, n) : new RegExp(t)[e](c(n));
                },
                function (e) {
                    var o = a(this),
                        i = c(e),
                        r = n(t, o, i);
                    if (r.done) return r.value;
                    var s = o.lastIndex;
                    l(s, 0) || (o.lastIndex = 0);
                    var d = u(o, i);
                    return (l(o.lastIndex, s) || (o.lastIndex = s), null === d ? -1 : d.index);
                },
            ];
        });
    };
