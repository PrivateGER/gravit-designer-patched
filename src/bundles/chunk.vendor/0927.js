module.exports = function (module, exports, require) {
            var n = require(195);

            function r(e) {
                ((this._start = null),
                    (this._codes = e),
                    (this._trailingSpaces = null),
                    (this._newLine = true),
                    (this._canBreakAfter = false),
                    (this._canBreakBefore = false));
            }
            var o =
                    ' \t})]?|&,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ’”〉》」』】〕）］｝｣!%.:·"†‡›∶〃〆〗〞﹚﹜＂〙〟｠»‐゠–〜‼⁇⁈⁉〈《「『＇～— •︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘︶︸︺︼︾﹀﹂﹗｜',
                a =
                    '([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋$"々〇〉》」｠￦ #〘〖〝｟«$"々〇〉》」｠￦ #〘〖〝｟«—…‥〳〴〵‵︴﹙﹛︵︷︹︻︽︿﹁﹃﹏·．';
            ((r.prototype._codes = null),
                (r.prototype._start = null),
                (r.prototype._trailingSpaces = null),
                (r.prototype._canBreakAfter = false),
                (r.prototype._canBreakBefore = false),
                (r.prototype._lastBreakBefore = false),
                (r.prototype._lastBreakAfter = false),
                (r.prototype._newLine = true),
                (r.prototype.split = function (e, t) {
                    var i;
                    if (null === t.char) i = true;
                    else if ((this._newLine && ((i = true), (this._newLine = false)), "string" == typeof t.char))
                        " " === t.char
                            ? this._trailingSpaces || (this._trailingSpaces = t)
                            : "\n" === t.char || t.char === n.LS
                              ? ((i = true), (this._newLine = true))
                              : o.indexOf(t.char) >= 0
                                ? (this._canBreakAfter = true)
                                : a.indexOf(t.char) >= 0
                                  ? ((i = true), (this._canBreakBefore = true))
                                  : !(function (e) {
                                          var t = e.codePointAt(0);
                                          if ((t >= 19968 && t <= 40959) || (t >= 13312 && t <= 19855) || (t >= 12352 && t <= 12543))
                                              return true;
                                          if ((t >= 11904 && t <= 12245) || (t >= 12688 && t <= 12703) || (t >= 13312 && t <= 19903))
                                              return true;
                                          if (
                                              (t >= 44032 && t <= 55215) ||
                                              (t >= 4352 && t <= 4607) ||
                                              (t >= 12592 && t <= 12687) ||
                                              (t >= 43360 && t <= 43391) ||
                                              (t >= 55216 && t <= 55295)
                                          )
                                              return true;
                                          return false;
                                      })(t.char)
                                    ? (this._trailingSpaces || this._canBreakAfter) && (i = true)
                                    : this._trailingSpaces || this._canBreakAfter
                                      ? (i = true)
                                      : this._lastBreakBefore
                                        ? (this._lastBreakBefore = false)
                                        : (i = true);
                    else {
                        var r = this._codes(t.char);
                        (r.block || r.eof) && ((i = true), (this._newLine = true));
                    }
                    if (i) {
                        if (this._start && !this._start.equals(t)) {
                            if (
                                false ===
                                e({
                                    text: this._start,
                                    spaces: this._trailingSpaces || t,
                                    end: t,
                                })
                            )
                                return false;
                            ((this._lastBreakBefore = this._canBreakBefore),
                                (this._trailingSpaces = null),
                                (this._canBreakAfter = false),
                                (this._canBreakBefore = false));
                        }
                        (null === t.char && e(null), (this._start = t));
                    }
                }),
                (module.exports = r));
        };
