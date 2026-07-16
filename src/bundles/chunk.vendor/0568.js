module.exports = function (module, exports, require) {
            var GFont = require(108);

            function r(e, t, i) {
                ((this._family = e), (this._style = t), (this._weight = i));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, GFont),
                (r.prototype._family = null),
                (r.prototype._style = null),
                (r.prototype._weight = null),
                (r.prototype.isResolved = function () {
                    return false;
                }),
                (r.prototype.getFamily = function () {
                    return this._family;
                }),
                (r.prototype.getStyle = function () {
                    return this._style;
                }),
                (r.prototype.getWeight = function () {
                    return this._weight;
                }),
                (module.exports = r));
        };
