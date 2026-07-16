module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(69),
                o = require(552),
                a = require(36),
                s = require(317),
                l = require(172),
                h = require(153),
                A = require(66);

            function c(e, t) {
                (o.call(this, e), (this._uid = t), (this._flags = this._flags & ~(A.Flag.RotateCorners | A.Flag.RotateHandle)));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(c, o, [l]),
                a.exports(c, s),
                (c.prototype._showEditor = function (e) {
                    return (!e || e.configuration.isElementAnnotationsVisible(this._element)) && o.prototype._showEditor.call(this, e);
                }),
                (c.prototype.initialSetup = function (e) {
                    (o.prototype.initialSetup.call(this, e), this._annotationSetup());
                }),
                (c.prototype.canHandleDblClick = function () {
                    return true;
                }),
                (c.prototype.handleDblClick = function () {
                    return true;
                }),
                (c.prototype.isRemovalBlocked = function () {
                    return 0 != (this._element.getProperty("plkt") & r.ProgramLck.NoDelete) || o.prototype.isRemovalBlocked.call(this);
                }),
                (c.prototype._getGuideExclusions = function () {
                    return [h];
                }),
                (c.prototype.toString = function () {
                    return "[Object GEllipseAnnotationEditor]";
                }),
                (module.exports = c));
        };
