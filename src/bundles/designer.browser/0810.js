module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GElementAction = require(106);
        function GConvertToPathAction() {
            GConvertToPathAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GConvertToPathAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GConvertToPathAction", "tooltip-description")),
                    shortcut: GConvertToPathAction.SHORTCUT,
                    learnMore: "/docs/basics/modify-paths/#convert-to-path-raw-path",
                }),
            };
        }
        (GObject.GObject.inherit(GConvertToPathAction, GElementAction),
            (GConvertToPathAction.ID = "modify.converttopath"),
            (GConvertToPathAction.TITLE = new GObject.GLocaleKey("GConvertToPathAction", "title")),
            (GConvertToPathAction.SHORTCUT = [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "P"]),
            (GConvertToPathAction.TOOLTIP_CONFIG = null),
            (GConvertToPathAction.prototype.getId = function () {
                return GConvertToPathAction.ID;
            }),
            (GConvertToPathAction.prototype.getTitle = function () {
                return GConvertToPathAction.TITLE;
            }),
            (GConvertToPathAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GConvertToPathAction.prototype.getIcon = function () {
                return "gravit-icon-convert-to-path";
            }),
            (GConvertToPathAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GConvertToPathAction.prototype.getShortcut = function () {
                return GConvertToPathAction.SHORTCUT;
            }),
            (GConvertToPathAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection)
                        for (var n = 0; n < selection.length; ++n)
                            if (
                                !(selection[n] instanceof GObject.GPath) &&
                                !(selection[n] instanceof GObject.GImage) &&
                                !(selection[n] instanceof GObject.GPathsGraph) &&
                                (selection[n] instanceof GObject.GPathBase || (selection[n].hasMixin(GObject.GVertexSource) && !(selection[n] instanceof GObject.GCompoundPath)))
                            )
                                return true;
                }
                return false;
            }),
            (GConvertToPathAction.prototype.execute = function () {
                gDesigner.getActiveDocument().getEditor().convertSelectionToPaths();
            }),
            (GConvertToPathAction.prototype.getTooltipConfig = function (area) {
                return (area && GConvertToPathAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GConvertToPathAction.prototype.toString = function () {
                return "[Object GConvertToPathAction]";
            }),
            (module.exports = GConvertToPathAction));
    };
