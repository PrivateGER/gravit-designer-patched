module.exports = function (module, exports, require) {
            var n = require(1145),
                IsFiniteNonNegativeNumber = require(0),
                PDFNodeStream = require(165);

            function a(e) {
                (n.call(this, "FlateDecode"), e && this.setBuffer(PDFNodeStream.deflate(e)));
            }
            (IsFiniteNonNegativeNumber.inherit(a, n),
                (a.prototype.setBuffer = function (e) {
                    this._compressed = e;
                }),
                (a.prototype.getBuffer = function () {
                    return this._compressed;
                }),
                (a.prototype.write = function (e) {
                    e.writeBuffer(this._compressed);
                }),
                (a.prototype.length = function () {
                    return this._compressed.length;
                }),
                (a.prototype.toString = function () {
                    return "[Object GPDFFlateDecode]";
                }),
                (module.exports = a));
        };
