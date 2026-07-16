module.exports = function (module, exports, require) {
            "use strict";
            var n = require(105),
                Parser = require(89),
                o = require(115);
            ((exports.make = function (e) {
                for (
                    var t = new o.Table("ltag", [
                            {
                                name: "version",
                                type: "ULONG",
                                value: 1,
                            },
                            {
                                name: "flags",
                                type: "ULONG",
                                value: 0,
                            },
                            {
                                name: "numTags",
                                type: "ULONG",
                                value: e.length,
                            },
                        ]),
                        i = "",
                        n = 12 + 4 * e.length,
                        r = 0;
                    r < e.length;
                    ++r
                ) {
                    var a = i.indexOf(e[r]);
                    (a < 0 && ((a = i.length), (i += e[r])),
                        t.fields.push({
                            name: "offset " + r,
                            type: "USHORT",
                            value: n + a,
                        }),
                        t.fields.push({
                            name: "length " + r,
                            type: "USHORT",
                            value: e[r].length,
                        }));
                }
                return (
                    t.fields.push({
                        name: "stringPool",
                        type: "CHARARRAY",
                        value: i,
                    }),
                    t
                );
            }),
                (exports.parse = function (e, t) {
                    var i = new Parser.Parser(e, t),
                        o = i.parseULong();
                    (n.argument(1 === o, "Unsupported ltag table version."), i.skip("uLong", 1));
                    for (var a = i.parseULong(), s = [], l = 0; l < a; l++) {
                        for (var h = "", A = t + i.parseUShort(), c = i.parseUShort(), p = A; p < A + c; ++p)
                            h += String.fromCharCode(e.getInt8(p));
                        s.push(h);
                    }
                    return s;
                }));
        };
