module.exports = function (module, exports, require) {
        "use strict";
        require.r(exports);
        require(355);
        class o extends Error {
            constructor(...e) {
                (super(...e), (this.constructor = o), (this.__proto__ = o.prototype), (this.name = "ExternalFileSettingsError"));
            }
            toString() {
                return this.message;
            }
        }
        exports.default = o;
    };
