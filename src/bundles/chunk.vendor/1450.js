module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(90),
                o = require(564);

            function a(e) {
                this._resource = e;
            }
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype._resource = null),
                (a.prototype.write = function (e) {
                    e.write("/" + this._resource.getName() + " " + o.Do);
                }),
                (a.prototype.toString = function () {
                    return "[Object GPDFInvokeResource]";
                }),
                (module.exports = a));
        };
