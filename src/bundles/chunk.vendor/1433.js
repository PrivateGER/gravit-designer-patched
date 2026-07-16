module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(1233),
                o = require(1234),
                a = require(1434),
                s = require(1144);

            function l(e) {
                ((this._glyphMap = {}), (this._openTypeFont = e));
            }
            (IsFiniteNonNegativeNumber.inherit(l, r),
                (l.prototype._glyphMap = null),
                (l.prototype._openTypeFont = null),
                (l.prototype.getGlyphs = function () {
                    return Object.keys(this._glyphMap).map(
                        function (e) {
                            return this._glyphMap[e];
                        }.bind(this)
                    );
                }),
                (l.prototype.encode = function (e, t) {
                    for (
                        var i = [], n = null, r = this._openTypeFont.stringToGlyphs(e, 0, 0, 24, t || {}), l = r.length - 1, h = 0;
                        h < l;
                        ++h
                    ) {
                        var A = r[h].glyph.index,
                            c = a.from(this._openTypeFont._openTypeFont, A);
                        c &&
                            (this._glyphMap[c.cid] || (this._glyphMap[c.cid] = c),
                            n || (n = []),
                            n.push(c.cid),
                            r[h].kerning && (i.push(s.newFromBytes(o.encodeToUTF16BE(n))), i.push(-1 * r[h].kerning), (n = null)));
                    }
                    return (n && i.push(s.newFromBytes(o.encodeToUTF16BE(n))), i);
                }),
                (l.prototype.toString = function () {
                    return "[GPDFIdentityEncoding]";
                }),
                (module.exports = l));
        };
