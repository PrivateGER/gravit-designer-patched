module.exports = function (module, exports, require) {
            "use strict";

            function n(e) {
                this._ref = e;
            }
            ((n.prototype.getReference = function () {
                return this._ref;
            }),
                (module.exports = n));
        };
