module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(38));
        var GObject = require(1),
            GSelectByAction = _interopRequireDefault(require(609 /* GSelectByAction */));
        function GSelectByPaintLayerAction(type) {
            ((this._type = type), GSelectByAction.default.call(this, GSelectByPaintLayerAction.getId(type), GSelectByPaintLayerAction.getTitle(type)));
        }
        (GObject.GObject.inherit(GSelectByPaintLayerAction, GSelectByAction.default),
            (GSelectByPaintLayerAction.ID = "edit.select-by-paintlayer"),
            (GSelectByPaintLayerAction.getId = function (type) {
                return "".concat(GSelectByPaintLayerAction.ID, ".").concat(type);
            }),
            (GSelectByPaintLayerAction.getTitle = function (type) {
                return new GObject.GLocaleKey("GSelectByPaintLayerAction", "title.".concat(type));
            }),
            (GSelectByPaintLayerAction.Type = {
                Fill: "fill",
                Border: "border",
                FillAndBorder: "fill_border",
            }),
            (GSelectByPaintLayerAction.prototype._type = null),
            (GSelectByPaintLayerAction.prototype.getGroup = function () {
                return "edit/select-by-paintlayer";
            }),
            (GSelectByPaintLayerAction.prototype._getValue = function (element) {
                switch (this._type) {
                    case GSelectByPaintLayerAction.Type.Fill:
                        return this._getFillPatterns(element);
                    case GSelectByPaintLayerAction.Type.Border:
                        return this._getBorderPatterns(element);
                    case GSelectByPaintLayerAction.Type.FillAndBorder: {
                        const fillPatterns = this._getFillPatterns(element),
                            borderPatterns = this._getBorderPatterns(element);
                        return fillPatterns === GSelectByAction.default.EmptyValue || borderPatterns === GSelectByAction.default.EmptyValue ? GSelectByAction.default.EmptyValue : { fills: fillPatterns, borders: borderPatterns };
                    }
                    default:
                        return GSelectByAction.default.EmptyValue;
                }
            }),
            (GSelectByPaintLayerAction.prototype._getFillPatterns = function (element) {
                if (element.hasMixin(GObject.GStylable)) {
                    const paintLayers = element.getPaintLayers(),
                        fillLayers = paintLayers && paintLayers.getFillLayers(true);
                    if (fillLayers && fillLayers.length > 0) return fillLayers.map((layer) => layer.getProperty("_pt"));
                }
                return GSelectByAction.default.EmptyValue;
            }),
            (GSelectByPaintLayerAction.prototype._getBorderPatterns = function (element) {
                if (element.hasMixin(GObject.GStylable)) {
                    const paintLayers = element.getPaintLayers(),
                        borderLayers = paintLayers && paintLayers.getBorderLayers(true);
                    if (borderLayers && borderLayers.length) return borderLayers.map((layer) => layer.getProperty("_pt"));
                }
                return GSelectByAction.default.EmptyValue;
            }),
            (GSelectByPaintLayerAction.prototype.toString = function () {
                return "[Object GSelectByPaintLayerAction]";
            }),
            (module.exports = GSelectByPaintLayerAction));
    };
