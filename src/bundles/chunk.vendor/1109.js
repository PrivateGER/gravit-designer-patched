module.exports = function (module, exports, require) {
            var n = require(559),
                IsFiniteNonNegativeNumber = require(0),
                o = require(188),
                a = require(437),
                s = require(390),
                l = require(182),
                h = function (e) {
                    var t = 1;
                    if (e instanceof o) e = e.getValue();
                    else if ("string" == typeof e && 0 === e.indexOf("cmyk")) {
                        var i = e.match(/\d+(\.\d+)?/g).map(function (e) {
                            return parseFloat(e);
                        });
                        ((e = i.slice(0, 4)), 5 == i.length && (t = i[4]));
                    }
                    if (Array.isArray(e)) ((this._cmyk = e), (this._alpha = t));
                    else {
                        var r = new n(e);
                        ((this._cmyk = s.rgbToCMYK(r.asRGBA())), (this._alpha = r.getAlpha()));
                    }
                };
            (IsFiniteNonNegativeNumber.inheritAndMix(h, a, [s]),
                (h.prototype.getAlpha = function () {
                    return this._alpha;
                }),
                (h.prototype.asArray = function () {
                    return new l([this._cmyk[0] || 0, this._cmyk[1] || 0, this._cmyk[2] || 0, this._cmyk[3] || 0]);
                }),
                (module.exports = h));
        };
