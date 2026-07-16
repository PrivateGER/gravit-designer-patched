module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21),
            i = require(23 /* RegExp */).RegExp;
        module.exports = o(function () {
            var e = i("(?<a>b)", "g");
            return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c");
        });
    };
