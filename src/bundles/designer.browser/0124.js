module.exports = function (module, exports, require) {
        "use strict";
        var o = require(223),
            i = require(65),
            a = require(239),
            r = o(o.bind);
        module.exports = function (e, t) {
            return (
                i(e),
                void 0 === t
                    ? e
                    : a
                      ? r(e, t)
                      : function () {
                            return e.apply(t, arguments);
                        }
            );
        };
    };
