module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(91 /* polyfill:String */), require(4), require(13), require(97), require(26));
        var i = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            l = require(67),
            c = require(1351),
            d = _interopRequireDefault(require(565)),
            u = _interopRequireDefault(require(135)),
            p = require(451 /* GVirtualTree */).GVirtualTree,
            g = require(451 /* GVirtualTree */).GVirtualTreeNodeNamed,
            { VTREE_FREE_HEIGHT, VTREE_FREE_HEIGHT_TOUCH } = require(10 /* designerConfig */),
            m = require(450),
            y = ["name"];
        function v() {}
        function _(e, t, n, o, i) {
            var a = true,
                r = $(this).data("glayerpanel");
            if (r.options.canDropCallback) {
                for (
                    var s = e.id ? T.call(this, e.id) : r.scene ? r.scene.getActivePage() : null,
                        l = n ? T.call(this, n.id) : null,
                        c = [],
                        d = 0;
                    d < o.length;
                    ++d
                )
                    c.push(T.call(this, o[d].id));
                var u = [];
                if ((a = r.options.canDropCallback(s, l, c, u)))
                    for (d = 0; d < u.length; ++d) {
                        var p = u[d];
                        i.push(o[p]);
                    }
            }
            return a;
        }
        function b(e, t, n, o) {
            if (!n || !n.length || !e) return false;
            if (!gDesigner.isEnabledProFeatures()) {
                if ((0, GSaveAction.isSymbolInstance)(e)) return false;
                if (n.some((e) => e instanceof GObject.GSymbol) && (0, GSaveAction.isSymbol)(e)) return false;
            }
            for (var r = true, l = 0; l < n.length && r; ++l)
                (r = !e.isLocked() && n[l].validateInsertion(e, t) && i.GEditor.validateBlockInsertion(e, n[l], t)) && o.push[l];
            return r;
        }
        function w(e, t, n, o) {
            var i = $(this).data("glayerpanel");
            if (i.options.moveCallback) {
                for (
                    var a = e.id ? T.call(this, e.id) : i.scene ? i.scene.getActivePage() : null,
                        r = n ? T.call(this, n.id) : null,
                        s = [],
                        l = 0;
                    l < o.length;
                    ++l
                )
                    s.push(T.call(this, o[l].id));
                i.options.moveCallback(a, r, s);
            }
        }
        function C(e, t, n, o) {
            var i = $(this).data("glayerpanel");
            if (i.options.duplicateCallback) {
                for (
                    var a = e.id ? T.call(this, e.id) : i.scene ? i.scene.getActivePage() : null,
                        r = n ? T.call(this, n.id) : null,
                        s = [],
                        l = 0;
                    l < o.length;
                    ++l
                )
                    s.push(T.call(this, o[l].id));
                i.options.duplicateCallback(a, r, s);
            }
        }
        function x(e) {
            var t = $(this).data("glayerpanel");
            if (t.options.clickCallback) {
                var n = T.call(this, e.id);
                t.options.clickCallback(n);
            }
        }
        function S(e) {
            var t = T.call(this, e.id);
            t && (e.expanded ? t.setFlag(GObject.GNode.Flag.Expanded) : t.removeFlag(GObject.GNode.Flag.Expanded));
        }
        function E(e, t) {
            var n = $(this).data("glayerpanel");
            (n && n.options && n.options.renderer && n.options.renderer(e.id, e.expanded, t), Y.call(this));
        }
        function A(e) {
            var t = $(this);
            e.id === p.COLLAPSE_ID
                ? $(e).addClass(t.data("glayerpanel").options.collapseStyle)
                : e.id === p.EXPAND_ID && $(e).addClass(t.data("glayerpanel").options.expandStyle);
        }
        function T(e) {
            var t = $(this).data("glayerpanel").layersTreeNodeMap[e];
            return t ? t.node : null;
        }
        function G(e) {
            return $(this).data("glayerpanel").layersTreeNodeMap[e];
        }
        function P(e) {
            var t = $(this).data("glayerpanel").layersTreeNodeMapByNodes.get(e);
            return t ? t.treeId : null;
        }
        function D(e) {
            var t = $(this).data("glayerpanel").layersTreeNodeMapByNodes.get(e);
            return t ? t.treeNode : null;
        }
        function L(e) {
            var t = $(this).data("glayerpanel").layersTreeNodeMap,
                n = $(this).data("glayerpanel").layersTreeNodeMapByNodes;
            e.accept(
                function (e) {
                    if (e instanceof GObject.GLayer || e instanceof GObject.GItem) {
                        var o = n.get(e);
                        o && (n.delete(e), (t[o.treeId] = null));
                    }
                }.bind(this)
            );
        }
        function I(e, t, n) {
            var o = $(this).data("glayerpanel"),
                r = G.call(this, e),
                s = r ? r.node : null;
            if (s) {
                var { parentHidden, isHidden, lockType, isOutlined, hasSelection } = (0, c.getLayerOrItemStatus)(s),
                    { container, title, titleGroup } = (0, c.buildLayerItemContainer)(n, s, hasSelection, t);
                r.element = titleGroup;
                var b = this;
                if (
                    (s.hasFlag(GObject.GElement.Flag.PartialLocked) ||
                        titleGroup.attr("draggable", true)
                            .attr("data-drag-mode", d.default.PRESS_AND_HOLD)
                            .on("dragstart", function (e) {
                                if (o.options.startDraggingCallback) {
                                    var t = o.options.startDraggingCallback(s);
                                    if (t && t.length) {
                                        var n = "",
                                            i = t[0].getProperty("name");
                                        (i = i || t[0].getNodeNameTranslated()) && (n = i);
                                        for (var a = 1; a < t.length; ++a)
                                            (i = (i = t[a].getProperty("name")) || t[a].getNodeNameTranslated()) && (n += ", " + i);
                                        n.length && $(title).html(n);
                                        var r = o.vtree,
                                            l = [];
                                        for (a = 0; a < t.length; ++a) {
                                            var c = D.call(b, t[a]);
                                            c && l.push(c);
                                        }
                                        (r.setDragNodes(l),
                                            setTimeout(
                                                function () {
                                                    $(title).html(i);
                                                }.bind(this),
                                                0
                                            ));
                                    } else $(this).attr("draggable", false);
                                }
                            }),
                    !o.blockHighlight)
                ) {
                    var w = s.hasFlag(GObject.GNode.Flag.Highlighted);
                    (w ||
                        t ||
                        !s.hasMixin(GObject.GNode.Container) ||
                        (w = s.acceptChildren(
                            function (e) {
                                return e.hasFlag(GObject.GNode.Flag.Highlighted);
                            },
                            false,
                            true
                        )),
                        container.toggleClass("g-highlighted-row", w));
                }
                !lockType &&
                    gDesigner.getActiveDocument() &&
                    gDesigner.getApplicationManager().isEditingEnabled() &&
                    $(titleGroup).gAutoEdit({
                        textSelector: "> .layer-title",
                        getContainer: function () {
                            return G.call(b, e).element;
                        },
                        submitCallback: function (e) {
                            e &&
                                "" !== e.trim() &&
                                i.GEditor.tryRunTransaction(
                                    s,
                                    function () {
                                        s.setProperty("name", e);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.rename-layer"))
                                );
                        },
                    });
                var C = R(s);
                C &&
                    !C.inSync(s, true) &&
                    $("<span></span>")
                        .addClass("layer-action layer-synchronize gravit-icon-refresh")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.reset-instance")))
                        .on("click", function (e) {
                            (gDesigner.stats("layers_click_symbol-reset"),
                                e.stopPropagation(),
                                i.GEditor.tryRunTransaction(
                                    s,
                                    function () {
                                        C.synchronize(s);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.reset-instance"))
                                ));
                        })
                        .appendTo(container);
                var x = lockType ? "gravit-icon-lock" : "gravit-icon-unlock";
                ((x = gDesigner.isTouchEnabled() ? x + "-small" : x),
                    $("<span></span>")
                        .addClass("layer-action layer-lock " + x)
                        .toggleClass("g-active", !!lockType)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock")))
                        .on("click", function (e) {
                            (e.stopPropagation(), J.toggleLockStatusOfLayerOrItem(s));
                        })
                        .appendTo(container)
                        .gRichTooltip(
                            l.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-lock-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-lock-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/objects/#locking-objects",
                            })
                        ),
                    container.toggleClass("layer-hidden", isHidden));
                var S = isHidden ? "gravit-icon-hide" : "gravit-icon-display";
                if (
                    ((S = gDesigner.isTouchEnabled() ? S + "-small" : S),
                    $("<span></span>")
                        .addClass("layer-action layer-visibility " + S)
                        .toggleClass("g-active", isHidden)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                        .on("click", function (e) {
                            (e.stopPropagation(), J.toggleHideStatusOfLayerOrItem(s));
                        })
                        .appendTo(container)
                        .gRichTooltip(
                            l.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-visibility-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-visibility-tooltip-description")
                                ),
                                learnMore: "/docs/organizing-your-designs/objects/#hiding-objects",
                            })
                        ),
                    s instanceof GObject.GLayer)
                ) {
                    $("<span></span>")
                        .addClass("layer-action layer-outline gravit-icon-" + (isOutlined ? "ellipse" : "circle"))
                        .toggleClass("g-active", isOutlined)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.toggle-outline")))
                        .on("click", function (e) {
                            (gDesigner.stats("layers_toggle_outline"), e.stopPropagation());
                            var t = $(this);
                            parentHidden ||
                                i.GEditor.tryRunTransaction(
                                    s,
                                    function () {
                                        (s.setProperty("otl", !s.getProperty("otl")),
                                            t.toggleClass("gravit-icon-ellipse", s.getProperty("otl")),
                                            t.toggleClass("gravit-icon-circle", !s.getProperty("otl")));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.toggle-outline"))
                                );
                        })
                        .gRichTooltip(
                            l.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-outline-tooltip-title")),
                                learnMore:
                                    "/docs/organizing-your-designs/layer-groups/#extra-properties-of-the-layer-groups",
                            })
                        )
                        .appendTo(container);
                    $("<span></span>")
                        .addClass("layer-color")
                        .gPatternChooser({
                            types: [GObject.GColor],
                            hasOpacity: false,
                            asButton: false,
                            simplified: true,
                        })
                        .gPatternChooser("value", s.getProperty("cls"))
                        .on("patternchange", function (e, t, n, o) {
                            o ||
                                i.GEditor.tryRunTransaction(
                                    s,
                                    function () {
                                        var e = s.getProperty("cls");
                                        (s.setProperty("cls", t),
                                            s.acceptChildren(function (n) {
                                                if (n instanceof GObject.GLayer) {
                                                    var o = n.getProperty("cls");
                                                    GObject.GUtil.equals(o, e) && n.setProperty("cls", t);
                                                }
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.change-layer-color"))
                                );
                        })
                        .on("chooseropen", function () {
                            o.options.patternChooserStatusChangeCallBack(true);
                        })
                        .on("chooserclose", function (e, t, n) {
                            o.options.patternChooserStatusChangeCallBack(false);
                        })
                        .appendTo(container);
                }
                container.contextmenu(
                    { context: m.LayerPanel },
                    function (e) {
                        if ($.inArray(s, gDesigner.getActiveDocument().getEditor().getSelection()) < 0) {
                            var t = $(this).data("glayerpanel");
                            t.options.clickCallback && t.options.clickCallback(s);
                        }
                        $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", e);
                    }.bind(this)
                );
            }
        }
        function k(e, t, n) {
            var o = new g(e);
            return (n && (o.expanded = true), $(this).data("glayerpanel").vtree.insertNodeBefore(t, o), o);
        }
        function O(e, t, n) {
            var o = new g(e);
            return (n && (o.expanded = true), $(this).data("glayerpanel").vtree.appendNode(t, o), o);
        }
        function F(e) {
            $(this).data("glayerpanel").vtree.removeNode(e);
        }
        function R(e) {
            do {
                if (e instanceof GObject.GSymbol) return e.isMaster() ? null : e;
                e = e.getParent();
            } while (e);
            return null;
        }
        function M(e, t) {
            var n = GObject.GUtil.uuid(),
                o = $(this).data("glayerpanel"),
                i = o.vtree;
            if (
                !t &&
                e.getParent() &&
                e.getParent().hasMixin(GObject.GNode.Container) &&
                !(e.getParent() instanceof GObject.GScene) &&
                !(e.getParent() instanceof GObject.GPage) &&
                !P.call(this, e.getParent())
            )
                return;
            i.beginUpdate();
            const r = (function (e) {
                let t = e.getPrevious();
                for (; t && !(t instanceof GObject.GElement); ) t = t.getPrevious();
                return t;
            })(e);
            var s,
                l = r ? D.call(this, r) : null;
            if (l) s = k.call(this, n, l, e.hasFlag(GObject.GNode.Flag.Expanded));
            else {
                var c = e.getParent(),
                    d = !c || c instanceof GObject.GScene || c instanceof GObject.GPage ? null : D.call(this, c);
                s = O.call(this, n, d, e.hasFlag(GObject.GNode.Flag.Expanded));
            }
            if (
                ((o.layersTreeNodeMap[n] = { element: null, node: e, treeNode: s }),
                o.layersTreeNodeMapByNodes.set(e, {
                    element: null,
                    treeNode: s,
                    treeId: n,
                }),
                e.hasMixin(GObject.GNode.Container))
            )
                for (var u = e.getFirstChild(); null !== u; u = u.getNext())
                    (u instanceof GObject.GLayer || u instanceof GObject.GItem) && M.call(this, u, t);
            i.endUpdate();
        }
        function N(e) {
            var t = D.call(this, e);
            t && (F.call(this, t), L.call(this, e));
        }
        function B(e, t) {
            return !e.blockHandlers || !(!e.ignoreBlock || e.ignoreBlock !== t);
        }
        function U(e) {
            $(this).data("glayerpanel");
            var t = e.targetNode;
            if (
                t instanceof GObject.GLayer ||
                (t instanceof GObject.GItem &&
                    !(
                        t instanceof GObject.GPathBase &&
                        t.getParent() &&
                        (t.getParent() instanceof GObject.GPGEdge || t.getParent() instanceof GObject.GCompoundPath.Paths)
                    ))
            )
                switch (e.type) {
                    case GObject.GSymbol.AfterSiblingUpdate.INSERT:
                        M.call(this, t);
                        break;
                    case GObject.GSymbol.AfterSiblingUpdate.REMOVE:
                        N.call(this, t);
                }
        }
        function j(e) {
            B($(this).data("glayerpanel"), e.node) &&
                (e.node instanceof GObject.GLayer ||
                    (e.node instanceof GObject.GItem &&
                        !(
                            e.node instanceof GObject.GPathBase &&
                            e.node.getParent() &&
                            (e.node.getParent() instanceof GObject.GPGEdge || e.node.getParent() instanceof GObject.GCompoundPath.Paths)
                        ) &&
                        !(function (e) {
                            var t = e.getScene();
                            if (t) {
                                var n = e.getPage(),
                                    o = t.getActivePage();
                                if (o && n && n !== o) return true;
                            }
                            return false;
                        })(e.node))) &&
                M.call(this, e.node);
        }
        function K(e) {
            B($(this).data("glayerpanel"), e.node) && (e.node instanceof GObject.GLayer || e.node instanceof GObject.GItem) && N.call(this, e.node);
        }
        function V(e) {
            e.temporary ||
                (!$(this).data("glayerpanel").blockHandlers &&
                    (e.properties.some((e) => y.indexOf(e) >= 0) || R(e.node)) &&
                    (e.node instanceof GObject.GLayer || e.node instanceof GObject.GItem) &&
                    $(this).data("glayerpanel").vtree.requestInvalidation());
        }
        function H() {
            $(this).data("glayerpanel").vtree.requestInvalidation();
        }
        function W(e) {
            "touch" === e.key && J._updateLayout.call(this);
        }
        function z(e) {
            var t = $(this).data("glayerpanel"),
                n = $(this).data("glayerpanel").vtree;
            let { onlyUpdateStyle } = t;
            if (B(t, e.node)) {
                var i = false;
                if (e.node instanceof GObject.GLayer || e.node instanceof GObject.GItem)
                    if (
                        e.flag === GObject.GElement.Flag.Hidden ||
                        e.flag === GObject.GElement.Flag.PartialLocked ||
                        e.flag === GObject.GElement.Flag.FullLocked ||
                        e.flag === GObject.GNode.Flag.Selected ||
                        e.flag === GObject.GNode.Flag.Active
                    ) {
                        var r = e.node.getPage(),
                            s = e.node.getScene(),
                            l = s && s.getActivePage();
                        (l && r && l !== r) || ((i = true), onlyUpdateStyle || (onlyUpdateStyle = e.flag === GObject.GNode.Flag.Active));
                    } else if (!t.blockHighlight && e.flag === GObject.GNode.Flag.Highlighted) {
                        var c = e.node,
                            d = function (e) {
                                var t = D.call(this, e);
                                return t && t.isVisible();
                            }.bind(this);
                        (d(c) || c.findParent(d)) && (i = true);
                    }
                if (
                    gDesigner.getSetting("auto_expand_layers") &&
                    e.flag === GObject.GNode.Flag.Selected &&
                    e.node &&
                    e.node.hasFlag(GObject.GNode.Flag.Selected)
                ) {
                    var u = D.call(this, e.node);
                    u && (n.expandAndFocus(u, i) ? (t.currentFocus = u) : (i = true));
                }
                (e.node instanceof GObject.GPage && e.flag === GObject.GNode.Flag.Active && (X.call(this), q.call(this), (i = false)),
                    i &&
                        (onlyUpdateStyle
                            ? setTimeout((t) => {
                                  Q.call(this, e.node);
                              })
                            : n.requestInvalidation()));
            }
        }
        function q() {
            var e = $(this).data("glayerpanel");
            if ((e.vtree.beginUpdate(), e.scene && e.scene.getActivePage()))
                for (var t = e.scene.getActivePage().getFirstChild(); null !== t; t = t.getNext())
                    (t instanceof GObject.GLayer || t instanceof GObject.GItem) && M.call(this, t, true);
            (e.vtree.endUpdate(), Y.call(this));
        }
        function Y() {
            gDesigner.isTouchEnabled() &&
                $(this)
                    .parent()
                    .css("height", parseInt($(this).find(".vscroller").css("height"), 10) + VTREE_FREE_HEIGHT + "px");
        }
        function X() {
            var e = $(this).data("glayerpanel");
            (e.vtree.clean(), (e.layersTreeNodeMap = {}), (e.layersTreeNodeMapByNodes = new Map()));
        }
        function Q(e) {
            $(this).data("glayerpanel");
            var t = P.call(this, e);
            if (!t) return null;
            var n = G.call(this, t);
            if (!n) return null;
            var o = n.element,
                i = o.parent(),
                r = false;
            if (e.hasMixin(GObject.GNode.Container))
                for (var s = e.getFirstChild(); null !== s && !r; s = s.getNext())
                    s instanceof GObject.GItem && s.hasFlag(GObject.GNode.Flag.Selected) && (r = true);
            (e.getParent() && e instanceof GObject.GItem && Q.call(this, e.getParent()),
                i
                    .toggleClass("g-active", e.hasFlag(GObject.GNode.Flag.Active))
                    .toggleClass("g-selected", e.hasFlag(GObject.GNode.Flag.Selected))
                    .toggleClass("g-has-selection", r),
                o.toggleClass("g-selected", e.hasFlag(GObject.GNode.Flag.Selected)));
        }
        GObject.GObject.inheritAndMix(v, GObject.GObject);
        var J = {
            init: function (e) {
                return (
                    (e = $.extend(
                        {
                            nodeStyle: "layer-row",
                            expandStyle: "layer-arrow gravit-icon-right",
                            collapseStyle: "layer-arrow gravit-icon-down",
                            freeHeight: VTREE_FREE_HEIGHT,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: I.bind(this),
                            expandRenderer: A.bind(this),
                            separatorRenderer: null,
                            canDropCallback: b.bind(this),
                            moveCallback: null,
                            isDuplicateEffectCallback: null,
                            duplicateCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                            patternChooserStatusChangeCallBack: null,
                        },
                        e
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-layer-panel")
                            .data("glayerpanel", {
                                vtree: new p(
                                    this,
                                    E.bind(this),
                                    e.nodeStyle,
                                    e.expandRenderer ? e.expandRenderer : null,
                                    e.expandStyle == e.collapseStyle ? e.expandStyle : null,
                                    e.separatorRenderer ? e.separatorRenderer : null,
                                    e.freeHeight,
                                    e.insertIntoStyle,
                                    _.bind(this),
                                    w.bind(this),
                                    e.isDuplicateEffectCallback,
                                    C.bind(this),
                                    x.bind(this),
                                    S.bind(this),
                                    e.upSeparatorSpan1Style,
                                    e.upSeparatorSpan2Style,
                                    e.downSeparatorSpan1Style,
                                    e.downSeparatorSpan2Style,
                                    false,
                                    15,
                                    21
                                ),
                                options: e,
                                layersTreeNodeMap: {},
                                layersTreeNodeMapByNodes: new Map(),
                                scene: null,
                                currentFocus: null,
                            });
                    })
                );
            },
            refresh: function () {
                $(this).data("glayerpanel").vtree.refresh();
            },
            relayout: function () {
                var e = $(this).data("glayerpanel"),
                    t = e.vtree,
                    n = e.currentFocus;
                (n && t.expandAndFocus(n), t.requestInvalidation());
            },
            scene: function (e) {
                var t = $(this),
                    n = t.data("glayerpanel");
                if (!arguments.length) return n.scene;
                if (e !== n.scene) {
                    if (n.scene && n.scene.hasMixin(GObject.GEventTarget))
                        (n.scene.removeEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                            n.scene.removeEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                            n.scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                            n.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this),
                            n.scene.removeEventListener(GObject.GSymbol.AfterSiblingUpdate, n.afterSiblingUpdate, this),
                            gDesigner.removeEventListener(u.default, n.settingChangedEvent, this),
                            (o = n.scene.getWorkspace()) &&
                                o.getFontManager().removeEventListener(GObject.GFontManager.FontAvailableEvent, n.fontAvailableEvent, this));
                    if ((X.call(this), (n.scene = e), n.scene)) {
                        var o;
                        if (n.scene.hasMixin(GObject.GEventTarget))
                            ((n.afterNodeInsertHandler = j.bind(this)),
                                (n.beforeNodeRemoveHandler = K.bind(this)),
                                (n.afterPropertiesChangeHandler = V.bind(this)),
                                (n.afterFlagChangeHandler = z.bind(this)),
                                (n.afterSiblingUpdate = U.bind(this)),
                                (n.fontAvailableEvent = H.bind(this)),
                                (n.settingChangedEvent = W.bind(this)),
                                n.scene.addEventListener(GObject.GSymbol.AfterSiblingUpdate, n.afterSiblingUpdate, this),
                                n.scene.addEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                                n.scene.addEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                                n.scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                                n.scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this),
                                gDesigner.addEventListener(u.default, n.settingChangedEvent, this),
                                (o = n.scene.getWorkspace()) &&
                                    o.getFontManager().addEventListener(GObject.GFontManager.FontAvailableEvent, n.fontAvailableEvent, this));
                        (q.call(this), J._updateLayout.call(this));
                    }
                }
                return this;
            },
            blockHandlers: function (e) {
                $(this).data("glayerpanel").blockHandlers = !!e;
            },
            onlyUpdateStyle: function (e) {
                $(this).data("glayerpanel").onlyUpdateStyle = !!e;
            },
            ignoreBlock: function (e) {
                $(this).data("glayerpanel").ignoreBlock = e;
            },
            setBlockHighlight: function (e) {
                $(this).data("glayerpanel").blockHighlight = !!e;
            },
            getLastVisitedDroppable: function () {
                return $(this).data("glayerpanel").vtree.getLastVisitedDroppable();
            },
            getTreeNode: function (e) {
                var t = null;
                return ($(this).data("glayerpanel") && (t = D.call(this, e)), t);
            },
            getItem: function (e) {
                return T.call(this, e.id);
            },
            getTitleOfLayer: function (e) {
                return e.children(".layer-title-group");
            },
            getSelected: function () {
                return $(this).children(".g-selected");
            },
            toggleLockStatusOfLayerOrItem: function (e) {
                gDesigner.stats("layers_change_locktype");
                const { parentLockType } = (0, c.getLayerOrItemStatus)(e);
                if (!parentLockType || parentLockType === GObject.GBlock.LockType.Partial) {
                    let n = e.getProperty("lkt");
                    const o = e.getProperty("plkt");
                    if (
                        (n
                            ? o &
                                  (GObject.GBlock.ProgramLck.NoEdit |
                                      GObject.GBlock.ProgramLck.NoMove |
                                      GObject.GBlock.ProgramLck.NoNewChildren |
                                      GObject.GBlock.ProgramLck.NoDelete) || (n = null)
                            : (n = GObject.GBlock.LockType.Full),
                        parentLockType !== GObject.GBlock.LockType.Partial || null !== n)
                    ) {
                        const t = [];
                        if (GPlatform.GPlatform.modifiers.optionKey) {
                            for (let o = e.getParent().getFirstChild(); null != o; o = o.getNext()) {
                                const e = o.getProperty("lkt");
                                n === e || (e === GObject.GBlock.LockType.Full && n === GObject.GBlock.LockType.Partial) || t.push(o);
                            }
                        } else t.push(e);
                        t.length &&
                            i.GEditor.tryRunTransaction(
                                e,
                                function () {
                                    for (let e = 0; e < t.length; ++e)
                                        (n === GObject.GBlock.LockType.Full &&
                                            t[e].accept((e) => {
                                                e.removeFlag(GObject.GNode.Flag.Selected);
                                            }),
                                            t[e].setProperty("lkt", n));
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                            );
                    }
                }
            },
            toggleHideStatusOfLayerOrItem: function (e) {
                gDesigner.stats("layers_toggle_visibility");
                const { parentHidden: t } = (0, c.getLayerOrItemStatus)(e);
                if (!t) {
                    const t = !e.getProperty("vis"),
                        n = [];
                    if (GPlatform.GPlatform.modifiers.optionKey) {
                        for (let o = e.getParent().getFirstChild(); null != o; o = o.getNext()) {
                            const e = o.getProperty("vis");
                            null !== e && e !== t && n.push(o);
                        }
                    } else n.push(e);
                    i.GEditor.tryRunTransaction(
                        e,
                        function () {
                            for (let e = 0; e < n.length; ++e) (n[e].removeFlag(GObject.GNode.Flag.Highlighted), n[e].setProperty("vis", t));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                    );
                }
            },
            resetVTreeRowHeight: function (e) {
                $(this).data("glayerpanel").vtree.resetRowHeight(e);
            },
            getCurrentFocusedNode: function () {
                return $(this).data("glayerpanel").currentFocus;
            },
            setCurrentFocusedNode: function (e) {
                $(this).data("glayerpanel").currentFocus = e;
            },
            _updateLayout: function () {
                const e = $(this).data("glayerpanel"),
                    t = e && e.vtree;
                if (t) {
                    const e = gDesigner.isTouchEnabled();
                    (t.setFreeHeight(e ? VTREE_FREE_HEIGHT_TOUCH : VTREE_FREE_HEIGHT), t.setAnimatedDragEnabled(e));
                }
            },
        };
        ((module.exports = v),
            ($.fn.gLayerPanel = function (e) {
                return J[e]
                    ? J[e].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof e && e
                      ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                      : J.init.apply(this, arguments);
            }));
    };
