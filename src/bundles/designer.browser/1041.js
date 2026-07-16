module.exports = function (module, exports, require) {
        "use strict";
        require(353 /* polyfill:Object */)("Float64", function (e) {
            return function (t, n, o) {
                return e(this, t, n, o);
            };
        });
    };
