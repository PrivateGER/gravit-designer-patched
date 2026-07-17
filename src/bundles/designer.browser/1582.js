module.exports = function (module, exports, require) {
        "use strict";
        const TouchEvent = require(1583),
            TouchState = require(1189);
        module.exports = class {
            constructor() {
                ((this._gestures = []),
                    (this._state = new TouchState()),
                    (this._delayedTouchEventsEnabled = true),
                    (this._suppressClickEnabled = false),
                    (this._swiping = false));
            }
            addGesture(gesture) {
                this._gestures.push(gesture);
            }
            setDelayedTouchEventsEnabled(enabled) {
                this._delayedTouchEventsEnabled = enabled;
            }
            setClickSuppressionEnabled(enabled) {
                this._suppressClickEnabled = enabled;
            }
            touchStart(event) {
                ((this._swiping = false), this._state.update(event), this._handleDelayedTouchStartEvent(event));
                const touchEvent = new TouchEvent(event);
                this._delayedTouchEventsEnabled && !touchEvent.areThereMultipleTouchPoints()
                    ? ((this._delayedTouchEvent = event),
                      (this._delayedTouchEventTimeout = setTimeout(this._triggerDelayedTouchEvent.bind(this), 50)))
                    : this._execute("start", event);
            }
            touchMove(event) {
                ((this._swiping = true), this._state.update(event), this._handleDelayedTouchStartEvent(event), this._execute("move", event));
            }
            touchEnd(event) {
                (this._state.update(event), this._handleDelayedTouchStartEvent(event), this._execute("end", event));
            }
            touchCancel(event) {
                (this._state.update(event), this._execute("cancel", event));
            }
            gestureStart(event) {
                (this._dropDelayedTouchEvent(), this._execute("gesture", event));
            }
            scroll(event) {
                this._swiping = true;
            }
            _execute(phase, rawEvent) {
                this._state.setSwiping(this._isSwiping());
                const touchEvent = new TouchEvent(rawEvent),
                    gestureCount = this._gestures.length;
                let handled = false;
                for (let t = 0; t < gestureCount; t++) {
                    const gesture = this._gestures[t];
                    try {
                        if (handled) {
                            gesture.deactivate(touchEvent, this._state);
                            continue;
                        }
                        if (
                            ("start" === phase && (gesture.canActivate(touchEvent, this._state) ? gesture.activate(touchEvent, this._state) : gesture.deactivate(touchEvent, this._state)),
                            !gesture.isActive())
                        )
                            continue;
                        handled = gesture[phase](touchEvent, this._state);
                    } catch (error) {
                        console.error("GGestureHelper", error);
                        try {
                            gesture.deactivate(touchEvent, this._state);
                        } catch (error) {
                            console.warn("GGestureHelper deactivation", error);
                        }
                    }
                }
            }
            _isSwiping() {
                return !!this._suppressClickEnabled && this._swiping;
            }
            _handleDelayedTouchStartEvent(event) {
                this._delayedTouchEventTimeout && new TouchEvent(event).areThereMultipleTouchPointsOnTheTarget()
                    ? this._dropDelayedTouchEvent()
                    : this._triggerDelayedTouchEvent();
            }
            _triggerDelayedTouchEvent() {
                this._delayedTouchEventTimeout &&
                    (clearTimeout(this._delayedTouchEventTimeout),
                    (this._delayedTouchEventTimeout = null),
                    this._delayedTouchEvent && (this._execute("start", this._delayedTouchEvent), (this._delayedTouchEvent = null)));
            }
            _dropDelayedTouchEvent() {
                (this._delayedTouchEventTimeout && clearTimeout(this._delayedTouchEventTimeout),
                    (this._delayedTouchEventTimeout = null),
                    (this._delayedTouch = null));
            }
            hasActiveIdentifiers() {
                return this._state.hasActiveIdentifiers();
            }
        };
    };
