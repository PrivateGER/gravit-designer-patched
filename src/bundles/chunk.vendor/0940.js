module.exports = function (module, exports, require) {
            "use strict";
            const n = require(821),
                r = require(822),
                o = require(823),
                a = require(941),
                GShareDialog = require(942),
                l = require(525),
                h = require(525),
                A = require(525),
                c = require(524);
            module.exports = [
                {
                    project: c.Designer,
                    translations: n,
                    temporary: GShareDialog,
                    importStack: [GShareDialog, n],
                },
                {
                    project: c.Cloud,
                    translations: r,
                    temporary: l,
                    importStack: [l, r],
                },
                {
                    project: c.Analytics,
                    translations: o,
                    temporary: h,
                    importStack: [h, o],
                },
                {
                    project: c.WebTrial,
                    translations: a,
                    temporary: A,
                    importStack: [A, a],
                },
            ];
        };
