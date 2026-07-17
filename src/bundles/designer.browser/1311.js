module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            editorModule = require(53),
            GCategory = require(18),
            r = (require(31 /* GAction */), require(106));
        function GCancelCropAction() {}
        (GObject.GObject.inherit(GCancelCropAction, r),
            (GCancelCropAction.ID = "modify.cancel-crop"),
            (GCancelCropAction.TITLE = new GObject.GLocaleKey("GCancelCropAction", "title")),
            (GCancelCropAction.prototype.getId = function () {
                return GCancelCropAction.ID;
            }),
            (GCancelCropAction.prototype.getTitle = function () {
                return GCancelCropAction.TITLE;
            }),
            (GCancelCropAction.prototype.getIcon = function () {
                return null;
            }),
            (GCancelCropAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GCancelCropAction.prototype.getGroup = function () {
                return "structure-group";
            }),
            (GCancelCropAction.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var editor = activeDocument.getEditor(),
                        individualSelection = editor.getIndividualSelection();
                    if (individualSelection && individualSelection.length && individualSelection[0] instanceof GObject.GImage && editor.hasSelectionDetail()) return individualSelection[0].isReady();
                }
                return false;
            }),
            (GCancelCropAction.prototype.execute = function (e, t) {
                if (!r.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var individualSelection = activeDocument.getEditor().getIndividualSelection(),
                        image = individualSelection && individualSelection.length ? individualSelection[0] : null;
                    image &&
                        image instanceof GObject.GImage &&
                        !GObject.GTransform.equals(image.getTransform(), image.getImageTransform()) &&
                        editorModule.GEditor.tryRunTransaction(
                            image,
                            function () {
                                var imageTransform = image.getImageTransform();
                                image.setProperties(["trf", "ut", "tl_sx"], [imageTransform, true, 0]);
                            }.bind(this),
                            GObject.GLocale.get(GCancelCropAction.TITLE)
                        );
                }
                var toolManager = gDesigner.getToolManager();
                toolManager.getActiveTool() instanceof editorModule.GSubSelectTool
                    ? (toolManager.activateTool(editorModule.GPointerTool, null, true), toolManager.getActiveTool().setEditMode(editorModule.GSelectTool.EditMode.Select))
                    : toolManager.getActiveTool() instanceof editorModule.GPointerTool && toolManager.getActiveTool().setEditMode(editorModule.GSelectTool.EditMode.Select);
            }),
            (GCancelCropAction.prototype.toString = function () {
                return "[Object GCancelCropAction]";
            }),
            (module.exports = GCancelCropAction));
    };
