module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(69),
                o = require(127),
                a = require(36),
                s = require(320),
                l = require(172),
                h = require(153);

            function A(e, t) {
                (o.call(this, e), (this._uid = t));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(A, o, [l]),
                a.exports(A, s),
                (A.prototype._showEditor = function (e) {
                    return (!e || e.configuration.isElementAnnotationsVisible(this._element)) && o.prototype._showEditor.call(this, e);
                }),
                (A.prototype.initialSetup = function (e) {
                    (o.prototype.initialSetup.call(this, e), this._annotationSetup());
                }),
                (A.prototype._showAnnotations = function () {
                    return false;
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
                    return "[Object GPencilAnnotationEditor]";
                }),
                (module.exports = A));
        };
