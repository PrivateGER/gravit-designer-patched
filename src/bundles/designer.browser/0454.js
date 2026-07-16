module.exports = function (module, exports, require) {
        "use strict";
        var o = require(46),
            i = require(116),
            a = require(43)("match");
        module.exports = function (e) {
            var t;
            return o(e) && (void 0 !== (t = e[a]) ? !!t : "RegExp" === i(e));
        };
    };
