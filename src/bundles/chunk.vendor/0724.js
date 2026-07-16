module.exports = function (module, exports, require) {
            "use strict";
            (function (e) {
                ((exports.isBrowser = function () {
                    return "undefined" != typeof window;
                }),
                    (exports.isNode = function () {
                        return "undefined" == typeof window;
                    }),
                    (exports.nodeBufferToArrayBuffer = function (e) {
                        for (var t = new ArrayBuffer(e.length), i = new Uint8Array(t), n = 0; n < e.length; ++n) i[n] = e[n];
                        return t;
                    }),
                    (exports.arrayBufferToNodeBuffer = function (t) {
                        for (var i = new e(t.byteLength), n = new Uint8Array(t), r = 0; r < i.length; ++r) i[r] = n[r];
                        return i;
                    }),
                    (exports.checkArgument = function (e, t) {
                        if (!e) throw t;
                    }));
            }).call(this, require(221 /* Buffer */).Buffer);
        };
