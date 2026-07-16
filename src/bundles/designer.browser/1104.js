module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21),
            i = require(46),
            a = require(116),
            r = require(1105),
            s = Object.isExtensible,
            l = o(function () {
                s(1);
            });
        module.exports =
            l || r
                ? function (e) {
                      return !!i(e) && (!r || "ArrayBuffer" !== a(e)) && (!s || s(e));
                  }
                : s;
    };
