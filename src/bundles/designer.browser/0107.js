module.exports = function (module, exports, require) {
        "use strict";
        require(20);
        var o,
            i,
            a = require(25),
            r = require(29),
            s = require(35),
            l = require(37),
            c = require(62),
            d =
                ((o = false),
                ((i = /[ac]/).exec = function () {
                    return ((o = true), /./.exec.apply(this, arguments));
                }),
                true === i.test("abc") && o),
            u = /./.test;
        a(
            { target: "RegExp", proto: true, forced: !d },
            {
                test: function (e) {
                    var t = l(this),
                        n = c(e),
                        o = t.exec;
                    if (!s(o)) return r(u, t, n);
                    var i = r(o, t, n);
                    return null !== i && (l(i), true);
                },
            }
        );
    };
