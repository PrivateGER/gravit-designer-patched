module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(282),
                o = require(839),
                a = require(265),
                GStylable = require(28),
                l = require(22),
                h = require(597),
                A = require(598);

            function c() {
                h.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(c, h),
                (c.Type = {
                    GaussianBlur: 0,
                    MotionBlur: 1,
                    ZoomBlur: 2,
                    BackgroundBlur: 3,
                }),
                (c.prototype._getEffect = function () {
                    var e;
                    if (this._data.isEnabled)
                        if (this._data.type === c.Type.ZoomBlur || this._data.type === c.Type.MotionBlur) {
                            var t = A.parse(this._data.center);
                            (e = new o()).setProperty("shp", {
                                centerX: 100 * t.getX(),
                                centerY: 100 * t.getY(),
                                strength: this._data.radius / 50,
                            });
                        } else
                            (e = new r()).setProperty("shp", {
                                radius: 3 * this._data.radius,
                                clip: this._data.type === c.Type.BackgroundBlur,
                            });
                    return e;
                }),
                (c.prototype.applyTo = function (e) {
                    if (
                        (h.prototype.applyTo.call(this, e),
                        this._data.isEnabled && this._data.type === c.Type.BackgroundBlur && e.hasMixin(GStylable))
                    ) {
                        var t = e.getPaintLayers();
                        t && (t.appendChild(new GStylable.FillPaintLayer(new a())), e.hasMixin(l) && e._requestInvalidation());
                    }
                }),
                (module.exports = c));
        };
