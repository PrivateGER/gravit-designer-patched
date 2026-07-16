module.exports = function (module, exports, require) {
        "use strict";
        (require.r(exports),
            require.d(exports, "encode", function () {
                return a;
            }),
            require.d(exports, "decode", function () {
                return r;
            }),
            require.d(exports, "trim", function () {
                return s;
            }),
            require.d(exports, "isBase64", function () {
                return l;
            }),
            require.d(exports, "isUrlSafeBase64", function () {
                return c;
            }));
        const o = { "+": "-", "/": "_" },
            i = { "-": "+", _: "/", ".": "=" },
            a = (e) => e.replace(/[+/]/g, (e) => o[e]),
            r = (e) => e.replace(/[-_.]/g, (e) => i[e]),
            s = (e) => e.replace(/[.=]{1,2}$/, ""),
            l = (e) => /^[A-Za-z0-9+/]*[=]{0,2}$/.test(e),
            c = (e) => /^[A-Za-z0-9_-]*[.=]{0,2}$/.test(e);
    };
