module.exports = function (module, exports, require) {
        "use strict";
        (require(328 /* polyfill:Array */), require(3));
        var GEditor = require(53),
            GObject = require(1),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GDistributeAction(type) {
            ((this._type = type),
                (this._title = new GObject.GLocaleKey("GDistributeAction", "title." + type)),
                (GDistributeAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.SIDEBAR]: {
                        [GDistributeAction.Type.Horizontal]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GDistributeAction", "text.horizontal-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GDistributeAction", "text.horizontal-tooltip-description")),
                            learnMore: "/docs/arrange-objects/distribute/",
                        }),
                        [GDistributeAction.Type.Vertical]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GDistributeAction", "text.vertical-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GDistributeAction", "text.vertical-tooltip-description")),
                            learnMore: "/docs/arrange-objects/distribute/",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(GDistributeAction, GAction),
            (GDistributeAction.Type = { Horizontal: "horizontal", Vertical: "vertical" }),
            (GDistributeAction.TOOLTIP_CONFIG = null),
            (GDistributeAction.ID = "arrange.distribute"),
            (GDistributeAction.prototype._type = null),
            (GDistributeAction.prototype._title = null),
            (GDistributeAction.prototype.getId = function () {
                return GDistributeAction.ID + "." + this._type;
            }),
            (GDistributeAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GDistributeAction.prototype.getIcon = function () {
                switch (this._type) {
                    case GDistributeAction.Type.Horizontal:
                        return '<svg class="align-svg" xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="3 2 20 20" width="20" height="20"><rect id="align-area" x="4" y="6" width="4" height="12" fill="#FFF"/><rect id="align-area" x="18" y="8" width="4" height="8" fill="#FFF"/><rect id="align-shape" x="10" y="3" width="2" height="18" fill="#3A98FF"/><rect id="align-shape" x="14" y="3" width="2" height="18" fill="#3A98FF"/></svg>';
                    case GDistributeAction.Type.Vertical:
                        return '<svg class="align-svg" xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="28 2 20 20" width="20" height="20"><rect id="align-area" x="36" y="13" width="4" height="12" transform="rotate(-90 38 19)" fill="#FFF"/><rect id="align-area" x="36" y="1" width="4" height="8" transform="rotate(-90 38 5)" fill="#FFF"/><rect id="align-shape" x="37" y="5" width="2" height="18" transform="rotate(-90 38 14)" fill="#3A98FF"/><rect id="align-shape" x="37" y="1" width="2" height="18" transform="rotate(-90 38 10)" fill="#3A98FF"/></svg>';
                    default:
                        return null;
                }
            }),
            (GDistributeAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ALIGN;
            }),
            (GDistributeAction.prototype.getGroup = function () {
                return "arrange/align-distribute";
            }),
            (GDistributeAction.prototype.getShortcut = function () {
                return null;
            }),
            (GDistributeAction.prototype.isEnabled = function (elements, area, spacing) {
                return (
                    !!(elements =
                        elements || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    (area ? elements.length > 1 : spacing > 0 ? elements.length >= 2 : elements.length > 2)
                );
            }),
            (GDistributeAction.prototype.execute = function (elements, area, spacing) {
                var document = gDesigner.getActiveDocument(),
                    scene = document.getScene();
                elements || (elements = document.getEditor().getSelection());
                var filteredElements = (elements = document.getEditor().filterIndividualElements(elements));
                elements = [];
                for (let t = 0; t < filteredElements.length; ++t) {
                    var c = filteredElements[t];
                    if (c.hasMixin(GObject.GElement.Transform)) {
                        var d = c.getGeometryBBox();
                        if (!d || d.getWidth() + d.getHeight() === 0) continue;
                        elements.push({ elbbox: d, element: c });
                    }
                }
                if (!area) for (let n = 0; n < elements.length; ++n) area = area ? area.united(elements[n].elbbox) : elements[n].elbbox;
                if (area && !area.isEmpty())
                    if (this._type === GDistributeAction.Type.Horizontal) {
                        elements.sort(function (itemA, itemB) {
                            return itemA.elbbox.getX() + itemA.elbbox.getWidth() / 2 - itemB.elbbox.getX() - itemB.elbbox.getWidth() / 2;
                        });
                        let centerStep = null;
                        if (!spacing)
                            if (elements.length > 1) {
                                let totalWidth = 0;
                                for (let t = 0; t < elements.length; ++t) totalWidth += elements[t].elbbox.getWidth();
                                totalWidth <= area.getWidth()
                                    ? (spacing = (area.getWidth() - totalWidth) / (elements.length - 1))
                                    : (centerStep =
                                          (area.getWidth() - elements[0].elbbox.getWidth() / 2 - elements[elements.length - 1].elbbox.getWidth() / 2) /
                                          (elements.length - 1));
                            } else spacing = 0;
                        GEditor.GEditor.tryRunTransaction(
                            scene,
                            function () {
                                var x = area.getX();
                                if (null === centerStep)
                                    for (let t = 0; t < elements.length; ++t)
                                        (x !== elements[t].elbbox.getX() &&
                                            elements[t].element.transform(new GObject.GTransform(1, 0, 0, 1, x - elements[t].elbbox.getX(), 0), true),
                                            (x += elements[t].elbbox.getWidth() + spacing));
                                else {
                                    var centerX = x + elements[0].elbbox.getWidth() / 2;
                                    for (let t = 0; t < elements.length; ++t) {
                                        var s = centerX + centerStep * t - elements[t].elbbox.getWidth() / 2;
                                        s !== elements[t].elbbox.getX() &&
                                            elements[t].element.transform(new GObject.GTransform(1, 0, 0, 1, s - elements[t].elbbox.getX(), 0), true);
                                    }
                                }
                            }.bind(this),
                            GObject.GLocale.get(this.getTitle())
                        );
                    } else if (this._type === GDistributeAction.Type.Vertical) {
                        elements.sort(function (itemA, itemB) {
                            return itemA.elbbox.getY() + itemA.elbbox.getHeight() / 2 - (itemB.elbbox.getY() + itemB.elbbox.getHeight() / 2);
                        });
                        let centerStep = null;
                        if (!spacing)
                            if (elements.length > 1) {
                                let totalHeight = 0;
                                for (let t = 0; t < elements.length; ++t) totalHeight += elements[t].elbbox.getHeight();
                                totalHeight <= area.getHeight()
                                    ? (spacing = (area.getHeight() - totalHeight) / (elements.length - 1))
                                    : (centerStep =
                                          (area.getHeight() - elements[0].elbbox.getHeight() / 2 - elements[elements.length - 1].elbbox.getHeight() / 2) /
                                          (elements.length - 1));
                            } else spacing = 0;
                        GEditor.GEditor.tryRunTransaction(
                            scene,
                            function () {
                                var y = area.getY();
                                if (null === centerStep)
                                    for (let t = 0; t < elements.length; ++t)
                                        (y !== elements[t].elbbox.getY() &&
                                            elements[t].element.transform(new GObject.GTransform(1, 0, 0, 1, 0, y - elements[t].elbbox.getY()), true),
                                            (y += elements[t].elbbox.getHeight() + spacing));
                                else {
                                    var centerY = y + elements[0].elbbox.getHeight() / 2;
                                    for (let t = 0; t < elements.length; ++t) {
                                        var s = centerY + centerStep * t - elements[t].elbbox.getHeight() / 2;
                                        s !== elements[t].elbbox.getX() &&
                                            elements[t].element.transform(new GObject.GTransform(1, 0, 0, 1, 0, s - elements[t].elbbox.getY()), true);
                                    }
                                }
                            }.bind(this),
                            GObject.GLocale.get(this.getTitle())
                        );
                    }
            }),
            (GDistributeAction.prototype.getTooltipConfig = function (area) {
                return (area && GDistributeAction.TOOLTIP_CONFIG[area] && GDistributeAction.TOOLTIP_CONFIG[area][this._type]) || null;
            }),
            (GDistributeAction.prototype.toString = function () {
                return "[Object GDistributeAction]";
            }),
            (module.exports = GDistributeAction));
    };
