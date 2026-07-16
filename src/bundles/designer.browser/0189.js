module.exports = function (module, exports, require) {
        "use strict";
        var NATIVE_ARRAY_BUFFER_VIEWS = require(152),
            i = require(427),
            a = require(429),
            r = require(131),
            s = require(29),
            l = require(27),
            c = require(21),
            d = NATIVE_ARRAY_BUFFER_VIEWS.aTypedArray,
            u = NATIVE_ARRAY_BUFFER_VIEWS.exportTypedArrayMethod,
            p = l("".slice);
        u(
            "fill",
            function (e) {
                var t = arguments.length;
                d(this);
                var n = "Big" === p(r(this), 0, 3) ? a(e) : +e;
                return s(i, this, n, t > 1 ? arguments[1] : void 0, t > 2 ? arguments[2] : void 0);
            },
            c(function () {
                var e = 0;
                return (
                    new Int8Array(2).fill({
                        valueOf: function () {
                            return e++;
                        },
                    }),
                    1 !== e
                );
            })
        );
    };
