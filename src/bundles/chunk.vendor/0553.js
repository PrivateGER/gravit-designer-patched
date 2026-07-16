module.exports = function (module, exports, require) {
            var n = require(64),
                r = require(150),
                o = require(75),
                IsFiniteNonNegativeNumber = require(0),
                s = require(72),
                l = require(5),
                h = require(211),
                A = require(761),
                c = require(551),
                p = require(758),
                u = require(335),
                d = require(764),
                g = require(756),
                f = require(757),
                m = require(748),
                y = require(759),
                _ = require(550),
                GPathsGraphTool = require(753),
                b = require(539),
                C = require(548),
                w = require(384),
                E = require(549),
                B = require(762),
                x = require(763),
                P = require(754),
                S = require(386),
                GTextTool = require(547),
                I = require(746),
                F = require(755),
                R = require(738),
                D = require(77),
                k = require(765),
                G = require(767),
                Q = require(769),
                M = require(771),
                N = require(773),
                U = require(775);

            function V() {
                ((this._tools = []),
                    (this._typeIdToIndexMap = {}),
                    (this._defaultTool = C),
                    this.addTool(new C()),
                    this.addTool(new S()),
                    this.addTool(new m()),
                    this.addTool(new y()),
                    this.addTool(new _()),
                    this.addTool(new b()),
                    this.addTool(new A()),
                    this.addTool(new GPathsGraphTool()),
                    this.addTool(new u()),
                    this.addTool(new d()),
                    this.addTool(new E()),
                    this.addTool(new c()),
                    this.addTool(new I()),
                    this.addTool(new w()),
                    this.addTool(new P()),
                    this.addTool(new B()),
                    this.addTool(new GTextTool()),
                    this.addTool(new f()),
                    this.addTool(new p()),
                    this.addTool(new x()),
                    this.addTool(new p()),
                    this.addTool(new g()),
                    this.addTool(new F()),
                    this.addTool(new R()),
                    this.addTool(new k()),
                    this.addTool(new N()),
                    this.addTool(new G()),
                    this.addTool(new Q()),
                    this.addTool(new M()),
                    this.addTool(new U()));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(V, IsFiniteNonNegativeNumber, [o]),
                (V.ToolChangedEvent = function (e, t, i) {
                    ((this.previousTool = e), (this.newTool = t), (this.light = !!i));
                }),
                IsFiniteNonNegativeNumber.inherit(V.ToolChangedEvent, s),
                (V.ToolChangedEvent.prototype.previousTool = null),
                (V.ToolChangedEvent.prototype.newTool = null),
                (V.ToolChangedEvent.prototype.light = false),
                (V.ToolChangedEvent.prototype.toString = function () {
                    return "[Event GToolManager.ToolChangedEvent]";
                }),
                (V.InvalidationRequestEvent = function (e, t) {
                    ((this.manager = e), (this.area = t));
                }),
                IsFiniteNonNegativeNumber.inherit(V.InvalidationRequestEvent, s),
                (V.InvalidationRequestEvent.prototype.manager = null),
                (V.InvalidationRequestEvent.prototype.area = null),
                (V.InvalidationRequestEvent.prototype.toString = function () {
                    return "[Event GToolManager.InvalidationRequestEvent]";
                }),
                (V.prototype._tools = null),
                (V.prototype._typeIdToIndexMap = null),
                (V.prototype._activeTool = null),
                (V.prototype._oldTool = null),
                (V.prototype._view = null),
                (V.prototype._temporaryActiveTool = null),
                (V.prototype._tempActivationTime = null),
                (V.prototype._lightDeactivation = false),
                (V.prototype.addTool = function (e) {
                    if (e._manager) throw new Error("Tool is already registered");
                    (this._tools.push(e), (e._manager = this), (this._typeIdToIndexMap = {}));
                    for (var t = 0; t < this._tools.length; ++t) {
                        e = this._tools[t];
                        this._typeIdToIndexMap[IsFiniteNonNegativeNumber.getTypeId(e)] = t;
                    }
                }),
                (V.prototype.hasTool = function (e) {
                    return this._typeIdToIndexMap.hasOwnProperty(IsFiniteNonNegativeNumber.getTypeId(e));
                }),
                (V.prototype.getToolCount = function () {
                    return this._tools.length;
                }),
                (V.prototype.indexOf = function (e) {
                    return this._typeIdToIndexMap.hasOwnProperty(IsFiniteNonNegativeNumber.getTypeId(e)) ? this._typeIdToIndexMap[IsFiniteNonNegativeNumber.getTypeId(e)] : -1;
                }),
                (V.prototype.getTool = function (e) {
                    var t = "number" == typeof e ? e : this.indexOf(e);
                    return t >= 0 && t < this._tools.length ? this._tools[t] : null;
                }),
                (V.prototype.getActiveTool = function () {
                    return this._activeTool;
                }),
                (V.prototype.getTemporaryActiveTool = function () {
                    return this._temporaryActiveTool;
                }),
                (V.prototype.activateTool = function (e, t, i) {
                    if (!this._temporaryActiveTool || i) {
                        if (this._temporaryActiveTool) {
                            if ((e instanceof h || (e = this.getTool(this.indexOf(e))), e == this._activeTool))
                                return ((this._temporaryActiveTool = null), (this._tempActivationTime = null), true);
                            this._activeTool.isDeactivatable() && ((this._temporaryActiveTool = null), (this._tempActivationTime = null));
                        }
                        if (!this._temporaryActiveTool) return this._activateTool(e, t);
                    }
                    return false;
                }),
                (V.prototype.tempToolKeyActivate = function (e) {
                    if (e && this.getTool(e) !== this._activeTool) {
                        var t = this._activeTool,
                            i =
                                e == g ||
                                e == F ||
                                ((t instanceof b || t instanceof A) && (e == b || e == A || e == C || e == S || e == m));
                        if (this._activateTool(e, null, i))
                            return (
                                (this._lightDeactivation = i),
                                this._temporaryActiveTool || (this._temporaryActiveTool = t),
                                this._tempActivationTime || (this._tempActivationTime = new Date().getTime()),
                                true
                            );
                    }
                    return false;
                }),
                (V.prototype.tempToolKeyRelease = function (e, t) {
                    return (
                        !!(e && this.getTool(e) == this._activeTool && this._temporaryActiveTool && this._tempActivationTime) &&
                        (this._tempActivationTime + t <= new Date().getTime()
                            ? this._activateTool(this._temporaryActiveTool)
                            : this._lightDeactivation &&
                              (this._temporaryActiveTool.deactivate(this._view),
                              this._activeTool.activate(this._view, true),
                              this.hasEventListeners(V.ToolChangedEvent) &&
                                  this.trigger(new V.ToolChangedEvent(this._temporaryActiveTool, this._activeTool, false)),
                              (this._lightDeactivation = false)),
                        (this._temporaryActiveTool = null),
                        (this._tempActivationTime = null),
                        true)
                    );
                }),
                (V.prototype.isContextActivatable = function (e) {
                    return e.isActivatable(this._view);
                }),
                (V.prototype.setView = function (e) {
                    e != this._view &&
                        (this._view && (this._removeActiveToolFromView(), n.removeEventListener(r, this._modifiersChanged)),
                        (this._view = e),
                        this._view && (this._addActiveToolToView(), n.addEventListener(r, this._modifiersChanged, this)));
                }),
                (V.prototype.setDefaultTool = function (e) {
                    this._defaultTool = e;
                }),
                (V.prototype.notifyJobDone = function (e) {
                    e instanceof this._defaultTool ||
                        setTimeout(
                            function () {
                                this.activateTool(this._defaultTool);
                            }.bind(this),
                            0
                        );
                }),
                (V.prototype.activateSubSelect = function () {
                    this.activateTool(S);
                }),
                (V.prototype.getOldTool = function () {
                    return this._oldTool;
                }),
                (V.prototype.activateOldPathTool = function () {
                    var e = this.getOldTool();
                    e && (e instanceof b || e instanceof A) ? this.activateTool(e) : this.activateTool(b);
                }),
                (V.prototype._activateTool = function (e, t, i) {
                    return (
                        e instanceof h || (e = this.getTool(this.indexOf(e))),
                        e != this._activeTool &&
                            !(this._activeTool && !this._activeTool.isDeactivatable()) &&
                            !!e.isActivatable(this._view) &&
                            (this._removeActiveToolFromView(i),
                            (this._oldTool = this._activeTool),
                            (this._activeTool = e),
                            t && this._activeTool.setIcon instanceof Function && this._activeTool.setIcon(t),
                            this._addActiveToolToView(),
                            this.hasEventListeners(V.ToolChangedEvent) && this.trigger(new V.ToolChangedEvent(this._oldTool, e, i)),
                            true)
                    );
                }),
                (V.prototype._addActiveToolToView = function () {
                    this._activeTool && this._view && (this._activeTool.activate(this._view), this._updateActiveToolCursor());
                }),
                (V.prototype._removeActiveToolFromView = function (e) {
                    this._activeTool &&
                        this._view &&
                        (this._activeTool.deactivate(this._view, e),
                        this._view.setCursor(null),
                        this._view.getEditor().closeInlineEditor());
                }),
                (V.prototype._updateActiveToolCursor = function () {
                    this._activeTool && this._view && this._view.setCursor(this._activeTool.getCursor());
                }),
                (V.prototype._updateInlineHint = function (e, t, i) {
                    if (this._activeTool && this._view)
                        if (e && t) {
                            var n = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(t);
                            this._view.updateInlineHint(e, new l(n.getX(), n.getY()), i);
                        } else this._view.updateInlineHint(null);
                }),
                (V.prototype._invalidateActiveToolArea = function (e) {
                    this.hasEventListeners(V.InvalidationRequestEvent) &&
                        this._activeTool &&
                        this._view &&
                        this.trigger(new V.InvalidationRequestEvent(this, e));
                }),
                (V.prototype.paint = function (e) {
                    this._activeTool && this._activeTool.paint(e);
                }),
                (V.prototype._updateTemporaryTool = function (e) {
                    if (!this._view.getEditor().isInlineEditing()) {
                        var t = this.getTool(this.indexOf(g)),
                            i = this.getTool(this.indexOf(F)),
                            r = null;
                        if (
                            ((n.modifiers.spaceKey || n.modifiers.middleButton) && this._temporaryActiveTool !== t
                                ? (r = t)
                                : this._temporaryActiveTool &&
                                  this._tempActivationTime &&
                                  !(
                                      ((e.spaceKey || e.middleButton) && this._activeTool == t) ||
                                      (!n.modifiers.metaKey && e.metaKey && this._activeTool == i)
                                  ) &&
                                  (r = this._activeTool),
                            r || !t || t.isDeactivatable() || this._view.trigger(new D.DragEnd()),
                            n.modifiers.metaKey && (r === t || this._activeTool instanceof g) && !this._tempActivationTime && (r = i),
                            !r && this._temporaryActiveTool)
                        )
                            this._activateTool(this._temporaryActiveTool) &&
                                ((this._temporaryActiveTool = null), (this._tempActivationTime = null));
                        else if (r && r !== this._activeTool) {
                            var o = this._activeTool;
                            this._activateTool(r, null, true) && (this._temporaryActiveTool || (this._temporaryActiveTool = o));
                        }
                    }
                }),
                (V.prototype._modifiersChanged = function (e) {
                    this._updateTemporaryTool(e.changed);
                }),
                (V.prototype.toString = function () {
                    return "[Object GToolManager]";
                }),
                (module.exports = V));
        };
