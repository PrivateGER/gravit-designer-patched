module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(587),
                o = require(708);

            function a(e, t, i, n) {
                var a = o.parse(n);
                if (!a || !a.supported) throw "Could not load embedded font";
                r.call(this, e, t, i, n, a);
            }
            (IsFiniteNonNegativeNumber.inherit(a, r),
                (a.prototype.isEmbedded = function () {
                    return true;
                }),
                (module.exports = a));
        };
