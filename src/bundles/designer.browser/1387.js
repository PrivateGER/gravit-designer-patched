module.exports = function (module, exports, require) {
        "use strict";
        module.exports =
            Object.is ||
            function (e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
            };
    };
