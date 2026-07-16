module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0);
            module.exports = function (e) {
                ((e.PathNumber = function (t, i, n) {
                    e.String.call(this, t, n(i.pathNumber));
                }),
                    IsFiniteNonNegativeNumber.inherit(e.PathNumber, e.String));
            };
        };
