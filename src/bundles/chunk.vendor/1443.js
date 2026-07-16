module.exports = function (module, exports, require) {
            var n = require(1215),
                r = function () {
                    ((this.out = []), (this.position = 0));
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.getPosition = function () {
                    return this.position;
                }),
                (r.prototype._write = function (e) {
                    ((this.position += e.toString().length), this.out.push(e));
                }),
                (r.prototype._writeBuffer = function (e) {
                    ((this.position += e.length || e.byteLength), this.out.push(e));
                }),
                (r.prototype._concat = function (e) {
                    ((this.position += e.getPosition()), (this.out = this.out.concat(e.asArray())));
                }),
                (r.prototype.asArray = function () {
                    return this.out;
                }),
                (module.exports = r));
        };
