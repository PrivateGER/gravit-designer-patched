module.exports = function (module, exports, require) {
        var o = require(1251).default,
            i = require(1506);
        ((module.exports = function (e) {
            var t = i(e, "string");
            return "symbol" == o(t) ? t : t + "";
        }),
            (module.exports.__esModule = true),
            (module.exports.default = module.exports));
    };
