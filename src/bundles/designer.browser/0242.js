module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(46),
            a = RegExp.document,
            r = i(a) && i(a.createElement);
        module.exports = function (e) {
            return r ? a.createElement(e) : {};
        };
    };
