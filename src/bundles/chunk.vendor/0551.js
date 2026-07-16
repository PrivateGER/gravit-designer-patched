module.exports = function (module, exports, require) {
            var n = require(7),
                r = require(236),
                o = require(214),
                IsFiniteNonNegativeNumber = require(0);

            function s() {
                r.call(this, true, true);
            }
            (require(552),
                IsFiniteNonNegativeNumber.inherit(s, r),
                (s.prototype._getRelatedItemClass = function () {
                    return o;
                }),
                (s.prototype._updateShape = function (e, t, i) {
                    return (
                        !!t &&
                        (e.setProperty(
                            "trf",
                            new n(
                                Math.max(1, t.getWidth()) / 2,
                                0,
                                0,
                                Math.max(1, t.getHeight()) / 2,
                                t.getX() + t.getWidth() / 2,
                                t.getY() + t.getHeight() / 2
                            )
                        ),
                        true)
                    );
                }),
                (s.prototype._showMousePositionInlineHint = function () {
                    return true;
                }),
                (s.prototype._showAreaInlineHint = function () {
                    return true;
                }),
                (s.prototype._hasCenterCross = function () {
                    return true;
                }),
                (s.prototype.toString = function () {
                    return "[Object GEllipseTool]";
                }),
                (module.exports = s));
        };
