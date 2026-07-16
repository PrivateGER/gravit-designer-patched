module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(850),
                o = require(1215);

            function a(e) {
                this._byteBuffer = new r(e || 10240);
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._byteBuffer = null),
                (a.prototype.getPosition = function () {
                    return this._byteBuffer.getBytePosition();
                }),
                (a.prototype.asArray = function () {
                    return this._byteBuffer.getBuffer();
                }),
                (a.prototype._write = function (e) {
                    var t = encodeURIComponent(e.toString()).replace(/%([0-9A-F]{2})/g, function (e, t) {
                            return String.fromCharCode("0x" + t);
                        }),
                        i = new Uint8Array(t.length);
                    (Array.prototype.forEach.call(t, function (e, t) {
                        i[t] = e.charCodeAt(0);
                    }),
                        this.writeBuffer(i));
                }),
                (a.prototype._concat = function (e) {
                    this.writeBuffer(e.asArray());
                }),
                (a.prototype._writeBuffer = function (e) {
                    this._byteBuffer.writeArray(e);
                }),
                (module.exports = a));
        };
