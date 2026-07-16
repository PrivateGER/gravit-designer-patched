module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(37),
            a = require(121),
            ReadableStream = require(143),
            s = [].push;
        o(
            { target: "Iterator", proto: true, real: true },
            {
                toArray: function () {
                    var e = [];
                    return (a(ReadableStream(i(this)), s, { that: e, IS_RECORD: true }), e);
                },
            }
        );
    };
