module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(702);
        o({ global: true, forced: parseFloat !== i }, { parseFloat: i });
    };
