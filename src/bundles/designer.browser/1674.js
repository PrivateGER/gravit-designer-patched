module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(26));
        class o extends Error {
            constructor() {
                (super(...arguments), Error.captureStackTrace(this, o), (this.code = 57005));
            }
            static isPluginError(e) {
                return e && e.code && 57005 === e.code;
            }
        }
        module.exports = o;
    };
