module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                GStylable = require(28),
                o = require(14),
                a = require(22),
                s = require(599),
                l = require(1129),
                h = require(1130),
                A = require(1131),
                c = require(1132),
                p = require(1133),
                u = require(794),
                d = require(561),
                g = 0,
                f = 1,
                m = 4,
                y = 5,
                _ = [GStylable.BorderAlignment.Center, GStylable.BorderAlignment.Inside, GStylable.BorderAlignment.Outside],
                v = [l, h, A];

            function b() {
                u.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(b, u),
                (b.prototype.parse = function (e, t) {
                    if (this._node) {
                        u.prototype.parse.call(this, e, t);
                        var i = this._data,
                            n = this._node;
                        if ((n.hasMixin(GStylable) && i.style) || i.hasBackgroundColor) {
                            var o = i.style;
                            o.borders &&
                                o.borders.forEach(
                                    function (e) {
                                        var t = new GStylable.BorderPaintLayer();
                                        (t.setProperty("_bw", e.thickness),
                                            t.setProperty("_bml", o.miterLimit),
                                            t.setProperty("_ba", _[o.position || 1]),
                                            this._parsePaintLayer(e, t),
                                            n.getPaintLayers().appendChild(t));
                                    }.bind(this)
                                );
                            var a = function (e) {
                                var t = new GStylable.FillPaintLayer();
                                (this._parsePaintLayer(e, t), n.getPaintLayers().appendChild(t));
                            }.bind(this);
                            if (
                                (o.fills && o.fills.forEach(a),
                                i.hasBackgroundColor &&
                                    (n.getPaintLayers().clearFillLayers(),
                                    a({
                                        color: i.backgroundColor,
                                        fillType: g,
                                        isEnabled: true,
                                    })),
                                !this._data.isVisible &&
                                    this._parent &&
                                    this._parent instanceof d.getClassFromName("shapeGroup") &&
                                    this._parent.hasClippingMask())
                            ) {
                                var s = this._node.getPaintLayers();
                                s &&
                                    s.getLayers().forEach(
                                        function (e) {
                                            e.setProperty("_vs", false);
                                        }.bind(this)
                                    );
                            }
                        }
                    }
                }),
                (b.prototype._postParse = function (e) {
                    (u.prototype._postParse.call(this, e),
                        !this._node.hasMixin(a.Transform) ||
                            e ||
                            this._data.noTransform ||
                            (this.setBounds(this._getGeometryBBox()), this.transform(this._getTransformation())));
                }),
                (b.prototype._parsePaintLayer = function (e, t) {
                    var i;
                    switch (
                        (t.setProperty("_vs", e.isEnabled),
                        e.contextSettings &&
                            (t.setProperty(
                                "_bl",
                                void 0 !== e.contextSettings.blendMode ? u.BlendMode[e.contextSettings.blendMode] : o.BlendMode.Normal
                            ),
                            t.setProperty("_op", void 0 !== e.contextSettings.opacity ? e.contextSettings.opacity : 1)),
                        e.fillType)
                    ) {
                        case g:
                            i = new s(e.color, this._file);
                            break;
                        case f:
                            var n = v[e.gradient.gradientType];
                            n ? (i = new n(e.gradient, this._file)) : console.warn("Unsupported gradient type: " + e.gradient.gradientType);
                            break;
                        case m:
                            i = new c(e, this._file);
                            break;
                        case y:
                            i = new p(e, this._file);
                            break;
                        default:
                            console.warn("Unsupported fill type: " + e.fillType);
                    }
                    i && i.applyTo(t);
                }),
                (module.exports = b));
        };
