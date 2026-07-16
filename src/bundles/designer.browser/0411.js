module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(49),
            a = Object.getOwnPropertyDescriptor;
        module.exports = function (e) {
            if (!i) return RegExp[e];
            var t = a(RegExp, e);
            return t && t.value;
        };
    };
