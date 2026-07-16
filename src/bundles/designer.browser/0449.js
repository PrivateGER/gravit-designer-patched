module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(31);
        function l() {
            l.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GFitAllAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GFitAllAction", "tooltip-description")),
                    shortcut: l.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(l, s),
            (l.ID = "view.zoom.fit.all"),
            (l.TITLE = new GObject.GLocaleKey("GFitAllAction", "title")),
            (l.SHORTCUT = [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.META, "0"]),
            (l.TOOLTIP_CONFIG = null),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-fit-all" : null;
            }),
            (l.prototype.getGroup = function () {
                return "zoom";
            }),
            (l.prototype.getShortcut = function () {
                return l.SHORTCUT;
            }),
            (l.prototype.isEnabled = function () {
                var e = gDesigner.getActiveDocument(),
                    t = (e && e.getScene() && e.getScene().getPaintBBox()) || null;
                return t && !t.isEmpty();
            }),
            (l.prototype.execute = function () {
                var e,
                    t = gDesigner.getActiveDocument(),
                    n = t.getScene(),
                    i = t.getActiveWindow().getView().getViewConfiguration().multiPageView;
                if (n.isFixedSized() && !i) {
                    var a = n.getActivePage();
                    e = new GObject.GRect(0, 0, a.getProperty("w"), a.getProperty("h"));
                } else e = n.getPaintBBox(i);
                e && !e.isEmpty() && t.getActiveWindow().getView().zoomAll(e, false);
            }),
            (l.prototype.getTooltipConfig = function (e) {
                return (e && l.TOOLTIP_CONFIG[e]) || null;
            }),
            (l.prototype.toString = function () {
                return "[Object GFitAllAction]";
            }),
            (module.exports = l));
    };
