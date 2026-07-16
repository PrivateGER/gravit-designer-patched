module.exports = function (module, exports, require) {
        "use strict";
        var o = require(35),
            i = require(88),
            a = require(401),
            r = require(298);
        module.exports = function (e, t, n, s) {
            s || (s = {});
            var l = s.enumerable,
                c = void 0 !== s.name ? s.name : t;
            if ((o(n) && a(n, c, s), s.global)) l ? (e[t] = n) : r(t, n);
            else {
                try {
                    s.unsafe ? e[t] && (l = true) : delete e[t];
                } catch (e) {}
                l
                    ? (e[t] = n)
                    : i.f(e, t, {
                          value: n,
                          enumerable: false,
                          configurable: !s.nonConfigurable,
                          writable: !s.nonWritable,
                      });
            }
            return e;
        };
    };
