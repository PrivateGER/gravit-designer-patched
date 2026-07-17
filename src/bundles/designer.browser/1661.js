module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            GEditor = require(53),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GTouchTool = _interopRequireDefault(require(340)),
            GDocumentEvent = require(78),
            GCreateSymbolAction = require(608),
            GFitSelectionAction = require(566),
            GSidebar = require(806),
            GSidebars = require(395);
        function GSymbolsSidebar() {
            GSidebar.call(this);
        }
        (GObject.GObject.inherit(GSymbolsSidebar, GSidebar),
            (GSymbolsSidebar.ID = "symbols"),
            (GSymbolsSidebar.TITLE = new GObject.GLocaleKey("GSymbolsSidebar", "title")),
            (GSymbolsSidebar.prototype._htmlElement = null),
            (GSymbolsSidebar.prototype._newSymbolButton = null),
            (GSymbolsSidebar.prototype._symbolsToolbar = null),
            (GSymbolsSidebar.prototype._symbolsPanel = null),
            (GSymbolsSidebar.prototype.getId = function () {
                return GSymbolsSidebar.ID;
            }),
            (GSymbolsSidebar.prototype.getTitle = function () {
                return GSymbolsSidebar.TITLE;
            }),
            (GSymbolsSidebar.prototype.isEnabled = function () {
                return true;
            }),
            (GSymbolsSidebar.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isEditingEnabled();
            }),
            (GSymbolsSidebar.prototype.getOrientation = function () {
                return GSidebars.Orientation.Left;
            }),
            (GSymbolsSidebar.prototype.getMinimumWidth = function () {
                return 250;
            }),
            (GSymbolsSidebar.prototype.getDefaultWidth = function () {
                return 250;
            }),
            (GSymbolsSidebar.prototype.isResizeable = function () {
                return true;
            }),
            (GSymbolsSidebar.prototype.relayout = function () {
                this._symbolsPanel.gSymbolsPanel("relayout");
            }),
            (GSymbolsSidebar.prototype.init = function (htmlElement) {
                (GSidebar.prototype.init.call(this, htmlElement),
                    (this._htmlElement = htmlElement),
                    (this._symbolsToolbar = $("<div></div>")
                        .addClass("toolbar symbols-toolbar")
                        .append(
                            $("<label></label>")
                                .css("flex-grow", "1")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.symbols")))
                        )
                        .on("dragover", function (event) {
                            (event.preventDefault(), event.stopPropagation());
                        })
                        .on("dragenter", function (event) {
                            (event.preventDefault(), event.stopPropagation());
                        })
                        .on(
                            "drop",
                            function (event) {
                                (event.preventDefault(), event.stopPropagation());
                            }.bind(this)
                        )
                        .appendTo(htmlElement)),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "action.delete-symbol")))
                        .on("click", () => this._deleteSymbol())
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .append($("<span></span>").addClass("gravit-icon-touch-trash"))
                        .appendTo(this._symbolsToolbar)
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.delete-symbol-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.delete-symbol-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/symbols/#symbols-panel",
                            })
                        ),
                    (this._newSymbolButton = $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "action.create-symbol")))
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("symbols_new_symbol"),
                                    this._symbolsPanel.gSymbolsPanel("newSymbolClick") &&
                                        ($(this._symbolsToolbar).gAccordion("toggleOpen", true),
                                        $(this._symbolsToolbar).gAccordion("init", $(this._symbolsPanel))));
                            }.bind(this)
                        )
                        .append($("<span></span>").addClass("gravit-icon-plus"))
                        .append($("<span></span>").addClass("gravit-icon-touch-plus"))
                        .appendTo(this._symbolsToolbar)
                        .addClass("g-disabled")
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.create-symbol-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.create-symbol-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/symbols/#symbols-panel",
                            })
                        )));
                var self = this,
                    symbolsContainer = $("<div></div>")
                        .addClass("symbols-container")
                        .appendTo(htmlElement)
                        .on("click", function (event) {
                            (gDesigner.stats("symbols_click_symbol"),
                                (event.target === this || $(event.target).hasClass("g-symbols-panel")) &&
                                    self._symbolsPanel.gSymbolsPanel("isSelected") &&
                                    self._document.getEditor().updateSelection(
                                        false,
                                        self._document
                                            .getEditor()
                                            .getSelection()
                                            .slice()
                                            .filter(function (element) {
                                                return !(element instanceof GObject.GSymbol && element.isMaster());
                                            })
                                    ));
                        })
                        .on("scroll", function () {
                            if ($("body").hasClass("g-touch")) {
                                var scrollTop = $(this)[0].scrollTop,
                                    shadowColor = "light" == gDesigner.getSetting("theme") ? "DFDFDF" : "2E2E2E";
                                ((scrollTop = scrollTop > 20 ? 20 : scrollTop),
                                    $(".symbols-toolbar").css({
                                        "box-shadow": "0 0 25px ".concat(scrollTop, "px #").concat(shadowColor),
                                    }));
                            }
                        });
                ((this._symbolsPanel = $("<div></div>")
                    .addClass("symbols")
                    .on("dragover", function (event) {
                        (event.preventDefault(), event.stopPropagation());
                    })
                    .on("dragenter", function (event) {
                        (event.preventDefault(), event.stopPropagation());
                    })
                    .on(
                        "drop",
                        function (event) {
                            (event.preventDefault(), event.stopPropagation());
                        }.bind(this)
                    )
                    .appendTo(symbolsContainer)),
                    this._symbolsPanel.gSymbolsPanel({
                        moveCallback: this._moveSymbolCallback.bind(this),
                        clickCallback: this._clickSymbolCallback.bind(this),
                        dblClickCallback: this._dblClickSymbolCallback.bind(this),
                        startDraggingCallback: this._startSymbolDraggingCallback.bind(this),
                    }),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this));
            }),
            (GSymbolsSidebar.prototype._documentEvent = function (event) {
                if (event.type === GDocumentEvent.Type.Activated)
                    ((this._document = event.document),
                        this._symbolsPanel.gSymbolsPanel("scene", this._document.getScene()),
                        this.trigger(GSidebar.UPDATE_EVENT),
                        this._document.getEditor().addEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionUpdate, this));
                else if (event.type === GDocumentEvent.Type.Deactivated) {
                    (this._symbolsPanel.gSymbolsPanel("scene", null),
                        this._document.getEditor().removeEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionUpdate, this),
                        (this._document = null),
                        this.trigger(GSidebar.UPDATE_EVENT));
                }
            }),
            (GSymbolsSidebar.prototype._deleteSymbol = function () {
                gDesigner.stats("symbols_delete_symbol");
                this._document.getEditor();
                var scene = this._document.getScene(),
                    panel = (scene.getActivePage(), this._symbolsPanel);
                panel.gSymbolsPanel("isSelected") &&
                    GEditor.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            panel.gSymbolsPanel("removeSelected");
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "action.delete-symbol"))
                    );
            }),
            (GSymbolsSidebar.prototype._moveSymbolCallback = function (e, t, n) {
                n && e && n.length;
            }),
            (GSymbolsSidebar.prototype._startSymbolDraggingCallback = function (e) {
                return (console.log("start dragging cb"), null);
            }),
            (GSymbolsSidebar.prototype._clickSymbolCallback = function (symbol) {
                if (symbol && symbol.isMaster()) {
                    var editor = this._document.getEditor();
                    if (editor) {
                        var page = GEditor.GEditor.getElementPage(symbol);
                        (page && this._document.getScene().setActivePage(page),
                            editor.clearSelection(),
                            editor.updateSelection(false, [symbol]),
                            editor.hasSelection() && gDesigner.executeAction(GFitSelectionAction.ID, void 0, void 0, true));
                    }
                }
            }),
            (GSymbolsSidebar.prototype._dblClickSymbolCallback = function (symbol) {
                if (symbol && symbol.isMaster()) {
                    var editor = this._document.getEditor(),
                        scene = this._document.getScene(),
                        linkedSymbols = (scene.getActivePage(), [symbol]);
                    (scene.visitLinks(symbol, function (element) {
                        element instanceof GObject.GSymbol && linkedSymbols.push(element);
                    }),
                        editor && (editor.clearSelection(), editor.updateSelection(false, linkedSymbols)));
                }
            }),
            (GSymbolsSidebar.prototype._selectionUpdate = function () {
                var canCreateSymbol = gDesigner.canExecuteAction(GCreateSymbolAction.ID),
                    isButtonDisabled = this._newSymbolButton.hasClass("g-disabled");
                canCreateSymbol && isButtonDisabled ? this._newSymbolButton.removeClass("g-disabled") : canCreateSymbol || isButtonDisabled || this._newSymbolButton.addClass("g-disabled");
            }),
            (GSymbolsSidebar.prototype.getTouchTools = function () {
                return [
                    new GTouchTool.default({
                        id: "symbols",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-newSymbols",
                        panel: ".symbols-container",
                        toolbar: ".symbols-toolbar",
                    }),
                ];
            }),
            (GSymbolsSidebar.prototype.toString = function () {
                return "[Object GSymbolsSidebar]";
            }),
            (module.exports = GSymbolsSidebar));
    };
