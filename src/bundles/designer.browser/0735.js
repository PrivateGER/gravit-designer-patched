module.exports = function (module, exports, require) {
        "use strict";
        var o = require(262).start,
            i = require(461);
        module.exports = i("trimStart")
            ? function () {
                  return o(this);
              }
            : "".trimStart;
    };
