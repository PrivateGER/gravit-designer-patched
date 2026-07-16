module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(330),
                o = require(36),
                a = require(533),
                s = require(172),
                l = require(66);

            function h(e, t) {
                (r.call(this, e),
                    (this._uid = t),
                    (this._flags =
                        this._flags &
                        ~(l.Flag.RotateCorners | l.Flag.RotateHandle | l.Flag.ResizeAll | l.Flag.ResizeCenters | l.Flag.ResizeEdges)));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(h, r, [s]),
                o.exports(h, a),
                (h.prototype._showEditor = function (e) {
                    return false;
                }),
                (h.prototype.toString = function () {
                    return "[Object GCollaborativeTextAnnotationEditor]";
                }),
                (module.exports = h));
        };
