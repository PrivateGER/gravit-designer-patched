module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GCategory = require(18),
            GAction = require(31);
        function GAlignAction(alignType) {
            ((this._type = alignType),
                (this._title = new GObject.GLocaleKey("GAlignAction", "title." + alignType)),
                (GAlignAction.TOOLTIP_CONFIG = {
                    [richTooltipModule.TOOLTIP_AREA.SIDEBAR]: {
                        [GEditor.GEditor.ArrangeAlignType.AlignLeft]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-left-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-left-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-left",
                        }),
                        [GEditor.GEditor.ArrangeAlignType.AlignCenter]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-center-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-center-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-center",
                        }),
                        [GEditor.GEditor.ArrangeAlignType.AlignRight]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-right-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-right-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-right",
                        }),
                        [GEditor.GEditor.ArrangeAlignType.AlignTop]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-top-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-top-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-top",
                        }),
                        [GEditor.GEditor.ArrangeAlignType.AlignMiddle]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-middle-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-middle-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-middle",
                        }),
                        [GEditor.GEditor.ArrangeAlignType.AlignBottom]: richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-bottom-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "text.align-bottom-tooltip-description")),
                            learnMore: "/docs/arrange-objects/align/#align-bottom",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(GAlignAction, GAction),
            (GAlignAction.ID = "arrange.align"),
            (GAlignAction.TOOLTIP_CONFIG = null),
            (GAlignAction.prototype._type = null),
            (GAlignAction.prototype._title = null),
            (GAlignAction.prototype.getId = function () {
                return GAlignAction.ID + "." + this._type;
            }),
            (GAlignAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GAlignAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ALIGN;
            }),
            (GAlignAction.prototype.getGroup = function () {
                var group = "";
                switch (this._type) {
                    case GEditor.GEditor.ArrangeAlignType.AlignLeft:
                    case GEditor.GEditor.ArrangeAlignType.AlignCenter:
                    case GEditor.GEditor.ArrangeAlignType.AlignRight:
                        group = "horizontal";
                        break;
                    case GEditor.GEditor.ArrangeAlignType.AlignTop:
                    case GEditor.GEditor.ArrangeAlignType.AlignMiddle:
                    case GEditor.GEditor.ArrangeAlignType.AlignBottom:
                        group = "vertical";
                        break;
                    case GEditor.GEditor.ArrangeAlignType.AlignJustifyHorizontal:
                    case GEditor.GEditor.ArrangeAlignType.AlignJustifyVertical:
                        group = "justify";
                }
                return "arrange/align-" + group;
            }),
            (GAlignAction.prototype.getShortcut = function () {
                const modifiers = [GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case GEditor.GEditor.ArrangeAlignType.AlignLeft:
                        return modifiers.concat("A");
                    case GEditor.GEditor.ArrangeAlignType.AlignCenter:
                        return modifiers.concat("H");
                    case GEditor.GEditor.ArrangeAlignType.AlignRight:
                        return modifiers.concat("D");
                    case GEditor.GEditor.ArrangeAlignType.AlignTop:
                        return modifiers.concat("W");
                    case GEditor.GEditor.ArrangeAlignType.AlignMiddle:
                        return modifiers.concat("V");
                    case GEditor.GEditor.ArrangeAlignType.AlignBottom:
                        return modifiers.concat("S");
                    default:
                        return null;
                }
            }),
            (GAlignAction.prototype.isEnabled = function (elements, useUnitedBBox, referenceBBox) {
                var editor = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor() : null;
                return !(!(elements = elements || (editor ? editor.getIndividualSelection() : null)) || !elements.length);
            }),
            (GAlignAction.prototype.execute = function (elements, useUnitedBBox, bbox) {
                var editor = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor() : null;
                if (((elements = elements || (editor ? editor.getIndividualSelection() : null)), editor && elements && 1 === elements.length && !bbox)) {
                    var elementEditor = GEditor.GElementEditor.getEditor(elements[0]);
                    if (!elementEditor || !elementEditor.isAlignPartsAllowed())
                        if (editor.getScene().isFixedSized()) bbox = editor.getScene().getActivePage().getGeometryBBox();
                        else bbox = editor.getScene().getPaintBBox();
                }
                gDesigner.getActiveDocument().getEditor().arrangeAlign(this._type, elements, useUnitedBBox, bbox);
            }),
            (GAlignAction.prototype._isAlignOnlyCategory = function () {
                switch (this._type) {
                    case GEditor.GEditor.ArrangeAlignType.AlignLeft:
                    case GEditor.GEditor.ArrangeAlignType.AlignCenter:
                    case GEditor.GEditor.ArrangeAlignType.AlignRight:
                    case GEditor.GEditor.ArrangeAlignType.AlignTop:
                    case GEditor.GEditor.ArrangeAlignType.AlignMiddle:
                    case GEditor.GEditor.ArrangeAlignType.AlignBottom:
                        return true;
                    default:
                        return false;
                }
            }),
            (GAlignAction.prototype.getTooltipConfig = function (area) {
                return (area && GAlignAction.TOOLTIP_CONFIG[area] && GAlignAction.TOOLTIP_CONFIG[area][this._type]) || null;
            }),
            (GAlignAction.prototype.toString = function () {
                return "[Object GAlignAction]";
            }),
            (module.exports = GAlignAction));
    };
