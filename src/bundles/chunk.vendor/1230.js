module.exports = function (module, exports, require) {
            var n = require(90),
                r = require(338),
                o = function (e, t, i, n) {
                    ((this._x = e), (this._y = t), (this._width = i), (this._height = n));
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, n),
                (o.prototype.write = function (e) {
                    (e.write(r.normalizeNumber(this._x)),
                        e.writeSpace(),
                        e.write(r.normalizeNumber(this._y)),
                        e.writeSpace(),
                        e.write(r.normalizeNumber(this._width)),
                        e.writeSpace(),
                        e.write(r.normalizeNumber(this._height)),
                        e.writeSpace(),
                        e.write("re"));
                }),
                (module.exports = o));
        };
