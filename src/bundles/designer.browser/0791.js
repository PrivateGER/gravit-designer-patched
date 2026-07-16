module.exports = function (module, exports, require) {
        (function (t) {
            var o;
            ("function" != typeof t.Promise
                ? ((o = require(1114)),
                  Object.defineProperty(o, "polyfilled", {
                      value: true,
                      writable: false,
                      enumerable: false,
                  }))
                : (o = t.Promise),
                (module.exports = o));
        }).call(this, require(109));
    };
