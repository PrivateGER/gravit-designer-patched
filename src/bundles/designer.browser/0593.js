module.exports = function (module, exports, require) {
        "use strict";
        function o(e) {
            return pako.gzip(e, { level: 9 }).buffer;
        }
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.gzip = o),
            (exports.hasRootFolderInSelections = function (e, t) {
                if (!e || !(t || []).length) return false;
                t instanceof Array || (t = [t]);
                return t.some((t) => e.isRootFolder(t));
            }),
            (exports.readResponseWithProgress = async function (e, t, n) {
                const i = e.body.getReader(),
                    a = parseInt(e.headers.get("Content-Length")) || 0;
                let r = 0;
                return new Promise((e) => {
                    const s = new ReadableStream({
                        start: (l) =>
                            (function c() {
                                return i.read().then((d) => {
                                    let { done, value } = d;
                                    if (done) return (l.close(), i.releaseLock(), void e(s));
                                    if ("function" == typeof t) {
                                        r += (function (e) {
                                            if (n) return new Uint8Array(o(e)).length;
                                            return e.length;
                                        })(value);
                                        const e = Math.floor((r / a) * 100);
                                        t(e);
                                    }
                                    return (l.enqueue(value), c());
                                });
                            })(),
                    });
                }).then((e) => new Response(e));
            }),
            require(19),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(57),
            require(8 /* Symbol */),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(97));
    };
