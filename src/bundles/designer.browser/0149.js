module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23);
        module.exports = function (e, t) {
            var n = RegExp.Iterator,
                i = n && n.prototype,
                a = i && i[e],
                r = false;
            if (a)
                try {
                    a.call(
                        {
                            next: function () {
                                return { done: true };
                            },
                            return: function () {
                                r = true;
                            },
                        },
                        -1
                    );
                } catch (e) {
                    e instanceof t || (r = false);
                }
            if (!r) return a;
        };
    };
