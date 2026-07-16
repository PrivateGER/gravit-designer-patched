module.exports = function (module, exports, require) {
            require(7);
            var n = require(550),
                r = require(319),
                IsFiniteNonNegativeNumber = require(0),
                a = require(212),
                s = require(52);

            function l() {
                n.call(this, true, true);
            }
            (require(770),
                IsFiniteNonNegativeNumber.inheritAndMix(l, n, [a]),
                (l.prototype._getRelatedItemClass = function () {
                    return r;
                }),
                (l.prototype.getCursor = function () {
                    return s.CrossArrow;
                }),
                (l.prototype._showMousePositionInlineHint = function () {
                    return false;
                }),
                (l.prototype.toString = function () {
                    return "[Object GArrowAnnotationTool]";
                }),
                (module.exports = l));
        };
