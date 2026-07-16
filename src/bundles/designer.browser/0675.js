module.exports = function (module, exports, require) {
        "use strict";
        var o = require(124),
            i = require(29),
            a = require(93),
            r = require(323),
            s = require(305),
            l = require(302),
            c = require(101),
            d = require(420),
            u = require(246),
            p = require(204),
            g = Array;
        module.exports = function (e) {
            var t = a(e),
                n = l(this),
                h = arguments.length,
                f = h > 1 ? arguments[1] : void 0,
                m = void 0 !== f;
            m && (f = o(f, h > 2 ? arguments[2] : void 0));
            var y,
                v,
                _,
                b,
                w,
                C,
                x = p(t),
                S = 0;
            if (!x || (this === g && s(x)))
                for (y = c(t), v = n ? new this(y) : g(y); y > S; S++) ((C = m ? f(t[S], S) : t[S]), d(v, S, C));
            else
                for (v = n ? new this() : [], w = (b = u(t, x)).next; !(_ = i(w, b)).done; S++)
                    ((C = m ? r(b, f, [_.value, S], true) : _.value), d(v, S, C));
            return ((v.length = S), v);
        };
    };
