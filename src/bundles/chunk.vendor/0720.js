module.exports = function (module, exports, require) {
            "use strict";
            var n = require(376),
                Parser = require(89),
                o = require(115);
            ((exports.parse = function (e, t) {
                var i,
                    o = {},
                    a = new Parser.Parser(e, t);
                switch (
                    ((o.version = a.parseVersion()),
                    (o.italicAngle = a.parseFixed()),
                    (o.underlinePosition = a.parseShort()),
                    (o.underlineThickness = a.parseShort()),
                    (o.isFixedPitch = a.parseULong()),
                    (o.minMemType42 = a.parseULong()),
                    (o.maxMemType42 = a.parseULong()),
                    (o.minMemType1 = a.parseULong()),
                    (o.maxMemType1 = a.parseULong()),
                    o.version)
                ) {
                    case 1:
                        o.names = n.standardNames.slice();
                        break;
                    case 2:
                        for (
                            o.numberOfGlyphs = a.parseUShort(), o.glyphNameIndex = new Array(o.numberOfGlyphs), i = 0;
                            i < o.numberOfGlyphs;
                            i++
                        )
                            o.glyphNameIndex[i] = a.parseUShort();
                        for (o.names = [], i = 0; i < o.numberOfGlyphs; i++)
                            if (o.glyphNameIndex[i] >= n.standardNames.length) {
                                var s = a.parseChar();
                                o.names.push(a.parseString(s));
                            }
                        break;
                    case 2.5:
                        for (o.numberOfGlyphs = a.parseUShort(), o.offset = new Array(o.numberOfGlyphs), i = 0; i < o.numberOfGlyphs; i++)
                            o.offset[i] = a.parseChar();
                }
                return o;
            }),
                (exports.make = function () {
                    return new o.Table("post", [
                        {
                            name: "version",
                            type: "FIXED",
                            value: 196608,
                        },
                        {
                            name: "italicAngle",
                            type: "FIXED",
                            value: 0,
                        },
                        {
                            name: "underlinePosition",
                            type: "FWORD",
                            value: 0,
                        },
                        {
                            name: "underlineThickness",
                            type: "FWORD",
                            value: 0,
                        },
                        {
                            name: "isFixedPitch",
                            type: "ULONG",
                            value: 0,
                        },
                        {
                            name: "minMemType42",
                            type: "ULONG",
                            value: 0,
                        },
                        {
                            name: "maxMemType42",
                            type: "ULONG",
                            value: 0,
                        },
                        {
                            name: "minMemType1",
                            type: "ULONG",
                            value: 0,
                        },
                        {
                            name: "maxMemType1",
                            type: "ULONG",
                            value: 0,
                        },
                    ]);
                }));
        };
