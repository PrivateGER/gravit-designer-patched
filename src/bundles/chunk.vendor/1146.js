module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(197),
                o = function (e, t) {
                    (r.call(this), this.put("/ShadingType", e), this.put("/ColorSpace", t.name));
                };
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.prototype._hasTransparency = false),
                (o.prototype.hasTransparency = function () {
                    return this._hasTransparency;
                }),
                (o.prototype.isValid = function () {
                    return true;
                }),
                (o.Type = {
                    AXIAL: 2,
                    RADIAL: 3,
                }),
                (module.exports = o));
        };
