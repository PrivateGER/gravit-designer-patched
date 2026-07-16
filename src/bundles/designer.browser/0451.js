module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(8 /* Symbol */), require(3), require(4), require(1352), require(13));
        var GObject = require(1),
            GVirtualList = require(1709);
        function GVirtualTreeNode() {}
        function GVirtualTreeNodeNamed(id, expanded) {
            ((this.id = id), (this.expanded = expanded));
        }
        function GVirtualTree(container, renderer, rowStyle, expandRenderer, expandStyle, separatorRenderer, freeHeight, insertIntoStyle, dropAllowedCallback, dropCallback, isDuplicateEffectCallback, duplicateCallback, clickCallback, expandCallback, upSeparatorSpan1Style, upSeparatorSpan2Style, downSeparatorSpan1Style, downSeparatorSpan2Style, putLastChildWhenInside, rootIndentation, indentation, bottomPadding, renderFinishCallback) {
            ((this._root = new GVirtualTreeNode()),
                (this._root.expanded = true),
                (this._root.parent = this),
                (this._rootIndentation = rootIndentation || 15),
                (this._indentation = indentation || 15),
                (this._bottomPadding = bottomPadding || 0),
                GVirtualList.call(this, container, renderer, 0, 0),
                this._container.classList.add("g-virtual-tree"),
                (this._rowStyle = rowStyle || GVirtualTree.DEFAULT_ROW_STYLE),
                (this._freeHeight = isNaN(freeHeight) ? GVirtualTree.DEFAULT_FREEZONE_HEIGHT : freeHeight),
                (this._insertIntoStyle = insertIntoStyle || GVirtualTree.DEFAULT_INSERTINTO_STYLE),
                (this._upSeparatorSpan1Style = upSeparatorSpan1Style || GVirtualTree.DEFAULT_UP_SEPARATOR_SPAN1_STYLE),
                (this._downSeparatorSpan1Style = downSeparatorSpan1Style || GVirtualTree.DEFAULT_DOWN_SEPARATOR_SPAN1_STYLE),
                this._initComputedVals(),
                expandStyle && (this._expandStyle = expandStyle),
                expandRenderer && (this._expandRenderer = expandRenderer),
                separatorRenderer && (this._separatorRenderer = separatorRenderer),
                upSeparatorSpan2Style && (this._upSeparatorSpan2Style = upSeparatorSpan2Style),
                downSeparatorSpan2Style && (this._downSeparatorSpan2Style = downSeparatorSpan2Style),
                dropAllowedCallback && (this._dropAllowedCallback = dropAllowedCallback),
                dropCallback && (this._dropCallback = dropCallback),
                isDuplicateEffectCallback && duplicateCallback && ((this._isDuplicateEffectCallback = isDuplicateEffectCallback), (this._duplicateCallback = duplicateCallback)),
                clickCallback && (this._clickCallback = clickCallback),
                expandCallback && (this._expandCallback = expandCallback),
                renderFinishCallback && (this._renderFinishCallback = renderFinishCallback),
                (this._putLastChildWhenInside = !!putLastChildWhenInside),
                (this._aScroll = new AutoScroller(this._container, 200, 10, null, 7)),
                (this._drag = this._drag.bind(this)));
        }
        function AutoScroller(elem, scrollDelay, step, axisFlag, scrollAreaWidth) {
            ((this._elem = elem),
                (this._scrollDelay = scrollDelay || 30),
                (this._step = step || 1),
                (this._axisFlag = axisFlag || AutoScroller.SCROLL_AXIS_FLAG.Y | AutoScroller.SCROLL_AXIS_FLAG.X),
                (this._scAreaWidth = scrollAreaWidth || 5),
                this._fixupHandler("onmouseout", this.offScrolls.bind(this)),
                this._fixupHandler("ondragleave", this.offScrolls.bind(this)));
        }
        ((GVirtualTreeNode._Change = { ExpandedSet: 1, ExpandedRemoved: 2 }),
            (GVirtualTreeNode.prototype.parent = null),
            (GVirtualTreeNode.prototype.previous = null),
            (GVirtualTreeNode.prototype.next = null),
            (GVirtualTreeNode.prototype.firstChild = null),
            (GVirtualTreeNode.prototype.lastChild = null),
            (GVirtualTreeNode.prototype.expanded = false),
            (GVirtualTreeNode.prototype.dragging = false),
            (GVirtualTreeNode.prototype.row = null),
            (GVirtualTreeNode.prototype.acceptChildren = function (callback, visibleOnly, reverse, collectAll) {
                var result,
                    anyMatched = !collectAll;
                if (!visibleOnly || this.expanded)
                    if (reverse)
                        for (var child = this.lastChild; null != child; child = child.previous) {
                            if (false === (result = child.accept(callback, visibleOnly, reverse, collectAll)) && !collectAll) return false;
                            true === result && collectAll && (anyMatched = true);
                        }
                    else
                        for (child = this.firstChild; null != child; child = child.next) {
                            if (false === (result = child.accept(callback, visibleOnly, reverse, collectAll)) && !collectAll) return false;
                            true === result && collectAll && (anyMatched = true);
                        }
                return anyMatched;
            }),
            (GVirtualTreeNode.prototype.accept = function (callback, visibleOnly, reverse, collectAll) {
                return false !== callback.call(null, this) && this.acceptChildren(callback, visibleOnly, reverse, collectAll);
            }),
            (GVirtualTreeNode.prototype.getNestLevel = function () {
                for (var e = 0, ancestor = this.parent; null != ancestor && ancestor instanceof GVirtualTreeNode; ancestor = ancestor.parent) ++e;
                return e;
            }),
            (GVirtualTreeNode.prototype.isVisible = function () {
                for (var ancestor = this.parent; ancestor instanceof GVirtualTreeNode; ) {
                    if (!ancestor.expanded) return false;
                    ancestor = ancestor.parent;
                }
                return true;
            }),
            (GVirtualTreeNode.prototype.handleChange = function (changeType, node) {
                (changeType != GVirtualTreeNode._Change.ExpandedSet && changeType != GVirtualTreeNode._Change.ExpandedRemoved) || (this.parent && this.parent.handleChange(changeType, node));
            }),
            (GVirtualTreeNode.prototype.handleExpand = function (event) {
                event.target.id === GVirtualTree.COLLAPSE_ID && this.expanded
                    ? ((this.expanded = false), this.handleChange(GVirtualTreeNode._Change.ExpandedSet, this))
                    : event.target.id !== GVirtualTree.EXPAND_ID ||
                      this.expanded ||
                      ((this.expanded = true), this.handleChange(GVirtualTreeNode._Change.ExpandedRemoved, this));
            }),
            (GVirtualTreeNode.prototype.getNodeCount = function () {
                var e = 0;
                return (
                    this.accept(function (t) {
                        return (++e, true);
                    }, false),
                    e
                );
            }),
            (GVirtualTreeNode.prototype.getBBox = function () {
                if (this.row) {
                    const rect = this.row.getBoundingClientRect();
                    return new GObject.GRect(rect.x, rect.y, rect.width, rect.height);
                }
                return new GObject.GRect(0, 0, 0, 0);
            }),
            (GVirtualTreeNode.prototype.getNextFocusableNode = function () {
                return this.expanded
                    ? this.firstChild
                    : this.next ||
                          (this.parent && this.parent.next) ||
                          (this.parent.row ? this.parent.parent.firstChild : this.parent.firstChild);
            }),
            (GVirtualTreeNode.prototype.getPreviousFocusableNode = function () {
                return this.previous && this.previous.expanded
                    ? this.previous.lastChild
                    : !this.previous && this.parent.expanded && this.parent.row
                      ? this.parent
                      : this.previous || (this.parent.lastChild.expanded ? this.parent.lastChild.lastChild : this.parent.lastChild);
            }),
            (GVirtualTreeNode.prototype.setDragging = function (dragging) {
                this.accept((node) => {
                    node.dragging = dragging;
                });
            }),
            (GVirtualTreeNode.prototype.toString = function () {
                return "[GVirtualTreeNode]";
            }),
            (GVirtualTreeNodeNamed.prototype = Object.create(GVirtualTreeNode.prototype)),
            (GVirtualTreeNodeNamed.prototype.id = null),
            (GVirtualTreeNodeNamed.prototype.expanded = void 0),
            (GVirtualTree.DEFAULT_ROW_STYLE = "vrow"),
            (GVirtualTree.DEFAULT_INSERTINTO_STYLE = "insertInto"),
            (GVirtualTree.DEFAULT_LINE_HEIGHT = 30),
            (GVirtualTree.DEFAULT_FREEZONE_HEIGHT = 7),
            (GVirtualTree.DEFAULT_UP_SEPARATOR_SPAN1_STYLE = "up-separator-span1"),
            (GVirtualTree.DEFAULT_DOWN_SEPARATOR_SPAN1_STYLE = "down-separator-span1"),
            (GVirtualTree.COLLAPSE_ID = "clpsId"),
            (GVirtualTree.EXPAND_ID = "xpndId"),
            (GVirtualTree.ROW_ID = "rowId"),
            (GVirtualTree.LOWER_SEP_ID = "lsepId"),
            (GVirtualTree.UPPER_SEP_ID = "usepId"),
            (GVirtualTree.prototype = Object.create(GVirtualList.prototype)),
            (GVirtualTree.IdxIterator = function (vtree, firstIdx, lastIdx, visibleOnly) {
                ((this._vtree = vtree),
                    (this._firstIdx = firstIdx || 1),
                    (this._lastIdx = visibleOnly
                        ? lastIdx && lastIdx <= this._vtree._rowCount
                            ? lastIdx
                            : this._vtree._rowCount
                        : lastIdx && lastIdx <= this._vtree._nodeCount
                          ? lastIdx
                          : this._vtree._nodeCount),
                    (this._visibleOnly = !!visibleOnly));
            }),
            (GVirtualTree.IdxIterator.prototype._vtree = null),
            (GVirtualTree.IdxIterator.prototype._firstIdx = 0),
            (GVirtualTree.IdxIterator.prototype._lastIdx = 0),
            (GVirtualTree.IdxIterator.prototype._visibleOnly = false),
            (GVirtualTree.IdxIterator.prototype._curNode = null),
            (GVirtualTree.IdxIterator.prototype._curIdx = 0),
            (GVirtualTree.IdxIterator.prototype.getFirstNode = function () {
                return (
                    this._firstIdx <= this._lastIdx
                        ? ((this._curIdx = this._firstIdx), (this._curNode = this._vtree._getNodeByIdx(this._curIdx, this._visibleOnly)))
                        : ((this._curIdx = this._lastIdx + 1), (this._curNode = null)),
                    this._curNode
                );
            }),
            (GVirtualTree.IdxIterator.prototype.getNext = function () {
                return this._curIdx
                    ? ((this._curIdx = this._curIdx <= this._lastIdx ? this._curIdx + 1 : this._curIdx),
                      this._curIdx <= this._lastIdx && this._curNode
                          ? (this._curNode = this._vtree.getNextNode(this._curNode, this._visibleOnly))
                          : (this._curNode = null),
                      this._curNode)
                    : this.getFirstNode();
            }),
            (GVirtualTree.prototype._root = null),
            (GVirtualTree.prototype._nodeCount = 0),
            (GVirtualTree.prototype._rowStyle = null),
            (GVirtualTree.prototype._rootIndentation = 15),
            (GVirtualTree.prototype._indentation = 21),
            (GVirtualTree.prototype._bottomPadding = 0),
            (GVirtualTree.prototype._containerWidth = 0),
            (GVirtualTree.prototype._expandedWidth = 0),
            (GVirtualTree.prototype._expandStyle = null),
            (GVirtualTree.prototype._dragNodes = null),
            (GVirtualTree.prototype._freeHeight = 0),
            (GVirtualTree.prototype._upSeparatorStyle = null),
            (GVirtualTree.prototype._downSeparatorStyle = null),
            (GVirtualTree.prototype._insertIntoStyle = null),
            (GVirtualTree.prototype._downSepHeight = 0),
            (GVirtualTree.prototype._dropAllowedCallback = null),
            (GVirtualTree.prototype._dropCallback = null),
            (GVirtualTree.prototype._renderFinishCallback = null),
            (GVirtualTree.prototype._dragStartPt = null),
            (GVirtualTree.prototype._dragLastPt = null),
            (GVirtualTree.prototype._dragBBox = null),
            (GVirtualTree.prototype._dragNode = null),
            (GVirtualTree.prototype._dragAndDropHelper = null),
            (GVirtualTree.prototype._animatedDragEnabled = false),
            (GVirtualTree.prototype._dragByMouse = false),
            (GVirtualTree.prototype._isDuplicateEffectCallback = null),
            (GVirtualTree.prototype._duplicateCallback = null),
            (GVirtualTree.prototype._clickCallback = null),
            (GVirtualTree.prototype._expandCallback = null),
            (GVirtualTree.prototype._putLastChildWhenInside = false),
            (GVirtualTree.prototype._invalidationRequestTimerId = null),
            (GVirtualTree.prototype._focusTimerId = null),
            (GVirtualTree.prototype._updateMarksTimerId = null),
            (GVirtualTree.prototype._aScroll = null),
            (GVirtualTree.prototype._freeZone = null),
            (GVirtualTree.prototype._lastVisitedDroppable = null),
            (GVirtualTree.prototype.endUpdate = function (immediate) {
                0 == --this._updateCounter && this.requestInvalidation(immediate);
            }),
            (GVirtualTree.prototype.refresh = function () {
                (this._initComputedVals(), this.requestInvalidation(true));
            }),
            (GVirtualTree.prototype.expandAndFocus = function (node, skipInvalidate) {
                for (var n = 0, ancestor = node; ancestor.parent && ancestor.parent !== this._root; )
                    (ancestor = ancestor.parent).expanded || ((ancestor.expanded = true), this._expandCallback && this._expandCallback(ancestor));
                if (this._focusTimerId) return false;
                (this._root.acceptChildren(function (child) {
                    return child !== node && (n++, true);
                }, true),
                    skipInvalidate || this.invalidate());
                var targetOffset = n * this._rowHeight,
                    currentScrollTop = this._container.scrollTop;
                return (
                    0 === this._visibleRows && this._updateVisibleRows(),
                    (currentScrollTop > targetOffset || targetOffset - currentScrollTop >= this._rowHeight * this._visibleRows) &&
                        (this._focusTimerId = setTimeout(
                            function () {
                                ((this._container.scrollTop = targetOffset), (this._focusTimerId = null));
                            }.bind(this, 50)
                        )),
                    true
                );
            }),
            (GVirtualTree.prototype.requestInvalidation = function (immediate) {
                immediate
                    ? this._updateCounter || (this.invalidate(), this._renderFinishCallback && this._renderFinishCallback())
                    : this._updateCounter ||
                      (null === this._invalidationRequestTimerId &&
                          (this._invalidationRequestTimerId = setTimeout(
                              function () {
                                  (this.requestInvalidation(true), (this._invalidationRequestTimerId = null));
                              }.bind(this),
                              25
                          )));
            }),
            (GVirtualTree.prototype.handleChange = function (changeType, node) {
                (changeType != GVirtualTreeNode._Change.ExpandedSet && changeType != GVirtualTreeNode._Change.ExpandedRemoved) || this.requestInvalidation(true);
            }),
            (GVirtualTree.prototype.invalidate = function () {
                (this._updateRowCount(),
                    this._updateVisibleRows(),
                    this._updateScroller(),
                    this._requestViewportClean(),
                    this._render(),
                    (this._lastRenderScrollTop = this._container.scrollTop));
            }),
            (GVirtualTree.prototype.getNextNode = function (node, visibleOnly) {
                var current = node,
                    next = null;
                if (visibleOnly) for (; current.parent instanceof GVirtualTreeNode && !current.parent.expanded; ) current = current.parent;
                if ((!current.firstChild || (visibleOnly && !current.expanded) || (next = current.firstChild), !next && current.next && (next = current.next), !next))
                    for (var ancestor = current.parent; !next && ancestor instanceof GVirtualTreeNode && ancestor !== this._root; ancestor = ancestor.parent) ancestor.next && (next = ancestor.next);
                return next;
            }),
            (GVirtualTree.prototype.appendNode = function (parent, newNode) {
                return this._insertNodeBefore(parent || this._root, null, newNode);
            }),
            (GVirtualTree.prototype.prependNode = function (parent, newNode) {
                return this._insertNodeBefore(parent || this._root, parent ? parent.firstChild : this._root.firstChild, newNode);
            }),
            (GVirtualTree.prototype.insertNodeBefore = function (refNode, newNode) {
                return this._insertNodeBefore(refNode.parent, refNode, newNode);
            }),
            (GVirtualTree.prototype.insertNodeAfter = function (refNode, newNode) {
                return this._insertNodeBefore(refNode.parent, refNode.next ? refNode.next : null, newNode);
            }),
            (GVirtualTree.prototype.removeNode = function (node) {
                (node.parent &&
                    (node.parent.firstChild == node && (node.parent.firstChild = node.next),
                    node.parent.lastChild == node && (node.parent.lastChild = node.previous)),
                    null != node.previous && (node.previous.next = node.next),
                    null != node.next && (node.next.previous = node.previous));
                var parent = node.parent;
                parent &&
                    ((node.parent = null),
                    (node.previous = null),
                    (node.next = null),
                    node.firstChild ? (this._nodeCount -= node.getNodeCount()) : --this._nodeCount,
                    node.expanded && node.firstChild ? this._updateRowCount() : parent.expanded && --this._rowCount,
                    parent.expanded &&
                        !parent.firstChild &&
                        parent !== this._root &&
                        parent.expanded &&
                        (parent.handleChange(GVirtualTreeNode._Change.ExpandedRemoved, parent), (parent.expanded = false), this._expandCallback && this._expandCallback(parent)),
                    parent.expanded && this.requestInvalidation());
            }),
            (GVirtualTree.prototype.clean = function () {
                ((this._nodeCount = 0),
                    (this._rowCount = 0),
                    (this._root = new GVirtualTreeNode()),
                    (this._root.expanded = true),
                    (this._root.parent = this),
                    (this._dragNodes = null),
                    this.requestInvalidation(true));
            }),
            (GVirtualTree.prototype.acceptChildren = function (callback, visibleOnly, reverse, collectAll) {
                return this._root.acceptChildren(callback, visibleOnly, reverse, collectAll);
            }),
            (GVirtualTree.prototype.getLastVisitedDroppable = function () {
                return this._lastVisitedDroppable;
            }),
            (GVirtualTree.prototype._updateScroller = function () {
                ((this._scroller.style.height = (this._rowCount * this._rowHeight + this._freeHeight).toString() + "px"),
                    this._scroller.scrollHeight < this._container.clientHeight
                        ? (this._scroller.style.borderRight = "none")
                        : (this._scroller.style.borderRight = ""));
            }),
            (GVirtualTree.prototype._isDragging = function () {
                return !!this._dragNode;
            }),
            (GVirtualTree.prototype._renderViewport = function (startIndex) {
                const notDragging = !this.isAnimatedDragEnabled() || !this._isDragging();
                if (notDragging) {
                    ((this._freeZone = null), (this._lastVisitedDroppable = null));
                    for (var n = 1, childCount = this._container.childNodes.length; n < childCount; n++)
                        ((this._container.childNodes[n].style.display = "none"),
                            this._container.childNodes[n].setAttribute("data-clean", ""));
                }
                if (this._rowCount && this._renderer && this._rowHeight) {
                    for (
                        var endIndex = Math.min(this._rowCount, startIndex + this._cachedRows),
                            fragment = document.createDocumentFragment(),
                            iterator = new GVirtualTree.IdxIterator(this, startIndex + 1, endIndex, true),
                            l = startIndex,
                            node = iterator.getFirstNode();
                        null != node;
                        node = iterator.getNext(), ++l
                    ) {
                        const existingRow = node.row;
                        var d = !notDragging && existingRow ? existingRow : document.createElement("div");
                        ((d.id = GVirtualTree.ROW_ID), d.classList.add(this._rowStyle), (d.style.top = (l * this._rowHeight).toString() + "px"));
                        var u = this._rootIndentation + this._indentation * (node.getNestLevel() - 1);
                        if (((d.style.paddingLeft = u.toString() + "px"), node.expanded || node.firstChild)) {
                            var p = document.createElement("span");
                            (node.expanded ? (p.id = GVirtualTree.COLLAPSE_ID) : (p.id = GVirtualTree.EXPAND_ID),
                                this._expandStyle && p.classList.add(this._expandStyle),
                                this._expandRenderer(p),
                                (!notDragging && existingRow) || d.appendChild(p));
                        }
                        (this.isAnimatedDragEnabled()
                            ? (d.classList.add("g-drag-vrow"),
                              d.classList.toggle("g-drag-mouse", !!this._dragByMouse),
                              d.classList.toggle("g-dragging", !!node.dragging))
                            : (d.classList.remove("g-drag-vrow"), d.classList.remove("g-drag-mouse"), d.classList.remove("g-dragging")),
                            notDragging || !existingRow
                                ? (d.addEventListener("click", this._nodeClick.bind(this, node)),
                                  d.setAttribute("draggable", true),
                                  d.addEventListener("draginit", this._nodeDragInit.bind(this, node)),
                                  d.addEventListener("dragstart", this._nodeDragStart.bind(this, node)),
                                  d.addEventListener("dragend", this._nodeDragEnd.bind(this, node)),
                                  this.isAnimatedDragEnabled() ||
                                      (d.addEventListener("dragenter", this._nodeDragEnter.bind(this, node)),
                                      d.addEventListener("dragover", this._nodeDragOver.bind(this, node)),
                                      d.addEventListener("dragleave", this._nodeDragLeave.bind(this, node)),
                                      d.addEventListener("dragexit", this._nodeDragExit.bind(this, node)),
                                      d.addEventListener("drop", this._nodeDrop.bind(this, node))),
                                  (d._specCounter = 0),
                                  (d._hasStyle = false),
                                  (node.row = d),
                                  this._renderer(node, d),
                                  fragment.appendChild(d))
                                : notDragging ||
                                  (d.hasAttribute("data-clean") && (d.removeAttribute("data-clean"), (d.style.display = "")),
                                  d.parentNode || fragment.appendChild(d)));
                    }
                    if (endIndex == this._rowCount && !this.isAnimatedDragEnabled()) {
                        var freeZoneElem = document.createElement("div");
                        ((freeZoneElem.style.position = "absolute"),
                            (freeZoneElem.style.height = this._freeHeight.toString() + "px"),
                            (freeZoneElem.style.top = (endIndex * this._rowHeight).toString() + "px"),
                            freeZoneElem.addEventListener("dragenter", this._nodeDragEnter.bind(this, this._root)),
                            freeZoneElem.addEventListener("dragover", this._nodeDragOver.bind(this, this._root)),
                            freeZoneElem.addEventListener("dragleave", this._nodeDragLeave.bind(this, this._root)),
                            freeZoneElem.addEventListener("drop", this._nodeDrop.bind(this, this._root)),
                            fragment.appendChild(freeZoneElem),
                            (this._freeZone = freeZoneElem));
                    }
                    (this._container.appendChild(fragment), (this._expandedWidth = this._container.scrollWidth));
                    for (n = 1, childCount = this._container.childNodes.length; n < childCount; n++)
                        if ("none" !== this._container.childNodes[n].style.display) {
                            getComputedStyle(this._container.childNodes[n]);
                            this._container.childNodes[n].style.width = this._expandedWidth + "px";
                        }
                }
            }),
            (GVirtualTree.prototype._initComputedVals = function () {
                this._containerWidth = parseInt(this._container.clientWidth);
                var measureRow = document.createElement("div");
                (measureRow.classList.add(this._rowStyle), (measureRow.style.visibility = "hidden"), this._container.appendChild(measureRow));
                var computedStyle = getComputedStyle(measureRow),
                    height = parseInt(computedStyle.height);
                this._rowHeight = (height || 20) + this._bottomPadding;
                var measureSep = document.createElement("div");
                (measureSep.classList.add(this._downSeparatorStyle),
                    (measureSep.style.display = "none"),
                    measureRow.appendChild(measureSep),
                    (this._downSepHeight = parseInt(getComputedStyle(measureSep).height)),
                    (this._expandedWidth = this._container.scrollWidth),
                    this._container.removeChild(measureRow));
            }),
            (GVirtualTree.prototype._insertNodeBefore = function (parent, beforeNode, newNode) {
                return (
                    (newNode.parent = parent),
                    null != beforeNode
                        ? ((newNode.next = beforeNode),
                          (newNode.previous = beforeNode.previous),
                          (beforeNode.previous = newNode),
                          null == newNode.previous ? (parent.firstChild = newNode) : (newNode.previous.next = newNode))
                        : (null != parent.lastChild && ((newNode.previous = parent.lastChild), (parent.lastChild.next = newNode), (parent.lastChild = newNode)), (newNode.next = null)),
                    null == parent.firstChild && ((parent.firstChild = newNode), (newNode.previous = null), (newNode.next = null)),
                    null == newNode.next && (parent.lastChild = newNode),
                    newNode.firstChild ? (this._nodeCount += newNode.getNodeCount()) : ++this._nodeCount,
                    newNode.expanded && newNode.firstChild ? this._updateRowCount() : parent.expanded && ++this._rowCount,
                    (parent.expanded || (!parent.expanded && parent.firstChild == parent.lastChild)) && this.requestInvalidation(),
                    this
                );
            }),
            (GVirtualTree.prototype._expandRenderer = function (icon) {
                icon.id === GVirtualTree.COLLAPSE_ID ? (icon.innerHTML = "&#9660;") : icon.id === GVirtualTree.EXPAND_ID && (icon.innerHTML = "&#9658;");
            }),
            (GVirtualTree.prototype._separatorRenderer = function (element, nestLevel) {
                var width = this._expandedWidth || this._container.scrollWidth;
                ((element.style.width = width.toString() + "px"),
                    (element.style.height = this._freeHeight.toString() + "px"),
                    (element.style.position = "absolute"),
                    (element.style.pointerEvents = "none"));
                var span1 = document.createElement("span"),
                    span2Style = null;
                (element.id == GVirtualTree.UPPER_SEP_ID
                    ? (span1.classList.add(this._upSeparatorSpan1Style),
                      (span2Style = this._upSeparatorSpan2Style ? this._upSeparatorSpan2Style : null),
                      (element.style.top = "0px"))
                    : (span1.classList.add(this._downSeparatorSpan1Style),
                      (span2Style = this._downSeparatorSpan2Style ? this._downSeparatorSpan2Style : null),
                      (element.style.top = (this._rowHeight - this._freeHeight).toString() + "px")),
                    element.appendChild(span1));
                getComputedStyle(span1);
                if (span2Style) {
                    var span2 = document.createElement("span");
                    (span2.classList.add(span2Style), element.appendChild(span2));
                }
            }),
            (GVirtualTree.prototype._updateRowCount = function () {
                var e = 0;
                (this._root.acceptChildren(function (t) {
                    return (++e, true);
                }, true),
                    (this._rowCount = e));
            }),
            (GVirtualTree.prototype._getNodeByIdx = function (targetIndex, visibleOnly) {
                var n = 0,
                    found = null;
                return (
                    this._root.acceptChildren(function (node) {
                        return ++n != targetIndex || ((found = node), false);
                    }, visibleOnly),
                    found
                );
            }),
            (GVirtualTree.prototype._nodeHasSomeParent = function (node, target) {
                for (var found = false, ancestor = node.parent; ancestor && ancestor instanceof GVirtualTreeNode && !found; ancestor = ancestor.parent) found = ancestor === target;
                return found;
            }),
            (GVirtualTree.prototype._nodeClick = function (node, event) {
                (!node.expanded && !node.firstChild) || (event.target.id !== GVirtualTree.COLLAPSE_ID && event.target.id !== GVirtualTree.EXPAND_ID)
                    ? this._clickCallback && (event.stopPropagation(), this._clickCallback(node))
                    : (event.stopPropagation(), node.handleExpand(event), this._expandCallback && this._expandCallback(node));
            }),
            (GVirtualTree.prototype.setDragNodes = function (nodes) {
                nodes && nodes.length && (this._dragNodes = nodes.slice());
            }),
            (GVirtualTree.prototype.setAnimatedDragEnabled = function (enabled) {
                this._animatedDragEnabled !== enabled && ((this._animatedDragEnabled = enabled), this.requestInvalidation(true));
            }),
            (GVirtualTree.prototype.isAnimatedDragEnabled = function () {
                return this._animatedDragEnabled;
            }),
            (GVirtualTree.prototype._onScroll = function (event) {
                this.isAnimatedDragEnabled() && this._isDragging() ? event.preventDefault() : GVirtualList.prototype._onScroll.call(this, event);
            }),
            (GVirtualTree.prototype._nodeDragInit = function (node, event) {
                this.isAnimatedDragEnabled() &&
                    ((this._dragNode = node),
                    (this._dragBBox = node.getBBox()),
                    (this._dragStartPt = new GObject.GPoint(event.clientX, event.clientY)),
                    (this._dragOffset = this._dragStartPt.subtract(this._dragBBox.getSide(GObject.GRect.Side.TOP_LEFT))),
                    (this._dragAndDropHelper = new GVirtualTree._DragAndDropHelper(this)));
            }),
            (GVirtualTree.prototype._nodeDragStart = function (node, event) {
                (this._dragNodes || (this._dragNodes = [node]),
                    event.dataTransfer.setData("text/plain", "some_dummy_data"),
                    event.target.classList.add("g-drag"),
                    this.isAnimatedDragEnabled()
                        ? ((this._dragByMouse = !!event.isTrusted),
                          this._dragNode || this._nodeDragInit(node, event),
                          document.addEventListener("drag", this._drag, true),
                          node.setDragging(true),
                          this.requestInvalidation(true))
                        : this._aScroll.enableAScroll());
            }),
            (GVirtualTree.prototype._moveDown = function (node, offset) {
                node !== this._dragNode &&
                    this._dragAndDropHelper &&
                    (Math.abs(offset.getY()) > this._freeHeight
                        ? this._canDropInside(node) && this._dragAndDropHelper.setDroppableNodeInside(node)
                        : this._canDropLower(node) && this._dragAndDropHelper.setDroppableNodeLower(node));
            }),
            (GVirtualTree.prototype._moveUp = function (node, offset) {
                node !== this._dragNode &&
                    this._dragAndDropHelper &&
                    (offset.getY() > this._freeHeight
                        ? this._canDropInside(node) && this._dragAndDropHelper.setDroppableNodeInside(node)
                        : this._canDropUpper(node) && this._dragAndDropHelper.setDroppableNodeUpper(node));
            }),
            (GVirtualTree.prototype._canDropUpper = function (node) {
                const dragNodeIsFreeZone = this._dragNode.row === this._freeZone;
                return this._dropHereAllowed(node) && this._dropUpperAllowed(node, 0, null, dragNodeIsFreeZone);
            }),
            (GVirtualTree.prototype._canDropLower = function (node) {
                return this._dropHereAllowed(node) && this._dropLowerAllowed(node, this._rowHeight);
            }),
            (GVirtualTree.prototype._canDropInside = function (node) {
                return this._dropHereAllowed(node) && node !== this._root && this._dropInsideAllowed(node);
            }),
            (GVirtualTree.prototype._getOffset = function (node, rect) {
                const topLeft = node.getBBox().getSide(GObject.GRect.Side.TOP_LEFT);
                return rect.getSide(GObject.GRect.Side.TOP_LEFT).subtract(topLeft);
            }),
            (GVirtualTree.prototype._drag = function (event) {
                if (!this._dragAndDropHelper) return;
                const point = new GObject.GPoint(event.clientX, event.clientY),
                    delta = point.subtract(this._dragLastPt || this._dragStartPt),
                    deltaY = parseInt(delta.getY());
                if (0 === deltaY) return;
                this._dragLastPt = new GObject.GPoint(event.clientX, event.clientY);
                const offsetPoint = point.subtract(this._dragOffset),
                    dragRect = new GObject.GRect(offsetPoint.getX(), offsetPoint.getY(), this._dragBBox.getWidth(), this._dragBBox.getHeight()),
                    intersecting = [];
                (this._root.acceptChildren((child) => {
                    if (this._dragNode !== child)
                        if (child.getBBox().intersectsRect(dragRect)) intersecting.push(child);
                        else if (intersecting.length > 0) return false;
                }, true),
                    this._dragAndDropHelper.setDroppableNodeInside(null));
                const movingDown = deltaY > 0;
                if (1 === intersecting.length) {
                    const node = intersecting[0],
                        offset = this._getOffset(node, dragRect);
                    movingDown ? this._moveDown(node, offset) : this._moveUp(node, offset);
                } else if (2 === intersecting.length)
                    if (movingDown) {
                        const node = intersecting[1],
                            offset = this._getOffset(node, dragRect);
                        this._moveDown(node, offset);
                    } else {
                        const node = intersecting[0],
                            offset = this._getOffset(node, dragRect);
                        this._moveUp(node, offset);
                    }
            }),
            (GVirtualTree.prototype._nodeDragEnd = function (node, event) {
                (document.removeEventListener("drag", this._drag, true),
                    gDesigner.setItemDraggingState(false),
                    $(event.target).closest(".g-drag").removeClass("g-drag"),
                    this.isAnimatedDragEnabled() &&
                        (node.setDragging(false),
                        this._dragAndDropHelper.drop(),
                        (this._dragNode = null),
                        (this._dragAndDropHelper = null),
                        this.expandAndFocus(node, true),
                        this.requestInvalidation(true)));
            }),
            (GVirtualTree.prototype._nodeDragEnter = function (node, event) {
                return (
                    event.preventDefault(),
                    event.stopPropagation(),
                    gDesigner.setItemDraggingState(true),
                    this._updateMarksTimerId && clearTimeout(this._updateMarksTimerId),
                    gDesigner.isTouchEnabled()
                        ? this._updateMarks(node, event.currentTarget, event.layerY, true)
                        : (this._updateMarksTimerId = setTimeout(
                              function (node, targetRow, layerY) {
                                  this._updateMarks(node, targetRow, layerY, true);
                              }.bind(this, node, event.currentTarget, event.layerY),
                              10
                          )),
                    (this._lastVisitedDroppable = event.currentTarget),
                    false
                );
            }),
            (GVirtualTree.prototype._nodeDragOver = function (node, event) {
                return (
                    event.preventDefault(),
                    event.stopPropagation(),
                    this._updateMarksTimerId && clearTimeout(this._updateMarksTimerId),
                    gDesigner.isTouchEnabled()
                        ? this._updateMarks(node, event.currentTarget, event.layerY, false)
                        : (this._updateMarksTimerId = setTimeout(
                              function (node, targetRow, layerY) {
                                  this._updateMarks(node, targetRow, layerY, false);
                              }.bind(this, node, event.currentTarget, event.layerY),
                              10
                          )),
                    this._aScroll.takeOnOffAction(event),
                    false
                );
            }),
            (GVirtualTree.prototype._nodeDragExit = function (node, event) {
                $(this._container).find(".g-drag").removeClass("g-no-drop");
            }),
            (GVirtualTree.prototype._nodeDragLeave = function (node, event) {
                return (
                    event.preventDefault(),
                    event.stopPropagation(),
                    event.currentTarget._hasStyle &&
                        (!event.currentTarget._specCounter || event.currentTarget._specCounter <= 1
                            ? ((event.currentTarget._specCounter = 0),
                              event.currentTarget.classList.remove(this._insertIntoStyle),
                              this._rowRemoveSep(event.currentTarget, GVirtualTree.LOWER_SEP_ID),
                              this._rowRemoveSep(event.currentTarget, GVirtualTree.UPPER_SEP_ID),
                              this._aScroll.takeOnOffAction(event))
                            : --event.currentTarget._specCounter),
                    false
                );
            }),
            (GVirtualTree.prototype._nodeDrop = function (node, event) {
                (event.preventDefault(), event.stopPropagation());
                var targetRow = this._lastVisitedDroppable ? this._lastVisitedDroppable : event.currentTarget,
                    layerY = event.layerY;
                if (((targetRow._specCounter = 0), this._dropHereAllowed(node))) {
                    (targetRow.classList.remove(this._insertIntoStyle),
                        this._rowRemoveSep(targetRow, GVirtualTree.LOWER_SEP_ID),
                        this._rowRemoveSep(targetRow, GVirtualTree.UPPER_SEP_ID),
                        (targetRow._hasStyle = false));
                    var droppedNodes = [],
                        isFreeZone = targetRow === this._freeZone;
                    if (this._dropUpperAllowed(node, layerY, droppedNodes, isFreeZone))
                        if ((droppedNodes.length || (droppedNodes = this._dragNodes), this._isDuplicateEffectCallback && this._isDuplicateEffectCallback(event)))
                            node !== this._root
                                ? this._duplicateCallback(node.parent, node, node.previous ? node.previous : null, droppedNodes)
                                : this._duplicateCallback(this._root, null, isFreeZone ? node.lastChild : null, droppedNodes);
                        else {
                            this.beginUpdate();
                            for (var r = 0; r < droppedNodes.length; ++r) this.removeNode(droppedNodes[r]);
                            if (node !== this._root) {
                                this._dropCallback && this._dropCallback(node.parent, node, node.previous ? node.previous : null, droppedNodes);
                                for (r = 0; r < droppedNodes.length; ++r) this.insertNodeBefore(node, droppedNodes[r]);
                            } else {
                                this._dropCallback && this._dropCallback(this._root, null, isFreeZone ? node.lastChild : null, droppedNodes);
                                for (r = 0; r < droppedNodes.length; ++r) this.appendNode(node, droppedNodes[r]);
                            }
                            ((this._dragNodes = null), this.endUpdate());
                        }
                    else if (this._dropLowerAllowed(node, layerY, droppedNodes))
                        if ((droppedNodes.length || (droppedNodes = this._dragNodes), this._isDuplicateEffectCallback && this._isDuplicateEffectCallback(event)))
                            this._duplicateCallback(node.parent, node.next ? node.next : null, node, droppedNodes);
                        else {
                            this.beginUpdate();
                            for (r = 0; r < droppedNodes.length; ++r) this.removeNode(droppedNodes[r]);
                            this._dropCallback && this._dropCallback(node.parent, node.next ? node.next : null, node, droppedNodes);
                            for (r = droppedNodes.length; r > 0; --r) this.insertNodeAfter(node, droppedNodes[r - 1]);
                            ((this._dragNodes = null), this.endUpdate());
                        }
                    else if (this._dropInsideAllowed(node, droppedNodes, isFreeZone))
                        if ((droppedNodes.length || (droppedNodes = this._dragNodes), this._isDuplicateEffectCallback && this._isDuplicateEffectCallback(event)))
                            this._duplicateCallback(node, null, null, droppedNodes);
                        else {
                            this.beginUpdate();
                            for (r = 0; r < droppedNodes.length; ++r) this.removeNode(droppedNodes[r]);
                            if (
                                (this._dropCallback && this._dropCallback(node, null, isFreeZone ? node.lastChild : null, droppedNodes),
                                this._putLastChildWhenInside || isFreeZone)
                            )
                                for (r = 0; r < droppedNodes.length; ++r) this.appendNode(node, droppedNodes[r]);
                            else for (r = droppedNodes.length; r > 0; --r) this.prependNode(node, droppedNodes[r - 1]);
                            ((this._dragNodes = null), this.endUpdate());
                        }
                }
                return ((this._dragNodes = null), this._aScroll.disableAScroll(), false);
            }),
            (GVirtualTree.prototype._dropHereAllowed = function (node) {
                for (var allowed = this._dragNodes && this._dragNodes.length, n = 0; allowed && n < this._dragNodes.length; ++n) {
                    var o = this._dragNodes[n];
                    allowed = o !== node && !this._nodeHasSomeParent(node, o);
                }
                return allowed;
            }),
            (GVirtualTree.prototype._dropUpperAllowed = function (node, layerY, droppedNodes, isFreeZone) {
                var allowed = layerY <= this._freeHeight && (this._dragNodes.length > 1 || node !== this._dragNodes[0].next);
                return (
                    allowed &&
                        this._dropAllowedCallback &&
                        (allowed =
                            (node !== this._root &&
                                this._dropAllowedCallback(node.parent, node, node.previous ? node.previous : null, this._dragNodes, droppedNodes)) ||
                            (node === this._root && this._dropInsideAllowed(node, droppedNodes, isFreeZone))),
                    allowed
                );
            }),
            (GVirtualTree.prototype._dropLowerAllowed = function (node, layerY, droppedNodes) {
                var allowed =
                    layerY >= this._rowHeight - this._freeHeight &&
                    !node.expanded &&
                    node !== this._root &&
                    (this._dragNodes.length > 1 || this._dragNodes[0] !== node.next);
                return (
                    allowed &&
                        this._dropAllowedCallback &&
                        (allowed = this._dropAllowedCallback(node.parent, node.next ? node.next : null, node, this._dragNodes, droppedNodes)),
                    allowed
                );
            }),
            (GVirtualTree.prototype._dropInsideAllowed = function (node, droppedNodes, isFreeZone) {
                var asLastChild = isFreeZone || this._putLastChildWhenInside,
                    allowed =
                        this._dragNodes.length > 1 ||
                        !(
                            this._dragNodes[0].parent === node &&
                            ((asLastChild && node.lastChild === this._dragNodes[0]) || (!asLastChild && node.firstChild === this._dragNodes[0]))
                        );
                return (
                    allowed &&
                        this._dropAllowedCallback &&
                        (allowed = this._dropAllowedCallback(node, asLastChild ? null : node.firstChild, asLastChild ? node.lastChild : null, this._dragNodes, droppedNodes)),
                    allowed
                );
            }),
            (GVirtualTree.prototype._drawUpperSeparator = function (node, row) {
                var nestLevel = node === this._root ? 0 : node.getNestLevel() - 1;
                this._rowAddSep(row, GVirtualTree.UPPER_SEP_ID, nestLevel);
            }),
            (GVirtualTree.prototype._drawLowerSeparator = function (node, row) {
                var nestLevel = node.getNestLevel() - 1;
                this._rowAddSep(row, GVirtualTree.LOWER_SEP_ID, nestLevel);
            }),
            (GVirtualTree.prototype._updateMarks = function (node, targetRow, layerY, isEnter) {
                let noValidDrop = true;
                if (this._dropHereAllowed(node)) {
                    var isFreeZone = targetRow === this._freeZone;
                    this._dropUpperAllowed(node, layerY, null, isFreeZone)
                        ? ((noValidDrop = false),
                          this._rowHasSep(targetRow, GVirtualTree.UPPER_SEP_ID) ||
                              (this._rowRemoveSep(targetRow, GVirtualTree.LOWER_SEP_ID),
                              (targetRow._specCounter = 0),
                              targetRow.classList.remove(this._insertIntoStyle),
                              this._drawUpperSeparator(node, targetRow)))
                        : this._dropLowerAllowed(node, layerY)
                          ? ((noValidDrop = false),
                            this._rowHasSep(targetRow, GVirtualTree.LOWER_SEP_ID) ||
                                (this._rowRemoveSep(targetRow, GVirtualTree.UPPER_SEP_ID),
                                (targetRow._specCounter = 0),
                                targetRow.classList.remove(this._insertIntoStyle),
                                this._drawLowerSeparator(node, targetRow)))
                          : node !== this._root &&
                            this._dropInsideAllowed(node) &&
                            ((noValidDrop = false),
                            this._rowRemoveSep(targetRow, GVirtualTree.LOWER_SEP_ID),
                            this._rowRemoveSep(targetRow, GVirtualTree.UPPER_SEP_ID),
                            targetRow.classList.add(this._insertIntoStyle),
                            (targetRow._hasStyle = true),
                            isEnter && (targetRow._specCounter ? ++targetRow._specCounter : (targetRow._specCounter = 1)));
                }
                $(this._container).find(".g-drag").toggleClass("g-no-drop", noValidDrop);
            }),
            (GVirtualTree.prototype._rowHasSep = function (row, sepId) {
                for (var n = 1, childCount = row.childNodes.length; n < childCount; n++) if (row.childNodes[n].id === sepId) return true;
                return false;
            }),
            (GVirtualTree.prototype._rowAddSep = function (row, sepId, nestLevel) {
                var sepElement = document.createElement("div");
                ((sepElement.id = sepId),
                    this._separatorRenderer(sepElement, nestLevel),
                    sepId == GVirtualTree.UPPER_SEP_ID ? row.insertBefore(sepElement, row.firstChild) : row.appendChild(sepElement),
                    (row._hasStyle = true));
            }),
            (GVirtualTree.prototype._rowRemoveSep = function (row, sepId) {
                for (var n = row.childNodes.length - 1; n >= 0; --n) row.childNodes[n].id === sepId && row.removeChild(row.childNodes[n]);
            }),
            (GVirtualTree.prototype.resetRowHeight = function (rowHeight) {
                this._rowHeight = rowHeight;
            }),
            (GVirtualTree.prototype.setFreeHeight = function (freeHeight) {
                this._freeHeight = freeHeight;
            }),
            (GVirtualTree.prototype.toString = function () {
                return "[GVirtualTree]";
            }),
            (AutoScroller.AUTO_SCROLL_Y = { OFF: 0, UP: 1, DOWN: 2 }),
            (AutoScroller.AUTO_SCROLL_X = { OFF: 0, LEFT: 1, RIGHT: 2 }),
            (AutoScroller.SCROLL_AXIS_FLAG = { X: 1, Y: 2 }),
            (AutoScroller.prototype._elem = null),
            (AutoScroller.prototype._timerId = null),
            (AutoScroller.prototype._scrollDelay = null),
            (AutoScroller.prototype._step = null),
            (AutoScroller.prototype._axisFlag = null),
            (AutoScroller.prototype._scAreaWidth = 0),
            (AutoScroller.prototype._aScrollEnabled = false),
            (AutoScroller.prototype._aScrollY = AutoScroller.AUTO_SCROLL_Y.OFF),
            (AutoScroller.prototype._aScrollX = AutoScroller.AUTO_SCROLL_X.OFF),
            (AutoScroller.prototype.enableAScroll = function () {
                ((this._aScrollEnabled = true), (this._timerId = setInterval(this._tryScroll.bind(this), this._scrollDelay)));
            }),
            (AutoScroller.prototype.disableAScroll = function () {
                ((this._aScrollEnabled = false), this._timerId && (clearInterval(this._timerId), (this._timerId = null)));
            }),
            (AutoScroller.prototype.takeOnOffAction = function (event) {
                if (this._aScrollEnabled) {
                    if (event.layerY == event.clientY || event.layerX == event.clientX)
                        return ((this._aScrollY = AutoScroller.AUTO_SCROLL_Y.OFF), void (this._aScrollX = AutoScroller.AUTO_SCROLL_X.OFF));
                    for (
                        var layerY = event.layerY, layerX = event.layerX, target = event.target;
                        target != this._elem && target;
                        target = target.offsetParent ? target.offsetParent : target.parentNode
                    )
                        target.offsetParent && ((layerY += target.offsetTop), (layerX += target.offsetLeft));
                    if (!target) return;
                    ((layerY -= this._elem.scrollTop),
                        (layerX -= this._elem.scrollLeft),
                        this._axisFlag & AutoScroller.SCROLL_AXIS_FLAG.Y &&
                            layerX > 0 &&
                            layerX < this._elem.offsetWidth &&
                            (layerY <= this._scAreaWidth
                                ? (this._aScrollY = AutoScroller.AUTO_SCROLL_Y.UP)
                                : layerY >= this._elem.offsetHeight - this._scAreaWidth
                                  ? (this._aScrollY = AutoScroller.AUTO_SCROLL_Y.DOWN)
                                  : (this._aScrollY = AutoScroller.AUTO_SCROLL_Y.OFF)),
                        this._axisFlag & AutoScroller.SCROLL_AXIS_FLAG.X &&
                            layerY > 0 &&
                            layerY < this._elem.offsetHeight &&
                            (layerX <= this._scAreaWidth
                                ? (this._aScrollX = AutoScroller.AUTO_SCROLL_X.LEFT)
                                : layerX >= this._elem.offsetWidth - this._scAreaWidth
                                  ? (this._aScrollX = AutoScroller.AUTO_SCROLL_X.RIGHT)
                                  : (this._aScrollX = AutoScroller.AUTO_SCROLL_X.OFF)));
                }
            }),
            (AutoScroller.prototype.offScrolls = function (event) {
                event.target === this._elem && ((this._aScrollY = AutoScroller.AUTO_SCROLL_Y.OFF), (this._aScrollX = AutoScroller.AUTO_SCROLL_X.OFF));
            }),
            (AutoScroller.prototype._tryScroll = function () {
                if (this._aScrollY !== AutoScroller.AUTO_SCROLL_Y.OFF || this._aScrollX !== AutoScroller.AUTO_SCROLL_X.OFF) {
                    if (this._aScrollY) {
                        var dirY = this._aScrollY == AutoScroller.AUTO_SCROLL_Y.UP ? -1 : 1;
                        this._elem.scrollTop += this._step * dirY;
                    }
                    if (this._aScrollX) {
                        var dirX = this._aScrollX == AutoScroller.AUTO_SCROLL_X.LEFT ? -1 : 1;
                        this._elem.scrollLeft += this._step * dirX;
                    }
                }
            }),
            (AutoScroller.prototype._fixupHandler = function (eventName, handler) {
                var newHandler, oldHandler;
                this._elem[eventName]
                    ? (this._elem[eventName] =
                          ((newHandler = handler),
                          (oldHandler = this._elem[eventName]),
                          function () {
                              return (newHandler.apply(this, arguments), oldHandler.apply(this, arguments));
                          }))
                    : (this._elem[eventName] = handler);
            }),
            require(1710)(GVirtualTree),
            (module.exports.GVirtualTreeNode = GVirtualTreeNode),
            (module.exports.GVirtualTreeNodeNamed = GVirtualTreeNodeNamed),
            (module.exports.GVirtualTree = GVirtualTree));
    };
