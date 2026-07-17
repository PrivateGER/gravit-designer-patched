module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3));
        var GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            Utils = require(40);
        function GLongPressEvent() {}
        (GObject.GObject.inherit(GLongPressEvent, GObject.GEvent),
            (GLongPressEvent.prototype._startX = 0),
            (GLongPressEvent.prototype._startY = 0),
            (GLongPressEvent.prototype._timerHandle = null),
            (GLongPressEvent.prototype._mouseMove = null),
            (GLongPressEvent.prototype._mouseUp = null),
            (GLongPressEvent.prototype._mouseDown = null),
            (GLongPressEvent.prototype._isTouchDevice = false),
            (GLongPressEvent.prototype._event = null),
            (GLongPressEvent.prototype._touching = false),
            (GLongPressEvent.prototype._clearRequestTimeout = function (handle) {
                handle &&
                    (window.cancelAnimationFrame
                        ? window.cancelAnimationFrame(handle.value)
                        : window.webkitCancelAnimationFrame
                          ? window.webkitCancelAnimationFrame(handle.value)
                          : window.webkitCancelRequestAnimationFrame
                            ? window.webkitCancelRequestAnimationFrame(handle.value)
                            : window.mozCancelRequestAnimationFrame
                              ? window.mozCancelRequestAnimationFrame(handle.value)
                              : window.oCancelRequestAnimationFrame
                                ? window.oCancelRequestAnimationFrame(handle.value)
                                : window.msCancelRequestAnimationFrame
                                  ? window.msCancelRequestAnimationFrame(handle.value)
                                  : clearTimeout(handle.value));
            }),
            (GLongPressEvent.prototype._requestTimeout = function (callback, delay) {
                if (
                    !(
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        (window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame
                    )
                )
                    return { value: window.setTimeout(callback, delay) };
                var startTime = new Date().getTime(),
                    handle = {},
                    tick = function () {
                        new Date().getTime() - startTime >= delay ? callback.call() : (handle.value = requestAnimFrame(tick));
                    };
                return ((handle.value = requestAnimFrame(tick)), handle);
            }),
            (GLongPressEvent.prototype._clearLongPressTimer = function () {
                (this._clearRequestTimeout(this._timerHandle), (this._timerHandle = null));
            }),
            (GLongPressEvent.prototype._cancelEvent = function (event) {
                (event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation());
            }),
            (GLongPressEvent.prototype._mouseDownHandler = function (event) {
                if (event.defaultPrevented) return void this._clearLongPressTimer();
                let { clientX: t, clientY: n } = event;
                ("touchstart" === event.type && event.changedTouches && event.changedTouches[0] && ({ clientX: t, clientY: n } = event.changedTouches[0]),
                    (this._startX = t),
                    (this._startY = n),
                    this._startLongPressTimer(event));
            }),
            (GLongPressEvent.prototype._startLongPressTimer = function (event) {
                (this._clearLongPressTimer(), (this._event = event));
                var target = event.target,
                    delay = parseInt(target.getAttribute("data-long-press-delay") || designerConfig.LONG_PRESS_TIME_OUT, 10);
                this._timerHandle = this._requestTimeout(this._fireLongPressEvent.bind(this), delay);
            }),
            (GLongPressEvent.prototype._fireLongPressEvent = function () {
                this._clearLongPressTimer();
                var target = this._event.target,
                    clientX = this._isTouchDevice ? this._event.touches[0].clientX : this._event.clientX,
                    clientY = this._isTouchDevice ? this._event.touches[0].clientY : this._event.clientY,
                    notCancelled = target.dispatchEvent(
                        new CustomEvent("long-press", {
                            bubbles: true,
                            cancelable: true,
                            detail: { clientX: clientX, clientY: clientY },
                        })
                    ),
                    notInSceneWidget =
                        this._event.target.parentElement &&
                        this._event.target.parentElement.className &&
                        -1 === this._event.target.parentElement.className.indexOf("g-scene-widget");
                if (notCancelled && notInSceneWidget) {
                    const onPointerUp = (event) => {
                        event.isTrusted &&
                            (document.removeEventListener("touchend", onPointerUp, true),
                            document.removeEventListener("mouseup", onPointerUp, true),
                            this._cancelEvent(event));
                    };
                    (document.addEventListener("touchend", onPointerUp, true), document.addEventListener("mouseup", onPointerUp, true));
                }
            }),
            (GLongPressEvent.prototype.startup = function () {
                if (
                    ((this._isTouchDevice = GPlatform.GPlatform.constructor.isTouchDevice),
                    (this._mouseDown = this._isTouchDevice ? "touchstart" : "mousedown"),
                    (this._mouseUp = this._isTouchDevice ? "touchend" : "mouseup"),
                    (this._mouseMove = this._isTouchDevice ? "touchmove" : "mousemove"),
                    document.addEventListener(this._mouseUp, this._clearLongPressTimer.bind(this), true),
                    document.addEventListener(this._mouseMove, this._mouseMoveHandler.bind(this), true),
                    document.addEventListener("wheel", this._clearLongPressTimer.bind(this), true),
                    document.addEventListener("scroll", this._clearLongPressTimer.bind(this), true),
                    document.addEventListener(this._mouseDown, this._mouseDownHandler.bind(this)),
                    this._isTouchDevice && GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Safari)
                ) {
                    const passiveOption = !(0, Utils.isPassiveSupported)() || {
                        passive: true,
                        capture: true,
                    };
                    (document.addEventListener("touchstart", this._documentTouchStart.bind(this), passiveOption),
                        document.addEventListener("touchend", this.documentTouchEnd.bind(this), passiveOption),
                        document.addEventListener("touchcancel", this.documentTouchEnd.bind(this), passiveOption),
                        document.addEventListener("mousedown", this._documentMouseDown.bind(this), true));
                }
            }),
            (GLongPressEvent.prototype._documentTouchStart = function (event) {
                event.isTrusted && (this._touching = true);
            }),
            (GLongPressEvent.prototype.documentTouchEnd = function (event) {
                event.isTrusted && (this._touching = false);
            }),
            (GLongPressEvent.prototype._documentMouseDown = function (event) {
                event.isTrusted && this._touching && event.cancelable && event.stopImmediatePropagation();
            }),
            (GLongPressEvent.prototype._mouseMoveHandler = function (event) {
                if ("touchmove" === event.type) {
                    const { clientX, clientY } = event.changedTouches[0];
                    if (Math.abs(clientX - this._startX) < designerConfig.MIN_TOUCH_MOVE_DISTANCE && Math.abs(clientY - this._startY) < designerConfig.MIN_TOUCH_MOVE_DISTANCE)
                        return;
                }
                this._clearLongPressTimer();
            }),
            (GLongPressEvent.prototype.toString = function () {
                return "[Object GLongPressEvent]";
            }),
            new GLongPressEvent().startup(),
            (module.exports = GLongPressEvent));
    };
