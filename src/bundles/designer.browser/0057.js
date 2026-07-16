module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(678);
        o({ global: true, forced: parseInt !== i }, { parseInt: i });
    };
