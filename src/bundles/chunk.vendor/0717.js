module.exports = function (module, exports, require) {
            "use strict";
            var Parser = require(89),
                r = require(115);
            ((exports.parse = function (e, t) {
                var i = {},
                    r = new Parser.Parser(e, t);
                return (
                    (i.version = r.parseVersion()),
                    (i.numGlyphs = r.parseUShort()),
                    1 === i.version &&
                        ((i.maxPoints = r.parseUShort()),
                        (i.maxContours = r.parseUShort()),
                        (i.maxCompositePoints = r.parseUShort()),
                        (i.maxCompositeContours = r.parseUShort()),
                        (i.maxZones = r.parseUShort()),
                        (i.maxTwilightPoints = r.parseUShort()),
                        (i.maxStorage = r.parseUShort()),
                        (i.maxFunctionDefs = r.parseUShort()),
                        (i.maxInstructionDefs = r.parseUShort()),
                        (i.maxStackElements = r.parseUShort()),
                        (i.maxSizeOfInstructions = r.parseUShort()),
                        (i.maxComponentElements = r.parseUShort()),
                        (i.maxComponentDepth = r.parseUShort())),
                    i
                );
            }),
                (exports.make = function (e) {
                    return new r.Table("maxp", [
                        {
                            name: "version",
                            type: "FIXED",
                            value: 20480,
                        },
                        {
                            name: "numGlyphs",
                            type: "USHORT",
                            value: e,
                        },
                    ]);
                }));
        };
