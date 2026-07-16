module.exports = function (module, exports, require) {
            var n = require(83),
                IsFiniteNonNegativeNumber = require(0),
                o = require(439);

            function a() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._postParse = function () {
                    (o.prototype._postParse.call(this, true), this._node.setProperties(["w", "h"], [0, 0]));
                }),
                (a.prototype._getRelatedNodeClass = function () {
                    return n;
                }),
                (module.exports = a));
        };
