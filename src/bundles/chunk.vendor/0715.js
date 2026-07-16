module.exports = function (module, exports, require) {
            "use strict";
            var Parser = require(89),
                r = require(115);
            ((exports.parse = function (e, t, i, r, o) {
                for (var a, s, l = new Parser.Parser(e, t), h = 0; h < r; h += 1) {
                    h < i && ((a = l.parseUShort()), (s = l.parseShort()));
                    var A = o.get(h);
                    ((A.advanceWidth = a), (A.leftSideBearing = s));
                }
            }),
                (exports.make = function (e) {
                    for (var t = new r.Table("hmtx", []), i = 0; i < e.length; i += 1) {
                        var n = e.get(i),
                            o = n.advanceWidth || 0,
                            a = n.leftSideBearing || 0;
                        (t.fields.push({
                            name: "advanceWidth_" + i,
                            type: "USHORT",
                            value: o,
                        }),
                            t.fields.push({
                                name: "leftSideBearing_" + i,
                                type: "SHORT",
                                value: a,
                            }));
                    }
                    return t;
                }));
        };
