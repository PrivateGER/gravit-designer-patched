module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            designerConfig = require(10),
            gestureHelperModule = _interopRequireDefault(require(1582));
        module.exports = class {
            constructor(target) {
                ((this._target = target),
                    (this._lastTouchStartEvent = 0),
                    (this._touchmoved = false),
                    (this._touchStartX = 0),
                    (this._touchStartY = 0),
                    (this._handleEventBound = this._tryHandleEvent.bind(this)),
                    (this._handleScrollEventBound = this._handleScrollEvent.bind(this)),
                    (this._gestureHelper = new gestureHelperModule.default()),
                    this.activate(target));
            }
            addGesture(gesture) {
                this._gestureHelper.addGesture(gesture);
            }
            setDelayedTouchEventsEnabled(enabled) {
                this._gestureHelper.setDelayedTouchEventsEnabled(enabled);
            }
            setClickSuppressionEnabled(enabled) {
                (this._gestureHelper.setClickSuppressionEnabled(enabled),
                    document.removeEventListener("scroll", this._handleScrollEventBound, true),
                    enabled && document.addEventListener("scroll", this._handleScrollEventBound, true));
            }
            activate(target) {
                (this.deactivate(this._target),
                    (this._target = target),
                    this._target &&
                        (this._target.addEventListener("touchstart", this._handleEventBound),
                        this._target.addEventListener("touchmove", this._handleEventBound),
                        this._target.addEventListener("touchend", this._handleEventBound),
                        this._target.addEventListener("touchcancel", this._handleEventBound),
                        this._target.addEventListener("gesturestart", this._handleEventBound)));
            }
            deactivate(target) {
                const element = target || this._target;
                (element &&
                    (element.removeEventListener("touchstart", this._handleEventBound),
                    element.removeEventListener("touchmove", this._handleEventBound),
                    element.removeEventListener("touchend", this._handleEventBound),
                    element.removeEventListener("touchcancel", this._handleEventBound),
                    element.removeEventListener("gesturestart", this._handleEventBound)),
                    document.removeEventListener("scroll", this._handleScrollEventBound, true),
                    this._target && delete this._target);
            }
            _tryHandleEvent(event) {
                this._shouldHandle(event) && this._handleEvent(event);
            }
            _handleEvent(event) {
                switch (event.type) {
                    case "touchstart":
                        this._touchStart(event);
                        break;
                    case "touchmove":
                        this._touchMove(event);
                        break;
                    case "touchend":
                        this._touchEnd(event);
                        break;
                    case "touchcancel":
                        this._touchCancel(event);
                        break;
                    case "gesturestart":
                        this._gestureStart(event);
                }
            }
            _touchStart(event) {
                const touch = event.targetTouches[0] || event.changedTouches[0];
                (touch
                    ? ((this._touchStartX = touch.clientX), (this._touchStartY = touch.clientY))
                    : ((this._touchStartX = 0), (this._touchStartY = 0)),
                    (this._touchmoved = false),
                    this._gestureHelper.touchStart(event));
            }
            _touchMove(event) {
                ((this._touchmoved = this._wasMoved(event)), this._touchmoved && this._gestureHelper.touchMove(event));
            }
            _touchEnd(event) {
                ((this._touchmoved = false), this._gestureHelper.touchEnd(event));
            }
            _touchCancel(event) {
                this._gestureHelper.touchCancel(event);
            }
            _gestureStart(event) {
                this._gestureHelper.gestureStart(event);
            }
            _handleScrollEvent(event) {
                this._gestureHelper.scroll(event);
            }
            _wasMoved(event) {
                const touch = event.changedTouches[0],
                    { clientX, clientY } = touch;
                return !(
                    Math.abs(clientX - this._touchStartX) < designerConfig.MIN_TOUCH_MOVE_DISTANCE &&
                    Math.abs(clientY - this._touchStartY) < designerConfig.MIN_TOUCH_MOVE_DISTANCE
                );
            }
            _shouldHandle(event) {
                return !event.defaultPrevented;
            }
        };
    };
