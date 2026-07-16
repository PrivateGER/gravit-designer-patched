module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GPlatform = require(15),
            GObject = require(1),
            GCategory = require(18),
            s = require(31);
        function l(e) {
            ((this._category = e), (this._title = new GObject.GLocaleKey("GSnapUnitAction", "title." + e)));
        }
        (GObject.GObject.inherit(l, s),
            (l.Type = { FullUnit: "full", HalfUnit: "half" }),
            (l.ID = "arrange.snap-unit"),
            (l.prototype._category = null),
            (l.prototype._title = null),
            (l.prototype.getId = function () {
                return l.ID + "." + this._category;
            }),
            (l.prototype.getTitle = function () {
                return this._title;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ALIGN;
            }),
            (l.prototype.getGroup = function () {
                return "arrange/snap-unit";
            }),
            (l.prototype.getShortcut = function () {
                switch (this._category) {
                    case l.Type.FullUnit:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "U"];
                    default:
                        return null;
                }
            }),
            (l.prototype.isEnabled = function (e) {
                return (
                    (e =
                        e || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    e.length > 0
                );
            }),
            (l.prototype.execute = function (e) {
                var t = gDesigner.getActiveDocument(),
                    n = t.getScene();
                (e || (e = t.getEditor().getIndividualSelection()),
                    o.GEditor.tryRunTransaction(
                        n,
                        function () {
                            for (var t = 0; t < e.length; ++t) {
                                var n = e[t];
                                if (n.hasMixin(GObject.GElement.Transform)) {
                                    var o = n.getGeometryBBox();
                                    if (o && o.getWidth() + o.getHeight() !== 0) {
                                        var i = GObject.GMath.round(o.getX(), true),
                                            r = GObject.GMath.round(o.getY(), true),
                                            s = GObject.GMath.round(o.getWidth(), true),
                                            c = GObject.GMath.round(o.getHeight(), true);
                                        this._category === l.Type.HalfUnit && ((i += 0.5), (r += 0.5), (s += 0.5), (c += 0.5));
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
            (l.prototype.toString = function () {
                return "[Object GSnapUnitAction]";
            }),
            (module.exports = l));
    };
