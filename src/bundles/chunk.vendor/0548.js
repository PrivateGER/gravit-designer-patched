module.exports = function (module, exports, require) {
            var GSelectTool = require(334),
                r = require(2),
                IsFiniteNonNegativeNumber = require(0),
                a = require(24),
                s = require(39),
                l = require(386),
                h = (require(167), require(276));

            function A() {
                GSelectTool.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(A, GSelectTool),
                (A.prototype.activate = function (e, t) {
                    (GSelectTool.prototype.activate.call(this, e, t),
                        this._editor.setSelectionDetail(false, true),
                        a.styleEditors &&
                            ((this._styleEdManager = e.getScene().getWorkspace().getStyleEdManager()), this._styleEdManager.activate(e)),
                        (this._allowDistanceHelper = a.showDistance));
                }),
                (A.prototype.deactivate = function (e, t) {
                    (t || (this.setEditMode(GSelectTool.EditMode.Select), this._styleEdManager && this._styleEdManager.deactivate()),
                        GSelectTool.prototype.deactivate.call(this, e, t));
                }),
                (A.prototype._mouseDblClick = function (e) {
                    var t = GSelectTool.prototype._mouseDblClick.call(this, e);
                    return (
                        t ||
                            (this._editorUnderMouseInfo && this._editorUnderMouseInfo.editor instanceof h) ||
                            !(
                                (this._clickedElement && this._clickedElement.hasFlag(r.Flag.Selected)) ||
                                (this._editorUnderMouseInfo &&
                                    this._editorUnderMouseInfo.editor.hasFlag(s.Flag.Selected) &&
                                    !this._editorUnderMouseInfo.editor.canHandleDblClick())
                            ) ||
                            (a.selectDoubleClickBehavior == GSelectTool._DblClick.EditModeSwitch
                                ? (((this._clickedElement && this._clickedElement.hasFlag(r.Flag.Selected)) ||
                                      this._editMode === GSelectTool.EditMode.Edit) &&
                                      this.setEditMode(this._editMode === GSelectTool.EditMode.Edit ? GSelectTool.EditMode.Select : GSelectTool.EditMode.Edit),
                                  (t = true))
                                : a.selectDoubleClickBehavior == GSelectTool._DblClick.SubSelectSwitch && ((t = true), this._manager.activateTool(l))),
                        t
                    );
                }),
                (A.prototype._keyDown = function (e) {
                    (a.toolExitKey && e.key === a.toolExitKey && this.setEditMode(GSelectTool.EditMode.Select), GSelectTool.prototype._keyDown.call(this, e));
                }),
                (A.prototype.toString = function () {
                    return "[Object GPointerTool]";
                }),
                (module.exports = A));
        };
