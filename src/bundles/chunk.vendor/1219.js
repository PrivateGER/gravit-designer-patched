module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0),
                o = function (e, t) {
                    ((this._node = e), (this._type = t));
                };
            (IsFiniteNonNegativeNumber.inherit(o, n),
                (o.Type = {
                    BEGIN: 0,
                    END: 1,
                }),
                (o.prototype.getType = function () {
                    return this._type;
                }),
                (o.prototype.isEmpty = function () {
                    return true;
                }),
                (o.prototype.equals = function (e) {
                    return e instanceof o && this._node == e._node && this._type === e._type;
                }),
                (module.exports = o));
        };
