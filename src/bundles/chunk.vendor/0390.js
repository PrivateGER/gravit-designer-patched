module.exports = function (module, exports, require) {
            var n = require(68),
                r = require(90),
                IsFiniteNonNegativeNumber = require(0),
                a = function () {};
            (IsFiniteNonNegativeNumber.inheritAndMix(a, r, [IsFiniteNonNegativeNumber]),
                (a.prototype.hasTransparency = function () {
                    return (null != this.getAlpha() ? this.getAlpha() : 1) < 1;
                }),
                (a.prototype.getAlpha = function () {
                    return 1;
                }),
                (a.prototype.equals = function (e) {
                    return !!(e instanceof IsFiniteNonNegativeNumber && e.hasMixin(a)) && this.asArray().equals(e.asArray());
                }),
                (a.prototype.write = function (e) {
                    this.asArray().forEach(function (t) {
                        (t.write(e), e.writeSpace());
                    });
                }),
                (a.prototype.asArray = function () {}),
                (a.rgbToCMYK = function (e) {
                    return n.rgbToCMYK([(e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255]);
                }),
                (module.exports = a));
        };
