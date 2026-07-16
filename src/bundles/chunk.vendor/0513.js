module.exports = function (module, exports, require) {
            var n = require(11);

            function r(e) {
                this._uid = e || n.uuid();
            }
            ((r.prototype._uid = null),
                (r.prototype.isEqual = function (e) {
                    return this._uid === e._uid;
                }),
                (r.prototype.toString = function () {
                    return this._uid.toString();
                }),
                (module.exports = r));
        };
