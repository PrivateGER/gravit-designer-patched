module.exports = function (module, exports, require) {
            var n = require(90),
                r = require(440),
                o = function (e) {
                    this.resource = e;
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, n),
                (o.prototype.getGState = function () {
                    return this.resource.getPDFObject();
                }),
                (o.prototype.write = function (e) {
                    var t = this.getGState()._origin;
                    (t && (new r(t.inverted()).write(e), e.writeln()),
                        e.write("/"),
                        e.write(this.resource.getName()),
                        e.writeSpace(),
                        e.write("gs"),
                        t && (e.writeln(), new r(t).write(e)));
                }),
                (module.exports = o));
        };
