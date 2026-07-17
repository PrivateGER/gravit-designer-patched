module.exports = function (module, exports, require) {
        "use strict";
        var Utils = require(40);
        function DraggablePoint(element, mouseMoveCallback, mouseUpCallback) {
            ((this.element = element), (this.mouseMoveCallback = mouseMoveCallback || Utils.fakeFunction), (this.mouseUpCallback = mouseUpCallback || Utils.fakeFunction), this.init());
        }
        ((DraggablePoint.prototype.init = function () {
            ((this._handleMouseDown = this._handleMouseDown.bind(this)),
                (this._onDragStart = this._onDragStart.bind(this)),
                (this._onMouseUp = this._onMouseUp.bind(this)),
                (this._onMouseMove = this._onMouseMove.bind(this)),
                this.element.addEventListener("mousedown", this._handleMouseDown),
                (this.element.style.position = "absolute"));
        }),
            (DraggablePoint.prototype._updateElementOffset = function (pageX, pageY) {
                const rect = this.element.getBoundingClientRect();
                ((this._offsetX = pageX - rect.left), (this._offsetY = pageY - rect.top));
            }),
            (DraggablePoint.prototype._resetElementOffset = function () {
                ((this._offsetX = 0), (this._offsetY = 0));
            }),
            (DraggablePoint.prototype._hasElementOffset = function () {
                return !!this._offsetX && !!this._offsetY;
            }),
            (DraggablePoint.prototype._handleMouseDown = function (event) {
                (event.preventDefault(),
                    event.stopPropagation(),
                    this._resetElementOffset(),
                    document.addEventListener("mousemove", this._onMouseMove),
                    document.addEventListener("mouseup", this._onMouseUp),
                    this.element.addEventListener("dragstart", this._onDragStart),
                    this.moveTo(event.pageX, event.pageY));
            }),
            (DraggablePoint.prototype.moveTo = function (pageX, pageY, resetOffset) {
                (resetOffset ? this._resetElementOffset() : this._hasElementOffset() || this._updateElementOffset(pageX, pageY),
                    this.mouseMoveCallback({
                        elementX: pageX - this._offsetX,
                        elementY: pageY - this._offsetY,
                        centerX: pageX - this._offsetX / 2,
                        centerY: pageY - this._offsetY / 2,
                        pageX: pageX,
                        pageY: pageY,
                    }));
            }),
            (DraggablePoint.prototype._onMouseMove = function (event) {
                this.moveTo(event.pageX, event.pageY);
            }),
            (DraggablePoint.prototype._onDragStart = function () {
                return false;
            }),
            (DraggablePoint.prototype._onMouseUp = function (event) {
                (this.unmount(), this.mouseUpCallback(event));
            }),
            (DraggablePoint.prototype.unmount = function () {
                (document.removeEventListener("mousemove", this._onMouseMove),
                    document.removeEventListener("mouseup", this._onMouseUp),
                    this.element.removeEventListener("mousedown", this._handleMouseDown),
                    this.element.removeEventListener("dragstart", this._onDragStart));
            }),
            (module.exports = DraggablePoint));
    };
