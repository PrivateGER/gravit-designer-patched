module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(4), require(322));
        var GObject = require(1),
            GPlatform = require(15);
        const GestureTool = require(880);
        class TapGesture extends GestureTool {
            constructor() {
                let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super(),
                    (this._lastClickPoint = null),
                    (this._lastClickEventTime = 0),
                    (this._config = Object.assign(
                        {
                            doubleTapDetection: TapGesture.DetectionMode.Target,
                            doubleTapThreshold: 0,
                            doubleTapDelay: 100,
                        },
                        options
                    )));
            }
            canActivate() {
                return true;
            }
            start(event, touchState) {
                ((this._doubleTapTouches = null),
                    event.areThereTwoTouchPointsOnTheTarget() && (this._doubleTapTouches = Array.from(event.getOriginalEvent().targetTouches)),
                    this._doubleTapTouches ||
                        this._config.doubleTapDetection !== TapGesture.DetectionMode.Nearby ||
                        (this._doubleTapTouches = this._getTwoTouchPointsNearby(event.getOriginalEvent().touches)),
                    this._doubleTapTouches
                        ? (this._doubleTapTime = Date.now())
                        : event.iterateChangedTouches((touch) => {
                              this._dispatchEventFromTouch("mousedown", touch, GPlatform.GMouseEvent.BUTTON_LEFT, !touchState.isSwiping());
                          }));
            }
            end(event, touchState) {
                if (this._doubleTapTouches) {
                    return void (
                        this._doubleTapTouches.every((touch) => !touchState.hasActiveIdentifier(touch)) &&
                        ((this._doubleTapTouches = null),
                        Date.now() - this._doubleTapTime <= this._config.doubleTapDelay &&
                            event.iterateChangedTouches((touch) => {
                                this._dispatchEventFromTouch("mouseup", touch);
                            }))
                    );
                }
                if (
                    (event.iterateChangedTouches((touch) => {
                        this._dispatchEventFromTouch("mouseup", touch, GPlatform.GMouseEvent.BUTTON_LEFT, !touchState.isSwiping());
                    }),
                    touchState.isSwiping())
                )
                    return;
                const timestamp = Date.now();
                event.iterateChangedTouches((touch) => {
                    this._dispatchEventFromTouch("click", touch);
                });
                const changedTouch = event.getOriginalEvent().changedTouches[0];
                changedTouch &&
                    (this._doubleTapTouches || (this._isDblClick(changedTouch, timestamp) && this._dispatchEventFromTouch("dblclick", changedTouch)),
                    (this._lastClickEventTime = timestamp),
                    (this._lastClickPoint = new GObject.GPoint(changedTouch.screenX, changedTouch.screenY)));
            }
            cancel(event) {
                event.iterateChangedTouches((touch) => {
                    this._dispatchEventFromTouch("mouseup", touch);
                });
            }
            _isDblClick(touchPoint, timestamp) {
                if (this._lastClickPoint && this._lastClickEventTime) {
                    if (GObject.GMath.ptDist(touchPoint.screenX, touchPoint.screenY, this._lastClickPoint.getX(), this._lastClickPoint.getY()) <= 25) {
                        if (timestamp - this._lastClickEventTime <= 300) return true;
                    }
                }
                return false;
            }
            _getTwoTouchPointsNearby(touches) {
                const count = touches.length;
                if (count > 1)
                    for (let n = 0; n < count; n++)
                        for (let i = n + 1; i < count; i++) {
                            const firstTouch = touches[n],
                                secondTouch = touches[i];
                            if (GObject.GMath.ptDist(firstTouch.screenX, firstTouch.screenY, secondTouch.screenX, secondTouch.screenY) <= this._config.doubleTapThreshold)
                                return [firstTouch, secondTouch];
                        }
                return null;
            }
        }
        ((TapGesture.DetectionMode = { Target: 0, Nearby: 1 }), (module.exports = TapGesture));
    };
