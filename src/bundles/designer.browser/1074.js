module.exports = function (module, exports, require) {
        "use strict";
        const o = new Proxy({}, { get: (e, t) => (void 0 !== e[t] ? e[t] : t) });
        module.exports = o;
    };
