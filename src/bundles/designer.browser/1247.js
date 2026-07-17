module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.shouldShowExternalFileError = function (e) {
                return e instanceof GExternalStorage.Item && !e.hasFileSettings();
            }),
            (exports.updateSaveOptions = function (e, t, n) {
                if (n.getFullName()) {
                    const o = (0, Utils.getExtensionFromString)(
                        n.getFullName(),
                        designerConfig.FILE_FORMATS.map((e) => e.ext.toUpperCase())
                    );
                    if (o && "CDR" === o.toUpperCase())
                        return (
                            (e = new r.default(
                                gDesigner.getSetting("default_cdr_unsupported_effects", r.default.Unsupported.KeepEditable),
                                t.getDefaultCdrVersionForSave()
                            )),
                            ((e = t.updateSaveOptionsLastModifiedDate(e)).singleton = !t.isCloudFile()),
                            e
                        );
                }
                return e;
            }),
            require(38));
        var Utils = require(40),
            designerConfig = require(10),
            r = _interopRequireDefault(require(1248));
        const GExternalStorage = require(388);
    };
