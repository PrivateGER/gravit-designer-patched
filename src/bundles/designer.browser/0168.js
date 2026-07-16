module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(681).left,
            a = require(350),
            r = require(213);
        o(
            {
                target: "Array",
                proto: true,
                forced: (!require(245) && r > 79 && r < 83) || !a("reduce"),
            },
            {
                reduce: function (e) {
                    var t = arguments.length;
                    return i(this, e, t, t > 1 ? arguments[1] : void 0);
                },
            }
        );
    };
