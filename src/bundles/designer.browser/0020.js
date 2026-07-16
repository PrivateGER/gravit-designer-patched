module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(306);
        o({ target: "RegExp", proto: true, forced: /./.exec !== i }, { exec: i });
    };
