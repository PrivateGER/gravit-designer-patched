module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(61),
            a = Function.prototype,
            r = o && Object.getOwnPropertyDescriptor,
            s = i(a, "name"),
            l = s && "something" === function () {}.name,
            c = s && (!o || (o && r(a, "name").configurable));
        module.exports = { EXISTS: s, PROPER: l, CONFIGURABLE: c };
    };
