module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.buildLayerItemContainer = function (e, t, n, a) {
                var r = $(e);
                (r.attr("draggable", false),
                    r.gPro({
                        pro: t instanceof GObject.GElement && !!t.getProperty("_pro", true),
                    }));
                var s = $("<span></span>").addClass("layer-title-group").toggleClass("g-selected", t.hasFlag(GObject.GNode.Flag.Selected));
                (s.appendTo(r),
                    r
                        .on("mouseenter", function (e) {
                            t.hasFlag(GObject.GElement.Flag.Hidden) || t.setFlag(GObject.GNode.Flag.Highlighted);
                        })
                        .on("mouseleave", function (e) {
                            t.hasFlag(GObject.GElement.Flag.Hidden) || t.removeFlag(GObject.GNode.Flag.Highlighted);
                        }));
                var l = t.getProperty("name");
                l = l || t.getNodeNameTranslated();
                var c = $("<span></span>").html(l);
                c.addClass("layer-title").appendTo(s);
                var d = function (e) {
                    return e instanceof GObject.GSymbol && !!e.getMasterSymbol();
                };
                (d(t) || t.findParent(d)) && r.addClass("g-symbol-row");
                r.toggleClass("g-active", t.hasFlag(GObject.GNode.Flag.Active))
                    .toggleClass("g-has-selection", n)
                    .toggleClass("g-selected", t.hasFlag(GObject.GNode.Flag.Selected));
                var u,
                    { icon: p, overlayIcon: g } = i(t, a);
                p &&
                    ("<svg" === p.substr(0, 4)
                        ? (u = $("<span></span>")
                              .addClass("layer-icon")
                              .append(
                                  $(p).addClass("layer-icon").attr({ width: "16px", height: "16px" }).css({
                                      verticalAlign: "middle",
                                      paddingLeft: "1px",
                                      opacity: "initial",
                                  })
                              )
                              .insertBefore(c))
                        : (gDesigner.isTouchEnabled() && (p += "-small"),
                          (u = $("<span></span>")
                              .addClass("layer-icon " + p)
                              .css({ opacity: "initial" })
                              .insertBefore(c))));
                g && u && g.appendTo(u);
                return { container: r, title: c, titleGroup: s };
            }),
            (exports.getIconByLayerType = i),
            (exports.getLayerOrItemStatus = function (e) {
                var t = false,
                    n = null,
                    i = false,
                    a = e;
                for (; (a = a.getParent()) && !(a instanceof GObject.GScene); ) {
                    (a instanceof GObject.GBlock &&
                        ((t = false === a.getProperty("vis") || t),
                        (s = a.getProperty("lkt")) && (n ? s === GObject.GBlock.LockType.Full && (n = s) : (n = s))),
                        a instanceof GObject.GLayer && (i = true === a.getProperty("otl") || i));
                }
                var r = t || false === e.getProperty("vis"),
                    s = n || e.getProperty("lkt"),
                    l = i || (e instanceof GObject.GLayer && e.getProperty("otl")),
                    c = false;
                if (e.hasMixin(GObject.GNode.Container))
                    for (var d = e.getFirstChild(); null !== d && !c; d = d.getNext())
                        d instanceof GObject.GItem && d.hasFlag(GObject.GNode.Flag.Selected) && (c = true);
                return {
                    parentHidden: t,
                    parentLockType: n,
                    parentOutlined: i,
                    isHidden: r,
                    lockType: s,
                    isOutlined: l,
                    hasSelection: c,
                };
            }));
        var GObject = require(1);
        function i(e, t) {
            var n = null,
                i = null;
            if (
                (e instanceof GObject.GLayer
                    ? (n = t ? "gravit-icon-folderopen" : "gravit-icon-folderclose")
                    : e instanceof GObject.GSlice
                      ? (n = "gravit-icon-slice")
                      : e instanceof GObject.GGroup
                        ? (n = "gravit-icon-group")
                        : e instanceof GObject.GShape
                          ? e instanceof GObject.GPathsGraph
                              ? (n = "gravit-icon-pathgraph3")
                              : e instanceof GObject.GSimpleShape
                                ? (n = e.getIcon())
                                : e instanceof GObject.GText
                                  ? ((n = "gravit-icon-textbox"), e.isFakeText() && (i = $("<div></div>").addClass("layer-icon-overlay")))
                                  : e instanceof GObject.GImage
                                    ? (n = "gravit-icon-picture")
                                    : e instanceof GObject.GEllipse
                                      ? (n = "gravit-icon-ellipse")
                                      : e instanceof GObject.GRectangle
                                        ? (n = "gravit-icon-rectangle")
                                        : e instanceof GObject.GPath || e instanceof GObject.GCompoundPath
                                          ? (n = "gravit-icon-pen")
                                          : e instanceof GObject.GPolygon
                                            ? (n = "gravit-icon-polygon")
                                            : e instanceof GObject.GCompoundShape && (n = "gravit-icon-merge-union")
                          : e instanceof GObject.GSymbol &&
                            ((n = "gravit-icon-symbol"),
                            e.isMaster() ? (n += "master") : e.getMasterSymbol() ? (n += "instance") : (n += "detached")),
                e instanceof GObject.GShape && e.getParent() instanceof GObject.GCompoundShape && e.getPrevious())
            )
                switch (e.getProperty("bool")) {
                    case GObject.GVertexPolyBoolean.OR:
                        n = "gravit-icon-merge-union";
                        break;
                    case GObject.GVertexPolyBoolean.AND:
                        n = "gravit-icon-merge-intersect";
                        break;
                    case GObject.GVertexPolyBoolean.SUB:
                        n = "gravit-icon-merge-subtract";
                        break;
                    case GObject.GVertexPolyBoolean.XOR:
                        n = "gravit-icon-merge-difference";
                }
            return { icon: n, overlayIcon: i };
        }
    };
