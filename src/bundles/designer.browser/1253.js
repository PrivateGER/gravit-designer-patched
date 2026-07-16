module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(180), require(181), require(8 /* Symbol */), require(91), require(218), require(189), require(190), require(191), require(192), require(4), require(41), require(13), require(38));
        var GObject = require(1),
            i = require(797),
            GSaveAction = require(40),
            designerConfig = require(10),
            GDocument = require(237),
            l = require(163 /* GDocument */),
            c = require(442);
        const d = require(389 /* GDocument */);
        function u() {}
        ((window.pako = require(165 /* PDFNodeStream */)),
            require(1514),
            require(1515),
            require(1516),
            (zip.useWebWorkers = false),
            (u.generateExportables = function (e, t, n) {
                var i = e instanceof Array ? e : [e];
                e instanceof GObject.GScene && (i = e.getChildren().filter((e) => e instanceof GObject.GPage && e.isVisible()));
                var a = [],
                    r = {};
                function s(e) {
                    var t = e.getProperty("name");
                    if (!t) {
                        var n = GObject.GObject.getTypeId(e);
                        (r.hasOwnProperty(n) || (r[n] = 0), (t = e.getNodeNameTranslated()));
                        var i = ++r[n];
                        i > 1 && (t += "_" + i);
                    }
                    return t;
                }
                function l(e) {
                    if (t)
                        a.push(
                            GObject.GUtil.extend({}, t, {
                                element: e,
                                name: 1 === i.length && t.name ? t.name : s(e),
                            })
                        );
                    else if (e.hasMixin(GObject.GNode.Properties)) {
                        var r = e.getProperty(c.EXPORT_PROPERTY_NAME, true);
                        if (r && r instanceof Array && r.length)
                            for (var d = s(e), u = 0; u < r.length; ++u) {
                                var p = r[u];
                                p.fm &&
                                    a.push(
                                        GObject.GUtil.extend(
                                            {},
                                            {
                                                size: p.sz,
                                                suffix: p.sf,
                                                format: p.fm,
                                                element: e,
                                                name: d,
                                            }
                                        )
                                    );
                            }
                    }
                    if (n && e.hasMixin(GObject.GNode.Container))
                        for (var g = e.getFirstChild(); null !== g; g = g.getNext()) g instanceof GObject.GElement && l(g);
                }
                for (var d = 0; d < i.length; ++d) {
                    l(i[d]);
                }
                return a;
            }),
            (u._validateCommercialDocument = function () {
                const e = gDesigner.getActiveDocument();
                return !e || !e.isCommercialProductFile() || (e.openPaywall(), false);
            }),
            (u.exportExportable = function (e, t, n, s) {
                if (this._validateCommercialDocument()) {
                    var l = e.element,
                        c = e.format;
                    if ("png" === c || "jpg" === c) {
                        var u = null,
                            p = null;
                        switch (c) {
                            case "png":
                                u = GObject.GBitmap.ImageType.PNG;
                                break;
                            case "jpg":
                                ((u = GObject.GBitmap.ImageType.JPEG), (p = (e.jpegQuality || 100) / 100));
                        }
                        var g = GObject.GLength.DPI,
                            h = i.GBitmapExport.export(e.element, e.size, e.backgroundColor, e.configuration, g, e.backgroundOpacity, true);
                        h && h.toImageBlob(u, t, p);
                    } else if ("svg" === c)
                        i.GSVGExport.export(
                            l,
                            {
                                convertTextToPath: e.convertTextToPath,
                                decimalPlacesPrecision: GSaveAction.watchDog.check(e.decimalPlacesPrecision, 3),
                                preserveEditingCapabilities: GSaveAction.watchDog.check(e.preserveEditingCapabilities, false),
                                backgroundColor: e.backgroundColor,
                                backgroundOpacity: e.backgroundOpacity,
                                sceneBackground: !e.configuration || e.configuration.sceneBackground || !!e.backgroundColor,
                                layerNamesAsId: GSaveAction.watchDog.check(e.layerNamesAsId, false),
                            },
                            function (e, n) {
                                !e && n && t(new Blob([n], { type: "image/svg+xml" }));
                            }
                        );
                    else {
                        if (c !== d.PDF.ext) throw new Error("Unknown format.");
                        gDesigner.getUser().then(function (c) {
                            var u;
                            u =
                                c && c.getFullUserName()
                                    ? c.getFullUserName()
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.default-export-author"));
                            var p = {
                                    dpi: GSaveAction.watchDog.check(GObject.GUtil.parseNumber(e.size), GObject.GUtil.parseNumber("72dpi")),
                                    colorSpace: e.colorSpace,
                                    jpegQuality: e.jpegQuality || designerConfig.JPEG_EXPORT_QUALITY_DEFAULT,
                                    configuration: e.configuration,
                                    backgroundColor: e.backgroundColor,
                                    backgroundOpacity: e.backgroundOpacity,
                                    convertTextToPath: e.convertTextToPath,
                                    progress: n,
                                    user: u,
                                    title: gDesigner.getWindows().getActiveWindow().getTitle(),
                                    downsampleImages: e.downsampleImages,
                                },
                                g = i.GPDFExport.export(
                                    l,
                                    p,
                                    function (e, n) {
                                        (!e && n && t(new Blob([n], { type: d.PDF.mime })),
                                            s && (g.isAbort() ? s.close && s.close() : e && s.error && s.error(e)));
                                    },
                                    null,
                                    s
                                );
                            s && (s.abort = () => g && g.abort());
                        });
                    }
                }
            }),
            (u.generateExportName = function (e, t, n) {
                var i = GObject.GUtil.sanitizeFilename(t || e.name) + (e.suffix || "");
                if (n) {
                    var a = n.filter(function (t) {
                        return t.name === i && t.format === e.format;
                    });
                    (n.push({ name: i, format: e.format }), a.length && (i += "(" + (a.length + 1) + ")"));
                }
                return (i += "." + e.format);
            }),
            (u.exportToDirectory = async function (e, t, n, i) {
                if (this._validateCommercialDocument())
                    for (var a = {}, r = 0, s = [], l = 0; l < e.length; ++l) {
                        var c = null,
                            d = t;
                        if ((c = e[l].name)) {
                            if (c.indexOf("/") >= 0) {
                                var p = c.split("/"),
                                    g = [];
                                for (let e = 0; e < p.length; ++e) {
                                    var h = GObject.GUtil.sanitizeFilename(p[e].trim());
                                    h && g.push(h);
                                }
                                if (g.length > 1) {
                                    c = g.pop();
                                    var f = "";
                                    for (let e = 0; e < g.length; ++e) {
                                        var m = g[e];
                                        f && (f += "/");
                                        var y = a[(f += m.toLowerCase())];
                                        if (y) d = y;
                                        else
                                            try {
                                                ((d = await d.addDirectory(m)), (a[f] = d));
                                            } catch (e) {}
                                    }
                                } else g.length && (c = g[0]);
                            } else c = GObject.GUtil.sanitizeFilename(c.trim());
                            c &&
                                d &&
                                u.exportExportable(
                                    e[l],
                                    (function (t, o) {
                                        return function (i) {
                                            var a = new FileReader();
                                            if (
                                                ((a.onload = () => {
                                                    t.addFile(o)
                                                        .then((t) => {
                                                            t.write(new Uint8Array(a.result), () => {
                                                                ++r === e.length && n && n();
                                                            });
                                                        })
                                                        .catch(() => {
                                                            ++r === e.length && n && n();
                                                        });
                                                }),
                                                i instanceof Blob || i instanceof File)
                                            )
                                                try {
                                                    a.readAsArrayBuffer(i);
                                                } catch (t) {
                                                    ++r === e.length && n && n();
                                                }
                                            else ++r === e.length && n && n();
                                        };
                                    })(d, u.generateExportName(e[l], c, s)),
                                    i
                                );
                        }
                    }
            }),
            (u.export = function (e, t, n, i, a, r, c, p, g, h) {
                if (this._validateCommercialDocument()) {
                    var f = (e, t, n) => {
                            var o = new FileReader();
                            ((o.onload = () => {
                                t.write(new Uint8Array(o.result), () => (n ? n() : void 0), g);
                            }),
                                o.readAsArrayBuffer(e));
                        },
                        m = (e, n, o, i, r, l) => {
                            t instanceof GDocument.Item
                                ? f(e, t, o)
                                : t instanceof GDocument &&
                                  (!r && t.canPromptSave()
                                      ? t.savePrompt(
                                            n,
                                            [i],
                                            (t) => {
                                                f(e, t, o);
                                            },
                                            a,
                                            l
                                        )
                                      : t.canDownload() &&
                                        t.download(
                                            n,
                                            (t) => {
                                                f(e, t, o);
                                            },
                                            l
                                        ));
                        },
                        y = e[0],
                        v = e.length > 1,
                        _ = l.FileTypes.find((e) => e.ext === y.format);
                    if (
                        (v &&
                            (y.format !== d.PDF.ext ||
                                r ||
                                ((v = false), ((y = GObject.GUtil.extend({}, y)).name = n), (y.element = e.map((e) => e.element)))),
                        v)
                    )
                        if (t instanceof GDocument && t.canChooseDirectory())
                            t.chooseDirectory(
                                (t) => {
                                    u.exportToDirectory(e, t, i, c);
                                },
                                a,
                                () => {
                                    var t = new u.ZipDirectory();
                                    u.exportToDirectory(
                                        e,
                                        t,
                                        () => {
                                            t.exportBlob((e) => {
                                                m(e, n + ".zip", i, _, true, h);
                                            });
                                        },
                                        c
                                    );
                                }
                            );
                        else {
                            var b = new u.ZipDirectory();
                            u.exportToDirectory(
                                e,
                                b,
                                () => {
                                    b.exportBlob((e) => {
                                        m(e, n + ".zip", i, { ext: "zip", mime: "application/zip" }, false, h);
                                    });
                                },
                                c
                            );
                        }
                    else
                        u.exportExportable(
                            y,
                            function (e) {
                                const n = t instanceof GDocument && t.canDownload() && _ && _.ext === d.PDF.ext;
                                m(e, u.generateExportName(y), i, _, n, h);
                            },
                            c,
                            p
                        );
                }
            }),
            (u.ZipDirectory = function (e, t) {
                (GDocument.Directory.call(this, e), (this._zipRoot = t ? null : new zip.fs.FS()), (this._zipDirectory = t || this._zipRoot.root));
            }),
            GObject.GObject.inherit(u.ZipDirectory, GDocument.Directory),
            (u.ZipDirectory.prototype.addDirectory = async function (e) {
                return new u.ZipDirectory(this._storage, this._zipDirectory.addDirectory(e));
            }),
            (u.ZipDirectory.prototype.addFile = async function (e) {
                return {
                    _zipDirectory: this._zipDirectory,
                    _name: e,
                    write: function (e, t) {
                        if ((this._zipDirectory.addBlob(this._name, new Blob([e])), t)) return t();
                    },
                };
            }),
            (u.ZipDirectory.prototype.exportBlob = function (e) {
                this._zipDirectory.exportBlob(e);
            }),
            (module.exports = u));
    };
