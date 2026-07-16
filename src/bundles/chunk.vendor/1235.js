module.exports = function (module, exports, require) {
            var n = require(139),
                r = require(283),
                o = require(346),
                a = require(265),
                s = require(321),
                l = require(432),
                GStylable = require(28);

            function A() {}
            ((A.isCompatible = function (e, t) {
                return !A.hasCustomBlendMode(e) && !A.hasUnsupportedPattern(e) && (!t || !A.hasUnsupportedEffect(e));
            }),
                (A.hasUnsupportedEffect = function (e) {
                    if (e.hasMixin(GStylable) && e.getEffects())
                        for (var t = e.getEffects().getLayersEffects(e.getStyleLayers(), true), i = 0; i < t.length; i++) {
                            var n = t[i];
                            if (n)
                                return !n.every(function (e) {
                                    return [s, l].some(function (t) {
                                        return e instanceof t;
                                    });
                                });
                        }
                    return false;
                }),
                (A.hasUnsupportedPattern = function (e) {
                    if (e.hasMixin(GStylable)) {
                        var t = e.getPaintLayers();
                        if (t)
                            return t.getLayers(null, true).some(function (e) {
                                return A.isUnsupportedPattern(e.$_pt);
                            });
                    }
                    return false;
                }),
                (A.hasCustomBlendMode = function (e) {
                    if (A.isCustomBlendMode(e.$_sbl)) return true;
                    if (e.hasMixin(GStylable)) {
                        var t = e.getPaintLayers();
                        if (t)
                            return t.getLayers(null, true).some(function (e) {
                                return A.isCustomBlendMode(e.$_bl);
                            });
                    }
                    return false;
                }),
                (A.isCustomBlendMode = function (e) {
                    return !!e && -1 !== o.BlendModes.indexOf(e);
                }),
                (A.isUnsupportedPattern = function (e) {
                    return !!e && (e instanceof n || e instanceof r || e instanceof a);
                }),
                (A.isAffectedByBackground = function (e) {
                    return !!A.hasCustomBlendMode(e) || !!A.hasBackgroundFill(e);
                }),
                (A.hasBackgroundFill = function (e) {
                    if (e.hasMixin(GStylable)) {
                        var t = e.getPaintLayers();
                        if (t)
                            return !!t.getLayers(null, true).some(function (e) {
                                return e.$_pt instanceof a;
                            });
                    }
                    return false;
                }),
                (module.exports = A));
        };
