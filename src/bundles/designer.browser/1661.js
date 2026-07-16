module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            a = require(53),
            r = require(67),
            s = _interopRequireDefault(require(340)),
            l = require(78),
            GCreateSymbolAction = require(608),
            d = require(566),
            u = require(806),
            p = require(395);
        function g() {
            u.call(this);
        }
        (GObject.GObject.inherit(g, u),
            (g.ID = "symbols"),
            (g.TITLE = new GObject.GLocaleKey("GSymbolsSidebar", "title")),
            (g.prototype._htmlElement = null),
            (g.prototype._newSymbolButton = null),
            (g.prototype._symbolsToolbar = null),
            (g.prototype._symbolsPanel = null),
            (g.prototype.getId = function () {
                return g.ID;
            }),
            (g.prototype.getTitle = function () {
                return g.TITLE;
            }),
            (g.prototype.isEnabled = function () {
                return true;
            }),
            (g.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isEditingEnabled();
            }),
            (g.prototype.getOrientation = function () {
                return p.Orientation.Left;
            }),
            (g.prototype.getMinimumWidth = function () {
                return 250;
            }),
            (g.prototype.getDefaultWidth = function () {
                return 250;
            }),
            (g.prototype.isResizeable = function () {
                return true;
            }),
            (g.prototype.relayout = function () {
                this._symbolsPanel.gSymbolsPanel("relayout");
            }),
            (g.prototype.init = function (e) {
                (u.prototype.init.call(this, e),
                    (this._htmlElement = e),
                    (this._symbolsToolbar = $("<div></div>")
                        .addClass("toolbar symbols-toolbar")
                        .append(
                            $("<label></label>")
                                .css("flex-grow", "1")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.symbols")))
                        )
                        .on("dragover", function (e) {
                            (e.preventDefault(), e.stopPropagation());
                        })
                        .on("dragenter", function (e) {
                            (e.preventDefault(), e.stopPropagation());
                        })
                        .on(
                            "drop",
                            function (e) {
                                (e.preventDefault(), e.stopPropagation());
                            }.bind(this)
                        )
                        .appendTo(e)),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "action.delete-symbol")))
                        .on("click", () => this._deleteSymbol())
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .append($("<span></span>").addClass("gravit-icon-touch-trash"))
                        .appendTo(this._symbolsToolbar)
                        .gRichTooltip(
                            r.GRichTooltipConfig.from({
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
                            r.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.create-symbol-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "text.create-symbol-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/symbols/#symbols-panel",
                            })
                        )));
                var t = this,
                    n = $("<div></div>")
                        .addClass("symbols-container")
                        .appendTo(e)
                        .on("click", function (e) {
                            (gDesigner.stats("symbols_click_symbol"),
                                (e.target === this || $(e.target).hasClass("g-symbols-panel")) &&
                                    t._symbolsPanel.gSymbolsPanel("isSelected") &&
                                    t._document.getEditor().updateSelection(
                                        false,
                                        t._document
                                            .getEditor()
                                            .getSelection()
                                            .slice()
                                            .filter(function (e) {
                                                return !(e instanceof GObject.GSymbol && e.isMaster());
                                            })
                                    ));
                        })
                        .on("scroll", function () {
                            if ($("body").hasClass("g-touch")) {
                                var e = $(this)[0].scrollTop,
                                    t = "light" == gDesigner.getSetting("theme") ? "DFDFDF" : "2E2E2E";
                                ((e = e > 20 ? 20 : e),
                                    $(".symbols-toolbar").css({
                                        "box-shadow": "0 0 25px ".concat(e, "px #").concat(t),
                                    }));
                            }
                        });
                ((this._symbolsPanel = $("<div></div>")
                    .addClass("symbols")
                    .on("dragover", function (e) {
                        (e.preventDefault(), e.stopPropagation());
                    })
                    .on("dragenter", function (e) {
                        (e.preventDefault(), e.stopPropagation());
                    })
                    .on(
                        "drop",
                        function (e) {
                            (e.preventDefault(), e.stopPropagation());
                        }.bind(this)
                    )
                    .appendTo(n)),
                    this._symbolsPanel.gSymbolsPanel({
                        moveCallback: this._moveSymbolCallback.bind(this),
                        clickCallback: this._clickSymbolCallback.bind(this),
                        dblClickCallback: this._dblClickSymbolCallback.bind(this),
                        startDraggingCallback: this._startSymbolDraggingCallback.bind(this),
                    }),
                    gDesigner.addEventListener(l, this._documentEvent, this));
            }),
            (g.prototype._documentEvent = function (e) {
                if (e.type === l.Type.Activated)
                    ((this._document = e.document),
                        this._symbolsPanel.gSymbolsPanel("scene", this._document.getScene()),
                        this.trigger(u.UPDATE_EVENT),
                        this._document.getEditor().addEventListener(a.GEditor.SelectionChangedEvent, this._selectionUpdate, this));
                else if (e.type === l.Type.Deactivated) {
                    (this._symbolsPanel.gSymbolsPanel("scene", null),
                        this._document.getEditor().removeEventListener(a.GEditor.SelectionChangedEvent, this._selectionUpdate, this),
                        (this._document = null),
                        this.trigger(u.UPDATE_EVENT));
                }
            }),
            (g.prototype._deleteSymbol = function () {
                gDesigner.stats("symbols_delete_symbol");
                this._document.getEditor();
                var e = this._document.getScene(),
                    t = (e.getActivePage(), this._symbolsPanel);
                t.gSymbolsPanel("isSelected") &&
                    a.GEditor.tryRunTransaction(
                        e,
                        function () {
                            t.gSymbolsPanel("removeSelected");
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GSymbolsSidebar", "action.delete-symbol"))
                    );
            }),
            (g.prototype._moveSymbolCallback = function (e, t, n) {
                n && e && n.length;
            }),
            (g.prototype._startSymbolDraggingCallback = function (e) {
                return (console.log("start dragging cb"), null);
            }),
            (g.prototype._clickSymbolCallback = function (e) {
                if (e && e.isMaster()) {
                    var t = this._document.getEditor();
                    if (t) {
                        var n = a.GEditor.getElementPage(e);
                        (n && this._document.getScene().setActivePage(n),
                            t.clearSelection(),
                            t.updateSelection(false, [e]),
                            t.hasSelection() && gDesigner.executeAction(d.ID, void 0, void 0, true));
                    }
                }
            }),
            (g.prototype._dblClickSymbolCallback = function (e) {
                if (e && e.isMaster()) {
                    var t = this._document.getEditor(),
                        n = this._document.getScene(),
                        o = (n.getActivePage(), [e]);
                    (n.visitLinks(e, function (e) {
                        e instanceof GObject.GSymbol && o.push(e);
                    }),
                        t && (t.clearSelection(), t.updateSelection(false, o)));
                }
            }),
            (g.prototype._selectionUpdate = function () {
                var e = gDesigner.canExecuteAction(GCreateSymbolAction.ID),
                    t = this._newSymbolButton.hasClass("g-disabled");
                e && t ? this._newSymbolButton.removeClass("g-disabled") : e || t || this._newSymbolButton.addClass("g-disabled");
            }),
            (g.prototype.getTouchTools = function () {
                return [
                    new s.default({
                        id: "symbols",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-newSymbols",
                        panel: ".symbols-container",
                        toolbar: ".symbols-toolbar",
                    }),
                ];
            }),
            (g.prototype.toString = function () {
                return "[Object GSymbolsSidebar]";
            }),
            (module.exports = g));
    };
