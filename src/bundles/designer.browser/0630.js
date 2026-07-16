module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(202);
        o(
            { target: "Promise", stat: true, forced: require(201 /* CONSTRUCTOR */).CONSTRUCTOR },
            {
                reject: function (e) {
                    var t = i.f(this);
                    return ((0, t.reject)(e), t.promise);
                },
            }
        );
    };
