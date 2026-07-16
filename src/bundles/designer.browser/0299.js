module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(35),
            a = require(297),
            r = o(Function.toString);
        (i(a.inspectSource) ||
            (a.inspectSource = function (e) {
                return r(e);
            }),
            (module.exports = a.inspectSource));
    };
