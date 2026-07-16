module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0);

            function o(e) {
                this._style = e || o.Style.MITER;
            }
            ((o.Style = {
                MITER: 0,
                ROUND: 1,
                BEVEL: 2,
            }),
                IsFiniteNonNegativeNumber.inherit(o, n),
                (o.prototype._style = o.Style.MITER),
                (o.prototype.write = function (e) {
                    (e.write(this._style), e.writeSpace(), e.write("j"));
                }),
                (module.exports = o));
        };
