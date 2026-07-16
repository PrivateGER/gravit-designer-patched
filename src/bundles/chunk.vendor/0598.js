module.exports = function (module, exports, require) {
            var n = require(5);

            function r() {
                throw new Error("No instance");
            }
            ((r.parse = function (e) {
                var t = e.replace(/{|}/g, "").trim().split(",");
                return new n(parseFloat(t[0]), parseFloat(t[1]));
            }),
                (module.exports = r));
        };
