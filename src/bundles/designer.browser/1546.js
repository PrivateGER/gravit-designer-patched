module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            Object.defineProperty(exports, "GFilesPanelViewBase", {
                enumerable: true,
                get: function () {
                    return a.default;
                },
            }),
            Object.defineProperty(exports, "GFilesPanelViewNative", {
                enumerable: true,
                get: function () {
                    return i.default;
                },
            }),
            (exports.default = void 0));
        var i = _interopRequireDefault(require(1547 /* GFilesPanelViewNative */)),
            a = _interopRequireDefault(require(1300 /* GFilesPanelViewBase */));
        exports.default = {
            GFilesPanelViewNative: i.default,
            GFilesPanelViewBase: a.default,
        };
    };
