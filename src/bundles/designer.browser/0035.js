module.exports = function (module, exports, require) {
        "use strict";
        var o = "object" == typeof document && document.all;
        module.exports =
            void 0 === o && void 0 !== o
                ? function (e) {
                      return "function" == typeof e || e === o;
                  }
                : function (e) {
                      return "function" == typeof e;
                  };
    };
