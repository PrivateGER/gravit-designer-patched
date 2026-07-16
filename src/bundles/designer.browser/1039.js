module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(735);
        o(
            {
                target: "String",
                proto: true,
                name: "trimStart",
                forced: "".trimLeft !== i,
            },
            { trimLeft: i }
        );
    };
