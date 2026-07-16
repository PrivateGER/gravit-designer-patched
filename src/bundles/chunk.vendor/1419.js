module.exports = function (module, exports, require) {
            var n = require(197),
                r = require(437),
                IsFiniteNonNegativeNumber = require(0),
                a = require(440),
                s = require(391),
                l = function (e) {
                    (n.call(this),
                        (this._shading = e),
                        this.put("/PatternType", 2),
                        this.put("/Shading", new s(e)),
                        this.put("/Matrix", new a(e.getPDFObject().transform).asArray()));
                };
            (IsFiniteNonNegativeNumber.inheritAndMix(l, r, [n]),
                (l.prototype.getShading = function () {
                    return this._shading.getPDFObject();
                }),
                (l.prototype.equals = function (e) {
                    return e instanceof l && this._shading.equals(e._shading);
                }),
                (module.exports = l));
        };
