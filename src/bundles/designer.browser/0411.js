module.exports = function (e, t, n) {
        "use strict";
        var o = n(23),
            i = n(49),
            a = Object.getOwnPropertyDescriptor;
        e.exports = function (e) {
            if (!i) return o[e];
            var t = a(o, e);
            return t && t.value;
        };
    };
