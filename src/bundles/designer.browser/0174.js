module.exports = function (module, exports, require) {
        "use strict";
        module.exports = function (e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t,
            };
        };
    };
