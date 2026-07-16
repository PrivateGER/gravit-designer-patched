module.exports = function (module, exports, require) {
            var n = require(1224),
                r = require(1225),
                o = function (e, t) {
                    r.call(this, e.getDocument(), e, new n(), t);
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, r), (module.exports = o));
        };
