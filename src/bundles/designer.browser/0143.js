module.exports = function (module, exports, require) {
        "use strict";
        module.exports = function (e) {
            return { iterator: e, next: e.next, done: false };
        };
    };
