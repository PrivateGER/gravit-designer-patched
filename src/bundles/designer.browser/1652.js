module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(4), require(13), require(32), require(38), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */));
        class GSwapPaintLayersAction extends GAction.default {
            getId() {
                return GSwapPaintLayersAction.ID;
            }
            getTitle() {
                return GSwapPaintLayersAction.TITLE;
            }
            getCategory() {
                return GCategory.default.CATEGORY_MODIFY;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.X];
            }
            isEnabled() {
                const document = gDesigner.getActiveDocument(),
                    editor = document && document.getEditor(),
                    selection = editor && editor.getSelection();
                return !!(selection && selection.find((element) => element.hasMixin(GObject.GStylable)));
            }
            execute() {
                const document = gDesigner.getActiveDocument(),
                    editor = document && document.getEditor(),
                    selection = editor && editor.getSelection();
                if (selection) {
                    editor.beginTransaction();
                    try {
                        selection.forEach((element) => {
                            if (element.hasMixin(GObject.GStylable)) {
                                const layerContainer = element.getPaintLayers();
                                if (layerContainer) {
                                    const borderLayers = this._createPaintLayers(GSwapPaintLayersAction.Type.Border, layerContainer),
                                        fillLayers = this._createPaintLayers(GSwapPaintLayersAction.Type.Fill, layerContainer);
                                    (borderLayers.forEach((layer) => {
                                        this._setBorderAlignment(element, layer);
                                    }),
                                        layerContainer.clearLayers(),
                                        borderLayers.concat(fillLayers).forEach((layer) => {
                                            layerContainer.appendChild(layer);
                                        }));
                                }
                            }
                        });
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }
            _createPaintLayers(type, paintLayers) {
                const propertyNames = ["_pt", "_op", "_vs", "_bl"];
                switch (type) {
                    case GSwapPaintLayersAction.Type.Fill:
                        return paintLayers.getBorderLayers().map((layer) => {
                            const properties = layer.getProperties(propertyNames);
                            return new GObject.GStylable.FillPaintLayer(...properties);
                        });
                    case GSwapPaintLayersAction.Type.Border:
                        return paintLayers.getFillLayers().map((layer) => {
                            const properties = layer.getProperties(propertyNames);
                            return new GObject.GStylable.BorderPaintLayer(...properties);
                        });
                    default:
                        throw Error("Not specified type given");
                }
            }
            _setBorderAlignment(element, layer) {
                element instanceof GObject.GText
                    ? layer.setProperty("_ba", GObject.GStylable.BorderAlignment.Outside)
                    : element instanceof GObject.GShape
                      ? element instanceof GObject.GEllipse && element.$etp === GObject.GEllipse.Type.Arc
                          ? layer.setProperty("_ba", GObject.GStylable.BorderAlignment.Center)
                          : layer.setProperty("_ba", GObject.GStylable.BorderAlignment.Inside)
                      : element instanceof GObject.GPath && !element.$closed && layer.setProperty("_ba", GObject.GStylable.BorderAlignment.Center);
            }
            toString() {
                return "[Object GSwapPaintLayersAction]";
            }
        }
        ((GSwapPaintLayersAction.ID = "modify.swap-paint-layers"),
            (GSwapPaintLayersAction.TITLE = new GObject.GLocaleKey("GSwapPaintLayersAction", "title")),
            (GSwapPaintLayersAction.Type = { Fill: "fill", Border: "border" }),
            (module.exports = GSwapPaintLayersAction));
    };
