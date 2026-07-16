module.exports = function (module, exports, require) {
            var n = require(6),
                r = require(7),
                o = require(2),
                a = require(22),
                s = (require(83), require(0 /* IsFiniteNonNegativeNumber */)),
                l = require(99),
                h = require(327),
                A = require(140);

            function c(e) {
                l.call(this, e);
            }
            (s.inheritAndMix(c, l, [l.Visual]),
                (c.ID = "guide.action"),
                (c.prototype.getId = function () {
                    return c.ID;
                }),
                (c.prototype.paint = function (e, t) {
                    var i = this._gatherActions(e, t);
                    i &&
                        i.forEach(function (e) {
                            e.action.paint(t, e.transform);
                        });
                }),
                (c.prototype.map = function () {
                    return null;
                }),
                (c.prototype._gatherActions = function (e, t) {
                    var i = t.dirtyMatcher.getDirtyRectangles(),
                        s = this._scene,
                        l = t.canvas,
                        c = e.inverted().mapRect(new n(0, 0, l.getWidth(), l.getHeight())),
                        p = s.retrieveChildrenInPaintBBox(c, A.RETRIEVE_MODE_INTERSECT);
                    if (p) {
                        var u;
                        t.configuration.multiPageView ||
                            (p = p.filter(function (e) {
                                return e.hasFlag(o.Flag.Active);
                            }));
                        var d = [],
                            g = [],
                            f = function (e) {
                                if ((e.hasMixin(h) && (d.push(e), g.push(u)), e instanceof a && e.hasMixin(o.Container)))
                                    if (e.hasMixin(a.Accelerated)) {
                                        var t = e.retrieveChildrenInPaintBBox(c, A.RETRIEVE_MODE_INTERSECT);
                                        t && t.forEach(f);
                                    } else for (var i = e.getLastChild(); null != i; i = i.getPrevious()) f(i);
                            };
                        p.forEach(function (e) {
                            f((u = e));
                        });
                        for (var m = [], y = 0; y < i.length; ++y)
                            for (var _ = i[y], v = d.length - 1; v >= 0; v--) {
                                var b = g[v],
                                    C = d[v],
                                    w = C.getActionsBBox();
                                if (w) {
                                    var E = e.getScaleFactor(),
                                        B = b.getPosition(t.configuration.multiPageView);
                                    if (((w = w.translated(B.getX(), B.getY())), _.containsRect(w) || w.intersectsRect(_))) {
                                        var x = e.mapRect(w).getSide(n.Side.TOP_LEFT),
                                            P = 0;
                                        (C.getActions().forEach(function (e) {
                                            (m.push({
                                                action: e,
                                                transform: new r().scaled(E, E).translated(x.getX() + P, x.getY()),
                                            }),
                                                (P -= 5));
                                        }),
                                            d.splice(v, 1),
                                            g.splice(v, 1));
                                    }
                                }
                            }
                        return m;
                    }
                }),
                (c.prototype.toString = function () {
                    return "[Object GActionGuide]";
                }),
                (module.exports = c));
        };
