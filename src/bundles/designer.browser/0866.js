module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GObject = require(1),
            GPlatform = require(15),
            r = require(67),
            GCategory = require(18),
            l = require(31);
        function c(e) {
            ((this._type = e),
                (this._title = new GObject.GLocaleKey("GAlignAction", "title." + e)),
                (c.TOOLTIP_CONFIG = {
                    [r.TOOLTIP_AREA.SIDEBAR]: {
                        [o.GEditor.ArrangeAlignType.AlignLeft]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-left-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-left-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-left",
                        }),
                        [o.GEditor.ArrangeAlignType.AlignCenter]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-center-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-center-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-center",
                        }),
                        [o.GEditor.ArrangeAlignType.AlignRight]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-right-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-right-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-right",
                        }),
                        [o.GEditor.ArrangeAlignType.AlignTop]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-top-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-top-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-top",
                        }),
                        [o.GEditor.ArrangeAlignType.AlignMiddle]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-middle-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-middle-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-middle",
                        }),
                        [o.GEditor.ArrangeAlignType.AlignBottom]: r.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-bottom-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-bottom-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-bottom",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(c, l),
            (c.ID = "arrange.align"),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype._type = null),
            (c.prototype._title = null),
            (c.prototype.getId = function () {
                return c.ID + "." + this._type;
            }),
            (c.prototype.getTitle = function () {
                return this._title;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ALIGN;
            }),
            (c.prototype.getGroup = function () {
                var e = "";
                switch (this._type) {
                    case o.GEditor.ArrangeAlignType.AlignLeft:
                    case o.GEditor.ArrangeAlignType.AlignCenter:
                    case o.GEditor.ArrangeAlignType.AlignRight:
                        e = "horizontal";
                        break;
                    case o.GEditor.ArrangeAlignType.AlignTop:
                    case o.GEditor.ArrangeAlignType.AlignMiddle:
                    case o.GEditor.ArrangeAlignType.AlignBottom:
                        e = "vertical";
                        break;
                    case o.GEditor.ArrangeAlignType.AlignJustifyHorizontal:
                    case o.GEditor.ArrangeAlignType.AlignJustifyVertical:
                        e = "justify";
                }
                return "arrange/align-" + e;
            }),
            (c.prototype.getShortcut = function () {
                const e = [GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case o.GEditor.ArrangeAlignType.AlignLeft:
                        return e.concat("A");
                    case o.GEditor.ArrangeAlignType.AlignCenter:
                        return e.concat("H");
                    case o.GEditor.ArrangeAlignType.AlignRight:
                        return e.concat("D");
                    case o.GEditor.ArrangeAlignType.AlignTop:
                        return e.concat("W");
                    case o.GEditor.ArrangeAlignType.AlignMiddle:
                        return e.concat("V");
                    case o.GEditor.ArrangeAlignType.AlignBottom:
                        return e.concat("S");
                    default:
                        return null;
                }
            }),
            (c.prototype.isEnabled = function (e, t, n) {
                var o = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor() : null;
                return !(!(e = e || (o ? o.getIndividualSelection() : null)) || !e.length);
            }),
            (c.prototype.execute = function (e, t, n) {
                var i = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor() : null;
                if (((e = e || (i ? i.getIndividualSelection() : null)), i && e && 1 === e.length && !n)) {
                    var a = o.GElementEditor.getEditor(e[0]);
                    if (!a || !a.isAlignPartsAllowed())
                        if (i.getScene().isFixedSized()) n = i.getScene().getActivePage().getGeometryBBox();
                        else n = i.getScene().getPaintBBox();
                }
                gDesigner.getActiveDocument().getEditor().arrangeAlign(this._type, e, t, n);
            }),
            (c.prototype._isAlignOnlyCategory = function () {
                switch (this._type) {
                    case o.GEditor.ArrangeAlignType.AlignLeft:
                    case o.GEditor.ArrangeAlignType.AlignCenter:
                    case o.GEditor.ArrangeAlignType.AlignRight:
                    case o.GEditor.ArrangeAlignType.AlignTop:
                    case o.GEditor.ArrangeAlignType.AlignMiddle:
                    case o.GEditor.ArrangeAlignType.AlignBottom:
                        return true;
                    default:
                        return false;
                }
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e] && c.TOOLTIP_CONFIG[e][this._type]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GAlignAction]";
            }),
            (module.exports = c));
    };
