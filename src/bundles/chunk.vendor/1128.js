module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(73),
                GStylable = require(28),
                a = require(17),
                s = require(439);

            function l() {
                s.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(l, s),
                (l.prototype.parse = function () {
                    (s.prototype.parse.apply(this, arguments),
                        this._data.hasBackgroundColor || this._node.getPaintLayers().appendChild(new GStylable.FillPaintLayer(a.WHITE)));
                }),
                (l.prototype._getRelatedNodeClass = function () {
                    return r;
                }),
                (module.exports = l));
        };
