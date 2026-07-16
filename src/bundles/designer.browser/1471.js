module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { GFontManager } = require(1 /* GObject */);
        module.exports = class {
            constructor(e) {
                ((this._fontManager = e),
                    this._fontManager.addEventListener(GFontManager.FontAvailableEvent, this._fontEvent, this),
                    this._fontManager.addEventListener(GFontManager.FontUnavailableEvent, this._fontEvent, this),
                    (this._promise = new Promise((e) => {
                        this._resolver = e;
                    })));
            }
            _fontEvent() {
                this._checkPendingFonts();
            }
            _checkPendingFonts() {
                this._fontManager.hasPendingFonts() ||
                    (this._fontManager.removeEventListener(GFontManager.FontAvailableEvent, this._fontEvent, this),
                    this._fontManager.removeEventListener(GFontManager.FontUnavailableEvent, this._fontEvent, this),
                    this._resolver());
            }
            waitForAllPendingFonts() {
                return (this._checkPendingFonts(), this._promise);
            }
        };
    };
