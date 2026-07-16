module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(7),
                o = require(11),
                a = require(122),
                s = require(95),
                l = require(6),
                h = require(561),
                A = require(796),
                c = require(795),
                p = require(1136),
                u = require(601);

            function d() {
                A.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(d, A),
                (d._parseShape = function (e) {
                    try {
                        (e._file.blockEvents(), e.parse());
                    } finally {
                        e._file.releaseEvents();
                    }
                }),
                (d.prototype._symbol = null),
                (d.prototype._symbolMaster = null),
                (d.prototype.parse = function (e, t) {
                    (A.prototype.parse.call(this),
                        (this._symbolMaster = this._file.getSymbolMaster(this.getSymbolId())),
                        this._symbolMaster &&
                            (this._data.overrides
                                ? (this._data.overrides.symbolID &&
                                      (this._symbolMaster = this._file.getSymbolMaster(this._data.overrides.symbolID)),
                                  d._parseShape(this._symbolMaster),
                                  this._resolveOverride(this._symbolMaster, this._data.overrides))
                                : d._parseShape(this._symbolMaster)));
                }),
                (d.prototype._resolveOverride = function (e, t) {
                    Object.keys(t).forEach(
                        function (i) {
                            if (isNaN(i)) {
                                if ("string" == typeof i) {
                                    if ("symbolID" === i) return;
                                    var n = i,
                                        r = e.findSymbol(n);
                                    if (r)
                                        if ("string" == typeof t[n] && r instanceof p) r.setText(t[n]);
                                        else if ("object" == typeof t[n] && "MSJSONFileReference" === t[n]._class) {
                                            if ("MSImageData" === t[n]._ref_class)
                                                if ((A = o.extend({}, r.getData())).style && A.style.fills) {
                                                    var a = o.find(A.style.fills, function (e) {
                                                        return !!e.image;
                                                    });
                                                    if (a) {
                                                        a.image = t[n];
                                                        var s = h.getClassFromName(A._class);
                                                        if (s) {
                                                            var l = new s(A, e._file, e);
                                                            (d._parseShape(l), e.replaceChild(r, l));
                                                        }
                                                    } else console.warn("Could not find fill: #" + n);
                                                } else console.warn("Could not find fills: #" + n);
                                            else console.warn("Could not resolve class: #" + t[n]._ref_class);
                                        } else {
                                            var A;
                                            if (
                                                (((A = o.extend({}, r.getData())).overrides = o.extend(A.overrides || {}, t[i])),
                                                void 0 !== A.overrides.symbolID &&
                                                    ((A.symbolID = A.overrides.symbolID), delete A.overrides.symbolID),
                                                A.symbolID && A.symbolID.trim().length)
                                            ) {
                                                var c = new d(A, e._file, e);
                                                (c.parse(), e.replaceChild(r, c));
                                            } else e.replaceChild(r, null);
                                        }
                                    else console.warn("Could not find symbol instance: #" + n);
                                }
                            } else this._resolveOverride(e, t[i]);
                        }.bind(this)
                    );
                }),
                (d.prototype.appendTo = function (e) {
                    this._symbolMaster &&
                        ((this._symbol = new a()),
                        this._symbol.setProperty("name", this._data.name),
                        this._symbol.setProperty("vis", this._data.isVisible),
                        this._symbol.setProperty("lkt", this._data.isLocked),
                        (this._symbol.__sketchNode__ = this),
                        this._symbolMaster.getChildren().forEach(
                            function (e) {
                                e.appendTo(this._symbol);
                            }.bind(this)
                        ),
                        this._symbol.accept(
                            function (e) {
                                e instanceof s &&
                                    ((e.getStatus() === s.ImageStatus.Loaded && e.getStatus() === s.ImageStatus.Error) ||
                                        e.addEventListener(s.StatusEvent, this._imageStatusEvent, this));
                            }.bind(this)
                        ),
                        this._hasImagesToResolve() || this._transform(),
                        e.appendChild(this._symbol));
                }),
                (d.prototype._hasImagesToResolve = function () {
                    var e = false;
                    return (
                        this._symbol.accept(
                            function (t) {
                                if (t instanceof s && t.getStatus() !== s.ImageStatus.Loaded && t.getStatus() !== s.ImageStatus.Error)
                                    return ((e = true), true);
                            }.bind(this)
                        ),
                        e
                    );
                }),
                (d.prototype._transformChildren = function (e, t) {
                    e.getChildren().forEach(
                        function (e) {
                            var i = e.__sketchNode__;
                            if (i) {
                                var n = r.deserialize(r.serialize(t)),
                                    o = 1,
                                    s = 1,
                                    h = n.decomposed().scale;
                                if (
                                    (i.hasResizeFlag(A.ResizeFlag.Width) || i instanceof p || (o = 1 / h._sx),
                                    i.hasResizeFlag(A.ResizeFlag.Height) || i instanceof p || (s = 1 / h._sy),
                                    1 !== o || 1 !== s)
                                ) {
                                    var c = this._getGeometryBBox().getSide(l.Side.TOP_LEFT);
                                    n = n.translated(-c.getX(), -c.getY()).scaled(o, s).translated(c.getX(), c.getY());
                                }
                                e instanceof a ? this._transformChildren(e, n) : e.transform(n);
                            }
                        }.bind(this)
                    );
                }),
                (d.prototype._transform = function () {
                    if (this._symbol.getGeometryBBox()) {
                        var e = this._symbolMaster._getGeometryBBox(),
                            t = u.getTransformation(e, this._getGeometryBBox()),
                            i = this._symbol.getTransform(),
                            n = i ? i.multiplied(t) : t;
                        (this._symbol.transform(n),
                            this._symbol.transform(this._getTransformation()),
                            1 !== t._sy &&
                                this._symbolMaster.accept(function (e) {
                                    if (e instanceof c && e.getResizingType() === A.ResizingType.PinToCorner) {
                                        var i = e._getGeometryBBox().getY() - e.getParent()._getGeometryBBox().getY(),
                                            n = i - i * t._sy;
                                        e.transform(new r().translated(0, n));
                                    }
                                }));
                    }
                }),
                (d.prototype._imageStatusEvent = function (e) {
                    (e.status !== s.ImageStatus.Loaded && e.status !== s.ImageStatus.Error) ||
                        (e.image.removeEventListener(s.StatusEvent, this._imageStatusEvent, this),
                        this._hasImagesToResolve() || this._transform());
                }),
                (d.prototype.clone = function () {
                    var e = A.prototype.clone.call(this);
                    return ((e._symbolMaster = this._file.getSymbolMaster(this.getSymbolId())), e.parse(), e);
                }),
                (module.exports = d));
        };
