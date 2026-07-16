module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(110),
            a = require(74),
            r = require(186),
            s = require(201 /* CONSTRUCTOR */).CONSTRUCTOR,
            l = require(453),
            c = i("Promise"),
            d = a && !s;
        o(
            { target: "Promise", stat: true, forced: a || s },
            {
                resolve: function (e) {
                    return l(d && this === c ? r : this, e);
                },
            }
        );
    };
