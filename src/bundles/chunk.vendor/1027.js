module.exports = function (module, exports, require) {
            var n = require(535),
                r = require(282),
                o = require(731),
                a = require(728),
                s = require(2),
                String = require(9);

            function h() {
                n.call(this);
            }
            (s.inherit("adjustMultiEffect", h, n),
                (h.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GAdjustMultiEffect", "name", this.getNodeName());
                }),
                (h.prototype.toString = function () {
                    return "[Object GAdjustMultiEffect]";
                }),
                n.register(h, [o, a, r]),
                (module.exports = h));
        };
