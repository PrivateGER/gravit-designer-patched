module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            a,
            r = require(21),
            s = require(35),
            l = require(46),
            c = require(136),
            d = require(208),
            u = require(79),
            p = require(43),
            g = require(74),
            h = p("iterator"),
            f = false;
        ([].keys && ("next" in (a = [].keys()) ? (i = d(d(a))) !== Object.prototype && (o = i) : (f = true)),
            !l(o) ||
            r(function () {
                var e = {};
                return o[h].call(e) !== e;
            })
                ? (o = {})
                : g && (o = c(o)),
            s(o[h]) ||
                u(o, h, function () {
                    return this;
                }),
            (module.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: f }));
    };
