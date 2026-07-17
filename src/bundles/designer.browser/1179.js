module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function GJoinPathsAction() {}
        (GObject.GObject.inherit(GJoinPathsAction, r),
            (GJoinPathsAction.ID = "modify.join-paths"),
            (GJoinPathsAction.TITLE = new GObject.GLocaleKey("GJoinPathsAction", "title")),
            (GJoinPathsAction.prototype.getId = function () {
                return GJoinPathsAction.ID;
            }),
            (GJoinPathsAction.prototype.getTitle = function () {
                return GJoinPathsAction.TITLE;
            }),
            (GJoinPathsAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GJoinPathsAction.prototype.getGroup = function () {
                return "structure/path";
            }),
            (GJoinPathsAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-join-paths" : null;
            }),
            (GJoinPathsAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "J"];
            }),
            (GJoinPathsAction.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection && selection.length > 1)
                        for (var n = 0, i = 0; i < selection.length; ++i)
                            if (
                                !(selection[i] instanceof GObject.GImage) &&
                                ((selection[i] instanceof GObject.GPathBase || selection[i].hasMixin(GObject.GVertexSource)) && n++, 2 === n)
                            )
                                return true;
                }
                return false;
            }),
            (GJoinPathsAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    selection = editor.getSelection();
                if (selection && selection.length) {
                    editor.beginTransaction();
                    try {
                        var propertiesHolder = new GObject.GRectangle();
                        (GObject.GElement.prototype.assignFrom.call(propertiesHolder, selection[0]), editor.convertSelectionToPaths(true));
                        var joinedPath = editor.joinPaths();
                        joinedPath && (GObject.GElement.prototype.assignFrom.call(joinedPath, propertiesHolder), editor.updateSelection(false, [joinedPath]));
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GJoinPathsAction.prototype.toString = function () {
                return "[Object GJoinPathsAction]";
            }),
            (module.exports = GJoinPathsAction));
    };
