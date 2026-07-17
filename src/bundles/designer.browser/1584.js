module.exports = function (module, exports, require) {
        "use strict";
        var o = require(53);
        const GTouchEventHandler = require(878),
            a = require(1585),
            r = require(879),
            s = require(1586),
            l = require(1329);
        module.exports = class extends GTouchEventHandler {
            constructor(e) {
                (super(e), this.addGesture(new a()), this.addGesture(new r()), this.addGesture(new l()), this.addGesture(new s()));
            }
            _handleEvent(e) {
                (e.cancelable && e.preventDefault(), super._handleEvent(e));
            }
            _touchStart(e) {
                (this._isSelecting() && this._gestureHelper.hasActiveIdentifiers()) || super._touchStart(e);
            }
            _isSelecting() {
                const e = gDesigner.getToolManager().getActiveTool();
                return !!(e && e instanceof o.GSelectTool) && e.hasSelectedArea();
            }
        };
    };
