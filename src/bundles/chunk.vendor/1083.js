module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(534),
                o = require(63),
                a = require(128),
                s = require(36),
                l = require(141),
                h = require(39),
                A = require(24);

            function c(e) {
                a.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(c, a),
                s.exports(c, r),
                (c.prototype._paintOutline = function (e, t, i, n, r) {
                    var a,
                        s = this.getPaintElement(),
                        c = new o(s, e);
                    (a = new l(c)) &&
                        (t.canvas.putVertices(a, false),
                        t.canvas.strokeVertices(
                            n || (this.hasFlag(h.Flag.Highlighted) ? t.highlightOutlineColor : t.selectionOutlineColor),
                            A.outlineWidth
                        ));
                }),
                (c.prototype.getBox = function () {
                    return this.getPaintElement().getGeometryBBox();
                }),
                (c.prototype.getBoxTransform = function () {
                    return null;
                }),
                (c.prototype.resetTransform = function () {
                    for (var e = this._editors ? this._editors.length : 0; e > 0; --e) {
                        var t = this._editors[e - 1];
                        t && t instanceof s && t.resetTransform();
                    }
                    a.prototype.resetTransform.call(this);
                }),
                (c.prototype.toString = function () {
                    return "[Object GImageGridEditor]";
                }),
                (module.exports = c));
        };
