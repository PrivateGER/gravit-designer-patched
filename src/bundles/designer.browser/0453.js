module.exports = function (module, exports, require) {
        "use strict";
        var o = require(37),
            i = require(46),
            a = require(202);
        module.exports = function (e, t) {
            if ((o(e), i(t) && t.constructor === e)) return t;
            var n = a.f(e);
            return ((0, n.resolve)(t), n.promise);
        };
    };
