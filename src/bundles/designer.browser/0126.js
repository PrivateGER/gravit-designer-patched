module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29);
        o(
            { target: "URL", proto: true, enumerable: true },
            {
                toJSON: function () {
                    return i(URL.prototype.toString, this);
                },
            }
        );
    };
