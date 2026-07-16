module.exports = function (module, exports, require) {
        "use strict";
        var o = require(213),
            i = require(21),
            a = require(23 /* RegExp */).String;
        module.exports =
            !!Object.getOwnPropertySymbols &&
            !i(function () {
                var e = Symbol("symbol detection");
                return !a(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && o && o < 41);
            });
    };
