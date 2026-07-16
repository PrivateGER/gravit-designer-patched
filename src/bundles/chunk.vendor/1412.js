module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0),
                o = require(338),
                a = require(564);

            function s(e) {
                this._width = e;
            }
            (IsFiniteNonNegativeNumber.inherit(s, n),
                (s.prototype._width = null),
                (s.prototype.write = function (e) {
                    (e.write(o.normalizeNumber(this._width)), e.writeSpace(), e.write(a.setLineWidth));
                }),
                (s.prototype.toString = function () {
                    return "[GPDFSetLineWidthOperation]";
                }),
                (module.exports = s));
        };
