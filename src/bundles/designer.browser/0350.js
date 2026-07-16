module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = function (e, t) {
            var n = [][e];
            return (
                !!n &&
                o(function () {
                    n.call(
                        null,
                        t ||
                            function () {
                                return 1;
                            },
                        1
                    );
                })
            );
        };
    };
