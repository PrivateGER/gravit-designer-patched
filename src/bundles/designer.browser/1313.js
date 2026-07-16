module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(41), require(32), require(38), require(33), require(26));
        var o = require(53),
            GObject = require(1),
            GPlatform = require(15),
            r = require(255),
            s = require(590),
            GAnnotationsSidebar = require(567);
        const c = ["text/xml", "text/plain"],
            d = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/gif", "application/pdf"],
            u = c.concat(d).concat(["text/uri-list"]);
        function p() {
            var e = navigator.userAgent.toLowerCase().indexOf("safari") >= 0;
            (window.hasOwnProperty("ClipboardEvent")
                ? ((navigator.userAgent.toLowerCase().indexOf("firefox") >= 0 || e) &&
                      (this._pasteArea = $("<div></div>")
                          .css({
                              overflow: "hidden",
                              height: "1px",
                              top: "-9999px",
                              position: "absolute",
                          })
                          .prop("contenteditable", true)
                          .prop("tabindex", -1)
                          .appendTo($("body"))),
                  document.addEventListener("paste", this._documentPasteEvent.bind(this)))
                : ((this._pasteArea = $("<div></div>")
                      .css({
                          overflow: "hidden",
                          height: "1px",
                          top: "-9999px",
                          position: "absolute",
                      })
                      .prop("contenteditable", true)
                      .prop("tabindex", -1)
                      .appendTo($("body"))),
                  this._pasteArea[0].addEventListener("paste", this._documentPasteEvent.bind(this))),
                this._pasteArea &&
                    this._pasteArea.on("focus", () => {
                        gDesigner.getWindows() &&
                            (this._allowFocus ||
                                (this._pasteArea.blur(),
                                gDesigner.getWindows().getActiveWindow() && gDesigner.getWindows().getActiveWindow().getView().focus()));
                    }));
        }
        (GObject.GObject.inherit(p, GObject.GObject),
            (p.URIListHandler = function () {}),
            (p.URIListHandler.prototype.handle = async function (e, t) {
                const n = (await e.text())
                    .split("\n")
                    .filter((e) => !(0 === e.indexOf("#")))
                    .map((e) => fetch(e).then((e) => (e.ok ? e.blob() : Promise.reject())));
                (await Promise.all(n)).forEach((e) => {
                    t[e.type] = e;
                });
            }),
            (p.TextHandler = function () {}),
            (p.TextHandler.prototype.handle = async function (e, t) {
                const n = await e.text();
                t[e.type] = n;
            }));
        const g = {
            "text/plain": new p.TextHandler(),
            "text/xml": new p.TextHandler(),
            "text/uri-list": new p.URIListHandler(),
        };
        ((p.prototype._pasteArea = null),
            (p.prototype._allowFocus = false),
            (p.prototype._callback = null),
            (p.prototype.pasteFromClipboard = async function () {
                if (!navigator.clipboard) return Promise.reject();
                if (navigator.permissions) {
                    const e = await navigator.permissions.query({
                        name: "clipboard-read",
                        allowWithoutGesture: true,
                    });
                    if (!e || "denied" === e.state) return Promise.reject();
                }
                const e = await navigator.clipboard.read();
                if (!e) return Promise.reject();
                for (const t of e) {
                    const e = {};
                    for (const n of t.types) {
                        if (!u.includes(n)) continue;
                        const o = await t.getType(n),
                            i = g[n];
                        i ? await i.handle(o, e) : (e[n] = o);
                    }
                    this.handlePasteData(e);
                }
            }),
            (p.prototype._documentPasteEvent = function (e) {
                if (!this._canTrigger()) return false;
                if (
                    !document.activeElement ||
                    !$(document.activeElement).is(":editable") ||
                    (this._pasteArea && document.activeElement === this._pasteArea[0]) ||
                    gDesigner.isGravitIME(document.activeElement)
                ) {
                    var t = e.clipboardData;
                    if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
                        for (var n = t.items, o = {}, r = 0; r < n.length; r++) {
                            var s = null;
                            switch ((d = n[r].type)) {
                                case "image/png":
                                case "image/jpeg":
                                case "image/gif":
                                case "application/pdf":
                                    s = n[r].getAsFile();
                                    break;
                                default:
                                    s = t.getData(d) || null;
                            }
                            s && (o[d] = s);
                        }
                        (this._handlePasteData(o),
                            GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Firefox &&
                                (e.stopPropagation(), e.preventDefault()));
                    } else if (this._pasteArea) {
                        o = {};
                        var l = 0;
                        if (t.types && t.types.length) {
                            var c = t.types;
                            for (r = 0; r < c.length; r++) {
                                var d;
                                if ("public.file-url" === (d = c[r]) && t.files && l < t.files.length) {
                                    var u = t.files[l++];
                                    u && (o[u.type] = u);
                                } else {
                                    (s = t.getData(d)) && (o[d] = s);
                                }
                            }
                        }
                        setTimeout(
                            function () {
                                var e = this._pasteArea.children();
                                if (1 === e.length && e.is("img")) {
                                    var t = GObject.GUtil.dataUrlToBlob(e[0].src);
                                    t && (o[t.type] = t);
                                }
                                (this._handlePasteData(o), this._pasteArea.empty());
                            }.bind(this),
                            1
                        );
                    }
                    this._pasteArea &&
                        ((this._allowFocus = false),
                        this._pasteArea.blur(),
                        gDesigner.getWindows().getActiveWindow() && gDesigner.getWindows().getActiveWindow().getView().focus());
                }
            }),
            (p.prototype._canTrigger = function () {
                var e = gDesigner.getActiveDocument();
                const t = e && e.getEditor();
                if (t && t.isInlineEditing()) {
                    const e = this._filterForInlineEditing(t.getSelection());
                    if (e && 1 === e.length && e[0] instanceof GObject.GText) return true;
                }
                return !(!e || gDesigner.getRightSidebars().getActiveSidebar() == GAnnotationsSidebar.ID);
            }),
            (p.prototype.handlePasteData = function (e) {
                return this._handlePasteData(e);
            }),
            (p.prototype._handlePasteData = function (e) {
                if (!this._canTrigger()) return false;
                for (var t = !this._callback, n = gDesigner.getActiveDocument(), a = n.getEditor(), l = 0; l < c.length; ++l) {
                    var u = e[c[l]];
                    if (u)
                        try {
                            var p = $.parseXML(u);
                            if (p) {
                                if ("svg" === p.documentElement.nodeName) {
                                    e["image/svg+xml"] = new Blob([u], { type: "image/svg+xml" });
                                    break;
                                }
                                if ("gravit" === p.documentElement.nodeName && p.documentElement.hasAttribute("mimeType")) {
                                    if (p.documentElement.hasAttribute("restricted")) {
                                        let e = p.documentElement.getAttribute("restricted");
                                        if (e && "false" != e && (!n.getStorageItem() || n.getStorageItem().getId() != e)) return;
                                    }
                                    e[p.documentElement.getAttribute("mimeType")] = $("<div/>").html(p.documentElement.textContent).text();
                                }
                            }
                        } catch (e) {}
                    if (e[GObject.GNode.MIME_TYPE]) {
                        var g = GObject.GNode.deserialize(e[GObject.GNode.MIME_TYPE]),
                            h = g instanceof GObject.GPage,
                            f = n.filterUnrestrictedCommercialFileElements(h ? g.getChildren() : g);
                        if ((f && f.length > 0) || h) {
                            var m = f.filter(function (e) {
                                    return e instanceof GObject.GElement;
                                }),
                                y = f.filter(function (e) {
                                    return e instanceof GObject.GStyle;
                                }),
                                v =
                                    1 === f.length &&
                                    f[0] instanceof GObject.GText &&
                                    a.hasSelection() &&
                                    a.getSelection()[0] instanceof GObject.GText &&
                                    a.isInlineEditing();
                            if (v || (0 == m.length && 1 == f.length && !h)) {
                                var _ = f[0];
                                a.beginTransaction();
                                try {
                                    if (v) {
                                        if (!o.GInlineTextEditor.HANDLECOPYPASTE) {
                                            var b = a.getSelection()[0];
                                            o.GElementEditor.getEditor(b).processPaste(_);
                                        }
                                    } else if (_ instanceof GObject.GStylable.FillPaintLayer || _ instanceof GObject.GStylable.BorderPaintLayer) {
                                        m = a.getSelection();
                                        0 != (m = this._filterForStyleExceptions(m)).length &&
                                            (m.length > 1
                                                ? m.forEach(function (e) {
                                                      var t =
                                                          _ instanceof GObject.GStylable.FillPaintLayer
                                                              ? new GObject.GStylable.FillPaintLayer()
                                                              : new GObject.GStylable.BorderPaintLayer();
                                                      (t.assignFrom(_), e.getPaintLayers().appendChild(t));
                                                  })
                                                : m[0].getPaintLayers().appendChild(_));
                                    } else if (_ instanceof GObject.GStylable.Effect) {
                                        m = a.getSelection();
                                        0 != (m = this._filterForStyleExceptions(m)).length &&
                                            (m.length > 1
                                                ? m.forEach(function (e) {
                                                      var t = new GObject.GStylable.Effect();
                                                      (t.assignFrom(_), e.getEffects().appendChild(t));
                                                  })
                                                : m[0].getEffects().appendChild(_));
                                    }
                                } finally {
                                    a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                                }
                            } else {
                                var w = n.getScene().getStyles();
                                if (m.length > 0 || h) {
                                    t && a.beginTransaction();
                                    try {
                                        for (var C = 0; C < y.length; ++C) {
                                            let e = y[C],
                                                t = e.getReferenceId(),
                                                o = null;
                                            for (var x = w.getFirstChild(); null !== x; x = x.getNext())
                                                if (x.arePropertiesEqual(e, ["ps", "defaultStyle"]) && x.equalsStyle(e)) {
                                                    o = x;
                                                    break;
                                                }
                                            o ||
                                                ((o = new GObject.GStyle()),
                                                o.setProperties(
                                                    ["name", "defaultStyle", "ps"],
                                                    [e.getProperty("name"), false, e.getProperty("ps")]
                                                ),
                                                o.assignStyleFrom(e),
                                                n.getScene().getStyles().insertChild(o));
                                            for (var S = 0; S < m.length; ++S) {
                                                let e = m[S];
                                                e.hasProperty("sref") &&
                                                    e.getProperty("sref") === t &&
                                                    e.setProperty("sref", o.getReferenceId());
                                            }
                                        }
                                        if (!this.executeCallback(m)) {
                                            var E = gDesigner.getActiveDocument().getScene();
                                            (h
                                                ? (g.clearChildren(),
                                                  g.setProperty("off", null),
                                                  E.appendChild(g),
                                                  m.length > 0 && a.insertElements(m, true, true, false, true, g),
                                                  E.setActivePage(g))
                                                : a.insertElements(m, true, true, true, true),
                                                E.isFixedSized() || this._centerToView(true));
                                        }
                                    } finally {
                                        t && a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                                    }
                                }
                            }
                        }
                        return;
                    }
                    if (u) {
                        var A,
                            T = r.getProviderInstance(s),
                            G =
                                gDesigner.getWorkspace() &&
                                gDesigner.getWorkspace().getFontManager() &&
                                gDesigner.getWorkspace().getFontManager().getDefaultFont() &&
                                gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily();
                        const e = this._filterForInlineEditing(a.getSelection());
                        if (e && e.length > 0 && e[0] instanceof GObject.GText && a.isInlineEditing()) {
                            if (!o.GInlineTextEditor.HANDLECOPYPASTE) {
                                var P = e[0];
                                return void o.GElementEditor.getEditor(P).processPaste(u);
                            }
                        } else {
                            ((P = new GObject.GText()).setText(u, true, true), t && a.beginTransaction());
                            try {
                                if (!this.executeCallback([P], true)) {
                                    if ((a.insertElements([P], false, true, true), (A = T && T.getDefaultFamilyForString(u)) && A !== G)) {
                                        var D = GObject.GOpenTypeFont.getDirectionForString(u);
                                        D !== GObject.GTLDirectionTextTransformer.LTR
                                            ? P.setProperties(["_tff", "dir", "_we"], [A, D, true])
                                            : P.setProperties(["_tff", "_we"], [A, true]);
                                    } else P.setProperty("_we", true);
                                    (o.GElementEditor.getEditor(P).invalidateTextWidth(), this._centerToView());
                                }
                            } finally {
                                return void (t && a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste"))));
                            }
                        }
                    }
                }
                for (var L = 0; L < d.length; ++L) {
                    var I = d[L];
                    if (e[I]) {
                        t && a.beginTransaction();
                        try {
                            n.placeOrImport(e[I], null, false, true, this.executeCallback.bind(this));
                        } finally {
                            t && a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste-image")));
                        }
                        return;
                    }
                }
            }),
            (p.prototype._filterForInlineEditing = function (e) {
                return e ? e.filter((e) => !(e instanceof GObject.GCollaborativeTextAnnotation)) : null;
            }),
            (p.prototype._filterForStyleExceptions = function (e) {
                for (var t = [GObject.GPage, GObject.GGroup, GObject.GSymbol], n = [], o = 0; o < e.length; o++) {
                    for (var a = e[o], r = true, s = 0; s < t.length; s++) {
                        if (a instanceof t[s]) {
                            r = false;
                            break;
                        }
                    }
                    r && n.push(a);
                }
                return n;
            }),
            (p.prototype._centerToView = function (e) {
                var t,
                    n,
                    a = gDesigner.getActiveDocument().getEditor(),
                    r = gDesigner.getActiveDocument().getScene(),
                    s = gDesigner.getWindows().getActiveWindow(),
                    l = r.getActivePage();
                if (((n = r.isFixedSized() ? l.getGeometryBBox() : r.getPaintBBox()), s)) {
                    var c = s.getView(),
                        d = c.getViewTransform(l),
                        u = GObject.GPaintCanvas.getScreenDPI(),
                        p = c.getViewBox().scaled(u, u);
                    ((t = d.mapRect(p)), r.isFixedSized() && (t = t.intersected(n)), t.isEmpty() && (t = n));
                } else t = n;
                (a.arrangeAlign(o.GEditor.ArrangeAlignType.AlignCenter, null, true, t, true, e),
                    a.arrangeAlign(o.GEditor.ArrangeAlignType.AlignMiddle, null, true, t, true, e));
            }),
            (p.prototype.getArea = function () {
                return this._pasteArea;
            }),
            (p.prototype.setAllowFocus = function (e) {
                this._allowFocus = e;
            }),
            (p.prototype.getAllowFocus = function () {
                return this._allowFocus;
            }),
            (p.prototype.assignCallback = function (e) {
                this._callback = e;
            }),
            (p.prototype.executeCallback = function (e, t) {
                return !!this._callback && (this._callback(e, t), (this._callback = null), true);
            }),
            (module.exports = p));
    };
