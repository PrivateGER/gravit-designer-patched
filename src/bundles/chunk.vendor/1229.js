module.exports = function (module, exports, require) {
            var n = require(293),
                r = require(90),
                IsFiniteNonNegativeNumber = require(0),
                a = function (e, t) {
                    ((this._operation = t), (this.resource = e));
                };
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.getShading = function () {
                    return this.resource.getPDFObject().getShading();
                }),
                (a.prototype.equals = function (e) {
                    return e instanceof a && this.resource.getPDFObject().equals(e.resource.getPDFObject());
                }),
                (a.prototype.write = function (e) {
                    (e.write("/Pattern"),
                        e.writeSpace(),
                        e.write(this._operation & n.OPERATIONFLAG_STROKE ? "CS" : "cs"),
                        e.writeSpace(),
                        e.write("/"),
                        e.write(this.resource.getName()));
                }),
                (module.exports = a));
        };
