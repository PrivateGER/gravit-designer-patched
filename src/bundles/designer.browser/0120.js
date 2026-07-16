module.exports = function (module, exports, require) {
        "use strict";
        var o = require(401),
            i = require(88);
        module.exports = function (e, t, n) {
            return (n.get && o(n.get, t, { getter: true }), n.set && o(n.set, t, { setter: true }), i.f(e, t, n));
        };
    };
