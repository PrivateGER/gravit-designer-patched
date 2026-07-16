module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(30), require(4), require(41));
        var i = require(1154),
            a = o(require(389 /* GDocument */)),
            r = o(require(163 /* GDocument */)),
            s = o(require(1245)),
            GObject = require(1);
        module.exports = {
            debugDownloadPNG: function () {
                (0, i.downloadActiveFile)(a.default.PNG.ext);
            },
            debugDownloadPDF: function (e) {
                (0, i.downloadActiveFile)(a.default.PDF.ext, {
                    dpi: e || GObject.GLength.DPI,
                });
            },
            debugDownloadSVG: function () {
                (0, i.downloadActiveFile)(a.default.SVG.ext);
            },
            debugDownloadJPEG: function () {
                (0, i.downloadActiveFile)(a.default.JPG.ext);
            },
            debugOpenFile: function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const n = gDesigner.getDefaultStorage(),
                    o = Object.assign({ disableFileSystemAccessAPI: true, silent: true }, t);
                n.openPrompt(
                    r.default.FileTypes.filter((e) => e.load),
                    (t) => {
                        (gDesigner.openDocument(t), e && e());
                    },
                    false,
                    o
                );
            },
            debugImportFont: function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const n = Object.assign({ disableFileSystemAccessAPI: true, silent: true }, t),
                    o = new s.default();
                o.import(e, n);
            },
        };
    };
