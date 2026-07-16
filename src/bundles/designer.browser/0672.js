module.exports = function (module, exports, require) {
        "use strict";
        var o = require(348),
            i = require(302),
            a = require(46),
            r = require(43)("species"),
            s = Array;
        module.exports = function (e) {
            var t;
            return (
                o(e) && ((t = e.constructor), ((i(t) && (t === s || o(t.prototype))) || (a(t) && null === (t = t[r]))) && (t = void 0)),
                void 0 === t ? s : t
            );
        };
    };
