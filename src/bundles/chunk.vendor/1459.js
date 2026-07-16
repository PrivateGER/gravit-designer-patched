module.exports = function (module, exports, require) {
            var n = require(68),
                r = require(11),
                o = require(1460),
                a = require(321),
                s = require(51),
                l = require(1461),
                h = require(432),
                A = require(729),
                c = require(249),
                p = require(1462),
                u = require(1463),
                d = require(1464),
                g = require(282),
                f = (require(852), function () {});
            ((f.getEffectMarkup = function (e, t, i) {
                var f = new p();
                r.each(e.getEffects().getChildren(), function (t, i) {
                    if (0 != i.getProperty("vs")) {
                        if (i instanceof s && i instanceof g) {
                            var r = new c();
                            (r.setProperty("r", i.getProperty("shp").radius),
                                r.setProperty("vs", i.getProperty("vs")),
                                r.setProperty("ly", i.getProperty("ly")),
                                (i = r));
                        }
                        i instanceof c
                            ? o.apply(f, i, e)
                            : i instanceof a
                              ? l.apply(f, i, e)
                              : i instanceof h
                                ? u.apply(f, i, e)
                                : i instanceof A && i.getProperty("pat") instanceof n
                                  ? d.apply(f, i, e)
                                  : console.warn("Unhandled filter: " + i);
                    }
                });
                var m = e.getProperty("_sfop");
                if ((1 != m && f.setFillOpacity(m), 0 === f.filters.length && 1 == m)) return "";
                var y = r.uuid();
                ((t.filter = "url(#" + y + ")"), f.setId(y), f.toXml(i));
            }),
                (module.exports = f));
        };
