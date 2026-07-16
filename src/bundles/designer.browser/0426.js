module.exports = function (module, exports, require) {
        "use strict";
        var o = require(130),
            i = require(117),
            a = RangeError;
        module.exports = function (e) {
            if (void 0 === e) return 0;
            var t = o(e),
                n = i(t);
            if (t !== n) throw new a("Wrong length or index");
            return n;
        };
    };
