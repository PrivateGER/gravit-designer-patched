module.exports = function (module, exports, require) {
        "use strict";
        function o(container, renderer, rowCount, o) {
            ((rowCount = rowCount || 0),
                (o = o || 30),
                (this._scroller = document.createElement("div")),
                this._scroller.classList.add("vscroller"),
                (this._container = container),
                (this._container.style.overflow = "auto"),
                (this._container.style.position = "relative"),
                this._container.classList.add("g-virtual-list"),
                this._container.appendChild(this._scroller),
                this._container.addEventListener("scroll", this._onScroll.bind(this)),
                this.beginUpdate(),
                renderer && this._renderer(renderer),
                o && this.rowHeight(o),
                rowCount && this.rowCount(rowCount),
                this.endUpdate());
        }
        (require(57),
            require(3),
            (o.prototype._renderer = null),
            (o.prototype._rowHeight = 0),
            (o.prototype._rowCount = 0),
            (o.prototype._visibleRows = 0),
            (o.prototype._cachedRows = 0),
            (o.prototype._scroller = null),
            (o.prototype._updateCounter = 0),
            (o.prototype._lastRenderScrollTop = 0),
            (o.prototype._lastCleanedTime = 0),
            (o.prototype._cleanViewportTimerId = null),
            (o.prototype._renderer = function (value) {
                return arguments.length ? ((this._renderer = value), this._render(), this) : this._renderer;
            }),
            (o.prototype.rowHeight = function (value) {
                return arguments.length
                    ? ((this._rowHeight = value), this._updateVisibleRows(), this._updateScroller(), this._render(), this)
                    : this._rowHeight;
            }),
            (o.prototype.rowCount = function (value) {
                return arguments.length ? ((this._rowCount = value), this._updateScroller(), this._render(), this) : this._rowCount;
            }),
            (o.prototype.beginUpdate = function () {
                this._updateCounter++;
            }),
            (o.prototype.endUpdate = function () {
                0 == --this._updateCounter && this._render();
            }),
            (o.prototype.refresh = function () {
                return (this._updateVisibleRows(), this._updateScroller(), this._render(), this);
            }),
            (o.prototype._render = function () {
                if (0 === this._updateCounter) {
                    var scrollTop = this._container.scrollTop,
                        startRow = parseInt(scrollTop / this._rowHeight) - this._visibleRows;
                    this._renderViewport(startRow < 0 ? 0 : startRow);
                }
                return this;
            }),
            (o.prototype._updateVisibleRows = function () {
                ((this._visibleRows = Math.floor(this._container.offsetHeight / this._rowHeight)),
                    (this._cachedRows = 3 * this._visibleRows),
                    (this._scrollCacheSize = this._visibleRows * this._rowHeight));
            }),
            (o.prototype._updateScroller = function () {
                this._scroller.style.height = (this._rowCount * this._rowHeight).toString() + "px";
            }),
            (o.prototype._onScroll = function (event) {
                (event.preventDefault(), this._requestViewportClean());
                var scrollTop = this._container.scrollTop;
                (!this._lastRenderScrollTop || Math.abs(scrollTop - this._lastRenderScrollTop) > this._scrollCacheSize) &&
                    (this._updateVisibleRows(), this._render(), (this._lastRenderScrollTop = scrollTop));
            }),
            (o.prototype._renderViewport = function (startRow) {
                for (var t = 1, childCount = this._container.childNodes.length; t < childCount; t++)
                    ((this._container.childNodes[t].style.display = "none"), this._container.childNodes[t].setAttribute("data-clean", ""));
                if (this._rowCount && this._renderer && this._rowHeight) {
                    for (var endRow = Math.min(this._rowCount, startRow + this._cachedRows), fragment = document.createDocumentFragment(), a = startRow; a < endRow; a++) {
                        var r = document.createElement("div");
                        (r.classList.add("vrow"), (r.style.top = a * this._rowHeight + "px"), this._renderer(a, r), fragment.appendChild(r));
                    }
                    this._container.appendChild(fragment);
                }
            }),
            (o.prototype._requestViewportClean = function () {
                null === this._cleanViewportTimerId &&
                    (this._cleanViewportTimerId = setTimeout(
                        function () {
                            (Date.now() - this._lastCleanedTime > 100 && (this._cleanViewport(), (this._lastCleanedTime = Date.now())),
                                (this._cleanViewportTimerId = null));
                        }.bind(this),
                        300
                    ));
            }),
            (o.prototype._cleanViewport = function () {
                for (var cleanNodes = this._container.querySelectorAll("div[data-clean]"), t = 0, count = cleanNodes.length; t < count; t++)
                    (this._container.removeChild(cleanNodes[t]), this._jqueryCleanup(cleanNodes[t]));
            }),
            (o.prototype._jqueryCleanup = function (element) {
                window.hasOwnProperty("jQuery") &&
                    jQuery.hasOwnProperty("cleanData") &&
                    jQuery.hasOwnProperty("merge") &&
                    jQuery.cleanData(jQuery.merge(Array.prototype.slice.call(element.querySelectorAll("*")), element));
            }),
            (module.exports = o));
    };
