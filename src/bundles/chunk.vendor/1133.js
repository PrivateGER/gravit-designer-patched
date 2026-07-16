module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(518),
                o = require(600);

            function a() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype._pattern = null),
                (a.prototype.parse = function () {
                    var e = Object.keys(r.Type).map(function (e) {
                        return r.Type[e];
                    });
                    ((this._pattern = new r()), this._pattern.setType(e[this._data.noiseIndex]));
                }),
                (a.prototype.applyTo = function (e) {
                    e.setProperty("_pt", this._pattern);
                }),
                (module.exports = a));
        };
