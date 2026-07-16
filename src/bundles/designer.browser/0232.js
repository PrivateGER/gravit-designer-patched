module.exports = function (module, exports, require) {
        "use strict";
        var o = require(79);
        module.exports = function (e, t, n) {
            for (var i in t) o(e, i, t[i], n);
            return e;
        };
    };
