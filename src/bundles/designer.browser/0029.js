module.exports = function (e, t, n) {
        "use strict";
        var o = n(239),
            i = Function.prototype.call;
        e.exports = o
            ? i.bind(i)
            : function () {
                  return i.apply(i, arguments);
              };
    };
