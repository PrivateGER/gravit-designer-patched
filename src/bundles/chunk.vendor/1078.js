module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(127),
                o = require(36),
                a = require(66),
                s = require(268);

            function l() {
                r.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(l, r),
                o.exports(l, s),
                (l.prototype.filterFlags = function (e) {
                    return (
                        0 != (e & a.Flag.ResizeAll) && (e &= ~a.Flag.ResizeAll),
                        0 != (e & a.Flag.RotateHandle) && (e &= ~a.Flag.RotateHandle),
                        e
                    );
                }),
                (l.prototype._applyTransform = function (e, t, i, n) {
                    this._partSelection && this._partSelection.length > 0 && !this.hasFlag(a.Flag.ResizeAll)
                        ? r.prototype._applyTransform.call(this, e, t, i, n)
                        : this._transform &&
                          !this._transform.isIdentity() &&
                          e.getSrcPath() &&
                          e.getDstPath() &&
                          (e.transformAnchors(this._transform),
                          e.getSrcPath().transform(this._transform, true, i),
                          e.getDstPath().transform(this._transform, true, i),
                          this.resetTransform());
                }),
                (l.prototype.isDeletePartsAllowed = function () {
                    if (this._partSelection && this._partSelection.length)
                        for (
                            var e = this._element.getAnchorPoints().getFirstChild(),
                                t = this._element.getAnchorPoints().getLastChild(),
                                i = 0;
                            i < this._partSelection.length;
                            i++
                        )
                            if (
                                this._partSelection[i].type == r.PartType.Point &&
                                (this._partSelection[i].point === e || this._partSelection[i].point === t)
                            )
                                return false;
                    return r.prototype.isDeletePartsAllowed.call(this);
                }),
                (module.exports = l));
        };
