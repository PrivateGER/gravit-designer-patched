module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30 /* polyfill:Object */), require(3), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GPlatform = require(15),
            a = require(797),
            GSaveAction = require(40),
            GCategory = require(18),
            l = require(31),
            GLoginPanel = require(446),
            d = require(219),
            u = require(1610),
            p = require(85);
        const GSystemDialog = require(44);
        var h = null,
            f = false,
            m = false;
        function y() {}
        (GObject.GObject.inherit(y, l),
            (y.ID = "file.print"),
            (y.TITLE = new GObject.GLocaleKey("GPrintAction", "title")),
            (y.prototype.getId = function () {
                return y.ID;
            }),
            (y.prototype.getTitle = function () {
                return y.TITLE;
            }),
            (y.prototype.getIcon = function () {
                return "gravit-icon-print";
            }),
            (y.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (y.prototype.getGroup = function () {
                return "print";
            }),
            (y.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isExportEnabled()) return false;
                const e = gDesigner.getActiveDocument();
                return e && (!e.isNew() || e.isModified());
            }),
            (y.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.COMMAND, "P"];
            }),
            (y.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e.getScene(),
                    n = new u.Item("PDF"),
                    i = {
                        suppressMessages: true,
                        dpi: gDesigner.isEnabledProFeatures() ? 300 : 150,
                        preserveEditingCapabilities: false,
                        jpegQuality: 100,
                        export: true,
                    },
                    s = () => {
                        console.log("NO DATA :(");
                    };
                const l = () => {
                    -1 !== navigator.userAgent.indexOf("Firefox") ||
                    (gContainer.getRuntime() === p.Runtime.Electron && a.GSVGExport.hasSupportedEffects(t))
                        ? GSystemDialog.confirm(
                              GObject.GLocale.get(new GObject.GLocaleKey("GPrintAction", "printing-warning")),
                              (e) => {
                                  e && y();
                              },
                              void 0,
                              void 0,
                              void 0,
                              true,
                              true
                          )
                        : y();
                };
                var y = () => {
                        Object.assign(i, { convertTextToPath: true });
                        let n = [];
                        t.iteratePages(function (e) {
                            n.push(e);
                        });
                        let o = [],
                            l = (t, c) => {
                                if (t || !c) return s();
                                if ((o.push(c), n.shift(), n.length)) return void a.GSVGExport.export(n[0], i, l);
                                let d = "";
                                for (var u = 0; u < o.length; u++) {
                                    let e = "data:image/svg+xml;base64," + (0, GSaveAction.stringToBase64String)(o[u]);
                                    d = d.concat("<img style='height:100%;width:auto;max-width:100%;display:block;' src='" + e + "'/>");
                                }
                                var p = h.contentDocument;
                                ((p.head.innerHTML = "<style type='text/css' media='print'>@page { margin: 0mm; }</style>"),
                                    (p.body.style.margin = "0"),
                                    (p.body.style.height = "100%"),
                                    (p.body.innerHTML = d),
                                    (p.title = e.getTitle()),
                                    $(h.contentWindow.document).ready(function () {
                                        h.contentWindow.focus();
                                        try {
                                            h.contentWindow.print();
                                        } catch (e) {
                                            ((m = true), v());
                                        }
                                    }));
                            };
                        n.length && a.GSVGExport.export(n[0], i, l);
                    },
                    v = () => new d(GObject.GLocale.get(new GObject.GLocaleKey("GPrintAction", "printing-disabled"))).open(),
                    _ = () => {
                        if (h.src) {
                            h.focus();
                            try {
                                h.contentWindow.print();
                            } catch (e) {
                                ((f = true), (h.onload = l), (h.src = "about:blank"));
                            }
                        }
                    },
                    b = () => {
                        n.read((e) => {
                            let t = new window.Blob([e], { type: "application/pdf" }),
                                n = window.URL.createObjectURL(t);
                            h.setAttribute("src", n);
                        });
                    };
                (h ||
                    (((h = document.createElement("iframe")).style.visibility = "hidden"),
                    (h.style.position = "fixed"),
                    (h.style.right = "0"),
                    (h.style.bottom = "0"),
                    (h.style.zIndex = "-1"),
                    document.body.appendChild(h),
                    gContainer.getRuntime() === p.Runtime.Electron && (f = true)),
                    new GLoginPanel(
                        () => {
                            !(function () {
                                if (m) v();
                                else if (f) l();
                                else {
                                    var o = 0,
                                        r = [300, 150, 72, 36, null];
                                    gDesigner.isEnabledProFeatures() || r.shift();
                                    for (var c = false; !a.GPDFExport.isSupported(t, true, r[o++] + "dpi"); )
                                        if (null === r[o]) {
                                            c = true;
                                            break;
                                        }
                                    c ? ((h.onload = null), y()) : ((i.dpi = r[o - 1]), (h.onload = _), e.store(n, b, s, i));
                                }
                            })();
                        },
                        () => {
                            gDesigner.stats("action-cancelled_anonymous", this.getId());
                        }
                    ));
            }),
            (y.prototype.toString = function () {
                return "[Object GPrintAction]";
            }),
            (module.exports = y));
    };
