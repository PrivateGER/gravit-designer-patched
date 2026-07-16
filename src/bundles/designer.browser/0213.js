module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            RegExp = require(23),
            r = require(129),
            s = RegExp.process,
            l = RegExp.Deno,
            c = (s && s.versions) || (l && l.version),
            d = c && c.v8;
        (d && (i = (o = d.split("."))[0] > 0 && o[0] < 4 ? 1 : +(o[0] + o[1])),
            !i && r && (!(o = r.match(/Edge\/(\d+)/)) || o[1] >= 74) && (o = r.match(/Chrome\/(\d+)/)) && (i = +o[1]),
            (module.exports = i));
    };
