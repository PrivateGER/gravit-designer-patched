module.exports = function (module, exports, require) {
            "use strict";
            var n = require(377).decode,
                r = require(105),
                Parser = require(89),
                a = require(115);
            ((exports.parse = function (e, t) {
                var i = new Parser.Parser(e, t),
                    a = i.parseULong();
                (r.argument(1 === a, "Unsupported META table version."), i.parseULong(), i.parseULong());
                for (var s = i.parseULong(), l = {}, h = 0; h < s; h++) {
                    var A = i.parseTag(),
                        c = i.parseULong(),
                        p = i.parseULong(),
                        u = n.UTF8(e, t + c, p);
                    l[A] = u;
                }
                return l;
            }),
                (exports.make = function (e) {
                    var t = Object.keys(e).length,
                        i = "",
                        n = 16 + 12 * t,
                        r = new a.Table("meta", [
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
                                name: "offset",
                                type: "ULONG",
                                value: n,
                            },
                            {
                                name: "numTags",
                                type: "ULONG",
                                value: t,
                            },
                        ]);
                    for (var o in e) {
                        var s = i.length;
                        ((i += e[o]),
                            r.fields.push({
                                name: "tag " + o,
                                type: "TAG",
                                value: o,
                            }),
                            r.fields.push({
                                name: "offset " + o,
                                type: "ULONG",
                                value: n + s,
                            }),
                            r.fields.push({
                                name: "length " + o,
                                type: "ULONG",
                                value: e[o].length,
                            }));
                    }
                    return (
                        r.fields.push({
                            name: "stringPool",
                            type: "CHARARRAY",
                            value: i,
                        }),
                        r
                    );
                }));
        };
