module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(41));
        var GObject = require(1),
            GEditor = require(53),
            GPlatform = require(15),
            designerConfig = require(10),
            Utils = require(40);
        const GCategory = require(18),
            GAction = require(31),
            StylePropertiesPanels = require(607),
            GSystemDialog = require(44);
        function GCutCopyAction(isCut) {
            ((this._isCut = isCut),
                document.addEventListener(this._isCut ? "cut" : "copy", this._documentCutOrCopyEvent.bind(this)),
                document.addEventListener(this._isCut ? "beforecut" : "beforecopy", this._documentBeforeCutOrCopyEvent.bind(this)),
                window.hasOwnProperty("ClipboardEvent") ||
                    (this._cutCopyArea = $("<textArea></textArea>")
                        .css({ position: "absolute", top: "-9999px", opacity: 0 })
                        .prop("tabindex", -1)
                        .appendTo($("body"))));
        }
        (GObject.GObject.inherit(GCutCopyAction, GAction),
            (GCutCopyAction.ID_COPY = "edit.copy"),
            (GCutCopyAction.ID_CUT = "edit.cut"),
            (GCutCopyAction.prototype._cutCopyArea = null),
            (GCutCopyAction.prototype.getId = function () {
                return this._isCut ? GCutCopyAction.ID_CUT : GCutCopyAction.ID_COPY;
            }),
            (GCutCopyAction.prototype.getTitle = function () {
                return new GObject.GLocaleKey("GCutCopyAction", "title." + (this._isCut ? "cut" : "copy"));
            }),
            (GCutCopyAction.prototype.getIcon = function () {
                return "gravit-icon-" + (this._isCut ? "cut" : "copy");
            }),
            (GCutCopyAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GCutCopyAction.prototype.getGroup = function () {
                return "ccp";
            }),
            (GCutCopyAction.prototype.getShortcut = function () {
                return this._isCut ? [GPlatform.GKey.Constant.META, "X"] : [GPlatform.GKey.Constant.META, "C"];
            }),
            (GCutCopyAction.prototype.isEnabled = function () {
                return gDesigner.getActiveDocument() && !!gDesigner.getActiveDocument().getEditor().getSelection();
            }),
            (GCutCopyAction.prototype.executeFromShortcut = function () {
                return (this._isEditableElementFocused() || (this._cutCopyArea && this._cutCopyArea.focus()), false);
            }),
            (GCutCopyAction.prototype.execute = function () {
                this._documentCutOrCopyEvent(null);
            }),
            (GCutCopyAction.prototype._documentCutOrCopyEvent = function (event) {
                if (this._isBrowserHandleCopy(event)) return;
                event && event.preventDefault();
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor();
                if (this._isMouseOverContextStyleCopy()) {
                    const activeStyle = this._getActiveStyleMouseOverContextBased();
                    (this._copyStyleToClipboard(activeStyle, event), this._notifyMouseOverContextOfSuccessfulCopy());
                } else {
                    let selection = editor && editor.getSelection();
                    this._copySelectionToClipboard(selection, event);
                }
                (this._isCut && editor && this._deleteCutSelection(), this._cutCopyArea && this._focusOnActiveArea());
            }),
            (GCutCopyAction.prototype._documentBeforeCutOrCopyEvent = function (event) {
                (document.activeElement && $(document.activeElement).is(":editable") && !gDesigner.isGravitIME(document.activeElement)) ||
                    event.preventDefault();
            }),
            (GCutCopyAction.prototype._focusOnActiveArea = function () {
                setTimeout(function () {
                    const windows = gDesigner.getWindows();
                    windows && windows.getActiveWindow() && windows.getActiveWindow().getView().focus();
                }, 1);
            }),
            (GCutCopyAction.prototype._filterOutSelectionWithSameParent = function () {
                let elements = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                elements = GObject.GNode.order(elements.slice());
                let result = [];
                const hasAncestorInResult = function (node) {
                    let found = false;
                    return (
                        result.forEach((parent) => {
                            node.findParent((ancestor) => {
                                found = ancestor === parent;
                            });
                        }),
                        found
                    );
                };
                for (let o = 0; o < elements.length; ++o) hasAncestorInResult(elements[o]) || result.push(elements[o]);
                return result;
            }),
            (GCutCopyAction.prototype._isEditableElementFocused = function () {
                return !(
                    !document.activeElement ||
                    !$(document.activeElement).is(":editable") ||
                    gDesigner.isGravitIME(document.activeElement)
                );
            }),
            (GCutCopyAction.prototype._isBrowserHandleCopy = function (event) {
                return (
                    (this._isEditableElementFocused() || (event && $(event.target).is(":textSelectable"))) &&
                    !$(document.activeElement).is("button") &&
                    (!this._cutCopyArea || document.activeElement !== this._cutCopyArea[0])
                );
            }),
            (GCutCopyAction.prototype._getActiveStyleMouseOverContextBased = function () {
                const activeDocument = gDesigner.getActiveDocument(),
                    mouseOverContext = gDesigner.getMouseOverContext(),
                    activeStyles = activeDocument.getActiveStylesList();
                let style = null;
                return (
                    mouseOverContext.context === StylePropertiesPanels.FillPropertiesPanel
                        ? (style = activeStyles.Fill)
                        : mouseOverContext.context === StylePropertiesPanels.BorderPropertiesPanel
                          ? (style = activeStyles.Border)
                          : mouseOverContext.context === StylePropertiesPanels.EffectPropertiesPanel && (style = activeStyles.Effect),
                    style
                );
            }),
            (GCutCopyAction.prototype._serializeData = function (elements) {
                let exceptions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                return GObject.GNode.serialize(elements, {
                    exceptions: exceptions,
                    copy: true,
                    copyIgnoreProperties: GEditor.GEditorOptions.propertiesExcludedFromCopying,
                });
            }),
            (GCutCopyAction.prototype._copyStyleToClipboard = function (style, event) {
                const serialized = this._serializeData([style]),
                    xml = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(serialized).html() + "</gravit>";
                event ? event.clipboardData.setData("text/xml", xml) : gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, serialized);
            }),
            (GCutCopyAction.prototype._isRestricted = function () {
                return gDesigner.getActiveDocument().isCommercialProductFile() || !gDesigner.getApplicationManager().isCopyPasteEnabled();
            }),
            (GCutCopyAction.prototype._filterSupportedCopyNodes = function () {
                let nodes = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return nodes.filter(function (node) {
                    return node instanceof GObject.GItem || node instanceof GObject.GLayer;
                });
            }),
            (GCutCopyAction.prototype._parseTextSelectionToEventClipboard = function (elements, event) {
                for (let n = 0; n < elements.length; n++)
                    if (elements[n] instanceof GObject.GText) {
                        let text,
                            element = elements[n];
                        const textCore = element.getTLCore();
                        if (textCore) {
                            const elementEditor = GEditor.GElementEditor.getEditor(element);
                            text = elementEditor && 1 === elements.length && elementEditor.isInlineEdit() ? textCore.selectedRange().plainText() : textCore.getDocumentRange().plainText();
                        } else text = element.getContent();
                        event.clipboardData.setData("text/plain", text);
                        break;
                    }
            }),
            (GCutCopyAction.prototype._buildExceptionsForSelection = function () {
                let elements = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    exceptions = [];
                for (let n = 0; n < elements.length; n++)
                    exceptions = exceptions.concat(gDesigner.getActiveDocument().getEditor().getLinkedElementsInSelection(elements[n], elements));
                return (designerConfig.HAS_ANNOTATIONS && (exceptions = exceptions.concat(gDesigner.getActiveDocument().getEditor().getAnnotationsExceptions(elements))), exceptions);
            }),
            (GCutCopyAction.prototype._extractStylesFromSelection = function (elements) {
                const styles = [];
                for (let n = 0; n < elements.length; n++) {
                    const element = elements[n];
                    element.hasProperty("sref") && element.getReferencedStyle() && styles.push(element.getReferencedStyle());
                }
                return styles;
            }),
            (GCutCopyAction.prototype._deleteCutSelection = function () {
                let title = GObject.GLocale.get(new GObject.GLocaleKey("text.cut-selection"));
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor(),
                    mouseOverContext = gDesigner.getMouseOverContext(),
                    activeStyles = activeDocument.getActiveStylesList();
                editor.beginTransaction();
                try {
                    if (mouseOverContext.context && (activeStyles.Fill || activeStyles.Border || activeStyles.Effect)) {
                        let styleList = null,
                            styleKey = null;
                        const selection = editor.getSelection();
                        (mouseOverContext.context === StylePropertiesPanels.FillPropertiesPanel
                            ? ((styleList = activeStyles.Fill), (styleKey = "fill"))
                            : mouseOverContext.context === StylePropertiesPanels.BorderPropertiesPanel
                              ? ((styleList = activeStyles.Border), (styleKey = "border"))
                              : mouseOverContext.context === StylePropertiesPanels.EffectPropertiesPanel && ((styleList = activeStyles.Effect), (styleKey = "effect")),
                            (0, Utils.iterateEqualStyleLayers)(styleKey, styleList, selection, function (layer) {
                                layer.getParent().removeChild(layer);
                            }),
                            (title = GObject.GLocale.get(this.getTitle())));
                    } else editor.deleteSelection(true);
                } finally {
                    editor.commitTransaction(title);
                }
            }),
            (GCutCopyAction.prototype._copySelectionToClipboard = function (elements) {
                let event = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const activeDocument = gDesigner.getActiveDocument();
                if (((elements = this._filterOutSelectionWithSameParent(elements)), (elements = this._filterSupportedCopyNodes(elements)) && elements.length)) {
                    const exceptions = this._buildExceptionsForSelection(elements),
                        styles = this._extractStylesFromSelection(elements);
                    (elements.push.apply(elements, styles), this._isRestricted() && (elements = activeDocument.restrictElements(elements)));
                    let serialized = this._serializeData(elements, exceptions);
                    gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, serialized);
                    const singleElement = 1 === elements.length && elements[0];
                    if (!(singleElement && singleElement.hasMixin(GObject.GNode.Properties) && singleElement.getProperty("collab"))) {
                        const xml =
                            '<gravit mimeType="' +
                            GObject.GNode.MIME_TYPE +
                            '" restricted="' +
                            (!!this._isRestricted() && activeDocument.getStorageItem().getId()) +
                            '">' +
                            $("<div/>").text(serialized).html() +
                            "</gravit>";
                        event
                            ? (event.clipboardData.setData("text/xml", xml), this._parseTextSelectionToEventClipboard(elements, event))
                            : gContainer.copyToClipboard(xml).catch(() => {
                                  this._showError();
                              });
                    }
                }
            }),
            (GCutCopyAction.prototype._isMouseOverContextStyleCopy = function () {
                const activeDocument = gDesigner.getActiveDocument(),
                    mouseOverContext = gDesigner.getMouseOverContext(),
                    activeStyles = activeDocument.getActiveStylesList();
                return mouseOverContext.context && (activeStyles.Fill || activeStyles.Border || activeStyles.Effect);
            }),
            (GCutCopyAction.prototype._notifyMouseOverContextOfSuccessfulCopy = function () {
                const mouseOverContext = gDesigner.getMouseOverContext();
                mouseOverContext.contextCallback && mouseOverContext.contextCallback(mouseOverContext.prevEvt);
            }),
            (GCutCopyAction.prototype._showError = function () {
                const cutOrCopyTitle = this._isCut
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "title.cut"))
                    : GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "title.copy"));
                GSystemDialog.alert(
                    GObject.GLocale.get(new GObject.GLocaleKey("GCutCopyAction", "text.security-issues"))
                        .replace("%cutcopy", cutOrCopyTitle)
                        .replace("%shortcut", GPlatform.GKey.shortcutToString(this.getShortcut()))
                );
            }),
            (GCutCopyAction.prototype.toString = function () {
                return "[Object GCutCopyAction]";
            }),
            (module.exports = GCutCopyAction));
    };
