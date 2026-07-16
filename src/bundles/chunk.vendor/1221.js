module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0);

            function o(e) {
                this._style = e || o.Style.BUTT;
            }
            ((o.Style = {
                BUTT: 0,
                ROUND: 1,
                SQUARE: 2,
            }),
                IsFiniteNonNegativeNumber.inherit(o, n),
                (o.prototype._style = o.Style.BUTT),
                (o.prototype.write = function (e) {
                    (e.write(this._style), e.writeSpace(), e.write("J"));
                }),
                (module.exports = o));
        };
