module.exports = function (module, exports, require) {
            var n = require(2),
                IsFiniteNonNegativeNumber = require(0),
                o = require(39),
                a = require(128),
                s = require(36),
                l = (require(22), require(45));
            require(24);

            function h(e) {
                ((this._catchHandle = true), a.call(this, e));
            }
            (IsFiniteNonNegativeNumber.inherit(h, a),
                s.exports(h, l),
                (h.ExtendingMode = {
                    Off: null,
                    Beginning: 1,
                    End: 2,
                }),
                (h.prototype._catchHandle = true),
                (h.prototype.transformBox = function (e, t) {
                    if ((a.prototype.transformBox.call(this, e, t), e && !e.isIdentity())) {
                        var i = this._element.getSourceBBox();
                        if (i && !i.isEmpty()) {
                            var n = this.getPaintElement();
                            this._element.transformStyledCorners(n, e);
                        }
                    }
                }),
                (h.prototype.edTransform = function (e, t, i, n) {
                    (this._elementPreview || this.createElementPreview(),
                        this.hasFlag(o.Flag.Outline) ? this.requestInvalidation() : this.setOutlineTmpFlag(),
                        n && (this._storedMoveData = n.storedMoveData));
                    var r = this._element.getProperty("trf"),
                        a = r ? r.multiplied(e) : e;
                    (this._elementPreview.setTransform(a),
                        this._element.transferStyledCorners(this._elementPreview),
                        this._element.transformStyledCorners(this._elementPreview, e),
                        this._setTransform(null),
                        this.requestInvalidation());
                }),
                (h.prototype._paintOutline = function (e, t, i, n, r) {
                    !i && this._elementPreview && r
                        ? a.prototype._paintOutline.call(this, r, t, i, n)
                        : a.prototype._paintOutline.call(this, e, t, i, n);
                }),
                (h.prototype.getPathBasePreview = function () {
                    if (!this._elementPreview) {
                        var e = this._element.getAnchorPoints();
                        this._setElementPreview(new l());
                        var t = this._elementPreview.getAnchorPoints();
                        t._beginBlockChanges([n._Change.BeforeChildInsert, n._Change.AfterChildInsert]);
                        for (var i = e.getFirstChild(); null != i; i = i.getNext()) {
                            var r = new l.AnchorPoint();
                            (r.transferProperties(i, [l.AnchorPoint.GeometryProperties]),
                                i.hasFlag(n.Flag.Selected) && r.setFlag(n.Flag.Selected),
                                t.appendChild(r));
                        }
                        t._endBlockChanges([n._Change.BeforeChildInsert, n._Change.AfterChildInsert]);
                    }
                    return this._elementPreview;
                }),
                (h.prototype.releasePathBasePreview = function () {
                    this._setElementPreview(null);
                }),
                (h.prototype.getPointPreview = function (e) {
                    if (e.getParent() == this._element.getAnchorPoints()) {
                        this.requestInvalidation();
                        var t = e.getParent().getIndexOfChild(e);
                        return this.getPathBasePreview().getAnchorPoints().getChildByIndex(t);
                    }
                    return null;
                }),
                (h.prototype._catchHandleAllowed = function () {
                    return this._catchHandle;
                }),
                (h.prototype.setCatchHandle = function (e) {
                    this._catchHandle = !!e;
                }),
                (h.prototype.toString = function () {
                    return "[Object GPathBaseEditor]";
                }),
                (module.exports = h));
        };
