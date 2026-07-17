module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var GObject = require(1),
            Utils = require(40),
            dragAllowed = (require(173), false),
            draggedStyle = null,
            draggedElement = null;
        function StyleEditorBase() {}
        function applyStyleToSelection(style, remove) {
            var editor = gDesigner.getActiveDocument().getEditor(),
                selection = editor.getSelection();
            if (selection && selection.length > 0) {
                var transactionLabel = GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.style-attribution"));
                editor.beginTransaction();
                try {
                    for (var r = 0; r < selection.length; ++r) remove ? selection[r].removeStyle(style.getReferenceId()) : selection[r].addStyle(style.getReferenceId());
                } finally {
                    editor.commitTransaction(transactionLabel);
                }
                editor.updateSelection(false, selection);
            }
        }
        function openStyleDialog(anchorElement, isEdit, style, parentOverlay) {
            var activeDocument = gDesigner.getActiveDocument();
            isEdit ||
                ((style = new GObject.GStyle()).setProperty("name", GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.new-style"))),
                style.setProperty("defaultStyle", false));
            var previewStyle = style.clone(),
                selectedElement = null;
            (activeDocument.getEditor().getSelection() && activeDocument.getEditor().getSelection().length > 0 && (selectedElement = activeDocument.getEditor().getSelection()[0]),
                !isEdit && selectedElement && previewStyle.assignStyleFrom(selectedElement));
            var headerLabel = isEdit
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.style-editor"))
                    : GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.style-creator")),
                toolbarHeader = $("<div/>").append($("<span/>").text(headerLabel)).addClass("creator-toolbar"),
                nameInput = $("<input/>").css("align-self", "center").css("width", "100%").attr("type", "text").val(style.getProperty("name")),
                previewRow = $("<div/>")
                    .addClass("style")
                    .append(
                        $("<img/>")
                            .css("align-self", "center")
                            .css("margin-left", "10px")
                            .attr("src", gDesigner.getStylePreview(previewStyle, selectedElement instanceof GObject.GText))
                    )
                    .append(nameInput),
                checkboxesContainer = $("<div/>")
                    .addClass("checkboxes")
                    .append(
                        $("<div/>")
                            .append(
                                $("<input/>")
                                    .attr("data-property", "style")
                                    .attr("type", "checkbox")
                                    .prop("checked", !isEdit || $.inArray(GObject.GStylable.PropertySet.Style, style.getProperty("ps")) >= 0)
                            )
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.style"))))
                            .addClass("checkbox")
                    )
                    .append(
                        $("<div/>")
                            .append(
                                $("<input/>")
                                    .attr("data-property", "fill")
                                    .attr("type", "checkbox")
                                    .prop("checked", !isEdit || $.inArray(GObject.GStylable.PropertySet.FillPaintLayers, style.getProperty("ps")) >= 0)
                            )
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.fill"))))
                            .addClass("checkbox")
                    )
                    .append(
                        $("<div/>")
                            .append(
                                $("<input/>")
                                    .attr("data-property", "border")
                                    .attr("type", "checkbox")
                                    .prop("checked", !isEdit || $.inArray(GObject.GStylable.PropertySet.BorderPaintLayers, style.getProperty("ps")) >= 0)
                            )
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.border"))))
                            .addClass("checkbox")
                    )
                    .append(
                        $("<div/>")
                            .append(
                                $("<input/>")
                                    .attr("data-property", "effects")
                                    .attr("type", "checkbox")
                                    .prop("checked", !isEdit || $.inArray(GObject.GStylable.PropertySet.Effects, style.getProperty("ps")) >= 0)
                            )
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.effects"))))
                            .addClass("checkbox")
                    )
                    .append(
                        $("<div/>")
                            .append(
                                $("<input/>")
                                    .attr("data-property", "text")
                                    .attr("type", "checkbox")
                                    .prop(
                                        "checked",
                                        isEdit ? $.inArray(GObject.GStylable.PropertySet.Text, style.getProperty("ps")) >= 0 : selectedElement instanceof GObject.GText
                                    )
                            )
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.text"))))
                            .addClass("checkbox")
                    ),
                overlay = $("<div/>"),
                footerToolbar = $("<div/>")
                    .append(
                        $("<button/>")
                            .html(
                                isEdit
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.apply"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "action.create"))
                            )
                            .on("click", function () {
                                gDesigner.stats("designerstyle_click_create");
                                var propertySets = [];
                                if (
                                    (checkboxesContainer.find('input[data-property="style"]').is(":checked") && propertySets.push(GObject.GStylable.PropertySet.Style),
                                    checkboxesContainer.find('input[data-property="fill"]').is(":checked") && propertySets.push(GObject.GStylable.PropertySet.FillPaintLayers),
                                    checkboxesContainer.find('input[data-property="border"]').is(":checked") &&
                                        propertySets.push(GObject.GStylable.PropertySet.BorderPaintLayers),
                                    checkboxesContainer.find('input[data-property="effects"]').is(":checked") && propertySets.push(GObject.GStylable.PropertySet.Effects),
                                    checkboxesContainer.find('input[data-property="text"]').is(":checked") &&
                                        (propertySets.push(GObject.GStylable.PropertySet.Text), propertySets.push(GObject.GStylable.PropertySet.Paragraph)),
                                    style.setProperties(["name", "ps"], [previewRow.find("input").val(), propertySets]),
                                    !isEdit)
                                ) {
                                    if ((selectedElement && style.assignStyleFrom(selectedElement), activeDocument.getScene().getStyles().appendChild(style), renderStyleRow(style, anchorElement, false, parentOverlay), parentOverlay.parent())) {
                                        var parentPanel = parentOverlay.parent();
                                        parentPanel.offset().top + parentPanel.height() > document.body.clientHeight &&
                                            parentPanel.offset({
                                                top: parentPanel.offset().top - 34,
                                                left: parentPanel.offset().left,
                                            });
                                    }
                                    applyStyleToSelection(style);
                                }
                                (gDesigner.createNewStylePreview(style, true, selectedElement instanceof GObject.GText),
                                    overlay.gOverlay("close", anchorElement),
                                    !isEdit && parentOverlay && parentOverlay.gOverlay("close"),
                                    refreshStylesList(isEdit ? $(".g-style-creator").find(".styles") : $(".g-style-editor").find(".styles:not(.no-style)"), isEdit));
                            })
                    )
                    .addClass("creator-toolbar bottom");
            overlay.addClass("g-style-creator")
                .append(toolbarHeader)
                .append($("<div/>").addClass("styles").append(previewRow))
                .append(checkboxesContainer)
                .append(footerToolbar)
                .gOverlay({ padding: false, releaseOnClose: true })
                .gOverlay("open", anchorElement);
            var overlayTop = overlay.parent().offset().top,
                overlayLeft = overlay.parent().offset().left;
            (overlay.parent().offset({ top: overlayTop, left: overlayLeft - 100 }), nameInput.focus());
        }
        function canAcceptDrop(element) {
            if (draggedStyle) {
                var style = $(element).data("style");
                return style && style.getReferenceId() !== draggedStyle.getReferenceId();
            }
            return false;
        }
        function refreshStylesList(container, draggable) {
            if ((container.empty(), gDesigner.getActiveDocument().getScene().getStyles())) {
                var styles = gDesigner.getActiveDocument().getScene().getStyles();
                draggable || ($(".g-style-editor").find(".no-style").empty(), renderNoStyleOption($(".g-style-editor").find(".no-style")));
                for (var styleNode = styles.getFirstChild(); null !== styleNode; styleNode = styleNode.getNext()) false === styleNode.getProperty("defaultStyle") && renderStyleRow(styleNode, container, draggable);
            }
        }
        function isStyleSelected(style) {
            var selection = gDesigner.getActiveDocument().getEditor().getSelection();
            return !!(selection && selection.length > 0) && selection[0].getProperty("sref") === style.getReferenceId();
        }
        function renderStyleRow(style, container, draggable, parentOverlay) {
            var handleDragStart = function (event) {
                    if (!dragAllowed) return (event.preventDefault(), void event.stopPropagation());
                    var offset = (draggedElement = $(event.target).closest(".style")).offset(),
                        nativeEvent = event.originalEvent;
                    (nativeEvent.stopPropagation(),
                        (draggedStyle = draggedElement.data("style")),
                        false,
                        nativeEvent.pageX - offset.left,
                        nativeEvent.pageY - offset.top,
                        (nativeEvent.dataTransfer.effectAllowed = "move"),
                        nativeEvent.dataTransfer.setData("text/plain", "dummy_data"),
                        container.find(".style").each(function (e, element) {
                            $(element)
                                .on("dragenter", function (e) {
                                    canAcceptDrop(this) && ($(this).parent().find(".style").removeClass("g-drop"), $(this).addClass("g-drop"));
                                })
                                .on("dragleave", function (event) {
                                    canAcceptDrop(this) && $(event.target).parent() !== this && event.target !== this && $(this).removeClass("g-drop");
                                })
                                .on("dragover", function (event) {
                                    var nativeEvent = event.originalEvent;
                                    canAcceptDrop(this) && (nativeEvent.preventDefault(), nativeEvent.stopPropagation(), (nativeEvent.dataTransfer.dropEffect = "move"));
                                })
                                .on("drop", function () {
                                    var element = $(this);
                                    (element.removeClass("g-drop"), true);
                                    var targetStyle = element.data("style");
                                    if (draggedStyle && targetStyle && draggedStyle.getParent() === targetStyle.getParent()) {
                                        var parent = draggedStyle.getParent(),
                                            draggedIndex = parent.getIndexOfChild(draggedStyle),
                                            targetIndex = parent.getIndexOfChild(targetStyle);
                                        (parent.removeChild(draggedStyle), parent.insertChild(draggedStyle, draggedIndex < targetIndex ? targetStyle.getNext() : targetStyle), refreshStylesList(container, true));
                                    }
                                });
                        }));
                }.bind(this),
                handleDragEnd = function () {
                    false;
                }.bind(this),
                rowElement = $("<div/>").addClass("style").data("style", style).appendTo(container);
            ($("<div/>").addClass("style-selector").appendTo(rowElement),
                draggable &&
                    rowElement
                        .attr("draggable", true)
                        .on("mousedown", function (event) {
                            dragAllowed = $(event.target).hasClass("style") || $(event.target).parent().hasClass("style");
                        })
                        .on("dragstart", handleDragStart)
                        .on("dragend", handleDragEnd),
                draggable ||
                    rowElement
                        .attr("data-selected", isStyleSelected(style) ? "yes" : "no")
                        .addClass(isStyleSelected(style) ? "g-selected" : "")
                        .on("click", function () {
                            var clickedRow = $(this);
                            (gDesigner.stats("designerstyle_click_assign", style && style.getReferenceId()),
                                "no" === clickedRow.attr("data-selected") &&
                                    ($(".g-style-editor").find(".style").removeClass("g-selected"),
                                    $(".g-style-editor").find(".style").attr("data-selected", "no"),
                                    clickedRow.attr("data-selected", "yes").addClass("g-selected"),
                                    applyStyleToSelection(style)),
                                parentOverlay && parentOverlay.gOverlay("close"));
                        }));
            var selectedElement = null,
                selection = gDesigner.getActiveDocument().getEditor().getSelection();
            if (
                (selection && selection.length > 0 && (selectedElement = selection[0]),
                rowElement.append(
                    $("<img/>")
                        .css("align-self", "center")
                        .attr("src", gDesigner.getStylePreview(style, selectedElement instanceof GObject.GText))
                ),
                $("<span/>")
                    .css({
                        alignSelf: "center",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "200px",
                    })
                    .text(style.getProperty("name"))
                    .appendTo(rowElement),
                draggable)
            )
                $("<div/>")
                    .addClass("styles-buttons")
                    .css("display", "none")
                    .append(
                        $("<button/>")
                            .addClass("g-flat")
                            .css("align-self", "center")
                            .append($("<span/>").addClass("gravit-icon-trash"))
                            .on("click", function () {
                                (gDesigner.stats("designerstyle_click_disconnect", style && style.getReferenceId()),
                                    style.disconnectStyle(),
                                    gDesigner.getActiveDocument().getScene().getStyles().removeChild(style),
                                    rowElement.remove());
                            })
                    )
                    .append(
                        $("<button/>")
                            .addClass("g-flat")
                            .css("align-self", "center")
                            .append($("<span/>").addClass("gravit-icon-settings"))
                            .on("click", function () {
                                (gDesigner.stats("designerstyle_click_open", style && style.getReferenceId()), openStyleDialog(rowElement, true, style));
                            })
                    )
                    .appendTo(rowElement);
            container.hasClass("styles") || container.addClass("styles");
        }
        function renderNoStyleOption(container, parentOverlay) {
            var selection = gDesigner.getActiveDocument().getEditor().getSelection();
            if (selection && selection.length > 0) {
                var rowElement = $("<div/>").addClass("style").appendTo(container),
                    selectedElement = selection[0],
                    isNoStyleSelected = !selectedElement.getProperty("sref");
                ($("<div/>").addClass("style-selector").appendTo(rowElement),
                    rowElement
                        .attr("data-selected", isNoStyleSelected ? "yes" : "no")
                        .addClass(isNoStyleSelected ? "g-selected" : "")
                        .on("click", function () {
                            var element = $(this);
                            ("no" === element.attr("data-selected") &&
                                (element.parent().find(".style").attr("data-selected", "no").removeClass("g-selected"),
                                element.attr("data-selected", "yes").addClass("g-selected"),
                                applyStyleToSelection(selectedElement.getReferencedStyle(), true)),
                                parentOverlay && parentOverlay.gOverlay("close"));
                        }),
                    $("<span/>")
                        .css("align-self", "center")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "text.no-style")))
                        .css("width", "165px")
                        .css("margin-left", "10px")
                        .appendTo(rowElement),
                    container.hasClass("styles") || (container.addClass("styles"), container.addClass("no-style")));
            }
        }
        GObject.GObject.inheritAndMix(StyleEditorBase, GObject.GObject);
        var pluginMethods = {
            init: function () {
                return this.each(function () {
                    var element = this,
                        field = $(this),
                        openStylePanel = function () {
                            var noStyleContainer = $("<div/>"),
                                stylesContainer = $("<div/>"),
                                overlayPanel = $("<div></div>").addClass("g-style-editor").css("width", "250px");
                            if ((renderNoStyleOption(noStyleContainer, overlayPanel), gDesigner.getActiveDocument().getScene().getStyles()))
                                for (
                                    var styleNode = gDesigner.getActiveDocument().getScene().getStyles().getFirstChild();
                                    null !== styleNode;
                                    styleNode = styleNode.getNext()
                                )
                                    false === styleNode.getProperty("defaultStyle") && renderStyleRow(styleNode, stylesContainer, false, overlayPanel);
                            var toolbar = $("<div/>")
                                .addClass("style-toolbar")
                                .append(
                                    $("<div/>")
                                        .append(
                                            $("<button/>")
                                                .addClass("g-flat")
                                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "action.create-new-style")))
                                        )
                                        .on("click", function () {
                                            (gDesigner.stats("designerstyle_click_createnewstyle"), openStyleDialog(stylesContainer, false, null, overlayPanel));
                                        })
                                )
                                .append(
                                    $("<div/>")
                                        .append(
                                            $("<button/>")
                                                .addClass("g-flat")
                                                .html(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDesignerStyleEditor", "action.organize-styles")) +
                                                        "..."
                                                )
                                        )
                                        .on("click", function () {
                                            (gDesigner.stats("designerstyle_click_organize"),
                                                (function (parentOverlay) {
                                                    var organizerHeader = $("<div/>")
                                                            .append(
                                                                $("<span/>").text(
                                                                    GObject.GLocale.get(
                                                                        new GObject.GLocaleKey("GDesignerStyleEditor", "text.style-organizer")
                                                                    )
                                                                )
                                                            )
                                                            .addClass("creator-toolbar"),
                                                        stylesContainer = $("<div/>"),
                                                        styles = gDesigner.getActiveDocument().getScene().getStyles(),
                                                        hasStyles = false;
                                                    if (styles)
                                                        for (var styleNode = styles.getFirstChild(); null !== styleNode; styleNode = styleNode.getNext())
                                                            false === styleNode.getProperty("defaultStyle") && ((hasStyles = true), renderStyleRow(styleNode, stylesContainer, true));
                                                    hasStyles || renderNoStyleOption(stylesContainer);
                                                    var dialog = $("<div/>"),
                                                        footerToolbar = $("<div/>")
                                                            .append(
                                                                $("<button/>")
                                                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.finish")))
                                                                    .on("click", function () {
                                                                        gDesigner.stats("designerstyle_click_finish");
                                                                        var stylesContainer = $(".g-style-editor").find(".styles:not(.no-style)");
                                                                        if ((stylesContainer.empty(), styles))
                                                                            for (var styleNode = styles.getFirstChild(); null !== styleNode; styleNode = styleNode.getNext())
                                                                                false === styleNode.getProperty("defaultStyle") && renderStyleRow(styleNode, stylesContainer, false, parentOverlay);
                                                                        dialog.gDialog("close");
                                                                    })
                                                            )
                                                            .addClass("creator-toolbar bottom");
                                                    (dialog.append(organizerHeader).append(stylesContainer).append(footerToolbar).gDialog({
                                                        releaseOnClose: true,
                                                        className: "g-style-creator organizer",
                                                    }),
                                                        dialog.gDialog("open", false));
                                                })(overlayPanel));
                                        })
                                );
                            overlayPanel.append(noStyleContainer)
                                .append(stylesContainer)
                                .append(toolbar)
                                .on("open", function () {
                                    field.trigger("open");
                                })
                                .on("close", function () {
                                    field.trigger("close");
                                })
                                .gOverlay({ padding: false, releaseOnClose: true })
                                .gOverlay("open", element);
                        };
                    field.gPro().on(
                        "click",
                        Utils.watchDog.trap(
                            function () {
                                (gDesigner.stats("designerstyle_click_openpanel"), field.find(".g-styles-field").hasClass("g-disabled") || openStylePanel());
                            },
                            null,
                            () => {
                                gDesigner.stats("designerstyle_nonprotriespro_openpanel");
                            }
                        )
                    );
                });
            },
            value: function (e) {},
        };
        ((module.exports = StyleEditorBase),
            ($.fn.gDesignerStyleEditor = function (method) {
                return pluginMethods[method]
                    ? pluginMethods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof method && method
                      ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                      : pluginMethods.init.apply(this, arguments);
            }));
    };
