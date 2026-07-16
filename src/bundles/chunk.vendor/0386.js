module.exports = function (module, exports, require) {
            var GSelectTool = require(334),
                IsFiniteNonNegativeNumber = require(0),
                o = require(60),
                a = require(52),
                s = require(104),
                l = require(113),
                h = require(122),
                A = require(164),
                c = require(83),
                p = require(24),
                u = require(22);

            function d(e) {
                (GSelectTool.call(this, e), (this._clickGoDown = false));
            }
            (IsFiniteNonNegativeNumber.inherit(d, GSelectTool),
                (d.prototype.getCursor = function () {
                    var e = GSelectTool.prototype.getCursor.call(this);
                    return e === a.Select
                        ? a.SelectInverse
                        : e === a.SelectDot
                          ? a.SelectDotInverse
                          : e === a.SelectPlus
                            ? a.SelectPlusInverse
                            : e;
                }),
                (d.prototype._hasPathResize = function () {
                    return false;
                }),
                (d.prototype.activate = function (e, t) {
                    (GSelectTool.prototype.activate.call(this, e, t),
                        this._editor.setSelectionDetail(true, true, e),
                        this._editor.setPathResize(false, true),
                        this._view.setRightDrag(true),
                        (this._releaseOnlySelection = true),
                        p.styleEditors &&
                            ((this._styleEdManager = e.getScene().getWorkspace().getStyleEdManager()), this._styleEdManager.activate(e)));
                }),
                (d.prototype.deactivate = function (e, t) {
                    (t ||
                        (this._styleEdManager && this._styleEdManager.deactivate(),
                        this.setEditMode(GSelectTool.EditMode.Select),
                        this._editor.setSelectionDetail(false, true),
                        this._editor.setPathResize(true)),
                        this._view && this._view.setRightDrag(false),
                        GSelectTool.prototype.deactivate.call(this, e, t));
                }),
                (d.prototype._mouseDblClick = function (e) {
                    var t = GSelectTool.prototype._mouseDblClick.call(this, e);
                    return (
                        t || ((t = true), p.selectDoubleClickBehavior == GSelectTool._DblClick.SubSelectSwitch && this._manager.notifyJobDone(this)),
                        t
                    );
                }),
                (d.prototype._getCollisionFlags = function () {
                    var e = null,
                        t = this._editor.getSelection();
                    return (
                        (t && t.length && this._getSelectableElements(t)) || (e = u.CollisionFlag.GeometryBBox | u.CollisionFlag.Partial),
                        e
                    );
                }),
                (d.prototype._getSelectableElement = function (e, t) {
                    return e instanceof s && !(e instanceof h) ? e : null;
                }),
                (d.prototype._selectAcceptor = function (e) {
                    return !(e instanceof h || e instanceof c);
                }),
                (d.prototype._keyDown = function (e) {
                    if (
                        (GSelectTool.prototype._keyDown.call(this, e),
                        !this._editor.getCurrentInlineEditorNode() && e.key === A.Constant.TAB && !this._mode)
                    ) {
                        var t = this._editor.getSelection();
                        t && 1 === t.length && (t[0] instanceof o || t[0] instanceof l) && this._manager.activateOldPathTool();
                    }
                }),
                (d.prototype.toString = function () {
                    return "[Object GSubSelectTool]";
                }),
                (module.exports = d));
        };
