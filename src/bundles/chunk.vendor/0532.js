module.exports = function (module, exports, require) {
            var n = require(84);

            function r() {}
            ((r.prototype.linkAnnotation = function (e) {
                return !(!e.hasMixin(n.Linkable) || !this._scene) && (this._scene.link(this, e), true);
            }),
                (r.prototype.getLinkedAnnotations = function () {
                    var e = [];
                    return (
                        this._scene &&
                            this._scene.visitLinks(this, function (t) {
                                t.hasMixin(n) && e.push(t);
                            }),
                        e
                    );
                }),
                (module.exports = r));
        };
