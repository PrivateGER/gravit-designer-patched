module.exports = function (module, exports, require) {
            var n = require(1228),
                r = function (e, t, i) {
                    (n.call(this, 3), this.put("/Encode", e), this.put("/Bounds", t), this.put("/Functions", i));
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n), (module.exports = r));
        };
