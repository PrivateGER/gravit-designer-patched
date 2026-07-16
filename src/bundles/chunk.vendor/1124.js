module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(588),
                o = require(12),
                a = require(597);

            function s() {
                a.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(s, a),
                (s.prototype._getEffect = function () {
                    var e = new r(true);
                    return (
                        e.setProperty("shp", {
                            brightness: this._data.brightness,
                            contrast: o.normalizeValue(this._data.contrast, 0, 4, -1, 1),
                            hue: o.normalizeValue(this._data.hue, -Math.PI, Math.PI, -1, 1),
                            saturation: o.normalizeValue(this._data.saturation, 0, 3.5, -1, 1),
                        }),
                        e
                    );
                }),
                (module.exports = s));
        };
