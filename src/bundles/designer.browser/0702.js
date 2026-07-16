module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(21),
            a = require(27),
            r = require(62),
            s = require(262).trim,
            l = require(248),
            c = a("".charAt),
            d = RegExp.parseFloat,
            u = RegExp.Symbol,
            p = u && u.iterator,
            g =
                1 / d(l + "-0") != -1 / 0 ||
                (p &&
                    !i(function () {
                        d(Object(p));
                    }));
        module.exports = g
            ? function (e) {
                  var t = s(r(e)),
                      n = d(t);
                  return 0 === n && "-" === c(t, 0) ? -0 : n;
              }
            : d;
    };
