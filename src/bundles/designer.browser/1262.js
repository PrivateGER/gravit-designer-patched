module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(328 /* polyfill:Array */), require(96 /* polyfill:JSON */), require(865 /* polyfill:Number */), require(193), require(57), require(3), require(4), require(13));
        var editorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            richTooltip = require(67),
            GTouchTool = _interopRequireDefault(require(340)),
            SidebarEvent = _interopRequireDefault(require(807)),
            dragDeleteIcon = require(1161),
            DragMode = _interopRequireDefault(require(565)),
            GProperties = require(123),
            colorSliderStops = require(1263),
            GEffectsPanel = require(1526),
            ContextMenuContext = require(450);
        const PropertyPanelIds = require(607),
            { SidebarsIds } = require(198 /* SidebarsIds */);
        var mostUsedLabel = null,
            blurLabel = null,
            artisticLabel = null,
            adjustLabel = null,
            distortionLabel = null,
            otherLabel = null,
            shadowLabel = null;
        function GEffectProperties() {
            ((this._elements = []),
                (mostUsedLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.most-used"))),
                (blurLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.blur"))),
                (artisticLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.artistic"))),
                (adjustLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.adjust"))),
                (distortionLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.distortion"))),
                (otherLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.other"))),
                (shadowLabel = GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.shadow"))),
                effectDefinitions || (effectDefinitions = buildEffectDefinitions()));
        }
        (GObject.GObject.inherit(GEffectProperties, GProperties),
            (GEffectProperties.EngCat = (e) =>
                e === mostUsedLabel
                    ? "MostUsed"
                    : e === blurLabel
                      ? "Blur"
                      : e === artisticLabel
                        ? "Artistic"
                        : e === adjustLabel
                          ? "Adjust"
                          : e === distortionLabel
                            ? "Distortion"
                            : e === otherLabel
                              ? "Other"
                              : "Shadow"),
            (GEffectProperties.prototype._panel = null),
            (GEffectProperties.prototype._toolbar = null),
            (GEffectProperties.prototype._document = null),
            (GEffectProperties.prototype._elements = null),
            (GEffectProperties.prototype._addEffectMenu = null),
            (GEffectProperties.prototype._effectsPanel = null),
            (GEffectProperties.prototype._disableFx = null),
            (GEffectProperties.prototype._defaultEffects = [GObject.GDropShadowEffect, GObject.GInnerShadowEffect, GObject.GBlurEffect, GObject.GGLColorAdjustEffect]),
            (GEffectProperties.prototype._styleEditorChange = false),
            (GEffectProperties.prototype._styleEdOn = false),
            (GEffectProperties.prototype._ownChange = false),
            (GEffectProperties.prototype._chooserElem = null),
            (GEffectProperties.prototype.init = function (panelElement, toolbarElement) {
                ((this._toolbar = toolbarElement.addClass("list-toolbar effects-toolbar")),
                    this._createAddEffectMenu(),
                    (this._panel = panelElement.addClass("effects-properties-panel")),
                    this.setTouchTools([
                        new GTouchTool.default({
                            id: "effect",
                            icon: "gravit-icon-touch-effect-panel",
                            panel: this._panel,
                            toolbar: this._toolbar,
                            panelWidth: "368px",
                        }),
                    ]));
                var n = this;
                ($("<label></label>")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "title")))
                    .appendTo(this._toolbar),
                    this._toolbar.append(
                        $("<button></button>")
                            .append($("<span></span>").addClass("gravit-icon-plus"))
                            .append($("<span></span>").addClass("gravit-icon-touch-plus"))
                            .on("click", function () {
                                (gDesigner.stats("effects_open_effectsmenu", "main"), n._openEffectsMenu(this));
                            })
                            .gRichTooltip(
                                richTooltip.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.add-effect-tooltip-title")),
                                    description: GObject.GLocale.get(
                                        new GObject.GLocaleKey("GEffectProperties", "text.add-effect-tooltip-description")
                                    ),
                                    learnMore: "/docs/effects/",
                                })
                            )
                    ),
                    (this._effectsPanel = $("<div></div>")
                        .addClass("effects-panel")
                        .append($("<div></div>").addClass("effects"))
                        .appendTo(this._panel)));
                for (
                    var o = function (e, t) {
                            var o = e;
                            (function () {
                                (gDesigner.stats(
                                    "effects_add_effectsmenu",
                                    (e && GObject.GLocale.getValue((t && t.i18n) || e, "name", "unknown", 0)) || "unkn"
                                ),
                                    editorModule.GEditor.tryRunTransaction(
                                        this._elements[0],
                                        function () {
                                            for (var e = 0; e < this._elements.length; ++e) {
                                                var t = new o();
                                                (this._validateInsertation(this._elements[e].getEffects(), t) &&
                                                    this._elements[e].getEffects().appendChild(t),
                                                    n._addEffectMenu.close());
                                                const i = gDesigner.getRightSidebars().getSidebar(SidebarsIds.GInspectorSidebar);
                                                i.trigger(new SidebarEvent.default(SidebarEvent.default.Type.ChildAdded, i));
                                            }
                                        }.bind(this),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.add"))
                                    ));
                            }).bind(this)();
                        }.bind(this),
                        r = 0;
                    r < effectDefinitions.length;
                    ++r
                ) {
                    var d = effectDefinitions[r];
                    $.inArray(d.clazz, this._defaultEffects) > -1 && this._createDefaultEffect(false, d, o);
                }
                (this._createDefaultEffect(true),
                    gDesigner
                        .getWorkspace()
                        .getStyleEdManager()
                        .addEventListener(editorModule.GStyleEdManager.EditorEvent, this._styleEditorEventHandler, this),
                    this._panel.data("contextmenu", true));
            }),
            (GEffectProperties.prototype._openEffectsMenu = function (anchorElement) {
                this._addEffectMenu.open(anchorElement);
            }),
            (GEffectProperties.prototype.update = function (document, elements, options) {
                if (this._styleEditorChange) return ((this._styleEditorChange = false), true);
                if (this._ownChange) return true;
                if (
                    (this._chooserElem && this._chooserElem.gPatternChooser("close"),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                        this._document.getScene().removeEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                        this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        (this._document = null),
                        (this._elements = null),
                        this._invalidateEffects()),
                    (this._elements = []),
                    document && elements && elements.length)
                ) {
                    for (var o = 0; o < elements.length; ++o)
                        elements[o].hasMixin(GObject.GStylable) &&
                            elements[o].getStylePropertySets().indexOf(GObject.GStylable.PropertySet.Effects) >= 0 &&
                            this._elements.push(elements[o]);
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document.getScene().addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                            this._document.getScene().addEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._invalidateEffects(options),
                            true
                        );
                }
                return false;
            }),
            (GEffectProperties.prototype._styleEditorEventHandler = function (event) {
                this._styleEdOn && event.type == editorModule.GStyleEdManager.EditorEventType.PrepareModifiedEvent && (this._styleEditorChange = true);
            }),
            (GEffectProperties.prototype._afterInsert = function (event) {
                event.node instanceof GObject.GStylable.Effect &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    (this._insertEffect(event.node), this._updateToolbar());
            }),
            (GEffectProperties.prototype._beforeRemove = function (event) {
                event.node instanceof GObject.GStylable.Effect &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    (this._removeEffect(event.node), this._updateToolbar());
            }),
            (GEffectProperties.prototype._afterPropertiesChange = function (event) {
                (!event.temporary || event.node instanceof GObject.GOverlayEffect) &&
                    event.node instanceof GObject.GStylable.Effect &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    this._updateEffect(event.node);
            }),
            (GEffectProperties.prototype._iterateEqualEffects = function (effect, callback, matchAll) {
                for (var o = effect.getOwnerStylable(), i = effect.getParent().getIndexOfChild(effect), r = 0; r < this._elements.length; ++r)
                    if (!o || this._elements[r] !== o || matchAll)
                        for (var s = this._elements[r].getEffects(), l = s.getFirstChild(); null !== l; l = l.getNext())
                            (l !== effect || matchAll) &&
                                ((GObject.GUtil.equals(l, effect) && !matchAll) || (l.constructor === effect.constructor && s.getIndexOfChild(l) === i)) &&
                                callback(l);
            }),
            (GEffectProperties.prototype._insertEffect = function (effect, options) {
                var n = this,
                    o = null,
                    s = null,
                    l = null,
                    p = 0,
                    g = 0,
                    h = null,
                    v = function () {
                        editorModule.GEditor.tryRunTransaction(
                            effect,
                            function () {
                                (this._iterateEqualEffects(effect, function (t) {
                                    t.setProperty("cl", !effect.getProperty("cl"));
                                }),
                                    effect.setProperty("cl", !effect.getProperty("cl")));
                            }.bind(this),
                            GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.toggle-collapse"))
                        );
                    }.bind(this),
                    _ = function (t) {
                        (t.stopPropagation(),
                            editorModule.GEditor.tryRunTransaction(
                                effect,
                                function () {
                                    (this._iterateEqualEffects(effect, function (t) {
                                        t.setProperty("vs", !effect.getProperty("vs"));
                                    }),
                                        effect.setProperty("vs", !effect.getProperty("vs")));
                                }.bind(this),
                                GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.toggle-visibility"))
                            ));
                    }.bind(this),
                    b = function (t) {
                        var n = effectDefinitions.find((t) => effect instanceof t.clazz);
                        (gDesigner.stats("effects_delete_effect", GObject.GLocale.getValue((n && n.i18n) || effect, "name", effect.getNodeName(), 666)),
                            t.stopPropagation(),
                            editorModule.GEditor.tryRunTransaction(
                                effect,
                                function () {
                                    (this._iterateEqualEffects(effect, function (e) {
                                        e.getParent().removeChild(e);
                                    }),
                                        effect.getParent().removeChild(effect),
                                        gDesigner.setMouseOverContext(null));
                                }.bind(this),
                                GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.remove"))
                            ));
                        const o = gDesigner.getRightSidebars().getSidebar(SidebarsIds.GInspectorSidebar);
                        o.trigger(new SidebarEvent.default(SidebarEvent.default.Type.ChildRemoved, o));
                    }.bind(this),
                    w = null,
                    C = effect.getPrevious();
                C &&
                    this._effectsPanel.find(".effect-block").each(function (e, t) {
                        var n = $(t);
                        if (n.data("effect") === C) return ((w = n), false);
                    });
                var x = getEffectDefinition(effect),
                    S = $("<div/>").addClass("g-drop-indicator"),
                    E = $("<div></div>").addClass("effect-header").addClass("g-cursor-hand-open"),
                    P = $("<div></div>")
                        .addClass("effect-block")
                        .attr("data-drag-mode", DragMode.default.PRESS_AND_HOLD)
                        .data("effect", effect)
                        .attr("draggable", "true")
                        .on("mousedown", function (e) {
                            ((dragAllowed =
                                $(e.target).hasClass("effect-title") ||
                                $(e.target).hasClass("gravit-icon-drag-indicator") ||
                                $(e.target).hasClass("effect-header")),
                                $(e.target).closest(".effect-block").toggleClass("g-draggable-disabled", !dragAllowed));
                        })
                        .on("click", function (e) {
                            var t = $(e.target).parents(".effect-block");
                            (t.children().addClass("selected"), t.siblings().children().removeClass("selected"));
                        })
                        .on("mousedown", (e) => {
                            h = e.originalEvent.target;
                        })
                        .on("dragstart", function (e) {
                            var t = h || e.target;
                            if (!dragAllowed || (gDesigner.isTouchEnabled() && !$(t).closest(".effect-header").length))
                                return (e.preventDefault(), void e.stopPropagation());
                            var c = $(e.target).closest(".effect-block"),
                                d = c.offset(),
                                u = e.originalEvent;
                            ((o = gDragImage()).addClass("drag-delete gravit-icon-trash"),
                                (s = n._panel.offset()),
                                (l = n._effectsPanel.outerHeight()),
                                (p = e.clientX - d.left),
                                (g = e.clientY - d.top),
                                u.stopPropagation(),
                                (draggedEffect = c.data("effect")),
                                (u.dataTransfer.effectAllowed = "move"),
                                u.dataTransfer.setData("text/plain", "dummy_data"),
                                n._effectsPanel.find(".effect-block").each(function (e, t) {
                                    $(t).append(
                                        $("<div></div>")
                                            .addClass("grid-drag-overlay")
                                            .on("dragenter", function () {
                                                var e = $(this.parentNode).data("effect");
                                                if (isValidDropTarget(this.parentNode)) {
                                                    if (
                                                        (u.preventDefault(),
                                                        u.stopPropagation(),
                                                        (u.dataTransfer.dropEffect = "move"),
                                                        draggedEffect && e && draggedEffect.getParent() === e.getParent())
                                                    ) {
                                                        var t = draggedEffect.getParent(),
                                                            n = t.getIndexOfChild(draggedEffect),
                                                            o = t.getIndexOfChild(e);
                                                        n !== o &&
                                                            (n < o ? S.insertBefore(this.parentNode) : S.insertAfter(this.parentNode));
                                                    }
                                                } else S.remove();
                                            })
                                            .on("dragleave", function () {
                                                isValidDropTarget(this.parentNode) && $(this).parent().find(".g-drop-indicator").remove();
                                            })
                                            .on("dragover", function (e) {
                                                var t = e.originalEvent;
                                                isValidDropTarget(this.parentNode) &&
                                                    (t.preventDefault(), t.stopPropagation(), (t.dataTransfer.dropEffect = "move"));
                                            })
                                            .on("drop", function (e) {
                                                var t = $(this.parentNode).closest(".effect-block").data("effect");
                                                if (
                                                    (n._panel.find(".g-drop-indicator").remove(),
                                                    n._panel.find(".grid-drag-overlay").remove(),
                                                    draggedEffect && t && draggedEffect.getParent() === t.getParent())
                                                ) {
                                                    var o = draggedEffect.getParent(),
                                                        s = o.getIndexOfChild(draggedEffect),
                                                        l = o.getIndexOfChild(t);
                                                    editorModule.GEditor.tryRunTransaction(
                                                        o,
                                                        function () {
                                                            if (GPlatform.GPlatform.modifiers.shiftKey) {
                                                                var e = draggedEffect.clone();
                                                                o.insertChild(e, s < l ? t.getNext() : t);
                                                            } else s !== l && (o.removeChild(draggedEffect), o.insertChild(draggedEffect, s < l ? t.getNext() : t));
                                                        },
                                                        GPlatform.GPlatform.modifiers.shiftKey
                                                            ? GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.duplicate"))
                                                            : GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.move"))
                                                    );
                                                }
                                                draggedEffect = null;
                                            })
                                    );
                                }));
                        })
                        .on("drag", function (e) {
                            (0, dragDeleteIcon.handleDragForDeleteIcon)(e, o, s, l, p, g);
                        })
                        .on("dragend", function (e) {
                            var t = e.originalEvent;
                            $(e.target).closest(".effect-block");
                            (n._panel.find(".g-drop-indicator").remove(),
                                n._panel.find(".grid-drag-overlay").remove(),
                                o && o.css("display", "none"),
                                (o = null),
                                t.stopPropagation(),
                                draggedEffect &&
                                    editorModule.GEditor.tryRunTransaction(
                                        n._elements[0],
                                        function () {
                                            var e = [];
                                            (n._iterateEqualEffects(
                                                draggedEffect,
                                                function (t) {
                                                    e.push(t);
                                                },
                                                true
                                            ),
                                                GObject.GUtil.each(e, function (e, t) {
                                                    t.getParent().removeChild(t);
                                                }));
                                        },
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.remove"))
                                    ));
                        })
                        .append(
                            E.append(
                                $("<div></div>").addClass("gravit-icon-drag-indicator g-cursor-hand-open gravit-icon-touch-drag-indicator")
                            )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-title g-cursor-hand-open")
                                        .append($("<label></label>").append($("<span></span>").text(effect.getNodeNameTranslated())))
                                )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-icon effect-visibility normal")
                                        .on("click", function (e) {
                                            e.stopPropagation();
                                            var t = $(this).find("span").hasClass("gravit-icon-hide");
                                            (gDesigner.stats("effects_toggle_visibility", t ? "hidden" : "visible"),
                                                $(this)
                                                    .find("span")
                                                    .removeClass("gravit-icon-" + (t ? "hide" : "display")),
                                                $(this)
                                                    .find("span")
                                                    .addClass("gravit-icon-" + (t ? "display" : "hide")),
                                                _(e));
                                        })
                                        .append($("<span></span>").addClass("gravit-icon-" + (effect.getProperty("vs") ? "display" : "hide")))
                                )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-icon effect-delete normal")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.remove")))
                                        .on("click", b)
                                        .append($("<span></span>").addClass("gravit-icon-trash"))
                                )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-icon effect-setting touch")
                                        .attr("data-action", "stroke-settings")
                                        .append($("<span></span>").addClass("gravit-icon-touch-settings"))
                                        .on(
                                            "click",
                                            function (e) {
                                                ((e.data = { context: ContextMenuContext.EffectPropertyPanel }), P.trigger("contextmenu", [e]));
                                            }.bind(this)
                                        )
                                )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-icon effect-delete touch")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.remove")))
                                        .on("click", b)
                                        .append($("<span></span>").addClass("gravit-icon-touch-trash"))
                                )
                                .append(
                                    $("<div></div>")
                                        .addClass("effect-icon effect-visibility touch")
                                        .on("click", function (e) {
                                            e.stopPropagation();
                                            var t = $(this).find("span").hasClass("gravit-icon-touch-hide");
                                            (gDesigner.stats("effects_toggle_visibility", t ? "hidden" : "visible"),
                                                $(this)
                                                    .find("span")
                                                    .removeClass("gravit-icon-touch-" + (t ? "hide" : "show")),
                                                $(this)
                                                    .find("span")
                                                    .addClass("gravit-icon-touch-" + (t ? "show" : "hide")),
                                                _(e));
                                        })
                                        .append($("<span></span>").addClass("gravit-icon-touch-" + (effect.getProperty("vs") ? "show" : "hide")))
                                )
                        );
                if (x.createSettings) {
                    var D = function (t, n, o, i) {
                            if (o)
                                (this._iterateEqualEffects(effect, function (e) {
                                    e.setProperties(t, n, false, false, true);
                                }),
                                    effect.setProperties(t, n, false, false, true));
                            else {
                                if (!this._document) return;
                                gDesigner.stats("effects_assign_effectproperty", GObject.GLocale.getValue(x.i18n, "name", effect.getNodeName(), 666));
                                var r = null;
                                if (i) {
                                    var s = effect.getParent().getIndexOfChild(effect);
                                    r = $.extend({ effectIndex: s }, i);
                                }
                                this._ownChange = true;
                                var l = this._document.getEditor();
                                l.beginTransaction();
                                try {
                                    (this._iterateEqualEffects(effect, function (e) {
                                        e.setProperties(t, n);
                                    }),
                                        effect.setProperties(t, n));
                                } finally {
                                    (l.commitTransaction(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.change-properties")),
                                        r
                                    ),
                                        (this._ownChange = false));
                                }
                            }
                        }.bind(this),
                        L = x.createSettings.call(this, effect, D);
                    if (L) {
                        var I = $("<div></div>").addClass("effect-settings");
                        (L.addClass("content"), P.append(I.append(L)));
                    }
                }
                (w && w.length > 0 ? P.insertBefore(w) : P.appendTo(this._effectsPanel.find(".effects")),
                    E.gAccordion("init", ".effect-settings:last", "label").on("change", function () {
                        (gDesigner.stats("effects_toggle_collapse"), v());
                    }),
                    P.contextmenu({ context: ContextMenuContext.EffectPropertyPanel }, function (e, t) {
                        (e = t || e).preventDefault();
                        var n = $(this).data("effect");
                        $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", {
                            previousEvent: e,
                            data: { effect: n },
                        });
                    }),
                    P.on("mouseenter", (t) => {
                        (this._document && this._document.updateActiveStylesList("Effect", effect),
                            gDesigner.setMouseOverContext(
                                PropertyPanelIds.EffectPropertiesPanel,
                                t,
                                function (e) {
                                    var t = this._panel.find(".copy-info-overlay").eq(0),
                                        n = e && $(e.target).closest(".effect-block"),
                                        o = (n && n.height()) || 0,
                                        i = (n && n.position().top) || 0,
                                        r = o ? i + o / 2 : i,
                                        s = $("<span/>")
                                            .addClass("copy-info-overlay")
                                            .css({ top: r })
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.copy-effect")));
                                    (t && t.remove(),
                                        this._panel.append(s),
                                        setTimeout(() => {
                                            s.animate({ opacity: 0, top: "+=20" }, 500, s.remove);
                                        }, 1e3));
                                }.bind(this)
                            ),
                            this._panel.on("mousemove.check-context", (e) => {
                                var t = this._panel.outerHeight(),
                                    n = this._panel.offset();
                                e.clientY > n.top + t - 2 &&
                                    (gDesigner.setMouseOverContext(null, null, null), this._panel.off("mousemove.check-context"));
                            }));
                    }),
                    P.on("mouseleave", () => {
                        (this._panel.off("mousemove.check-context"),
                            this._document && this._document.updateActiveStylesList("Effect", null),
                            gDesigner.setMouseOverContext(null, null, null));
                    }),
                    this._updateEffect(effect, options));
            }),
            (GEffectProperties.prototype._updateEffect = function (effect, options) {
                this._effectsPanel.find(".effect-block").each(function (n, o) {
                    var r = $(o);
                    if (r.data("effect") === effect) {
                        getEffectDefinition(effect);
                        if (
                            effect instanceof GObject.GOverlayEffect ||
                            effect instanceof GObject.GDropShadowEffect ||
                            effect instanceof GObject.GInnerShadowEffect ||
                            effect instanceof GObject.GCurvedShadowEffect ||
                            effect instanceof GObject.GContactShadowEffect ||
                            effect instanceof GObject.GLongShadowEffect
                        )
                            if (
                                (r
                                    .find('[data-property="pat"]')
                                    .gPatternChooser("setPattern", effect.getProperty("pat", false, false, true))
                                    .gPatternChooser("value", effect.getProperty("pat", false, false, true))
                                    .gPatternChooser("opacity", effect.getProperty("opc", false, false, true)),
                                r
                                    .find('[data-property="opc"]')
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * effect.getProperty("opc", false, false, true))),
                                options &&
                                    (options.evtType == editorModule.GEditor.ModifiedEvent.Type.Undo || options.evtType == editorModule.GEditor.ModifiedEvent.Type.Redo) &&
                                    options.chooserOn &&
                                    null != options.effectIndex)
                            )
                                effect.getParent().getIndexOfChild(effect) == options.effectIndex &&
                                    r
                                        .find('[data-property="pat"]')
                                        .find(".preview")
                                        .trigger("click", null != options.activeStopIdx ? options.activeStopIdx : null);
                        var s = effect.getProperty("vs"),
                            l = effect.getProperty("ly"),
                            c = effect.getProperty("cl");
                        (r.toggleClass("g-selected", effect.hasFlag(GObject.GNode.Flag.Selected)),
                            r.find(".effect-title input[type=checkbox]").prop("checked", s),
                            r.find(".effect-header").gAccordion("toggleOpen", !c));
                        var d = r.find(".effect-settings");
                        if (
                            (d.css("display", c ? "none" : ""),
                            effect instanceof GObject.GBlurEffect &&
                                d.find('[data-property="r"]:not(.g-input-slider)').gUnitBox("value", new GObject.GLength(effect.getProperty("r"))),
                            effect instanceof GObject.GWebGLEffect)
                        ) {
                            var u = effect.getProperty("shp");
                            for (var p in u) {
                                var g = u[p];
                                if ("number" == typeof g) {
                                    var h = d.find("[data-property=" + p + "]:not(.g-input-slider)");
                                    h.gUnitBox("options").hasOwnProperty("unit") &&
                                        h.gUnitBox("value", new GObject.GLength(g, GObject.GLength.Unit.PT));
                                }
                            }
                        }
                        return (
                            effect instanceof GObject.GDropShadowEffect &&
                                (d.find('[data-property="r"]').gUnitBox("value", new GObject.GLength(effect.getProperty("r"))),
                                d.find('[data-property="x"]').gUnitBox("value", new GObject.GLength(effect.getProperty("x"))),
                                d.find('[data-property="y"]').gUnitBox("value", new GObject.GLength(effect.getProperty("y")))),
                            r
                                .find(".effect-layer")
                                .attr(
                                    "data-title",
                                    GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.applies-to")) +
                                        " " +
                                        GObject.GLocale.get(GObject.GStylable.StyleLayerName[l || ""])
                                )
                                .find("> span")
                                .toggleClass("gravit-icon-circle", !l)
                                .toggleClass("gravit-icon-fill", l === GObject.GStylable.StyleLayer.Fill)
                                .toggleClass("gravit-icon-stroke", l === GObject.GStylable.StyleLayer.Border),
                            false
                        );
                    }
                });
            }),
            (GEffectProperties.prototype._removeEffect = function (effect) {
                this._effectsPanel.find(".effect-block").each(function (t, n) {
                    var o = $(n);
                    if (o.data("effect") === effect) return (o.remove(), false);
                });
            }),
            (GEffectProperties.prototype._invalidateEffects = function (options) {
                if ((this._effectsPanel.find(".effects").empty(), this._elements && this._elements.length))
                    for (var t = this._elements[0].getEffects().getFirstChild(); null !== t; t = t.getNext())
                        t instanceof GObject.GStylable.Effect && this._insertEffect(t, options);
                this._updateToolbar();
            }),
            (GEffectProperties.prototype._createAddEffectMenu = function () {
                this._addEffectMenu = new GEffectsPanel(GEffectProperties.EngCat);
                var e = this._addEffectMenu,
                    t = e.createSelector(),
                    n = this,
                    o = function (e, t) {
                        var o = e;
                        this._elements[0].getScene();
                        (function () {
                            (gDesigner.stats(
                                "effects_add_panelbutton",
                                (e && GObject.GLocale.getValue((t && t.i18n) || e, "name", "unknown", 0)) || "unkn"
                            ),
                                editorModule.GEditor.tryRunTransaction(
                                    this._elements[0],
                                    function () {
                                        for (var e = 0; e < this._elements.length; ++e) {
                                            var t = new o();
                                            (this._validateInsertation(this._elements[e].getEffects(), t) &&
                                                this._elements[e].getEffects().appendChild(t),
                                                n._addEffectMenu.close());
                                        }
                                    }.bind(this),
                                    GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "action.add"))
                                ),
                                $(this._toolbar).gAccordion("toggleOpen", true),
                                $(this._toolbar).gAccordion("init", $(this._panel)));
                            const r = gDesigner.getRightSidebars().getSidebar(SidebarsIds.GInspectorSidebar);
                            r.trigger(new SidebarEvent.default(SidebarEvent.default.Type.ChildAdded, r));
                        }).bind(this)();
                    }.bind(this),
                    r = {};
                r[mostUsedLabel] = new Array();
                var s = $("<option></option>").attr({ value: mostUsedLabel }).append(mostUsedLabel);
                t.append(s);
                for (var l = [], d = 0; d < effectDefinitions.length; ++d) {
                    var u = effectDefinitions[d];
                    if (!u.hidden) {
                        u.cb = o;
                        var p = u.mostUsed,
                            g = u.category;
                        if (g) {
                            if (!r[g]) {
                                r[g] = new Array();
                                s = $("<option></option>").attr({ value: g }).append(g);
                                l.push(s);
                            }
                            r[g].push(u);
                        }
                        p && r[mostUsedLabel].push(u);
                    }
                }
                l.sort(function (e, t) {
                    return $(e).attr("value") === GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.other")) ||
                        $(e).attr("value") > $(t).attr("value")
                        ? 1
                        : $(t).attr("value") === GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.other")) ||
                            $(t).attr("value") > $(e).attr("value")
                          ? -1
                          : 0;
                });
                for (d = 0; d < l.length; ++d) t.append(l[d]);
                (t.on("change", function (t) {
                    (gDesigner.stats("effects_choose_type", GEffectProperties.EngCat(this.value)), e.addItems(r[this.value]));
                }),
                    e.addItems(r[mostUsedLabel]));
            }),
            (GEffectProperties.prototype._validateInsertation = function (effectsNode, newEffect) {
                if (newEffect.isSingleton())
                    for (var n = GObject.GObject.getTypeId(newEffect), o = effectsNode.getFirstChild(); null !== o; o = o.getNext())
                        if (GObject.GObject.getTypeId(o) === n) return false;
                return true;
            }),
            (GEffectProperties.prototype._createDefaultEffect = function (isMoreButton, effectDef, addEffect) {
                var o = function (o) {
                        isMoreButton ? (gDesigner.stats("effects_open_effectsmenu", "more"), this._openEffectsMenu(o)) : addEffect(effectDef.clazz, effectDef);
                    }.bind(this),
                    i = $("<span></span>")
                        .text(isMoreButton ? GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.more")) : GObject.GLocale.getValue(effectDef.i18n, "name"))
                        .addClass("effects-default-label"),
                    r = $("<span>+</span>");
                $("<div></div>")
                    .addClass("effects-default")
                    .append(i)
                    .append(r)
                    .on("click", function () {
                        o(this);
                    })
                    .appendTo(this._panel);
            }),
            (GEffectProperties.prototype._updateToolbar = function () {
                var e = this._panel.find(".effect-block").length > 0 || this._panel.find(".effects-default").length > 0;
                this._toolbar.toggleClass("empty-list", !e);
            }),
            (GEffectProperties.prototype.toString = function () {
                return "[Object GEffectProperties]";
            }));
        var dragAllowed = false,
            draggedEffect = null;
        function isValidDropTarget(blockElement) {
            if (draggedEffect) {
                var t = $(blockElement).data("effect");
                if (t && (t !== draggedEffect || GPlatform.GPlatform.modifiers.shiftKey)) return draggedEffect.getParent() === t.getParent();
            }
            return false;
        }
        function createWebGLEffectSettings(effect, updateProperty, subEffect) {
            var o = subEffect || effect,
                i = o.getProperty.bind(o),
                r = (this._document.getScene(), this._document.getEditor()),
                s = i("shp"),
                l = GObject.GNode.getClassFromId(GObject.GObject.getTypeId(o)).RANGES || fxRanges,
                c = this,
                d = $("<div></div>");
            for (var u in s) {
                var p = s[u];
                if (-1 !== ["contrast", "brightness", "hue", "saturation"].indexOf(u)) {
                    var h = l[u],
                        f = 100 * p;
                    isNaN(f) || (f = GObject.GUtil.formatNumber(f, 0));
                    var m = 100 * h[0],
                        y = 100 * h[1],
                        v = colorSliderStops.DefaultStops.Hue;
                    if ("hue" === u)
                        (o instanceof GObject.GGLRecolourEffect ? ((m = 0), (y = 360)) : ((m = -180), (y = 180)),
                            (v = colorSliderStops.DefaultStops.Hue),
                            (f = GObject.GMath.normalizeValue(p, h[0], h[1], m, y)));
                    else if (-1 !== ["contrast", "brightness"].indexOf(u)) v = colorSliderStops.DefaultStops.Luminosity;
                    else if ("saturation" === u && ((v = colorSliderStops.DefaultStops.Saturation(0)), o instanceof GObject.GGLRecolourEffect)) {
                        var _ = GObject.GMath.normalizeValue(s.hue, h[0], h[1], 0, 360);
                        v = colorSliderStops.DefaultStops.Saturation(_);
                    }
                    var b = function (e, t, n) {
                        if ("hue" === t && o instanceof GObject.GGLRecolourEffect) {
                            var i = $(n).closest(".effect-settings").find('.g-input-slider[data-property="saturation"]'),
                                r = i.gColorSlider("value");
                            i.empty()
                                .gColorSlider({
                                    min: 100 * h[0],
                                    max: 100 * h[1],
                                    stops: colorSliderStops.DefaultStops.Saturation(e),
                                })
                                .gColorSlider("value", r)
                                .trigger("input");
                        }
                    };
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", u)),
                            columns: [
                                {
                                    width: "75%",
                                    content: $("<div>")
                                        .attr("data-property", u)
                                        .gColorSlider({ min: m, max: y, stops: v, maxDecimal: 0 })
                                        .gColorSlider("value", f)
                                        .on("input", function (e) {
                                            var n = $(e.target).data().property,
                                                o = $(e.target).gColorSlider("value"),
                                                r = o,
                                                s = $(e.target).gColorSlider("minValue"),
                                                l = $(e.target).gColorSlider("maxValue");
                                            ((o = GObject.GMath.normalizeValue(o, s, l, h[0], h[1])), b(r, n, e.target));
                                            var c = i("shp");
                                            if (c[n] !== o) {
                                                var d = JSON.parse(JSON.stringify(c));
                                                ((d[n] = o), updateProperty(["shp"], [d]));
                                            }
                                            $(e.target)
                                                .closest(".effect-settings")
                                                .find("[data-property=" + n + "]:not(.g-input-slider)")
                                                .val(r)
                                                .trigger("change");
                                        }),
                                },
                                {
                                    width: "40px",
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", u)
                                        .val(f)
                                        .on("change", function (e) {
                                            var n = $(e.target).data().property,
                                                r = Number(
                                                    o.propertyInverseTransform(n, parseFloat($(e.target).gInputBox("value"))).toFixed(3)
                                                ),
                                                s = i("shp"),
                                                l = $(this)
                                                    .parents(".effect-settings")
                                                    .find(".g-input-slider[data-property=" + n + "]");
                                            (l.gColorSlider("value") != r && l.gColorSlider("value", r), b(r, n, e.target));
                                            var c = l.gColorSlider("minValue"),
                                                d = l.gColorSlider("maxValue");
                                            if (((r = GObject.GMath.normalizeValue(r, c, d, h[0], h[1])), s && s[n] !== r)) {
                                                var u = JSON.parse(JSON.stringify(s));
                                                ((u[n] = r), updateProperty(["shp"], [u]));
                                            }
                                        })
                                        .gInputBox({
                                            minValue: m,
                                            maxValue: y,
                                            postfix: "hue" === u ? "°" : "%",
                                            incrementValue: 1,
                                        }),
                                },
                            ],
                        })
                        .appendTo(d);
                } else if ("number" == typeof p) {
                    f = new GObject.GLength(p, GObject.GLength.Unit.PT);
                    h = l[u];
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", u)),
                            columns: [
                                {
                                    width: "75%",
                                    content: $("<div/>")
                                        .gInputSlider({
                                            min: h[0],
                                            max: h[1],
                                            step: 0.002 * Math.abs(h[1] - h[0]),
                                        })
                                        .attr("data-property", u)
                                        .on("mousedown", function () {
                                            (r.hideSelection(),
                                                $(document).one("mouseup", function () {
                                                    r.resetHideSelection();
                                                }));
                                        })
                                        .gInputSlider("value", Number(o.propertyInverseTransform(u, p).toFixed(3)))
                                        .on("input", function (e) {
                                            var n = $(e.target),
                                                r = n.data().property,
                                                s = GObject.GLength.parseEquation($(this).gInputSlider("value")),
                                                l = 0;
                                            (s && (l = s.toPoint()), (l = Number(o.propertyTransform(r, l).toFixed(3))));
                                            var c = i("shp");
                                            if (null !== l && "number" == typeof l && c[r] !== l) {
                                                var d = JSON.parse(JSON.stringify(c));
                                                ((d[r] = l), updateProperty(["shp"], [d], true));
                                            }
                                            n.closest(".effect-settings")
                                                .find("[data-property=" + r + "]:not(.g-input-slider)")
                                                .val(l)
                                                .trigger("change");
                                        })
                                        .on("change", function (e) {
                                            var t = $(e.target),
                                                n = t.data().property,
                                                i = GObject.GLength.parseEquation($(this).gInputSlider("value")),
                                                r = 0;
                                            (i && (r = i.toPoint()),
                                                (r = Number(o.propertyTransform(n, r).toFixed(3))),
                                                t
                                                    .closest(".effect-settings")
                                                    .find("[data-property=" + n + "]:not(.g-input-slider)")
                                                    .val(r)
                                                    .trigger("change"));
                                        }),
                                },
                                {
                                    width: "40px",
                                    content: $("<input>")
                                        .attr("data-property", u)
                                        .on("change", function (e) {
                                            var n = $(e.target).data().property,
                                                a = $(this).gUnitBox("value"),
                                                r = 0;
                                            a && (r = a.toPoint());
                                            var s = Number(o.propertyInverseTransform(n, r).toFixed(3)),
                                                l = i("shp"),
                                                c = $(this)
                                                    .parents(".effect-settings")
                                                    .find("[data-property=" + n + "].g-input-slider");
                                            if (
                                                (c.gInputSlider("value") != s && c.gInputSlider("value", s),
                                                null !== r && "number" == typeof r && l[n] !== r)
                                            ) {
                                                var d = JSON.parse(JSON.stringify(l));
                                                ((d[n] = r), updateProperty(["shp"], [d]));
                                            }
                                        })
                                        .gUnitBox({
                                            minValue: h[0],
                                            maxValue: h[1],
                                            incrementValue: 0.002 * Math.abs(h[1] - h[0]),
                                            source: "effects",
                                        })
                                        .gUnitBox("value", f),
                                },
                            ],
                        })
                        .appendTo(d);
                } else if (p instanceof Array && 3 === p.length) {
                    var w = void 0,
                        C = [GObject.GColor];
                    (s.opacity && "object" == typeof s.opacity && "opacity" === s.opacity.type && ((w = s.opacity.value), C.push()),
                        $("<div></div>")
                            .gPropertyRow({
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", u)),
                                columns: [
                                    {
                                        width: "50px",
                                        content: $("<div></div>")
                                            .gPatternChooser({ types: C })
                                            .gPatternChooser("value", new GObject.GRGBColor(p))
                                            .gPatternChooser("opacity", w)
                                            .on("chooseropen", function () {
                                                (c._document.getEditor().hideSelection(), (c._chooserElem = $(this)));
                                            })
                                            .on("chooserclose", function (e, t, n) {
                                                (c._document && c._document.getEditor().resetHideSelection(), (c._chooserElem = null));
                                            })
                                            .on("patternchange", function (e, n, o, a, r) {
                                                var s = i("shp"),
                                                    l = JSON.parse(JSON.stringify(s));
                                                (void 0 !== n && (l.color = n.getValue()),
                                                    "number" == typeof o &&
                                                        s.opacity &&
                                                        "object" == typeof s.opacity &&
                                                        "opacity" === s.opacity.type &&
                                                        (l.opacity.value = o));
                                                var c = null;
                                                (r && (c = { chooserOn: true }), updateProperty(["shp"], [l], a, c));
                                            }),
                                    },
                                ],
                            })
                            .appendTo(d));
                } else if ("object" == typeof p && "dropdown" === p.type) {
                    h = l[u];
                    for (
                        var x = $("<select></select>")
                                .attr("data-property", u)
                                .on("change", function (e) {
                                    var n = $(e.target).data().property,
                                        o = $(e.target).val(),
                                        a = i("shp");
                                    if (a && (!a[n] || a[n].value !== o)) {
                                        var r = JSON.parse(JSON.stringify(a));
                                        ((r[n].value = o), updateProperty(["shp"], [r]));
                                    }
                                }),
                            S = 0;
                        S < h.length;
                        S++
                    )
                        $("<option></option>")
                            .attr("value", S)
                            .text(h[S] instanceof GObject.GLocaleKey ? GObject.GLocale.get(h[S]) : h[S])
                            .appendTo(x);
                    (x.val(p.value),
                        $("<div></div>")
                            .gPropertyRow({
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", u)),
                                columns: [{ width: "100%", content: x }],
                            })
                            .appendTo(d));
                } else
                    "boolean" == typeof p &&
                        $("<div></div>")
                            .gPropertyRow({
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", u)),
                                columns: [
                                    {
                                        width: "20px",
                                        content: $("<label></label>")
                                            .addClass("g-switch")
                                            .append(
                                                $("<input>")
                                                    .attr("type", "checkbox")
                                                    .attr("data-property", u)
                                                    .prop("checked", p)
                                                    .on("change", function (e) {
                                                        var n = $(e.target).data().property,
                                                            o = $(this).is(":checked"),
                                                            a = i("shp");
                                                        if (a[n] !== o) {
                                                            var r = JSON.parse(JSON.stringify(a));
                                                            ((r[n] = o), updateProperty(["shp"], [r]));
                                                        }
                                                    })
                                            )
                                            .append($("<div></div>")),
                                    },
                                ],
                            })
                            .appendTo(d);
            }
            return d;
        }
        function createShadowSettings(effect, updateProperty, subEffect) {
            this._document.getScene();
            var o = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                i = o("x"),
                r = o("y"),
                s = new GObject.GLength(o("r"), GObject.GLength.Unit.PT),
                l = o("pat"),
                c = o("opc"),
                d = this,
                u = [0, 200],
                p = effect.RANGES;
            return (
                p && p.r && (u = p.r),
                $("<div></div>").append(
                    $("<div></div>")
                        .addClass("touch-effects-shadow")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "20%",
                                    label: "X",
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", "x")
                                        .gUnitBox({ source: "effects" })
                                        .gUnitBox("value", new GObject.GLength(i, GObject.GLength.Unit.PT))
                                        .on("change", function () {
                                            var e = $(this).gUnitBox("value"),
                                                n = e ? e.toUnit(GObject.GLength.Unit.PT) : null;
                                            null !== n && "number" == typeof n && updateProperty(["x"], [n]);
                                        }),
                                },
                                {
                                    width: "20%",
                                    label: "Y",
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", "y")
                                        .gUnitBox({ source: "effects" })
                                        .gUnitBox("value", new GObject.GLength(r, GObject.GLength.Unit.PT))
                                        .on("change", function () {
                                            var e = $(this).gUnitBox("value"),
                                                n = e ? e.toUnit(GObject.GLength.Unit.PT) : null;
                                            null !== n && "number" == typeof n && updateProperty(["y"], [n]);
                                        }),
                                },
                                {
                                    width: "20%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.blur")),
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", "r")
                                        .gUnitBox({
                                            minValue: u[0],
                                            maxValue: u[1],
                                            source: "effects",
                                        })
                                        .gUnitBox("value", s)
                                        .on("change", function (e) {
                                            var n = $(this).gUnitBox("value"),
                                                o = n ? n.toUnit(GObject.GLength.Unit.PT) : null;
                                            null !== o && updateProperty(["r"], [o]);
                                        }),
                                },
                                {
                                    width: "20%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", "opc")
                                        .on("change", function (e) {
                                            var n = GObject.GLength.parseEquationValue($(e.target).gInputBox("value")) / 100;
                                            (updateProperty(["opc"], [n]),
                                                $(e.target)
                                                    .parents(".effect-settings")
                                                    .find('[data-property="pat"]')
                                                    .gPatternChooser("opacity", n));
                                        })
                                        .gInputBox({
                                            minValue: 0,
                                            maxValue: 100,
                                            incrementValue: gDesigner.getOpacityIncrement(),
                                            postfix: "%",
                                        })
                                        .gInputBox("value", GObject.GUtil.formatOpacity(100 * c)),
                                },
                                {
                                    width: "20%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                                    content: $("<div></div>")
                                        .attr("data-property", "pat")
                                        .gPatternChooser({ types: [GObject.GColor, GObject.GGradient] })
                                        .gPatternChooser("value", l)
                                        .gPatternChooser("opacity", c)
                                        .on("chooseropen", function () {
                                            (d._document.getEditor().hideSelection(), (d._chooserElem = $(this)));
                                        })
                                        .on("chooserclose", function (e, t, n) {
                                            (d._document && d._document.getEditor().resetHideSelection(), (d._chooserElem = null));
                                        })
                                        .on("patternchange", function (e, n, o, i, r, s) {
                                            var l = [],
                                                c = [];
                                            (void 0 !== n && (l.push("pat"), c.push(n)),
                                                "number" == typeof o &&
                                                    (l.push("opc"),
                                                    c.push(o),
                                                    $(e.target)
                                                        .parents(".effect-settings")
                                                        .find('[data-property="opc"]')
                                                        .gInputBox("value", GObject.GUtil.formatOpacity(100 * o))));
                                            var d = null;
                                            (r && ((d = { chooserOn: true }), null != s && (d.activeStopIdx = s)), updateProperty(l, c, i, d));
                                        }),
                                },
                            ],
                        })
                )
            );
        }
        function createCurvedShadowSettings(effect, updateProperty, subEffect) {
            this._document.getScene();
            var o = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                i = o("a"),
                r = o("s"),
                s = o("l"),
                l = o("b"),
                c = o("c"),
                d = o("pat"),
                u = o("opc"),
                p = this._document.getEditor(),
                g = $("<div></div>"),
                h = this;
            function f(e, n, o, i, r, s, l, c, d) {
                var u,
                    g = $("<input>")
                        .attr("type", "text")
                        .attr("data-property", n)
                        .val(o)
                        .on("change", function (e) {
                            var o = GObject.GLength.parseEquationValue($(e.target).gInputBox("value"));
                            i && (o = $(this).gUnitBox("value").toUnit(GObject.GLength.Unit.PT));
                            var l = $(this)
                                .parents(".effect-settings")
                                .find('[data-property="' + n + '"].g-input-slider');
                            (l.gInputSlider("value") != o && l.gInputSlider("value", o),
                                null !== o && "number" == typeof o && o >= r && o <= s && updateProperty([n], [o]));
                        });
                return (
                    i
                        ? ((u = new GObject.GLength(o, GObject.GLength.Unit.PT)),
                          g.gUnitBox({ minValue: r, maxValue: s, source: "effects" }).gUnitBox("value", u))
                        : g
                              .gInputBox({
                                  minValue: r,
                                  maxValue: s,
                                  postfix: c || "",
                                  incrementValue: (s - r) / 100,
                              })
                              .gInputBox("value", o),
                    $("<div></div>").gPropertyRow({
                        columns: [
                            {
                                label: e,
                                width: "75%",
                                content: $("<div>")
                                    .gInputSlider({
                                        type: "range",
                                        maxDecimal: d,
                                        min: r,
                                        max: s,
                                        step: l || (s - r) / 100,
                                    })
                                    .gInputSlider("value", o)
                                    .attr("data-property", n)
                                    .on("mousedown", function () {
                                        (p.hideSelection(),
                                            $(document).one("mouseup", function () {
                                                p.resetHideSelection();
                                            }));
                                    })
                                    .on("input", function (e) {
                                        var o = $(this),
                                            i = parseFloat(o.gInputSlider("value"));
                                        (updateProperty([n], [i], true),
                                            o
                                                .parents(".effect-settings")
                                                .find('[data-property="' + n + '"]:not(.g-input-slider)')
                                                .val(o.gInputSlider("value")));
                                    })
                                    .on("change", function (e) {
                                        var t = $(this),
                                            o = t.gInputSlider("value");
                                        t.parents(".effect-settings")
                                            .find('[data-property="' + n + '"]:not(.g-input-slider)')
                                            .val(o)
                                            .trigger("change");
                                    }),
                            },
                            { width: "25%", content: g },
                        ],
                    })
                );
            }
            return (
                g.append(f(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.bend")), "b", l, true, -60, 60, null, "", 1)),
                g.append(f(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.softness")), "s", r, false, 0, 1, null, "", 2)),
                g.append(f(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.radius")), "l", s, false, 0, 50, null, "", 1)),
                g.append(f(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.coverage")), "c", c, false, 0, 1, null, "", 2)),
                g.append(f(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")), "a", i, false, 0, 360, 1, "°")),
                $("<div></div>")
                    .addClass("touch-effects-shadow")
                    .gPropertyRow({
                        columns: [
                            {
                                width: "50%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                                content: $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "opc")
                                    .on("change", function (e) {
                                        var n = GObject.GLength.parseEquationValue($(e.target).gInputBox("value")) / 100;
                                        (updateProperty(["opc"], [n]),
                                            $(e.target)
                                                .parents(".effect-settings")
                                                .find('[data-property="pat"]')
                                                .gPatternChooser("opacity", n));
                                    })
                                    .gInputBox({
                                        minValue: 0,
                                        maxValue: 100,
                                        incrementValue: gDesigner.getOpacityIncrement(),
                                        postfix: "%",
                                    })
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * u)),
                            },
                            {
                                width: "20%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                                content: $("<div></div>")
                                    .attr("data-property", "pat")
                                    .gPatternChooser({ types: [GObject.GColor, GObject.GGradient] })
                                    .gPatternChooser("value", d)
                                    .gPatternChooser("opacity", u)
                                    .on("chooseropen", function () {
                                        (h._document.getEditor().hideSelection(), (h._chooserElem = $(this)));
                                    })
                                    .on("chooserclose", function (e, t, n) {
                                        (h._document && h._document.getEditor().resetHideSelection(), (h._chooserElem = null));
                                    })
                                    .on("patternchange", function (e, n, o, i, r, s) {
                                        var l = [],
                                            c = [];
                                        (void 0 !== n && (l.push("pat"), c.push(n)),
                                            "number" == typeof o &&
                                                (l.push("opc"),
                                                c.push(o),
                                                $(e.target)
                                                    .parents(".effect-settings")
                                                    .find('[data-property="opc"]')
                                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * o))));
                                        var d = null;
                                        (r && ((d = { chooserOn: true }), null != s && (d.activeStopIdx = s)), updateProperty(l, c, i, d));
                                    }),
                            },
                        ],
                    })
                    .appendTo(g),
                g
            );
        }
        function createContactShadowSettings(effect, updateProperty, subEffect) {
            this._document.getScene();
            var o = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                i = o("a"),
                r = new GObject.GLength(o("r"), GObject.GLength.Unit.PT),
                s = new GObject.GLength(o("o"), GObject.GLength.Unit.PT),
                l = o("pat"),
                c = o("opc"),
                d = this,
                u = [5, 200],
                p = effect.RANGES;
            p && p.r && (u = p.r);
            var g = function (e) {
                return "r" === e
                    ? $("<input>")
                          .attr("type", "text")
                          .gUnitBox({ minValue: u[0], maxValue: u[1], source: "effects" })
                          .gUnitBox("value", r)
                          .on("change", function (e) {
                              updateProperty(["r"], [$(this).gUnitBox("value").toUnit(GObject.GLength.Unit.PT)]);
                          })
                    : "a" === e
                      ? $("<input>")
                            .attr("type", "text")
                            .gInputBox({ minValue: 5, maxValue: 35, postfix: "°" })
                            .gInputBox("value", i)
                            .on("change", function (e) {
                                updateProperty(["a"], [GObject.GLength.parseEquationValue($(e.target).gInputBox("value"))]);
                            })
                      : "o" === e
                        ? $("<input>")
                              .attr("type", "text")
                              .gUnitBox({ source: "effects" })
                              .gUnitBox("value", s)
                              .on("change", function (e) {
                                  updateProperty(["o"], [$(this).gUnitBox("value").toUnit(GObject.GLength.Unit.PT)]);
                              })
                        : "opc" === e
                          ? $("<input>")
                                .attr("type", "text")
                                .attr("data-property", "opc")
                                .on("change", function (e) {
                                    var n = GObject.GLength.parseEquationValue($(e.target).gInputBox("value")) / 100;
                                    (updateProperty(["opc"], [n]),
                                        $(e.target)
                                            .parents(".effect-settings")
                                            .find('[data-property="pat"]')
                                            .gPatternChooser("opacity", n));
                                })
                                .gInputBox({
                                    minValue: 0,
                                    maxValue: 100,
                                    incrementValue: gDesigner.getOpacityIncrement(),
                                    postfix: "%",
                                })
                                .gInputBox("value", GObject.GUtil.formatOpacity(100 * c))
                          : "pat" === e
                            ? $("<div></div>")
                                  .attr("data-property", "pat")
                                  .gPatternChooser({ types: [GObject.GColor] })
                                  .gPatternChooser("value", l)
                                  .gPatternChooser("opacity", c)
                                  .on("chooseropen", function () {
                                      (d._document.getEditor().hideSelection(), (d._chooserElem = $(this)));
                                  })
                                  .on("chooserclose", function (e, t, n) {
                                      (d._document && d._document.getEditor().resetHideSelection(), (d._chooserElem = null));
                                  })
                                  .on("patternchange", function (e, n, o, i, r) {
                                      var s = [],
                                          l = [];
                                      (void 0 !== n && (s.push("pat"), l.push(n)),
                                          "number" == typeof o &&
                                              (s.push("opc"),
                                              l.push(o),
                                              $(e.target)
                                                  .parents(".effect-settings")
                                                  .find('[data-property="opc"]')
                                                  .gInputBox("value", GObject.GUtil.formatOpacity(100 * o))));
                                      var c = null;
                                      (r && (c = { chooserOn: true }), updateProperty(s, l, i, c));
                                  })
                            : void 0;
            };
            return $("<div></div>").append(
                $("<div></div>").gPropertyRow({
                    columns: [
                        {
                            width: "20%",
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.offset")),
                            content: g("o"),
                        },
                        {
                            width: "20%",
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")),
                            content: g("a"),
                        },
                        {
                            width: "20%",
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.blur")),
                            content: g("r"),
                        },
                        {
                            width: "20%",
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                            content: g("opc"),
                        },
                        {
                            width: "20%",
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                            content: g("pat"),
                        },
                    ],
                })
            );
        }
        function createLongShadowSettings(effect, updateProperty, subEffect) {
            this._document.getScene();
            var o = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                i = o("a"),
                r = new GObject.GLength(o("l"), GObject.GLength.Unit.PT),
                s = o("pat"),
                l = o("opc"),
                c = o("den"),
                d = o("fdm"),
                u = this,
                p = function (e) {
                    return "l" === e
                        ? $("<input>")
                              .attr("type", "text")
                              .gUnitBox({ minValue: 0, source: "effects" })
                              .gUnitBox("value", r)
                              .on("change", function (e) {
                                  updateProperty(["l"], [$(this).gUnitBox("value").toUnit(GObject.GLength.Unit.PT)]);
                              })
                        : "a" === e
                          ? $("<input>")
                                .attr("type", "text")
                                .gInputBox({ minValue: -180, maxValue: 180, postfix: "°" })
                                .gInputBox("value", GObject.GUtil.formatNumber(Math.round(GObject.GMath.toDegrees(i)), 1))
                                .on("change", function (e) {
                                    updateProperty(["a"], [GObject.GMath.toRadians(GObject.GLength.parseEquationValue($(e.target).gInputBox("value")))]);
                                })
                          : "opc" === e
                            ? $("<input>")
                                  .attr("type", "text")
                                  .attr("data-property", "opc")
                                  .on("change", function (e) {
                                      var n = GObject.GLength.parseEquationValue($(e.target).gInputBox("value")) / 100;
                                      (updateProperty(["opc"], [n]),
                                          $(e.target)
                                              .parents(".effect-settings")
                                              .find('[data-property="pat"]')
                                              .gPatternChooser("opacity", n));
                                  })
                                  .gInputBox({ minValue: 0, maxValue: 100, postfix: "%" })
                                  .gInputBox("value", GObject.GUtil.formatOpacity(100 * l))
                            : "den" === e
                              ? $("<input>")
                                    .attr("type", "text")
                                    .on("change", function (e) {
                                        var n = $(e.target).gInputBox("value") / 100;
                                        updateProperty(["den"], [n]);
                                    })
                                    .gInputBox({
                                        minValue: 5,
                                        maxValue: 100,
                                        incrementValue: 1,
                                        postfix: "%",
                                    })
                                    .gInputBox("value", GObject.GUtil.formatNumber(100 * c))
                              : "fdm" === e
                                ? $("<label></label>")
                                      .addClass("g-switch")
                                      .append(
                                          $("<input>")
                                              .attr("type", "checkbox")
                                              .prop("checked", d)
                                              .on("change", function (e) {
                                                  updateProperty(["fdm"], [$(this).is(":checked")]);
                                              })
                                      )
                                      .append($("<div></div>"))
                                : "pat" === e
                                  ? $("<div></div>")
                                        .attr("data-property", "pat")
                                        .gPatternChooser({ types: [GObject.GColor, GObject.GGradient] })
                                        .gPatternChooser("value", s)
                                        .gPatternChooser("opacity", l)
                                        .on("chooseropen", function () {
                                            (u._document.getEditor().hideSelection(), (u._chooserElem = $(this)));
                                        })
                                        .on("chooserclose", function (e, t, n) {
                                            (u._document && u._document.getEditor().resetHideSelection(), (u._chooserElem = null));
                                        })
                                        .on("patternchange", function (e, n, o, i, r, s) {
                                            var l = [],
                                                c = [];
                                            (void 0 !== n && (l.push("pat"), c.push(n)),
                                                "number" == typeof o &&
                                                    (l.push("opc"),
                                                    c.push(o),
                                                    $(e.target)
                                                        .parents(".effect-settings")
                                                        .find('[data-property="opc"]')
                                                        .gInputBox("value", GObject.GUtil.formatOpacity(100 * o))));
                                            var d = null;
                                            (r && ((d = { chooserOn: true }), null != s && (d.activeStopIdx = s)), updateProperty(l, c, i, d));
                                        })
                                  : void 0;
                };
            return $("<div></div>")
                .append(
                    $("<div></div>").gPropertyRow({
                        columns: [
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")),
                                content: p("a"),
                            },
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.length")),
                                content: p("l"),
                            },
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.density")),
                                content: p("den"),
                            },
                        ],
                    })
                )
                .append(
                    $("<div></div>").gPropertyRow({
                        columns: [
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                                content: p("pat"),
                            },
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                                content: p("opc"),
                            },
                            {
                                width: "33%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.fade")),
                                content: p("fdm"),
                            },
                        ],
                    })
                );
        }
        function createBlurSettings(effect, updateProperty, subEffect) {
            this._document.getScene();
            var o = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                i = this._document.getEditor(),
                r = new GObject.GLength(o("r"), GObject.GLength.Unit.PT),
                s = o("b"),
                l = $("<div></div>");
            return (
                $("<div></div>")
                    .gPropertyRow({
                        columns: [
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.radius")),
                                width: "75%",
                                content: $("<div>")
                                    .gInputSlider({
                                        maxDecimal: 1,
                                        min: "0",
                                        max: new GObject.GLength(webglContext ? 50 : 10, GObject.GLength.Unit.PT).toUnit(GObject.GLength.Unit.PX),
                                        step: "0.1",
                                    })
                                    .gInputSlider("value", o("r"))
                                    .attr("data-property", "r")
                                    .on("mousedown", function () {
                                        (i.hideSelection(),
                                            $(document).one("mouseup", function () {
                                                i.resetHideSelection();
                                            }));
                                    })
                                    .on("input", function (e) {
                                        var n = $(this),
                                            o = parseFloat(n.gInputSlider("value"));
                                        (updateProperty(["r"], [o], true),
                                            n
                                                .parents(".effect-settings")
                                                .find('[data-property="r"]:not(.g-input-slider)')
                                                .val(n.gInputSlider("value")));
                                    })
                                    .on("change", function (e) {
                                        var t = $(this),
                                            n = parseFloat(t.gInputSlider("value"));
                                        t.parents(".effect-settings")
                                            .find('[data-property="r"]:not(.g-input-slider)')
                                            .val(n)
                                            .trigger("change");
                                    }),
                            },
                            {
                                width: "25%",
                                content: $("<input>")
                                    .attr("data-property", "r")
                                    .gUnitBox({ source: "effects" })
                                    .gUnitBox("value", r)
                                    .on("change", function (e) {
                                        var n = $(this).gUnitBox("value"),
                                            o = n ? n.toUnit(GObject.GLength.Unit.PT) : null,
                                            i = $(this).parents(".effect-settings").find('[data-property="r"].g-input-slider');
                                        (parseFloat(i.gInputSlider("value")) != o && i.gInputSlider("value", o),
                                            null !== o && "number" == typeof o && o >= 0 && o <= 254 && updateProperty(["r"], [o]));
                                    }),
                            },
                        ],
                    })
                    .appendTo(l),
                $("<div></div>")
                    .gPropertyRow({
                        columns: [
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GWebGLEffect", "clip")),
                                width: "25%",
                                content: $("<label></label>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .prop("checked", s)
                                            .on("change", function (e) {
                                                updateProperty(["b"], [$(this).is(":checked")]);
                                            })
                                    )
                                    .append($("<div></div>")),
                            },
                        ],
                    })
                    .appendTo(l),
                l
            );
        }
        function createOverlaySettings(effect, updateProperty, subEffect) {
            var o = this._document.getEditor(),
                i = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                r = i("pat"),
                s = i("opc"),
                l = i("alm"),
                c = this;
            return $("<div></div>").append(
                $("<div></div>")
                    .addClass("touch-effects-overlay")
                    .gPropertyRow({
                        columns: [
                            {
                                width: "20%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                                content: $("<div></div>")
                                    .attr("data-property", "pat")
                                    .gPatternChooser({ types: [GObject.GColor, GObject.GGradient] })
                                    .gPatternChooser("value", r)
                                    .gPatternChooser("opacity", s)
                                    .on("chooseropen", function () {
                                        (o.hideSelection(),
                                            gDesigner.getWorkspace().getStyleEdManager().updateEditor(effect, "pat", false),
                                            (c._styleEdOn = true),
                                            (c._chooserElem = $(this)));
                                    })
                                    .on("chooserclose", function (e, t, n) {
                                        (gDesigner.getWorkspace().getStyleEdManager().getOverlayLock(n)
                                            ? t()
                                            : ((c._styleEdOn = false),
                                              gDesigner.getWorkspace().getStyleEdManager().deactivateEditor(),
                                              o.resetHideSelection()),
                                            (c._chooserElem = null));
                                    })
                                    .on("patternchange", function (e, n, o, i, a, r) {
                                        var s = [],
                                            l = [];
                                        (void 0 !== n && (s.push("pat"), l.push(n)), "number" == typeof o && (s.push("opc"), l.push(o)));
                                        var c = null;
                                        (a && ((c = { chooserOn: true }), null != r && (c.activeStopIdx = r)), updateProperty(s, l, i, c));
                                    }),
                            },
                            { width: "20%" },
                            {
                                width: "20%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                                content: $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "opc")
                                    .on("change", function (e) {
                                        var n = $(e.target).gInputBox("value") / 100;
                                        updateProperty(["opc"], [n]);
                                    })
                                    .gInputBox({
                                        minValue: 0,
                                        maxValue: 100,
                                        incrementValue: gDesigner.getOpacityIncrement(),
                                        postfix: "%",
                                    })
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * s)),
                            },
                            { width: "20%" },
                            {
                                width: "20%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.blend")),
                                content: $("<div/>")
                                    .css({ display: "flex", justifyContent: "center" })
                                    .append(
                                        $("<label></label>")
                                            .addClass("g-switch")
                                            .css({ width: "20px", alignSelf: "center" })
                                            .append(
                                                $("<input>")
                                                    .attr("type", "checkbox")
                                                    .prop("checked", l)
                                                    .on("change", function (e) {
                                                        if ($(this).is(":checked")) {
                                                            var n = new GObject.GLinearGradient([
                                                                {
                                                                    color: GObject.GRGBColor.BLACK,
                                                                    position: 0,
                                                                    opacity: 1,
                                                                },
                                                                {
                                                                    color: GObject.GRGBColor.WHITE,
                                                                    position: 1,
                                                                    opacity: 0,
                                                                },
                                                            ]);
                                                            updateProperty(["alm", "opc", "pat"], [true, 1, n]);
                                                        } else updateProperty(["alm"], [false]);
                                                    })
                                            )
                                            .append($("<div></div>"))
                                    ),
                            },
                        ],
                    })
            );
        }
        function createColorGradingSettings(effect, updateProperty) {
            return $("<div></div>")
                .append(
                    $("<input>")
                        .attr("type", "file")
                        .attr("accept", ".acv")
                        .css({ position: "absolute", left: "-10000px" })
                        .on("change", function (e) {
                            gDesigner.stats("effects_change_colorgrading");
                            var n = $(e.target)[0].files;
                            if (n && n.length && (n[0] instanceof File || n[0] instanceof Blob)) {
                                var o = new FileReader();
                                ((o.onload = function () {
                                    var e = GObject.GUtil.readACVFile(o.result);
                                    e && updateProperty(["cp"], [e]);
                                }),
                                    o.readAsArrayBuffer(n[0]));
                            }
                        })
                )
                .append(
                    $("<select></select>")
                        .append(
                            $("<option></option>")
                                .attr("value", "")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.none")))
                        )
                        .append(
                            $(
                                '<optgroup label="'.concat(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.grp.instagram")),
                                    '"></optgroup>'
                                )
                            )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "1977")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.1977")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr(
                                            "value",
                                            GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.brannan"))
                                        )
                                        .text("Brannan")
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "Gotham")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.gotham")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "Hefe")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.hefe")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "Lord Kelvin")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.lord-kelvin")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "Nashville")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.nashville")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "X-PRO II")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.color.gradient.opt.x-pro-ii")))
                                )
                        )
                        .on("change", function (e) {
                            var n = $(e.target).val();
                            if ((gDesigner.stats("effects_change_grading", n || "none"), n)) {
                                var o = new XMLHttpRequest();
                                (o.addEventListener("load", function () {
                                    if (200 == o.status && o.response) {
                                        var e = GObject.GUtil.readACVFile(o.response);
                                        e && updateProperty(["cp"], [e]);
                                    }
                                }),
                                    o.open("GET", "assets/data/acv/" + n + ".acv"),
                                    (o.responseType = "arraybuffer"),
                                    o.send(null));
                            } else updateProperty(["cp"], [null]);
                        })
                )
                .append(
                    $("<button></button>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.load-acv")) + "...")
                        .on("click", function (e) {
                            (gDesigner.stats("effects_choose_acv"),
                                $(e.target).parents(".effect-settings").find('input[type="file"]').focus().trigger("click"));
                        })
                );
        }
        function createColorAdjustMultiSettings(effect, updateProperty) {
            for (
                var n = GObject.GObject.getTypeId(effect), o = (GObject.GNode.getClassFromId(n), effect.getFXArray()), i = $("<div></div>"), r = 0;
                r < o.length;
                r++
            )
                for (var s = o[r], l = GObject.GNode.getClassFromId(GObject.GObject.getTypeId(o[r])), c = GObject.GNode.getName(l), d = 0; d < effectDefinitions.length; d++)
                    if (effectDefinitions[d].clazz === l) {
                        i.append(effectDefinitions[d].createSettings.call(this, effect, createPrefixedUpdater(c, updateProperty), s).css("margin-top", "7px"));
                        break;
                    }
            return i;
        }
        function createMirrorSettings(effect, updateProperty, subEffect) {
            var o = this._document.getEditor(),
                i = subEffect ? subEffect.getProperty.bind(subEffect) : effect.getProperty.bind(effect),
                r = i("opc"),
                s = new GObject.GLength(i("pad")),
                l = i("rfh"),
                c = function (e) {
                    return "rfh" === e
                        ? $("<input>")
                              .attr("data-property", e)
                              .attr("type", "text")
                              .on("change", function (n) {
                                  var o = GObject.GLength.parseEquationValue($(n.target).gInputBox("value")) / 100;
                                  updateProperty([e], [o]);
                              })
                              .gInputBox({
                                  minValue: 0,
                                  maxValue: 100,
                                  incrementValue: 10,
                                  slowIncrementValue: 1,
                                  postfix: "%",
                              })
                              .gInputBox("value", 100 * l)
                        : "pad" === e
                          ? $("<input>")
                                .attr("data-property", e)
                                .attr("type", "text")
                                .on("change", function (n) {
                                    var o = $(n.target).gUnitBox("value").getValue();
                                    updateProperty([e], [o]);
                                })
                                .gUnitBox({ minValue: 0, incrementValue: 1, source: "effects" })
                                .gUnitBox("value", s)
                          : "opacity-slider" === e
                            ? $("<div/>")
                                  .attr("data-property", "opc")
                                  .gInputSlider({ type: "range", min: 0, max: 100 })
                                  .on("mousedown", function () {
                                      (o.hideSelection(),
                                          $(document).one("mouseup", function () {
                                              o.resetHideSelection();
                                          }));
                                  })
                                  .on("input", function (e) {
                                      var n = $(e.target),
                                          o = parseInt(n.gInputSlider("value")) / 100;
                                      (updateProperty(["opc"], [o]),
                                          $(e.target)
                                              .parents(".effect-settings")
                                              .find('[type="text"][data-property="opc"]')
                                              .gInputBox("value", GObject.GUtil.formatOpacity(100 * o)));
                                  })
                                  .on("change", function (e) {
                                      updateProperty(["opc"], [parseFloat($(this).gInputSlider("value")) / 100]);
                                  })
                                  .gInputSlider("value", 100 * r)
                            : "opacity-input" === e
                              ? $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "opc")
                                    .on("change", function (e) {
                                        var n = $(this).gInputBox("value");
                                        ($(this)
                                            .parents(".effect-settings")
                                            .find('[data-property="opc"].g-input-slider')
                                            .gInputSlider("value", n),
                                            updateProperty(["opc"], [GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100]));
                                    })
                                    .gInputBox({
                                        minValue: 0,
                                        maxValue: 100,
                                        incrementValue: 5,
                                        postfix: "%",
                                    })
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * r))
                              : void 0;
                };
            return $("<div></div>").gPropertyRow({
                columns: [
                    {
                        width: "auto",
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                        content: $("<div></div>").gPropertyRow({
                            columns: [
                                { width: "auto", content: c("opacity-slider") },
                                {
                                    width: $("body").hasClass("g-touch") ? "60px" : "40px",
                                    content: c("opacity-input"),
                                },
                            ],
                        }),
                    },
                    {
                        width: $("body").hasClass("g-touch") ? "60px" : "40px",
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.padding")),
                        content: c("pad"),
                    },
                    {
                        width: $("body").hasClass("g-touch") ? "60px" : "40px",
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GEffectProperties", "text.height")),
                        content: c("rfh"),
                    },
                ],
            });
        }
        function createPrefixedUpdater(keyPrefix, updateProperty) {
            return function (n, o, i) {
                for (var a = n.slice(), r = o.slice(), s = 0; s < a.length; s++) ((a[s] = keyPrefix + "&" + a[s]), (r[s] = o[s]));
                updateProperty(a, r, i);
            };
        }
        function getEffectDefinition(effectOrClass) {
            var t = null;
            t = effectOrClass instanceof GObject.GStylable.Effect ? effectOrClass.constructor : effectOrClass;
            for (var n = 0; n < effectDefinitions.length; ++n) if (effectDefinitions[n].clazz === t) return effectDefinitions[n];
            throw new Error("Invalid effect/class");
        }
        var webglTestCanvas = document.createElement("canvas"),
            webglContext = null;
        try {
            webglContext = webglTestCanvas.getContext("webgl", { premultipliedAlpha: false }) || webglTestCanvas.getContext("experimental-webgl");
        } catch (e) {
            webglContext = null;
        }
        var effectDefinitions = null,
            buildEffectDefinitions = function () {
                return [
                    {
                        clazz: GObject.GGLBlurEffect,
                        i18n: "GGLBlurEffect",
                        group: "raster",
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-blur-effect",
                    },
                    {
                        clazz: GObject.GBlurEffect,
                        i18n: "GBlurEffect",
                        group: "raster",
                        category: blurLabel,
                        createSettings: createBlurSettings,
                        icon: "gravit-icon-blur-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GGLVignetteEffect,
                        i18n: "GGLVignetteEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-vignette-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GGLColorAdjustEffect,
                        i18n: "GGLColorAdjustEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-adjust-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GGLRecolourEffect,
                        i18n: "GGLRecolourEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-recolour-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GOverlayEffect,
                        i18n: "GOverlayEffect",
                        group: "filter",
                        category: adjustLabel,
                        createSettings: createOverlaySettings,
                        icon: "gravit-icon-overlay-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GMirrorEffect,
                        i18n: "GMirrorEffect",
                        group: "mirror",
                        category: otherLabel,
                        createSettings: createMirrorSettings,
                        icon: "gravit-icon-mirror-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GCurvedShadowEffect,
                        i18n: "GCurvedShadowEffect",
                        group: "raster",
                        category: shadowLabel,
                        createSettings: createCurvedShadowSettings,
                        icon: "gravit-icon-curved-shadow-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GDropShadowEffect,
                        i18n: "GDropShadowEffect",
                        group: "raster",
                        category: shadowLabel,
                        createSettings: createShadowSettings,
                        icon: "gravit-icon-drop-shadow-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GInnerShadowEffect,
                        i18n: "GInnerShadowEffect",
                        group: "raster",
                        category: shadowLabel,
                        createSettings: createShadowSettings,
                        icon: "gravit-icon-inner-shadow-effect",
                        mostUsed: true,
                    },
                    {
                        clazz: GObject.GGLBulgePinchEffect,
                        i18n: "GGLBulgePinchEffect",
                        group: "webgl",
                        category: distortionLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-bulge-effect",
                    },
                    {
                        clazz: GObject.GGLColorHalfToneEffect,
                        i18n: "GGLColorHalfToneEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-half-tone-effect",
                    },
                    {
                        clazz: GObject.GGLDotScreenEffect,
                        i18n: "GGLDotScreenEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-dotscreen-effect",
                    },
                    {
                        clazz: GObject.GGLBrightnessContrastEffect,
                        i18n: "GGLBrightnessContrastEffect",
                        group: "webgl",
                        category: adjustLabel,
                        hidden: true,
                        createSettings: createWebGLEffectSettings,
                    },
                    {
                        clazz: GObject.GGLFisheyeEffect,
                        i18n: "GGLFisheyeEffect",
                        group: "webgl",
                        category: distortionLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-fisheye-effect",
                    },
                    {
                        clazz: GObject.GGLBendEffect,
                        i18n: "GGLBendEffect",
                        group: "webgl",
                        category: distortionLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-bend-effect",
                    },
                    {
                        clazz: GObject.GGLDenoiseEffect,
                        i18n: "GGLDenoiseEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-denoise-effect",
                    },
                    {
                        clazz: GObject.GGLEdgeWorkEffect,
                        i18n: "GGLEdgeWorkEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-edge-work-effect",
                    },
                    {
                        clazz: GObject.GGLHexagonalEffect,
                        i18n: "GGLHexagonalEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-hexagonal-effect",
                    },
                    {
                        clazz: GObject.GGLHueSaturationEffect,
                        i18n: "GGLHueSaturationEffect",
                        group: "webgl",
                        category: adjustLabel,
                        hidden: true,
                        createSettings: createWebGLEffectSettings,
                    },
                    {
                        clazz: GObject.GColorAdjustMultiEffect,
                        i18n: "GColorAdjustMultiEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createColorAdjustMultiSettings,
                        hidden: true,
                    },
                    {
                        clazz: GObject.GGLInkEffect,
                        i18n: "GGLInkEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-ink-effect",
                    },
                    {
                        clazz: GObject.GGLLensBlurEffect,
                        i18n: "GGLLensBlurEffect",
                        group: "webgl",
                        category: blurLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-lens-blur-effect",
                    },
                    {
                        clazz: GObject.GGLNoiseEffect,
                        i18n: "GGLNoiseEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-noise-effect",
                    },
                    {
                        clazz: GObject.GGLSepiaEffect,
                        i18n: "GGLSepiaEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-sepia-effect",
                    },
                    {
                        clazz: GObject.GGLSwirlEffect,
                        i18n: "GGLSwirlEffect",
                        group: "webgl",
                        category: distortionLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-swirl-effect",
                    },
                    {
                        clazz: GObject.GGLTiltShiftEffect,
                        i18n: "GGLTiltShiftEffect",
                        group: "webgl",
                        category: blurLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-tilt-shift-effect",
                    },
                    {
                        clazz: GObject.GGLDrunkEffect,
                        i18n: "GGLDrunkEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-alcohol-effect",
                    },
                    {
                        clazz: GObject.GGLUnsharpMaskEffect,
                        i18n: "GGLUnsharpMaskEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-unsharp-mask-effect",
                    },
                    {
                        clazz: GObject.GGLVibranceEffect,
                        i18n: "GGLVibranceEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-vibrance-effect",
                    },
                    {
                        clazz: GObject.GGLBloomEffect,
                        i18n: "GGLBloomEffect",
                        group: "webgl",
                        category: adjustLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-bloom-effect",
                    },
                    {
                        clazz: GObject.GGLSketchEffect,
                        i18n: "GGLSketchEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-sketch-effect",
                    },
                    {
                        clazz: GObject.GGLToonEffect,
                        i18n: "GGLToonEffect",
                        group: "webgl",
                        category: artisticLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-toon-effect",
                    },
                    {
                        clazz: GObject.GGLZoomBlurEffect,
                        i18n: "GGLZoomBlurEffect",
                        group: "webgl",
                        category: blurLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-zoom-blur-effect",
                    },
                    {
                        clazz: GObject.GGLStrokeLayerEffect,
                        i18n: "GGLStrokeLayerEffect",
                        group: "raster",
                        category: otherLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-stroke-effect",
                    },
                    {
                        clazz: GObject.GGLInnerGlowEffect,
                        i18n: "GGLInnerGlowEffect",
                        group: "raster",
                        category: otherLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-inner-glow-effect",
                    },
                    {
                        clazz: GObject.GGLOuterGlowEffect,
                        i18n: "GGLOuterGlowEffect",
                        group: "raster",
                        category: otherLabel,
                        createSettings: createWebGLEffectSettings,
                        icon: "gravit-icon-outer-glow-effect",
                    },
                    {
                        clazz: GObject.GContactShadowEffect,
                        i18n: "GContactShadowEffect",
                        group: "raster",
                        category: shadowLabel,
                        createSettings: createContactShadowSettings,
                        icon: "gravit-icon-contact-shadow-effect",
                    },
                    {
                        clazz: GObject.GLongShadowEffect,
                        i18n: "GLongShadowEffect",
                        group: "raster",
                        category: shadowLabel,
                        createSettings: createLongShadowSettings,
                        icon: "gravit-icon-long-shadow-effect",
                    },
                    {
                        clazz: GObject.GColorGradingEffect,
                        i18n: "GColorGradingEffect",
                        group: "filter",
                        category: adjustLabel,
                        createSettings: createColorGradingSettings,
                        icon: "gravit-icon-color-grading-effect",
                    },
                ];
            };
        module.exports = GEffectProperties;
    };
