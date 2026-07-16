module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(27),
            a = require(361),
            r = require(92),
            s = require(62),
            l = require(362),
            c = i("".indexOf);
        o(
            { target: "String", proto: true, forced: !l("includes") },
            {
                includes: function (e) {
                    return !!~c(s(r(this)), s(a(e)), arguments.length > 1 ? arguments[1] : void 0);
                },
            }
        );
    };
