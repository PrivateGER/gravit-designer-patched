module.exports = function (module, exports, require) {
            var n = require(50),
                r = require(2),
                o = require(112),
                a = require(104),
                s = require(6),
                l = require(83),
                h = require(159),
                String = require(9);

            function c() {
                (a.call(this), this._setDefaultProperties(c.VisualProperties, c.GeometryProperties, c.MetaProperties));
            }
            (r.inheritAndMix("slice", c, a),
                (c.MetaProperties = {
                    trm: true,
                    cls: null,
                }),
                (c.GeometryProperties = {
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100,
                }),
                (c.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GSlice", "name", this.getNodeName());
                }),
                (c.prototype.validateInsertion = function (e, t) {
                    return e instanceof h || e instanceof l;
                }),
                (c.prototype._paintToBitmap = function (e) {
                    if (!this._scene) throw new Error("Not part of a scene.");
                    var t = e.configuration,
                        i = t.sceneBackground;
                    t.sceneBackground = false;
                    try {
                        (this.$cls && e.canvas.fillCanvas(this.$cls), this._scene.paint(e));
                        var n = e.canvas.getBitmap();
                        return (this.getProperty("trm") && n.trim(), n);
                    } finally {
                        t.sceneBackground = i;
                    }
                }),
                (c.prototype._paint = function (e) {
                    if (e.configuration.isSlicesVisible(e)) {
                        var t = this.getGeometryBBox().toAlignedRect();
                        e.configuration.isOutline(e)
                            ? e.canvas.strokeRect(t.getX(), t.getY(), t.getWidth(), t.getHeight(), 1, e.getOutlineColor())
                            : e.canvas.fillRect(t.getX(), t.getY(), t.getWidth(), t.getHeight(), e.sliceColor, 0.25);
                    }
                }),
                (c.prototype._calculateGeometryBBox = function (e) {
                    return this.getSourceBBox(e);
                }),
                (c.prototype._calculatePaintBBox = function (e, t) {
                    return this.getGeometryBBox(t);
                }),
                (c.prototype._calculateSourceBBox = function (e) {
                    return new s(this.$x, this.$y, this.$w, this.$h);
                }),
                (c.prototype._handleChange = function (e, t) {
                    (e === r._Change.Store
                        ? (this.storeProperties(t.blob, c.MetaProperties, function (e, t) {
                              return "cls" === e && t ? n.serialize(t) : t;
                          }),
                          this.storeProperties(t.blob, c.GeometryProperties))
                        : e === r._Change.Restore &&
                          (this.restoreProperties(t.blob, c.MetaProperties, function (e, t) {
                              return "cls" === e && t ? n.deserialize(t) : t;
                          }),
                          this.restoreProperties(t.blob, c.GeometryProperties)),
                        this._handleGeometryChangeForProperties(e, t, c.GeometryProperties),
                        a.prototype._handleChange.call(this, e, t));
                }),
                (c.prototype._detailHitTest = function (e, t, i, n) {
                    return new o(this);
                }),
                (module.exports = c));
        };
