module.exports = function (module, exports, require) {
        "use strict";
        (function (e) {
            require.d(exports, "a", function () {
                return o;
            });
            var o = function () {
                return "undefined" != typeof globalThis
                    ? globalThis
                    : "undefined" != typeof window
                      ? window
                      : "undefined" != typeof self
                        ? self
                        : void 0 !== e
                          ? e
                          : void 0;
            };
        }).call(this, require(109));
    };
