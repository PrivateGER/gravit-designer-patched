module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34));
        var GDocumentEvent = _interopRequireDefault(require(78)),
            DocumentStatus = _interopRequireDefault(require(86)),
            GFitAllAction = _interopRequireDefault(require(449 /* GFitAllAction */)),
            GContainer = _interopRequireDefault(require(85 /* GContainer */)),
            GStorage = _interopRequireDefault(require(237 /* GStorage */)),
            GObject = require(1);
        module.exports = class {
            static handleOpenFileRequest(document, request) {
                gContainer.openStorageFile(document, request, function (openedItem) {
                    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const requestType = request.getType();
                    function applyOpenedItem(item) {
                        const onDocumentActivated = (event) => {
                            if (event.type === GDocumentEvent.default.Type.Activated && event.document === document) {
                                let status = event.document.getStatus();
                                (status === DocumentStatus.default.LoadFailed ||
                                    status === DocumentStatus.default.LoadCancelled ||
                                    gDesigner.executeAction(GFitAllAction.default.ID, void 0, void 0, true),
                                    gDesigner.removeEventListener(GDocumentEvent.default, onDocumentActivated));
                            }
                        };
                        if (
                            (requestType !== GContainer.default.OpenFileRequest.Type.Preset && gDesigner.addEventListener(GDocumentEvent.default, onDocumentActivated),
                            item instanceof GStorage.default.Item)
                        ) {
                            if (
                                (document.setStorageItem(item),
                                document.setIsShared(true),
                                document.load(null, options && options.loadingData),
                                gDesigner.trigger(new GDocumentEvent.default(GDocumentEvent.default.Type.Modified, document)),
                                requestType === GContainer.default.OpenFileRequest.Type.Template)
                            ) {
                                document.setDocumentFromTemplate(true);
                                let categoryPath = options.category,
                                    categoryParts = categoryPath && categoryPath.split(".");
                                categoryParts.length > 1 && (categoryPath = categoryParts.splice(1).join("."));
                                let categorySlug = categoryPath.toLowerCase().replace(/\./g, "-");
                                gDesigner.stats("directlink_template_".concat(categorySlug), "".concat(options.file.name, " [").concat(options.content.id, "]"));
                            } else if (requestType === GContainer.default.OpenFileRequest.Type.Preset) {
                                document.setDocumentFromTemplate(true);
                                let presetCategorySlug = options.preset.presetCategory
                                    .toLowerCase()
                                    .replace(/[\t-\r \/\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, "-");
                                gDesigner.stats("directlink_preset_".concat(presetCategorySlug), options.preset.presetLayout.name);
                            }
                        } else if (item && item.presetLayout) {
                            let scene = gDesigner.createScene(),
                                { unit, dpi, width, height } = item.presetLayout,
                                presetSlug = item.presetCategory
                                    .toLowerCase()
                                    .replace(/[\t-\r \/\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, "-");
                            (scene.setProperties(["ut", "dpi"], [unit, dpi || GObject.GLength.DPI]),
                                scene
                                    .getActivePage()
                                    .setProperties(
                                        ["bck", "w", "h"],
                                        [GObject.GRGBColor.WHITE, new GObject.GLength(width, unit).toPoint(), new GObject.GLength(height, unit).toPoint()]
                                    ),
                                document.setTitle(item.presetLayout.id),
                                document.setScene(scene),
                                document.setDocumentFromTemplate(true),
                                document.setIsShared(true),
                                gDesigner.stats("directlink_preset_".concat(presetSlug), item.presetLayout.name));
                        }
                    }
                    return (applyOpenedItem(openedItem), document);
                });
            }
        };
    };
