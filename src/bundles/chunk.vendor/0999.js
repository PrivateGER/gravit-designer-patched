module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(70),
                o = require(327),
                a = require(532);

            function s() {
                r.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(s, r, [o, a]), (module.exports = s));
        };
