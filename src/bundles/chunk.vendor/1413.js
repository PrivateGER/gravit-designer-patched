module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(197),
                o = function (e) {
                    if ((r.call(this), !e.subType)) throw "GPDFSoftMask.SubType is required";
                    if (!e.stream) throw "GPDFStream is required";
                    (this.put("/Type", "/Mask"), this.put("/S", "/" + e.subType), this.put("/G", e.stream));
                };
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.SubType = {
                    ALPHA: "Alpha",
                    LUMINOSITY: "Luminosity",
                }),
                (module.exports = o));
        };
