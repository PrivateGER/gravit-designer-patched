module.exports = function (module, exports, require) {
        var o = require(1505);
        ((module.exports = function (e, t, n) {
            return (
                (t = o(t)) in e
                    ? Object.defineProperty(e, t, {
                          value: n,
                          enumerable: true,
                          configurable: true,
                          writable: true,
                      })
                    : (e[t] = n),
                e
            );
        }),
            (module.exports.__esModule = true),
            (module.exports.default = module.exports));
    };
