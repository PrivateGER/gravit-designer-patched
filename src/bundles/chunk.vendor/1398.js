module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(792 /* GlobalWorkerOptions */).TilingPattern;

            function o() {
                r.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(o, r), (o.prototype.clipBbox = function (e, t, i, n, r, o) {}), (module.exports = o));
        };
