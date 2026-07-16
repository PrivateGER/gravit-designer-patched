module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(321),
                o = require(597),
                a = require(599);

            function s() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(s, o),
                (s.prototype._getEffect = function () {
                    var e = new a(this._data.color),
                        t = new r();
                    return (
                        t.setProperties(
                            ["r", "x", "y", "pat", "opc"],
                            [this._data.blurRadius, this._data.offsetX, this._data.offsetY, e._color, e._alpha]
                        ),
                        t
                    );
                }),
                (module.exports = s));
        };
