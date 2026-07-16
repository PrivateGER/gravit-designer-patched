module.exports = function (module, exports, require) {
            require(7);
            var n = require(549),
                r = require(316),
                IsFiniteNonNegativeNumber = require(0),
                a = require(212),
                s = require(52);

            function l() {
                n.call(this, true, true);
            }
            (require(768),
                IsFiniteNonNegativeNumber.inheritAndMix(l, n, [a]),
                (l.prototype._getRelatedItemClass = function () {
                    return r;
                }),
                (l.prototype.getCursor = function () {
                    return s.CrossRectangle;
                }),
                (l.prototype._showMousePositionInlineHint = function () {
                    return false;
                }),
                (l.prototype.toString = function () {
                    return "[Object GRectangleAnnotationTool]";
                }),
                (module.exports = l));
        };
