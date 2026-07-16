module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(197),
                o = function (e) {
                    (r.call(this),
                        (e = e || {}),
                        this.put("/Type", "/Group"),
                        this.put("/S", "/" + (e.subType || o.SubType.DEFAULT)),
                        e.individual && this.put("/I", e.individual),
                        e.colorSpace && this.put("/CS", e.colorSpace.name));
                };
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.SubType = {
                    DEFAULT: "Transparency",
                }),
                (module.exports = o));
        };
