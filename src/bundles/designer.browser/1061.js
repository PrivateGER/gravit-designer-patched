module.exports = function (module, exports, require) {
        var o, i, a, r;
        module.exports =
            ((r = require(55)),
            require(98),
            (i = (o = r).lib.CipherParams),
            (a = o.enc.Hex),
            (o.format.Hex = {
                stringify: function (e) {
                    return e.ciphertext.toString(a);
                },
                parse: function (e) {
                    var t = a.parse(e);
                    return i.create({ ciphertext: t });
                },
            }),
            r.format.Hex);
    };
