module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(27),
            a = require(348),
            r = i([].reverse),
            s = [1, 2];
        o(
            { target: "Array", proto: true, forced: String(s) === String(s.reverse()) },
            {
                reverse: function () {
                    return (a(this) && (this.length = this.length), r(this));
                },
            }
        );
    };
