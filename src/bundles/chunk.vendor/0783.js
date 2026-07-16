module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(69),
                o = (require(73), require(70), require(66), require(387 /* GTextEditor */)),
                a = (require(22), require(36)),
                s = require(370),
                l = require(172),
                h = require(153);

            function A(e, t) {
                ((this._uid = t), o.call(this, e));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(A, o, [l]),
                a.exports(A, s),
                (A.prototype._uid = null),
                (A.prototype._showEditor = function (e) {
                    return (!e || e.configuration.isElementAnnotationsVisible(this._element)) && o.prototype._showEditor.call(this, e);
                }),
                (A.prototype.initialSetup = function (e) {
                    (o.prototype.initialSetup.call(this, e), this._annotationSetup());
                }),
                (A.prototype.canHandleDblClick = function () {
                    return true;
                }),
                (A.prototype.handleDblClick = function () {
                    return true;
                }),
                (A.prototype.isRemovalBlocked = function () {
                    return 0 != (this._element.getProperty("plkt") & r.ProgramLck.NoDelete) || o.prototype.isRemovalBlocked.call(this);
                }),
                (A.prototype._getGuideExclusions = function () {
                    return [h];
                }),
                (A.prototype.toString = function () {
                    return "[Object GTextAnnotationEditor]";
                }),
                (module.exports = A));
        };
