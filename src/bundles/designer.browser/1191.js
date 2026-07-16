module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(32), require(33));
        const { GObject } = require(1 /* GObject */),
            { GPlatform } = require(15 /* GPlatform */);
        function a() {
            this._children = [];
        }
        (GObject.inherit(a, GObject),
            (a.prototype._children = null),
            (a.prototype.clear = function () {
                (this._clearChildren(), this._clearOwnData());
            }),
            (a.prototype._clearOwnData = function () {}),
            (a.prototype._clearChildren = function () {
                (this._children && this._children.length && this._children.forEach((e) => e.clear()), (this._children = []));
            }),
            (a.prototype.clearChildren = function () {
                this._clearChildren();
            }),
            (a.prototype.getChildren = function () {
                return this._children;
            }),
            (a.prototype.addChild = function (e) {
                this._children.push(e);
            }),
            (a.prototype.scrollIntoView = function () {}),
            (a.prototype.setVisiblity = function (e) {
                throw Error("Not implemented!");
            }),
            (a.prototype._scrollToElement = function (e) {
                if (!e || !e[0]) return;
                const t = GPlatform.webBrowser === GPlatform.constructor.WebBrowser.Firefox,
                    n = t ? "start" : "nearest",
                    o = t ? "auto" : "smooth";
                "function" == typeof e[0].scrollIntoView && e[0].scrollIntoView({ behavior: o, block: n });
            }),
            (module.exports = a));
    };
