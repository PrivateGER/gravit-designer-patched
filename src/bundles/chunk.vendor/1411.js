module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0),
                o = require(564);

            function a(e) {
                this._array = e;
            }
            (IsFiniteNonNegativeNumber.inherit(a, n),
                (a.prototype.write = function (e) {
                    (this._array.write(e), e.writeln(o.TJ));
                }),
                (a.prototype.toString = function () {
                    return "[Object GPDFShowText]";
                }),
                (module.exports = a));
        };
