module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(41));
        var GObject = require(1),
            i = require(53),
            GPlatform = require(15),
            designerConfig = require(10),
            Utils = require(40);
        const GCategory = require(18),
            c = require(31),
            d = require(607),
            GSystemDialog = require(44);
        function p(e) {
            ((this._isCut = e),
                document.addEventListener(this._isCut ? "cut" : "copy", this._documentCutOrCopyEvent.bind(this)),
                document.addEventListener(this._isCut ? "beforecut" : "beforecopy", this._documentBeforeCutOrCopyEvent.bind(this)),
                window.hasOwnProperty("ClipboardEvent") ||
                    (this._cutCopyArea = $("<textArea></textArea>")
                        .css({ position: "absolute", top: "-9999px", opacity: 0 })
                        .prop("tabindex", -1)
                        .appendTo($("body"))));
        }
        (GObject.GObject.inherit(p, c),
            (p.ID_COPY = "edit.copy"),
            (p.ID_CUT = "edit.cut"),
            (p.prototype._cutCopyArea = null),
            (p.prototype.getId = function () {
                return this._isCut ? p.ID_CUT : p.ID_COPY;
            }),
            (p.prototype.getTitle = function () {
                return new GObject.GLocaleKey("GCutCopyAction", "title." + (this._isCut ? "cut" : "copy"));
            }),
            (p.prototype.getIcon = function () {
                return "gravit-icon-" + (this._isCut ? "cut" : "copy");
            }),
            (p.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (p.prototype.getGroup = function () {
                return "ccp";
            }),
            (p.prototype.getShortcut = function () {
                return this._isCut ? [GPlatform.GKey.Constant.META, "X"] : [GPlatform.GKey.Constant.META, "C"];
            }),
            (p.prototype.isEnabled = function () {
                return gDesigner.getActiveDocument() && !!gDesigner.getActiveDocument().getEditor().getSelection();
            }),
            (p.prototype.executeFromShortcut = function () {
                return (this._isEditableElementFocused() || (this._cutCopyArea && this._cutCopyArea.focus()), false);
            }),
            (p.prototype.execute = function () {
                this._documentCutOrCopyEvent(null);
            }),
            (p.prototype._documentCutOrCopyEvent = function (e) {
                if (this._isBrowserHandleCopy(e)) return;
                e && e.preventDefault();
                const t = gDesigner.getActiveDocument(),
                    n = t && t.getEditor();
                if (this._isMouseOverContextStyleCopy()) {
                    const t = this._getActiveStyleMouseOverContextBased();
                    (this._copyStyleToClipboard(t, e), this._notifyMouseOverContextOfSuccessfulCopy());
                } else {
                    let t = n && n.getSelection();
                    this._copySelectionToClipboard(t, e);
                }
                (this._isCut && n && this._deleteCutSelection(), this._cutCopyArea && this._focusOnActiveArea());
            }),
            (p.prototype._documentBeforeCutOrCopyEvent = function (e) {
                (document.activeElement && $(document.activeElement).is(":editable") && !gDesigner.isGravitIME(document.activeElement)) ||
                    e.preventDefault();
            }),
            (p.prototype._focusOnActiveArea = function () {
                setTimeout(function () {
                    const e = gDesigner.getWindows();
                    e && e.getActiveWindow() && e.getActiveWindow().getView().focus();
                }, 1);
            }),
            (p.prototype._filterOutSelectionWithSameParent = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                e = GObject.GNode.order(e.slice());
                let t = [];
                const n = function (e) {
                    let n = false;
                    return (
                        t.forEach((t) => {
                            e.findParent((e) => {
                                n = e === t;
                            });
                        }),
                        n
                    );
                };
                for (let o = 0; o < e.length; ++o) n(e[o]) || t.push(e[o]);
                return t;
            }),
            (p.prototype._isEditableElementFocused = function () {
                return !(
                    !document.activeElement ||
                    !$(document.activeElement).is(":editable") ||
                    gDesigner.isGravitIME(document.activeElement)
                );
            }),
            (p.prototype._isBrowserHandleCopy = function (e) {
                return (
                    (this._isEditableElementFocused() || (e && $(e.target).is(":textSelectable"))) &&
                    !$(document.activeElement).is("button") &&
                    (!this._cutCopyArea || document.activeElement !== this._cutCopyArea[0])
                );
            }),
            (p.prototype._getActiveStyleMouseOverContextBased = function () {
                const e = gDesigner.getActiveDocument(),
                    t = gDesigner.getMouseOverContext(),
                    n = e.getActiveStylesList();
                let o = null;
                return (
                    t.context === d.FillPropertiesPanel
                        ? (o = n.Fill)
                        : t.context === d.BorderPropertiesPanel
                          ? (o = n.Border)
                          : t.context === d.EffectPropertiesPanel && (o = n.Effect),
                    o
                );
            }),
            (p.prototype._serializeData = function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                return GObject.GNode.serialize(e, {
                    exceptions: t,
                    copy: true,
                    copyIgnoreProperties: i.GEditorOptions.propertiesExcludedFromCopying,
                });
            }),
            (p.prototype._copyStyleToClipboard = function (e, t) {
                const n = this._serializeData([e]),
                    i = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(n).html() + "</gravit>";
                t ? t.clipboardData.setData("text/xml", i) : gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, n);
            }),
            (p.prototype._isRestricted = function () {
                return gDesigner.getActiveDocument().isCommercialProductFile() || !gDesigner.getApplicationManager().isCopyPasteEnabled();
            }),
            (p.prototype._filterSupportedCopyNodes = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return e.filter(function (e) {
                    return e instanceof GObject.GItem || e instanceof GObject.GLayer;
                });
            }),
            (p.prototype._parseTextSelectionToEventClipboard = function (e, t) {
                for (let n = 0; n < e.length; n++)
                    if (e[n] instanceof GObject.GText) {
                        let o,
                            a = e[n];
                        const r = a.getTLCore();
                        if (r) {
                            const t = i.GElementEditor.getEditor(a);
                            o = t && 1 === e.length && t.isInlineEdit() ? r.selectedRange().plainText() : r.getDocumentRange().plainText();
                        } else o = a.getContent();
                        t.clipboardData.setData("text/plain", o);
                        break;
                    }
            }),
            (p.prototype._buildExceptionsForSelection = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    t = [];
                for (let n = 0; n < e.length; n++)
                    t = t.concat(gDesigner.getActiveDocument().getEditor().getLinkedElementsInSelection(e[n], e));
                return (designerConfig.HAS_ANNOTATIONS && (t = t.concat(gDesigner.getActiveDocument().getEditor().getAnnotationsExceptions(e))), t);
            }),
            (p.prototype._extractStylesFromSelection = function (e) {
                const t = [];
                for (let n = 0; n < e.length; n++) {
                    const o = e[n];
                    o.hasProperty("sref") && o.getReferencedStyle() && t.push(o.getReferencedStyle());
                }
                return t;
            }),
            (p.prototype._deleteCutSelection = function () {
                let e = GObject.GLocale.get(new GObject.GLocaleKey("text.cut-selection"));
                const t = gDesigner.getActiveDocument(),
                    n = t && t.getEditor(),
                    i = gDesigner.getMouseOverContext(),
                    a = t.getActiveStylesList();
                n.beginTransaction();
                try {
                    if (i.context && (a.Fill || a.Border || a.Effect)) {
                        let t = null,
                            r = null;
                        const l = n.getSelection();
                        (i.context === d.FillPropertiesPanel
                            ? ((t = a.Fill), (r = "fill"))
                            : i.context === d.BorderPropertiesPanel
                              ? ((t = a.Border), (r = "border"))
                              : i.context === d.EffectPropertiesPanel && ((t = a.Effect), (r = "effect")),
                            (0, Utils.iterateEqualStyleLayers)(r, t, l, function (e) {
                                e.getParent().removeChild(e);
                            }),
                            (e = GObject.GLocale.get(this.getTitle())));
                    } else n.deleteSelection(true);
                } finally {
                    n.commitTransaction(e);
                }
            }),
            (p.prototype._copySelectionToClipboard = function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const n = gDesigner.getActiveDocument();
                if (((e = this._filterOutSelectionWithSameParent(e)), (e = this._filterSupportedCopyNodes(e)) && e.length)) {
                    const i = this._buildExceptionsForSelection(e),
                        a = this._extractStylesFromSelection(e);
                    (e.push.apply(e, a), this._isRestricted() && (e = n.restrictElements(e)));
                    let r = this._serializeData(e, i);
                    gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, r);
                    const s = 1 === e.length && e[0];
                    if (!(s && s.hasMixin(GObject.GNode.Properties) && s.getProperty("collab"))) {
                        const i =
                            '<gravit mimeType="' +
                            GObject.GNode.MIME_TYPE +
                            '" restricted="' +
                            (!!this._isRestricted() && n.getStorageItem().getId()) +
                            '">' +
                            $("<div/>").text(r).html() +
                            "</gravit>";
                        t
                            ? (t.clipboardData.setData("text/xml", i), this._parseTextSelectionToEventClipboard(e, t))
                            : gContainer.copyToClipboard(i).catch(() => {
                                  this._showError();
                              });
                    }
                }
            }),
            (p.prototype._isMouseOverContextStyleCopy = function () {
                const e = gDesigner.getActiveDocument(),
                    t = gDesigner.getMouseOverContext(),
                    n = e.getActiveStylesList();
                return t.context && (n.Fill || n.Border || n.Effect);
            }),
            (p.prototype._notifyMouseOverContextOfSuccessfulCopy = function () {
                const e = gDesigner.getMouseOverContext();
                e.contextCallback && e.contextCallback(e.prevEvt);
            }),
            (p.prototype._showError = function () {
                const e = this._isCut
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "title.cut"))
                    : GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "title.copy"));
                GSystemDialog.alert(
                    GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "text.security-issues"))
                        .replace("%cutcopy", e)
                        .replace("%shortcut", GPlatform.GKey.shortcutToString(this.getShortcut()))
                );
            }),
            (p.prototype.toString = function () {
                return "[Object GCutCopyAction]";
            }),
            (module.exports = p));
    };
