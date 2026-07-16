module.exports = function (module, exports, require) {
            var n = require(90),
                r = require(338),
                o = function (e) {
                    this.primitve = e;
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, n),
                (o.prototype.write = function (e) {
                    var t = this.primitve;
                    ("number" == typeof t && (t = r.normalizeNumber(t)), e.write(t));
                }),
                (module.exports = o));
        };
