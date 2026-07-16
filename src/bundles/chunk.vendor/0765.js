module.exports = function (module, exports, require) {
            require(7);
            var n = require(551),
                r = require(317),
                IsFiniteNonNegativeNumber = require(0),
                a = require(212),
                s = require(52);

            function l() {
                n.call(this, true, true);
            }
            (require(766),
                IsFiniteNonNegativeNumber.inheritAndMix(l, n, [a]),
                (l.prototype._getRelatedItemClass = function () {
                    return r;
                }),
                (l.prototype.getCursor = function () {
                    return s.CrossEllipse;
                }),
                (l.prototype._showMousePositionInlineHint = function () {
                    return false;
                }),
                (l.prototype.toString = function () {
                    return "[Object GEllipseAnnotationTool]";
                }),
                (module.exports = l));
        };
