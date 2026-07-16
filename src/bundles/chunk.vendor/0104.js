module.exports = function (module, exports, require) {
            var n = require(6),
                r = require(2),
                IsFiniteNonNegativeNumber = require(0),
                a = require(69),
                s = require(22),
                GStylable = require(28),
                h = require(11),
                A = require(12);

            function c() {
                (a.call(this), this._setDefaultProperties(c.MetaProperties), this._setDefaultProperties(s.Anchor.MetaProperties));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(c, a, [s.Anchor]),
                (c.MetaProperties = {
                    clk: false,
                }),
                (c.prototype.skipBorderUpdate = false),
                (c.prototype.validateInsertion = function (e, t) {
                    return "layer" === r.getName(e) || e instanceof c || "page" === r.getName(e);
                }),
                (c.prototype.assignFrom = function (e) {
                    (e instanceof c && this.transferProperties(e, [c.MetaProperties, s.Anchor.MetaProperties]),
                        a.prototype.assignFrom.call(this, e));
                }),
                (c.prototype.getCenter = function (e) {
                    var t = this.getGeometryBBox();
                    return t ? t.getSide(n.Side.CENTER) : null;
                }),
                (c.prototype._handleChange = function (e, t) {
                    (e === r._Change.Store
                        ? this.storeProperties(t.blob, c.MetaProperties)
                        : e === r._Change.Restore
                          ? this.restoreProperties(t.blob, c.MetaProperties)
                          : e === r._Change.AfterPropertiesChange &&
                            t.properties.indexOf("trf") >= 0 &&
                            this._scene &&
                            !this.isRecordedTransaction() &&
                            !this.skipBorderUpdate &&
                            this._handleBorderScale(t),
                        a.prototype._handleChange.call(this, e, t),
                        s.Anchor.prototype._handleAnchorChange.call(this, e, t));
                }),
                (c.prototype._handleBorderScale = function (e) {
                    var t = this._scene ? this._scene.getTransformSettings() : null;
                    if (this.hasMixin(GStylable) && (!t || false !== t.borderScale)) {
                        var i = this._layoutTransform;
                        if (!i) {
                            var n = e.properties.indexOf("trf"),
                                r = this.getProperty("trf"),
                                o = e.values[n];
                            (o && (i = o.inverted()), r && (i = i ? i.multiplied(r) : r));
                        }
                        if (i) {
                            var a,
                                s = i.decomposed().scale.getMatrix();
                            if (((a = Math.sqrt(Math.abs(s[0] * s[3]))), !A.isEqualEps(a, 1, 1e-8))) {
                                var c = this.getPaintLayers();
                                c &&
                                    h.each(c.getBorderLayers(), function (e, i) {
                                        (i.$_bs || (t && true === t.borderScale)) && i.setProperty("_bw", i.$_bw * a);
                                    });
                            }
                        }
                    }
                }),
                (module.exports = c));
        };
