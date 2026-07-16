module.exports = function (module, exports, require) {
        "use strict";
        var o = require(296),
            i = require(258),
            a = o("keys");
        module.exports = function (e) {
            return a[e] || (a[e] = i(e));
        };
    };
