module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var Editor = require(53),
            GObject = require(1),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GTransformAction(type) {
            ((this._type = type),
                (this._title = new GObject.GLocaleKey("GTransformAction", "title." + type)),
                (GTransformAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: {
                        [GTransformAction.Type.Rotate45Left]: null,
                        [GTransformAction.Type.Rotate90Left]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "rotate-90-left-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "rotate-90-left-tooltip-description")),
                            learnMore:
                                "/docs/basics/moving-transforming-and-arranging-objects/#rotating-objects",
                        }),
                        [GTransformAction.Type.Rotate180Left]: null,
                        [GTransformAction.Type.Rotate45Right]: null,
                        [GTransformAction.Type.Rotate90Right]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "rotate-90-right-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "rotate-90-right-tooltip-description")),
                            learnMore:
                                "/docs/basics/moving-transforming-and-arranging-objects/#rotating-objects",
                        }),
                        [GTransformAction.Type.Rotate180Right]: null,
                        [GTransformAction.Type.FlipVertical]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "flip-vertical-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "flip-vertical-tooltip-description")),
                            learnMore:
                                "/docs/basics/moving-transforming-and-arranging-objects/#flipping-objects",
                        }),
                        [GTransformAction.Type.FlipHorizontal]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "flip-horizontal-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformAction", "flip-horizontal-tooltip-description")),
                            learnMore:
                                "/docs/basics/moving-transforming-and-arranging-objects/#flipping-objects",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(GTransformAction, GAction),
            (GTransformAction.Type = {
                Rotate45Left: "rotate-45-left",
                Rotate90Left: "rotate-90-left",
                Rotate180Left: "rotate-180-left",
                Rotate45Right: "rotate-45-right",
                Rotate90Right: "rotate-90-right",
                Rotate180Right: "rotate-180-right",
                FlipVertical: "flip-vertical",
                FlipHorizontal: "flip-horizontal",
            }),
            (GTransformAction.TOOLTIP_CONFIG = null),
            (GTransformAction.ID = "arrange.transform"),
            (GTransformAction.prototype._type = null),
            (GTransformAction.prototype._title = null),
            (GTransformAction.prototype.getId = function () {
                return GTransformAction.ID + "." + this._type;
            }),
            (GTransformAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GTransformAction.prototype.getIcon = function () {
                switch (this._type) {
                    case GTransformAction.Type.Rotate90Left:
                    case GTransformAction.Type.Rotate90Right:
                        return "gravit-icon-rotate";
                    case GTransformAction.Type.FlipVertical:
                        return "gravit-icon-flip-vertical";
                    case GTransformAction.Type.FlipHorizontal:
                        return "gravit-icon-flip-horizontal";
                    default:
                        return null;
                }
            }),
            (GTransformAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_TRANSFORM;
            }),
            (GTransformAction.prototype.getGroup = function () {
                var group = "";
                switch (this._type) {
                    case GTransformAction.Type.Rotate45Left:
                    case GTransformAction.Type.Rotate90Left:
                    case GTransformAction.Type.Rotate180Left:
                        group = "rotate-left";
                        break;
                    case GTransformAction.Type.Rotate45Right:
                    case GTransformAction.Type.Rotate90Right:
                    case GTransformAction.Type.Rotate180Right:
                        group = "rotate-right";
                        break;
                    case GTransformAction.Type.FlipVertical:
                    case GTransformAction.Type.FlipHorizontal:
                        group = "flip";
                }
                return "arrange/transform-" + group;
            }),
            (GTransformAction.prototype.getShortcut = function () {
                return null;
            }),
            (GTransformAction.prototype.isEnabled = function (elements) {
                let selection = elements || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null) || [];
                return (
                    (selection = selection.filter((element) => {
                        var elementEditor = Editor.GElementEditor.getEditor(element);
                        return elementEditor && (elementEditor.hasFlag(Editor.GBoxEditor.Flag.RotateCorners) || elementEditor.hasFlag(Editor.GBoxEditor.Flag.RotateHandle));
                    })),
                    selection.length > 0
                );
            }),
            (GTransformAction.prototype.execute = function (elements) {
                var document = gDesigner.getActiveDocument(),
                    scene = document.getScene();
                (elements || (elements = document.getEditor().getSelection()),
                    (elements = (elements = document.getEditor().filterIndividualElements(elements)).filter((element) => {
                        var elementEditor = Editor.GElementEditor.getEditor(element);
                        return elementEditor && (elementEditor.hasFlag(Editor.GBoxEditor.Flag.RotateCorners) || elementEditor.hasFlag(Editor.GBoxEditor.Flag.RotateHandle));
                    })));
                var boundingBox = Editor.GEditor.getGroupGeometryBBox(elements);
                boundingBox &&
                    Editor.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            for (var t = 0; t < elements.length; ++t) {
                                var n = elements[t];
                                if (n.hasMixin(GObject.GElement.Transform) && boundingBox) {
                                    var o = boundingBox.getSide(GObject.GRect.Side.CENTER),
                                        r = 0,
                                        s = 1,
                                        c = 1;
                                    switch (this._type) {
                                        case GTransformAction.Type.Rotate45Left:
                                            r = -45;
                                            break;
                                        case GTransformAction.Type.Rotate90Left:
                                            r = -90;
                                            break;
                                        case GTransformAction.Type.Rotate180Left:
                                            r = -180;
                                            break;
                                        case GTransformAction.Type.Rotate45Right:
                                            r = 45;
                                            break;
                                        case GTransformAction.Type.Rotate90Right:
                                            r = 90;
                                            break;
                                        case GTransformAction.Type.Rotate180Right:
                                            r = 180;
                                            break;
                                        case GTransformAction.Type.FlipVertical:
                                            c = -1;
                                            break;
                                        case GTransformAction.Type.FlipHorizontal:
                                            s = -1;
                                    }
                                    var d = new GObject.GTransform()
                                        .translated(-o.getX(), -o.getY())
                                        .scaled(s, c)
                                        .rotated(GObject.GMath.toRadians(r))
                                        .translated(o.getX(), o.getY());
                                    n.transform(d, true);
                                }
                            }
                        }.bind(this),
                        GObject.GLocale.get(this.getTitle())
                    );
            }),
            (GTransformAction.prototype.getTooltipConfig = function (area) {
                return (area && GTransformAction.TOOLTIP_CONFIG[area] && GTransformAction.TOOLTIP_CONFIG[area][this._type]) || null;
            }),
            (GTransformAction.prototype.toString = function () {
                return "[Object GTransformAction]";
            }),
            (module.exports = GTransformAction));
    };
