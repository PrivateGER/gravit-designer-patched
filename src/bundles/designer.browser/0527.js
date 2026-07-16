module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(49),
            a = require(120),
            r = require(307),
            s = require(21),
            l = RegExp.RegExp,
            c = l.prototype;
        i &&
            s(function () {
                var e = true;
                try {
                    l(".", "d");
                } catch (t) {
                    e = false;
                }
                var t = {},
                    n = "",
                    o = e ? "dgimsy" : "gimsy",
                    i = function (e, o) {
                        Object.defineProperty(t, e, {
                            get: function () {
                                return ((n += o), true);
                            },
                        });
                    },
                    a = {
                        dotAll: "s",
                        global: "g",
                        ignoreCase: "i",
                        multiline: "m",
                        sticky: "y",
                    };
                for (var r in (e && (a.hasIndices = "d"), a)) i(r, a[r]);
                return Object.getOwnPropertyDescriptor(c, "flags").get.call(t) !== o || n !== o;
            }) &&
            a(c, "flags", { configurable: true, get: r });
    };
