module.exports = function (module, exports, require) {
            var n = require(90),
                r = function (e) {
                    this._path = e;
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.getPath = function () {
                    return this._path;
                }),
                (r.prototype.write = function (e) {
                    this._path && (this._path.write(e), e.writeln(), e.write("W n"));
                }),
                (module.exports = r));
        };
