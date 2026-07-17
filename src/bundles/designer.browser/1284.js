module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GRedoAction() {
            GRedoAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "tooltip-description")),
                    shortcut: GRedoAction.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(GRedoAction, GAction),
            (GRedoAction.ID = "edit.redo"),
            (GRedoAction.TITLE = new GObject.GLocaleKey("GRedoAction", "title")),
            (GRedoAction.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "z"]),
            (GRedoAction.TOOLTIP_CONFIG = null),
            (GRedoAction.prototype.getId = function () {
                return GRedoAction.ID;
            }),
            (GRedoAction.prototype.getTitle = function () {
                var activeDocument = gDesigner.getActiveDocument();
                return activeDocument && activeDocument.getEditor().hasRedoState()
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "redo-action")).replace("%action", activeDocument.getEditor().getRedoStateName())
                    : GObject.GLocale.get(GRedoAction.TITLE);
            }),
            (GRedoAction.prototype.getIcon = function () {
                return "gravit-icon-redo";
            }),
            (GRedoAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GRedoAction.prototype.getGroup = function () {
                return "undo_redo";
            }),
            (GRedoAction.prototype.getShortcut = function () {
                return GRedoAction.SHORTCUT;
            }),
            (GRedoAction.prototype.isEnabled = function () {
                return (
                    !(gDesigner.getActiveDocument() && !gDesigner.getActiveDocument().isEditingEnabled()) &&
                    (!(
                        !document.activeElement ||
                        !$(document.activeElement).is(":editable") ||
                        $(document.activeElement).is(":button") ||
                        $(document.activeElement).is("select") ||
                        gDesigner.isGravitIME(document.activeElement)
                    ) ||
                        !(!gDesigner.getActiveDocument() || !gDesigner.getActiveDocument().getEditor().hasRedoState()))
                );
            }),
            (GRedoAction.prototype.execute = function () {
                !document.activeElement ||
                !$(document.activeElement).is(":editable") ||
                $(document.activeElement).is(":button") ||
                $(document.activeElement).is("select") ||
                gDesigner.isGravitIME(document.activeElement)
                    ? gDesigner.getActiveDocument().getEditor().redoState()
                    : document.execCommand("redo");
            }),
            (GRedoAction.prototype.getTooltipConfig = function (area) {
                return (area && GRedoAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GRedoAction.prototype.toString = function () {
                return "[Object GRedoAction]";
            }),
            (module.exports = GRedoAction));
    };
