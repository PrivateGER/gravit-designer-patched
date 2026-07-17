module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.buildLayerItemContainer = function (element, node, hasSelection, isExpanded) {
                var container = $(element);
                (container.attr("draggable", false),
                    container.gPro({
                        pro: node instanceof GObject.GElement && !!node.getProperty("_pro", true),
                    }));
                var titleGroup = $("<span></span>").addClass("layer-title-group").toggleClass("g-selected", node.hasFlag(GObject.GNode.Flag.Selected));
                (titleGroup.appendTo(container),
                    container
                        .on("mouseenter", function (event) {
                            node.hasFlag(GObject.GElement.Flag.Hidden) || node.setFlag(GObject.GNode.Flag.Highlighted);
                        })
                        .on("mouseleave", function (event) {
                            node.hasFlag(GObject.GElement.Flag.Hidden) || node.removeFlag(GObject.GNode.Flag.Highlighted);
                        }));
                var nodeName = node.getProperty("name");
                nodeName = nodeName || node.getNodeNameTranslated();
                var titleSpan = $("<span></span>").html(nodeName);
                titleSpan.addClass("layer-title").appendTo(titleGroup);
                var isSymbolInstance = function (candidate) {
                    return candidate instanceof GObject.GSymbol && !!candidate.getMasterSymbol();
                };
                (isSymbolInstance(node) || node.findParent(isSymbolInstance)) && container.addClass("g-symbol-row");
                container.toggleClass("g-active", node.hasFlag(GObject.GNode.Flag.Active))
                    .toggleClass("g-has-selection", hasSelection)
                    .toggleClass("g-selected", node.hasFlag(GObject.GNode.Flag.Selected));
                var iconContainer,
                    { icon, overlayIcon } = getIconByLayerType(node, isExpanded);
                icon &&
                    ("<svg" === icon.substr(0, 4)
                        ? (iconContainer = $("<span></span>")
                              .addClass("layer-icon")
                              .append(
                                  $(icon).addClass("layer-icon").attr({ width: "16px", height: "16px" }).css({
                                      verticalAlign: "middle",
                                      paddingLeft: "1px",
                                      opacity: "initial",
                                  })
                              )
                              .insertBefore(titleSpan))
                        : (gDesigner.isTouchEnabled() && (icon += "-small"),
                          (iconContainer = $("<span></span>")
                              .addClass("layer-icon " + icon)
                              .css({ opacity: "initial" })
                              .insertBefore(titleSpan))));
                overlayIcon && iconContainer && overlayIcon.appendTo(iconContainer);
                return { container: container, title: titleSpan, titleGroup: titleGroup };
            }),
            (exports.getIconByLayerType = getIconByLayerType),
            (exports.getLayerOrItemStatus = function (node) {
                var parentHidden = false,
                    parentLockType = null,
                    parentOutlined = false,
                    ancestor = node;
                for (; (ancestor = ancestor.getParent()) && !(ancestor instanceof GObject.GScene); ) {
                    (ancestor instanceof GObject.GBlock &&
                        ((parentHidden = false === ancestor.getProperty("vis") || parentHidden),
                        (lockType = ancestor.getProperty("lkt")) && (parentLockType ? lockType === GObject.GBlock.LockType.Full && (parentLockType = lockType) : (parentLockType = lockType))),
                        ancestor instanceof GObject.GLayer && (parentOutlined = true === ancestor.getProperty("otl") || parentOutlined));
                }
                var isHidden = parentHidden || false === node.getProperty("vis"),
                    lockType = parentLockType || node.getProperty("lkt"),
                    isOutlined = parentOutlined || (node instanceof GObject.GLayer && node.getProperty("otl")),
                    hasSelection = false;
                if (node.hasMixin(GObject.GNode.Container))
                    for (var child = node.getFirstChild(); null !== child && !hasSelection; child = child.getNext())
                        child instanceof GObject.GItem && child.hasFlag(GObject.GNode.Flag.Selected) && (hasSelection = true);
                return {
                    parentHidden: parentHidden,
                    parentLockType: parentLockType,
                    parentOutlined: parentOutlined,
                    isHidden: isHidden,
                    lockType: lockType,
                    isOutlined: isOutlined,
                    hasSelection: hasSelection,
                };
            }));
        var GObject = require(1);
        function getIconByLayerType(node, isExpanded) {
            var iconName = null,
                overlayIcon = null;
            if (
                (node instanceof GObject.GLayer
                    ? (iconName = isExpanded ? "gravit-icon-folderopen" : "gravit-icon-folderclose")
                    : node instanceof GObject.GSlice
                      ? (iconName = "gravit-icon-slice")
                      : node instanceof GObject.GGroup
                        ? (iconName = "gravit-icon-group")
                        : node instanceof GObject.GShape
                          ? node instanceof GObject.GPathsGraph
                              ? (iconName = "gravit-icon-pathgraph3")
                              : node instanceof GObject.GSimpleShape
                                ? (iconName = node.getIcon())
                                : node instanceof GObject.GText
                                  ? ((iconName = "gravit-icon-textbox"), node.isFakeText() && (overlayIcon = $("<div></div>").addClass("layer-icon-overlay")))
                                  : node instanceof GObject.GImage
                                    ? (iconName = "gravit-icon-picture")
                                    : node instanceof GObject.GEllipse
                                      ? (iconName = "gravit-icon-ellipse")
                                      : node instanceof GObject.GRectangle
                                        ? (iconName = "gravit-icon-rectangle")
                                        : node instanceof GObject.GPath || node instanceof GObject.GCompoundPath
                                          ? (iconName = "gravit-icon-pen")
                                          : node instanceof GObject.GPolygon
                                            ? (iconName = "gravit-icon-polygon")
                                            : node instanceof GObject.GCompoundShape && (iconName = "gravit-icon-merge-union")
                          : node instanceof GObject.GSymbol &&
                            ((iconName = "gravit-icon-symbol"),
                            node.isMaster() ? (iconName += "master") : node.getMasterSymbol() ? (iconName += "instance") : (iconName += "detached")),
                node instanceof GObject.GShape && node.getParent() instanceof GObject.GCompoundShape && node.getPrevious())
            )
                switch (node.getProperty("bool")) {
                    case GObject.GVertexPolyBoolean.OR:
                        iconName = "gravit-icon-merge-union";
                        break;
                    case GObject.GVertexPolyBoolean.AND:
                        iconName = "gravit-icon-merge-intersect";
                        break;
                    case GObject.GVertexPolyBoolean.SUB:
                        iconName = "gravit-icon-merge-subtract";
                        break;
                    case GObject.GVertexPolyBoolean.XOR:
                        iconName = "gravit-icon-merge-difference";
                }
            return { icon: iconName, overlayIcon: overlayIcon };
        }
    };
