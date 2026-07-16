module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(562);

            function o() {
                (r.apply(this, arguments), this.parse());
            }
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.prototype.applyTo = function (e) {
                    throw new Error("Not Implemented");
                }),
                (module.exports = o));
        };
