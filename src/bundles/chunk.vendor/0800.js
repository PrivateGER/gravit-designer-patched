module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(90),
                o = require(197),
                a = function (e) {
                    ((this.filter = e), (this.dictionary = new o()));
                };
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.getFilter = function () {
                    return this.filter;
                }),
                (a.prototype.putDictionary = function (e, t) {
                    this.dictionary.put(e, t);
                }),
                (a.prototype.length = function () {
                    return this.filter.length();
                }),
                (a.prototype.write = function (e) {
                    (this.putDictionary("/Length", this.length()),
                        this.filter.name && this.putDictionary("/Filter", "/" + this.filter.name),
                        this.dictionary.write(e),
                        e.writeln("stream"),
                        this.filter.write(e),
                        e.writeln(),
                        e.write("endstream"));
                }),
                (module.exports = a));
        };
