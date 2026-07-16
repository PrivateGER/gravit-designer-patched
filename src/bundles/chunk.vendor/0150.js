module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(72),
                o = require(514),
                a = function () {
                    this.changed = new o();
                };
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.changed = null),
                (a.prototype.toString = function () {
                    return "[Object GModifiersChangedEvent]";
                }),
                (module.exports = a));
        };
