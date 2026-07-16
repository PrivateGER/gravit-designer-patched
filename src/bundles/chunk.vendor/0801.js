module.exports = function (module, exports, require) {
            var n = require(1119);

            function r() {
                this._decimalPlacesPrecision = 3;
            }
            ((r.prototype._decimalPlacesPrecision = 3),
                (r.prototype.setDecimalPlacesPrecision = function (e) {
                    this._decimalPlacesPrecision = e;
                }),
                (r.prototype.formatMatrix = function (e) {
                    return this.formatNumber(e);
                }),
                (r.prototype.formatNumber = function (e) {
                    return n.round(e, this._decimalPlacesPrecision);
                }),
                (module.exports = new r()));
        };
