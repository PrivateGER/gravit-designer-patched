module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(106);
        function l() {
            l.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GConvertToPathAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GConvertToPathAction", "tooltip-description")),
                    shortcut: l.SHORTCUT,
                    learnMore: "/docs/basics/modify-paths/#convert-to-path-raw-path",
                }),
            };
        }
        (GObject.GObject.inherit(l, s),
            (l.ID = "modify.converttopath"),
            (l.TITLE = new GObject.GLocaleKey("GConvertToPathAction", "title")),
            (l.SHORTCUT = [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "P"]),
            (l.TOOLTIP_CONFIG = null),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (l.prototype.getIcon = function () {
                return "gravit-icon-convert-to-path";
            }),
            (l.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (l.prototype.getShortcut = function () {
                return l.SHORTCUT;
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t)
                        for (var n = 0; n < t.length; ++n)
                            if (
                                !(t[n] instanceof GObject.GPath) &&
                                !(t[n] instanceof GObject.GImage) &&
                                !(t[n] instanceof GObject.GPathsGraph) &&
                                (t[n] instanceof GObject.GPathBase || (t[n].hasMixin(GObject.GVertexSource) && !(t[n] instanceof GObject.GCompoundPath)))
                            )
                                return true;
                }
                return false;
            }),
            (l.prototype.execute = function () {
                gDesigner.getActiveDocument().getEditor().convertSelectionToPaths();
            }),
            (l.prototype.getTooltipConfig = function (e) {
                return (e && l.TOOLTIP_CONFIG[e]) || null;
            }),
            (l.prototype.toString = function () {
                return "[Object GConvertToPathAction]";
            }),
            (module.exports = l));
    };
