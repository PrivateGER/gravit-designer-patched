module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(1375),
            a = require(93),
            r = require(101),
            s = require(130),
            l = require(573);
        o(
            { target: "Array", proto: true },
            {
                flat: function () {
                    var e = arguments.length ? arguments[0] : void 0,
                        t = a(this),
                        n = r(t),
                        o = l(t, 0);
                    return ((o.length = i(o, t, t, n, 0, void 0 === e ? 1 : s(e))), o);
                },
            }
        );
    };
