module.exports = function (module, exports, require) {
            "use strict";
            (require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */));
            module.exports = class {
                static isAvailable() {
                    return void 0 !== window.grecaptcha && /^(prod|trunk)/.test(window.env || "") && "localhost" !== location.hostname;
                }
            };
        };
