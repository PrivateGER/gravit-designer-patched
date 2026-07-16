module.exports = function (module, exports, require) {
            var n = require(90),
                IsFiniteNonNegativeNumber = require(0),
                o = function (e, t) {
                    ((this.fontResource = e), (this.size = t));
                };
            (IsFiniteNonNegativeNumber.inherit(o, n),
                (o.prototype.equals = function (e) {
                    return e instanceof o && e.fontResource.getFont().equals(this.fontResource.getFont()) && e.size === this.size;
                }),
                (o.prototype.getFont = function () {
                    return this.getFontResource().getFont();
                }),
                (o.prototype.getFontResource = function () {
                    return this.fontResource;
                }),
                (o.prototype.write = function (e) {
                    (e.write("/"),
                        e.write(this.fontResource.getName()),
                        e.writeSpace(),
                        e.write(this.size),
                        e.writeSpace(),
                        e.writeln("Tf"));
                }),
                (module.exports = o));
        };
