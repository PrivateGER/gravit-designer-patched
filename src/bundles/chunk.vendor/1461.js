module.exports = function (module, exports, require) {
            var n = require(68),
                r = require(438);

            function o() {}
            ((o.apply = function (e, t, i) {
                var o = e.createParallelFilter(this);
                (o.addFilter("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: r.pixelToStdDeviation(t.getProperty("r")),
                }),
                    o.addFilter("feOffset", {
                        dx: t.getProperty("x"),
                        dy: t.getProperty("y"),
                        result: "offsetBlur",
                    }));
                var a = t.getProperty("pat"),
                    s = n.rgbToCSS(a.getValue());
                (o.addFilter("feFlood", {
                    "flood-color": s,
                    "flood-opacity": t.getProperty("opc"),
                }),
                    o.addFilter("feComposite", {
                        in2: "offsetBlur",
                        operator: "in",
                        result: "dropShadow",
                    }),
                    o.addFilter("feBlend", {
                        in: "SourceGraphic",
                        in2: "dropShadow",
                        mode: "normal",
                    }));
            }),
                (module.exports = o));
        };
