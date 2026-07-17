module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GElementAction = require(106);
        function DetachSymbolAction() {}
        (GObject.GObject.inherit(DetachSymbolAction, GElementAction),
            (DetachSymbolAction.ID = "modify.detachsymbol"),
            (DetachSymbolAction.TITLE = new GObject.GLocaleKey("GDetachSymbolAction", "title")),
            (DetachSymbolAction.prototype.getId = function () {
                return DetachSymbolAction.ID;
            }),
            (DetachSymbolAction.prototype.getTitle = function () {
                return DetachSymbolAction.TITLE;
            }),
            (DetachSymbolAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_SYMBOL;
            }),
            (DetachSymbolAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (DetachSymbolAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-detach-symbol" : null;
            }),
            (DetachSymbolAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.F8];
            }),
            (DetachSymbolAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var individualSelection = activeDocument.getEditor().getIndividualSelection();
                    if (individualSelection && individualSelection.length)
                        for (var n = individualSelection.length - 1; n >= 0; --n) {
                            var i = individualSelection[n];
                            if (i instanceof GObject.GSymbol && !i.isMaster() && i.getMasterSymbol()) return true;
                        }
                }
                return false;
            }),
            (DetachSymbolAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    orderedSelection = GObject.GNode.order(editor.getIndividualSelection().slice());
                if (orderedSelection.length && orderedSelection[0].getScene()) {
                    editor.beginTransaction();
                    try {
                        for (var n = 0, i = 0; i < orderedSelection.length; ++i) {
                            var a = orderedSelection[i];
                            a instanceof GObject.GSymbol && a.detach() && n++;
                        }
                    } finally {
                        editor.commitTransaction(
                            GObject.GLocale.get(new GObject.GLocaleKey("GDetachSymbolAction", "text.number-detached")).replace(
                                "%number",
                                n > 1 ? "s" : ""
                            )
                        );
                    }
                }
            }),
            (DetachSymbolAction.prototype.toString = function () {
                return "[Object GDetachSymbolAction]";
            }),
            (module.exports = DetachSymbolAction));
    };
