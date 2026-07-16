module.exports = function (module, exports, require) {
            var n = require(11),
                r = require(90),
                o = function (e) {
                    this.references = e;
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, r),
                (o.prototype.write = function (e) {
                    ((this.offset = e.getPosition()),
                        e.writeln("xref"),
                        e.write(0),
                        e.write(" "),
                        e.writeln(this.references.length + 1),
                        e.writeln("0000000000 65535 f "),
                        n.each(this.references, function (t, i) {
                            var n = "0000000000".substr(i.offset.toString().length) + i.offset;
                            (e.write(n), e.writeln(" 00000 n "));
                        }));
                }),
                (module.exports = o));
        };
