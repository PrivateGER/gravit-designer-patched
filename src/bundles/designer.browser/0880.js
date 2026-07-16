module.exports = function (module, exports, require) {
        "use strict";
        var GPlatform = require(15);
        module.exports = class {
            canActivate() {
                return false;
            }
            activate(e, t) {
                this._active = true;
            }
            deactivate(e, t) {
                this._active = false;
            }
            isActive() {
                return this._active;
            }
            start(e, t) {}
            move(e, t) {}
            end(e, t) {}
            cancel(e, t) {}
            gesture(e, t) {}
            _dispatchEventFromTouch(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : GPlatform.GMouseEvent.BUTTON_LEFT,
                    i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                const a = document.createEvent("MouseEvent");
                (a.initMouseEvent(e, true, i, window, 1, t.screenX, t.screenY, t.clientX, t.clientY, false, false, false, false, n, null),
                    t.target.dispatchEvent(a));
            }
        };
    };
