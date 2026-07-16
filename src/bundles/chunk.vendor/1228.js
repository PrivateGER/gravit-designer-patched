module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(182),
                o = require(197),
                a = function (e) {
                    o.call(this);
                    var t = new r([0, 1]);
                    (this.put("/FunctionType", e), this.put("/Domain", t));
                };
            (IsFiniteNonNegativeNumber.inherit(a, o), (module.exports = a));
        };
