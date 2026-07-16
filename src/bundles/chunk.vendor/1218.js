module.exports = function (module, exports, require) {
            var n = require(1145);

            function r(e) {
                this._buffer = e;
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.write = function (e) {
                    e.writeBuffer(this._buffer);
                }),
                (r.prototype.length = function () {
                    return this._buffer.byteLength;
                }),
                (r.prototype.getBuffer = function () {
                    return this._buffer;
                }),
                (r.prototype.toString = function () {
                    return "[Object GPDFRawBuffer]";
                }),
                (module.exports = r));
        };
