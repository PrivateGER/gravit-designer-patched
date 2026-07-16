module.exports = function (module, exports, require) {
        "use strict";
        var o = require(199 /* PROPER */).PROPER,
            i = require(79),
            a = require(37),
            r = require(62),
            s = require(21),
            l = require(460),
            c = RegExp.prototype,
            d = c.toString,
            u = s(function () {
                return "/a/b" !== d.call({ source: "a", flags: "b" });
            }),
            p = o && "toString" !== d.name;
        (u || p) &&
            i(
                c,
                "toString",
                function () {
                    var e = a(this);
                    return "/" + r(e.source) + "/" + r(l(e));
                },
                { unsafe: true }
            );
    };
