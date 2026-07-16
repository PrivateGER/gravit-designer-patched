module.exports = function (module, exports, require) {
            var n = require(1429),
                r = require(391),
                o = require(1430),
                a = require(1431),
                s = require(1435);

            function l() {
                throw new Error("This class cannot be instantiated");
            }
            ((l.createFont = function (e, t, i) {
                var l;
                if (s.isStandardFont(t.getFamily())) l = new s(i, t.getFamily());
                else {
                    var h = null;
                    if (!t._openTypeFont.isCIDFont) {
                        var A = new o(t._buffer, e.isCompress()),
                            c = e.getIndirectObject(A);
                        ((h = new r(c)), e.addIndirectObject(c));
                    }
                    var p = e.getIndirectObject(new n(t, h));
                    (e.addIndirectObject(p), (l = new a(i, new r(p), e)));
                }
                var u = e.getIndirectObject(l);
                return (e.addIndirectObject(u), u);
            }),
                (module.exports = l));
        };
