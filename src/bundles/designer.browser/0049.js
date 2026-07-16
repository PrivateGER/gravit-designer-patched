module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = !o(function () {
            return (
                7 !==
                Object.defineProperty({}, 1, {
                    get: function () {
                        return 7;
                    },
                })[1]
            );
        });
    };
