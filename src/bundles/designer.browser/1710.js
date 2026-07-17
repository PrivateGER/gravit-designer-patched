module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */),
            require(3),
            require(4),
            require(1352),
            (module.exports = (namespace) => {
                ((namespace._DragAndDropHelper = function (vtree) {
                    this._vtree = vtree;
                }),
                    (namespace._DragAndDropHelper.prototype._droppableNodeUpper = null),
                    (namespace._DragAndDropHelper.prototype._droppableNodeLower = null),
                    (namespace._DragAndDropHelper.prototype._droppableNodeInside = null),
                    (namespace._DragAndDropHelper.prototype.setDroppableNodeInside = function (node) {
                        ((node && node === this._droppableNodeInside) ||
                            (this._droppableNodeInside && this._droppableNodeInside.row.classList.remove(this._vtree._insertIntoStyle)),
                            (this._droppableNodeInside = node),
                            node && this._droppableNodeInside.row.classList.add(this._vtree._insertIntoStyle));
                    }),
                    (namespace._DragAndDropHelper.prototype.setDroppableNodeLower = function (node) {
                        ((this._droppableNodeLower = node), (this._droppableNodeUpper = null));
                        const dragNode = this._vtree._dragNode;
                        (this._vtree.beginUpdate(),
                            this._vtree.removeNode(dragNode),
                            this._vtree.insertNodeAfter(node, dragNode),
                            this._vtree.endUpdate(true));
                    }),
                    (namespace._DragAndDropHelper.prototype.setDroppableNodeUpper = function (node) {
                        ((this._droppableNodeUpper = node), (this._droppableNodeLower = null));
                        const dragNode = this._vtree._dragNode;
                        (this._vtree.beginUpdate(),
                            this._vtree.removeNode(dragNode),
                            this._vtree.insertNodeBefore(node, dragNode),
                            this._vtree.endUpdate(true));
                    }),
                    (namespace._DragAndDropHelper.prototype.drop = function () {
                        const dragNode = this._vtree._dragNode,
                            root = this._vtree._root;
                        if (this._droppableNodeInside) {
                            const parentNode = this._droppableNodeInside;
                            (this._vtree.beginUpdate(),
                                this._vtree.removeNode(dragNode),
                                this._vtree.appendNode(parentNode, dragNode),
                                this._vtree.endUpdate(true),
                                this._vtree._dropCallback && this._vtree._dropCallback(parentNode, null, null, [dragNode]));
                        } else if (this._droppableNodeUpper) {
                            const upperNode = this._droppableNodeUpper;
                            this._vtree._dropCallback &&
                                (upperNode !== root
                                    ? this._vtree._dropCallback(upperNode.parent, dragNode.next, dragNode.previous, [dragNode])
                                    : this._vtree._dropCallback(root, null, null, [dragNode]));
                        } else if (this._droppableNodeLower) {
                            const lowerNode = this._droppableNodeLower;
                            this._vtree._dropCallback && this._vtree._dropCallback(lowerNode.parent, dragNode.next, dragNode.previous, [dragNode]);
                        }
                    }),
                    (namespace._DragAndDropHelper.prototype.toString = function () {
                        return "[Object GVirtualTree._DragAndDropHelper]";
                    }));
            }));
    };
