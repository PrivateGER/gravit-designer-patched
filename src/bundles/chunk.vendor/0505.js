module.exports = function (module, exports, require) {
            var n = require(72);

            function r() {}
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.toString = function () {
                    return "[Object GInputEvent(" + this._paramsToString() + ")]";
                }),
                (r.prototype._paramsToString = function () {
                    return "";
                }),
                (module.exports = r));
        };
