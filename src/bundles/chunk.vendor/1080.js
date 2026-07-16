module.exports = function (module, exports, require) {
            var n = require(77),
                r = require(24),
                o = require(327);

            function a() {}
            ((a.prototype._view = null),
                (a.prototype.setView = function (e) {
                    this._view !== e &&
                        (this._view && this._view.removeEventListener(n.Click, this._mouseClick, this),
                        (this._view = e),
                        this._view && this._view.addEventListener(n.Click, this._mouseClick, this));
                }),
                (a.prototype._mouseClick = function (e) {
                    var t = this._view.getScene(),
                        i = t.hitTest(
                            e.client,
                            this._view.getWorldTransform(t),
                            function (e) {
                                return e.hasMixin(o);
                            },
                            false,
                            -1,
                            r.pickDistance,
                            false,
                            null,
                            false,
                            false,
                            this._view.getViewConfiguration().multiPageView,
                            false
                        );
                    i &&
                        i[0] &&
                        i[0].element &&
                        i[0].data &&
                        i[0].data.action &&
                        i[0].data.action.execute(i[0].element, this._view.getEditor(), this._view);
                }),
                (module.exports = a));
        };
