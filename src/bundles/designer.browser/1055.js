module.exports = function (module, exports, require) {
        var o, i;
        module.exports =
            ((i = require(55 /* lib:crypto-js */)),
            require(98),
            (i.mode.ECB =
                (((o = i.lib.BlockCipherMode.extend()).Encryptor = o.extend({
                    processBlock: function (e, t) {
                        this._cipher.encryptBlock(e, t);
                    },
                })),
                (o.Decryptor = o.extend({
                    processBlock: function (e, t) {
                        this._cipher.decryptBlock(e, t);
                    },
                })),
                o)),
            i.mode.ECB);
    };
