module.exports = function (module, exports, require) {
            var n = require(7),
                r = require(236),
                IsFiniteNonNegativeNumber = require(0),
                a = require(73);

            function s() {
                r.call(this, true, true);
            }
            (require(330),
                IsFiniteNonNegativeNumber.inherit(s, r),
                (s.prototype._getRelatedItemClass = function () {
                    return a;
                }),
                (s.prototype._updateShape = function (e, t, i) {
                    return (
                        !!t &&
                        (e.setProperty(
                            "trf",
                            new n(
                                Math.max(t.getWidth(), 1) / 2,
                                0,
                                0,
                                Math.max(t.getHeight(), 1) / 2,
                                t.getX() + t.getWidth() / 2,
                                t.getY() + t.getHeight() / 2
                            )
                        ),
                        true)
                    );
                }),
                (s.prototype._hasCenterCross = function () {
                    return true;
                }),
                (s.prototype._showMousePositionInlineHint = function () {
                    return true;
                }),
                (s.prototype._showAreaInlineHint = function () {
                    return true;
                }),
                (s.prototype.toString = function () {
                    return "[Object GRectangleTool]";
                }),
                (module.exports = s));
        };
