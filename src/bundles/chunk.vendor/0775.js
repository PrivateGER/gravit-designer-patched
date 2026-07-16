module.exports = function (module, exports, require) {
            require(7);
            var n = require(335),
                r = require(318),
                IsFiniteNonNegativeNumber = require(0),
                a = require(36),
                s = require(212),
                l = require(52);

            function h() {
                n.call(this, true, true);
            }
            (require(776),
                IsFiniteNonNegativeNumber.inheritAndMix(h, n, [s]),
                (h.prototype._getRelatedItemClass = function () {
                    return r;
                }),
                (h.prototype._createAndAppendPath = function () {
                    var e = new (this._getRelatedItemClass())();
                    return (this._editor.insertElements([e], false, true, true), e.getScene() ? ((this._pathEditor = a.openEditor(e)), e) : null);
                }),
                (h.prototype._mouseRelease = function (e) {
                    (n.prototype._mouseRelease.call(this, e), this._manager.notifyJobDone(this));
                }),
                (h.prototype._escAction = function () {}),
                (h.prototype._enterAction = function () {}),
                (h.prototype.getCursor = function () {
                    return l.CrossHighlight;
                }),
                (h.prototype.toString = function () {
                    return "[Object GHighlighterAnnotationTool]";
                }),
                (module.exports = h));
        };
