module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GUndoAction() {
            GUndoAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GUndoAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GUndoAction", "tooltip-description")),
                    shortcut: GUndoAction.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(GUndoAction, GAction),
            (GUndoAction.ID = "edit.undo"),
            (GUndoAction.TITLE = new GObject.GLocaleKey("GUndoAction", "title")),
            (GUndoAction.SHORTCUT = [GPlatform.GKey.Constant.META, "z"]),
            (GUndoAction.TOOLTIP_CONFIG = null),
            (GUndoAction.prototype.getId = function () {
                return GUndoAction.ID;
            }),
            (GUndoAction.prototype.getTitle = function () {
                var activeDocument = gDesigner.getActiveDocument();
                return activeDocument && activeDocument.getEditor() && activeDocument.getEditor().hasUndoState()
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GUndoAction", "undo-action")).replace("%action", activeDocument.getEditor().getUndoStateName())
                    : GObject.GLocale.get(GUndoAction.TITLE);
            }),
            (GUndoAction.prototype.getIcon = function () {
                return "gravit-icon-undo";
            }),
            (GUndoAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GUndoAction.prototype.getGroup = function () {
                return "undo_redo";
            }),
            (GUndoAction.prototype.getShortcut = function () {
                return GUndoAction.SHORTCUT;
            }),
            (GUndoAction.prototype.isEnabled = function () {
                return (
                    !(gDesigner.getActiveDocument() && !gDesigner.getActiveDocument().isEditingEnabled()) &&
                    (!(
                        !document.activeElement ||
                        !$(document.activeElement).is(":editable") ||
                        $(document.activeElement).is(":button") ||
                        $(document.activeElement).is("select") ||
                        gDesigner.isGravitIME(document.activeElement)
                    ) ||
                        !!(
                            gDesigner.getActiveDocument() &&
                            gDesigner.getActiveDocument().getEditor() &&
                            gDesigner.getActiveDocument().getEditor().hasUndoState()
                        ))
                );
            }),
            (GUndoAction.prototype.execute = function () {
                !document.activeElement ||
                !$(document.activeElement).is(":editable") ||
                $(document.activeElement).is(":button") ||
                $(document.activeElement).is("select") ||
                gDesigner.isGravitIME(document.activeElement)
                    ? gDesigner.getActiveDocument().getEditor().undoState()
                    : document.execCommand("undo");
            }),
            (GUndoAction.prototype.getTooltipConfig = function (area) {
                return (area && GUndoAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GUndoAction.prototype.toString = function () {
                return "[Object GUndoAction]";
            }),
            (module.exports = GUndoAction));
    };
