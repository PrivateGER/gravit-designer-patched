module.exports = function (module, exports, require) {
            var n = require(7),
                r = require(236),
                o = require(285),
                IsFiniteNonNegativeNumber = require(0),
                s = require(212),
                l = (require(60), require(17), require(28 /* GStylable */), require(52));

            function h() {
                r.call(this, true, true);
            }
            (require(772),
                IsFiniteNonNegativeNumber.inheritAndMix(h, r, [s]),
                (h.prototype._getRelatedItemClass = function () {
                    return o;
                }),
                (h.prototype._updateShape = function (e, t, i) {
                    if (t) {
                        var r = new n(t.getWidth() / 2, 0, 0, t.getHeight() / 2, t.getX() + t.getWidth() / 2, t.getY() + t.getHeight() / 2),
                            o = (e.getProperty("trf") || new n()).inverted() || new n();
                        return (e.transform(o.multiplied(r)), true);
                    }
                    return false;
                }),
                (h.prototype._createShape = function () {
                    return null;
                }),
                (h.prototype._mouseDragStart = function (e) {}),
                (h.prototype._mouseDrag = function (e) {}),
                (h.prototype._mouseDragEnd = function (e) {}),
                (h.prototype._createShapeManually = function (e) {
                    var t = new o();
                    (t.initDefaultForLimitedRestore(),
                        t.initSizeAndPosition(),
                        t.transform(new n(1, 0, 0, 1, e.getX(), e.getY())),
                        this._insertShape(t));
                }),
                (h.prototype._showMousePositionInlineHint = function () {
                    return false;
                }),
                (h.prototype._showAreaInlineHint = function () {
                    return true;
                }),
                (h.prototype.getCursor = function () {
                    return l.Comment;
                }),
                (h.prototype.toString = function () {
                    return "[Object GCommentAnnotationTool]";
                }),
                (module.exports = h));
        };
