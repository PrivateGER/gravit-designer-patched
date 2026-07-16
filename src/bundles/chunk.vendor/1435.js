module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(1231),
                o = require(1232);

            function a(e, t) {
                (r.call(this, e),
                    this.put("/Type", "/Font"),
                    this.put("/Subtype", "/Type1"),
                    this.put("/BaseFont", "/" + t),
                    this.put("/Encoding", "/WinAnsiEncoding"),
                    (this._encoding = o.WINANSI));
            }
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype._encoding = null),
                (a.BASE_14 = [
                    "Courier",
                    "Courier-Bold",
                    "Courier-Oblique",
                    "Courier-BoldOblique",
                    "Helvetica",
                    "Helvetica-Bold",
                    "Helvetica-Oblique",
                    "Helvetica-BoldOblique",
                    "Times-Roman",
                    "Times-Bold",
                    "Times-Italic",
                    "Times-BoldItalic",
                    "ZapfDingbats",
                    "Symbol",
                ]),
                (a.prototype.encode = function (e) {
                    return this._encoding.encode(e);
                }),
                (a.isStandardFont = function (e) {
                    return a.BASE_14.some(function (t) {
                        return t === e;
                    });
                }),
                (module.exports = a));
        };
