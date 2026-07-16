module.exports = function (e, t, n) {
        "use strict";
        var o = n(21);
        e.exports = !o(function () {
            return Object.isExtensible(Object.preventExtensions({}));
        });
    };
