module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(262).trim;
        o(
            { target: "String", proto: true, forced: require(461)("trim") },
            {
                trim: function () {
                    return i(this);
                },
            }
        );
    };
