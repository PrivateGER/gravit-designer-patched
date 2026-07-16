module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21),
            i = require(23 /* RegExp */).RegExp;
        module.exports = o(function () {
            var e = i(".", "s");
            return !(e.dotAll && e.test("\n") && "s" === e.flags);
        });
    };
