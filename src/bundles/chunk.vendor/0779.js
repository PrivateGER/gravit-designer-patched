module.exports = function (module, exports, require) {
            var n = require(147),
                r = require(138),
                o = require(780),
                a = require(781),
                s = require(75),
                IsFiniteNonNegativeNumber = require(0),
                GStylable = require(28),
                A = require(782),
                c = require(72),
                p = require(36),
                u = require(385),
                d = require(160),
                g = require(158),
                f = require(283),
                m = require(2),
                y = require(83),
                _ = require(24);

            function v() {
                ((this._editors = []),
                    (this._typeIdToIndexMap = {}),
                    this.addEditor(new A()),
                    this.addEditor(new o()),
                    this.addEditor(new a()));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(v, IsFiniteNonNegativeNumber, [s]),
                (v.EditorEventType = {
                    ActivePointChange: 1,
                    PrepareModifiedEvent: 2,
                }),
                (v.EditorChangedEvent = function (e, t) {
                    ((this.previousEditor = e), (this.newEditor = t));
                }),
                IsFiniteNonNegativeNumber.inherit(v.EditorChangedEvent, c),
                (v.EditorChangedEvent.prototype.previousEditor = null),
                (v.EditorChangedEvent.prototype.newEditor = null),
                (v.EditorChangedEvent.prototype.toString = function () {
                    return "[Event GStyleEdManager.EditorChangedEvent]";
                }),
                (v.EditorEvent = function (e, t) {
                    ((this.type = e), (this.data = t));
                }),
                IsFiniteNonNegativeNumber.inherit(v.EditorEvent, c),
                (v.EditorEvent.prototype.type = null),
                (v.EditorEvent.prototype.data = null),
                (v.EditorEvent.prototype.toString = function () {
                    return "[Event GStyleEdManager.EditorEvent]";
                }),
                (v.PREPARE_MODIFIED_EVENT = new v.EditorEvent(v.EditorEventType.PrepareModifiedEvent, null)),
                (v.prototype._editors = null),
                (v.prototype._typeIdToIndexMap = null),
                (v.prototype._activeEditor = null),
                (v.prototype._view = null),
                (v.prototype._scene = null),
                (v.prototype._activated = false),
                (v.prototype._overlayLock = false),
                (v.prototype._editorUpdateBlocker = false),
                (v.prototype.activate = function (e) {
                    (this._activated && this.deactivate(),
                        (this._view = e),
                        (this._scene = e ? e.getScene() : null),
                        (this._mainEditor = e ? e.getEditor() : null),
                        (this._activated = true),
                        this._scene.addEventListener(m.AfterPropertiesChangeEvent, this._afterPropertiesChange, this));
                }),
                (v.prototype.deactivate = function () {
                    (this._activeEditor && this.deactivateEditor(),
                        this._scene && this._scene.removeEventListener(m.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._view = null),
                        (this._scene = null),
                        (this._mainEditor = null),
                        (this._activated = false));
                }),
                (v.prototype.isActivated = function () {
                    return this._activated;
                }),
                (v.prototype.getScene = function () {
                    return this._scene;
                }),
                (v.prototype.addEditor = function (e) {
                    if (e._manager) throw new Error("Editor is already registered");
                    (this._editors.push(e), (e._manager = this), (this._typeIdToIndexMap = {}));
                    for (var t = 0; t < this._editors.length; ++t) {
                        e = this._editors[t];
                        this._typeIdToIndexMap[IsFiniteNonNegativeNumber.getTypeId(e)] = t;
                    }
                }),
                (v.prototype.getEditor = function (e) {
                    var t = this._typeIdToIndexMap.hasOwnProperty(IsFiniteNonNegativeNumber.getTypeId(e)) ? this._typeIdToIndexMap[IsFiniteNonNegativeNumber.getTypeId(e)] : -1;
                    return t >= 0 && t < this._editors.length ? this._editors[t] : null;
                }),
                (v.prototype.getActiveEditor = function () {
                    return this._activated ? this._activeEditor : null;
                }),
                (v.prototype.updateEditor = function (e, t, i) {
                    this.deactivateEditor();
                    var s = e.getProperty(t, false, null, i);
                    if (s) {
                        var l = null,
                            c = null,
                            u = null;
                        if ((e.hasMixin(GStylable) && e._scene) || e instanceof y || e instanceof d) c = p.openEditor(e);
                        else if (e.getOwnerStylable) {
                            var m = e.getOwnerStylable();
                            m && m._scene && (c = p.openEditor(m));
                        }
                        (s instanceof r &&
                            ((u = {
                                parentEditor: c,
                                propName: t,
                                propHolder: e,
                                propTemporary: i,
                            }),
                            s instanceof n ? (l = A) : s instanceof g ? (l = o) : s instanceof f && (l = a)),
                            l && u && this._activateEditor(l, u));
                    }
                }),
                (v.prototype.setOverlayLock = function () {
                    this._overlayLock = true;
                }),
                (v.prototype.resetOverlayLock = function () {
                    this._overlayLock = false;
                }),
                (v.prototype.getOverlayLock = function (e) {
                    if (this._activeEditor) {
                        if (e && e instanceof MouseEvent) {
                            var t = this._view._convertClientPositionFromMousePosition(e);
                            this._activeEditor.getPartInfoAt(
                                t,
                                this._view.getWorldTransform(this._scene.getActivePage()),
                                null,
                                _.pickDistance,
                                this._view.getViewConfiguration().multiPageView
                            )
                                ? this.setOverlayLock()
                                : this.resetOverlayLock();
                        }
                    } else this.resetOverlayLock();
                    return this._overlayLock;
                }),
                (v.prototype.deactivateEditor = function () {
                    (this.releaseEditorUpdate(), this._activated && this._activeEditor && this._activeEditor.deactivate());
                }),
                (v.prototype.notifyDeactivated = function (e) {
                    this._activated && this._activeEditor === e && (this._activeEditor = null);
                }),
                (v.prototype.updateActiveEditorCursor = function () {
                    this._activeEditor && this._view && this._view.setCursor(this._activeTool.getCursor());
                }),
                (v.prototype._activateEditor = function (e, t) {
                    if (this._activated) {
                        if (this._activeEditor && !this._activeEditor.isDeactivatable()) return false;
                        if ((e instanceof u || (e = this.getEditor(e)), e)) {
                            var i = this._activeEditor;
                            if (
                                (e != this._activeEditor || !e.validateAlreadyActive(t)) &&
                                (this._activeEditor && (this._activeEditor.deactivate(), (this._activeEditor = null)),
                                e.getParentEditor() && e.deactivate(),
                                e.activate(t))
                            )
                                return (
                                    (this._activeEditor = e),
                                    i && this.hasEventListeners(v.EditorChangedEvent) && this.trigger(new v.EditorChangedEvent(i, e)),
                                    true
                                );
                        } else this.deactivateEditor();
                    }
                    return false;
                }),
                (v.prototype.blockEditorUpdate = function () {
                    this._editorUpdateBlocker = true;
                }),
                (v.prototype.releaseEditorUpdate = function () {
                    this._editorUpdateBlocker = false;
                }),
                (v.prototype._afterPropertiesChange = function (e) {
                    if (!this._editorUpdateBlocker) {
                        var t = e.node.getPatternPropNames ? e.node.getPatternPropNames() : null;
                        if (t && t.length)
                            for (var i = 0; i < e.properties.length; ++i) {
                                var n = e.properties[i];
                                if (t.indexOf(n) >= 0) return void this.updateEditor(e.node, e.properties[i], e.temporary);
                            }
                    }
                }),
                (v.prototype.handleEditorPartUpdate = function (e) {
                    this.hasEventListeners(v.EditorEvent) &&
                        (this.blockEditorUpdate(),
                        this.trigger(
                            new v.EditorEvent(
                                v.EditorEventType.ActivePointChange,
                                e
                                    ? {
                                          idx: e.idx,
                                      }
                                    : null
                            )
                        ),
                        this.releaseEditorUpdate());
                }),
                (v.prototype.preparePermanentChange = function () {
                    this.hasEventListeners(v.EditorEvent) && this.trigger(v.PREPARE_MODIFIED_EVENT);
                }),
                (v.prototype.beginTransaction = function () {
                    this._mainEditor && (this.preparePermanentChange(), this._mainEditor.beginTransaction());
                }),
                (v.prototype.commitTransaction = function (e, t) {
                    this._mainEditor && this._mainEditor.commitTransaction(e, t);
                }),
                (v.prototype.toString = function () {
                    return "[Object GStyleEdManager]";
                }),
                (module.exports = v));
        };
