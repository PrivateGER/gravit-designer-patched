module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                String = require(9),
                o = require(47),
                a = require(1122);

            function s() {}
            (IsFiniteNonNegativeNumber.inherit(s, IsFiniteNonNegativeNumber),
                (s.import = function (e, t, i) {
                    if (e instanceof ArrayBuffer || e instanceof Uint8Array) {
                        var n = e instanceof ArrayBuffer ? new Uint8Array(e) : e;
                        return s.import(
                            new Blob([n], {
                                type: "application/zip",
                            }),
                            t,
                            i
                        );
                    }
                    if (!e || (!e) instanceof Blob) return i("Invalid sketch file.");
                    var l = function (e) {
                            ("File format is not recognized." === e && (e = String.get(new o("GSketchImport", "text.unsupported-version"))),
                                "Sketch file v50+ is not supproted yet." === e &&
                                    (e = {
                                        v50error: true,
                                    }),
                                i(e));
                        }.bind(this),
                        h = new a(e);
                    h.load(t)
                        .then(function () {
                            h.parse().then(i).catch(l);
                        })
                        .catch(l);
                }),
                (module.exports = s));
        };
