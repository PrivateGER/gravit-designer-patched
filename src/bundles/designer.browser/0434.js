module.exports = function (module, exports, require) {
        "use strict";
        require(30 /* polyfill:Object */);
        const o = require(1072);
        module.exports = Object.assign({}, o);
    };
