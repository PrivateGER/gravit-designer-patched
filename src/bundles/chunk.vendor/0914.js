module.exports = function (module, exports, require) {
            var n = require(2);
            module.exports = function (e) {
                ((e.Linkable = function () {}),
                    (e.Linkable.MetaProperties = {
                        targetGuid: null,
                    }),
                    (e.Linkable.prototype._restoredReferences = null),
                    (e.Linkable.prototype.getAnnotableReferences = function () {
                        throw new Error("Not implemented");
                    }),
                    (e.prototype._handleAnnotationLinkableChange = function (e, t) {
                        if (e === n._Change.Store) {
                            var i = this.getAnnotableReferences();
                            i &&
                                i.length &&
                                (t.blob.annotablerefs = i.map(function (e) {
                                    return e.getReferenceId();
                                }));
                        } else
                            e === n._Change.Restore &&
                                t.blob.hasOwnProperty("annotablerefs") &&
                                (this._restoredReferences = t.blob.annotablerefs);
                    }),
                    (e.Linkable.prototype._getRestoredAnnotableReferences = function () {
                        return this._restoredReferences;
                    }),
                    (e.Linkable.prototype._resetRestoredAnnotableReferences = function () {
                        this._restoredReferences = null;
                    }));
            };
        };
