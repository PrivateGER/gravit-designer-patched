module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(90),
                o = require(197),
                a = function (e, t, i) {
                    ((this.dictionary = new o()),
                        this.dictionary.put("/Root", e),
                        this.dictionary.put("/Info", t),
                        this.dictionary.put("/Size", i.length + 1));
                };
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.write = function (e) {
                    (e.writeln("trailer"), this.dictionary.write(e), e.writeln());
                }),
                (module.exports = a));
        };
