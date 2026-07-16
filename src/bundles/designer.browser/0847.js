module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.cdrFormatVersionToReleaseYear = function (e) {
                return parseFloat(e) + 2e3 - 2;
            }),
            (exports.prepareCDRforSaving = exports.default = void 0),
            (exports.releaseYearToCdrFormatVersion = function (e) {
                return e && e >= 2020 ? e - 2e3 + 2 : 0;
            }),
            require(193),
            require(8 /* Symbol */));
        var GObject = require(1),
            a = o(require(217)),
            r = o(require(86));
        const s = require(1101),
            l = (exports.prepareCDRforSaving = async function (e, t, n, o, l) {
                if (!gDesigner.getCDRIntegrationEngine()) return (t(), false);
                const c = await gDesigner.getUser();
                n.userName = c ? c.getFullUserName() : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.default-export-author"));
                const d = (n) => {
                    if ((n.status !== r.default.Saving && e.removeEventListener(a.default, d), n.status === r.default.SaveFailed)) {
                        let e = "unexpected";
                        try {
                            if (n.data && n.data instanceof s && n.data.errCode == s.Type.TooBigFileSize) {
                                e = "expected.too-big-file-size";
                                let n = new Error(
                                    this.getTitle() +
                                        ": " +
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.file-too-large-cannot-be-processed"))
                                );
                                ((n.code = 507), t(n));
                            }
                        } finally {
                            gDesigner.stats("filespanel_export_cdr-failed", e);
                        }
                    } else n.status === r.default.Saved && gDesigner.stats("filespanel_export_cdr-ok");
                };
                return (
                    e.addEventListener(a.default, d),
                    gDesigner.getCDRIntegrationEngine().saveCDRDocument(
                        e,
                        n,
                        async (e) => {
                            l(e);
                        },
                        t,
                        o
                    )
                );
            });
        exports.default = { prepareCDRforSaving: l };
    };
