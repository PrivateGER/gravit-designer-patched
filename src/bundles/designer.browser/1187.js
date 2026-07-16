module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        module.exports = class {
            static get DEFAULT_LAYOUT() {
                return 0;
            }
            async open() {
                throw "Not implemented";
            }
        };
    };
