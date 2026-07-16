module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(65),
            r = require(202),
            s = require(304),
            l = require(121);
        o(
            { target: "Promise", stat: true, forced: require(413) },
            {
                race: function (e) {
                    var t = this,
                        n = r.f(t),
                        o = n.reject,
                        c = s(function () {
                            var r = a(t.resolve);
                            l(e, function (e) {
                                i(r, t, e).then(n.resolve, o);
                            });
                        });
                    return (c.error && o(c.value), n.promise);
                },
            }
        );
    };
