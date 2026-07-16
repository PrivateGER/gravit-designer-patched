module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(97));
        module.exports = class {
            constructor() {
                this._swiping = false;
            }
            update(e) {
                this._touches = e.touches ? Array.from(e.touches) : [];
            }
            setSwiping(e) {
                this._swiping = e;
            }
            isSwiping() {
                return this._swiping;
            }
            hasActiveIdentifier(e) {
                return !!this._touches && this._touches.some((t) => t.identifier === e.identifier);
            }
            hasActiveIdentifiers() {
                return !!this._touches && this._touches.length > 0;
            }
        };
    };
