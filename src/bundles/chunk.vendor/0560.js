module.exports = function (module, exports, require) {
            var n = require(1110),
                r = require(90),
                IsFiniteNonNegativeNumber = require(0),
                a = function (e) {
                    this.value = e;
                };
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.equals = function (e) {
                    return this._wrap().equals(e);
                }),
                (a.prototype.isEmpty = function () {
                    return this._wrap().isEmpty();
                }),
                (a.prototype.getValue = function () {
                    return this.value;
                }),
                (a.prototype._wrap = function () {
                    var e = this.value;
                    return (e instanceof r || (e = new n(e)), e);
                }),
                (a.prototype.write = function (e) {
                    this._wrap().write(e);
                }),
                (a.Null = function () {
                    a.call(this, new r());
                }),
                IsFiniteNonNegativeNumber.inherit(a.Null, a),
                (module.exports = a));
        };
