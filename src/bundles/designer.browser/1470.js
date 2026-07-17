module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(26));
        const FontsProviderManager = require(255);
        module.exports = class {
            constructor() {
                this._missingFonts = [];
            }
            start() {
                FontsProviderManager.getInstance().addEventListener(FontsProviderManager.MissingFontEvent, this._missingFontEvent, this);
            }
            stop() {
                FontsProviderManager.getInstance().removeEventListener(FontsProviderManager.MissingFontEvent, this._missingFontEvent, this);
            }
            getMissingFonts() {
                return [...new Set(this._missingFonts)];
            }
            _missingFontEvent(e) {
                var t = e.evt;
                this._missingFonts.push(t.family);
            }
        };
    };
