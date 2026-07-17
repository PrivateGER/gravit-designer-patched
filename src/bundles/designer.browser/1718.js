module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(32), require(33));
        var GObject = require(1),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GCreateSymbolAction = require(608);
        function registerSymbolNode(symbolNode) {
            var panelData = $(this).data("gsymbolspanel"),
                multireferenceId = symbolNode.getMultireferenceId();
            if (panelData.symbolNodes[multireferenceId])
                symbolNode.isMaster() &&
                    !symbolNode.hasEventListeners(GObject.GSymbol.AfterThumbnailUpdate) &&
                    symbolNode.addEventListener(GObject.GSymbol.AfterThumbnailUpdate, updateSymbolThumbnail.bind(this));
            else {
                var symbolElement = createSymbolElement.call(this, symbolNode);
                symbolElement && (symbolElement.appendTo($(this)), (panelData.symbolNodes[multireferenceId] = symbolNode));
            }
        }
        function removeSymbolNode(symbolNode, skipSceneRemoval) {
            if (symbolNode.isMaster()) {
                var panelData = $(this).data("gsymbolspanel"),
                    multireferenceId = symbolNode.getMultireferenceId(),
                    symbolElement = $(this).find("#symbol_" + multireferenceId);
                if (symbolElement.length) {
                    if (panelData.scene) {
                        var sceneSymbol = resolveSceneSymbol.call(this, symbolNode);
                        if (sceneSymbol && (sceneSymbol.removeEventListener(GObject.GSymbol.AfterThumbnailUpdate, updateSymbolThumbnail), !skipSceneRemoval)) {
                            var previousBlockHandlers = panelData.blockHandlers;
                            ((panelData.blockHandlers = true), panelData.scene.removeSymbol(sceneSymbol), (panelData.blockHandlers = previousBlockHandlers));
                        }
                    }
                    (delete panelData.symbolNodes[multireferenceId], symbolElement.remove(), 0 === Object.keys(panelData.symbolNodes).length && renderEmptyState.call(this));
                }
            }
        }
        function updateSymbolThumbnail(event) {
            var symbol = event.symbol,
                frame = symbol.getFrame();
            if (frame && symbol.getPaintBBox()) {
                $(this).data("gsymbolspanel");
                var multireferenceId = symbol.getMultireferenceId(),
                    symbolElement = $(this).find("#symbol_" + multireferenceId),
                    imageContainer = symbolElement.find(".symbol-image");
                imageContainer.empty();
                var frameWidth = frame.getWidth(),
                    aspectRatio = frame.getHeight() / frameWidth,
                    thumbWidth = 85,
                    thumbHeight = thumbWidth * aspectRatio;
                (thumbHeight > 85 && (thumbWidth = (thumbHeight = 85) / aspectRatio), centerThumbnail(imageContainer, thumbWidth, thumbHeight));
                var bitmapElement = event.image.getBitmap().getHTMLElement(true);
                if (($(bitmapElement).css({ width: thumbWidth, height: thumbHeight, margin: "5px" }), symbol.hasFlag(GObject.GNode.Flag.Selected)))
                    symbolElement.find(".symbol-title-group").addClass("g-highlighted");
                $(bitmapElement).appendTo(imageContainer);
            }
        }
        function createSymbolElement(symbolNode) {
            var panelData = $(this).data("gsymbolspanel");
            if (symbolNode.isMaster()) {
                if (!(symbolNode instanceof GObject.GSymbol)) throw new Error("item not symbol");
                var existingInfoParent = $(this).find(".symbol-panel-info").parent();
                existingInfoParent.length && existingInfoParent.remove();
                var entryElement = $("<div />")
                        .attr("draggable", false)
                        .attr("id", "symbol_" + symbolNode.getMultireferenceId())
                        .css({ display: "inline" })
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: symbolNode.getProperty("name"),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GCommonNames", "text.symbol-panel-symbol-tooltip-description")
                                ),
                                middle: false,
                                learnMore: "/docs/organizing-your-designs/symbols/#symbols-panel",
                            })
                        ),
                    titleGroup = $("<span></span>").addClass("symbol-title-group");
                titleGroup.appendTo(entryElement);
                var symbolName = symbolNode.getProperty("name");
                symbolName = symbolName || symbolNode.getNodeNameTranslated();
                var imageSpan = $("<span></span>");
                (symbolNode.addEventListener(GObject.GSymbol.AfterThumbnailUpdate, updateSymbolThumbnail.bind(this)), imageSpan.addClass("symbol-image").appendTo(titleGroup));
                var panelElement = this;
                return (
                    titleGroup
                        .attr("draggable", true)
                        .css({
                            display: "inline-block",
                            backgroundColor: "#eee",
                            margin: "5px",
                            height: "95px",
                            width: "45%",
                            textAlign: "center",
                            lineHeight: "180px",
                        })
                        .on("dragstart", function (dragEvent) {
                            ($(this).addClass("g-dragging"),
                                (dragEvent.originalEvent.dataTransfer.effectAllowed = "move"),
                                dragEvent.originalEvent.dataTransfer.setData(GObject.GNode.MIME_TYPE, GObject.GNode.serialize(symbolNode)),
                                (panelData.dragNode = symbolNode),
                                setTimeout(
                                    function () {
                                        $(this).removeClass("g-dragging");
                                    }.bind(this),
                                    0
                                ));
                        })
                        .on("drop", function (event) {
                            $(this).parent().parent().data("gsymbolspanel").dragNode = null;
                        })
                        .on("click", function (event) {
                            gDesigner.stats("symbol_click_select");
                            var sceneSymbol = resolveSceneSymbol.call(panelElement, symbolNode);
                            sceneSymbol && (sceneSymbol.getScene() ? panelData.options.clickCallback(sceneSymbol) : titleGroup.toggleClass("g-highlighted"));
                        })
                        .on("dblclick", function (event) {
                            gDesigner.stats("symbol_click_focus");
                            var sceneSymbol = resolveSceneSymbol.call(panelElement, symbolNode);
                            sceneSymbol && panelData.options.dblClickCallback(sceneSymbol);
                        }),
                    entryElement
                );
            }
        }
        function resolveSceneSymbol(symbolNode) {
            if (symbolNode.getScene()) return symbolNode;
            var panelData = $(this).data("gsymbolspanel");
            if (!panelData.scene) return null;
            for (var sceneSymbols = panelData.scene.getSymbols(), o = 0; o < sceneSymbols.length; o++)
                if (sceneSymbols[o].getMultireferenceId() === symbolNode.getMultireferenceId()) return sceneSymbols[o];
        }
        function handleSpecialChange(event) {
            var panelData = $(this).data("gsymbolspanel");
            if (!panelData.blockHandlers && event.node instanceof GObject.GSymbol)
                if (event.data.created) {
                    registerSymbolNode.call(this, event.node);
                    var symbolImage = panelData.scene.getSymbolImage(event.node);
                    symbolImage ? updateSymbolThumbnail.call(this, { symbol: event.node, image: symbolImage }) : event.node.toBitmap();
                } else removeSymbolNode.call(this, event.node, true);
        }
        function handlePropertiesChange(event) {
            !$(this).data("gsymbolspanel").blockHandlers && (event.node, GObject.GSymbol);
        }
        function handleFlagChange(event) {
            for (var panelData = $(this).data("gsymbolspanel"), symbolNode = event.node; symbolNode && !(symbolNode instanceof GObject.GSymbol && symbolNode.isMaster()); ) symbolNode = symbolNode.getParent();
            if (!panelData.blockHandlers && symbolNode) {
                var multireferenceId = symbolNode.getMultireferenceId(),
                    titleGroup = $(this)
                        .find("#symbol_" + multireferenceId)
                        .find(".symbol-title-group");
                event.flag === GObject.GNode.Flag.Selected && (event.set ? titleGroup.addClass("g-highlighted") : titleGroup.removeClass("g-highlighted"));
            }
        }
        function centerThumbnail(element, width, height) {
            element.css({ position: "relative", top: height / 2 - 42.5 + "px" });
        }
        function relayoutThumbnails() {
            ($(this).data("gsymbolspanel"), $(this).data("gsymbolspanel"));
            for (var imageElements = $(this).find(".symbol-image"), t = 0; t < imageElements.length; t++) {
                var n = $(imageElements[t]),
                    o = n.find("canvas");
                (o.css("width") || "0px").split("px")[0];
                centerThumbnail(n, 0, (o.css("height") || "0px").split("px")[0]);
            }
        }
        function resetPanel() {
            var panelData = $(this).data("gsymbolspanel");
            ((panelData.symbolNodes = {}), (panelData.scene = null), $(this).empty(), renderEmptyState.call(this));
        }
        function renderEmptyState() {
            $("<div>")
                .append(
                    $("<div>")
                        .addClass("symbol-panel-info")
                        .append(
                            $("<div></div>")
                                .addClass("symbol-panel-infotitle")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "common.nosymbolsdefined")))
                        )
                        .append(
                            $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "common.nosymbolsdefined-info")))
                        )
                )
                .appendTo($(this));
        }
        var pluginMethods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            moveCallback: null,
                            clickCallback: null,
                            dblClickCallback: null,
                            startDraggingCallback: null,
                        },
                        options
                    )),
                    this.each(function () {
                        $(this).addClass("g-symbols-panel").data("gsymbolspanel", {
                            options: options,
                            symbolNodes: {},
                            scene: null,
                            currentFocus: null,
                        });
                    })
                );
            },
            relayout: function () {
                relayoutThumbnails.call(this);
            },
            newSymbolClick: function () {
                return (
                    gDesigner.canExecuteAction(GCreateSymbolAction.ID) &&
                        (gDesigner.stats("symbol_click_createnewsymbol"), gDesigner.executeAction(GCreateSymbolAction.ID, void 0, void 0, true)),
                    false
                );
            },
            isSelected: function () {
                $(this).data("gsymbolspanel");
                return $(this).find(".g-highlighted").length > 0;
            },
            removeSelected: function () {
                var panelData = $(this).data("gsymbolspanel"),
                    highlightedId = $(this).find(".g-highlighted").parent().attr("id");
                if (highlightedId) {
                    var multireferenceId = highlightedId.split("_")[1],
                        symbolNode = panelData.symbolNodes[multireferenceId];
                    symbolNode && removeSymbolNode.call(this, symbolNode);
                }
            },
            scene: function (scene) {
                var element = $(this),
                    panelData = element.data("gsymbolspanel");
                if (!arguments.length) return panelData.scene;
                if (
                    scene !== panelData.scene &&
                    (panelData.scene &&
                        panelData.scene.hasMixin(GObject.GEventTarget) &&
                        (panelData.scene.removeEventListener(GObject.GNode.AfterSpecialChangeEvent, panelData.afterSpecialChangeHandler, this),
                        panelData.scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                        panelData.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this)),
                    resetPanel.call(this),
                    (panelData.scene = scene),
                    panelData.scene)
                ) {
                    panelData.scene.hasMixin(GObject.GEventTarget) &&
                        ((panelData.afterSpecialChangeHandler = handleSpecialChange.bind(this)),
                        (panelData.afterPropertiesChangeHandler = handlePropertiesChange.bind(this)),
                        (panelData.afterFlagChangeHandler = handleFlagChange.bind(this)),
                        panelData.scene.addEventListener(GObject.GNode.AfterSpecialChangeEvent, panelData.afterSpecialChangeHandler, this),
                        panelData.scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                        panelData.scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this));
                    var sceneSymbols = panelData.scene.getSymbols();
                    sceneSymbols &&
                        sceneSymbols.forEach(
                            function (symbol) {
                                registerSymbolNode.call(this, symbol);
                                var symbolImage = panelData.scene.getSymbolImage(symbol);
                                symbolImage ? updateSymbolThumbnail.call(this, { symbol: symbol, image: symbolImage }) : symbol.toBitmap();
                            }.bind(this)
                        );
                }
                return this;
            },
        };
        $.fn.gSymbolsPanel = function (methodName) {
            return pluginMethods[methodName]
                ? pluginMethods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof methodName && methodName
                  ? void $.error("Method " + methodName + " does not exist on jQuery.myPlugin")
                  : pluginMethods.init.apply(this, arguments);
        };
    };
