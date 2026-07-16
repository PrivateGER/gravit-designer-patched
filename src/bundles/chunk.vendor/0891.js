module.exports = function (module, exports, require) {
            var n = require(261);

            function r() {}
            (n.inherit(r, n),
                (r.prototype.sender = null),
                (r.prototype._paramsToString = function () {
                    return "";
                }),
                (module.exports = r));
        };
