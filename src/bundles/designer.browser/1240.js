module.exports = function (module, exports, require) {
        "use strict";
        require(30 /* polyfill:Object */);
        const { FILE_FORMATS } = require(10 /* designerConfig */);
        class i {
            constructor() {
                ((this.onlyListFilesOwnedByUser = false), (this.supportedFileFormats = FILE_FORMATS));
            }
            static from() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Object.assign(new i(), e);
            }
        }
        ((i.prototype.onlyListFilesOwnedByUser = null),
            (i.prototype.supportedFileFormats = null),
            (i.prototype.supportedFileFilters = null),
            (module.exports = i));
    };
