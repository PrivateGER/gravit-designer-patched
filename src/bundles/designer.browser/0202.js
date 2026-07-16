module.exports = function (module, exports, require) {
        "use strict";
        var o = require(65),
            i = TypeError,
            a = function (e) {
                var t, n;
                ((this.promise = new e(function (e, o) {
                    if (void 0 !== t || void 0 !== n) throw new i("Bad Promise constructor");
                    ((t = e), (n = o));
                })),
                    (this.resolve = o(t)),
                    (this.reject = o(n)));
            };
        module.exports.f = function (e) {
            return new a(e);
        };
    };
