module.exports = function (module, exports, require) {
            var n = require(792 /* GlobalWorkerOptions */).GlobalWorkerOptions;
            (n && (n.workerSrc = "pdf.worker.js"),
                (module.exports = {
                    GSVGImport: require(1390),
                    GPDFImport: require(1393),
                    GSketchImport: require(1121),
                    GEPSImport: require(1403),
                    GBitmapImport: require(1405),
                }));
        };
