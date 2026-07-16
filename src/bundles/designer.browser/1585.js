module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            s = _interopRequireDefault(require(880)),
            l = _interopRequireDefault(require(1189));
        let c = false,
            d = 0,
            u = 0,
            p = 0,
            g = 0,
            h = 0,
            f = 0,
            m = 0,
            y = 0,
            v = 0,
            _ = 0,
            b = GObject.GPaintCanvas.getScreenDPI() * GPlatform.GSceneWidget.options.pinchToZoomFactor,
            w = 2 / GObject.GPaintCanvas.getScreenDPI();
        class C extends s.default {
            canActivate(e) {
                return e.areThereTwoTouchPointsOnTheTarget();
            }
            start(e) {
                const t = e.getOriginalEvent(),
                    n = t.targetTouches[0];
                ((h = d = m = n.clientX), (f = u = y = n.clientY), (c = e.areThereTwoTouchPointsOnTheTarget()));
                const o = gDesigner.getActiveView();
                if (!o) return;
                const i = gDesigner.getContextMenu();
                (i && i.close(), (this._twoFingersState = new l.default()), this._twoFingersState.update(t));
                let a = t.targetTouches[1];
                ((p = v = a.clientX), (g = _ = a.clientY), o.startTouchMode(), (this._moved = false));
            }
            move(e) {
                if (!this._twoFingersState) return false;
                const t = e.getOriginalEvent();
                (this._twoFingersState.update(t), (this._moved = true), t.cancelable && (t.preventDefault(), t.stopPropagation()));
                const n = gDesigner.getActiveView();
                if (!n) return true;
                const o = t.targetTouches[0],
                    s = t.targetTouches[1];
                if (!s) return true;
                const { clientX, clientY } = o,
                    { clientX: f, clientY: C } = s;
                if (
                    d &&
                    ((c =
                        GObject.GMath.isEqualEps(d, clientX, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(u, clientY, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(p, f, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE) &&
                        GObject.GMath.isEqualEps(g, C, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE)),
                    !c)
                ) {
                    const e = GObject.GMath.ptDist(m, y, v, _),
                        t = GObject.GMath.ptDist(clientX, clientY, f, C);
                    if (GObject.GMath.isEqualEps(e, t, designerConfig.MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE)) {
                        const e = ((0 == m ? 0 : clientX - m) + (0 == v ? 0 : f - v)) / w,
                            t = ((0 == y ? 0 : clientY - y) + (0 == _ ? 0 : C - _)) / w;
                        n.scrollBy(-e, -t);
                    } else {
                        const r = t - e;
                        let l = gDesigner.getWindows().getActiveWindow().getView().getZoom() + r / b;
                        const c = new Touch({
                            identifier: GObject.GUtil.uuid(),
                            pageX: (o.pageX + s.pageX) / 2,
                            pageY: (o.pageY + s.pageY) / 2,
                            target: o.target,
                        });
                        l = l < GPlatform.GSceneWidget.options.minZoomFactor ? GPlatform.GSceneWidget.options.minZoomFactor : l;
                        var x = n.getViewTransform().mapPoint(n._convertClientPositionFromMousePosition(c));
                        n.zoomAt(x, l);
                    }
                }
                return ((m = clientX), (y = clientY), (v = f), (_ = C), true);
            }
            end(e) {
                if (
                    (this._twoFingersState && this._twoFingersState.update(e.getOriginalEvent()),
                    !this._twoFingersState || !this._twoFingersState.hasActiveIdentifiers())
                ) {
                    this._twoFingersState = null;
                    const e = gDesigner.getActiveView();
                    e && e.endTouchMode();
                }
                d = u = p = g = m = y = v = _ = 0;
                const t = !!this._moved;
                return ((this._moved = false), t);
            }
        }
        module.exports = C;
    };
