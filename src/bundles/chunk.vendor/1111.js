module.exports = function (module, exports, require) {
            var n = require(559),
                IsFiniteNonNegativeNumber = require(0),
                o = require(437),
                a = require(390),
                s = require(182),
                l = function (e) {
                    this._alpha = new n(e).getAlpha();
                };
            (IsFiniteNonNegativeNumber.inheritAndMix(l, o, [a]),
                (l.prototype.getAlpha = function () {
                    return this._alpha;
                }),
                (l.prototype.asArray = function () {
                    return new s([this._alpha]);
                }),
                (module.exports = l));
        };
