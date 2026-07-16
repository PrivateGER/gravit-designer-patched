module.exports = function (module, exports, require) {
            var n = require(1232),
                IsFiniteNonNegativeNumber = require(0),
                o = require(197);

            function a(e) {
                (o.call(this), (this.name = e), (this._encoding = n.WINANSI));
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._encoding = null),
                (a.prototype.encode = function (e, t) {
                    return this._encoding.encode(e, t);
                }),
                (a.prototype.equals = function (e) {
                    return this.name === e.name;
                }),
                (a.prototype.getName = function () {
                    return this.name;
                }),
                (a.prototype.toString = function () {
                    return "[GPDFFont]";
                }),
                (module.exports = a));
        };
