module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        module.exports = class {
            constructor() {
                this._lastMousePoint = null;
            }
            init() {
                document.addEventListener("mousemove", this._mouseMoveEventHandler.bind(this), true);
            }
            _mouseMoveEventHandler(e) {
                let { pageX, pageY } = e;
                this._lastMousePoint = new GObject.GPoint(pageX, pageY);
            }
            getLastCursorPoint() {
                return this._lastMousePoint;
            }
        };
    };
