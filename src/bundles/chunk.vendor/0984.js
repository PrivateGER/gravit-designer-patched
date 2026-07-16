module.exports = function (module, exports, require) {
            "use strict";
            exports.line = function (e, t, i, n, r) {
                (e.beginPath(), e.moveTo(t, i), e.lineTo(n, r), e.stroke());
            };
        };
