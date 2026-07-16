module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(21),
            a = require(343),
            r = require(152 /* NATIVE_ARRAY_BUFFER_VIEWS */).NATIVE_ARRAY_BUFFER_VIEWS,
            s = RegExp.ArrayBuffer,
            l = RegExp.Int8Array;
        module.exports =
            !r ||
            !i(function () {
                l(1);
            }) ||
            !i(function () {
                new l(-1);
            }) ||
            !a(function (e) {
                (new l(), new l(null), new l(1.5), new l(e));
            }, true) ||
            i(function () {
                return 1 !== new l(new s(2), 1, void 0).length;
            });
    };
