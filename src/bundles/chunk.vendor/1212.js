module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(122),
                o = require(794);

            function a() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._postAppendTo = function () {
                    (o.prototype._postAppendTo.apply(this, arguments), this.transform(this._getTransformation()));
                }),
                (a.prototype._getRelatedNodeClass = function () {
                    return r;
                }),
                (module.exports = a));
        };
