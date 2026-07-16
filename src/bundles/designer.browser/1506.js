module.exports = function (module, exports, require) {
        var o = require(1251).default;
        ((module.exports = function (e, t) {
            if ("object" != o(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var i = n.call(e, t || "default");
                if ("object" != o(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }),
            (module.exports.__esModule = true),
            (module.exports.default = module.exports));
    };
