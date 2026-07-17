module.exports = function (module, exports, require) {
        var o;
        module.exports =
            ((o = require(55 /* lib:crypto-js */)),
            require(98),
            (o.pad.Iso10126 = {
                pad: function (e, t) {
                    var n = 4 * t,
                        i = n - (e.sigBytes % n);
                    e.concat(o.lib.WordArray.random(i - 1)).concat(o.lib.WordArray.create([i << 24], 1));
                },
                unpad: function (e) {
                    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
                    e.sigBytes -= t;
                },
            }),
            o.pad.Iso10126);
    };
