module.exports = function (module, exports, require) {
        "use strict";
        function o() {
            this._queue = new Set();
        }
        (require(19),
            require(8 /* Symbol */),
            require(26),
            (o.prototype._queue = null),
            (o.prototype._isProcessing = false),
            (o.prototype._onNext = null),
            (o.prototype.add = function (e) {
                return (this._queue.add(e), this);
            }),
            (o.prototype.delete = function (e) {
                return (this._queue.delete(e), this);
            }),
            (o.prototype.has = function (e) {
                return this._queue.has(e);
            }),
            (o.prototype.onNext = async function (e) {
                this._onNext = e;
            }),
            (o.prototype.process = async function () {
                if (!this._isProcessing) return ((this._isProcessing = true), await this._processQueue(), (this._isProcessing = false), this);
            }),
            (o.prototype._processQueue = async function () {
                const e = this._queue.values().next().value;
                e &&
                    (await this._onNext(e).catch((e) => {
                        console.error("[GQueue] - It should never get here", e);
                    }),
                    this._queue.delete(e),
                    await this._processQueue());
            }),
            (module.exports = o));
    };
