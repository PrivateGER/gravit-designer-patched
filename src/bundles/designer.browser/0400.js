module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(21);
        module.exports =
            o &&
            i(function () {
                return (
                    42 !==
                    Object.defineProperty(function () {}, "prototype", {
                        value: 42,
                        writable: false,
                    }).prototype
                );
            });
    };
