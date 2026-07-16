module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            r = require(67),
            designerConfig = require(10),
            GCategory = require(18),
            c = require(106);
        function d() {
            d.TOOLTIP_CONFIG = {
                [r.TOOLTIP_AREA.TOOLBAR]: r.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "tooltip-description")),
                    video: designerConfig.gApi.getRichTooltipVideoURL("Clip.mp4"),
                    learnMore: "/docs/organizing-your-designs/clipping-masking/",
                }),
            };
        }
        (GObject.GObject.inherit(d, c),
            (d.ID = "modify.clip"),
            (d.TITLE = new GObject.GLocaleKey("GClipAction", "title")),
            (d.TOOLTIP_CONFIG = null),
            (d.prototype.getId = function () {
                return d.ID;
            }),
            (d.prototype.getTitle = function () {
                return d.TITLE;
            }),
            (d.prototype.getIcon = function () {
                return "gravit-icon-clip-circle";
            }),
            (d.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (d.prototype.getGroup = function () {
                return "structure-group";
            }),
            (d.prototype.isEnabled = function () {
                if (!c.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getIndividualSelection();
                    return t && t.length > 1;
                }
                return false;
            }),
            (d.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.META, "M"];
            }),
            (d.prototype.execute = function (e, t) {
                var n = gDesigner.getActiveDocument().getEditor(),
                    i = gDesigner.getActiveDocument().getScene(),
                    r = GObject.GNode.order(n.getIndividualSelection().slice(), e),
                    s = r.shift();
                if (!s.isLocked()) {
                    var l,
                        c = s.getPaintBBox();
                    t || n.beginTransaction();
                    try {
                        l = new Set();
                        for (var d = 0; d < r.length; ++d) l.add(r[d].getParent());
                        try {
                            (0, Utils.blockChanges)(n, l, i, s);
                            for (d = 0; d < r.length; ++d) {
                                var u = r[d];
                                u.validateInsertion(s) &&
                                    u.getPaintBBox() &&
                                    c &&
                                    u.getPaintBBox().intersectsRect(c) &&
                                    (u.getParent().removeChild(u), s.appendChild(u));
                            }
                        } finally {
                            ((0, Utils.releaseChanges)(n, l, i, s), n.updateSelection(false, [s]));
                        }
                    } finally {
                        t || n.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "text.clip-selecion")));
                    }
                }
            }),
            (d.prototype.getTooltipConfig = function (e) {
                return e && d.TOOLTIP_CONFIG[e];
            }),
            (d.prototype.toString = function () {
                return "[Object GClipAction]";
            }),
            (module.exports = d));
    };
