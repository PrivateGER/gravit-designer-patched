module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0), require(19), require(26));
        class o extends Error {
            constructor() {
                (super(...arguments),
                    (this.constructor = o),
                    (this.__proto__ = o.prototype),
                    (this.name = "GMSTeamsModeUserNotFoundError"));
            }
            toString() {
                return this.message;
            }
        }
        exports.default = o;
    };
