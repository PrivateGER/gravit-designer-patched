module.exports = function (module, exports, require) {
            var n = require(799),
                r = function (e) {
                    n.call(this, e.getPDFObject().getName(), e);
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.getFont = function () {
                    return this.getPDFObject();
                }),
                (module.exports = r));
        };
