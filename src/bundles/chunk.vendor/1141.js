module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(562);

            function o() {
                r.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.prototype.version = null),
                (o.prototype.parse = function () {
                    this.version = parseFloat(this._data.appVersion);
                }),
                (module.exports = o));
        };
