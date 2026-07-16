module.exports = function (module, exports, require) {
            var n = require(90);

            function r(e) {
                this.pdfIndirectObject = e;
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.write = function (e) {
                    (e.write(this.getPDFIndirectObject().number), e.write(" "), e.write(this.getPDFIndirectObject().type), e.write(" R"));
                }),
                (r.prototype.getPDFIndirectObject = function () {
                    return this.pdfIndirectObject;
                }),
                (r.prototype.getPDFObject = function () {
                    return this.getPDFIndirectObject().getPDFObject();
                }),
                (module.exports = r));
        };
