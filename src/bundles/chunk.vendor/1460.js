module.exports = function (module, exports, require) {
            var n = require(438);

            function r() {}
            ((r.apply = function (e, t, i) {
                e.createSeriesFilter(this).addFilter("feGaussianBlur", {
                    stdDeviation: n.pixelToStdDeviation(t.getProperty("r")),
                });
            }),
                (module.exports = r));
        };
