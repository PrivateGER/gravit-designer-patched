module.exports = function (module, exports, require) {
        "use strict";
        var o = require(622),
            i = require(35),
            a = require(116),
            r = require(43)("toStringTag"),
            s = Object,
            l =
                "Arguments" ===
                a(
                    (function () {
                        return arguments;
                    })()
                );
        module.exports = o
            ? a
            : function (e) {
                  var t, n, o;
                  return void 0 === e
                      ? "Undefined"
                      : null === e
                        ? "Null"
                        : "string" ==
                            typeof (n = (function (e, t) {
                                try {
                                    return e[t];
                                } catch (e) {}
                            })((t = s(e)), r))
                          ? n
                          : l
                            ? a(t)
                            : "Object" === (o = a(t)) && i(t.callee)
                              ? "Arguments"
                              : o;
              };
    };
