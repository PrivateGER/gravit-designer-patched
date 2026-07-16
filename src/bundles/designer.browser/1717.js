module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(19), require(57), require(91), require(4), require(13), require(26));
        var i = require(53),
            GObject = require(1),
            r = (require(15 /* GPlatform */), o(require(565))),
            s = require(67),
            l = o(require(135)),
            c = require(451 /* GVirtualTree */).GVirtualTree,
            d = (require(451 /* GVirtualTree */).GVirtualTreeNode, require(451 /* GVirtualTree */).GVirtualTreeNodeNamed),
            { VTREE_FREE_HEIGHT: u, VTREE_FREE_HEIGHT_TOUCH: p } = require(10 /* designerConfig */),
            g = (require(173), require(450));
        function h() {}
        function f(e, t, n, o, i) {
            var a = true,
                r = $(this).data("gpagepanel");
            if (r.options.canDropCallback) {
                for (
                    var s = e.id ? b.call(this, e.id) : $(this).data("gpagepanel").scene, l = t ? b.call(this, t.id) : null, c = [], d = 0;
                    d < o.length;
                    ++d
                )
                    c.push(b.call(this, o[d].id));
                var u = [];
                if ((a = r.options.canDropCallback(s, l, c, u)))
                    for (d = 0; d < u.length; ++d) {
                        var p = u[d];
                        i.push(o[p]);
                    }
            }
            return a;
        }
        function m(e, t, n, o) {
            if (!n || !n.length || !e) return false;
            var i = true;
            if (gDesigner.getApplicationManager().isEditingEnabled()) {
                for (var a = 0; a < n.length && i; ++a) (i = !e.isLocked() && n[a] && n[a].validateInsertion(e, t)) && o.push[a];
                return i;
            }
        }
        function y(e, t, n, o) {
            var i = $(this).data("gpagepanel");
            if (i.options.moveCallback) {
                for (
                    var a = e.id ? b.call(this, e.id) : $(this).data("gpagepanel").scene, r = t ? b.call(this, t.id) : null, s = [], l = 0;
                    l < o.length;
                    ++l
                )
                    s.push(b.call(this, o[l].id));
                i.options.moveCallback(a, r, s);
            }
        }
        function v(e) {
            var t = $(this).data("gpagepanel");
            if (t.options.clickCallback) {
                var n = b.call(this, e.id);
                t.options.clickCallback(n);
            }
        }
        function _(e, t) {
            var n = $(this).data("gpagepanel");
            (n.options.renderer && n.options.renderer(e.id, t), R.call(this));
        }
        function b(e) {
            var t = $(this).data("gpagepanel").pagesTreeNodeMap[e];
            return t ? t.node : null;
        }
        function w(e) {
            return $(this).data("gpagepanel").pagesTreeNodeMap[e];
        }
        function C(e) {
            var t = $(this).data("gpagepanel").pagesTreeNodeMapByNodes.get(e);
            return t ? t.treeNode : null;
        }
        function x(e) {
            var t = $(this).data("gpagepanel").pagesTreeNodeMap,
                n = $(this).data("gpagepanel").pagesTreeNodeMapByNodes;
            e.accept(
                function (e) {
                    if (e instanceof GObject.GPage) {
                        var o = n.get(e);
                        o && (n.delete(e), (t[o.treeId] = null));
                    }
                }.bind(this)
            );
        }
        function S(e, t) {
            var n = $(this).data("gpagepanel"),
                o = w.call(this, e),
                l = o.node;
            if (l) {
                if (!(l instanceof GObject.GPage)) throw new Error("item not page");
                var c = l.getProperty("lkt"),
                    d = !!l.getSlavePages().length,
                    u = 0 === l.getProperty("w") && 0 === l.getProperty("h"),
                    p = $(t);
                p.attr("draggable", false)
                    .on("mouseenter", function () {
                        l.getProperty("w") && !l.hasFlag(GObject.GElement.Flag.Hidden) && l.setFlag(GObject.GNode.Flag.Highlighted);
                    })
                    .on("mouseleave", function () {
                        l.getProperty("w") && !l.hasFlag(GObject.GElement.Flag.Hidden) && l.removeFlag(GObject.GNode.Flag.Highlighted);
                    });
                var h = $("<span></span>").addClass("page-title-group");
                (h.appendTo(p), (o.element = h));
                var f = l.getProperty("name");
                ((f = f || l.getNodeNameTranslated()), d && !gDesigner.isTouchEnabled() && (f += " (master)"));
                var m = $("<span></span>").html(f);
                m.addClass("page-title").appendTo(h);
                var y = this;
                (l.hasFlag(GObject.GElement.Flag.PartialLocked) ||
                    h
                        .attr("draggable", true)
                        .attr("data-drag-mode", r.default.PRESS_AND_HOLD)
                        .on("dragstart", function (e) {
                            if (n.options.startDraggingCallback) {
                                var t = n.options.startDraggingCallback(l);
                                if (t && t.length) {
                                    $(this).addClass("g-dragging");
                                    var o = "",
                                        i = t[0].getProperty("name");
                                    (i = i || t[0].getNodeNameTranslated()) && (o = i);
                                    for (var a = 1; a < t.length; ++a)
                                        (i = (i = t[a].getProperty("name")) || t[a].getNodeNameTranslated()) && (o += ", " + i);
                                    o.length && $(m).html(o);
                                    var r = n.vtree,
                                        s = [];
                                    for (a = 0; a < t.length; ++a) {
                                        var c = C.call(y, t[a]);
                                        c && s.push(c);
                                    }
                                    (r.setDragNodes(s),
                                        setTimeout(
                                            function () {
                                                ($(this).removeClass("g-dragging"), $(m).html(f));
                                            }.bind(this),
                                            0
                                        ));
                                } else $(this).attr("draggable", false);
                            }
                        }),
                    p.toggleClass("g-active", l.hasFlag(GObject.GNode.Flag.Active)),
                    n.blockHighlight || p.toggleClass("g-highlighted-row", l.hasFlag(GObject.GNode.Flag.Highlighted)),
                    !c &&
                        gDesigner.getApplicationManager().isEditingEnabled() &&
                        $(h).gAutoEdit({
                            textSelector: "> .page-title",
                            getContainer: function () {
                                return w.call(y, e).element;
                            },
                            submitCallback: function (e) {
                                e &&
                                    "" !== e.trim() &&
                                    i.GEditor.tryRunTransaction(
                                        l,
                                        function () {
                                            l.setProperty("name", e);
                                        },
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPagePanel", "action.rename-page"))
                                    );
                            },
                        }));
                var v = $("<span></span>").addClass("page-icon gravit-icon-page").insertBefore(m);
                gDesigner.isTouchEnabled() &&
                    (u
                        ? (v.toggleClass("gravit-icon-page-infinity", true), v.toggleClass("gravit-icon-page", false))
                        : d && (v.toggleClass("gravit-icon-page-master", true), v.toggleClass("gravit-icon-page", false)));
                var _ = c ? "gravit-icon-lock" : "gravit-icon-unlock";
                ((_ = gDesigner.isTouchEnabled() ? _ + "-small" : _),
                    $("<span></span>")
                        .addClass("page-action page-lock " + _)
                        .toggleClass("g-active", !!c)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock")))
                        .on("click", function (e) {
                            (gDesigner.stats("pages_change_lock"), e.stopPropagation());
                            var t = l.getProperty("lkt");
                            ((t = t ? null : GObject.GBlock.LockType.Full),
                                i.GEditor.tryRunTransaction(
                                    l,
                                    function () {
                                        if ((l.setProperty("lkt", t), t === GObject.GBlock.LockType.Full)) {
                                            n.scene.setProperty("edit", false);
                                            var e = gDesigner.getActiveDocument();
                                            e && e.getEditor().clearSelection();
                                        } else n.scene.setProperty("edit", true);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                                ));
                        })
                        .appendTo(p)
                        .gRichTooltip(
                            s.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-lock-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-lock-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ));
                var b = false === l.getProperty("vis");
                p.toggleClass("page-hiden", b);
                var x = b ? "gravit-icon-hide" : "gravit-icon-display";
                ((x = gDesigner.isTouchEnabled() ? x + "-small" : x),
                    $("<span></span>")
                        .addClass("page-action page-visibility " + x)
                        .toggleClass("g-active", b)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                        .on("click", function (e) {
                            (gDesigner.stats("pages_change_visibility"), e.stopPropagation());
                            var t = !l.getProperty("vis");
                            i.GEditor.tryRunTransaction(
                                l,
                                function () {
                                    l.setProperty("vis", t);
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                            );
                        })
                        .appendTo(p)
                        .gRichTooltip(
                            s.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-visibility-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GCommonNames", "text.page-toggle-visibility-tooltip-description")
                                ),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ),
                    p.contextmenu(
                        { context: g.PagePanel },
                        function (e) {
                            ($(this).data("gpagepanel").scene.setActivePage(l),
                                $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", e));
                        }.bind(this)
                    ));
            }
        }
        function E(e, t) {
            var n = new d(e);
            return ($(this).data("gpagepanel").vtree.insertNodeBefore(t, n), n);
        }
        function A(e, t) {
            var n = new d(e);
            return ($(this).data("gpagepanel").vtree.appendNode(t, n), n);
        }
        function T(e) {
            $(this).data("gpagepanel").vtree.removeNode(e);
        }
        function G(e) {
            var t,
                n,
                o = GObject.GUtil.uuid(),
                i = $(this).data("gpagepanel"),
                r = i.vtree;
            for (r.beginUpdate(), t = e.getNext(); t && !(t instanceof GObject.GPage); t = t.getNext());
            var s = t ? C.call(this, t) : null;
            ((n = s ? E.call(this, o, s) : A.call(this, o, null)),
                (i.pagesTreeNodeMap[o] = { node: e, treeNode: n, element: null }),
                i.pagesTreeNodeMapByNodes.set(e, {
                    element: null,
                    treeNode: n,
                    treeId: o,
                }),
                r.endUpdate());
        }
        function P(e) {
            var t = C.call(this, e);
            t && (T.call(this, t), x.call(this, e));
        }
        function D(e) {
            !$(this).data("gpagepanel").blockHandlers && e.node instanceof GObject.GPage && G.call(this, e.node);
        }
        function L(e) {
            !$(this).data("gpagepanel").blockHandlers && e.node instanceof GObject.GPage && P.call(this, e.node);
        }
        function I(e) {
            if (!e.temporary && !$(this).data("gpagepanel").blockHandlers && (e.node instanceof GObject.GPage || e.node instanceof GObject.GScene)) {
                if (e.node instanceof GObject.GScene && 1 === e.properties.length && "pi" === e.properties[0]) return;
                $(this).data("gpagepanel").vtree.requestInvalidation();
            }
        }
        function k(e) {
            if (!e) return;
            $(this).find(".page-row.g-active").removeClass("g-active");
            const t = w.call(this, e.id),
                n = t && t.element;
            n && $(n).closest(".page-row").addClass("g-active");
        }
        function O(e) {
            var t = $(this).data("gpagepanel"),
                n = $(this).data("gpagepanel").vtree;
            if (!t.blockHandlers && e.node instanceof GObject.GPage)
                if (
                    e.flag === GObject.GElement.Flag.Hidden ||
                    e.flag === GObject.GElement.Flag.PartialLocked ||
                    e.flag === GObject.GElement.Flag.FullLocked ||
                    e.flag === GObject.GNode.Flag.Active
                ) {
                    var o = e.node.getScene(),
                        i = o && o.getActivePage();
                    if (i && i == e.node && e.set) {
                        var r = C.call(this, e.node);
                        (n.expandAndFocus(r, true), e.flag === GObject.GNode.Flag.Active ? k.call(this, r) : n.requestInvalidation());
                    }
                } else t.blockHighlight || e.flag !== GObject.GNode.Flag.Highlighted || n.requestInvalidation();
        }
        function F(e) {
            "touch" === e.key && N._updateLayout.call(this);
        }
        function R() {
            gDesigner.isTouchEnabled() &&
                $(this)
                    .parent()
                    .css("height", parseInt($(this).find(".vscroller").css("height"), 10) + u + "px");
        }
        function M() {
            var e = $(this).data("gpagepanel");
            (e.vtree.clean(), (e.pagesTreeNodeMap = {}), (e.pagesTreeNodeMapByNodes = new Map()), (e.scene = null));
        }
        GObject.GObject.inheritAndMix(h, GObject.GObject);
        var N = {
            init: function (e) {
                return (
                    (e = $.extend(
                        {
                            nodeStyle: "page-row",
                            collapseStyle: "page-arrow gravit-icon-down",
                            freeHeight: u,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: S.bind(this),
                            separatorRenderer: null,
                            canDropCallback: m.bind(this),
                            moveCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                        },
                        e
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-page-panel")
                            .data("gpagepanel", {
                                vtree: new c(
                                    this,
                                    _.bind(this),
                                    e.nodeStyle,
                                    null,
                                    null,
                                    e.separatorRenderer ? e.separatorRenderer : null,
                                    e.freeHeight,
                                    e.insertIntoStyle,
                                    f.bind(this),
                                    y.bind(this),
                                    null,
                                    null,
                                    v.bind(this),
                                    null,
                                    e.upSeparatorSpan1Style,
                                    e.upSeparatorSpan2Style,
                                    e.downSeparatorSpan1Style,
                                    e.downSeparatorSpan2Style,
                                    false,
                                    0,
                                    21
                                ),
                                options: e,
                                pagesTreeNodeMap: {},
                                pagesTreeNodeMapByNodes: new Map(),
                                scene: null,
                                currentFocus: null,
                            });
                    })
                );
            },
            refresh: function () {
                $(this).data("gpagepanel").vtree.refresh();
            },
            relayout: function () {
                var e = $(this).data("gpagepanel"),
                    t = e.vtree,
                    n = e.currentFocus;
                (n && t.expandAndFocus(n), t.requestInvalidation());
            },
            scene: function (e) {
                var t = $(this),
                    n = t.data("gpagepanel");
                if (!arguments.length) return n.scene;
                if (
                    e !== n.scene &&
                    (n.scene &&
                        n.scene.hasMixin(GObject.GEventTarget) &&
                        (n.scene.removeEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                        n.scene.removeEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                        n.scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                        n.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this),
                        gDesigner.removeEventListener(l.default, n.settingChangedEvent, this)),
                    M.call(this),
                    (n.scene = e),
                    n.scene)
                ) {
                    n.scene.hasMixin(GObject.GEventTarget) &&
                        ((n.afterNodeInsertHandler = D.bind(this)),
                        (n.beforeNodeRemoveHandler = L.bind(this)),
                        (n.afterPropertiesChangeHandler = I.bind(this)),
                        (n.afterFlagChangeHandler = O.bind(this)),
                        (n.settingChangedEvent = F.bind(this)),
                        gDesigner.addEventListener(l.default, n.settingChangedEvent, this),
                        n.scene.addEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                        n.scene.addEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                        n.scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                        n.scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this));
                    for (var o = n.scene.getLastChild(); null !== o; o = o.getPrevious()) o instanceof GObject.GPage && G.call(this, o);
                    N._updateLayout.call(this);
                }
                return this;
            },
            blockHandlers: function (e) {
                $(this).data("gpagepanel").blockHandlers = !!e;
            },
            getLastVisitedDroppable: function () {
                return $(this).data("gpagepanel").vtree.getLastVisitedDroppable();
            },
            setBlockHighlight: function (e) {
                $(this).data("gpagepanel").blockHighlight = !!e;
            },
            resetVTreeRowHeight: function (e) {
                $(this).data("gpagepanel").vtree.resetRowHeight(e);
            },
            _updateLayout: function () {
                const e = $(this).data("gpagepanel"),
                    t = e && e.vtree;
                if (t) {
                    const e = gDesigner.isTouchEnabled();
                    (t.setFreeHeight(e ? p : u), t.setAnimatedDragEnabled(e));
                }
            },
        };
        ((module.exports = h),
            ($.fn.gPagePanel = function (e) {
                return N[e]
                    ? N[e].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof e && e
                      ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                      : N.init.apply(this, arguments);
            }));
    };
