module.exports = function (module, exports, require) {
            "use strict";
            var Parser = require(89);
            exports.parse = function (e, t, i, r) {
                for (var o = new Parser.Parser(e, t), a = r ? o.parseUShort : o.parseULong, s = [], l = 0; l < i + 1; l += 1) {
                    var h = a.call(o);
                    (r && (h *= 2), s.push(h));
                }
                return s;
            };
        };
