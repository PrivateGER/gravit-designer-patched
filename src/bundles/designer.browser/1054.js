module.exports = function (module, exports, require) {
        var o, i, a;
        module.exports =
            ((a = require(55)),
            require(98),
            (a.mode.OFB =
                ((o = a.lib.BlockCipherMode.extend()),
                (i = o.Encryptor =
                    o.extend({
                        processBlock: function (e, t) {
                            var n = this._cipher,
                                o = n.blockSize,
                                i = this._iv,
                                a = this._keystream;
                            (i && ((a = this._keystream = i.slice(0)), (this._iv = void 0)), n.encryptBlock(a, 0));
                            for (var r = 0; r < o; r++) e[t + r] ^= a[r];
                        },
                    })),
                (o.Decryptor = i),
                o)),
            a.mode.OFB);
    };
