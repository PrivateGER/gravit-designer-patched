module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(744),
                o = require(5),
                a = (require(14), require(12), require(17), require(14), require(6)),
                s = require(2),
                l = require(83),
                h = (require(216), require(9 /* String */)),
                A = require(47);
            require(133 /* GScenePaintConfiguration */);

            function c(e) {
                r.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(c, r),
                (c.ID = "guide.symbollabel"),
                (c.prototype.getId = function () {
                    return c.ID;
                }),
                (c.prototype._gatherLabels = function (e, t) {
                    var i = null;
                    if (t.configuration.symbolLabelsVisible) {
                        t.canvas;
                        var n = t.dirtyMatcher.getDirtyRectangles(),
                            c = [],
                            p = [];
                        i = [];
                        p = (c = this._scene.getSymbols().filter(function (e) {
                            return e.isMaster() && e.getScene();
                        })).map(function (e) {
                            return e.findParent(function (e) {
                                if (e instanceof l) return true;
                            });
                        });
                        for (var u = 0; u < n.length; ++u)
                            for (var d = n[u], g = c.length - 1; g >= 0; g--) {
                                var f = p[g];
                                if (t.configuration.multiPageView || f.hasFlag(s.Flag.Active)) {
                                    var m = c[g],
                                        y = m.getFrame();
                                    if (y) {
                                        var _ = m.isScaleLabel() ? e.getScaleFactor() : 1,
                                            v = this._scene.getLabelBBox(_).getHeight(),
                                            b = f.getPosition(t.configuration.multiPageView);
                                        y = y.translated(b.getX(), b.getY());
                                        var C = new a(y.getX(), y.getY() - v, y.getWidth(), v);
                                        if (d.containsRect(C) || C.intersectsRect(d)) {
                                            var w = e.mapRect(y),
                                                E = m.$name || h.get(new A("GSymbol", "name")),
                                                B = t.selectionThirdOutlineColor;
                                            (i.push(
                                                new r.LabelItem(
                                                    new o(w.getX(), w.getY()),
                                                    w.getWidth(),
                                                    (m.isMaster() ? "○ " : "● ") + E,
                                                    B,
                                                    m.isScaleLabel()
                                                )
                                            ),
                                                c.splice(g, 1),
                                                p.splice(g, 1));
                                        }
                                    }
                                }
                            }
                    }
                    return i;
                }),
                (c.prototype.toString = function () {
                    return "[Object GSymbolLabelGuide]";
                }),
                (module.exports = c));
        };
