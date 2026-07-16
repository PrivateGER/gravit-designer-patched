module.exports = function (module, exports, require) {
            var n = require(2),
                IsFiniteNonNegativeNumber = require(0),
                GStylable = require(28),
                a = require(11),
                s = require(14),
                String = require(9);

            function h() {
                GStylable.Effect.call(this);
                var e = n.getClassFromId(IsFiniteNonNegativeNumber.getTypeId(this)),
                    t = e.__FX;
                if (!t || !t.length) throw new Error("Current multieffect has no subeffects defined");
                ((this._fx = []),
                    t.forEach(
                        function (e) {
                            this._fx.push(new e());
                        }.bind(this)
                    ),
                    e.GeometryProperties && e.VisualProperties
                        ? this._setDefaultProperties(e.GeometryProperties, e.VisualProperties)
                        : e.VisualProperties
                          ? this._setDefaultProperties(e.VisualProperties)
                          : e.GeometryProperties && this._setDefaultProperties(e.GeometryProperties));
            }
            (n.inherit("multiEffect", h, GStylable.Effect),
                (h.prototype._fx = null),
                (h.__FX = null),
                (h.register = function (e, t) {
                    var i = n.getClassFromId(IsFiniteNonNegativeNumber.getTypeId(e));
                    if (
                        ((i.GeometryProperties = a.extend(true, {}, h.GeometryProperties)),
                        (i.__FX = t.slice()),
                        "multiEffect" === n.getName(i))
                    )
                        throw new Error("Multi effect cannot be instantiated");
                    for (var o = 0; o < t.length; o++) {
                        var s = t[o],
                            l = n.getName(s);
                        if (s.GeometryProperties)
                            for (var A in (i.GeometryProperties || (i.GeometryProperties = {}), s.GeometryProperties))
                                i.GeometryProperties[l + "&" + A] = s.GeometryProperties[A];
                        if (s.VisualProperties)
                            for (var A in (i.VisualProperties || (i.VisualProperties = {}), s.VisualProperties))
                                i.VisualProperties[l + "&" + A] = s.VisualProperties[A];
                    }
                }),
                (h.equals = function (e, t) {
                    if (e instanceof h && t instanceof h) {
                        if (e._fx.length !== t._fx.length) return false;
                        for (var i = 0; i < e._fx.length; i++) if (!a.equals(e._fx[i], t._fx[i])) return false;
                        return true;
                    }
                    return false;
                }),
                (h.GeometryProperties = {
                    fxP: null,
                    fxN: null,
                }),
                (h.prototype.isAffectedByChildren = function () {
                    return this._fx.every(function (e) {
                        return e.isAffectedByChildren();
                    });
                }),
                (h.prototype.isOverlayEffect = function () {
                    return this._fx.every(function (e) {
                        return e.isOverlayEffect();
                    });
                }),
                (h.prototype.getEffectType = function () {
                    for (var e = 1; e < this._fx.length; e++)
                        if (this._fx[e - 1].getEffectType() !== this._fx[e].getEffectType()) return GStylable.Effect.Type.Multi;
                    return this._fx.length ? this._fx[0].getEffectType() : GStylable.Effect.Type.Filter;
                }),
                (h.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GMultiEffect", "name", this.getNodeName());
                }),
                (h.prototype.getEffectPadding = function () {
                    for (var e = 0, t = 0, i = 0, n = 0, r = 0; r < this._fx.length; r++) {
                        var o = this._fx[r].getEffectPadding();
                        o instanceof Array
                            ? ((e = Math.max(o[0], e)), (t = Math.max(o[1], t)), (n = Math.max(o[2], n)), (i = Math.max(o[3], i)))
                            : ((e = Math.max(o, e)), (t = Math.max(o, t)), (n = Math.max(o, n)), (i = Math.max(o, i)));
                    }
                    return [e, n, t, i];
                }),
                (h.prototype.render = function (e, t, i, n, r, o) {
                    for (var a = false, l = 0; l < this._fx.length; l++)
                        if (!this._fx[l].canApplyNativeEffect()) {
                            a = true;
                            break;
                        }
                    a
                        ? this._fx.forEach(function (a) {
                              a.render(e, t, i, n, r, o);
                          })
                        : (this._fx.forEach(function (a) {
                              a.applyNativeEffect(e, t, i, n, r, o);
                          }),
                          (t || e).drawCanvas(e, 0, 0, 1, s.CompositeOperator.Copy),
                          this._fx.forEach(function (n) {
                              n.removeNativeEffect(e, t, i);
                          }));
                }),
                (h.prototype._handleChange = function (e, t) {
                    if (e === n._Change.Store) this.storeProperties(t.blob, h.GeometryProperties);
                    else if (e === n._Change.Restore) this.restoreProperties(t.blob, h.GeometryProperties);
                    else if (e == n._Change.BeforePropertiesChange) {
                        for (var i = t.properties, a = t.values, s = {}, l = {}, A = 0; A < i.length; A++)
                            for (var c = i[A].split("&"), p = c[0], u = 0; u < this._fx.length; u++)
                                if (n.getName(this._fx[u]) === p) {
                                    (s[p] || (s[p] = []), s[p].push(c[1]), l[p] || (l[p] = []), l[p].push(a[A]));
                                    break;
                                }
                        for (var d in s) {
                            var g = null;
                            for (u = 0; u < this._fx.length; u++)
                                if (n.getName(this._fx[u]) === d) {
                                    g = this._fx[u];
                                    break;
                                }
                            g && g.setProperties(s[d], l[d], t.custom, t.force, t.temporary);
                        }
                    } else n._Change.AfterPropertiesChange;
                    var f = n.getClassFromId(IsFiniteNonNegativeNumber.getTypeId(this));
                    (f.GeometryProperties && this._handleGeometryChangeForProperties(e, t, f.GeometryProperties),
                        f.VisualProperties && this._handleVisualChangeForProperties(e, t, f.VisualProperties),
                        GStylable.Effect.prototype._handleChange.call(this, e, t));
                }),
                (h.prototype.getFXArray = function () {
                    return this._fx;
                }),
                (h.prototype.toString = function () {
                    return "[Object GMultiEffect]";
                }),
                (h.prototype.destroy = function () {
                    this._fx &&
                        this._fx.forEach(function (e) {
                            e.destroy();
                        });
                }),
                (module.exports = h));
        };
