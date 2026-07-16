module.exports = function (module, exports, require) {
            var GEditor = require(82),
                IsFiniteNonNegativeNumber = require(0),
                o = require(52),
                a = require(128),
                s = require(751),
                l = require(545),
                MOVE_MASTER = require(331),
                A = require(39);

            function c() {}
            (IsFiniteNonNegativeNumber.inherit(c, A),
                (c.options = {
                    snapDistance: 5,
                }),
                (c.prototype._manager = null),
                (c.prototype.getCursor = function (e, t) {
                    return o.Default;
                }),
                (c.prototype.activate = function (e) {
                    var t = e.parentEditor;
                    return (
                        (t instanceof a || t instanceof MOVE_MASTER || t instanceof l || t instanceof s) &&
                        (t.insertEditor(this), this.setFlag(A.Flag.Selected), this.requestInvalidation(), true)
                    );
                }),
                (c.prototype.deactivate = function () {
                    (this._parentEditor &&
                        (this.updatePartSelection(false, null, true),
                        this.removeFlag(A.Flag.Selected),
                        this.requestInvalidation(),
                        this._parentEditor.removeEditor(this, true)),
                        this._manager.notifyDeactivated(this));
                }),
                (c.prototype.validateAlreadyActive = function (e) {
                    return e.parentEditor === this._parentEditor;
                }),
                (c.prototype.isDeactivatable = function () {
                    return null != this._parentEditor;
                }),
                (c.prototype.getEditObj = function () {
                    return null;
                }),
                (c.prototype.updateCursor = function () {
                    this._manager && this == this._manager.getActiveEditor() && this._manager.updateActiveEditorCursor();
                }),
                (c.prototype.getBBox = function (e) {
                    return this.getCustomBBox(e);
                }),
                (c.prototype.requestInvalidation = function (e) {
                    var t = this._manager.getScene();
                    t && GEditor.getEditor(t).requestInvalidation(this, e);
                }),
                (c.prototype.movePart = function (e, t, i, n, r, o, a) {
                    (A.prototype.movePart.call(this, e, t, i, n, r, o, a), this._manager.blockEditorUpdate());
                }),
                (c.prototype._applyPartMove = function (e, t, i, n) {
                    (this._manager.releaseEditorUpdate(), A.prototype._applyPartMove.call(this, e, t, i, n));
                }),
                (c.prototype.toString = function () {
                    return "[Object GStyleEditor]";
                }),
                (module.exports = c));
        };
