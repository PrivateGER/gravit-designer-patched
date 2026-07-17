module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(26));
        require(53);
        var GObject = require(1),
            LayerItemUtil = (require(15 /* GPlatform */), require(40 /* Utils */), require(67 /* GRichTooltipConfig */), require(1351 /* layerItemUtils */)),
            GVirtualTree = require(451 /* GVirtualTree */).GVirtualTree,
            GVirtualTreeNodeNamed = (require(451 /* GVirtualTree */).GVirtualTreeNode, require(451 /* GVirtualTree */).GVirtualTreeNodeNamed),
            { VTREE_FREE_HEIGHT } = require(10 /* designerConfig */);
        (require(173), require(450));
        function GSelectedPanel() {}
        function handleNodeClick(nodeEvent) {
            var panel = $(this).data("gselectedpanel"),
                vtree = $(this).data("gselectedpanel").vtree;
            if (panel.options.clickCallback) {
                var node = getNodeById.call(this, nodeEvent.id);
                panel.options.clickCallback(node);
            }
            vtree.requestInvalidation();
        }
        function handleNodeToggle(nodeEvent) {
            var node = getNodeById.call(this, nodeEvent.id);
            node && (nodeEvent.expanded ? node.setFlag(GObject.GNode.Flag.Expanded) : node.removeFlag(GObject.GNode.Flag.Expanded));
        }
        function renderNode(nodeEvent, container) {
            var panel = $(this).data("gselectedpanel");
            panel.options.renderer && panel.options.renderer(nodeEvent.id, nodeEvent.expanded, container);
        }
        function renderToggleIcon(toggleElement) {
            var panelElement = $(this);
            toggleElement.id === GVirtualTree.COLLAPSE_ID
                ? $(toggleElement).addClass(panelElement.data("gselectedpanel").options.collapseStyle)
                : toggleElement.id === GVirtualTree.EXPAND_ID && $(toggleElement).addClass(panelElement.data("gselectedpanel").options.expandStyle);
        }
        function getNodeById(nodeId) {
            var entry = getTreeEntry.call(this, nodeId);
            return entry ? entry.node : null;
        }
        function getTreeEntry(nodeId) {
            return $(this).data("gselectedpanel").layersTreeNodeMap[nodeId];
        }
        function renderLayerItem(nodeId, expanded, container) {
            $(this).data("glayerpanel");
            var entry = getTreeEntry.call(this, nodeId),
                node = entry ? entry.node : null;
            if (node) {
                var { hasSelection } = (0, LayerItemUtil.getLayerOrItemStatus)(node),
                    { titleGroup } = (0, LayerItemUtil.buildLayerItemContainer)(container, node, hasSelection, expanded);
                entry.element = titleGroup;
            }
        }
        function createAndAppendNode(nodeId, parentNode, expanded) {
            var { newNode, vtree } = createNode.call(this, nodeId, expanded);
            return (vtree.appendNode(parentNode, newNode), newNode);
        }
        function createNode(nodeId, expanded) {
            return {
                newNode: new GVirtualTreeNodeNamed(nodeId, expanded),
                vtree: $(this).data("gselectedpanel").vtree,
            };
        }
        function populateTree() {
            var panel = $(this).data("gselectedpanel"),
                vtree = panel.vtree;
            vtree.beginUpdate();
            for (
                var { elementHits, filteredElementHits, submenus } = panel.selections,
                    registerNode = (treeNode, sourceNode, nodeId) => {
                        ((panel.layersTreeNodeMap[nodeId] = { element: null, node: sourceNode, treeNode: treeNode }),
                            panel.layersTreeNodeMapByNodes.set(sourceNode, {
                                element: null,
                                treeNode: treeNode,
                                treeId: nodeId,
                            }));
                    },
                    s = 0;
                s < filteredElementHits.length;
                s++
            ) {
                var l = GObject.GUtil.uuid(),
                    c = filteredElementHits[s].element,
                    d = (c instanceof GObject.GBlock ? c.getLabel() : c.getNodeNameTranslated(), "temp-" + elementHits.indexOf(filteredElementHits[s]));
                if (submenus[d]) {
                    registerNode((parentTreeNode = createAndAppendNode.call(this, l, null, true)), c, l);
                    for (let e = 0; e < submenus[d].length; e++) {
                        var u = GObject.GUtil.uuid();
                        registerNode(createAndAppendNode.call(this, u, parentTreeNode, false), submenus[d][e], u);
                    }
                } else {
                    var parentTreeNode;
                    registerNode((parentTreeNode = createAndAppendNode.call(this, l, null, false)), c, l);
                }
            }
            vtree.endUpdate();
        }
        function resetTree() {
            var panel = $(this).data("gselectedpanel");
            (panel.vtree.clean(), (panel.layersTreeNodeMap = {}), (panel.layersTreeNodeMapByNodes = new Map()));
        }
        GObject.GObject.inheritAndMix(GSelectedPanel, GObject.GObject);
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            nodeStyle: "selected-row",
                            expandStyle: "selected-arrow gravit-icon-right",
                            collapseStyle: "selected-arrow gravit-icon-down",
                            freeHeight: 0,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: renderLayerItem.bind(this),
                            toggleRenderer: renderToggleIcon.bind(this),
                            separatorRenderer: null,
                            canDropCallback: () => false,
                            moveCallback: null,
                            isDuplicateEffectCallback: null,
                            duplicateCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                            patternChooserStatusChangeCallBack: null,
                            bottomHeight: 3,
                        },
                        options
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-selected-panel")
                            .data("gselectedpanel", {
                                vtree: new GVirtualTree(
                                    this,
                                    renderNode.bind(this),
                                    options.nodeStyle,
                                    options.toggleRenderer ? options.toggleRenderer : null,
                                    options.expandStyle == options.collapseStyle ? options.expandStyle : null,
                                    options.separatorRenderer ? options.separatorRenderer : null,
                                    options.freeHeight,
                                    options.insertIntoStyle,
                                    () => false,
                                    null,
                                    options.isDuplicateEffectCallback,
                                    null,
                                    handleNodeClick.bind(this),
                                    handleNodeToggle.bind(this),
                                    options.upSeparatorSpan1Style,
                                    options.upSeparatorSpan2Style,
                                    options.downSeparatorSpan1Style,
                                    options.downSeparatorSpan2Style,
                                    false,
                                    15,
                                    21,
                                    options.bottomHeight,
                                    options.renderFinishCallback
                                ),
                                options: options,
                                layersTreeNodeMap: {},
                                layersTreeNodeMapByNodes: new Map(),
                                selections: null,
                                currentFocus: null,
                            });
                    })
                );
            },
            refresh: function () {
                $(this).data("gselectedpanel").vtree.refresh();
            },
            relayout: function () {
                $(this).data("gselectedpanel").vtree.requestInvalidation();
            },
            setSelections: function (selections) {
                var panelElement = $(this),
                    panel = panelElement.data("gselectedpanel");
                return arguments.length ? (selections !== panel.selections && (resetTree.call(this), (panel.selections = selections), populateTree.call(this)), this) : panel.selections;
            },
        };
        ((module.exports = GSelectedPanel),
            ($.fn.gSelectedPanel = function (method) {
                return methods[method]
                    ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof method && method
                      ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                      : methods.init.apply(this, arguments);
            }));
    };
