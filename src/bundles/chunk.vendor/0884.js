module.exports = function (module, exports, require) {
            const n = require(814),
                r = require(815),
                o = require(816),
                a = require(885),
                GGoggleDrive = require(886),
                l = require(456),
                h = require(456),
                A = require(456),
                c = require(455);
            module.exports = [
                {
                    project: c.Designer,
                    translations: n,
                    temporary: GGoggleDrive,
                    importStack: [GGoggleDrive, n],
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
