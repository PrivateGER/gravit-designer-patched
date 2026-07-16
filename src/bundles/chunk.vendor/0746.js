module.exports = function (module, exports, require) {
            var n = require(384);

            function r() {
                n.call(this, false, false);
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype._getNumberOfPoints = function () {
                    return 3;
                }),
                (r.prototype.toString = function () {
                    return "[Object GTriangleTool]";
                }),
                (module.exports = r));
        };
