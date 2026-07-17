module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GEditorModule = require(53),
            GObject = require(1),
            GCategory = require(18),
            GSplitPathAction = require(873),
            GElementAction = require(106);
        function GAttachToPathAction() {}
        (GObject.GObject.inherit(GAttachToPathAction, GElementAction),
            (GAttachToPathAction.ID = "modify.attachToPath"),
            (GAttachToPathAction.TITLE = new GObject.GLocaleKey("GAttachToPathAction", "title")),
            (GAttachToPathAction.prototype.getId = function () {
                return GAttachToPathAction.ID;
            }),
            (GAttachToPathAction.prototype.getTitle = function () {
                return GAttachToPathAction.TITLE;
            }),
            (GAttachToPathAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GAttachToPathAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GAttachToPathAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-attach-to-path" : null;
            }),
            (GAttachToPathAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    attachableTexts = [],
                    pathElement = null;
                if (selection)
                    for (var a = 0; a < selection.length; ++a)
                        if (selection[a] instanceof GObject.GText && !selection[a].hasPathAttached()) {
                            var r = GEditorModule.GElementEditor.getEditor(selection[a]);
                            r && !r.isInlineEdit() && attachableTexts.push(selection[a]);
                        } else !selection[a].hasMixin(GObject.GVertexSource) || selection[a] instanceof GObject.GPathsGraph || (pathElement = selection[a]);
                return !(!attachableTexts.length || !pathElement);
            }),
            (GAttachToPathAction.prototype.execute = function () {
                var pathElement,
                    activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument ? activeDocument.getScene() : null,
                    individualSelection = (editor = activeDocument ? activeDocument.getEditor() : null) ? editor.getIndividualSelection() : null,
                    targetPath = null,
                    linkTexts = [];
                if (individualSelection)
                    for (var c = 0; c < individualSelection.length; ++c)
                        if (!targetPath && individualSelection[c] instanceof GObject.GPathBase) targetPath = individualSelection[c];
                        else if (individualSelection[c] instanceof GObject.GText && !individualSelection[c].hasPathAttached()) {
                            var d = GEditorModule.GElementEditor.getEditor(individualSelection[c]);
                            d && !d.isInlineEdit() && linkTexts.push(individualSelection[c]);
                        } else pathElement || !individualSelection[c].hasMixin(GObject.GVertexSource) || individualSelection[c] instanceof GObject.GPathsGraph || (pathElement = individualSelection[c]);
                try {
                    if ((editor.beginTransaction(), !targetPath)) {
                        var editor = gDesigner.getActiveDocument().getEditor();
                        (pathElement instanceof GObject.GCompoundPath
                            ? gDesigner.executeAction(GSplitPathAction.ID, void 0, void 0, true)
                            : (editor.updateSelection(false, [pathElement]), editor.convertSelectionToPaths()),
                            (targetPath = editor.getSelection()[0]),
                            (individualSelection = individualSelection.concat()).splice(individualSelection.indexOf(pathElement), 1),
                            editor.updateSelection(true, individualSelection));
                    }
                    scene &&
                        linkTexts.map(function (text) {
                            scene.link(text, targetPath);
                        });
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (GAttachToPathAction.prototype.toString = function () {
                return "[Object GAttachToPathAction]";
            }),
            (module.exports = GAttachToPathAction));
    };
