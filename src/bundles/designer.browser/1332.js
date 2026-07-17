module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            editorModule = require(53),
            GPlatform = require(15),
            designerConfig = require(10),
            Utils = require(40),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            GAnnotationsSidebar = require(567),
            GCategory = require(18),
            GAction = require(31);
        const GAnnotationsUtils = require(358),
            PropertiesPanels = require(607);
        function GDeleteAction() {}
        (GObject.GObject.inherit(GDeleteAction, GAction),
            (GDeleteAction.ID = "edit.delete"),
            (GDeleteAction.TITLE = new GObject.GLocaleKey("GDeleteAction", "title")),
            (GDeleteAction.prototype._isConfirmWindowDisplaying = false),
            (GDeleteAction.prototype.getId = function () {
                return GDeleteAction.ID;
            }),
            (GDeleteAction.prototype.getTitle = function () {
                return GDeleteAction.TITLE;
            }),
            (GDeleteAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GDeleteAction.prototype.getGroup = function () {
                return "ccp";
            }),
            (GDeleteAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.REMOVE];
            }),
            (GDeleteAction.prototype.getAdditionalShortcuts = function () {
                var additionalShortcuts = [];
                return (
                    GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.OSX_IOS
                        ? additionalShortcuts.push([GPlatform.GKey.Constant.DELETE])
                        : additionalShortcuts.push([GPlatform.GKey.Constant.BACKSPACE]),
                    additionalShortcuts
                );
            }),
            (GDeleteAction.prototype.isEnabled = function () {
                var activeDocument = gDesigner.getActiveDocument();
                if (this._isConfirmWindowDisplaying) return false;
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection) for (var n = 0; n < selection.length; ++n) if (selection[n] instanceof GObject.GItem || selection[n] instanceof GObject.GLayer) return true;
                }
                return false;
            }),
            (GDeleteAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument.getEditor(),
                    stylesList = activeDocument.getActiveStylesList(),
                    mouseOverContext = gDesigner.getMouseOverContext();
                if (designerConfig.HAS_ANNOTATIONS && gDesigner.getRightSidebars().getActiveSidebar() === GAnnotationsSidebar.ID) {
                    var annotationsToDelete = editor.getSelection().filter((annotation) => GAnnotationsUtils.canDeleteAnnotation(annotation));
                    annotationsToDelete.length &&
                        (this._setIsConfirmWindowDisplaying(true),
                        GSystemDialog.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-remove")),
                            (confirmed) => {
                                (confirmed &&
                                    gDesigner.getActiveDocument() &&
                                    gDesigner.getActiveDocument().getEditor() === editor &&
                                    GAnnotationsUtils.removeAnnotations(annotationsToDelete, annotationsToDelete[0].getParent(), GObject.GLocale.get(this.getTitle())),
                                    this._setIsConfirmWindowDisplaying(false));
                            },
                            null,
                            null,
                            null,
                            true,
                            true
                        ));
                } else if (mouseOverContext.context && (stylesList.Fill || stylesList.Border || stylesList.Effect)) {
                    var styleProperty = null,
                        styleType = null,
                        selectedLayers = editor.getSelection();
                    if (mouseOverContext.context === PropertiesPanels.FillPropertiesPanel) ((styleProperty = stylesList.Fill), (styleType = "fill"));
                    else if (mouseOverContext.context === PropertiesPanels.BorderPropertiesPanel) ((styleProperty = stylesList.Border), (styleType = "border"));
                    else {
                        if (mouseOverContext.context !== PropertiesPanels.EffectPropertiesPanel) return void editor.deleteSelection();
                        ((styleProperty = stylesList.Effect), (styleType = "effect"));
                    }
                    editorModule.GEditor.tryRunTransaction(
                        activeDocument.getScene(),
                        function () {
                            (0, Utils.iterateEqualStyleLayers)(styleType, styleProperty, selectedLayers, function (layer) {
                                layer.getParent().removeChild(layer);
                            });
                        },
                        GObject.GLocale.get(GDeleteAction.TITLE)
                    );
                } else editor.deleteSelection();
            }),
            (GDeleteAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-delete" : "";
            }),
            (GDeleteAction.prototype._setIsConfirmWindowDisplaying = function (isDisplaying) {
                this._isConfirmWindowDisplaying = isDisplaying;
            }),
            (GDeleteAction.prototype.toString = function () {
                return "[Object GDeleteAction]";
            }),
            (module.exports = GDeleteAction));
    };
