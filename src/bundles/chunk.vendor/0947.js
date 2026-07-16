module.exports = function (module, exports, require) {
            "use strict";
            var n = require(269);

            function r() {}
            (n.inherit(r, n),
                (r.prototype.sender = null),
                (r.prototype._paramsToString = function () {
                    return "";
                }),
                (module.exports = r));
        };
