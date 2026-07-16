module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(182),
                o = require(197),
                a = function () {
                    (o.call(this), (this.pages = new r()), this.put("/Type", "/Pages"));
                };
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype.addPage = function (e) {
                    (this.pages.push(e), this.put("/Kids", this.pages), this.put("/Count", this.pages.size()));
                }),
                (a.prototype.getPage = function (e) {
                    var t = this.pages.get(e),
                        i = t && t.getValue();
                    return i ? i.getPDFObject() : null;
                }),
                (module.exports = a));
        };
