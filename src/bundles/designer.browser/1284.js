module.exports = function (module, exports, require) {
        "use strict";
        (require(20), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(31);
        function l() {
            l.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "tooltip-description")),
                    shortcut: l.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(l, s),
            (l.ID = "edit.redo"),
            (l.TITLE = new GObject.GLocaleKey("GRedoAction", "title")),
            (l.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "z"]),
            (l.TOOLTIP_CONFIG = null),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                var e = gDesigner.getActiveDocument();
                return e && e.getEditor().hasRedoState()
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GRedoAction", "redo-action")).replace("%action", e.getEditor().getRedoStateName())
                    : GObject.GLocale.get(l.TITLE);
            }),
            (l.prototype.getIcon = function () {
                return "gravit-icon-redo";
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (l.prototype.getGroup = function () {
                return "undo_redo";
            }),
            (l.prototype.getShortcut = function () {
                return l.SHORTCUT;
            }),
            (l.prototype.isEnabled = function () {
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
            (l.prototype.execute = function () {
                !document.activeElement ||
                !$(document.activeElement).is(":editable") ||
                $(document.activeElement).is(":button") ||
                $(document.activeElement).is("select") ||
                gDesigner.isGravitIME(document.activeElement)
                    ? gDesigner.getActiveDocument().getEditor().redoState()
                    : document.execCommand("redo");
            }),
            (l.prototype.getTooltipConfig = function (e) {
                return (e && l.TOOLTIP_CONFIG[e]) || null;
            }),
            (l.prototype.toString = function () {
                return "[Object GRedoAction]";
            }),
            (module.exports = l));
    };
