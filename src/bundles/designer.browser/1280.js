module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var GObject = require(1),
            i = require(67),
            GCategory = require(18),
            GDocument = require(163),
            s = require(31),
            l = require(85);
        function c() {
            c.TOOLTIP_CONFIG = {
                [i.TOOLTIP_AREA.TOOLBAR]: i.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLinkImageAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLinkImageAction", "tooltip-description")),
                    middle: false,
                    learnMore: "/docs/working-with-images/insert-images/#link-image",
                }),
            };
        }
        (GObject.GObject.inherit(c, s),
            (c.ID = "file.link-import"),
            (c.TITLE = new GObject.GLocaleKey("GLinkImageAction", "title")),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (c.prototype.getGroup = function () {
                return "import/place-import";
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-link-image" : null;
            }),
            (c.prototype.isEnabled = function (e) {
                if (gContainer.getRuntime() !== l.Runtime.Electron) return false;
                var t = gDesigner.getActiveDocument();
                return !!t && (e = e || t.getStorage() || gDesigner.getDefaultStorage()) && e.canPromptOpen();
            }),
            (c.prototype.execute = function (e, t) {
                var n = gDesigner.getActiveDocument();
                if (!n) return false;
                (e = e || n.getStorage() || gDesigner.getDefaultStorage()).openPrompt(
                    GDocument.FileTypes.filter((e) => 0 === e.mime.indexOf("image")),
                    (e) => {
                        var i = "file://" + e.getUniqueId(),
                            a = i,
                            r = n.getScene().getDictionary().putValueIfAbsent(a);
                        r && (a = r.getUrl());
                        var s = new Image();
                        ((s.onload = () => {
                            var e = new GObject.GImage();
                            (e.setProperties(["iw", "ih", "url"], [s.naturalWidth, s.naturalHeight, a]),
                                n.insertElement(e, true, true),
                                t && t());
                        }),
                            (s.src = i));
                    },
                    false
                );
            }),
            (c.prototype.isAvailable = function () {
                return gContainer.getRuntime() !== l.Runtime.IPad;
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GLinkImageAction]";
            }),
            (module.exports = c));
    };
