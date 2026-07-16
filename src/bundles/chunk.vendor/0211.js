module.exports = function (module, exports, require) {
            var n = require(52),
                IsFiniteNonNegativeNumber = require(0),
                o = require(24),
                a = require(167);

            function s() {}
            (IsFiniteNonNegativeNumber.inherit(s, IsFiniteNonNegativeNumber),
                (s.prototype._manager = null),
                (s.prototype._scene = null),
                (s.prototype._view = null),
                (s.prototype._editor = null),
                (s.prototype.getCursor = function () {
                    return n.Default;
                }),
                (s.prototype.supportsElementClick = function () {
                    return false;
                }),
                (s.prototype.activate = function (e, t) {
                    ((this._scene = e ? e.getScene() : null),
                        (this._view = e),
                        (this._editor = e.getEditor()),
                        o.toolExitKey && !t && e.addEventListener(a.Down, this._keyDown, this));
                }),
                (s.prototype.deactivate = function (e, t) {
                    if ((e.getScene() != this._scene && this._scene) || (e != this._view && this._view))
                        throw new Error("Not supposed to happen");
                    (this._view && o.toolExitKey && this._view.removeEventListener(a.Down, this._keyDown, this),
                        t || ((this._scene = null), (this._view = null), (this._editor = null)));
                }),
                (s.prototype.isDeactivatable = function () {
                    return true;
                }),
                (s.prototype.isActivatable = function (e) {
                    return true;
                }),
                (s.prototype.paint = function (e) {}),
                (s.prototype.updateCursor = function () {
                    this._manager && this == this._manager.getActiveTool() && this._manager._updateActiveToolCursor();
                }),
                (s.prototype.updateInlineHint = function (e, t, i) {
                    this._manager && this == this._manager.getActiveTool() && this._manager._updateInlineHint(e, t, i);
                }),
                (s.prototype.invalidateArea = function (e) {
                    this._manager && this == this._manager.getActiveTool() && this._manager._invalidateActiveToolArea(e);
                }),
                (s.prototype.catchesContextMenu = function (e) {
                    return false;
                }),
                (s.prototype._keyDown = function (e) {
                    o.toolExitKey && e.key === o.toolExitKey && this._manager.notifyJobDone(this);
                }),
                (s.prototype.toString = function () {
                    return "[Object GTool]";
                }),
                (module.exports = s));
        };
