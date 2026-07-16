module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0));
        class o extends Error {
            constructor() {
                (super("REPEAT"), (this.name = "GRepeatActionError"));
            }
        }
        exports.default = o;
    };
