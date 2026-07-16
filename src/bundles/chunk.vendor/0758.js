module.exports = function (module, exports, require) {
            var n = require(2),
                IsFiniteNonNegativeNumber = require(0),
                o = require(56),
                GStylable = require(28),
                s = require(52),
                l = require(77),
                h = require(211),
                A = require(162),
                String = require(9),
                p = require(47);

            function u() {
                h.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(u, h),
                (u.prototype._transactionStarted = false),
                (u.prototype.getCursor = function () {
                    return s.Pipette;
                }),
                (u.prototype.activate = function (e, t) {
                    (h.prototype.activate.call(this, e, t),
                        t ||
                            (e.addEventListener(l.Down, this._mouseDown, this),
                            e.addEventListener(l.Drag, this._mouseFill, this),
                            e.addEventListener(l.Release, this._mouseRelease, this)),
                        (this._transactionStarted = false),
                        this._editor.setSelectionDetail(true),
                        this._editor.setSelectionEdit(true));
                }),
                (u.prototype.deactivate = function (e, t) {
                    (!t && this._editor && (this._editor.setSelectionDetail(false), this._editor.setSelectionEdit(false)),
                        h.prototype.deactivate.call(this, e, t),
                        e.removeEventListener(l.Down, this._mouseDown),
                        e.removeEventListener(l.Drag, this._mouseFill),
                        e.removeEventListener(l.Release, this._mouseRelease));
                }),
                (u.prototype.isActivatable = function (e) {
                    var t = e ? e.getEditor() : null,
                        i = t ? t.getIndividualSelection() : null,
                        n = false;
                    if (i && i.length) {
                        n = true;
                        for (var r = 0; r < i.length && n; ++r) i[r] instanceof A || (n = false);
                    }
                    return n;
                }),
                (u.prototype._mouseDown = function (e) {
                    ((this._transactionStarted = false), this._mouseFill(e));
                }),
                (u.prototype._mouseRelease = function (e) {
                    (this._mouseFill(e),
                        this._transactionStarted &&
                            (this._editor.commitTransaction(String.get(new p("GFillTool", "action.modify-fill"))),
                            (this._transactionStarted = false)));
                }),
                (u.prototype._mouseFill = function (e) {
                    this._editor.updateByMousePosition(
                        e.client,
                        this._view.getWorldTransform(this._scene),
                        false,
                        this._view.getViewConfiguration()
                    );
                    var t = this._editor.getIndividualSelection();
                    if (t && t.length) {
                        var i = this._scene.hitTest(
                            e.client,
                            this._view.getWorldTransform(this._scene),
                            function (e) {
                                return e.hasFlag(n.Flag.Selected) && e instanceof A;
                            },
                            false,
                            -1,
                            0,
                            true,
                            null,
                            false,
                            false,
                            this._view.getViewConfiguration().multiPageView
                        );
                        if (i && 1 == i.length && i[0].data.hitRes.type == o.HitResult.Type.Fill) {
                            var r = i[0].data.facet;
                            if (
                                (this._transactionStarted || (this._editor.beginTransaction(), (this._transactionStarted = true)),
                                r.setProperties(["cSt"], [!!this._fpt]),
                                r.getPaintLayers().clearFillLayers(),
                                this._fpt)
                            )
                                r.getPaintLayers().appendChild(new GStylable.FillPaintLayer(this._fpt, this._fop));
                            else {
                                var s = r.getParent();
                                (s instanceof n.MapContainer && (s = s.getParent()), r.assignStyleFrom(s));
                            }
                        }
                    }
                }),
                (u.prototype.getSelectionFillPattern = function () {
                    var e = this._editor.getIndividualSelection();
                    if (e && e.length)
                        for (var t = 0; t < e.length; ++t)
                            if (e[t] instanceof A) {
                                var i = e[t].getPaintLayers().getFillLayers()[0];
                                return i ? i.$_pt : null;
                            }
                    return null;
                }),
                (u.prototype.getSelectionFillOpacity = function () {
                    var e = this._editor.getIndividualSelection();
                    if (e && e.length)
                        for (var t = 0; t < e.length; ++t)
                            if (e[t] instanceof A) {
                                var i = e[t].getPaintLayers().getFillLayers()[0];
                                return i ? i.$_op : null;
                            }
                    return 1;
                }),
                (u.prototype.getFillPattern = function () {
                    return this._fpt;
                }),
                (u.prototype.getFillOpacity = function () {
                    return this._fop;
                }),
                (u.prototype.setFill = function (e, t) {
                    ((this._fpt = e), (this._fop = t));
                }),
                (u.prototype.toString = function () {
                    return "[Object GFillTool]";
                }),
                (module.exports = u));
        };
