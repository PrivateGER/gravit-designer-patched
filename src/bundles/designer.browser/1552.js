module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = exports.GGoogleDrive = exports.GCloudDrive = void 0));
        var i = o(require(862 /* GCommonNames */));
        const a = (exports.GCloudDrive = i.default);
        var GGoogleDrive = require(1553);
        exports.GGoogleDrive = GGoogleDrive;
        exports.default = { GCloudDrive: a, GGoogleDrive: GGoogleDrive };
    };
