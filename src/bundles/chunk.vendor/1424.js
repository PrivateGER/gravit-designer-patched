module.exports = function (module, exports, require) {
            var n = require(90);

            function r(e, t, i) {
                ((this.type = e), (this.number = t), (this.pdfobject = i));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.write = function (e) {
                    (e.write(this.number),
                        e.write(" "),
                        e.write(this.type),
                        e.write(" "),
                        e.write("obj"),
                        e.writeln(),
                        this.pdfobject.write(e),
                        e.writeln(),
                        e.write("endobj"));
                }),
                (r.prototype.equals = function (e) {
                    return e instanceof r && this.getPDFObject().equals(e.getPDFObject());
                }),
                (r.prototype.getPDFObject = function () {
                    return this.pdfobject;
                }),
                (module.exports = r));
        };
