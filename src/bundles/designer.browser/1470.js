module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(26));
        const o = require(255);
        module.exports = class {
            constructor() {
                this._missingFonts = [];
            }
            start() {
                o.getInstance().addEventListener(o.MissingFontEvent, this._missingFontEvent, this);
            }
            stop() {
                o.getInstance().removeEventListener(o.MissingFontEvent, this._missingFontEvent, this);
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
