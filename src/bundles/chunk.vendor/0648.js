module.exports = function (module, exports, require) {
            var n = require(68),
                r = require(188),
                o = require(17),
                a = require(649);

            function s() {}
            ((s.convertColor = function (e, t) {
                switch (t) {
                    case n.ColorModes.CMYK:
                        return e instanceof o || e instanceof a ? new r(n.rgbToCMYK(e.toScreen())) : e;
                    case n.ColorModes.HSB:
                        return e instanceof r || e instanceof o ? new a(n.rgbToHSV(e.toScreen())) : e;
                    default:
                        return e instanceof r || e instanceof a ? new o(e.toScreen()) : e;
                }
            }),
                (module.exports = s));
        };
