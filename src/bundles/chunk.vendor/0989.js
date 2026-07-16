module.exports = function (module, exports, require) {
            var n = require(379).isArabicChar;
            ((module.exports.arabicWordStartCheck = function (e) {
                var t = e.current,
                    i = e.get(-1);
                return (null === i && n(t)) || (!n(i) && n(t));
            }),
                (module.exports.arabicWordEndCheck = function (e) {
                    var t = e.get(1);
                    return null === t || !n(t);
                }));
        };
