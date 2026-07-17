module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(32), require(33));
        var GObject = require(1),
            GEditor = require(53),
            GPlatform = require(15),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */));
        class GTogglePaintLayersVisibilityAction extends GAction.default {
            constructor(layerType) {
                (super(),
                    (this._type = layerType),
                    (this._title = new GObject.GLocaleKey("GTogglePaintLayersVisibilityAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(GTogglePaintLayersVisibilityAction.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return GCategory.default.CATEGORY_VIEW;
            }
            getShortcut() {
                switch (this._type) {
                    case GTogglePaintLayersVisibilityAction.Type.Fill:
                        return ["F"];
                    case GTogglePaintLayersVisibilityAction.Type.Border:
                        return [GPlatform.GKey.Constant.SHIFT, "B"];
                }
            }
            isVisible() {
                return false;
            }
            isEnabled() {
                return !document.activeElement || !$(document.activeElement).is(":input");
            }
            _getSingleLevelSelection(elements) {
                let result = [];
                return (
                    elements.forEach((element) => {
                        if (element) {
                            const children = element.getChildren();
                            (element instanceof GObject.GLayer || result.push(element),
                                Array.isArray(children) && children.length > 0 && (result = result.concat(this._getSingleLevelSelection(children))));
                        }
                    }),
                    result
                );
            }
            _getPaintLayers(element) {
                const paintLayers = element && element.hasMixin(GObject.GStylable) && element.getPaintLayers();
                if (!paintLayers) return null;
                switch (this._type) {
                    case GTogglePaintLayersVisibilityAction.Type.Fill:
                        return paintLayers.getFillLayers();
                    case GTogglePaintLayersVisibilityAction.Type.Border:
                        return paintLayers.getBorderLayers();
                    default:
                        return null;
                }
            }
            _checkPaintLayersVisibility(elements) {
                let hasHidden = false,
                    hasVisible = false;
                for (let o = 0; elements.length > o && (!hasHidden || !hasVisible); o++) {
                    const element = elements[o],
                        paintLayers = this._getPaintLayers(element);
                    if (Array.isArray(paintLayers))
                        for (let e = 0; paintLayers.length > e && (!hasHidden || !hasVisible); e++) {
                            paintLayers[e].getProperty("_vs") ? (hasVisible = true) : (hasHidden = true);
                        }
                }
                return { hasHiddenPaintLayers: hasHidden, hasVisiblePaintLayers: hasVisible };
            }
            _setVisibilityPaintLayersState(elements, visible) {
                const activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument && activeDocument.getScene();
                scene &&
                    GEditor.GEditor.tryRunTransaction(
                        scene,
                        () => {
                            elements.forEach((element) => {
                                element.beginUpdate();
                                const paintLayers = this._getPaintLayers(element);
                                (Array.isArray(paintLayers) &&
                                    paintLayers.forEach((paintLayer) => {
                                        paintLayer.setProperty("_vs", visible);
                                    }),
                                    element.endUpdate());
                            });
                        },
                        GObject.GLocale.get(GTogglePaintLayersVisibilityAction.TITLE)
                    );
            }
            execute() {
                const activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument && activeDocument.getScene(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getSelection();
                if (scene) {
                    scene.beginUpdate();
                    try {
                        if (Array.isArray(selection) && selection.length > 0) {
                            const elements = this._getSingleLevelSelection(selection),
                                { hasHiddenPaintLayers, hasVisiblePaintLayers } = this._checkPaintLayersVisibility(elements);
                            if (!hasHiddenPaintLayers && !hasVisiblePaintLayers) return;
                            hasHiddenPaintLayers && hasVisiblePaintLayers ? this._setVisibilityPaintLayersState(elements, false) : this._setVisibilityPaintLayersState(elements, hasHiddenPaintLayers);
                        }
                    } finally {
                        scene.endUpdate();
                    }
                }
            }
            toString() {
                return "[Object GTogglePaintLayersVisibilityAction]";
            }
        }
        ((GTogglePaintLayersVisibilityAction.ID = "view.toggle-paint-layers-visibility"), (GTogglePaintLayersVisibilityAction.Type = { Fill: "fill", Border: "border" }), (module.exports = GTogglePaintLayersVisibilityAction));
    };
