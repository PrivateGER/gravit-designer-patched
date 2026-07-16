module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(400),
            a = require(88),
            r = require(37),
            s = require(184),
            l = require(405);
        exports.f =
            o && !i
                ? Object.defineProperties
                : function (e, t) {
                      r(e);
                      for (var n, o = s(t), i = l(t), c = i.length, d = 0; c > d; ) a.f(e, (n = i[d++]), o[n]);
                      return e;
                  };
    };
