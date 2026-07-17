module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = (require(15 /* GPlatform */), require(18 /* GCategory */)),
            GElementAction = require(106);
        function GResetInstanceAction() {}
        (GObject.GObject.inherit(GResetInstanceAction, GElementAction),
            (GResetInstanceAction.ID = "modify.resetinstance"),
            (GResetInstanceAction.TITLE = new GObject.GLocaleKey("GResetInstanceAction", "title")),
            (GResetInstanceAction.prototype.getId = function () {
                return GResetInstanceAction.ID;
            }),
            (GResetInstanceAction.prototype.getTitle = function () {
                return GResetInstanceAction.TITLE;
            }),
            (GResetInstanceAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_SYMBOL;
            }),
            (GResetInstanceAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GResetInstanceAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-reset-instance" : null;
            }),
            (GResetInstanceAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var document = gDesigner.getActiveDocument();
                if (document) {
                    var selection = document.getEditor().getIndividualSelection();
                    if (selection && selection.length)
                        for (var n = selection.length - 1; n >= 0; --n) {
                            var i = selection[n];
                            if (!i.isLocked()) {
                                if (i instanceof GObject.GSymbol && !i.isLocked() && !i.inSync()) return true;
                                var r = null;
                                if (
                                    (r = i.findParent(function (ancestor) {
                                        return ancestor instanceof GObject.GSymbol;
                                    })) &&
                                    !r.inSync(i, true)
                                )
                                    return true;
                            }
                        }
                }
                return false;
            }),
            (GResetInstanceAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    orderedSelection = GObject.GNode.order(editor.getIndividualSelection().slice());
                editor.beginTransaction();
                try {
                    for (var n = 0; n < orderedSelection.length; ++n) {
                        var i = orderedSelection[n];
                        if ((i instanceof GObject.GSymbol && !i.isLocked() && !i.inSync() && i.synchronize(), !(i instanceof GObject.GSymbol))) {
                            var a = null;
                            (a = i.findParent(function (ancestor) {
                                return ancestor instanceof GObject.GSymbol;
                            })) &&
                                (a.inSync(i, true) || a.synchronize(i));
                        }
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(GResetInstanceAction.TITLE));
                }
            }),
            (GResetInstanceAction.prototype.toString = function () {
                return "[Object GResetInstanceAction]";
            }),
            (module.exports = GResetInstanceAction));
    };
