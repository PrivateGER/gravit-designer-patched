module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0), require(4), require(32), require(33));
        exports.default = class {
            constructor() {
                this._executions = [];
            }
            step(e) {
                this._executions.push(e);
            }
            abort() {
                this._executions.forEach((e) => e.abort());
            }
        };
    };
