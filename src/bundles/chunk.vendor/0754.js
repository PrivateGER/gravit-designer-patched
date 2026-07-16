module.exports = function (module, exports, require) {
            var n = require(384);

            function r() {
                n.call(this, false, false);
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype._getNumberOfPoints = function () {
                    return 5;
                }),
                (r.prototype._getInnerRadiusFactor = function () {
                    return 0.5;
                }),
                (r.prototype._lockAngle = function (e) {
                    return (Math.round((10 * e) / Math.PI) * Math.PI) / 10;
                }),
                (r.prototype.toString = function () {
                    return "[Object GStarTool]";
                }),
                (module.exports = r));
        };
