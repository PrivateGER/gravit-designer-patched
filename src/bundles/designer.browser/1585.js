module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            GestureTool = _interopRequireDefault(require(880)),
            TouchState = _interopRequireDefault(require(1189));
        let isWithinMoveThreshold = false,
            touch0RefX = 0,
            touch0RefY = 0,
            touch1RefX = 0,
            touch1RefY = 0,
            touch0StartX = 0,
            touch0StartY = 0,
            touch0PrevX = 0,
            touch0PrevY = 0,
            touch1PrevX = 0,
            touch1PrevY = 0,
            pinchZoomScale = GObject.GPaintCanvas.getScreenDPI() * GPlatform.GSceneWidget.options.pinchToZoomFactor,
            panScale = 2 / GObject.GPaintCanvas.getScreenDPI();
        class TwoFingersTouchGesture extends GestureTool.default {
            canActivate(event) {
                return event.areThereTwoTouchPointsOnTheTarget();
            }
            start(event) {
                const originalEvent = event.getOriginalEvent(),
                    touch0 = originalEvent.targetTouches[0];
                ((touch0StartX = touch0RefX = touch0PrevX = touch0.clientX), (touch0StartY = touch0RefY = touch0PrevY = touch0.clientY), (isWithinMoveThreshold = event.areThereTwoTouchPointsOnTheTarget()));
                const view = gDesigner.getActiveView();
                if (!view) return;
                const contextMenu = gDesigner.getContextMenu();
                (contextMenu && contextMenu.close(), (this._twoFingersState = new TouchState.default()), this._twoFingersState.update(originalEvent));
                let touch1 = originalEvent.targetTouches[1];
                ((touch1RefX = touch1PrevX = touch1.clientX), (touch1RefY = touch1PrevY = touch1.clientY), view.startTouchMode(), (this._moved = false));
            }
            move(event) {
                if (!this._twoFingersState) return false;
                const originalEvent = event.getOriginalEvent();
                (this._twoFingersState.update(originalEvent), (this._moved = true), originalEvent.cancelable && (originalEvent.preventDefault(), originalEvent.stopPropagation()));
                const view = gDesigner.getActiveView();
                if (!view) return true;
                const touch0 = originalEvent.targetTouches[0],
                    touch1 = originalEvent.targetTouches[1];
                if (!touch1) return true;
                const { clientX, clientY } = touch0,
                    { clientX: touch1ClientX, clientY: touch1ClientY } = touch1;
                if (
                    touch0RefX &&
                    ((isWithinMoveThreshold =
                        GObject.GMath.isEqualEps(touch0RefX, clientX, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(touch0RefY, clientY, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(touch1RefX, touch1ClientX, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(touch1RefY, touch1ClientY, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE)),
                    !isWithinMoveThreshold)
                ) {
                    const prevDistance = GObject.GMath.ptDist(touch0PrevX, touch0PrevY, touch1PrevX, touch1PrevY),
                        currentDistance = GObject.GMath.ptDist(clientX, clientY, touch1ClientX, touch1ClientY);
                    if (GObject.GMath.isEqualEps(prevDistance, currentDistance, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE)) {
                        const deltaX = ((0 == touch0PrevX ? 0 : clientX - touch0PrevX) + (0 == touch1PrevX ? 0 : touch1ClientX - touch1PrevX)) / panScale,
                            deltaY = ((0 == touch0PrevY ? 0 : clientY - touch0PrevY) + (0 == touch1PrevY ? 0 : touch1ClientY - touch1PrevY)) / panScale;
                        view.scrollBy(-deltaX, -deltaY);
                    } else {
                        const distanceDelta = currentDistance - prevDistance;
                        let zoomLevel = gDesigner.getWindows().getActiveWindow().getView().getZoom() + distanceDelta / pinchZoomScale;
                        const midTouch = new Touch({
                            identifier: GObject.GUtil.uuid(),
                            pageX: (touch0.pageX + touch1.pageX) / 2,
                            pageY: (touch0.pageY + touch1.pageY) / 2,
                            target: touch0.target,
                        });
                        zoomLevel = zoomLevel < GPlatform.GSceneWidget.options.minZoomFactor ? GPlatform.GSceneWidget.options.minZoomFactor : zoomLevel;
                        var zoomAnchor = view.getViewTransform().mapPoint(view._convertClientPositionFromMousePosition(midTouch));
                        view.zoomAt(zoomAnchor, zoomLevel);
                    }
                }
                return ((touch0PrevX = clientX), (touch0PrevY = clientY), (touch1PrevX = touch1ClientX), (touch1PrevY = touch1ClientY), true);
            }
            end(event) {
                if (
                    (this._twoFingersState && this._twoFingersState.update(event.getOriginalEvent()),
                    !this._twoFingersState || !this._twoFingersState.hasActiveIdentifiers())
                ) {
                    this._twoFingersState = null;
                    const view = gDesigner.getActiveView();
                    view && view.endTouchMode();
                }
                touch0RefX = touch0RefY = touch1RefX = touch1RefY = touch0PrevX = touch0PrevY = touch1PrevX = touch1PrevY = 0;
                const moved = !!this._moved;
                return ((this._moved = false), moved);
            }
        }
        module.exports = TwoFingersTouchGesture;
    };
