module.exports = function (module, exports, require) {
            "use strict";
            ((exports.fail = function (e) {
                throw new Error(e);
            }),
                (exports.argument = function (e, i) {
                    e || exports.fail(i);
                }),
                (exports.assert = exports.argument));
        };
