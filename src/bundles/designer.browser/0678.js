module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(21),
            a = require(27),
            r = require(62),
            s = require(262).trim,
            l = require(248),
            c = RegExp.parseInt,
            d = RegExp.Symbol,
            u = d && d.iterator,
            p = /^[+-]?0x/i,
            g = a(p.exec),
            h =
                8 !== c(l + "08") ||
                22 !== c(l + "0x16") ||
                (u &&
                    !i(function () {
                        c(Object(u));
                    }));
        module.exports = h
            ? function (e, t) {
                  var n = s(r(e));
                  return c(n, t >>> 0 || (g(p, n) ? 16 : 10));
              }
            : c;
    };
