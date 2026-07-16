module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(200),
            NATIVE_ARRAY_BUFFER_VIEWS = require(152),
            r = require(21),
            s = require(157),
            l = RegExp.Int8Array,
            c = NATIVE_ARRAY_BUFFER_VIEWS.aTypedArray,
            d = NATIVE_ARRAY_BUFFER_VIEWS.exportTypedArrayMethod,
            u = [].toLocaleString,
            p =
                !!l &&
                r(function () {
                    u.call(new l(1));
                });
        d(
            "toLocaleString",
            function () {
                return i(u, p ? s(c(this)) : c(this), s(arguments));
            },
            r(function () {
                return [1, 2].toLocaleString() !== new l([1, 2]).toLocaleString();
            }) ||
                !r(function () {
                    l.prototype.toLocaleString.call([1, 2]);
                })
        );
    };
