module.exports = function (module, exports, require) {
            require(7);
            var GTextTool = require(547),
                r = require(370),
                IsFiniteNonNegativeNumber = require(0),
                a = require(212);

            function s() {
                GTextTool.call(this, true, true);
            }
            (require(783),
                IsFiniteNonNegativeNumber.inherit(s, GTextTool, [a]),
                (s.prototype._getRelatedItemClass = function () {
                    return r;
                }),
                (s.prototype.toString = function () {
                    return "[Object GTextAnnotationTool]";
                }),
                (module.exports = s));
        };
