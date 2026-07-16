module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                GStylable = require(28),
                o = require(562);

            function a() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._effect = null),
                (a.prototype.parse = function () {
                    this._effect = this._getEffect();
                }),
                (a.prototype.applyTo = function (e) {
                    if (this._effect && e.hasMixin(GStylable)) {
                        var t = e.getEffects();
                        t && (this._effect.setProperty("vs", this._data.isEnabled), t.appendChild(this._effect));
                    }
                }),
                (a.prototype._getEffect = function () {
                    throw new Error("Not Implemented");
                }),
                (module.exports = a));
        };
