module.exports = function (module, exports, require) {
            var n = require(261);

            function r(e, t) {
                ((this._name = n.getName(e)), (this._key = t));
            }
            ((r.prototype.getClassReference = function () {
                return this._name;
            }),
                (r.prototype.getKey = function () {
                    return this._key;
                }),
                (module.exports = r));
        };
