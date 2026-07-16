module.exports = function (module, exports, require) {
        "use strict";
        var o = Math.ceil,
            i = Math.floor;
        module.exports =
            Math.trunc ||
            function (e) {
                var t = +e;
                return (t > 0 ? i : o)(t);
            };
    };
