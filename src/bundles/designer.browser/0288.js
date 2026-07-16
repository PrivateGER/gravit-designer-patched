module.exports = function (module, exports, require) {
        "use strict";
        var o = require(35),
            i = require(46),
            a = require(175);
        module.exports = function (e, t, n) {
            var r, s;
            return (a && o((r = t.constructor)) && r !== n && i((s = r.prototype)) && s !== n.prototype && a(e, s), e);
        };
    };
