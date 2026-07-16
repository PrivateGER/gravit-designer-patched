module.exports = function (module, exports, require) {
            require(0 /* IsFiniteNonNegativeNumber */);
            var n = require(2),
                r = require(70),
                o = require(84),
                a = require(7),
                s = require(17),
                String = require(9),
                h = require(47);
            require(142);

            function A() {
                (r.call(this), this.initializeAnnotation());
                var e = new a(1, 0, 0, 1, 0, 0);
                (this.transformSourceBBox(e),
                    this.setText(String.get(new h("GTextAnnotation", "text.new-annotation")), 1, 1),
                    this.setProperties(["_fc"], [s.BLACK]));
            }
            (n.inheritAndMix("ant", A, r, [o]),
                (A.prototype.validateInsertion = function (e, t) {
                    return "annlst" === n.getName(e);
                }),
                (A.prototype.isPaintable = function (e) {
                    return !(e && !e.configuration.isElementAnnotationsVisible(this)) && r.prototype.isPaintable.call(this, e);
                }),
                (A.prototype.isEmptyTextAllowed = function () {
                    return false;
                }),
                (A.prototype._handleChange = function (e, t) {
                    if (e === n._Change.Store) {
                        var i = o.MetaProperties;
                        if (this.recordedTransaction || t.options.recordedTransaction) {
                            for (
                                var a = Object.keys(o.MetaProperties), s = t.options.recordedProperties || {}, l = {}, h = 0, A = a.length;
                                h < A;
                                h++
                            ) {
                                var c = a[h];
                                l[c] = s.hasOwnProperty(c) ? s[c] : o.MetaProperties[c];
                            }
                            i = l;
                        }
                        this.storeProperties(t.blob, i, this.storeAction.bind(this, t));
                    } else
                        e === n._Change.Restore
                            ? this.restoreProperties(t.blob, o.MetaProperties, this.restoreAction.bind(this, t))
                            : e === n._Change.BeforePropertiesChange && this.handleBeforePropertiesChange(t);
                    r.prototype._handleChange.call(this, e, t);
                }),
                (A.prototype.toString = function () {
                    return "[GTextAnnotation]";
                }),
                (module.exports = A));
        };
