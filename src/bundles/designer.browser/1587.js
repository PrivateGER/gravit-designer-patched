module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(168 /* PDFFetchStream */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(247), require(4), require(13), require(32), require(38), require(169 /* PDFNetworkStream */), require(33), require(26));
        var GPlatform = require(15),
            a = require(53),
            GObject = require(1),
            s = _interopRequireDefault(require(78)),
            l = _interopRequireDefault(require(1330)),
            c = _interopRequireDefault(require(238)),
            d = _interopRequireDefault(require(339)),
            u = _interopRequireDefault(require(1331 /* GCutCopyAction */)),
            p = _interopRequireDefault(require(877)),
            g = _interopRequireDefault(require(1183)),
            h = _interopRequireDefault(require(1184)),
            f = _interopRequireDefault(require(875)),
            m = _interopRequireDefault(require(876)),
            y = _interopRequireDefault(require(1332)),
            v = _interopRequireDefault(require(811 /* GGroupAction */)),
            _ = _interopRequireDefault(require(870 /* GSplitAction */)),
            b = _interopRequireDefault(require(1333)),
            w = _interopRequireDefault(require(1334)),
            C = _interopRequireDefault(require(869 /* GArrangeAction */)),
            x = _interopRequireDefault(require(1335)),
            S = _interopRequireDefault(require(810 /* GConvertToPathAction */)),
            E = _interopRequireDefault(require(1336)),
            A = _interopRequireDefault(require(1337)),
            T = _interopRequireDefault(require(1590)),
            G = _interopRequireDefault(require(878)),
            P = _interopRequireDefault(require(879));
        class D extends G.default {
            constructor(e) {
                (super(e), this.addGesture(new P.default()), this.setDelayedTouchEventsEnabled(false));
            }
            _handleEvent(e) {
                (e.cancelable && (e.preventDefault(), e.stopPropagation()), super._handleEvent(e));
            }
        }
        const L = {
                [GPlatform.GKey.Constant.LEFT]: 37,
                [GPlatform.GKey.Constant.UP]: 38,
                [GPlatform.GKey.Constant.RIGHT]: 39,
                [GPlatform.GKey.Constant.DOWN]: 40,
                [GPlatform.GKey.Constant.SHIFT]: 16,
                [GPlatform.GKey.Constant.CONTROL]: 17,
                [GPlatform.GKey.Constant.ALT_LEFT]: 18,
            },
            I = Object.values(L),
            k = (e, t) => {
                const n = gDesigner.getActiveDocument(),
                    o = n && n.getActiveWindow(),
                    i = o && o.getView(),
                    a = i && i.getHtmlElement();
                a && a.dispatchEvent(new KeyboardEvent(e, { keyCode: t }));
            },
            O = (e) =>
                e === GPlatform.GKey.Constant.ALT_LEFT ||
                e === GPlatform.GKey.Constant.ALT_RIGHT ||
                e === GPlatform.GKey.Constant.SHIFT ||
                e === GPlatform.GKey.Constant.CONTROL,
            F = [GPlatform.GKey.Constant.UP, GPlatform.GKey.Constant.LEFT, GPlatform.GKey.Constant.RIGHT, GPlatform.GKey.Constant.DOWN];
        function R(e) {
            ((this._htmlElement = e),
                (this._keyState = {}),
                (this._heldKeys = new Map()),
                (this._keyDownInveral = {}),
                (this._keyDownBound = this._keyDown.bind(this)),
                (this._keyUpBound = this._keyUp.bind(this)),
                (this._mouseUpBound = this._mouseup.bind(this)),
                (this._touchHandler = new T.default()),
                this.init());
        }
        ((R.prototype._touchHandler = null),
            (R.prototype._htmlElement = null),
            (R.prototype._keyState = null),
            (R.prototype._heldKeys = null),
            (R.prototype._keyDownInveral = null),
            (R.prototype._document = null),
            (R.prototype._keyDownBound = null),
            (R.prototype._keyUpBound = null),
            (R.prototype._mouseUpBound = null),
            (R.prototype.init = function () {
                (GPlatform.GPlatform.constructor.bypassKeyDownRestrictionByClassName("g-virtual-key"), this._htmlElement.gCollapsible());
                const e = $("<div/>").addClass("container").appendTo(this._htmlElement),
                    t = (e) => {
                        const t = this._keyDownInveral[e];
                        (t && (clearInterval(t), delete this._keyDownInveral[e]), O(e) && GPlatform.GPlatform.releaseKey(e), k("keyup", L[e]));
                    },
                    n = (e) => {
                        const t = this._keyDownInveral[e];
                        (t && clearInterval(t),
                            ((e) => F.includes(e))(e) &&
                                (this._keyDownInveral[e] = setInterval(() => {
                                    k("keydown", L[e]);
                                }, 100)),
                            O(e) && GPlatform.GPlatform.holdKey(e),
                            k("keydown", L[e]));
                    },
                    o = (e) => {
                        let { key, icon, dblclick, actionClass } = e;
                        const c = s({
                            name: icon ? null : GPlatform.GKey.toLocalizedShort(key, true),
                            icon: icon,
                            actionClass: "g-virtual-key" + (actionClass ? " " + actionClass : ""),
                            mousedown: (e) => {
                                (e.stopImmediatePropagation(), this._isHoldingKey(key) || n(key));
                            },
                            click: (e) => {
                                (e.stopImmediatePropagation(),
                                    this._isHoldingKey(key) || (t(key), gDesigner.stats("virtualkey_assistantbar_click", key)));
                            },
                            dblclick: dblclick,
                            mouseup: (e) => {
                                (e.stopImmediatePropagation(), this._isHoldingKey(key) || t(key));
                            },
                            touchstart: () => {
                                this._isHoldingKey(key) || n(key);
                            },
                            touchend: () => {
                                this._isHoldingKey(key) || t(key);
                            },
                            touchcancel: () => {
                                this._isHoldingKey(key) || t(key);
                            },
                            active: () => !!this._keyState[L[key]] || this._isHoldingKey(key),
                        });
                        return (new D(c[0]), c);
                    },
                    r = function (e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        return e.reduce(
                            (e, t) => {
                                let { icon: n, action, isEnabled } = t;
                                const a = e.createAddItem(action);
                                return (
                                    n && a.setIcon(n),
                                    isEnabled &&
                                        a.addEventListener(d.default.UpdateEvent, () => {
                                            a.setEnabled(isEnabled());
                                        }),
                                    e
                                );
                            },
                            new c.default(null, "g-assistant-bar-menu" + (t ? " " + t : ""))
                        );
                    },
                    s = (e) => {
                        let {
                            action: t,
                            name,
                            menu,
                            icon: i,
                            click,
                            dblclick: r,
                            mousedown,
                            mouseup,
                            touchstart,
                            touchmove,
                            touchend,
                            touchcancel,
                            split: g = false,
                            active,
                            actionClass: f,
                        } = e;
                        const m = $("<div/>").addClass("toolbar-button").toggleClass("split", !!g),
                            y = $("<button/>").addClass("action-button").appendTo(m);
                        if (
                            (f && y.addClass(f),
                            active && (m.data("active", active), m.toggleClass("g-active", !!active())),
                            t &&
                                (m.data("action", t),
                                i || (i = t.getIcon()),
                                click || (click = () => gDesigner.executeAction(t.getId(), void 0, "assistantbar"))),
                            name && $("<span/>").text(name).appendTo(y),
                            i && $("<span/>").addClass(i).appendTo(y),
                            click && y.on("click", click),
                            r && y.on("dblclick", r),
                            mousedown && m.on("mousedown", mousedown),
                            mouseup && m.on("mouseup", mouseup),
                            touchstart && m.on("touchstart", touchstart),
                            touchmove && m.on("touchmove", touchmove),
                            touchend && m.on("touchend", touchend),
                            touchcancel && m.on("touchcancel", touchcancel),
                            menu)
                        ) {
                            let e;
                            ((menu.__which = "assistantbar"),
                                (e = g
                                    ? $("<button/>")
                                          .addClass("dropdown-button")
                                          .append($("<span></span>").addClass("gravit-icon-touch-arrow-up"))
                                          .appendTo(m)
                                    : y.append($("<span></span>").addClass("gravit-icon-touch-arrow-up"))),
                                e.gMenuButton({ menu: menu, touch: true }));
                        }
                        return m;
                    },
                    l = $("<div/>").addClass("left-side").appendTo(e),
                    T = $("<div/>")
                        .addClass("right-side")
                        .appendTo(e)
                        .gCollapsible({ orientation: A.default.Orientation.Horizontal })
                        .gCollapsible("collapse")
                        .on("visibilitychanged", (e, t) => {
                            gContainer.setProperty("designer.assistant-bar.left-side.expanded", !!t);
                        });
                ($("<div/>")
                    .gPropertyRow({
                        height: "auto",
                        columns: [
                            {
                                width: "86px",
                                content: o({
                                    key: GPlatform.GKey.Constant.SHIFT,
                                    actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.SHIFT),
                                    dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.SHIFT),
                                }),
                            },
                            {
                                width: "auto",
                                content: s({
                                    icon: "gravit-icon-touch-copy",
                                    action: gDesigner.getAction(u.default.ID_COPY),
                                }),
                            },
                            {
                                width: "68px",
                                content: s({
                                    icon: "gravit-icon-touch-paste",
                                    action: gDesigner.getAction(p.default.ID),
                                    menu: r(
                                        [
                                            {
                                                icon: "gravit-icon-touch-paste-in-place",
                                                action: gDesigner.getAction(g.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-inside",
                                                action: gDesigner.getAction(h.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-and-replace",
                                                action: gDesigner.getAction(m.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-style",
                                                action: gDesigner.getAction(f.default.ID),
                                            },
                                        ],
                                        "paste-menu"
                                    ),
                                    split: true,
                                }),
                            },
                            {
                                width: "auto",
                                content: s({
                                    icon: "gravit-icon-touch-trash-2",
                                    action: gDesigner.getAction(y.default.ID),
                                }),
                            },
                            {
                                width: "auto",
                                content: s({
                                    icon: "gravit-icon-touch-selection",
                                    click: () => {
                                        const e = gDesigner.getActiveDocument(),
                                            t = e && e.getEditor();
                                        if (t) {
                                            t.getSelection() && t.getSelection().length > 0
                                                ? gDesigner.executeAction(w.default.ID, void 0, "assistantbar")
                                                : gDesigner.executeAction(b.default.ID, void 0, "assistantbar");
                                        }
                                    },
                                }),
                            },
                            {
                                width: "62px",
                                content: s({
                                    icon: "gravit-icon-touch-arrange-order",
                                    menu: r(
                                        Object.values(a.GEditor.ArrangeOrderType).map((e) => ({
                                            icon: "gravit-icon-touch-arrange-" + e,
                                            action: gDesigner.getAction(C.default.ID + "." + e),
                                            isEnabled: () => this._isArrangeActionEnabled(e),
                                        })),
                                        "arrange-menu"
                                    ),
                                }),
                            },
                            {
                                width: "auto",
                                content: s({
                                    icon: "gravit-icon-touch-fullscreen",
                                    action: gDesigner.getAction(x.default.ID),
                                    active: () => gDesigner.getAction(x.default.ID).isFullscreen(),
                                }),
                            },
                        ],
                    })
                    .appendTo(l),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "86px",
                                    content: o({
                                        key: GPlatform.GKey.Constant.CONTROL,
                                        actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.CONTROL),
                                        dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.CONTROL),
                                    }),
                                },
                                {
                                    width: "114px",
                                    content: o({
                                        key: GPlatform.GKey.Constant.ALT_LEFT,
                                        actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.ALT_LEFT),
                                        dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.ALT_LEFT),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: s({
                                        icon: "gravit-icon-touch-group",
                                        action: gDesigner.getAction(v.default.ID),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: s({
                                        icon: "gravit-icon-touch-ungroup",
                                        action: gDesigner.getAction(_.default.ID),
                                    }),
                                },
                                {
                                    width: "62px",
                                    content: s({
                                        icon: "gravit-icon-touch-convert-to-path",
                                        action: gDesigner.getAction(S.default.ID),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: s({
                                        icon: "gravit-icon-touch-help",
                                        click: () => gDesigner.executeAction(E.default.ID, void 0, "assistantbar"),
                                    }),
                                },
                            ],
                        })
                        .appendTo(l),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "auto",
                                    content: o({
                                        key: GPlatform.GKey.Constant.UP,
                                        icon: "gravit-icon-touch-arrow-key-up",
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: o({
                                        key: GPlatform.GKey.Constant.DOWN,
                                        icon: "gravit-icon-touch-arrow-key-down",
                                    }),
                                },
                            ],
                        })
                        .appendTo(T),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "auto",
                                    content: o({
                                        key: GPlatform.GKey.Constant.LEFT,
                                        icon: "gravit-icon-touch-arrow-key-left",
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: o({
                                        key: GPlatform.GKey.Constant.RIGHT,
                                        icon: "gravit-icon-touch-arrow-key-right",
                                    }),
                                },
                            ],
                        })
                        .appendTo(T),
                    gContainer.getProperty("designer.assistant-bar.left-side.expanded").then((e) => {
                        T.gCollapsible(e ? "expand" : "collapse");
                    }));
            }),
            (R.prototype._toggleModifierKey = function (e) {
                const t = !GPlatform.GPlatform.isHoldingKey(e);
                (this._toggleKey(e, t),
                    this._htmlElement.find(".g-virtual-key-".concat(e)).toggleClass("g-held", t),
                    this._updateActions());
            }),
            (R.prototype._toggleKey = function (e, t) {
                t ? (GPlatform.GPlatform.holdKey(e), this._heldKeys.set(e, true)) : (GPlatform.GPlatform.releaseKey(e), this._heldKeys.delete(e));
            }),
            (R.prototype._isHoldingKey = function (e) {
                return !!this._heldKeys && !!this._heldKeys.get(e);
            }),
            (R.prototype._keyDown = function (e) {
                I.includes(e.which || e.keyCode) && ((this._keyState[e.which || e.keyCode] = true), this._updateActions());
            }),
            (R.prototype._keyUp = function (e) {
                I.includes(e.which || e.keyCode) && (delete this._keyState[e.which || e.keyCode], this._updateActions());
            }),
            (R.prototype._mouseup = function (e) {
                e.isTrusted &&
                    (Object.keys(this._keyDownInveral).forEach((e) => {
                        (k("keyup", L[e]), clearInterval(this._keyDownInveral[e]));
                    }),
                    (this._keyDownInveral = []));
            }),
            (R.prototype.activate = function () {
                (document.addEventListener("keydown", this._keyDownBound, true),
                    document.addEventListener("keyup", this._keyUpBound, true),
                    document.addEventListener("mouseup", this._mouseUpBound, true),
                    gDesigner.addEventListener(s.default, this._documentEvent, this),
                    gDesigner.addEventListener(l.default, this._fullScreenEvent, this),
                    GPlatform.GPlatform.addEventListener(GPlatform.GModifiersChangedEvent, this._modifiersChangedEvent, this),
                    this._activateDocument(gDesigner.getActiveDocument()),
                    this._touchHandler.activate(this._htmlElement[0]),
                    (this._heldKeys = new Map()),
                    this._updateActions());
            }),
            (R.prototype.deactivate = function () {
                (document.removeEventListener("keydown", this._keyDownBound, true),
                    document.removeEventListener("keyup", this._keyUpBound, true),
                    document.removeEventListener("mouseup", this._mouseUpBound, true),
                    gDesigner.removeEventListener(s.default, this._documentEvent, this),
                    gDesigner.removeEventListener(l.default, this._fullScreenEvent, this),
                    GPlatform.GPlatform.removeEventListener(GPlatform.GModifiersChangedEvent, this._modifiersChangedEvent, this),
                    this._deactivateDocument(gDesigner.getActiveDocument()),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.ALT_LEFT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.ALT_RIGHT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.SHIFT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.CONTROL),
                    this._touchHandler.deactivate(this._htmlElement[0]),
                    (this._heldKeys = null));
            }),
            (R.prototype._activateDocument = function (e) {
                (e && e.getEditor().addEventListener(a.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    (this._document = e));
            }),
            (R.prototype._deactivateDocument = function (e) {
                (e && e.getEditor().removeEventListener(a.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    (this._document = null));
            }),
            (R.prototype._selectionChangedEvent = function (e) {
                this._updateActions();
            }),
            (R.prototype._fullScreenEvent = function () {
                this._updateActions();
            }),
            (R.prototype._modifiersChangedEvent = function () {
                this._updateActions();
            }),
            (R.prototype._documentEvent = function (e) {
                const t = e.document;
                if (!t.isLockedByVersionHistory())
                    switch (e.type) {
                        case s.default.Type.Activated:
                            (this._activateDocument(t), this._updateActions());
                            break;
                        case s.default.Type.Deactivated:
                            (this._deactivateDocument(t), this._updateActions());
                            break;
                        case s.default.Type.Modified:
                            this._updateActions();
                    }
            }),
            (R.prototype._updateActions = function () {
                this._htmlElement.find(".toolbar-button").each(function () {
                    const e = $(this),
                        t = e.data("action"),
                        n = e.data("active");
                    if (t) {
                        const n = !t.isAvailable() || !t.isEnabled();
                        e.find("button").prop("disabled", n).toggleClass("g-disabled", n);
                    }
                    n && e.toggleClass("g-active", !!n());
                });
            }),
            (R.prototype._isArrangeActionEnabled = function (e) {
                if (!gDesigner.getAction(C.default.ID + "." + e).isEnabled()) return false;
                const t = this._document ? this._document.getEditor().getIndividualSelection() : null;
                if (!t) return false;
                if (t.length > 1) return true;
                const n = t[0],
                    o = n.getParent();
                switch (e) {
                    case a.GEditor.ArrangeOrderType.SendToFront:
                        if (n.getNext()) {
                            let e = n.getNext(),
                                t = null;
                            for (; !t && e; ) (e instanceof GObject.GElement && (t = e), (e = e.getNext()));
                            return !!t && a.GEditor.validateBlockInsertion(o, n);
                        }
                        return false;
                    case a.GEditor.ArrangeOrderType.BringForward: {
                        let e = n.getNext();
                        if (e) {
                            let t = null;
                            for (; !t && e; ) (e instanceof GObject.GElement && (e.hasFlag(GObject.GNode.Flag.Selected) || (t = e)), (e = e.getNext()));
                            if (null !== t) {
                                const e = t.getNext();
                                return a.GEditor.validateBlockInsertion(o, n, e);
                            }
                        }
                        return false;
                    }
                    case a.GEditor.ArrangeOrderType.SendBackward: {
                        let e = n.getPrevious();
                        if (null !== e) {
                            let t = null;
                            for (; !t && e; )
                                (e instanceof GObject.GElement &&
                                    (e.hasFlag(GObject.GNode.Flag.Selected) || (a.GEditor.validateBlockInsertion(o, n, e) && (t = e))),
                                    (e = e.getPrevious()));
                            return !!t;
                        }
                        return false;
                    }
                    case a.GEditor.ArrangeOrderType.SendToBack:
                        if (null !== n.getPrevious()) {
                            let e = o.getFirstChild(),
                                t = null;
                            for (; !t && e && e !== n; )
                                (e instanceof GObject.GElement && a.GEditor.validateBlockInsertion(o, n, e) && (t = e), (e = e.getNext()));
                            return !!t;
                        }
                        return false;
                }
                return true;
            }),
            (R.prototype.getHtmlElement = function () {
                return this._htmlElement;
            }),
            (module.exports = R));
    };
