module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1);
        function i(container, renderer, nodeStyle, expandStyle, i, nodeExpand, upSpan1Style, upSpan2Style, downSpan1Style, downSpan2Style) {
            ((this._container = container),
                (this._renderer = renderer),
                (this._nodeStyle = nodeStyle),
                (this._expandStyle = expandStyle),
                (this._nodeClick = i),
                (this._nodeExpand = nodeExpand),
                (this._upSpan1Style = upSpan1Style),
                (this._upSpan2Style = upSpan2Style),
                (this._downSpan1Style = downSpan1Style),
                (this._downSpan2Style = downSpan2Style));
        }
        ((i.GSimpleTreeNodeNamed = function (id) {
            this.id = id;
        }),
            (i.GSimpleTreeNodeNamed.prototype.id = -1),
            (i.GSimpleTreeNodeNamed.prototype.virtualNode = false),
            (i.GSimpleTreeNodeNamed.prototype._depth = void 0),
            (i.GSimpleTreeNodeNamed.prototype.isVisible = function () {
                return true;
            }),
            (i.EXPAND_ID = GObject.GUtil.uuid()),
            (i.COLLAPSE_ID = GObject.GUtil.uuid()),
            (i.prototype._container = null),
            (i.prototype._renderer = null),
            (i.prototype._nodeStyle = null),
            (i.prototype._expandStyle = null),
            (i.prototype._nodeClick = null),
            (i.prototype._nodeExpand = null),
            (i.prototype._upSpan1Style = null),
            (i.prototype._upSpan2Style = null),
            (i.prototype._downSpan1Style = null),
            (i.prototype._downSpan2Style = null),
            (i.prototype._updateCount = 0),
            (i.prototype._nodes = []),
            (i.prototype._invalidation = null),
            (i.prototype.refresh = function () {
                this.requestInvalidation();
            }),
            (i.prototype._checkTreeSanity = function () {
                return true;
            }),
            (i.prototype._isInvalidationBlocked = function () {
                return true;
            }),
            (i.prototype._beforeInvalidationStart = async function (invalidationOptions) {}),
            (i.prototype._afterInvalidationEnd = function (invalidationOptions) {}),
            (i.prototype.requestInvalidation = function (delay, invalidationOptions) {
                if (null === this._invalidation) {
                    var containerElement = $(this._container);
                    if (!this._checkTreeSanity()) return;
                    this._invalidation = setTimeout(() => {
                        if (this._isInvalidationBlocked()) return ((this._invalidation = null), void this.requestInvalidation(500));
                        this._beforeInvalidationStart(invalidationOptions).then(() => {
                            containerElement.empty();
                            let fragment = document.createDocumentFragment();
                            for (let t = 0; t < this._nodes.length; t++) {
                                let rowElement = this._newNode(this._nodes[t]),
                                    extraElement = this._renderer(this._nodes[t], rowElement[0]);
                                ($(fragment).append(rowElement),
                                    rowElement.hasClass("last-row") && $(fragment).append($("<div/>").addClass("last-row-division")),
                                    extraElement && extraElement.length && rowElement.before(extraElement));
                            }
                            (containerElement.append(fragment), this._afterInvalidationEnd(), (this._invalidation = null));
                        });
                    }, delay || 1);
                }
            }),
            (i.prototype.expandAndFocus = function () {}),
            (i.prototype.beginUpdate = function () {
                this._updateCount++;
            }),
            (i.prototype.endUpdate = function (invalidationOptions) {
                ((this._updateCount = Math.max(0, this._updateCount - 1)), 0 === this._updateCount && this.requestInvalidation(0, invalidationOptions));
            }),
            (i.prototype._newNode = function (node) {
                return $("<div>")
                    .addClass(this._nodeStyle)
                    .attr("id", node.id)
                    .css("padding-left", 25 * node._depth)
                    .on("click", (event) => {
                        (event.stopPropagation(), this._nodeClick(node));
                    });
            }),
            (i.prototype.appendNode = function (parentNode, node, appendAtEnd) {
                var parentIndex = parentNode ? this._nodes.indexOf(parentNode) : 0;
                if (parentIndex < 0) console.error("no parent found");
                else if (this._nodes.indexOf(node) >= 0) console.error("node already added");
                else {
                    var insertIndex,
                        parentDepth = parentNode ? parentNode._depth : -1;
                    if (((node._depth = parentDepth + 1), appendAtEnd))
                        for (var r = (insertIndex = parentNode ? parentIndex + 1 : 0); r < this._nodes.length; r++) {
                            if (this._nodes[r]._depth <= parentDepth || this._nodes[r].virtualNode) {
                                insertIndex = Math.max(0, r - 1);
                                break;
                            }
                            insertIndex = r;
                        }
                    else insertIndex = parentNode ? parentIndex : 0;
                    var refNode = null;
                    ((refNode = insertIndex >= this._nodes.length ? (this._nodes.length ? this._nodes[this._nodes.length - 1] : null) : this._nodes[insertIndex]),
                        this.insertNodeAfter(refNode, node));
                }
            }),
            (i.prototype.prependNode = function (parentNode, node) {
                if ((parentNode ? this._nodes.indexOf(parentNode) : 0) < 0) console.error("no parent found");
                else if (this._nodes.indexOf(node) >= 0) console.error("node already added");
                else {
                    var parentDepth = parentNode ? parentNode._depth : -1;
                    ((node._depth = parentDepth + 1), this.insertNodeAfter(parentNode, node));
                }
            }),
            (i.prototype.removeNode = function (node) {
                var index = this._nodes.indexOf(node);
                if (!(index < 0)) {
                    var containerElement = $(this._container);
                    (containerElement.find("#" + this._nodes[index].id).remove(), this._nodes.splice(index, 1));
                    for (var childNode = this._nodes[index]; childNode && node._depth < childNode._depth; )
                        (containerElement.find("#" + childNode.id).remove(), this._nodes.splice(index, 1), (childNode = this._nodes[index]));
                }
            }),
            (i.prototype.insertNodeAfter = function (referenceNode, node) {
                var n = referenceNode ? this._nodes.indexOf(referenceNode) : this._nodes.length;
                if (n < 0) console.error("no ref node found");
                else if (this._nodes.indexOf(node) >= 0) console.error("node already added");
                else {
                    var refDepth = referenceNode ? referenceNode._depth : 0;
                    if (void 0 === node._depth) node._depth = refDepth;
                    else if (node._depth > refDepth) return void this._nodes.splice(n + 1, 0, node);
                    for (
                        n += 1;
                        this._nodes[n] &&
                        (this._nodes[n]._depth > refDepth || (this._nodes[n].virtualNode && (0 === refDepth || this._nodes[n]._depth < refDepth)));

                    )
                        n++;
                    n >= this._nodes.length ? this._nodes.push(node) : this._nodes.splice(n, 0, node);
                }
            }),
            (i.prototype.insertNodeBefore = function (referenceNode, node) {
                var n = referenceNode ? this._nodes.indexOf(referenceNode) : -1;
                if (n < 0) console.error("no ref node found");
                else if (this._nodes.indexOf(node) >= 0) console.error("node already added");
                else {
                    var refDepth = referenceNode ? referenceNode._depth : 0;
                    for (void 0 === node._depth && (node._depth = refDepth); n >= 0 && (this._nodes[n]._depth > refDepth || this._nodes[n].virtualNode); ) n--;
                    n < 0 ? this._nodes.unshift(node) : this._nodes.splice(n, 0, node);
                }
            }),
            (i.prototype.clean = function () {
                ((this._nodes = []), this.requestInvalidation());
            }),
            (i.prototype.isPendingInvalidation = function () {
                return null !== this._invalidation;
            }),
            (i.prototype.refresh = function () {}),
            (module.exports = i));
    };
