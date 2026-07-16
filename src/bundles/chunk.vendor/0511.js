module.exports = function (module, exports, require) {
            var n = require(22),
                r = require(2),
                GStylable = require(28),
                a = require(76);

            function s() {
                (a.call(this), this._setDefaultProperties(s.MetaProperties), this._setStyleDefaultProperties());
            }
            (r.inheritAndMix("style", s, a, [r.Properties, r.Store, r.Reference, GStylable]),
                (s.MetaProperties = {
                    name: null,
                    ps: [
                        GStylable.PropertySet.Style,
                        GStylable.PropertySet.Effects,
                        GStylable.PropertySet.Text,
                        GStylable.PropertySet.Paragraph,
                        GStylable.PropertySet.BorderPaintLayers,
                        GStylable.PropertySet.FillPaintLayers,
                    ],
                    defaultStyle: true,
                }),
                (s.prototype.assignStyleFrom = function (e) {
                    (GStylable.prototype.assignStyleFrom.call(this, e, true),
                        this._scene &&
                            this._scene.visitLinks(
                                this,
                                function (t) {
                                    t !== e && t.hasMixin(GStylable) && t.assignStyleFrom(this, true);
                                }.bind(this)
                            ));
                }),
                (s.prototype.disconnectStyle = function () {
                    this._scene &&
                        this._scene.visitLinks(this, function (e) {
                            e.hasMixin(n.Stylable) && e.setProperty("sref", null);
                        });
                }),
                (s.prototype.getStylePropertySets = function () {
                    return this.$ps;
                }),
                (s.prototype.validateInsertion = function (e, t) {
                    return "styles" === r.getName(e);
                }),
                (s.prototype._handleChange = function (e, t) {
                    (e === r._Change.Store
                        ? this.storeProperties(t.blob, s.MetaProperties)
                        : e === r._Change.Restore && this.restoreProperties(t.blob, s.MetaProperties),
                        this._handleStyleChange(e, t),
                        r.prototype._handleChange.call(this, e, t));
                }),
                (s.prototype.toString = function () {
                    return "[Mixin GStyle]";
                }),
                (module.exports = s));
        };
