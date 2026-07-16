module.exports = function (module, exports, require) {
            var n = require(72);

            function r(e, t, i) {
                ((this.reference = e), (this.target = t), (this.linked = i));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.reference = null),
                (r.prototype.target = null),
                (r.prototype.linked = null),
                (r.prototype.toString = function () {
                    return "[Event GReferenceEvent]";
                }),
                (module.exports = r));
        };
