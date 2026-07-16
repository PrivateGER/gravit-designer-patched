module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            designerConfig = require(10),
            a = o(require(880));
        class r extends a.default {
            canActivate(e) {
                return e.isThereOneTouchPointOnTheTarget();
            }
            start(e) {
                this._startLongPressEvent(e);
            }
            move() {
                this._dropLongPressEvent();
            }
            end() {
                this._dropLongPressEvent();
            }
            cancel() {
                this._dropLongPressEvent();
            }
            gesture() {
                this._dropLongPressEvent();
            }
            deactivate(e, t) {
                (super.deactivate(e, t), this._dropLongPressEvent());
            }
            _startLongPressEvent(e) {
                const t = e.getOriginalEvent();
                if ((this._dropLongPressEvent(), e.areThereMultipleTouchPoints())) return;
                const { clientX: n, clientY: o, target: a } = t.targetTouches[0];
                this._longPressEventTimeout = setTimeout(() => {
                    const e = jQuery.Event("contextmenu", {
                        pageX: n,
                        pageY: o,
                        clientX: n,
                        clientY: o,
                    });
                    $(a).trigger(e);
                }, designerConfig.LONG_PRESS_TIME_OUT);
            }
            _dropLongPressEvent() {
                this._longPressEventTimeout && clearTimeout(this._longPressEventTimeout);
            }
        }
        module.exports = r;
    };
