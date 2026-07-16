module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(58), require(19), require(8 /* Symbol */), require(20), require(107), require(71), require(4), require(41), require(13), require(32), require(38), require(97), require(1175), require(33), require(26));
        var i = require(53),
            GObject = require(1),
            r = require(882),
            designerConfig = require(10),
            l = o(require(1354));
        const GSystemDialog = require(44),
            d = require(358),
            u = require(1355),
            p = require(1713),
            GAnnotationPanel = require(1357),
            h = require(1356 /* GAnnotationPanel */),
            f = require(1279),
            m = require(177),
            y = ["text"];
        function v() {}
        function _(e) {
            var t = $(this).data("gannotationpanel");
            if (t.options.clickCallback) {
                var n = x.call(this, e.id);
                t.options.clickCallback(n);
            }
        }
        function b(e) {
            x.call(this, e.id) && e.expanded;
        }
        function w(e, t) {
            var n = $(this).data("gannotationpanel");
            if (n.options.renderer) return n.options.renderer(e.id, e.virtualNode, t);
        }
        function C(e) {
            var t = $(this);
            e.id === u.COLLAPSE_ID
                ? $(e).addClass(t.data("gannotationpanel").options.collapseStyle)
                : e.id === u.EXPAND_ID && $(e).addClass(t.data("gannotationpanel").options.expandStyle);
        }
        function x(e) {
            var t = $(this).data("gannotationpanel").annotTreeNodeMap[e];
            return t ? t.annot : null;
        }
        function S(e) {
            return $(this).data("gannotationpanel").annotTreeNodeMap[e];
        }
        function E(e) {
            var t = $(this).data("gannotationpanel").annotTreeNodeMapByNodes.get(e);
            return t ? t.treeId : null;
        }
        function A(e) {
            var t = $(this).data("gannotationpanel").annotTreeNodeMapByNodes.get(e);
            return t ? t.treeNode : null;
        }
        function T(e) {
            var t = $(this).data("gannotationpanel").annotTreeNodeMap,
                n = $(this).data("gannotationpanel").annotTreeNodeMapByNodes;
            e.accept(
                function (e) {
                    var o = n.get(e);
                    o && (n.delete(e), (t[o.treeId] = null));
                }.bind(this)
            );
        }
        function G(e) {
            var t = $(this).data("gannotationpanel"),
                n = [];
            if (t.annotTreeNodeMap)
                for (var o in (e instanceof GObject.GComment && n.push(E.call(this, e.getParent())), t.annotTreeNodeMap))
                    t.annotTreeNodeMap[o] &&
                        t.annotTreeNodeMap[o].annot &&
                        (t.annotTreeNodeMap[o].annot === e ||
                            (t.annotTreeNodeMap[o].annot instanceof GObject.GComment && t.annotTreeNodeMap[o].annot.getParent() === e)) &&
                        n.push(o);
            return n;
        }
        function P() {
            return (
                !!gDesigner.getApplicationManager().isCommentingEditingEnabled() ||
                (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.document-approved-no-annotations-update"))), false)
            );
        }
        function D() {
            const e = $(this).data("gannotationpanel");
            if (e && e.syncCallback)
                try {
                    e.syncCallback();
                } finally {
                    e.syncCallback = null;
                }
        }
        function L(e, t, n) {
            const o = gDesigner.getApplicationManager().isCommentingEditingEnabled();
            var r = $(this).data("gannotationpanel"),
                s = S.call(this, e),
                l = s ? s.annot : null,
                u = null;
            if (l) {
                var p = false,
                    f = $(n);
                if (
                    (f.attr("draggable", false),
                    l.hasMixin(GObject.GAnnotation) ? f.addClass("parent") : f.addClass("child"),
                    !r.showResolved &&
                        ((l.hasMixin(GObject.GAnnotation) && l.getProperty("rsv")) ||
                            (l instanceof GObject.GComment && l.getParent().getProperty("rsv"))))
                )
                    return void f.css("display", "none");
                if (
                    (f.hover(
                        () => G.call(this, l).forEach((e) => $("#".concat(e)).addClass("on-hover")),
                        () => G.call(this, l).forEach((e) => $("#".concat(e)).removeClass("on-hover"))
                    ),
                    !(l.hasMixin(GObject.GAnnotation) ? l : l.getParent()).hasFlag(GObject.GNode.Flag.Selected) &&
                        ((l.hasMixin(GObject.GAnnotation) && !B(l).length) || U(l)) &&
                        (p = true),
                    !r.blockHighlight)
                ) {
                    var m = l.hasFlag(GObject.GNode.Flag.Highlighted);
                    (!m &&
                        l.hasMixin(GObject.GNode.Container) &&
                        (m = l.acceptChildren(
                            function (e) {
                                return e.hasFlag(GObject.GNode.Flag.Highlighted);
                            },
                            false,
                            true
                        )),
                        $(f).toggleClass("g-highlighted-row", m));
                }
                var y = k.call(this, l),
                    v = S.call(this, y);
                void 0 === v.expanded && (v.expanded = true);
                var _ = gDesigner.getActiveDocument();
                _ &&
                    l.getId() === _.getFocusAnnotationId() &&
                    !_.isAnnotationFocused() &&
                    (_.getScene().updateActivePageForElem(v.annot),
                    _.getScene().updateActiveLayerForElem(v.annot),
                    _.setAnnotationFocused(),
                    (v.expanded = true),
                    v.annot.setFlag(GObject.GNode.Flag.Selected));
                var b = O.call(this, l);
                l.hasMixin(GObject.GAnnotation) && (u = I.call(this, l, r.showResolved));
                var w = new h({
                    isCommentingEditingEnable: o,
                    container: f,
                    annotation: l,
                    relatedNodesCount: b,
                    sidebarActive: r.sidebarActive,
                    isLastRow: p,
                    hasResolveAccess: r.vtree.hasResolveAccess(),
                    hasReopenAccess: r.vtree.hasReopenAccess(),
                    mentionData: r.vtree.getMentionData(),
                    onMouseEnter: () => {
                        l.hasMixin(GObject.GAnnotation) && !l.hasFlag(GObject.GAnnotation.Flag.Hidden) && l.setFlag(GObject.GNode.Flag.Highlighted);
                    },
                    onMouseLeave: () => {
                        l.hasMixin(GObject.GAnnotation) && !l.hasFlag(GObject.GAnnotation.Flag.Hidden) && l.removeFlag(GObject.GNode.Flag.Highlighted);
                    },
                    onChange: (e) => {
                        P() &&
                            (l.getProperty("text") === e
                                ? D.call(this)
                                : i.GEditor.tryRunTransaction(
                                      l,
                                      function () {
                                          l.setProperty("text", e);
                                      },
                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.edit-comment"))
                                  ));
                    },
                    onToggleState: () => {
                        P() &&
                            (i.GEditor.tryRunTransaction(
                                l,
                                function () {
                                    (r.showResolved ||
                                        l.getProperty("rsv") ||
                                        !l.hasFlag(GObject.GNode.Flag.Selected) ||
                                        l.removeFlag(GObject.GNode.Flag.Selected),
                                        l.setProperty("rsv", !l.getProperty("rsv")));
                                },
                                l.getProperty("rsv")
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                            ),
                            ne.call(this),
                            te.call(this));
                    },
                    onResolve: () => {
                        P() &&
                            (i.GEditor.tryRunTransaction(
                                l,
                                function () {
                                    (!r.showResolved && l.hasFlag(GObject.GNode.Flag.Selected) && l.removeFlag(GObject.GNode.Flag.Selected),
                                        l.setProperty("rsv", true));
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                            ),
                            ne.call(this),
                            te.call(this));
                    },
                    onReopen: () => {
                        P() &&
                            (i.GEditor.tryRunTransaction(
                                l,
                                function () {
                                    l.setProperty("rsv", false);
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                            ),
                            ne.call(this),
                            te.call(this));
                    },
                    onDelete: () => {
                        P() &&
                            GSystemDialog.confirm(
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-remove")),
                                (e) => {
                                    e &&
                                        d.removeAnnotations(
                                            [l],
                                            l.getParent(),
                                            GObject.GLocale.get(
                                                new GObject.GLocaleKey(
                                                    "GAnnotationPanel",
                                                    "text.remove-".concat(l.hasMixin(GObject.GAnnotation) ? "annotation" : "comment")
                                                )
                                            )
                                        );
                                },
                                null,
                                null,
                                null,
                                true,
                                true
                            );
                    },
                    onCancel: () => {
                        D.call(this);
                    },
                    onExpandClick: (t) => {
                        (t.stopPropagation(), (v.expanded = !v.expanded));
                        var n = S.call(this, e);
                        try {
                            n.component.setCollapseState(v.expanded);
                        } catch (e) {
                            "function" == typeof gdb_showScene && console.error("REPAIR THIS! component is NULL!");
                        }
                        var o = n.annot;
                        G.call(this, o).forEach((e, t) => {
                            if (t > 0) {
                                var n = S.call(this, e);
                                try {
                                    n.component.setVisiblity(v.expanded);
                                } catch (e) {
                                    "function" == typeof gdb_showScene && console.error("REPAIR THIS! component is NULL!");
                                }
                            }
                        });
                    },
                    onCopyPermalinkClick: async (e) => {
                        const t = gDesigner.getActiveDocument();
                        if (t) {
                            const n = await gDesigner.getShareManager().getPermalink(t, e);
                            n && gContainer.copyToClipboard(n);
                        }
                    },
                    onAssignTo: (e) => {
                        l.hasMixin(GObject.GAnnotation)
                            ? l.setProperty("asgn", e)
                            : l.getParent() && l.getParent().hasMixin(GObject.GAnnotation) && l.getParent().setProperty("asgn", e);
                    },
                    mainAnnotObject: v,
                });
                ((s.element = f), (s.component = w), r.vtree.addChild(w));
            } else if (s && s.replyAnnot) {
                let e = $(n);
                if (
                    (e.addClass("last-row"),
                    !o ||
                        !s.replyAnnot.hasFlag(GObject.GNode.Flag.Selected) ||
                        s.replyAnnot.getProperty("rsv") ||
                        (!r.showResolved && s.replyAnnot.getProperty("rsv")))
                )
                    return void e.hide();
                const t = !s.replyAnnot.isFillingCompleted(),
                    l = (e) => {
                        if (P() && (e.length || (t && s.replyAnnot.isEmptyTextAllowed()))) {
                            let c = gDesigner.getSyncUser();
                            if (d.canUpdate(c)) {
                                const d = s.replyAnnot.getScene(),
                                    u = d && i.GEditor.getEditor(d);
                                let p, g;
                                ((p = t
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.set-annotation-text"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.add-comment"))),
                                    u && u.beginTransaction());
                                try {
                                    if (t) {
                                        (s.replyAnnot.setProperty("text", e),
                                            s.replyAnnot.setProperty("email", c.getAccountName()),
                                            V.call(this, s.replyAnnot));
                                        var n = GObject.GUtil.uuid(),
                                            o = A.call(this, s.replyAnnot),
                                            l = {
                                                element: null,
                                                annot: null,
                                                treeNode: M.call(this, n, o, true, true),
                                                replyAnnot: s.replyAnnot,
                                                treeId: n,
                                            };
                                        ((r.annotTreeNodeMap[n] = l), r.replyNodes.set(s.replyAnnot, l));
                                    } else {
                                        V.call(this, s.replyAnnot);
                                        const t = s.replyAnnot.addComment(
                                            e,
                                            c.getUID(),
                                            i.GEditorOptions.userConfig.userName,
                                            c.avatar,
                                            c.getAccountName()
                                        );
                                        g = i.GAnnotationEditor.createAddAnnotationTransactionData([t], s.replyAnnot);
                                    }
                                    (ne.call(this), te.call(this));
                                } catch (e) {
                                    console.log(e);
                                } finally {
                                    u && u.commitTransaction(p, g);
                                }
                            }
                            H(this, s.replyAnnot);
                        }
                    },
                    c = () => {
                        (H(this, s.replyAnnot), D.call(this));
                    },
                    u = (e) => {
                        s.replyAnnot.setProperty("asgn", e);
                    };
                var C = new GAnnotationPanel({
                        container: e,
                        annotation: s.replyAnnot,
                        onSubmit: l,
                        onCancel: c,
                        onAssignTo: u,
                        mentionData: r.vtree.getMentionData(),
                    }),
                    x = r.annotTreeNodeMapByNodes.get(s.replyAnnot);
                ((s.reply = C), r.vtree.addChild(C), x && (x.reply = C));
            }
            return u;
        }
        function I(e, t) {
            let n = e.getProperty("asgn");
            if (!(n || []).length) return;
            var o = e.getProperty("rsv");
            let s = $("<div/>").addClass("already-assigned-user-row").appendTo($(this)),
                l = $("<span/>").addClass("assigned-content-group").appendTo(s);
            return (
                (0, r.getCollabInfo)(n[0]).then(async (n) => {
                    let r = new m(n).getFullUserName();
                    $("<span/>")
                        .addClass("assign-to-text")
                        .html(
                            GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.assigned-to")) +
                                (n && n.name ? r : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unknown-user")))
                        )
                        .appendTo(l);
                    const s = !o;
                    ((await s) ? d.canResolveAnnotation(e) : d.canReopenAnnotation(e)) &&
                        $("<span/>")
                            .addClass("assigned-action-group")
                            .append(
                                $("<span/>")
                                    .addClass("icon " + (s ? "gravit-icon-resolve" : "gravit-icon-resolved"))
                                    .addClass("assigned-icon-resolve")
                                    .addClass("assigned-resolve-action")
                                    .attr(
                                        "data-title",
                                        s
                                            ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.assign-resolve"))
                                            : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                    )
                                    .on("click", () => {
                                        P() &&
                                            (s
                                                ? i.GEditor.tryRunTransaction(
                                                      e,
                                                      function () {
                                                          (!t && e.hasFlag(GObject.GNode.Flag.Selected) && e.removeFlag(GObject.GNode.Flag.Selected),
                                                              e.setProperty("rsv", true));
                                                      },
                                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                                                  )
                                                : i.GEditor.tryRunTransaction(
                                                      e,
                                                      function () {
                                                          e.setProperty("rsv", false);
                                                      },
                                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                                  ),
                                            ne.call(this),
                                            te.call(this));
                                    })
                            )
                            .appendTo(l);
                }),
                s
            );
        }
        function k(e) {
            return G.call($(this), e)[0];
        }
        function O(e) {
            return G.call($(this), e).length;
        }
        function F(e, t, n) {
            var o = new u.GSimpleTreeNodeNamed(e);
            return (n && (o.virtualNode = true), $(this).data("gannotationpanel").vtree.insertNodeAfter(t, o), o);
        }
        function R(e, t, n) {
            var o = new u.GSimpleTreeNodeNamed(e);
            return (n && (o.virtualNode = true), $(this).data("gannotationpanel").vtree.insertNodeBefore(t, o), o);
        }
        function M(e, t, n, o) {
            var i = new u.GSimpleTreeNodeNamed(e);
            return (n && (i.virtualNode = true), $(this).data("gannotationpanel").vtree.appendNode(t, i, o), i);
        }
        function N(e) {
            $(this).data("gannotationpanel").vtree.removeNode(e);
        }
        function B(e) {
            return e.getChildren().filter((e) => e instanceof GObject.GComment && !e.getProperty("rmd"));
        }
        function U(e) {
            if (!(e instanceof GObject.GComment)) return false;
            for (var t = true, n = e.getNext(); n; ) {
                if (n instanceof GObject.GComment && !n.getProperty("rmd")) {
                    t = false;
                    break;
                }
                n = n.getNext();
            }
            return t;
        }
        function j(e) {
            var t = gDesigner.getSyncUser();
            t && e.getProperty("uid") && d.isOwner(t, e)
                ? (e.$plkt = null)
                : (e.$plkt = GObject.GBlock.ProgramLck.NoSizeChanges | GObject.GBlock.ProgramLck.NoMove | GObject.GBlock.ProgramLck.NoDelete);
        }
        function K(e, t, n) {
            var o = GObject.GUtil.uuid(),
                i = $(this).data("gannotationpanel"),
                r = i.vtree;
            if (t || !e.getParent() || e.getParent() instanceof GObject.GAnnotationsList || E.call(this, e.getParent())) {
                var s;
                if ((r.beginUpdate(), e.hasMixin(GObject.GAnnotation))) {
                    V.call(this, e);
                    var l = (function (e) {
                            for (var t = null, n = e; !t && n.getPrevious(); )
                                n.getPrevious().getProperty("rmd") ? (n = n.getPrevious()) : (t = n.getPrevious());
                            return t;
                        })(e),
                        c = l ? A.call(this, l) : null;
                    s = c ? R.call(this, o, c, false) : M.call(this, o, null, false);
                } else {
                    var d = e.getParent();
                    V.call(this, d);
                    var u = A.call(this, d);
                    s = M.call(this, o, u, false, true);
                }
                var p = { element: null, annot: e, treeNode: s, treeId: o };
                if (((i.annotTreeNodeMap[o] = p), i.annotTreeNodeMapByNodes.set(e, p), e.hasMixin(GObject.GAnnotation))) {
                    for (var g = e.getFirstChild(); null !== g; g = g.getNext())
                        g instanceof GObject.GComment && !g.getProperty("rmd") && K.call(this, g, t);
                    if (!B(e).length) {
                        var h = GObject.GUtil.uuid(),
                            f = {
                                element: null,
                                annot: null,
                                treeNode: e.isFillingCompleted() ? M.call(this, h, s, true, true) : F.call(this, h, s, true),
                                replyAnnot: e,
                                treeId: h,
                            };
                        ((i.annotTreeNodeMap[h] = f), i.replyNodes.set(e, f));
                    }
                    j(e);
                } else if (e instanceof GObject.GComment && U(e)) {
                    let t,
                        n = GObject.GUtil.uuid();
                    t = F.call(this, n, s, true);
                    var m = e.getParent();
                    let o = {
                        element: null,
                        annot: null,
                        treeNode: t,
                        replyAnnot: m,
                        treeId: n,
                    };
                    ((i.annotTreeNodeMap[n] = o), i.replyNodes.set(m, o));
                }
                r.endUpdate(n);
            }
        }
        function V(e) {
            var t = $(this).data("gannotationpanel").replyNodes,
                n = t.get(e);
            return (
                n && (N.call(this, n.treeNode), t.delete(e), ($(this).data("gannotationpanel").annotTreeNodeMap[n.treeNode.id] = null)),
                n
            );
        }
        function H(e, t) {
            if (t)
                !t.getParent() ||
                    t.getProperty("rmd") ||
                    t.isFillingCompleted() ||
                    d.removeAnnotations(
                        [t],
                        t.getParent(),
                        GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.remove-empty-annotation"))
                    );
            else {
                var n = gDesigner.getActiveDocument();
                if (n) {
                    var o = n.getEditor().getSelection();
                    o &&
                        o.map((t) => {
                            t.hasMixin(GObject.GAnnotation) && H(e, t);
                        });
                }
            }
        }
        function W(e, t) {
            var n = e.data("gannotationpanel").annotTreeNodeMapByNodes.get(t);
            n && n.component && (n.component.cancelEditMode(), n.reply && n.reply.hide());
        }
        function z(e) {
            var t = A.call(this, e);
            t && (N.call(this, t), T.call(this, e), V.call(this, e), oe.requestInvalidation.call(this));
        }
        function q(e, t) {
            return !e.blockHandlers || !(!e.ignoreBlock || e.ignoreBlock !== t);
        }
        function Y() {
            return !(
                !$(this)
                    .find(".annotations-buttonrow")
                    .toArray()
                    .some((e) => "none" !== $(e).css("display")) && !$(this).find(".g-edit-mode").length
            );
        }
        function X(e, t) {
            let n = $(this).data("gannotationpanel"),
                o = false;
            const i = {};
            if (!n) return;
            if (n.blockAnnotationsUpdate) return;
            if (null !== n.scheduledUpdate) return void (n.updateInProgress && (n.scheduleNextUpdate = true));
            if (
                e &&
                e.node &&
                e.node.recordedTransaction &&
                ((o = true), e.properties && e.values && e.properties.length === e.values.length)
            )
                for (var r = 0, s = e.values.length; r < s; r++) i[e.properties[r]] = e.values[r];
            if (e && e.node) {
                if (e.custom) return;
                if (e.node.hasMixin(GObject.GAnnotation) && e.node.isPropertiesIgnorable(e.properties)) return;
            }
            let l = gDesigner.getActiveDocument();
            l &&
                l.getAnnotationsId() &&
                (n.scheduledUpdate = setTimeout(() => {
                    let e = $(this).data("gannotationpanel");
                    if (!e) return;
                    if (Y.call(this) || e.vtree.isPendingInvalidation()) return ((e.scheduledUpdate = null), void X.call(this));
                    (console.log("updating annotations"), (e.updateInProgress = true));
                    let n = e.page.getAnnotations();
                    d.updateAndReturnCloudAnnotationsForDocument(l, GObject.GNode.store(n, { recordedTransaction: o, recordedProperties: i }))
                        .then((e) => {
                            let n = e.annotationsCollection,
                                r = false,
                                s = $(this).data("gannotationpanel");
                            if (!s) return r;
                            if (!s.updateInProgress) return r;
                            if ((Y.call(this) && (s.scheduleNextUpdate = true), (s.updateInProgress = false), !s.scheduleNextUpdate)) {
                                let e = d.findAnnotationsListForPage(s.page, n);
                                if (e) {
                                    let n = GObject.GNode.restore(e),
                                        l = n.getChildren();
                                    (n.clearChildren(), s.vtree.beginUpdate());
                                    let c = d.mergeAnnotations(
                                        s.page.getAnnotations(),
                                        s.page.getAnnotations().getChildren(),
                                        n,
                                        l,
                                        o ? i : void 0
                                    );
                                    ((r = r || c), s.vtree.endUpdate(t), ne.call(this), te.call(this));
                                }
                                (e || (s.vtree.beginUpdate(), s.page.getAnnotations().clearChildren(), s.vtree.endUpdate(t), ne.call(this)),
                                    s.options.updateAnnotationCache(n));
                            }
                            if (((s.scheduledUpdate = null), s.scheduleNextUpdate && ((s.scheduleNextUpdate = false), X.call(this)), r)) {
                                let t = s.page.getScene();
                                (t &&
                                    t.getLastTimeAnnotationsFromCloudModified() < e.lastUpdateTime &&
                                    t.setLastTimeAnnotationsFromCloudModified(e.lastUpdateTime),
                                    gDesigner.notifyDocumentModified(l));
                            }
                            return r;
                        })
                        .catch((t) => {
                            (console.warn("error during annotations list update: " + t),
                                (e.scheduledUpdate = null),
                                (e.updateInProgress = false),
                                e.scheduleNextUpdate && ((e.scheduleNextUpdate = false), X.call(this)));
                        });
                }, 500));
        }
        function Q(e) {
            var t = $(this).data("gannotationpanel");
            if (q(t, e.node)) {
                const n = e.node.findParent((e) => e instanceof GObject.GAnnotationsList),
                    o = () => {
                        const t = new l.default();
                        if (e.node instanceof GObject.GComment) {
                            const n = e.node.getProperty("text");
                            (n && designerConfig.NOTIFICATION_USER_MENTION_REGEX.test(n)) || (t.collaboratorsCache = false);
                        }
                        return t;
                    };
                let i = false;
                const r = () => {
                        if (!e.node.getProperty("rmd")) {
                            const t = n ? l.default.NO_CACHE_INVALIDATION : o();
                            K.call(this, e.node, null, t);
                        }
                    },
                    c = () => {
                        n && X.call(this, null, o());
                    };
                ((e.node.hasMixin(GObject.GAnnotation) || e.node instanceof GObject.GComment || e.node instanceof GObject.GAnnotationsList) &&
                    (e.node.getProperty("rmd") ? (i = true) : r()),
                    i
                        ? "number" != typeof t.delayedUpdate &&
                          (t.delayedUpdate = setTimeout(() => {
                              (r(), c(), (t.delayedUpdate = null));
                          }))
                        : c());
            }
        }
        function J(e) {
            q($(this).data("gannotationpanel"), e.node) &&
                (z.call(this, e.node), e.node.findParent((e) => e instanceof GObject.GAnnotationsList) && X.call(this));
        }
        function Z(e) {
            if (!e.temporary && !$(this).data("gannotationpanel").blockHandlers) {
                e.properties.some((e) => y.indexOf(e) >= 0) && oe.requestInvalidation.call(this);
                let t = gDesigner.getSyncUser();
                (d.canUpdate(t) &&
                    e.node.hasMixin(GObject.GAnnotation) &&
                    e.properties.includes("rsv") &&
                    setTimeout(() => {
                        let n = e.values[e.properties.indexOf("rsv")];
                        (void 0 !== n && false !== n) !== e.node.getProperty("rsv") &&
                            (V.call(this, e.node),
                            e.node.addComment(
                                "",
                                t.getUID(),
                                i.GEditorOptions.userConfig.userName,
                                t.avatar,
                                t.getAccountName(),
                                e.node.getProperty("rsv") ? GObject.GComment.Type.Close : GObject.GComment.Type.Open
                            ));
                    }),
                    (e.node instanceof GObject.GAnnotationsList || e.node.findParent((e) => e instanceof GObject.GAnnotationsList)) &&
                        (e.node.hasMixin(GObject.GAnnotation) && e.properties.indexOf("uid") >= 0 && j(e.node), X.call(this, e)),
                    e.properties.includes("rmd") && e.node.getProperty("rmd")
                        ? (e.node.hasMixin(GObject.GAnnotation) && W(this, e.node), ne.call(this), te.call(this))
                        : e.properties.includes("text") &&
                          e.node.isFillingCompleted() &&
                          e.node.hasMixin(GObject.GAnnotation) &&
                          W(this, e.node));
            }
        }
        function ee(e) {
            var t,
                n = $(this).data("gannotationpanel");
            if (q(n, e.node)) {
                var o = false;
                if (e.node instanceof GObject.GComment || e.node.hasMixin(GObject.GAnnotation))
                    if (e.flag === GObject.GAnnotation.Flag.Hidden || e.flag === GObject.GNode.Flag.Selected || e.flag === GObject.GNode.Flag.Active) {
                        var r = e.node.getPage(),
                            s = e.node.getScene(),
                            d = s && s.getActivePage();
                        if (
                            ((d && r && d !== r) || (o = true),
                            e.node.hasMixin(GObject.GAnnotation) &&
                                e.flag === GObject.GNode.Flag.Selected &&
                                false === e.set &&
                                !e.node.isFillingCompleted() &&
                                !(t = e.node).getProperty("rmd") &&
                                t.getParent())
                        )
                            if (e.node.isEmptyTextAllowed()) {
                                let t = n.annotTreeNodeMapByNodes.get(e.node);
                                t && t.reply && t.reply.isVisible() && setTimeout(() => t.reply.forceSubmit());
                            } else
                                GSystemDialog.confirm(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-discard-annotation")), (t) => {
                                    if (t)
                                        setTimeout(() => {
                                            H(this, e.node);
                                        });
                                    else {
                                        (gDesigner.getActiveDocument().getEditor().updateSelection(false, [e.node]),
                                            gDesigner.getToolManager().activateTool(i.GPointerTool, null, true));
                                        var o = n.annotTreeNodeMapByNodes.get(e.node);
                                        o &&
                                            o.reply &&
                                            setTimeout(() => {
                                                o.reply.requestFocus();
                                            });
                                    }
                                });
                    } else if (!n.blockHighlight && e.flag === GObject.GNode.Flag.Highlighted) {
                        var u = e.node,
                            p = function (e) {
                                var t = A.call(this, e);
                                return t && t.isVisible();
                            }.bind(this);
                        if (p(u) || u.findParent(p)) {
                            var g = n.annotTreeNodeMapByNodes.get(u).component;
                            g ? g.toggleHighlight(e.set) : console.warn("element parent was null");
                        }
                    }
                o && oe.requestInvalidation.call(this, l.default.NO_CACHE_INVALIDATION);
            }
        }
        function te() {
            var e = $(this).data("gannotationpanel");
            if ((e.vtree.beginUpdate(), e.page))
                for (var t = e.page.getAnnotations().getFirstChild(); null !== t; t = t.getNext())
                    t.getProperty("rmd") || K.call(this, t, true);
            e.vtree.endUpdate();
        }
        function ne(e) {
            var t = $(this).data("gannotationpanel");
            (t.vtree.clean(),
                (t.annotTreeNodeMap = {}),
                (t.replyNodes = new Map()),
                (t.annotTreeNodeMapByNodes = new Map()),
                void 0 !== e && (t.page = e),
                "number" == typeof t.delayedUpdate && (clearTimeout(t.delayedUpdate), (t.delayedUpdate = null)));
        }
        GObject.GObject.inheritAndMix(v, GObject.GObject);
        var oe = {
            init: function (e) {
                return (
                    (e = $.extend(
                        {
                            nodeStyle: "annotation-row",
                            expandStyle: "annotation-arrow gravit-icon-right",
                            collapseStyle: "annotation-arrow gravit-icon-down",
                            freeHeight: 7,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: L.bind(this),
                            expandRenderer: C.bind(this),
                            separatorRenderer: null,
                            moveCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                            updateCommentCount: null,
                        },
                        e
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-annotation-panel")
                            .data("gannotationpanel", {
                                vtree: new p(
                                    this,
                                    w.bind(this),
                                    e.nodeStyle,
                                    e.expandStyle === e.collapseStyle ? e.expandStyle : null,
                                    _.bind(this),
                                    b.bind(this),
                                    e.upSeparatorSpan1Style,
                                    e.upSeparatorSpan2Style,
                                    e.downSeparatorSpan1Style,
                                    e.downSeparatorSpan2Style
                                ),
                                options: e,
                                annotTreeNodeMap: {},
                                annotTreeNodeMapByNodes: new Map(),
                                replyNodes: new Map(),
                                page: null,
                                scheduledUpdate: null,
                                scheduleNextUpdate: false,
                                blockAnnotationsUpdate: false,
                                updateInProgress: false,
                                showResolved: "boolean" == typeof e.showResolved && e.showResolved,
                                currentFocus: null,
                                sidebarActive: e.sidebarActive,
                                syncCallback: null,
                                delayedUpdate: null,
                            });
                    })
                );
            },
            requestInvalidation: function (e) {
                $(this).data("gannotationpanel").vtree.requestInvalidation(0, e);
            },
            refresh: function () {
                $(this).data("gannotationpanel").vtree.refresh();
            },
            relayout: function (e) {
                var t = $(this).data("gannotationpanel"),
                    n = t.vtree,
                    o = t.currentFocus;
                (o && n.expandAndFocus(o),
                    e ? (ne.call(this), te.call(this)) : oe.requestInvalidation.call(this, l.default.NO_CACHE_INVALIDATION));
            },
            cleanEmptyAnnotations: function () {
                H(this);
            },
            isEditingOrAddingContent: function () {
                return $(this).data("gannotationpanel").vtree.isEditingOrAddingContent();
            },
            showResolved: function (e) {
                var t = $(this).data("gannotationpanel");
                t.showResolved !== e && ((t.showResolved = e), ne.call(this), te.call(this));
            },
            page: function (e) {
                var t = $(this),
                    n = t.data("gannotationpanel") || {};
                return arguments.length
                    ? (e !== n.page &&
                          (n.page &&
                              n.page.hasMixin(GObject.GEventTarget) &&
                              (n.page.removeEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                              n.page.removeEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                              n.page.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                              n.page.removeEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this),
                              null !== n.scheduledUpdate && (clearTimeout(n.scheduledUpdate), (n.scheduledUpdate = null)),
                              (n.updateInProgress = false)),
                          ne.call(this, e),
                          (n.page = e),
                          n.page &&
                              (n.page.hasMixin(GObject.GEventTarget) &&
                                  ((n.beforeNodeRemoveHandler = J.bind(this)),
                                  (n.afterPropertiesChangeHandler = Z.bind(this)),
                                  (n.afterFlagChangeHandler = ee.bind(this)),
                                  (n.afterNodeInsertHandler = Q.bind(this)),
                                  n.page.addEventListener(GObject.GNode.AfterInsertEvent, n.afterNodeInsertHandler, this),
                                  n.page.addEventListener(GObject.GNode.BeforeRemoveEvent, n.beforeNodeRemoveHandler, this),
                                  n.page.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, n.afterPropertiesChangeHandler, this),
                                  n.page.addEventListener(GObject.GNode.AfterFlagChangeEvent, n.afterFlagChangeHandler, this)),
                              te.call(this))),
                      this)
                    : n.page;
            },
            setDelayedSyncCallback: function (e) {
                $(this).data("gannotationpanel").syncCallback = e;
            },
            annotations: function (e) {
                let t = false;
                if (Y.call(this)) return f.DELAYED;
                let n = $(this).data("gannotationpanel"),
                    o = GObject.GNode.restore(e),
                    i = o.getChildren();
                return (
                    o.clearChildren(),
                    (n.blockAnnotationsUpdate = true),
                    n.vtree.beginUpdate(),
                    (t = d.mergeAnnotations(n.page.getAnnotations(), n.page.getAnnotations().getChildren(), o, i)),
                    n.vtree.endUpdate(),
                    (n.blockAnnotationsUpdate = false),
                    ne.call(this),
                    te.call(this),
                    t ? f.UPDATED : f.SKIPPED
                );
            },
            blockHandlers: function (e) {
                $(this).data("gannotationpanel").blockHandlers = !!e;
            },
            ignoreBlock: function (e) {
                $(this).data("gannotationpanel").ignoreBlock = e;
            },
            setBlockHighlight: function (e) {
                $(this).data("gannotationpanel").blockHighlight = !!e;
            },
            getTreeNode: function (e) {
                var t = null;
                return ($(this).data("gannotationpanel") && (t = A.call(this, e)), t);
            },
            scrollIntoView: function () {
                const e = $(this).find(".annotation-row.g-selected").attr("id");
                if (e) {
                    const t = S.call(this, e);
                    t && (t.reply ? t.reply.scrollIntoView() : t.component && t.component.scrollIntoView());
                }
            },
            getItem: function (e) {
                return x.call(this, e.id);
            },
        };
        ((module.exports = v),
            ($.fn.gAnnotationPanel = function (e) {
                return oe[e]
                    ? oe[e].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof e && e
                      ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                      : oe.init.apply(this, arguments);
            }));
    };
