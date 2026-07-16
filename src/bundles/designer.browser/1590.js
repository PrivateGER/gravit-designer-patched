module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16 /* _interopRequireDefault */)(require(879));
        const i = require(878);
        module.exports = class extends i {
            constructor(e) {
                (super(e), this.addGesture(new o.default()), this.setDelayedTouchEventsEnabled(false));
            }
            _handleEvent(e) {
                (e.cancelable && e.preventDefault(), super._handleEvent(e));
            }
        };
    };
