module.exports = function (module, exports, require) {
        "use strict";
        var o = require(101);
        module.exports = function (e, t, n) {
            for (var i = 0, a = arguments.length > 2 ? n : o(t), r = new e(a); a > i; ) r[i] = t[i++];
            return r;
        };
    };
