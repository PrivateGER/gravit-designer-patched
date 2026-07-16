module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(403).includes,
            a = require(21),
            r = require(360);
        (o(
            {
                target: "Array",
                proto: true,
                forced: a(function () {
                    return !Array(1).includes();
                }),
            },
            {
                includes: function (e) {
                    return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                },
            }
        ),
            r("includes"));
    };
