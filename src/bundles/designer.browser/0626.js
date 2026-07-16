module.exports = function (module, exports, require) {
        "use strict";
        module.exports = function (e, t) {
            try {
                1 === arguments.length ? console.error(e) : console.error(e, t);
            } catch (e) {}
        };
    };
