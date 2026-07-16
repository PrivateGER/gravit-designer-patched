module.exports = function (module, exports, require) {
            var GSelectTool = require(334),
                r = require(159),
                IsFiniteNonNegativeNumber = require(0);

            function a() {
                (GSelectTool.call(this), (this._onlyLayers = true));
            }
            (require(760),
                IsFiniteNonNegativeNumber.inherit(a, GSelectTool),
                (a.prototype._onlyLayers = false),
                (a.prototype.activate = function (e, t) {
                    GSelectTool.prototype.activate.call(this, e, t);
                    var i = true;
                    if (this._editor) {
                        var o = this._editor.getSelection();
                        if (o && o.length) for (var a = 0; a < o.length && i; ++a) i = o[a] instanceof r;
                        if (!i) {
                            this._editor && !t && this._editor.storeSelection();
                            var s = this._scene.getActiveLayer();
                            s ? this._editor.updateSelection(false, [s]) : this._editor.clearSelection();
                        }
                    }
                    this._onlyLayers = i;
                }),
                (a.prototype.deactivate = function (e, t) {
                    (!this._editor || t || this._onlyLayers || this._editor.restoreSelection(), GSelectTool.prototype.deactivate.call(this, e, t));
                }),
                (a.prototype._getSelectableElement = function (e, t) {
                    for (var i = e; null !== i; i = i.getParent()) if (i instanceof r) return i;
                    return this._scene.getActiveLayer();
                }),
                (a.prototype.toString = function () {
                    return "[Object GLayerTool]";
                }),
                (module.exports = a));
        };
