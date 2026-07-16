module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(29),
            NATIVE_ARRAY_BUFFER_VIEWS = require(152),
            r = require(101),
            s = require(428),
            l = require(93),
            c = require(21),
            d = RegExp.RangeError,
            u = RegExp.Int8Array,
            p = u && u.prototype,
            g = p && p.set,
            h = NATIVE_ARRAY_BUFFER_VIEWS.aTypedArray,
            f = NATIVE_ARRAY_BUFFER_VIEWS.exportTypedArrayMethod,
            m = !c(function () {
                var e = new Uint8ClampedArray(2);
                return (i(g, e, { length: 1, 0: 3 }, 1), 3 !== e[1]);
            }),
            y =
                m &&
                NATIVE_ARRAY_BUFFER_VIEWS.NATIVE_ARRAY_BUFFER_VIEWS &&
                c(function () {
                    var e = new u(2);
                    return (e.set(1), e.set("2", 1), 0 !== e[0] || 2 !== e[1]);
                });
        f(
            "set",
            function (e) {
                h(this);
                var t = s(arguments.length > 1 ? arguments[1] : void 0, 1),
                    n = l(e);
                if (m) return i(g, this, n, t);
                var o = this.length,
                    a = r(n),
                    c = 0;
                if (a + t > o) throw new d("Wrong length");
                for (; c < a; ) this[t + c] = n[c++];
            },
            !m || y
        );
    };
