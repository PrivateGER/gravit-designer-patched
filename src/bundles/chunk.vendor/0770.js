module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(127),
                o = require(36),
                a = require(319),
                s = require(172),
                l = require(69),
                h = require(153);

            function A(e, t) {
                (r.call(this, e), (this._uid = t));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(A, r, [s]),
                o.exports(A, a),
                (A.prototype._showEditor = function (e) {
                    return (!e || e.configuration.isElementAnnotationsVisible(this._element)) && r.prototype._showEditor.call(this, e);
                }),
                (A.prototype.initialSetup = function (e) {
                    (r.prototype.initialSetup.call(this, e), this._annotationSetup());
                }),
                (A.prototype.canHandleDblClick = function () {
                    return true;
                }),
                (A.prototype.handleDblClick = function () {
                    return true;
                }),
                (A.prototype.isRemovalBlocked = function () {
                    return 0 != (this._element.getProperty("plkt") & l.ProgramLck.NoDelete) || r.prototype.isRemovalBlocked.call(this);
                }),
                (A.prototype._getGuideExclusions = function () {
                    return [h];
                }),
                (A.prototype.toString = function () {
                    return "[Object GArrowAnnotationEditor]";
                }),
                (module.exports = A));
        };
