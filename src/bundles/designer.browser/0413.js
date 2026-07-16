module.exports = function (module, exports, require) {
        "use strict";
        var o = require(186),
            i = require(343),
            a = require(201 /* CONSTRUCTOR */).CONSTRUCTOR;
        module.exports =
            a ||
            !i(function (e) {
                o.all(e).then(void 0, function () {});
            });
    };
