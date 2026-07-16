module.exports = function (module, exports, require) {
        "use strict";
        var o = require(124),
            i = require(29),
            a = require(408),
            r = require(93),
            s = require(101),
            l = require(246),
            c = require(204),
            d = require(305),
            u = require(697),
            p = require(152 /* NATIVE_ARRAY_BUFFER_VIEWS */).aTypedArrayConstructor,
            g = require(429);
        module.exports = function (e) {
            var t,
                n,
                h,
                f,
                m,
                y,
                v,
                _,
                b = a(this),
                w = r(e),
                C = arguments.length,
                x = C > 1 ? arguments[1] : void 0,
                S = void 0 !== x,
                E = c(w);
            if (E && !d(E)) for (_ = (v = l(w, E)).next, w = []; !(y = i(_, v)).done; ) w.push(y.value);
            for (S && C > 2 && (x = o(x, arguments[2])), n = s(w), h = new (p(b))(n), f = u(h), t = 0; n > t; t++)
                ((m = S ? x(w[t], t) : w[t]), (h[t] = f ? g(m) : +m));
            return h;
        };
    };
