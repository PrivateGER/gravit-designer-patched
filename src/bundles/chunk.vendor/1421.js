module.exports = function (module, exports, require) {
            var n = require(1145),
                r = require(849);

            function o(e, t, i, o, a) {
                (n.call(this, "DCTDecode"), 0 !== arguments.length && this.setBuffer(new r().encode(i, e, t, a || 85, o)));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, n),
                (o.prototype.setBuffer = function (e) {
                    this._compressed = e;
                }),
                (o.prototype.getBuffer = function () {
                    return this._compressed;
                }),
                (o.prototype.write = function (e) {
                    e.writeBuffer(this._compressed);
                }),
                (o.prototype.length = function () {
                    return this._compressed.length;
                }),
                (module.exports = o));
        };
