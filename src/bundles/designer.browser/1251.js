module.exports = function (module, exports) {
        function n(t) {
            return (
                (module.exports = n =
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e;
                          }
                        : function (e) {
                              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                                  ? "symbol"
                                  : typeof e;
                          }),
                (module.exports.__esModule = true),
                (module.exports.default = module.exports),
                n(t)
            );
        }
        ((module.exports = n), (module.exports.__esModule = true), (module.exports.default = module.exports));
    };
