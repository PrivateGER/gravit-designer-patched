module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GElementAction = require(106);
        function SplitPathAction() {}
        (GObject.GObject.inherit(SplitPathAction, GElementAction),
            (SplitPathAction.ID = "modify.split-path"),
            (SplitPathAction.TITLE = new GObject.GLocaleKey("GSplitPathAction", "title")),
            (SplitPathAction.prototype.getId = function () {
                return SplitPathAction.ID;
            }),
            (SplitPathAction.prototype.getTitle = function () {
                return SplitPathAction.TITLE;
            }),
            (SplitPathAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (SplitPathAction.prototype.getGroup = function () {
                return "structure/path";
            }),
            (SplitPathAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "J"];
            }),
            (SplitPathAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-split-path" : null;
            }),
            (SplitPathAction.prototype.isEnabled = function () {
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection) for (var n = 0; n < selection.length; ++n) if (selection[n] instanceof GObject.GCompoundPath) return true;
                }
                return false;
            }),
            (SplitPathAction.prototype.execute = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var editor = gDesigner.getActiveDocument().getEditor(),
                    selection = editor.getSelection().slice();
                if (selection && selection.length) {
                    editor.beginTransaction();
                    try {
                        for (var splitResults = [], i = 0; i < selection.length; ++i) {
                            var a = selection[i];
                            if (a instanceof GObject.GCompoundPath) {
                                var s = new GObject.GRectangle();
                                GObject.GElement.prototype.assignFrom.call(s, a);
                                var l = editor.splitCompoundPath(a);
                                if (l && l.length)
                                    for (var c = 0; c < l.length; ++c) {
                                        var d = l[c];
                                        (GObject.GElement.prototype.assignFrom.call(d, s), splitResults.push(d));
                                    }
                            }
                        }
                        splitResults.length && editor.updateSelection(false, splitResults);
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (SplitPathAction.prototype.toString = function () {
                return "[Object GSplitPathAction]";
            }),
            (module.exports = SplitPathAction));
    };
