module.exports = function (module, exports, require) {
            var n = require(90),
                r = require(182),
                o = require(564);

            function a(e) {
                ((this._offset = 0), (this._dashArray = new r(e)));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(a, n),
                (a.prototype._dashArray = null),
                (a.prototype._offset = 0),
                (a.prototype._isDashPatternValid = function () {
                    return (
                        !(this._dashArray.size() > 0) ||
                        !this._dashArray.every(function (e) {
                            return 0 === e.getValue();
                        })
                    );
                }),
                (a.prototype.write = function (e) {
                    this._isDashPatternValid() &&
                        (this._dashArray.write(e), e.writeSpace(), e.write(String(this._offset)), e.writeSpace(), e.write(o.setLineDash));
                }),
                (module.exports = a));
        };
