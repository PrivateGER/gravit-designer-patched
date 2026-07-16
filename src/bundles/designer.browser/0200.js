module.exports = function (module, exports, require) {
        "use strict";
        var o = require(239),
            i = Function.prototype,
            a = i.apply,
            r = i.call;
        module.exports =
            ("object" == typeof Reflect && Reflect.apply) ||
            (o
                ? r.bind(a)
                : function () {
                      return r.apply(a, arguments);
                  });
    };
