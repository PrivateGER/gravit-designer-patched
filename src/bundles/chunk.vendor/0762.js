module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(5),
                o = require(6),
                a = require(7),
                s = require(236),
                l = require(528),
                h = require(530);

            function A(e, t) {
                s.call(this, e, t);
            }
            (IsFiniteNonNegativeNumber.inherit(A, s),
                (A.prototype._sShapeName = null),
                (A.prototype._sShapeInitWidth = null),
                (A.prototype._sShapeInitHeight = null),
                (A.prototype._annotationsParamInitVals = null),
                (A.prototype._parameterizedVertexProcessor = null),
                (A.prototype._icon = null),
                (A.prototype.init = function (e) {
                    if (
                        ((this._sShapeName = e.name),
                        (this._sShapeInitWidth = e.width),
                        (this._sShapeInitHeight = e.height),
                        (this._annotationsParamInitVals = null),
                        e.annotations && e.annotations.annotList && e.annotations.annotList.length)
                    )
                        for (var t = e.annotations.annotList, i = 0; i < t.length; ++i) {
                            var n = t[i];
                            this._annotationsParamInitVals
                                ? this._annotationsParamInitVals.push(new r(n.x0, n.y0))
                                : (this._annotationsParamInitVals = [new r(n.x0, n.y0)]);
                        }
                    this._parameterizedVertexProcessor = new l(
                        e.annotations ? e.annotations.name : null,
                        e.annotations ? e.annotations.annotList : null,
                        e.parameters,
                        e.vertices
                    );
                }),
                (A.prototype.setIcon = function (e) {
                    this._icon = e;
                }),
                (A.prototype.getIcon = function () {
                    return this._icon ? this._icon : null;
                }),
                (A.prototype._createShapeManually = function (e) {
                    if (this._parameterizedVertexProcessor) {
                        var t = new h(
                                this._parameterizedVertexProcessor,
                                this._annotationsParamInitVals,
                                this._sShapeInitWidth,
                                this._sShapeInitHeight,
                                this._sShapeName,
                                this._icon
                            ),
                            i = t.getSourceBBox().getSide(o.Side.TOP_LEFT),
                            n = t.getProperty("trf");
                        n && (i = n.mapPoint(i));
                        var r = new a(1, 0, 0, 1, e.getX() - i.getX(), e.getY() - i.getY());
                        (t.setProperty("trf", n ? n.multiplied(r) : r), this._insertShape(t));
                    }
                }),
                (A.prototype._createShape = function () {
                    var e = null;
                    return (
                        this._parameterizedVertexProcessor &&
                            (e = new h(
                                this._parameterizedVertexProcessor,
                                this._annotationsParamInitVals,
                                this._sShapeInitWidth,
                                this._sShapeInitHeight,
                                this._sShapeName,
                                this._icon
                            )),
                        e
                    );
                }),
                (A.prototype._updateShape = function (e, t, i) {
                    if (t) {
                        var n = e.getSourceBBox();
                        if (n && !n.isEmpty()) {
                            var r = a.getNativeRectTransformation(n),
                                o = a.getNativeRectTransformation(t);
                            return (e.setProperty("trf", r.inverted().multiplied(o)), true);
                        }
                    }
                    return false;
                }),
                (A.prototype.toString = function () {
                    return "[Object GSimpleShapeTool]";
                }),
                (module.exports = A));
        };
