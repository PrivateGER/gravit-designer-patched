module.exports = function (module, exports, require) {
            var n = require(250),
                r = require(659);

            function o() {}
            ((o.getDecoder = function (e) {
                if ("string" == typeof e) {
                    var t = /^data:.{0,255};base64,/i.exec(e);
                    if (t) {
                        var i = e.substring(t.pop().length);
                        if (i.length && i.length % 4 == 0) {
                            var o = n.toByteArray(i);
                            return new r(o);
                        }
                        return null;
                    }
                } else if (ArrayBuffer.isView(e)) return new r(e);
                return null;
            }),
                (o.decodeCMYK = function (e) {
                    return (
                        "string" == typeof e && (e = o.getDecoder(e)),
                        e && e.getColorSpace() === r.ColorSpace.CMYK ? e.getData() : null
                    );
                }),
                (module.exports = o));
        };
