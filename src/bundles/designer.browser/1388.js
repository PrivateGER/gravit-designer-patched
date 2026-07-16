module.exports = function (module, exports, require) {
        "use strict";
        require(353 /* polyfill:Object */)("Int8", function (e) {
            return function (t, n, o) {
                return e(this, t, n, o);
            };
        });
    };
