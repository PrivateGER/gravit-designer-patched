module.exports = function (module, exports, require) {
            var n = require(75),
                IsFiniteNonNegativeNumber = require(0),
                o = require(14),
                a = require(77),
                s = require(5),
                l = require(505),
                h = require(167),
                A = require(164),
                c = (require(645), require(52));
            require(72);

            function p(e) {
                ((this._htmlElement = this._createHTMLElement()), null != e && e.appendChild(this._htmlElement));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(p, IsFiniteNonNegativeNumber, [n]),
                (p.ButtonsFlag = {
                    Left: 1 << a.BUTTON_LEFT,
                    Middle: 1 << a.BUTTON_MIDDLE,
                    Right: 1 << a.BUTTON_RIGHT,
                }),
                (p.prototype._htmlElement = null),
                (p.prototype._inputEventCache = null),
                (p.prototype._dragEventCounter = 0),
                (p.prototype._buttonsFlag = p.ButtonsFlag.Left | p.ButtonsFlag.Middle),
                (p.prototype._id = null),
                (p.prototype._parent = null),
                (p.prototype._x = 0),
                (p.prototype._y = 0),
                (p.prototype._width = 0),
                (p.prototype._height = 0),
                (p.prototype._cursor = null),
                p.prototype._inputRecorder,
                (p.prototype.getX = function () {
                    return this._x;
                }),
                (p.prototype.getY = function () {
                    return this._y;
                }),
                (p.prototype.getWidth = function () {
                    return this._htmlElement.offsetWidth ? this._htmlElement.offsetWidth : this._width;
                }),
                (p.prototype.getHeight = function () {
                    return this._htmlElement.offsetHeight ? this._htmlElement.offsetHeight : this._height;
                }),
                (p.prototype.setRightDrag = function (e) {
                    e ? this.setButtonFlag(p.ButtonsFlag.Right) : this.removeButtonFlag(p.ButtonsFlag.Right);
                }),
                (p.prototype.setButtonFlag = function (e) {
                    this._buttonsFlag = this._buttonsFlag | e;
                }),
                (p.prototype.removeButtonFlag = function (e) {
                    this._buttonsFlag = this._buttonsFlag & ~e;
                }),
                (p.prototype.hasButtonFlag = function (e) {
                    return 0 != (this._buttonsFlag & e);
                }),
                (p.prototype.move = function (e, t) {
                    ((this._htmlElement.style.left = "number" == typeof e ? e.toString() + "px" : ""),
                        (this._htmlElement.style.top = "number" == typeof t ? t.toString() + "px" : ""),
                        (this._htmlElement.style.position = "number" == typeof e || "number" == typeof t ? "absolute" : ""),
                        (this._x = e),
                        (this._y = t));
                }),
                (p.prototype.resize = function (e, t) {
                    ((this._htmlElement.style.width = e ? e.toString() + "px" : ""),
                        (this._htmlElement.style.height = t ? t.toString() + "px" : ""),
                        (this._htmlElement.style.overflowX = e ? "hidden" : ""),
                        (this._htmlElement.style.overflowY = t ? "hidden" : ""),
                        (this._width = e),
                        (this._height = t));
                }),
                (p.prototype.getCursor = function () {
                    return this._cursor;
                }),
                (p.prototype.setCursor = function (e) {
                    this._cursor != e &&
                        (this._cursor && this._removeCSSClass("g-cursor-" + this._cursor),
                        (this._cursor = e),
                        this._cursor && (c.initStyle(), this._addCSSClass("g-cursor-" + this._cursor)));
                }),
                (p.prototype.hasFocus = function () {
                    var e = false;
                    try {
                        ((this._inputHtmlElement && document.activeElement === this._inputHtmlElement) ||
                            document.activeElement === this._htmlElement) &&
                            (e = true);
                    } catch (e) {}
                    return e;
                }),
                (p.prototype.isEnabled = function () {
                    return null == this._htmlElement.className || this._htmlElement.className.indexOf("g-disabled") < 0;
                }),
                (p.prototype.setEnabled = function (e) {
                    e != this.isEnabled() && (e ? this._removeCSSClass("g-disabled", true) : this._addCSSClass("g-disabled", true));
                }),
                (p.prototype.isDisplayed = function () {
                    return "none" != this._htmlElement.style.display;
                }),
                (p.prototype.setDisplayed = function (e) {
                    this._htmlElement.style.display = e ? "" : "none";
                }),
                (p.prototype.trigger = function (e) {
                    (e.isImmediatePropagationStopped && delete e.isImmediatePropagationStopped,
                        this._dragEventCounter > 0 && e instanceof a.Release && this._dragMouseRelease(e),
                        n.prototype.trigger.call(this, e),
                        this._dragEventCounter > 0 &&
                            (e instanceof a.Down
                                ? this._dragMouseDown(e)
                                : e instanceof a.Move && this._dragStartPosition && this._dragMouseMove(e)));
                }),
                (p.prototype.addEventListener = function (e, t, i, r, o) {
                    (n.prototype.addEventListener.call(this, e, t, i, r, o),
                        l.prototype.isPrototypeOf(e.prototype) &&
                            (this._registerInputEventListener(e),
                            a.isDragEvent(e) &&
                                (0 == this._dragEventCounter &&
                                    (this._registerInputEventListener(a.Down),
                                    this._registerInputEventListener(a.Move),
                                    this._registerInputEventListener(a.Release)),
                                this._dragEventCounter++)));
                }),
                (p.prototype.removeEventListener = function (e, t, i) {
                    var r = n.prototype.removeEventListener.call(this, e, t, i);
                    return (
                        r &&
                            l.prototype.isPrototypeOf(e.prototype) &&
                            (this._unregisterInputEventListener(e),
                            a.isDragEvent(e) &&
                                0 == --this._dragEventCounter &&
                                (this._unregisterInputEventListener(a.Down),
                                this._unregisterInputEventListener(a.Move),
                                this._unregisterInputEventListener(a.Release))),
                        r
                    );
                }),
                (p.prototype.focus = function () {
                    if (this.isDisplayed())
                        try {
                            for (var e = this._htmlElement.children, t = 0; t < e.length; t++)
                                if ("0" === e[t].getAttribute("tabindex")) return (e[t].focus(), true);
                            if (this._inputHtmlElement && "0" === this._inputHtmlElement.getAttribute("tabindex"))
                                return (this._inputHtmlElement.focus(), true);
                        } catch (e) {
                            return false;
                        }
                    return false;
                }),
                (p.prototype.setInputRecorder = function (e) {
                    this._inputRecorder = e;
                }),
                (p.prototype._convertClientPositionFromMousePosition = function (e) {
                    var t = null,
                        i = null,
                        n = null;
                    (e.target == this._htmlElement &&
                        ("absolute" === this._htmlElement.style.position
                            ? e.hasOwnProperty("offsetX") &&
                              ((t = e.offsetX),
                              (i = e.offsetY),
                              this._inputHtmlElement && ((t -= (n = this._htmlElement.getBoundingClientRect()).left), (i -= n.top)))
                            : ((t = e.clientX),
                              (i = e.clientY),
                              this._inputHtmlElement && ((t -= (n = this._htmlElement.getBoundingClientRect()).left), (i -= n.top)))),
                        (null != t && null != i) ||
                            ((n = this._htmlElement.getBoundingClientRect()),
                            (t = e.pageX - (n.left + window.pageXOffset - document.documentElement.clientLeft)),
                            (i = e.pageY - (n.top + window.pageYOffset - document.documentElement.clientTop))));
                    var r = o.getScreenDPI();
                    return new s((t *= r), (i *= r));
                }),
                (p.prototype._registerInputEventListener = function (e) {
                    var t = a.isDragEvent(e),
                        i = IsFiniteNonNegativeNumber.getTypeId(e);
                    this._inputEventCache && i in this._inputEventCache
                        ? this._inputEventCache && i in this._inputEventCache && this._inputEventCache[i].counter++
                        : (this._inputEventCache || (this._inputEventCache = {}),
                          (this._inputEventCache[i] = {
                              counter: 1,
                              event: new e(),
                          }),
                          t || this._startListeningInputEvent(e));
                }),
                (p.prototype._unregisterInputEventListener = function (e) {
                    var t = a.isDragEvent(e),
                        i = IsFiniteNonNegativeNumber.getTypeId(e);
                    this._inputEventCache &&
                        i in this._inputEventCache &&
                        0 == --this._inputEventCache[i].counter &&
                        (t || this._stopListeningInputEvent(e),
                        delete this._inputEventCache[i],
                        0 == Object.keys(this._inputEventCache).length && (this._inputEventCache = null));
                }),
                (p.prototype._startListeningInputEvent = function (e) {
                    var t = IsFiniteNonNegativeNumber.getTypeId(e),
                        i = function (t) {
                            this._updateAndTriggerInputEvent(t, e);
                        }.bind(this);
                    if (i && this._inputEventCache) {
                        this._inputEventCache[t].domListener = i;
                        var n = this._getDomEventNameForEventClass(e);
                        this._htmlElement.addEventListener(n, i);
                    }
                }),
                (p.prototype._stopListeningInputEvent = function (e) {
                    var t = IsFiniteNonNegativeNumber.getTypeId(e),
                        i = this._getDomEventNameForEventClass(e);
                    this._inputEventCache &&
                        (this._htmlElement.removeEventListener(i, this._inputEventCache[t].domListener),
                        delete this._inputEventCache[t].domListener);
                }),
                (p.prototype._dragMouseDown = function (e) {
                    this.hasButtonFlag(1 << e.button) && ((this._dragStartPosition = e.client), (this._dragIsDragging = false));
                }),
                (p.prototype._dragMouseMove = function (e) {
                    if (this._dragStartPosition && !this._dragIsDragging) {
                        var t = this._dragStartPosition;
                        if (
                            (Math.abs(t.getX() - e.client.getX()) >= 1 || Math.abs(t.getY() - e.client.getY()) >= 1) &&
                            ((this._dragIsDragging = true),
                            (this._dragPreviousPosition = this._dragStartPosition),
                            this.hasEventListeners(a.DragStart))
                        ) {
                            var i = this._inputEventCache[IsFiniteNonNegativeNumber.getTypeId(a.DragStart)].event;
                            (this._dragAssignMouseEvent(e, i), (i.client = this._dragStartPosition), this.trigger(i));
                        }
                    }
                    if (this._dragIsDragging && this.hasEventListeners(a.Drag)) {
                        i = this._inputEventCache[IsFiniteNonNegativeNumber.getTypeId(a.Drag)].event;
                        (this._dragAssignMouseEvent(e, i),
                            this._dragAssignDragEvent(i, e),
                            this.trigger(i),
                            (this._dragPreviousPosition = e.client));
                    }
                }),
                (p.prototype._dragMouseRelease = function (e) {
                    if (this.hasButtonFlag(1 << e.button)) {
                        if (this._dragIsDragging && this.hasEventListeners(a.DragEnd)) {
                            var t = this._inputEventCache[IsFiniteNonNegativeNumber.getTypeId(a.DragEnd)].event;
                            (this._dragAssignMouseEvent(e, t), this._dragAssignDragEvent(t, e), this.trigger(t));
                        }
                        (delete this._dragStartPosition, delete this._dragPreviousPosition, delete this._dragIsDragging);
                    }
                }),
                (p.prototype._dragAssignMouseEvent = function (e, t) {
                    ((t.client = e.client),
                        (t.button = e.button),
                        t.isImmediatePropagationStopped && delete t.isImmediatePropagationStopped);
                }),
                (p.prototype._dragAssignDragEvent = function (e, t) {
                    ((e.clientStart = this._dragStartPosition),
                        (e.clientDelta = t.client.subtract(this._dragPreviousPosition)),
                        e.isImmediatePropagationStopped && delete e.isImmediatePropagationStopped);
                }),
                (p.prototype._setParent = function (e) {
                    this._parent = e;
                }),
                (p.prototype._triggerWidgetEventFromDom = function (e, t, i) {
                    (t instanceof a.Down
                        ? this._setCapture()
                        : t instanceof a.Release
                          ? this._releaseCapture()
                          : t instanceof a.Move &&
                            ((e.button === a.BUTTON_LEFT && (e.buttons === a.BUTTONS_UNDEF || e.buttons & a.BUTTONS_LEFT)) ||
                                (t.button =
                                    e.buttons & a.BUTTONS_RIGHT
                                        ? a.BUTTON_RIGHT
                                        : e.buttons & a.BUTTONS_MIDDLE
                                          ? a.BUTTON_MIDDLE
                                          : a.BUTTON_LEFT)),
                        delete t.isImmediatePropagationStopped,
                        (t.preventDefault = e.preventDefault.bind(e)),
                        (t.stopPropagation = e.stopPropagation.bind(e)),
                        (t.stopImmediatePropagation = function () {
                            (this.stopPropagation(), (this.isImmediatePropagationStopped = true));
                        }),
                        this.trigger(t));
                }),
                (p.prototype._updateAndTriggerInputEvent = function (e, t, i) {
                    if (this.isEnabled()) {
                        if ("keydown" === e.type)
                            switch (A.translateCode(e.code) || A.translateKey(e.which || e.keyCode)) {
                                case A.Constant.TAB:
                                    e.preventDefault();
                            }
                        else ("mousedown" === e.type || "wheel" === e.type) && e.preventDefault();
                        if (this._inputRecorder)
                            if (this._inputRecorder.isBusy() && !this._inputRecorder.isRecording()) {
                                if (!i) return;
                            } else this._inputRecorder.record(e, t, e.target === this._htmlElement);
                        a.prototype.isPrototypeOf(t.prototype)
                            ? this._updateAndTriggerMouseEvent(e, IsFiniteNonNegativeNumber.getTypeId(t))
                            : h.prototype.isPrototypeOf(t.prototype) && this._updateAndTriggerKeyEvent(e, IsFiniteNonNegativeNumber.getTypeId(t));
                    }
                }),
                (p.prototype._updateAndTriggerMouseEvent = function (e, t) {
                    if (this._inputEventCache) {
                        var i = this._inputEventCache[t];
                        if (i) {
                            var n = i.event;
                            ((n.client = this._convertClientPositionFromMousePosition(e)),
                                (n.button = e.button),
                                n instanceof a.Wheel && ((n.deltaX = e.deltaX), (n.deltaY = e.deltaY), (n.zoom = e.ctrlKey)),
                                (n instanceof a.Click || n instanceof a.Down || n instanceof a.Release) && (n.clickCount = e.detail),
                                this._triggerWidgetEventFromDom(e, n));
                        }
                    }
                }),
                (p.prototype._updateAndTriggerKeyEvent = function (e, t) {
                    if (this._inputEventCache) {
                        var i = this._inputEventCache[t];
                        if (i) {
                            var n = i.event;
                            ((n.key = A.translateCode(e.code) || A.translateKey(e.which || e.keyCode, e.location)),
                                (n.timestamp = e.timeStamp || -new Date().getTime()),
                                String.fromCodePoint
                                    ? (n.keyUTF = String.fromCodePoint(e.charCode))
                                    : (n.keyUTF = String.fromCharCode(e.charCode)),
                                this._triggerWidgetEventFromDom(e, n));
                        }
                    }
                }),
                (p.prototype._getDomEventNameForEventClass = function (e) {
                    switch (e) {
                        case a.Move:
                            return "mousemove";
                        case a.Enter:
                            return "mouseover";
                        case a.Leave:
                            return "mouseout";
                        case a.Down:
                            return "mousedown";
                        case a.Release:
                            return "mouseup";
                        case a.Click:
                            return "click";
                        case a.DblClick:
                            return "dblclick";
                        case h.Down:
                            return "keydown";
                        case h.Release:
                            return "keyup";
                        case h.Press:
                            return "keypress";
                        case a.Wheel:
                            return "wheel";
                    }
                    throw new Error("Unknown DOMEvent name");
                }));
            var u = [a.Move, a.Release, h.Down, h.Release, h.Press];
            ((p.prototype._setCapture = function () {
                var e = this;

                function t(t) {
                    var i = e._getDomEventNameForEventClass(t);
                    (e._savedDocumentListeners || (e._savedDocumentListeners = {}),
                        e._savedDocumentListeners[i] ||
                            ((e._savedDocumentListeners[i] = function (i) {
                                i.target != this._htmlElement && (e._updateAndTriggerInputEvent(i, t), i.stopImmediatePropagation());
                            }.bind(e)),
                            document.addEventListener(i, e._savedDocumentListeners[i], true)));
                }
                for (var i = 0; i < u.length; ++i) {
                    var n = u[i];
                    this._inputEventCache[IsFiniteNonNegativeNumber.getTypeId(n)] && t(n);
                }
            }),
                (p.prototype._releaseCapture = function () {
                    if (this._savedDocumentListeners) {
                        for (var e in this._savedDocumentListeners) document.removeEventListener(e, this._savedDocumentListeners[e], true);
                        delete this._savedDocumentListeners;
                    }
                }),
                (p.prototype._addCSSClass = function (e) {
                    var t = this._htmlElement.className;
                    if (t && 0 != t.trim().length) {
                        for (var i = true, n = t.trim().split(" "), r = 0; r < n.length; ++r) {
                            if (n[r].trim() == e) {
                                i = false;
                                break;
                            }
                        }
                        i && (t += " " + e);
                    } else t = e;
                    this._htmlElement.className = t;
                }),
                (p.prototype._removeCSSClass = function (e) {
                    var t = this._htmlElement.className;
                    if (t && t.indexOf(e) >= 0) {
                        for (var i = "", n = t.trim().split(" "), r = 0; r < n.length; ++r) {
                            var o = n[r].trim();
                            o != e && (i.length > 0 && (i += " "), (i += o));
                        }
                        this._htmlElement.className = i;
                    }
                }),
                (p.prototype._createHTMLElement = function (e) {
                    var t = document.createElement("div");
                    return (
                        e &&
                            (t.setAttribute("tabindex", "0"),
                            (t.style.padding = "0px 0px"),
                            (t.style.margin = "0px 0px"),
                            (t.style.cursor = "inherit"),
                            (t.style.position = "absolute")),
                        t
                    );
                }),
                (p.prototype.toString = function () {
                    return "[Object GWidget]";
                }),
                (module.exports = p));
        };
