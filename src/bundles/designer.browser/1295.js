module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GEditor = require(53),
            GPlatform = require(15),
            GObject = require(1),
            GCategory = require(18),
            GAction = require(31);
        function GSnapUnitAction(category) {
            ((this._category = category), (this._title = new GObject.GLocaleKey("GSnapUnitAction", "title." + category)));
        }
        (GObject.GObject.inherit(GSnapUnitAction, GAction),
            (GSnapUnitAction.Type = { FullUnit: "full", HalfUnit: "half" }),
            (GSnapUnitAction.ID = "arrange.snap-unit"),
            (GSnapUnitAction.prototype._category = null),
            (GSnapUnitAction.prototype._title = null),
            (GSnapUnitAction.prototype.getId = function () {
                return GSnapUnitAction.ID + "." + this._category;
            }),
            (GSnapUnitAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GSnapUnitAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ALIGN;
            }),
            (GSnapUnitAction.prototype.getGroup = function () {
                return "arrange/snap-unit";
            }),
            (GSnapUnitAction.prototype.getShortcut = function () {
                switch (this._category) {
                    case GSnapUnitAction.Type.FullUnit:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "U"];
                    default:
                        return null;
                }
            }),
            (GSnapUnitAction.prototype.isEnabled = function (selection) {
                return (
                    (selection =
                        selection || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    selection.length > 0
                );
            }),
            (GSnapUnitAction.prototype.execute = function (selection) {
                var activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument.getScene();
                (selection || (selection = activeDocument.getEditor().getIndividualSelection()),
                    GEditor.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            for (var t = 0; t < selection.length; ++t) {
                                var n = selection[t];
                                if (n.hasMixin(GObject.GElement.Transform)) {
                                    var o = n.getGeometryBBox();
                                    if (o && o.getWidth() + o.getHeight() !== 0) {
                                        var i = GObject.GMath.round(o.getX(), true),
                                            r = GObject.GMath.round(o.getY(), true),
                                            s = GObject.GMath.round(o.getWidth(), true),
                                            c = GObject.GMath.round(o.getHeight(), true);
                                        this._category === GSnapUnitAction.Type.HalfUnit && ((i += 0.5), (r += 0.5), (s += 0.5), (c += 0.5));
                                        var d = new GObject.GTransform()
                                            .translated(-o.getX(), -o.getY())
                                            .scaled(s / (o.getWidth() || 1), c / (o.getHeight() || 1))
                                            .translated(o.getX(), o.getY())
                                            .translated(i - o.getX(), r - o.getY());
                                        n.transform(d);
                                    }
                                }
                            }
                        }.bind(this),
                        GObject.GLocale.get(this.getTitle())
                    ));
            }),
            (GSnapUnitAction.prototype.toString = function () {
                return "[Object GSnapUnitAction]";
            }),
            (module.exports = GSnapUnitAction));
    };
