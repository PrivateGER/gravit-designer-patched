module.exports = function (module, exports, require) {
            var n = require(182),
                r = require(90),
                o = require(338),
                a = function (e, t) {
                    ((this.operator = e), (this.gtransform = t));
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(a, r),
                (a.prototype.write = function (e) {
                    (this.asArray().forEach(function (t) {
                        (t.write(e), e.writeSpace());
                    }),
                        e.write(this.operator));
                }),
                (a.prototype.asArray = function () {
                    var e = this.gtransform.getMatrix(),
                        t = new n();
                    return (
                        t.push(this._normalizeNumber(e[0])),
                        t.push(this._normalizeNumber(e[1])),
                        t.push(this._normalizeNumber(e[2])),
                        t.push(this._normalizeNumber(e[3])),
                        t.push(this._normalizeNumber(e[4])),
                        t.push(this._normalizeNumber(e[5])),
                        t
                    );
                }),
                (a.prototype._normalizeNumber = function (e) {
                    return o.normalizeNumber(e);
                }),
                (module.exports = a));
        };
