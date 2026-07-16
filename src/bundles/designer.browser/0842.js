module.exports = function (module, exports, require) {
        "use strict";
        require(1039);
        var o = require(25),
            i = require(735);
        o(
            {
                target: "String",
                proto: true,
                name: "trimStart",
                forced: "".trimStart !== i,
            },
            { trimStart: i }
        );
    };
