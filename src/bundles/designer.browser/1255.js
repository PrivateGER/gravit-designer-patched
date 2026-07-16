module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34));
        var i = _interopRequireDefault(require(78)),
            a = _interopRequireDefault(require(86)),
            r = _interopRequireDefault(require(449 /* GFitAllAction */)),
            s = _interopRequireDefault(require(85)),
            l = _interopRequireDefault(require(237 /* GDocument */)),
            GObject = require(1);
        module.exports = class {
            static handleOpenFileRequest(e, t) {
                gContainer.openStorageFile(e, t, function (n) {
                    let o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const d = t.getType();
                    function u(t) {
                        const n = (t) => {
                            if (t.type === i.default.Type.Activated && t.document === e) {
                                let e = t.document.getStatus();
                                (e === a.default.LoadFailed ||
                                    e === a.default.LoadCancelled ||
                                    gDesigner.executeAction(r.default.ID, void 0, void 0, true),
                                    gDesigner.removeEventListener(i.default, n));
                            }
                        };
                        if (
                            (d !== s.default.OpenFileRequest.Type.Preset && gDesigner.addEventListener(i.default, n),
                            t instanceof l.default.Item)
                        ) {
                            if (
                                (e.setStorageItem(t),
                                e.setIsShared(true),
                                e.load(null, o && o.loadingData),
                                gDesigner.trigger(new i.default(i.default.Type.Modified, e)),
                                d === s.default.OpenFileRequest.Type.Template)
                            ) {
                                e.setDocumentFromTemplate(true);
                                let t = o.category,
                                    n = t && t.split(".");
                                n.length > 1 && (t = n.splice(1).join("."));
                                let i = t.toLowerCase().replace(/\./g, "-");
                                gDesigner.stats("directlink_template_".concat(i), "".concat(o.file.name, " [").concat(o.content.id, "]"));
                            } else if (d === s.default.OpenFileRequest.Type.Preset) {
                                e.setDocumentFromTemplate(true);
                                let t = o.preset.presetCategory
                                    .toLowerCase()
                                    .replace(/[\t-\r \/\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, "-");
                                gDesigner.stats("directlink_preset_".concat(t), o.preset.presetLayout.name);
                            }
                        } else if (t && t.presetLayout) {
                            let n = gDesigner.createScene(),
                                { unit, dpi, width, height } = t.presetLayout,
                                s = t.presetCategory
                                    .toLowerCase()
                                    .replace(/[\t-\r \/\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, "-");
                            (n.setProperties(["ut", "dpi"], [unit, dpi || GObject.GLength.DPI]),
                                n
                                    .getActivePage()
                                    .setProperties(
                                        ["bck", "w", "h"],
                                        [GObject.GRGBColor.WHITE, new GObject.GLength(width, unit).toPoint(), new GObject.GLength(height, unit).toPoint()]
                                    ),
                                e.setTitle(t.presetLayout.id),
                                e.setScene(n),
                                e.setDocumentFromTemplate(true),
                                e.setIsShared(true),
                                gDesigner.stats("directlink_preset_".concat(s), t.presetLayout.name));
                        }
                    }
                    return (u(n), e);
                });
            }
        };
    };
