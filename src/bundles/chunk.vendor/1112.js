module.exports = function (module, exports, require) {
            var PDFNodeStream = require(165),
                r = require(11);

            function o() {}
            ((o.prototype.concurrencyEncode = function (e, t, i) {
                return e.createPromise(function (e, n) {
                    var o = t[0],
                        a = r.uuid();
                    o.postMessage(
                        {
                            uuid: a,
                            command: "zipencoder",
                            buffer: i,
                        },
                        [i]
                    );
                    var s = function (e) {
                            (o.removeEventListener("message", l), o.removeEventListener("error", s), n(e));
                        },
                        l = function (t) {
                            var i = t.data;
                            i.uuid === a &&
                                "zipencoder" === i.command &&
                                (o.removeEventListener("message", l), o.removeEventListener("error", s), e(i.buffer));
                        };
                    (o.addEventListener("message", l), o.addEventListener("error", s));
                });
            }),
                (o.prototype.encode = function (e) {
                    return PDFNodeStream.deflate(e);
                }),
                (module.exports = o));
        };
