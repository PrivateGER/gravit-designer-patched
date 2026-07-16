module.exports = function (module, exports, require) {
        "use strict";
        require.r(exports);
        class o extends Error {
            constructor(...e) {
                (super(...e), (this.constructor = o), (this.__proto__ = o.prototype), (this.name = "GError"));
            }
            toString() {
                return "[Object GError]";
            }
        }
        exports.default = o;
    };
