module.exports = function (module, exports, require) {
        "use strict";
        var o = require(61),
            i = require(35),
            a = require(93),
            r = require(300),
            s = require(665),
            l = r("IE_PROTO"),
            c = Object,
            d = c.prototype;
        module.exports = s
            ? c.getPrototypeOf
            : function (e) {
                  var t = a(e);
                  if (o(t, l)) return t[l];
                  var n = t.constructor;
                  return i(n) && t instanceof n ? n.prototype : t instanceof c ? d : null;
              };
    };
