module.exports = function (module, exports, require) {
            require(75);
            var n = require(2),
                r = require(76);

            function o() {
                r.call(this);
            }
            (n.inheritAndMix("swatches", o, r, [n.Container, n.Store]),
                (o.prototype._handleChange = function (e, t) {
                    r.prototype._handleChange.call(this, e, t);
                }),
                (o.prototype.validateInsertion = function (e, t) {
                    return "scene" === n.getName(e);
                }),
                (module.exports = o));
        };
