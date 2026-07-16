module.exports = function (e, t, n) {
        "use strict";
        var o = n(129).match(/firefox\/(\d+)/i);
        e.exports = !!o && +o[1];
    };
