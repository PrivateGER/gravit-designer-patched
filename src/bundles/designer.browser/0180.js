module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            RegExp = require(23),
            a = require(324 /* lib:core-js */),
            r = require(260),
            s = a.ArrayBuffer;
        (o({ global: true, constructor: true, forced: RegExp.ArrayBuffer !== s }, { ArrayBuffer: s }), r("ArrayBuffer"));
    };
