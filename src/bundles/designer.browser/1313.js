module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(41), require(32), require(38), require(33), require(26));
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            FontsProviderManager = require(255),
            DefaultFontsProvider = require(590),
            GAnnotationsSidebar = require(567);
        const xmlMimeTypes = ["text/xml", "text/plain"],
            imageMimeTypes = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/gif", "application/pdf"],
            allowedMimeTypes = xmlMimeTypes.concat(imageMimeTypes).concat(["text/uri-list"]);
        function GPaste() {
            var isSafari = navigator.userAgent.toLowerCase().indexOf("safari") >= 0;
            (window.hasOwnProperty("ClipboardEvent")
                ? ((navigator.userAgent.toLowerCase().indexOf("firefox") >= 0 || isSafari) &&
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
        (GObject.GObject.inherit(GPaste, GObject.GObject),
            (GPaste.URIListHandler = function () {}),
            (GPaste.URIListHandler.prototype.handle = async function (blob, target) {
                const blobPromises = (await blob.text())
                    .split("\n")
                    .filter((line) => !(0 === line.indexOf("#")))
                    .map((url) => fetch(url).then((url) => (url.ok ? url.blob() : Promise.reject())));
                (await Promise.all(blobPromises)).forEach((blob) => {
                    target[blob.type] = blob;
                });
            }),
            (GPaste.TextHandler = function () {}),
            (GPaste.TextHandler.prototype.handle = async function (blob, target) {
                const text = await blob.text();
                target[blob.type] = text;
            }));
        const mimeTypeHandlers = {
            "text/plain": new GPaste.TextHandler(),
            "text/xml": new GPaste.TextHandler(),
            "text/uri-list": new GPaste.URIListHandler(),
        };
        ((GPaste.prototype._pasteArea = null),
            (GPaste.prototype._allowFocus = false),
            (GPaste.prototype._callback = null),
            (GPaste.prototype.pasteFromClipboard = async function () {
                if (!navigator.clipboard) return Promise.reject();
                if (navigator.permissions) {
                    const permissionStatus = await navigator.permissions.query({
                        name: "clipboard-read",
                        allowWithoutGesture: true,
                    });
                    if (!permissionStatus || "denied" === permissionStatus.state) return Promise.reject();
                }
                const clipboardItems = await navigator.clipboard.read();
                if (!clipboardItems) return Promise.reject();
                for (const item of clipboardItems) {
                    const itemData = {};
                    for (const mimeType of item.types) {
                        if (!allowedMimeTypes.includes(mimeType)) continue;
                        const blob = await item.getType(mimeType),
                            handler = mimeTypeHandlers[mimeType];
                        handler ? await handler.handle(blob, itemData) : (itemData[mimeType] = blob);
                    }
                    this.handlePasteData(itemData);
                }
            }),
            (GPaste.prototype._documentPasteEvent = function (event) {
                if (!this._canTrigger()) return false;
                if (
                    !document.activeElement ||
                    !$(document.activeElement).is(":editable") ||
                    (this._pasteArea && document.activeElement === this._pasteArea[0]) ||
                    gDesigner.isGravitIME(document.activeElement)
                ) {
                    var clipboardData = event.clipboardData;
                    if (event.clipboardData && event.clipboardData.items && event.clipboardData.items.length) {
                        for (var items = clipboardData.items, pasteData = {}, r = 0; r < items.length; r++) {
                            var s = null;
                            switch ((type = items[r].type)) {
                                case "image/png":
                                case "image/jpeg":
                                case "image/gif":
                                case "application/pdf":
                                    s = items[r].getAsFile();
                                    break;
                                default:
                                    s = clipboardData.getData(type) || null;
                            }
                            s && (pasteData[type] = s);
                        }
                        (this._handlePasteData(pasteData),
                            GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Firefox &&
                                (event.stopPropagation(), event.preventDefault()));
                    } else if (this._pasteArea) {
                        pasteData = {};
                        var l = 0;
                        if (clipboardData.types && clipboardData.types.length) {
                            var types = clipboardData.types;
                            for (r = 0; r < types.length; r++) {
                                var type;
                                if ("public.file-url" === (type = types[r]) && clipboardData.files && l < clipboardData.files.length) {
                                    var u = clipboardData.files[l++];
                                    u && (pasteData[u.type] = u);
                                } else {
                                    (s = clipboardData.getData(type)) && (pasteData[type] = s);
                                }
                            }
                        }
                        setTimeout(
                            function () {
                                var children = this._pasteArea.children();
                                if (1 === children.length && children.is("img")) {
                                    var blob = GObject.GUtil.dataUrlToBlob(children[0].src);
                                    blob && (pasteData[blob.type] = blob);
                                }
                                (this._handlePasteData(pasteData), this._pasteArea.empty());
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
            (GPaste.prototype._canTrigger = function () {
                var activeDocument = gDesigner.getActiveDocument();
                const editor = activeDocument && activeDocument.getEditor();
                if (editor && editor.isInlineEditing()) {
                    const selection = this._filterForInlineEditing(editor.getSelection());
                    if (selection && 1 === selection.length && selection[0] instanceof GObject.GText) return true;
                }
                return !(!activeDocument || gDesigner.getRightSidebars().getActiveSidebar() == GAnnotationsSidebar.ID);
            }),
            (GPaste.prototype.handlePasteData = function (pasteData) {
                return this._handlePasteData(pasteData);
            }),
            (GPaste.prototype._handlePasteData = function (pasteData) {
                if (!this._canTrigger()) return false;
                for (var shouldManageTransaction = !this._callback, activeDocument = gDesigner.getActiveDocument(), editor = activeDocument.getEditor(), l = 0; l < xmlMimeTypes.length; ++l) {
                    var u = pasteData[xmlMimeTypes[l]];
                    if (u)
                        try {
                            var p = $.parseXML(u);
                            if (p) {
                                if ("svg" === p.documentElement.nodeName) {
                                    pasteData["image/svg+xml"] = new Blob([u], { type: "image/svg+xml" });
                                    break;
                                }
                                if ("gravit" === p.documentElement.nodeName && p.documentElement.hasAttribute("mimeType")) {
                                    if (p.documentElement.hasAttribute("restricted")) {
                                        let restrictedId = p.documentElement.getAttribute("restricted");
                                        if (restrictedId && "false" != restrictedId && (!activeDocument.getStorageItem() || activeDocument.getStorageItem().getId() != restrictedId)) return;
                                    }
                                    pasteData[p.documentElement.getAttribute("mimeType")] = $("<div/>").html(p.documentElement.textContent).text();
                                }
                            }
                        } catch (e) {}
                    if (pasteData[GObject.GNode.MIME_TYPE]) {
                        var g = GObject.GNode.deserialize(pasteData[GObject.GNode.MIME_TYPE]),
                            h = g instanceof GObject.GPage,
                            f = activeDocument.filterUnrestrictedCommercialFileElements(h ? g.getChildren() : g);
                        if ((f && f.length > 0) || h) {
                            var m = f.filter(function (element) {
                                    return element instanceof GObject.GElement;
                                }),
                                y = f.filter(function (style) {
                                    return style instanceof GObject.GStyle;
                                }),
                                v =
                                    1 === f.length &&
                                    f[0] instanceof GObject.GText &&
                                    editor.hasSelection() &&
                                    editor.getSelection()[0] instanceof GObject.GText &&
                                    editor.isInlineEditing();
                            if (v || (0 == m.length && 1 == f.length && !h)) {
                                var _ = f[0];
                                editor.beginTransaction();
                                try {
                                    if (v) {
                                        if (!GEditor.GInlineTextEditor.HANDLECOPYPASTE) {
                                            var b = editor.getSelection()[0];
                                            GEditor.GElementEditor.getEditor(b).processPaste(_);
                                        }
                                    } else if (_ instanceof GObject.GStylable.FillPaintLayer || _ instanceof GObject.GStylable.BorderPaintLayer) {
                                        m = editor.getSelection();
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
                                        m = editor.getSelection();
                                        0 != (m = this._filterForStyleExceptions(m)).length &&
                                            (m.length > 1
                                                ? m.forEach(function (e) {
                                                      var t = new GObject.GStylable.Effect();
                                                      (t.assignFrom(_), e.getEffects().appendChild(t));
                                                  })
                                                : m[0].getEffects().appendChild(_));
                                    }
                                } finally {
                                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                                }
                            } else {
                                var w = activeDocument.getScene().getStyles();
                                if (m.length > 0 || h) {
                                    shouldManageTransaction && editor.beginTransaction();
                                    try {
                                        for (var C = 0; C < y.length; ++C) {
                                            let pastedStyle = y[C],
                                                referenceId = pastedStyle.getReferenceId(),
                                                matchedStyle = null;
                                            for (var x = w.getFirstChild(); null !== x; x = x.getNext())
                                                if (x.arePropertiesEqual(pastedStyle, ["ps", "defaultStyle"]) && x.equalsStyle(pastedStyle)) {
                                                    matchedStyle = x;
                                                    break;
                                                }
                                            matchedStyle ||
                                                ((matchedStyle = new GObject.GStyle()),
                                                matchedStyle.setProperties(
                                                    ["name", "defaultStyle", "ps"],
                                                    [pastedStyle.getProperty("name"), false, pastedStyle.getProperty("ps")]
                                                ),
                                                matchedStyle.assignStyleFrom(pastedStyle),
                                                activeDocument.getScene().getStyles().insertChild(matchedStyle));
                                            for (var S = 0; S < m.length; ++S) {
                                                let pastedElement = m[S];
                                                pastedElement.hasProperty("sref") &&
                                                    pastedElement.getProperty("sref") === referenceId &&
                                                    pastedElement.setProperty("sref", matchedStyle.getReferenceId());
                                            }
                                        }
                                        if (!this.executeCallback(m)) {
                                            var E = gDesigner.getActiveDocument().getScene();
                                            (h
                                                ? (g.clearChildren(),
                                                  g.setProperty("off", null),
                                                  E.appendChild(g),
                                                  m.length > 0 && editor.insertElements(m, true, true, false, true, g),
                                                  E.setActivePage(g))
                                                : editor.insertElements(m, true, true, true, true),
                                                E.isFixedSized() || this._centerToView(true));
                                        }
                                    } finally {
                                        shouldManageTransaction && editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                                    }
                                }
                            }
                        }
                        return;
                    }
                    if (u) {
                        var matchedFontFamily,
                            T = FontsProviderManager.getProviderInstance(DefaultFontsProvider),
                            G =
                                gDesigner.getWorkspace() &&
                                gDesigner.getWorkspace().getFontManager() &&
                                gDesigner.getWorkspace().getFontManager().getDefaultFont() &&
                                gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily();
                        const selection = this._filterForInlineEditing(editor.getSelection());
                        if (selection && selection.length > 0 && selection[0] instanceof GObject.GText && editor.isInlineEditing()) {
                            if (!GEditor.GInlineTextEditor.HANDLECOPYPASTE) {
                                var P = selection[0];
                                return void GEditor.GElementEditor.getEditor(P).processPaste(u);
                            }
                        } else {
                            ((P = new GObject.GText()).setText(u, true, true), shouldManageTransaction && editor.beginTransaction());
                            try {
                                if (!this.executeCallback([P], true)) {
                                    if ((editor.insertElements([P], false, true, true), (matchedFontFamily = T && T.getDefaultFamilyForString(u)) && matchedFontFamily !== G)) {
                                        var D = GObject.GOpenTypeFont.getDirectionForString(u);
                                        D !== GObject.GTLDirectionTextTransformer.LTR
                                            ? P.setProperties(["_tff", "dir", "_we"], [matchedFontFamily, D, true])
                                            : P.setProperties(["_tff", "_we"], [matchedFontFamily, true]);
                                    } else P.setProperty("_we", true);
                                    (GEditor.GElementEditor.getEditor(P).invalidateTextWidth(), this._centerToView());
                                }
                            } finally {
                                return void (shouldManageTransaction && editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste"))));
                            }
                        }
                    }
                }
                for (var L = 0; L < imageMimeTypes.length; ++L) {
                    var I = imageMimeTypes[L];
                    if (pasteData[I]) {
                        shouldManageTransaction && editor.beginTransaction();
                        try {
                            activeDocument.placeOrImport(pasteData[I], null, false, true, this.executeCallback.bind(this));
                        } finally {
                            shouldManageTransaction && editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste-image")));
                        }
                        return;
                    }
                }
            }),
            (GPaste.prototype._filterForInlineEditing = function (elements) {
                return elements ? elements.filter((element) => !(element instanceof GObject.GCollaborativeTextAnnotation)) : null;
            }),
            (GPaste.prototype._filterForStyleExceptions = function (elements) {
                for (var excludedTypes = [GObject.GPage, GObject.GGroup, GObject.GSymbol], result = [], o = 0; o < elements.length; o++) {
                    for (var a = elements[o], r = true, s = 0; s < excludedTypes.length; s++) {
                        if (a instanceof excludedTypes[s]) {
                            r = false;
                            break;
                        }
                    }
                    r && result.push(a);
                }
                return result;
            }),
            (GPaste.prototype._centerToView = function (animate) {
                var rect,
                    targetBBox,
                    editor = gDesigner.getActiveDocument().getEditor(),
                    scene = gDesigner.getActiveDocument().getScene(),
                    activeWindow = gDesigner.getWindows().getActiveWindow(),
                    activePage = scene.getActivePage();
                if (((targetBBox = scene.isFixedSized() ? activePage.getGeometryBBox() : scene.getPaintBBox()), activeWindow)) {
                    var view = activeWindow.getView(),
                        viewTransform = view.getViewTransform(activePage),
                        screenDPI = GObject.GPaintCanvas.getScreenDPI(),
                        viewBox = view.getViewBox().scaled(screenDPI, screenDPI);
                    ((rect = viewTransform.mapRect(viewBox)), scene.isFixedSized() && (rect = rect.intersected(targetBBox)), rect.isEmpty() && (rect = targetBBox));
                } else rect = targetBBox;
                (editor.arrangeAlign(GEditor.GEditor.ArrangeAlignType.AlignCenter, null, true, rect, true, animate),
                    editor.arrangeAlign(GEditor.GEditor.ArrangeAlignType.AlignMiddle, null, true, rect, true, animate));
            }),
            (GPaste.prototype.getArea = function () {
                return this._pasteArea;
            }),
            (GPaste.prototype.setAllowFocus = function (allowFocus) {
                this._allowFocus = allowFocus;
            }),
            (GPaste.prototype.getAllowFocus = function () {
                return this._allowFocus;
            }),
            (GPaste.prototype.assignCallback = function (callback) {
                this._callback = callback;
            }),
            (GPaste.prototype.executeCallback = function (elements, flag) {
                return !!this._callback && (this._callback(elements, flag), (this._callback = null), true);
            }),
            (module.exports = GPaste));
    };
