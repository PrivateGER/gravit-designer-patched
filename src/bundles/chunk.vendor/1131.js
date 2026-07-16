module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(283),
                o = require(793);

            function a() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype._getGradient = function () {
                    if (this._data) {
                        var e = this._getStops();
                        return (
                            e.sort(function (e, t) {
                                return e.position - t.position;
                            }),
                            e.forEach(function (t, i) {
                                i > 0 && i < e.length - 1 && (t.position = 1 - t.position);
                            }),
                            new r(e)
                        );
                    }
                    return new r();
                }),
                (module.exports = a));
        };
