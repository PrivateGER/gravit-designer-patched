module.exports = function (module, exports, require) {
            var n = require(1009),
                r = require(2),
                GStylable = require(28),
                String = require(9);

            function s() {
                (GStylable.Effect.call(this), this._setDefaultProperties(s.VisualProperties));
            }
            (r.inherit("clGradingEffect", s, GStylable.Effect),
                (s.equals = function (e, t) {
                    return e instanceof s && t instanceof s && e.arePropertiesEqual(t, Object.keys(s.VisualProperties));
                }),
                (s.VisualProperties = {
                    cp: null,
                }),
                (s.prototype.getEffectType = function () {
                    return GStylable.Effect.Type.Filter;
                }),
                (s.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GColorGradingEffect", "name", this.getNodeName());
                }),
                (s.prototype.render = function (e, t, i, r) {
                    this.$cp && e.getBitmap().applyFilter(n, this.$cp);
                }),
                (s.prototype._handleChange = function (e, t) {
                    (e === r._Change.Store
                        ? this.storeProperties(t.blob, s.VisualProperties)
                        : e === r._Change.Restore && this.restoreProperties(t.blob, s.VisualProperties),
                        this._handleVisualChangeForProperties(e, t, s.VisualProperties),
                        GStylable.Effect.prototype._handleChange.call(this, e, t));
                }),
                (s.prototype.toString = function () {
                    return "[Object GColorGradingEffect]";
                }),
                (module.exports = s));
        };
