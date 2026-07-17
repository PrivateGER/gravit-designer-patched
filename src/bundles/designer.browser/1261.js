module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(57), require(4), require(13));
        var GPlatform = require(15),
            editorModule = require(53),
            GObject = require(1),
            designerConfig = require(10),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            touchToolModule = _interopRequireDefault(require(340)),
            sidebarEventModule = _interopRequireDefault(require(807)),
            appConstants = _interopRequireDefault(require(198 /* SidebarsIds */)),
            dragIconHelper = require(1161),
            dragModeModule = _interopRequireDefault(require(565)),
            GProperties = require(123),
            contextMenuContexts = require(450);
        const mouseOverContexts = require(607),
            GSystemDialog = require(44);
        function GFillPaintLayerProperties() {}
        (GObject.GObject.inherit(GFillPaintLayerProperties, GProperties),
            (GFillPaintLayerProperties.prototype._panel = null),
            (GFillPaintLayerProperties.prototype._advancedFillPanel = null),
            (GFillPaintLayerProperties.prototype._toolbar = null),
            (GFillPaintLayerProperties.prototype._elements = null),
            (GFillPaintLayerProperties.prototype._document = null),
            (GFillPaintLayerProperties.prototype._styleEditorChange = false),
            (GFillPaintLayerProperties.prototype._styleEdOn = false),
            (GFillPaintLayerProperties.prototype._ownChange = false),
            (GFillPaintLayerProperties.prototype._chooserElem = null),
            (GFillPaintLayerProperties.prototype.init = function (panelElement, toolbarElement) {
                ((this._panel = panelElement.addClass("fill-properties-panel")),
                    (this._toolbar = toolbarElement),
                    this.setTouchTools([
                        new touchToolModule.default({
                            id: "fill",
                            icon: "gravit-icon-touch-fill",
                            panel: this._panel,
                            toolbar: this._toolbar,
                            panelWidth: "368px",
                        }),
                    ]));
                var self = this;
                this._advancedFillPanel = $("<div></div>").gOverlay({
                    releaseOnClose: false,
                });
                var createEvenOddInput = function (propertyKey) {
                    if ("evenodd" === propertyKey)
                        return $("<select></select>")
                            .attr("data-property", "evenodd")
                            .append(
                                $("<option></option>")
                                    .attr("value", "0")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "evenodd.non-zero")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "1")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "evenodd.even-odd")))
                            )
                            .on("change", function () {
                                (gDesigner.stats("fill_toggle_fill-rule", "1" === $(this).val() ? "enable" : "disable"),
                                    self._assignProperty(
                                        "evenodd",
                                        "1" === $(this).val(),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-fill-rule"))
                                    ));
                            });
                    throw new Error("Unknown input property: " + propertyKey);
                }.bind(this);
                (this._toolbar.addClass("list-toolbar fill-toolbar"),
                    $("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "title")))
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.advanced-settings")))
                        .addClass("fill completely-fill g-active")
                        .append($("<span></span>").addClass("gravit-icon-touch-completely-fill"))
                        .on(
                            "click",
                            function (event) {
                                ($(".completely-fill").addClass("g-active"),
                                    $(".winding-fill").removeClass("g-active"),
                                    self._assignProperty(
                                        "evenodd",
                                        false,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-fill-rule"))
                                    ));
                            }.bind(this)
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.advanced-settings")))
                        .addClass("fill winding-fill")
                        .append($("<span></span>").addClass("gravit-icon-touch-winding-fill"))
                        .on(
                            "click",
                            function (event) {
                                ($(".winding-fill").addClass("g-active"),
                                    $(".completely-fill").removeClass("g-active"),
                                    self._assignProperty(
                                        "evenodd",
                                        true,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-fill-rule"))
                                    ));
                            }.bind(this)
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.advanced-settings")))
                        .attr("data-action", "settings")
                        .addClass("fill-settings")
                        .append($("<span></span>").addClass("gravit-icon-settings"))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("fill_open_advancedfillpanel"),
                                    this._advancedFillPanel.gOverlay("open", $(event.target).closest("button")));
                            }.bind(this)
                        )
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "text.fill-rule-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GFillPaintLayerProperties", "text.fill-rule-tooltip-description")
                                ),
                                learnMore:
                                    "/docs/colors-gradients-textures/fills/#advanced-fill-settings",
                            })
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-action", "remove")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.remove-selected")))
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .append($("<span></span>").addClass("gravit-icon-touch-trash"))
                        .on("click", function (event) {
                            (gDesigner.stats("fill_remove_fill"), event.stopPropagation());
                            var selectedLayer = self._getSelectedPaintLayer();
                            selectedLayer &&
                                editorModule.GEditor.tryRunTransaction(
                                    self._elements[0],
                                    function () {
                                        var layers = [];
                                        (self._iterateEqualPaintLayer(selectedLayer, function (layer) {
                                            layers.push(layer);
                                        }),
                                            GObject.GUtil.each(layers, function (index, layer) {
                                                layer.getParent().removeChild(layer);
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.remove"))
                                );
                            const inspectorSidebar = gDesigner.getRightSidebars().getSidebar(appConstants.default.SidebarsIds.GInspectorSidebar);
                            inspectorSidebar.trigger(new sidebarEventModule.default(sidebarEventModule.default.Type.ChildRemoved, inspectorSidebar));
                        })
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "text.remove-layer-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GFillPaintLayerProperties", "text.remove-layer-tooltip-description")
                                ),
                                learnMore: "/docs/colors-gradients-textures/fills/",
                            })
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-action", "add")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.add")))
                        .append($("<span></span>").addClass("gravit-icon-plus"))
                        .append($("<span></span>").addClass("gravit-icon-touch-plus"))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("fill_add_fill"),
                                    editorModule.GEditor.tryRunTransaction(
                                        self._elements[0],
                                        function () {
                                            const scene = self._document && self._document.getScene(),
                                                colorMode = scene && scene.getProperty("cm"),
                                                color = GObject.GColorHelper.convertColor(GObject.GRGBColor.BLACK, colorMode || GObject.GColor.ColorModes.RGB);
                                            for (var i = 0; i < self._elements.length; ++i) {
                                                var a = new GObject.GStylable.FillPaintLayer();
                                                (a.setProperty("_pt", color), self._elements[i].getPaintLayers().appendChild(a));
                                            }
                                        },
                                        GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.add"))
                                    ),
                                    $(this._toolbar).gAccordion("toggleOpen", true),
                                    $(this._toolbar).gAccordion("init", $(this._panel)));
                                const inspectorSidebar = gDesigner.getRightSidebars().getSidebar(appConstants.default.SidebarsIds.GInspectorSidebar);
                                inspectorSidebar.trigger(new sidebarEventModule.default(sidebarEventModule.default.Type.ChildAdded, inspectorSidebar));
                            }.bind(this)
                        )
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "text.add-layer-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GFillPaintLayerProperties", "text.add-layer-tooltip-description")
                                ),
                                learnMore: "/docs/colors-gradients-textures/fills/",
                            })
                        )
                        .appendTo(this._toolbar),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "text.fill-rule")),
                            columns: [{ width: "100%", content: createEvenOddInput("evenodd") }],
                        })
                        .appendTo(this._advancedFillPanel),
                    gDesigner
                        .getWorkspace()
                        .getStyleEdManager()
                        .addEventListener(editorModule.GStyleEdManager.EditorEvent, this._styleEditorEventHandler, this),
                    this._panel.data("contextmenu", true),
                    this._panel.on("mouseenter", (event) => {
                        (gDesigner.setMouseOverContext(
                            mouseOverContexts.FillPropertiesPanel,
                            event,
                            function (event) {
                                var copyInfoOverlay = this._panel.find(".copy-info-overlay").eq(0),
                                    selectedBlock = this._panel.find(".fill-block.g-selected") || null,
                                    topOffset = (selectedBlock && selectedBlock.position().top) || 0,
                                    overlay = $("<span/>")
                                        .addClass("copy-info-overlay")
                                        .css({ top: topOffset })
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "text.copy-fill")));
                                (copyInfoOverlay && copyInfoOverlay.remove(),
                                    this._panel.append(overlay),
                                    setTimeout(() => {
                                        overlay.animate({ opacity: 0, top: "+=20" }, 500, overlay.remove);
                                    }, 1e3));
                            }.bind(this)
                        ),
                            this._panel.on("mousemove.check-context", (event) => {
                                var panelHeight = this._panel.outerHeight(),
                                    panelOffset = this._panel.offset();
                                event.clientY > panelOffset.top + panelHeight - 2 &&
                                    (gDesigner.setMouseOverContext(null, null, null), this._panel.off("mousemove.check-context"));
                            }));
                    }),
                    this._panel.on("mouseleave", () => {
                        (this._panel.off("mousemove.check-context"), gDesigner.setMouseOverContext(null, null, null));
                    }));
            }),
            (GFillPaintLayerProperties.prototype.update = function (document, elements, options) {
                const hadStyleEditorChange = this._styleEditorChange;
                if ((this._styleEditorChange && (this._styleEditorChange = false), this._ownChange)) return true;
                if (
                    (this._chooserElem && this._chooserElem.gPatternChooser("close"),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                        this._document.getScene().removeEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                        this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        (this._document = null)),
                    (this._elements = []),
                    document)
                ) {
                    document.getEditor();
                    for (var i = 0; i < elements.length; ++i) {
                        var s = elements[i],
                            l = function (index, part) {
                                part.hasMixin(GObject.GStylable) &&
                                    part.getStylePropertySets().indexOf(GObject.GStylable.PropertySet.FillPaintLayers) >= 0 &&
                                    this._elements.push(part);
                            }.bind(this),
                            c = editorModule.GElementEditor.getEditor(s);
                        c && c.getStylableParts() ? GObject.GUtil.each(c.getStylableParts(), l) : l(null, s);
                    }
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document.getScene().addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                            this._document.getScene().addEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            hadStyleEditorChange || this._updateProperties(options),
                            true
                        );
                }
                return false;
            }),
            (GFillPaintLayerProperties.prototype._styleEditorEventHandler = function (event) {
                this._styleEdOn && event.type == editorModule.GStyleEdManager.EditorEventType.PrepareModifiedEvent && (this._styleEditorChange = true);
            }),
            (GFillPaintLayerProperties.prototype._updateProperties = function (extra) {
                if (this._elements && this._elements.length) {
                    var firstElement = this._elements[0];
                    this._panel.find(".fill-block").remove();
                    var fillLayers = firstElement.getPaintLayers().getFillLayers();
                    (GObject.GUtil.each(
                        fillLayers,
                        function (index, layer) {
                            layer && this._insertPaintLayer(layer, extra);
                        }.bind(this)
                    ),
                        this._advancedFillPanel
                            .find('[data-property="evenodd"]')
                            .prop("disabled", !firstElement.hasProperty("evenodd"))
                            .val(firstElement.getProperty("evenodd") ? "1" : "0"),
                        this._updateToolbar());
                } else console.warn("GFillPaintLayerProperties: empty _elements array");
            }),
            (GFillPaintLayerProperties.prototype._assignProperty = function (property, value, transactionName) {
                this._assignProperties([property], [value], transactionName);
            }),
            (GFillPaintLayerProperties.prototype._assignProperties = function (properties, values, transactionName) {
                if (this._document) {
                    this._ownChange = true;
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var i = 0; i < this._elements.length; ++i) this._elements[i].setProperties(properties, values);
                    } finally {
                        (editor.commitTransaction(transactionName || GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.modify"))),
                            (this._ownChange = false));
                    }
                } else console.warn("GFillPaintLayerProperties: empty _document property");
            }),
            (GFillPaintLayerProperties.prototype._updateToolbar = function () {
                var hasBlocks = this._panel.find(".fill-block").length > 0;
                (this._toolbar.toggleClass("empty-list", !hasBlocks),
                    this._toolbar.find("[data-action=settings]").css("display", hasBlocks ? "" : "none"),
                    this._toolbar.find("[data-action=remove]").css("display", hasBlocks ? "" : "none"));
            }),
            (GFillPaintLayerProperties.prototype._insertPaintLayer = function (paintLayer, extra) {
                var self = this,
                    canDrag = false,
                    draggedLayer = null,
                    dragImage = null,
                    isOverDeleteIcon = null,
                    panelOffset = null,
                    panelHeight = null,
                    offsetX = 0,
                    offsetY = 0,
                    applyChange = function (properties, values, applyToAll, extra) {
                        if (applyToAll)
                            this._iterateEqualPaintLayer(paintLayer, function (layer) {
                                layer.setProperties(properties, values, false, false, true);
                            });
                        else {
                            if (!this._document) return;
                            var extraInfo = null;
                            if (extra) {
                                var fillLayerIndex = paintLayer.getParent().getIndexOfChild(paintLayer);
                                extraInfo = $.extend({ fillLayerIndex: fillLayerIndex }, extra);
                            }
                            this._ownChange = true;
                            var editor = this._document.getEditor();
                            editor.beginTransaction();
                            try {
                                this._iterateEqualPaintLayer(paintLayer, function (layer, element) {
                                    var elementEditor = editorModule.GElementEditor.getEditor(element);
                                    (elementEditor && elementEditor.applyPropertiesToParts(properties, values)) || layer.setProperties(properties, values);
                                });
                            } finally {
                                (editor.commitTransaction(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.change-properties")),
                                    extraInfo
                                ),
                                    (this._ownChange = false));
                            }
                        }
                    }.bind(this),
                    isValidDropTarget = function (element) {
                        if (draggedLayer) {
                            var targetLayer = $(element).data("paintLayer");
                            if (targetLayer && (targetLayer !== draggedLayer || GPlatform.GPlatform.modifiers.shiftKey)) return draggedLayer.getParent() === targetLayer.getParent();
                        }
                        return false;
                    },
                    dropIndicator = $("<div/>").addClass("g-drop-indicator"),
                    createLayerControl = function (propertyKey) {
                        return "_bl" === propertyKey
                            ? $("<select></select>")
                                  .gBlendMode()
                                  .gRichTooltip(
                                      richTooltipModule.GRichTooltipConfig.from({
                                          title: GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-title")),
                                          description: GObject.GLocale.get(
                                              new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-description")
                                          ),
                                          middle: false,
                                          forceShow: true,
                                          learnMore: designerConfig.LINKS.BLENDING_MODES_DOCUMENTATION_URL,
                                      })
                                  )
                                  .attr("data-property", "_bl")
                                  .on("change", function (event) {
                                      (gDesigner.stats("fill_change_blend-mode", $(event.target).val()), applyChange(["_bl"], [$(event.target).val()]));
                                  })
                            : "_op" === propertyKey
                              ? $("<input>")
                                    .addClass("fill-op")
                                    .attr("data-property", "_op")
                                    .attr("type", "text")
                                    .on("change", function (event, value) {
                                        (gDesigner.stats("fill_change_opacity"),
                                            applyChange(["_vs", "_op"], [true, (value || GObject.GLength.parseEquationValue($(this).gInputBox("value"))) / 100]),
                                            $(event.target)
                                                .parents(".touch")
                                                .find(".transparency")
                                                .gInputSlider("value", GObject.GLength.parseEquationValue($(this).gInputBox("value"))));
                                    })
                                    .gInputBox({
                                        minValue: 0,
                                        maxValue: 100,
                                        incrementValue: gDesigner.getOpacityIncrement(),
                                        postfix: "%",
                                    })
                              : "_vs" === propertyKey
                                ? $("<span></span>")
                                      .attr("data-property", "_vs")
                                      .addClass("fill-action fill-visibility gravit-icon-touch-show")
                                      .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                                      .on("click", function (event) {
                                          (gDesigner.stats("fill_hide_show"), event.stopPropagation());
                                          var isHidden = $(this).hasClass("gravit-icon-touch-hide");
                                          ($(this).removeClass("gravit-icon-touch-" + (isHidden ? "hide" : "show")),
                                              $(this).addClass("gravit-icon-touch-" + (isHidden ? "show" : "hide")),
                                              applyChange(["_vs"], [isHidden]));
                                      })
                                : "_ra" === propertyKey
                                  ? $("<div/>")
                                        .addClass("transparency gravit-icon-touch-rectangle")
                                        .gInputSlider({ type: "range", min: 0, max: 100, step: 1 })
                                        .on("input", function (event) {
                                            var target = $(event.target),
                                                value = parseInt(target.gInputSlider("value"));
                                            target.parents(".touch").find(".fill-op").trigger("change", [value]);
                                        })
                                  : void 0;
                    },
                    blockElement = $("<div></div>")
                        .addClass("fill-block")
                        .addClass("g-cursor-hand-open")
                        .attr("data-drag-mode", dragModeModule.default.PRESS_AND_HOLD)
                        .data("paintLayer", paintLayer)
                        .attr("draggable", "true")
                        .on("mousedown", function (event) {
                            ((canDrag =
                                gDesigner.isTouchEnabled() && event.originalEvent && event.originalEvent.target
                                    ? !!$(event.originalEvent.target).closest(".drag-indicator").length
                                    : $(event.target).hasClass("fill-block") ||
                                      $(event.target).hasClass("gravit-icon-drag-indicator") ||
                                      $(event.target).hasClass("columns") ||
                                      $(event.target).hasClass("column")),
                                $(event.target).closest(".fill-block").toggleClass("g-draggable-disabled", !canDrag));
                        })
                        .on("dragstart", function (event) {
                            if (!canDrag) return (event.preventDefault(), void event.stopPropagation());
                            var draggedBlock = $(event.target).closest(".fill-block"),
                                blockOffset = draggedBlock.offset(),
                                originalEvent = event.originalEvent;
                            ((dragImage = window.gDragImage()).addClass("drag-delete gravit-icon-trash"),
                                (panelOffset = self._panel.offset()),
                                (panelHeight = self._panel.outerHeight()),
                                (offsetX = event.clientX - blockOffset.left),
                                (offsetY = event.clientY - blockOffset.top),
                                originalEvent.stopPropagation(),
                                (draggedLayer = draggedBlock.data("paintLayer")),
                                (originalEvent.dataTransfer.effectAllowed = "move"),
                                originalEvent.dataTransfer.setData("text/plain", "dummy_data"),
                                self._panel.find(".fill-block").each(function (index, block) {
                                    $(block).append(
                                        $("<div></div>")
                                            .addClass("grid-drag-overlay")
                                            .on("dragenter", function () {
                                                var layer = $(this.parentNode).data("paintLayer");
                                                if (isValidDropTarget(this.parentNode)) {
                                                    if (draggedLayer && layer && draggedLayer.getParent() === layer.getParent()) {
                                                        var parent = draggedLayer.getParent(),
                                                            draggedIndex = parent.getIndexOfChild(draggedLayer),
                                                            targetIndex = parent.getIndexOfChild(layer);
                                                        draggedIndex !== targetIndex &&
                                                            (draggedIndex < targetIndex ? dropIndicator.insertBefore(this.parentNode) : dropIndicator.insertAfter(this.parentNode));
                                                    }
                                                } else dropIndicator.remove();
                                            })
                                            .on("dragleave", function () {
                                                isValidDropTarget(this.parentNode) && $(this).parent().find(".g-drop-indicator").remove();
                                            })
                                            .on("dragover", function (event) {
                                                var originalEvent = event.originalEvent;
                                                isValidDropTarget(this.parentNode) &&
                                                    (originalEvent.preventDefault(), originalEvent.stopPropagation(), (originalEvent.dataTransfer.dropEffect = "move"));
                                            })
                                            .on("drop", function (event) {
                                                var targetLayer = $(this.parentNode).closest(".fill-block").data("paintLayer");
                                                if (
                                                    (self._panel.find(".g-drop-indicator").remove(),
                                                    self._panel.find(".grid-drag-overlay").remove(),
                                                    draggedLayer && targetLayer && draggedLayer.getParent() === targetLayer.getParent())
                                                ) {
                                                    var parent = draggedLayer.getParent(),
                                                        draggedIndex = parent.getIndexOfChild(draggedLayer),
                                                        targetIndex = parent.getIndexOfChild(targetLayer);
                                                    (editorModule.GEditor.tryRunTransaction(
                                                        parent,
                                                        function () {
                                                            if (GPlatform.GPlatform.modifiers.shiftKey) {
                                                                var clonedLayer = draggedLayer.clone();
                                                                parent.insertChild(clonedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer);
                                                            } else draggedIndex !== targetIndex && (parent.removeChild(draggedLayer), parent.insertChild(draggedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer));
                                                        },
                                                        GPlatform.GPlatform.modifiers.shiftKey
                                                            ? GObject.GLocale.get(
                                                                  new GObject.GLocaleKey("GFillPaintLayerProperties", "action.duplicate")
                                                              )
                                                            : GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.move"))
                                                    ),
                                                        self._updateProperties(),
                                                        self._setSelectedPaintLayer(draggedLayer));
                                                }
                                                draggedLayer = null;
                                            })
                                    );
                                }));
                        })
                        .on("drag", function (event) {
                            isOverDeleteIcon = (0, dragIconHelper.handleDragForDeleteIcon)(event, dragImage, panelOffset, panelHeight, offsetX, offsetY);
                        })
                        .on("dragend", function (event) {
                            var originalEvent = event.originalEvent,
                                targetLayer = $(event.target).closest(".fill-block").closest(".fill-block").data("paintLayer");
                            if (
                                (self._panel.find(".g-drop-indicator").remove(),
                                self._panel.find(".grid-drag-overlay").remove(),
                                draggedLayer && targetLayer && draggedLayer.getParent() === targetLayer.getParent())
                            ) {
                                var parent = draggedLayer.getParent(),
                                    draggedIndex = parent.getIndexOfChild(draggedLayer),
                                    targetIndex = parent.getIndexOfChild(targetLayer);
                                (editorModule.GEditor.tryRunTransaction(
                                    parent,
                                    function () {
                                        if (GPlatform.GPlatform.modifiers.shiftKey) {
                                            var clonedLayer = draggedLayer.clone();
                                            parent.insertChild(clonedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer);
                                        } else draggedIndex !== targetIndex && (parent.removeChild(draggedLayer), parent.insertChild(draggedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer.getPrevious()));
                                    },
                                    GPlatform.GPlatform.modifiers.shiftKey
                                        ? GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.duplicate"))
                                        : GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.move"))
                                ),
                                    self._updateProperties(),
                                    self._setSelectedPaintLayer(draggedLayer));
                            }
                            (draggedLayer &&
                                isOverDeleteIcon &&
                                editorModule.GEditor.tryRunTransaction(
                                    self._elements[0],
                                    function () {
                                        var layers = [];
                                        (self._iterateEqualPaintLayer(draggedLayer, function (layer) {
                                            layers.push(layer);
                                        }),
                                            GObject.GUtil.each(layers, function (index, layer) {
                                                layer.getParent().removeChild(layer);
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.remove"))
                                ),
                                dragImage && dragImage.css("display", "none"),
                                (dragImage = null),
                                originalEvent.stopPropagation(),
                                (draggedLayer = null));
                        })
                        .on("click", function () {
                            self._setSelectedPaintLayer(paintLayer);
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "drag-indicator",
                                    content: $("<div></div>").addClass(
                                        "gravit-icon-drag-indicator g-cursor-hand-open gravit-icon-touch-drag-indicator"
                                    ),
                                },
                                {
                                    width: "40px",
                                    clazz: "color-preview",
                                    content: $("<div></div>")
                                        .attr("data-property", "_pt")
                                        .gPatternChooser({
                                            types: [
                                                GObject.GColor,
                                                GObject.GLinearGradient,
                                                GObject.GRadialGradient,
                                                GObject.GAngularGradient,
                                                GObject.GBackground,
                                                GObject.GTexturePattern,
                                                GObject.GNoisePattern,
                                            ],
                                            hasMask: true,
                                        })
                                        .on("chooseropen", function () {
                                            (self._document.getEditor().hideSelection(),
                                                gDesigner.getWorkspace().getStyleEdManager().updateEditor(paintLayer, "_pt", false),
                                                self._setSelectedPaintLayer(paintLayer),
                                                (self._styleEdOn = true),
                                                (self._chooserElem = $(this)));
                                        })
                                        .on("chooserclose", function (event, deferClose, overlayId) {
                                            if (gDesigner.getWorkspace().getStyleEdManager().getOverlayLock(overlayId)) deferClose();
                                            else if (
                                                ((self._styleEdOn = false),
                                                gDesigner.getWorkspace().getStyleEdManager().deactivateEditor(),
                                                self._document && (self._document.getEditor().resetHideSelection(), self._document.hasCDR()))
                                            ) {
                                                var pattern = gPatternChooser.getPattern();
                                                !pattern || pattern instanceof GObject.GRGBColor || GSystemDialog.showCDRUnsupportedObjectWarning();
                                            }
                                            self._chooserElem = null;
                                        })
                                        .on("patternchange", function (event, pattern, opacity, applyToAll, chooserOn, activeStopIdx) {
                                            var properties = ["_vs"],
                                                values = [true];
                                            (void 0 !== pattern && (properties.push("_pt"), values.push(pattern)),
                                                "number" == typeof opacity && (properties.push("_op"), values.push(opacity)));
                                            var extra = null;
                                            (chooserOn && ((extra = { chooserOn: true }), null != activeStopIdx && (extra.activeStopIdx = activeStopIdx)), applyChange(properties, values, applyToAll, extra));
                                        }),
                                },
                                {
                                    width: "auto",
                                    content: $("<select></select>")
                                        .addClass("normal")
                                        .gBlendMode()
                                        .gRichTooltip(
                                            richTooltipModule.GRichTooltipConfig.from({
                                                title: GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-title")),
                                                description: GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-description")
                                                ),
                                                middle: false,
                                                forceShow: true,
                                                learnMore: designerConfig.LINKS.BLENDING_MODES_DOCUMENTATION_URL,
                                            })
                                        )
                                        .attr("data-property", "_bl")
                                        .on("change", function (event) {
                                            (gDesigner.stats("fill_change_blend-mode", $(event.target).val()), applyChange(["_bl"], [$(event.target).val()]));
                                        }),
                                },
                                {
                                    width: "45px",
                                    content: $("<input>")
                                        .addClass("normal")
                                        .attr("data-property", "_op")
                                        .attr("type", "text")
                                        .on("change", function (event) {
                                            (gDesigner.stats("fill_change_opacity"),
                                                applyChange(["_vs", "_op"], [true, GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100]));
                                        })
                                        .gInputBox({
                                            minValue: 0,
                                            maxValue: 100,
                                            incrementValue: gDesigner.getOpacityIncrement(),
                                            postfix: "%",
                                        }),
                                },
                                {
                                    width: "20px",
                                    content: $("<span></span>")
                                        .attr("data-property", "_vs")
                                        .addClass("fill-action fill-visibility gravit-icon-display normal")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                                        .on("click", function (event) {
                                            (gDesigner.stats("fill_hide_show"), event.stopPropagation());
                                            var isHidden = $(this).hasClass("gravit-icon-hide");
                                            ($(this).removeClass("gravit-icon-" + (isHidden ? "hide" : "display")),
                                                $(this).addClass("gravit-icon-" + (isHidden ? "display" : "hide")),
                                                applyChange(["_vs"], [isHidden]));
                                        }),
                                },
                                {
                                    width: "auto",
                                    content: $("<div/>")
                                        .addClass("touch")
                                        .gPropertyRow({
                                            columns: [
                                                { width: "auto", content: createLayerControl("_bl") },
                                                { width: "60px", content: createLayerControl("_vs") },
                                            ],
                                        })
                                        .gPropertyRow({
                                            columns: [
                                                { width: "auto", content: createLayerControl("_ra") },
                                                { width: "60px", content: createLayerControl("_op") },
                                            ],
                                        }),
                                },
                            ],
                        })
                        .prependTo(this._panel);
                (blockElement.find(".columns").addClass("g-cursor-hand-open"),
                    blockElement.find(".column").addClass("g-cursor-hand-open"),
                    blockElement.find(".touch").parents(".column").addClass("g-touch"),
                    blockElement.find(".normal").parents(".column").addClass("g-normal"),
                    blockElement.find('[data-property="_pt"]').parents(".column").addClass("g-color"),
                    blockElement.find(".transparency").parents(".touch div:last-child>div").addClass("g-transparency"),
                    blockElement.find(".touch")
                        .find("select")
                        .addClass("g-select")
                        .parent()
                        .append($("<span/>").addClass("gravit-icon-touch-arrowDown")),
                    blockElement.contextmenu({ context: contextMenuContexts.FillPropertyPanel }, function (event) {
                        event.preventDefault();
                        var layer = $(this).data("paintLayer");
                        (self._setSelectedPaintLayer(layer),
                            $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", {
                                previousEvent: event,
                                data: { paintLayer: layer },
                            }));
                    }),
                    this._setSelectedPaintLayer(paintLayer),
                    this._updatePaintLayer(paintLayer, extra),
                    blockElement.find(".transparency").each(function (index, element) {
                        $(element).gInputSlider("value", parseInt($(this).parents(".touch").find(".fill-op").val()));
                    }));
            }),
            (GFillPaintLayerProperties.prototype.openPatternChooser = function () {
                this._panel.find(".fill-block:first-child").find('[data-property="_pt"]').find(".g-button").click();
            }),
            (GFillPaintLayerProperties.prototype.openEyeDropper = function (e, t) {
                this._panel.find(".fill-block:first-child").find('[data-property="_pt"]').gPatternChooser("openEyeDropper", e, t);
            }),
            (GFillPaintLayerProperties.prototype._setSelectedPaintLayer = function (paintLayer) {
                (this._panel.find(".fill-block").each(function (index, element) {
                    var row = $(element);
                    row.toggleClass("g-selected", row.data("paintLayer") === paintLayer);
                }),
                    this._document && this._document.updateActiveStylesList("Fill", paintLayer));
            }),
            (GFillPaintLayerProperties.prototype._getSelectedPaintLayer = function () {
                return this._panel.find(".fill-block.g-selected").data("paintLayer");
            }),
            (GFillPaintLayerProperties.prototype._removePaintLayer = function (paintLayer) {
                this._panel.find(".fill-block").each(function (index, element) {
                    var row = $(element);
                    if (row.data("paintLayer") === paintLayer) return (row.remove(), false);
                });
            }),
            (GFillPaintLayerProperties.prototype._updatePaintLayer = function (paintLayer, options) {
                paintLayer &&
                    this._panel.find(".fill-block").each(function (blockIndex, row) {
                        var rowElement = $(row);
                        if (rowElement.data("paintLayer") === paintLayer) {
                            (rowElement
                                .find('[data-property="_pt"]')
                                .gPatternChooser("setPattern", paintLayer.getProperty("_pt", false, false, true))
                                .gPatternChooser("value", paintLayer.getProperty("_pt", false, false, true))
                                .gPatternChooser("opacity", paintLayer.getProperty("_op", false, false, true)),
                                rowElement.find('[data-property="_op"]').each(function (index, element) {
                                    $(element).gInputBox("value", GObject.GUtil.formatOpacity(100 * paintLayer.getProperty("_op", false, false, true)));
                                }),
                                rowElement.find('[data-property="_bl"]').val(paintLayer.getProperty("_bl")));
                            var visible = paintLayer.getProperty("_vs");
                            if (
                                (rowElement
                                    .find('[data-property="_vs"]')
                                    .removeClass("gravit-icon-" + (visible ? "hide" : "display"))
                                    .addClass("gravit-icon-" + (visible ? "display" : "hide")),
                                options &&
                                    (options.evtType == editorModule.GEditor.ModifiedEvent.Type.Undo || options.evtType == editorModule.GEditor.ModifiedEvent.Type.Redo) &&
                                    options.chooserOn &&
                                    null != options.fillLayerIndex)
                            )
                                paintLayer.getParent().getIndexOfChild(paintLayer) == options.fillLayerIndex &&
                                    rowElement.find(".preview").trigger("click", null != options.activeStopIdx ? options.activeStopIdx : null);
                        }
                    });
            }),
            (GFillPaintLayerProperties.prototype._afterInsert = function (event) {
                event.node instanceof GObject.GStylable.FillPaintLayer &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    (this._insertPaintLayer(event.node), this._updateToolbar());
            }),
            (GFillPaintLayerProperties.prototype._beforeRemove = function (event) {
                if (event.node instanceof GObject.GStylable.FillPaintLayer && event.node.getOwnerStylable() === this._elements[0]) {
                    this._removePaintLayer(event.node);
                    for (var sibling = event.node.getPrevious(); sibling && !(sibling instanceof GObject.GStylable.FillPaintLayer); ) sibling = sibling.getPrevious();
                    if (!(sibling instanceof GObject.GStylable.FillPaintLayer))
                        for (sibling = event.node.getNext(); sibling && !(sibling instanceof GObject.GStylable.FillPaintLayer); ) sibling = sibling.getNext();
                    (this._setSelectedPaintLayer(sibling), this._updateToolbar());
                }
            }),
            (GFillPaintLayerProperties.prototype._afterPropertiesChange = function (event) {
                event.node instanceof GObject.GStylable.FillPaintLayer &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    this._updatePaintLayer(event.node);
            }),
            (GFillPaintLayerProperties.prototype._iterateEqualPaintLayer = function (paintLayer, callback) {
                if (paintLayer)
                    for (var layerIndex = paintLayer.getParent().getIndexOfChild(paintLayer), o = 0; o < this._elements.length; ++o) {
                        var i = this._elements[o].getPaintLayers();
                        GObject.GUtil.each(
                            i.getFillLayers(),
                            function (index, layer) {
                                ((layer && layer === paintLayer) || (layer.constructor === paintLayer.constructor && i.getIndexOfChild(layer) === layerIndex)) &&
                                    callback(layer, this._elements[o]);
                            }.bind(this)
                        );
                    }
            }),
            (module.exports = GFillPaintLayerProperties));
    };
