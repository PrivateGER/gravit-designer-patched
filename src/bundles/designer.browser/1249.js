module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0));
        var i = o(require(1493));
        class a extends i.default {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super(), (this._options = e));
            }
            getOptions() {
                return this._options;
            }
        }
        exports.default = a;
    };
