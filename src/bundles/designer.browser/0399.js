module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(21),
            a = require(242);
        module.exports =
            !o &&
            !i(function () {
                return (
                    7 !==
                    Object.defineProperty(a("div"), "a", {
                        get: function () {
                            return 7;
                        },
                    }).a
                );
            });
    };
