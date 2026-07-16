module.exports = function (module, exports, require) {
            var n = require(77),
                r = require(52),
                IsFiniteNonNegativeNumber = require(0),
                a = (require(103 /* DUMP_IMAGES */), require(211));

            function s() {
                a.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(s, a),
                (s.prototype._panning = false),
                (s.prototype.getCursor = function () {
                    return this._panning ? r.HandClosed : r.HandOpen;
                }),
                (s.prototype.activate = function (e, t) {
                    (a.prototype.activate.call(this, e, t),
                        t ||
                            (e.addEventListener(n.DragStart, this._mouseDragStart, this),
                            e.addEventListener(n.Drag, this._mouseDrag, this),
                            e.addEventListener(n.DragEnd, this._mouseDragEnd, this)));
                }),
                (s.prototype.deactivate = function (e, t) {
                    (a.prototype.deactivate.call(this, e, t),
                        e.removeEventListener(n.DragStart, this._mouseDragStart),
                        e.removeEventListener(n.Drag, this._mouseDrag),
                        e.removeEventListener(n.DragEnd, this._mouseDragEnd));
                }),
                (s.prototype.isDeactivatable = function () {
                    return !this._panning;
                }),
                (s.prototype._mouseDragStart = function (e) {
                    ((this._panning = true), this._view.beginPan(), this.updateCursor());
                }),
                (s.prototype._mouseDrag = function (e) {
                    this._panning && this._view.scrollBy(-e.clientDelta.getX(), -e.clientDelta.getY());
                }),
                (s.prototype._mouseDragEnd = function (e) {
                    this._panning && ((this._panning = false), this._view.finishPan(), this.updateCursor());
                }),
                (s.prototype.toString = function () {
                    return "[Object GHandTool]";
                }),
                (module.exports = s));
        };
