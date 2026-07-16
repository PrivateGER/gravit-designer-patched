module.exports = function (module, exports, require) {
            var n = require(379),
                r = n.isArabicChar,
                o = n.isWhiteSpace,
                a = n.isTashkeelArabicChar;
            ((module.exports.arabicSentenceStartCheck = function (e) {
                var t = e.current,
                    i = e.get(-1);
                return (r(t) || a(t)) && !r(i);
            }),
                (module.exports.arabicSentenceEndCheck = function (e) {
                    var t = e.get(1);
                    switch (true) {
                        case null === t:
                            return true;
                        case !r(t) && !a(t):
                            var i = o(t);
                            if (!i) return true;
                            if (i) {
                                if (
                                    !e.lookahead.some(function (e) {
                                        return r(e) || a(e);
                                    })
                                )
                                    return true;
                            }
                            break;
                        default:
                            return false;
                    }
                }));
        };
