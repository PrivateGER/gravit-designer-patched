module.exports = function (module, exports, require) {
        "use strict";
        var o = require(251 /* IteratorPrototype */).IteratorPrototype,
            i = require(136),
            a = require(174),
            r = require(137),
            s = require(203),
            l = function () {
                return this;
            };
        module.exports = function (e, t, n, c) {
            var d = t + " Iterator";
            return ((e.prototype = i(o, { next: a(+!c, n) })), r(e, d, false, true), (s[d] = l), e);
        };
    };
