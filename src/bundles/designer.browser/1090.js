module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0), require(8 /* Symbol */));
        const o = require(156),
            GCommonNames = require(220),
            GGoogleDrive = require(556);
        function r() {}
        r.createStorageItem = async function (e) {
            let t = null;
            switch (e.storage) {
                case o.Storage.Gravit:
                    t = await GCommonNames.from(gDesigner.getDefaultStorage(), e);
                    break;
                case o.Storage.GoogleDrive:
                    t = await new GGoogleDrive.Item(gDesigner.getDefaultStorage(), e);
            }
            return t;
        };
        exports.default = r;
    };
