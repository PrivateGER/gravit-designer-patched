module.exports = function (module, exports, require) {
            var n = require(1218),
                r = require(800),
                o = require(856),
                a = function (e, t) {
                    var i = t ? new o(e) : new n(e);
                    (r.call(this, i), this.putDictionary("/Length1", this.length()));
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(a, r), (module.exports = a));
        };
