module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(74),
            a = require(201 /* CONSTRUCTOR */).CONSTRUCTOR,
            r = require(186),
            s = require(110),
            l = require(35),
            c = require(79),
            d = r && r.prototype;
        if (
            (o(
                { target: "Promise", proto: true, forced: a, real: true },
                {
                    catch: function (e) {
                        return this.then(void 0, e);
                    },
                }
            ),
            !i && l(r))
        ) {
            var u = s("Promise").prototype.catch;
            d.catch !== u && c(d, "catch", u, { unsafe: true });
        }
    };
