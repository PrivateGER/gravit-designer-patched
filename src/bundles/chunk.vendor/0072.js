module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0);

            function r() {}
            (IsFiniteNonNegativeNumber.inherit(r, IsFiniteNonNegativeNumber),
                (r.prototype.sender = null),
                (r.prototype._paramsToString = function () {
                    return "";
                }),
                (module.exports = r));
        };
